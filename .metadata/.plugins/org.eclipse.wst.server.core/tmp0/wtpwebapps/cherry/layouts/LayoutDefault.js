import telas from '../js/telas.js'

export default {
	name: 'LayoutDefault',
	data() {
		return {
			drawer: false,
			home: {
				icon: 'mdi-home',
				title: 'Tela Inicial',
				path: '/'
			},
			telas,
		}
	},
	methods: {
		goToLogin() {
			this.$router.push('/cherry/auth/login')
		}
	},
	template: `
		<div>
			<v-app-bar app clipped-left>
				<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
				
				<v-spacer></v-spacer>
				
				<v-avatar>
			      <img
			        src="./imgs/cereja.png"
			        alt="Logo do sistema Cherry"
			      >
			    </v-avatar>
				
				<v-spacer></v-spacer>
				
				<v-btn icon @click="goToLogin">
				  <v-icon>mdi-logout</v-icon>
				</v-btn>
			</v-app-bar>
			
			<v-navigation-drawer v-model="drawer" clipped fixed app just>
				<v-list 
					dense
				    class="pa-2"
				>
            		<v-list-item exact>
		              <v-list-item-icon>
		                <v-icon>{{ home.icon }}</v-icon>
		              </v-list-item-icon>
	  
		              <v-list-item-content>
		                <v-list-item-title v-text="home.title"/>
		              </v-list-item-content>
		            </v-list-item>
		  
      		        <v-divider></v-divider>
	  
		            <v-list-item v-for="(item, i) in telas" :key="i" exact>
		              <v-list-item-icon>
		                <v-icon>{{ item.icon }}</v-icon>
		              </v-list-item-icon>
	  
		              <v-list-item-content>
		                <v-list-item-title v-text="item.title" />
		              </v-list-item-content>
	            	</v-list-item>
	          	</v-list>
			</v-navigation-drawer>
			
			<v-main>
				<v-container>
					<slot />
				</v-container>
			</v-main>
		</div>
	`
}