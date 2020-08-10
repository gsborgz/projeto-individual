import { $bus } from '../js/eventBus.js'

import AppTable from '../componentes/AppTable.js'
import AppDropdown from '../componentes/AppDropdown.js'
import AppModal from '../componentes/AppModal.js'

Vue.component("AppTable", AppTable)
Vue.component("AppDropdown", AppDropdown)
Vue.component("AppModal", AppModal)

export default {
	name: 'Usuarios',
	data() {
		return {
			// Tabela de usuários
			loadingUsuarios: false,
			cabecalho: [
				{ text: 'Nome', sortable: false, value: 'nome' },
				{ text: 'E-mail', sortable: false, value: 'email' },
				{ text: 'Tipo', sortable: false, value: 'tipo' },
				{ text: '', sortable: false, value: 'btns' },
			],
			usuarios: [],
			filtro: {
				like: ''
			},
			usuarioSelecionado: {}
		}
	},
	methods: {
		buscarUsuarios() {
			this.loadingUsuarios = true
			
			let usuarios = [ // FIXME - susbstituir pelo get em usuários
				{
					id: 4,
					nome: 'Gabriel Borges',
					email: 'gabriel@gmail.com',
					tipo: 'Gestor',
					tipo_id: 2
				},
				{
					id: 5,
					nome: 'Reiner Brawn',
					email: 'reiner@gmail.com',
					tipo: 'Caixa',
					tipo_id: 3
				},
				{
					id: 7,
					nome: 'Eren Yeager',
					email: 'pnc@gmail.com',
					tipo: 'Caixa',
					tipo_id: 3
				},
				{
					id: 10,
					nome: 'Jailson Mendes',
					email: 'delicia@gmail.com',
					tipo: 'Caixa',
					tipo_id: 3
				},
			]
			
			usuarios.map(usuario => {
				const { id, nome, email, tipo, tipo_id } = usuario
				
				const btns = [
					{
						title: 'Editar',
						function: () => this.atualizarDadosUsuario(usuario)
					},
					{
						title: 'Alterar Senha',
						function: () => this.atualizarSenhaUsuario(usuario)
					},
					{
						title: 'Desativar',
						function: () => this.desativarUsuario(usuario)
					}
				]
				
				this.usuarios.push({ nome, email, tipo, btns })
			})
			
			this.loadingUsuarios = false
		},
		
		cadastrarUsuario() {
			
		},
		
		atualizarDadosUsuario(usuario) {
			this.usuarioSelecionado = usuario
			$bus.$emit('open-modal-edit')
		},
		
		atualizarSenhaUsuario(usuario) {
			this.usuarioSelecionado = usuario
			$bus.$emit('open-modal-edit_password')
		},
		
		desativarUsuario(usuario) {
			this.usuarioSelecionado = usuario
			$bus.$emit('open-modal-disable')
		},
	},
	mounted() {
		this.buscarUsuarios()
	},
	template: `
		<v-row>
			<v-col cols="12">
			</v-col>
			
			<v-col cols="12">
				<app-table 
					:headers="cabecalho" 
					:content="usuarios" 
					:loading="loadingUsuarios" 
					loading-text="Buscando usuários..." 
					no-data-text="Nenhum usuário encontrado."
				>
					<template v-slot:content>
						<tr v-for="(item, i) in usuarios" :key="i">
							<td>
								{{ item.nome }}
							</td>
							
							<td>
								{{ item.email }}
							</td>
							
							<td>
								{{ item.tipo }}
							</td>
							
							<td class="text-right">
								<app-dropdown :btns="item.btns" />
							</td>
						</tr>
					</template>
				</app-table>
			</v-col>
			
			<app-modal title="CADASTRAR USUÁRIO" modal="add">
			</app-modal>
			
			<app-modal title="EDITAR USUÁRIO" :subtitle="usuarioSelecionado.nome" modal="edit">
				adasdasd
			</app-modal>
			
			<app-modal title="EDITAR SENHA" :subtitle="usuarioSelecionado.nome" modal="edit_password">
			</app-modal>
			
			<app-modal title="DESATIVAR USUÁRIO" :subtitle="usuarioSelecionado.nome" modal="disable">
			</app-modal>
		</v-row>
	`
}