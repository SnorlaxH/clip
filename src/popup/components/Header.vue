<template>
	<div>
		<div class="row">
			<div class="col s12">
				<div class="col s6">
					<a
						href="#marker"
						class="col s12 btn-flat center-align lighten-2"
						v-bind:class="getModeClass(MODE_BOOKMARK)"
						v-on:click="changeMode(MODE_BOOKMARK)"
					>
						<i class="material-icons medium" v-bind:class="{'white-text':mode==MODE_BOOKMARK}">star_border</i>
					</a>
				</div>
				<div class="col s6">
					<a
						href="#list"
						class="col s12 btn-flat center-align lighten-2"
						v-bind:class="getModeClass(MODE_SEARCH)"
						v-on:click="changeMode(MODE_SEARCH)"
					>
						<i class="material-icons medium" v-bind:class="{'white-text':mode==MODE_SEARCH}">search</i>
					</a>
				</div>
			</div>
		</div>
		<clip-search></clip-search>
	</div>
</template>

<script>
import { Constant } from "../constant";

import ClipSearch from "./Search";

export default {
	name: "ClipHeader",
	computed: {
		MODE_BOOKMARK() {
			return Constant.MODE_BOOKMARK;
		},
		MODE_SEARCH() {
			return Constant.MODE_SEARCH;
		},
		mode() {
			return this.$store.getters.getMode;
		}
	},
	components: {
		"clip-search": ClipSearch
	},
	methods: {
		getModeClass: function(m) {
			return this.mode == m ? "deep-purple" : "grey";
		},
		changeMode: function(data) {
            this.$store.commit(Constant.CHANGE_MODE, { data });
            
		}
	}
};
</script>

<style scoped>
.row {
	margin-bottom: 10px;
}
.col {
	padding: 0;
}

.btn-flat {
	border-radius: 0;
}

.btn-flat i.medium {
	font-size: 2rem !important;
}
</style>
