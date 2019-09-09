async function enviar(endereco,chaves,valores){
	var _formulario = new FormData();
		if (chaves && valores) {
			chaves.forEach(function(elemento,index){
				_formulario.append(elemento, valores[index]);
			})
		}
	var resultado = new Promise(
		function(resolve,reject){

			ajax = new XMLHttpRequest();
			ajax.open('POST',BASE_URL + endereco);


			ajax.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			    console.log(ajax.responseText);
			       resolve(ajax.responseText);
			    }
			};

			ajax.onerror = function(){
				reject("deu ruin, erro de conecxão.");
			}

			ajax.send(_formulario);
		}
	)
	return await resultado; 
}
