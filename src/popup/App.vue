<template>
	<el-container>
		<clip-header></clip-header>
		<clip-list></clip-list>
	</el-container>
</template>

<script>
import ClipHeader from "./components/Header";
import ClipList from "./components/List";
import { Constant } from "./constant";

export default {
	data() {
		return {};
	},
	created() {
		chrome.storage.largeSync.get(
			["mode", "bookmark", "cursor"],
			data => {
				this.$store.commit(Constant.INIT_DATA, { data });
			}
		);
	},
	components: {
		"clip-header": ClipHeader,
		"clip-list": ClipList
	}
};
</script>

<style scoped>
.el-container {
	width: 100%;
	height: 100%;
}
</style>