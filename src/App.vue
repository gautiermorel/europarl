<template>
  <div class="bg-gray-100 text-gray-800 min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-blue-800 text-white py-6 shadow-md">
      <h1 class="text-center text-2xl md:text-3xl font-semibold">EUROPARL</h1>
    </header>

    <!-- Main Content -->
    <main class="flex-grow container mx-auto px-4 py-8">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <!-- XML Links Container -->
        <div v-if="!loadingLinks" class="mt-6 p-6" v-show="xmlLinks.length > 0">
          <div
            class="space-y-4"
            v-for="(sitting, index) in xmlLinks"
            :key="index"
          >
            <h3 class="text-lg font-semibold">
              {{ sitting.sitting }} at {{ sitting.location }}
            </h3>
            <ul class="list-disc list-inside">
              <li
                v-for="(link, idx) in sitting.links"
                :key="idx"
                class="flex items-center justify-between"
              >
                <a
                  :href="link.url"
                  target="_blank"
                  class="text-blue-600 hover:underline"
                  >{{ link.title }}</a
                >
                <div class="flex items-center">
                  <button
                    @click="() => handleDownload(link.url, idx)"
                    class="ml-4 mb-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                    :disabled="loadingDownload[idx]"
                  >
                    <span v-if="loadingDownload[idx]" class="flex items-center">
                      <span
                        class="spinner-border spinner-border-sm mr-1"
                        role="status"
                      ></span>
                      Downloading...
                    </span>
                    <span v-else>Download .xlsx</span>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Loading Links -->
        <div v-if="loadingLinks" class="mt-6 p-6">
          <p class="text-center text-blue-600 font-semibold">
            Loading XML links... Please wait
          </p>
        </div>

        <hr class="my-6 border-gray-300" />

        <!-- Official Site Link -->
        <div class="mt-6">
          <a
            href="https://www.europarl.europa.eu/plenary/fr/votes.html?tab=votes"
            target="_blank"
            class="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Go to Official Site
          </a>
        </div>

        <hr class="my-6 border-gray-300" />

        <!-- XML URL Input -->
        <div class="mt-6">
          <h2 class="text-xl text-blue-800 mb-2">Enter the RCV XML URL:</h2>
          <p class="text-sm">
            If you can't find what you're looking for, you can directly convert
            a roll call XML link to XLSX, for example:
          </p>
          <pre class="bg-gray-200 p-3 rounded-md overflow-x-auto mb-4 text-sm">
https://www.europarl.europa.eu/doceo/document/PV-9-2024-04-23-RCV_EN.xml
          </pre>

          <div
            class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"
          >
            <input
              v-model="xmlUrl"
              type="text"
              placeholder="Enter XML URL"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              @click="convertToExcel"
              class="w-full md:w-auto bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-900 transition"
              :disabled="loadingConvert"
            >
              Convert to Excel
              <span
                v-if="loadingConvert"
                class="ml-2 spinner-border spinner-border-sm"
                role="status"
              ></span>
            </button>
          </div>

          <div class="mt-6 text-center">
            <a
              v-if="downloadLink"
              :href="downloadLink"
              download
              class="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              Download Excel File
            </a>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-blue-800 text-white text-center py-4">
      &copy; Europarl.eu.org
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import * as XLSX from "xlsx";

// Reactive references
const xmlLinks = ref([]);
const loadingConvert = ref(false);
const loadingLinks = ref(true);
const loadingDownload = ref([]);
const xmlUrl = ref("");
const downloadLink = ref("");

// Function to flatten arrays
const arrayFlatten = (arrays) => [].concat(...arrays);

// Download and processing function
const handleDownload = async (url, index) => {
  if (!url.endsWith(".xml")) {
    alert("Please provide a valid XML URL.");
    return;
  }

  loadingDownload[index] = true;

  try {
    console.log("la;");
    const response = await axios.get(
      `https://api.lechatstraat.com/v3/europarl?url=${encodeURIComponent(url)}`
    );

    console.log("response", response.data);

    await doProcess(response.data);
  } catch (error) {
    console.error("Error fetching XML:", error);
    alert("Error fetching or processing the XML file.");
  } finally {
    loadingDownload[index] = false; // Reset loading for the specific index
  }
};

const doProcess = async (data) => {
  const {
    "EP.Reference": epReference,
    "EP.Number": epNumber,
    "Sitting.Identifier": identifier,
    "Sitting.Date": date,
  } = data["PV.RollCallVoteResults"]["$"];
  const sitting = `${epReference} (${epNumber}) | ${identifier}: ${date}`;
  const rollCallVotes = data["PV.RollCallVoteResults"]["RollCallVote.Result"];

  const rows = rollCallVotes
    .reduce((rows, vote) => {
      const {
        $: { Identifier: voteIdentifier, Date: voteDate },
        "Result.For": [forResult = {}] = [],
        "Result.Against": [againstResult = {}] = [],
        "Result.Abstention": [abstentionResult = {}] = [],
        "RollCallVote.Description.Text": [voteDescription = ""] = [],
      } = vote;

      const meps = arrayFlatten(
        [
          { ...forResult, voteResult: "+" },
          { ...againstResult, voteResult: "-" },
          { ...abstentionResult, voteResult: "0" },
        ].map(
          ({
            "Result.PoliticalGroup.List": politicalGroups = [],
            voteResult,
          }) => {
            return arrayFlatten(
              politicalGroups.map(
                ({
                  "PoliticalGroup.Member.Name": politicalGroupMembers,
                  $: { Identifier: mepGroupName },
                }) => {
                  return arrayFlatten(
                    politicalGroupMembers.map(
                      ({
                        _: mepName,
                        $: { MepId: mepId, PersId: persId },
                      }) => ({
                        persId,
                        mepId,
                        mepGroupName,
                        mepName,
                        [voteIdentifier]: voteResult,
                      })
                    )
                  );
                }
              )
            );
          }
        )
      );

      const newRows = [];

      for (const mep of meps) {
        const existing = rows.find((row) => row.mepId === mep.mepId);
        if (existing) {
          existing[voteIdentifier] = mep[voteIdentifier];
        } else {
          newRows.push({ ...mep, [voteIdentifier]: mep[voteIdentifier] });
        }
      }

      return [...rows, ...newRows].map(
        ({ [voteIdentifier]: data, ...row }) => ({
          ...row,
          [`[${voteIdentifier}]${voteDescription} (${voteDate})`]: data,
        })
      );
    }, [])
    .map(({ persId, mepId, mepGroupName, mepName, ...voteResults }) => ({
      PERS_ID: persId,
      MEP_ID: mepId,
      Group: mepGroupName,
      Name: mepName,
      ...voteResults,
    }));

  const worksheet = XLSX.utils.json_to_sheet(rows, {
    header: ["PERS_ID", "MEP_ID", "Group", "Name"],
    origin: "A5",
  });
  XLSX.utils.sheet_add_aoa(worksheet, [[sitting]], { origin: "A1" });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, identifier);

  // Write the Excel file and enable download
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  downloadLink.value = URL.createObjectURL(blob);
};

const convertToExcel = async () => {
  const url = xmlUrl.value.trim();
  if (!url) {
    alert("Please enter an XML URL.");
    return;
  }
  loadingConvert.value = true; // Optionally set loadingConvert if needed
  try {
    await handleDownload(url);
  } finally {
    loadingConvert.value = false; // Ensure loadingConvert is reset
  }
};

const fetchXmlLinks = async () => {
  loadingLinks.value = true;

  try {
    const response = await axios.get(
      "https://api.lechatstraat.com/v3/europarl/list"
    );
    xmlLinks.value = response.data;
  } catch (error) {
    console.error("Error fetching XML links:", error);
    alert("Error fetching XML links.");
  } finally {
    loadingLinks.value = false;
  }
};

// Mount hook to fetch links on load
onMounted(() => {
  fetchXmlLinks();
});
</script>

<style>
/* You can add additional styles here if needed */
.spinner-border {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 0.15em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner-border 0.75s linear infinite;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}
</style>
