<template>
	<div class="row">
		<div class="col s12">
			<div class="clip-empty center-align" v-show="list.length == 0" v-cloak>
				스트리머의 영문 채널명을 입력하세요.
				<br>예시)hanryang1125(O) / 풍월량 (X)
			</div>
			<div class="card horizontal">
				<div class="row card-row">
					<div class="col s5 valign-wrapper">
						<img
							src="https://clips-media-assets2.twitch.tv/AT-cm%7C565480277-preview-260x147.jpg"
							alt
							class="responsive-img"
						>
					</div>
					<div class="col s7 card-cont">
						<div class="row clip-info valign-wrapper">
							<h5 class="col s9">제목</h5>
							<a href="#star" class="col s3">
								<i class="material-icons black-text">star_border</i>
							</a>
						</div>
						<span>도화링구(dohwaa)</span>
						<div class="card-btn right">
							<button class="btn btn-flat">
								<i class="material-icons">link</i>
							</button>

							<button class="btn btn-flat">
								<i class="material-icons">file_download</i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ClipList",
	computed: {
		list() {
			return this.$store.getters.getList;
		}
	},
	data() {
		return {};
	}
};
</script>

<style scoped>
.clip-empty {
	font-size: 0.9rem;
}

.card-row {
	min-height: 100px;
	margin-bottom: 0;
}

.card-row .valign-wrapper {
	height: 100%;
}

.card img.responsive-img {
	height: 100px;
}

.clip-info {
	margin: 0;
}

.clip-info .col {
	padding: 0;
	margin: 1rem 0;
}

.card-cont span {
	font-size: 1rem;
}

.card-btn {
	margin-top: 10px;
}

.card-btn .btn:hover {
	background-color: #9575cd;
	color: #fff;
	transition: background-color 0.5s, color 0.3s;
}
</style>
