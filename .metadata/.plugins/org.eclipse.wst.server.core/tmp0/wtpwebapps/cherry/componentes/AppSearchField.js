export default {
	name: 'AppSearchField',
	props: {
		placeholder: { type: String, default: 'Digite para buscar...' },
		onClick: { type: Function, default: null }
	},
	data() {
		return {
			text: '',
			rowStyle: ''
		}
	},
	
	computed: {
		textFieldStyle() {
			return `
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			`
		},
		
		buttonStyle() {
			return `
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
				height: 38px;
				margin-left: -2px;
			`
		},
		
		rowStyle() {
			console.log(this.$vuetify.breakpoint)
			
			switch (this.$vuetify.breakpoint.name) {
				case 'xl':
					return 'mr-n4'
				case 'lg':
					return 'mr-n2'
			}
		}
	},
	template: `
		<v-row no-gutters :class="rowStyle">
			<v-col cols="10">
				<v-text-field
				  v-model="text"
		          :placeholder="placeholder"
				  solo
				  dense
				  @input="$emit('input', text)"
				  :style="textFieldStyle"
		        />
			</v-col>
			
			<v-col cols="2">
				<v-btn :style="buttonStyle" color="blue lighten-2" class="white--text">
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
			</v-col>			
		</v-row>
	`
}