import AppBlock from '../../componentes/AppBlock.js'
import telas from '../../js/telas.js'

Vue.component("AppBlock", AppBlock)

export default {
	name: 'Home',
	data() {
		return {
			telas
		}
	},
	computed: {
		colSize() {
			switch (this.$vuetify.breakpoint.name) {
				case 'xs':
					return 12
					break
				case 'sm':
					return 6
					break
				case 'md':
					return 6
					break
				default:
					return 4
					break
			}
		},
		
		large() {
			if (this.$vuetify.breakpoint.name !== 'xs' && this.$vuetify.breakpoint.name !== 'sm') {
				return true
			}
			
			return false
		}
	},
	methods: {
		loadPage(path) {
			if (this.$route.path !== path) {
				this.$router.push(path)				
			}
		}
	},
	template: `
		<v-row align="center" justify="center" :class="large ? 'mt-12' : 'mt-2 mx-1'">
            <v-col :cols="colSize" v-for="(tela, i) in telas" :key="i" v-if="tela.inHome">
                <app-block :title="tela.title" :description="tela.description" @click.native="loadPage(tela.path)" />
            </v-col>
        </v-row>
	`
}