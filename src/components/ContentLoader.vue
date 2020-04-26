<template>
	<content-loader :height="80" :speed="2" primaryColor="#f3f3f3" secondaryColor="#e0e0e0">
		<circle cx="10" cy="5px" r="2" />

		<rect x="20px" y="4px" rx="1px" ry="1px" width="35%" height="2px" />
		<rect x="45%" y="4px" rx="1px" ry="1px" width="20%" height="2px" />
		<rect x="80%" y="0px" rx="1px" ry="1px" width="10%" height="8px" />

		<rect x="5%" y="15px" rx="1px" ry="1px" width="85%" height="5px" />
		<rect x="5%" y="25px" rx="1px" ry="1px" width="85%" height="5px" />
		<rect x="5%" y="35px" rx="1px" ry="1px" width="85%" height="5px" />
		<rect x="5%" y="45px" rx="1px" ry="1px" width="85%" height="5px" />
		<rect x="5%" y="55px" rx="1px" ry="1px" width="85%" height="5px" />
		<rect x="5%" y="65px" rx="1px" ry="1px" width="85%" height="5px" />
	</content-loader>
</template>

<script>
import { ContentLoader } from "vue-content-loader";

export default {
	components: { ContentLoader }
};
</script>