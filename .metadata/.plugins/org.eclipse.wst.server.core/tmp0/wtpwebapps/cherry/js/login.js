const login = {
	entrar() {
		let email = document.loginform.email;
	    let senha = document.loginform.senha;
	
	    if((email.value).trim() == ""){
			alert("Você deve informar o e-mail!")
	        return false
	    }
	
	    if((senha.value).trim() == ""){
	        alert("Você deve informar a senha!")
			return false
	    }
	
	    return true
	}
}