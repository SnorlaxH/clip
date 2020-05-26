<template>
	<el-aside>
		<el-menu active-text-color="#9147ff">
			<el-menu-item v-on:click="changeMode(MODE_BOOKMARK)" v-bind:class="{'is-active': mode == MODE_BOOKMARK}" index="1">
				<i class="el-icon-star-off left"></i>
				<span>즐겨찾기</span>
			</el-menu-item>
			<el-menu-item v-on:click="changeMode(MODE_SEARCH)" v-bind:class="{'is-active': mode == MODE_SEARCH}" index="2">
				<i class="el-icon-search left"></i>
				<span>탐색</span>
			</el-menu-item>
			<el-menu-item v-on:click="changeMode(MODE_INFO)" v-bind:class="{'is-active': mode == MODE_INFO}" index="3">
				<i class="el-icon-warning-outline left"></i>
				<span>정보</span>
			</el-menu-item>
		</el-menu>
	</el-aside>
</template>

<script>
import { Constant } from "../constant";

export default {
	name: "ClipHeader",
	computed: {
		MODE_BOOKMARK() {
			return Constant.MODE_BOOKMARK;
		},
		MODE_SEARCH() {
			return Constant.MODE_SEARCH;
		},
		MODE_INFO() {
			return Constant.MODE_INFO;
		},
		mode() {
			return this.$store.getters.getMode;
		}
	},
	methods: {
		changeMode: function(data) {
			this.$store.commit(Constant.CHANGE_MODE, { data });
		}
	}
};
</script>

<style scoped>
.el-aside {
	width: 20%!important;
}

.el-menu {
	height: 100%;
}

.el-menu-item{
	font-size: 1rem;
}

.el-menu-item:focus,
.el-menu-item:hover {
	background-color: #9147ff20;
}

.el-menu-item.is-active{
	color: #9147ff;
}
</style>
