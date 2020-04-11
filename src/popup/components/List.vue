<template>
	<el-main>
		<clip-search v-show="mode != MODE_INFO" v-cloak></clip-search>
		<el-card v-show="list.length == 0 && mode != MODE_INFO" v-cloak shadow="always">
			<div class="text-center" v-show="mode == MODE_BOOKMARK" v-cloak>등록된 북마크가 없습니다.</div>
			<div class="text-center" v-show="mode == MODE_SEARCH" v-cloak>
				스트리머의 영문 채널명을 입력하세요.
				<br>예시)hanryang1125(O) / 풍월량 (X)
			</div>
		</el-card>
		<el-card
			v-for="r in list"
			v-bind:key="r.id"
			shadow="always"
			bodyStyle="{{padding: '10px'}}"
			v-show="mode != MODE_INFO"
			v-cloak
		>
			<el-row type="flex" justify="space-between" align="middle">
				<el-col :span="12">
					<el-image v-bind:src="r.thumbnail_url" :fit="fill"></el-image>
				</el-col>
				<el-col :span="10">
					<el-col :span="24" class="title" v-bind:title="r.title">{{ r.title }}</el-col>
					<el-col :span="24" class="info">{{ `${r.broadcaster_name} (${r.broadcaster_login})` }}</el-col>
					<el-col :span="24" class="btns">
						<el-button
							icon="el-icon-star-off"
							circle
							v-bind:type="isMarked(r.id) ? 'warning' : 'default'"
							v-on:click="mark(r)"
						></el-button>

						<el-button icon="el-icon-link" circle v-on:click="go(r.url)"></el-button>

						<el-button icon="el-icon-download" circle v-on:click="download(r)"></el-button>
					</el-col>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="text-center" v-show="mode == MODE_INFO" v-cloak>
			<h2>클립북 {{`v${version}`}}</h2>
			<h4>지원 및 개발자 정보</h4>
			<el-row class="dev-card" type="flex" justify="space-between" align="middle">
				<el-col :span="8" class="dev-item">
					<el-button class="icon dev-button" icon="el-icon-message" circle ></el-button>
					<h4>Email</h4>
				</el-col>
				<el-col :span="8" class="dev-item">
					<el-button class="icon dev-button" circle>
						<img src="/images/github.png"/>
					</el-button>
					<h4>Github</h4>
				</el-col>
				<el-col :span="8" class="dev-item">
					<el-button class="icon dev-button" icon="el-icon-edit-outline" circle></el-button>
					<h4>Blog</h4>
				</el-col>
			</el-row>
		</el-card>
	</el-main>
</template>

<script>
import { Constant } from "../constant";
import ClipSearch from "./Search";

export default {
	name: "ClipList",
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
		},
		user() {
			return this.$store.getters.getUser;
		},
		list() {
			return this.mode == this.MODE_SEARCH
				? this.$store.getters.getList
				: this.$store.getters.getBookmark;
		},
		bookmark() {
			return this.$store.getters.getBookmark;
		},
		version() {
			return this.$store.getters.getVersion;
		}
	},
	components: {
		"clip-search": ClipSearch
	},
	data() {
		return {};
	},
	methods: {
		go(url) {
			chrome.tabs.create({ url });
		},
		download(r) {
			const fileName = r.thumbnail_url.substring(
				0,
				r.thumbnail_url.indexOf("-preview")
			);

			chrome.runtime.sendMessage({
				url: `${fileName}.mp4`,
				title: r.title
			});
		},
		mark(r) {
			this.$store.commit(
				this.isMarked(r.id)
					? Constant.DEL_BOOKMARK
					: Constant.ADD_BOOKMARK,
				{ data: r }
			);
		},
		isMarked(id) {
			const arr = [];
			this.bookmark.filter(item => {
				if (item.id == id) {
					arr.push(item.id);
				}
			});
			return arr.includes(id);
		}
	}
};
</script>

<style scoped>
.el-card:not(:last-child) {
	margin-bottom: 10px;
}

.el-button.is-circle {
	padding: 5px;
}

.el-button + .el-button {
	margin-left: 5px;
}

.title {
	font-size: 14px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	word-break: break-word;
}

.info {
	font-size: 12px;
}

.btns {
	text-align: right;
	margin-top: 20px;
}

.text-center{
	text-align: center;
}

.icon [class*=" el-icon-"], [class^=el-icon-]{
	font-size: 26px;
}

.icon img{
	width: 26px;
	height: 26px;
}

.dev-card{
	margin-top: 2rem;
}

.dev-button{
	width: 40px;
	height: 40px;
	font-size: 26px;
}

.dev-item h4{
	margin: 0.5rem 0;
}
</style>
