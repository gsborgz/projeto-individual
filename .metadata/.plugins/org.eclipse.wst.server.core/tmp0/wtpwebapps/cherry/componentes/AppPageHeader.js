import telas from '../js/telas.js'

export default {
	name: "AppPageHeader",
	computed: {
		pageTitle() {
			const currentPath = this.$route.path
			
			let pageTitle = telas.find(tela => tela.path == currentPath).title
			
			return pageTitle
		}
	},
	template: `
		<div class="text-h4 grey--text text--darken-1 mt-4 mb-10">{{ pageTitle }} &nbsp; ></div>
	`
}