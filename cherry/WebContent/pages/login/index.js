export default {
	name: 'Login',
	data() {
		return {
			valid: true,
			emailRules: [
		      v => !!v || 'E-mail é obrigatório',
		    ],
		 	senhaRules: [
		      v => !!v || 'Senha é obrigatório',
		    ],
		    
		    dadosUsuario: {
		    	email: '',
		    	senha: '',
		    	manter_conectado: false,
		    }
		}
	},
	methods: {
		validate() {
			this.$refs.form.validate()
			
			this.$router.push('/')
		}
	},
	template: /*html*/`
		<v-card width="400" class="ma-auto">
    		<v-container class="px-6">
        		<v-img 
        			src="./imgs/logo.png" 
        			width="200" 
        			height="80" 
        			aspect-ration="1" 
        			class="mx-auto"
        		></v-img>
        		
        		<v-form ref="form" v-model="valid">
        			<v-row no-gutters>
        				<v-col cols="12">
		        			<v-text-field
					          label="E-mail"
					          v-model="dadosUsuario.email"
					          :rules="emailRules"
					          required
					        />
        				</v-col>
        				
        				<v-col cols="12">
					        <v-text-field
					          label="Senha"
					          type="password"
					          v-model="dadosUsuario.senha"
					          :rules="senhaRules"
					          required
					        />
        				</v-col>
        				
        				<v-col cols="12" class="py-2">
	        				<v-checkbox
							  v-model="dadosUsuario.manter_conectado"
							  label="Mantenha-me conectado."
							></v-checkbox>
        				</v-col>
        				
        				<v-col cols="12">
					        <v-btn
					          :disabled="!valid"
					          color="success"
					          @click="validate"
					          block
					        >
					          ENTRAR
					        </v-btn>
        				</v-col>
        				
        				<v-col cols="12" class="py-2">
        					<a href="#" class="text-decoration-none grey--text text--lighten-1 caption">Esqueci a senha</a>
        				</v-col>
        			</v-row>
        		</v-form>
    		</v-container>
    	</v-card>
	`
}