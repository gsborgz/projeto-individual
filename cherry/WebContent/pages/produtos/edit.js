const template = /*html*/`
	
	<v-row>
		<v-col cols="12" class="py-0">
			<v-form ref="form" v-model="valid">
				<v-row>
					<v-col cols="6" class="pt-0">
						<v-text-field
							label="Nome"
							v-model="dadosProduto.nome"
							:rules="rules.nome"
						/>
					</v-col>

					<v-col cols="6" class="pt-0">
						<v-text-field
							label="Valor"
							v-model="dadosProduto.valor"
							type="number"
							prefix="R$"
							:rules="rules.valor"
						/>
					</v-col>

					<v-col cols="12" class="py-0">
						<app-btn success block :disabled="!valid" label="Cadastrar" :on-click="editarProduto" />
					</v-col>
				</v-row>
			</v-form>
		</v-col>
	</v-row>

`

import { $bus } from '../../js/eventBus.js'

export default {
	template,
	data() {
		return {
			valid: false,

			rules: {
				nome: [v => !!v || "Digite o nome do produto."],
				valor: [v => !!v || "Digite o valor do produto."]
			},

			dadosProduto: {
				nome: '',
				valor: 0
			}
		}
	},
	methods: {
		editarProduto() {
			this.$refs.form.validate()
		}
	},
	mounted() {
		$bus.$on('reset-form', () => {
			this.$refs.form.reset()
		})
	}
}