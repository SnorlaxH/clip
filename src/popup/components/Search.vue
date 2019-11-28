<template>
	<div class="row">
		<div class="col s12">
			<div class="row" v-show="!isUser" v-cloak>
				<div class="col s9">
					<input type="text" placeholder="검색" v-model="searchTxt" v-on:keyup.enter="search()">
				</div>
				<div class="col s3">
					<button class="btn deep-purple lighten-2" v-on:click="search()">
						<i class="material-icons medium">search</i>
					</button>
				</div>
			</div>

			<div class="card-panel profile-info grey lighten-5 z-depth-1" v-show="isUser" v-cloak>
				<div class="row valign-wrapper">
					<div class="col s3 profile-img">
						<img v-bind:src="user.profile_image_url" class="circle responsive-img">
					</div>
					<div class="col s7 profile-name">
						<h6 class="black-text">{{ user.display_name}}</h6>
					</div>
					<div class="col s2 profile-close">
						<a href="#cancel" v-on:click="clear()">
							<i class="material-icons black-text">close</i>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
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
			return this.user.hasOwnProperty("id");
		}
	},
	data() {
		return {
			searchTxt: ""
		};
	},
	methods: {
		search() {
			if (this.mode == Constant.MODE_SEARCH) {
				const data = this.searchTxt;
				console.log(/[ㄱ-ㅎ가-힣]+/.test(data), data);
				if (/[ㄱ-ㅎ가-힣]+/.test(data)) {
					M.toast({
						html: "스트리머의 영문 채널명을 입력하세요.",
						classes: "rounded"
					});
				} else {
					this.$store
						.dispatch(Constant.GET_USER, { data })
						.then(() => {
							getList();
						});
				}
			} else {
			}
		},
		getList() {
			this.$store.dispatch(Constant.GET_CLIPS, {
				broadcaster_id: this.user.id
			});
		},
		clear() {
			this.$store.commit(Constant.CLEAR_USER);
		}
	}
};
</script>

<style scoped>
.row {
	margin-bottom: 0;
}

.card-panel {
	padding: 10px;
	margin: 0;
}

.profile-info h6 {
	margin: 0;
}

.profile-name,
.profile-close {
	padding: 0;
}
</style>
