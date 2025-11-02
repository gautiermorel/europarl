# Europarl Vue3 Application

![Europarl Vue3](https://img.shields.io/badge/Vue-3.x-%234FC08D)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-2.x-%2338B2AC)
![Axios](https://img.shields.io/badge/Axios-1.x-%231DA1F2)
![XLSX](https://img.shields.io/badge/XLSX-0.17.0-%23FF5733)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Introduction

Welcome to **Europarl Vue3 Application**! This project transforms a static HTML page into a dynamic, modern web application using Vue 3 with the Composition API. It allows users to fetch XML links related to European Parliament votes, convert XML data into Excel (XLSX) format, and download the processed files seamlessly.

## Features

- **Fetch XML Links:** Retrieve a list of XML links related to European Parliament votes from an external API.
- **Convert XML to Excel:** Input an XML URL and convert the data into a downloadable Excel file.
- **Responsive Design:** Built with Tailwind CSS to ensure a responsive and aesthetically pleasing user interface.
- **Interactive UI:** User-friendly interactions with loading indicators and real-time feedback.
- **Download Links:** Easily download the processed Excel files with a single click.

## Demo

![App Screenshot](./assets/screenshot.png)

*Note: Replace the above image link with an actual screenshot of your application.*

## Technologies Used

- **[Vue 3](https://vuejs.org/):** A progressive JavaScript framework for building user interfaces.
- **[Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html):** A set of additive, function-based APIs that allow flexible composition of component logic.
- **[Axios](https://axios-http.com/):** Promise-based HTTP client for the browser and Node.js.
- **[XLSX](https://sheetjs.com/):** A library to parse and write spreadsheet files.
- **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapidly building custom user interfaces.
- **[Vite](https://vitejs.dev/):** A build tool that provides a faster and leaner development experience for modern web projects.

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- **[Node.js](https://nodejs.org/en/) (v14 or higher)**
- **[npm](https://www.npmjs.com/) (comes with Node.js)**

### Steps

1. **Clone the Repository**

   git clone https://github.com/yourusername/europarl-vue3.git

2. **Navigate to the Project Directory**

    cd europarl
    npm install

3. **Set Up Tailwind CSS**

Tailwind CSS is already configured in the project. If you need to make changes, refer to the Tailwind CSS documentation.

Run the Development Server

  Copy code
  npm run dev
  Open in Browser

Navigate to http://localhost:5173 (or the port specified in the terminal) to view the application.

Usage

View XML Links

Upon loading, the application fetches and displays a list of available XML links related to European Parliament votes. Each link includes a "Download .xlsx" button.

Download Excel Files

From the Links List:
Click the "Download .xlsx" button next to any XML link to convert and download the data as an Excel file.
By Entering an XML URL:
Scroll down to the "Enter XML URL" section.
Enter a valid XML URL in the input field.
Click the "Convert to Excel" button to process and download the Excel file.
Navigate to Official Site

Click the "Go to official site" button to visit the official European Parliament votes page.

Project Structure

    europarl/
    ├── node_modules/
    ├── public/
    │   └── favicon.ico
    ├── src/
    │   ├── assets/
    │   │   └── screenshot.png
    │   ├── components/
    │   ├── App.vue
    │   ├── main.js
    │   └── index.css
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── README.md
    └── vite.config.js

Contributing

Contributions are welcome!

License
This project is licensed under the MIT License. See the LICENSE file for more details.

Acknowledgements
Thanks to the Vue.js, Tailwind CSS, Axios, and SheetJS (XLSX) teams for their incredible tools!
