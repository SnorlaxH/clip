<template>
	<el-row class="search">
		<el-col :span="24" v-show="!isUser" v-cloak>
			<el-input type="text" placeholder="검색" v-model="searchTxt" @keyup.native.enter="search()">
				<el-button slot="append" icon="el-icon-search" v-on:click="search()"></el-button>
			</el-input>
		</el-col>

		<el-card :span="24" class="profile" bodyStyle="{{padding: '10px'}}" v-show="isUser" v-cloak>
			<el-row type="flex" justify="space-between" align="middle">
				<el-col :span="4">
					<div class="profile-img">
						<img v-bind:src="user.profile_image_url">
					</div>
				</el-col>
				<el-col :span="16">
					<h4 class="profile-title black-text left-align">{{user.display_name}}</h4>
				</el-col>
				<el-col :span="4" class="profile-close">
					<el-button class="close-button" v-on:click="clear()" icon="el-icon-close" circle></el-button>
				</el-col>
			</el-row>
		</el-card>
	</el-row>
</template>

<script>
import { mapActions } from "vuex";
import { Constant } from "../constant";

export default {
	name: "ClipSearch",
	computed: {
		mode() {
			return this.$store.getters.getMode;
		},
		user() {
			return this.$store.getters.getUser;
		},
		isUser() {
			return (
				this.user.hasOwnProperty("id") &&
				this.mode === Constant.MODE_SEARCH
			);
		}
	},
	data() {
		return {
			searchTxt: ""
		};
	},
	methods: {
		search() {
			const data = this.searchTxt;
			if (this.mode == Constant.MODE_SEARCH) {
				console.log(/[ㄱ-ㅎ가-힣]+/.test(data), data);
				if (/[ㄱ-ㅎ가-힣]+/.test(data)) {
					M.toast({
						html: "스트리머의 영문 채널명을 입력하세요.",
						classes: "rounded"
					});
				} else {
					this.searchTxt = "";
					this.$store.dispatch(Constant.GET_USER, {
						data,
						init: true
					});
				}
			} else {
				this.$store.commit(Constant.SET_SEARCH, {data});
			}
		},
		clear() {
			this.searchTxt = "";
			this.$store.commit(Constant.CLEAR_USER);
		}
	}
};
</script>

<style scoped>
.search {
	margin-bottom: 20px;
}

.profile h4 {
	font-size: 1.1rem;
}

.profile-img {
	position: relative;
	display: flex;
	justify-content: center;
}

.profile-img img {
	width: 100%;
	height: 100%;
	max-width: 75px;
	border-radius: 50%;
}

.profile-title {
	padding: 0 1rem;
}

.profile-close {
	display: flex;
	justify-content: center;
}

.close-button{
	float: right;
}
</style>

<style>
  .profile .el-card__body{
    padding: 10px;
  }
</style>
