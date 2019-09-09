//Matematica Vetorial 2d básica
/*
	Aqui estaremos Importando uma super feramenta da
	matemática para facilitar, em muito, nossa vida.
	Sim, não poderia ficar de fora nosso amigo vetor
	2d. Elemento muito importante para fisica, principalmente
	quando se trata de ensino médio.

	basicamente, um vetor 2d é uma entidade matemática, capaz
	de armazernar dois valores que tenão a mesma natureza, que
	sejam idependente, e são indisociaveis.

	por exemplo: 
		para determinar a posição de uma furmiga sobre a mesa.
	naturalmente, voce tera que falar a que autura e que largura
		a furmiga esta da messa. Dessa forma, largura e altura tem
	a mesma natureza, ou seja, são tipos de comprimentos.
		o fato de a formiga subir, não a impede de andar para o lada
	ou seja, esse valores são independentes. Entretanto, so podemos
	dizer aonde a formiga esta encima da mesa, se falarmos a que 
	altura esta, assim como, a que largura.

	Então, iniciemos a reprodução dessa feramenta
*/
var vec2 = function(objx,objy){
	//coodernadas do vetor
		this.x;
		this.y;
	if ((typeof objx != 'object')&&(objy != 'object')) {
		//esse bloco é executado se os valores passados forem numeros
		this.x = objx;
		this.y = objy;
	}else if (typeof objx == 'object'){
		//esse bloco é executado se o argumento principal for outro vetor
		this.x = objx.x;
		this.y = objx.y;
	}else {
		// caso os argumentos não sejam válidos, criamos o vetor
		// porem, nulo.
		this.x = 0;
		this.y = 0;
		console.log('o valor passado, não é valido: vetor anulado!');
	}
	// apos instaciarmos o vetor, estamos livres para desenvolver suas
    // propiedades.
    
    //verificar vetor
    this.teste_vec2 = (vector_teste)=>{
        if(typeof vector_teste == 'undefined'){
            return false;
        }if(!isNaN(vector_teste)){
            return false;
        }else if (Object.getPrototypeOf(this)==Object.getPrototypeOf(vector_teste)) {
            return true;
        } else {
            return false;
        }

    }
	//função que retorna o comprimento do vetor
	this.comprimento = function(ox,oy){
		if (typeof oy != 'undefined') {

			var x = ox;
			var y = oy;

		}else if (this.teste_vec2(ox)) {
			var x = ox.x;
			var y = ox.y;
		}else{
			var x = this.x;
			var y = this.y;
		}
		var r2 = x*x +y*y;

		return Math.sqrt(r2);
	}
	//função que retorna produto interno
	/*
	 *	produto interno é uma importante operação vetorial
	 *	muito importante para fazer comparação entre vetores.
	 *	Uma das varias utilidades desse elemento é descopri
	 *	o angulo entre dois vetores.
	 *	LEMBREM-SE: vetores são representações matemáticas de
	 *	coisas reais.
	 */
	this.somar = (vetor1,vetor2)=>{
		if (this.teste_vec2(vetor2) && this.teste_vec2(vetor1)) {
			// se o vetor 1 existir
			return new vec2(vetor1.x + vetor2.x, vetor1.y + vetor2.y);
		} else if(this.teste_vec2(vetor1)) {
			// se o vetor 1 não existir
			return new vec2(this.x + vetor1.x, this.y + vetor1.y);
		} else{
            console.error("Err:vec2: Essa função so aceita vetores como parametros.");
        }
	}
	this.subtrair = (vetor1,vetor2)=>{
		if (this.teste_vec2(vetor2) && this.teste_vec2(vetor1)) {
			// se o vetor 1 existir
			return new vec2(vetor1.x - vetor2.x, vetor1.y - vetor2.y);
		} else if(this.teste_vec2(vetor1)) {
			// se o vetor 1 não existir
			return new vec2(this.x - vetor1.x, this.y - vetor1.y);
		}else{
            console.error("Err:vec2: Essa função so aceita vetores como parametros.");
        }
	}
	this.escala = function(escala){
		this.x = this.x*escala;
		this.y = this.y*escala;
		return this;
	}
	this.produtoInterno = function(vetor1,vetor2){
		if (this.teste_vec2(vetor1)) {
			// se o vetor 1 existir
			var x1 = vetor1.x || 0;
			var y1 = vetor1.y || 0;
		} else {
			// se o vetor 1 não existir
			var x1 = 0;
			var y1 = 0;
			console.warn('Para termos um resultado eficiente, é necessario passar como parametro pelomenos um vetor.');
		}
		if (this.teste_vec2(vetor2)) {
			// se o vetor 2 existir
			var x2 = vetor2.x || this.x;
			var y2 = vetor2.y || this.y;
		} else {
			// se o vetor 2 não existir
			var x2 = this.x;
			var y2 = this.y;
		}
		var r2 = x1*x2 +y1*y2;
		return r2;
	}
	/*
		Esse vetor será ou o oposto do vetor informado
		ou
		o oposto do vetor instanciado.
	*/
	this.oposto = function(vx,vy){
		var _x;
		var _y;
		if ((typeof vx == 'number')&&(vy == 'number')) {
			//esse bloco é executado se os valores passados forem numeros
			_x = -vx;
			_y = -vy;
		}else if (this.teste_vec2(vx)){
			//esse bloco é executado se o argumento principal for outro vetor
			_x = -vx.x;
			_y = -vx.y;
		}else {
			// caso os argumentos não sejam válidos, criamos o vetor
			// porem, nulo.
			_x = - this.x;
			_y= - this.y;
		}
		return new vec2(_x,_y);
	}
	/*
		O ângulo de referência será o angulo que o vetor criado fará com
		com o eixo x.
		Poderiamos escolher ambos os eixos, tantos x como y, entretanto, 
		escolhemos o eixo x, devido esse eixo ser mais escolhido como
		convenção matemática
		Esse objeto é muito importante pois pode nos auxiliar como passo
		intermediario em vários calculos.
	*/
	this.angulo_entre_vetores = function(vetor1,vetor2){
		//comprimento do primeiro vetor
		var modulo_v1 = this.comprimento(vetor1);
		//comprimento do segundo vetor 
		var modulo_v2 = this.comprimento(vetor2);
		//produto escalar entre os vetores (na verdade, essa propriedade e tipo uma comparação entre os vetores).
		var produto = this.produtoInterno(vetor1,vetor2);
		//abaixo o cosseno entre os vetores 
		var cos_diretor = produto/(modulo_v1*modulo_v2);
		return Math.acos(cos_diretor);
	}
	/*
		Vetores Patão:

		Nessa parte de nosso objeto Vetor, Definiremos 4 vetores basicos que servirão de orientação
		para nossos Trabalhos
	*/
	this.a_cima = ()=>{ 
		//vetor que aponta para cima
		return new vec2(0,1);
	}
	this.a_baixo = ()=>{ 
		//vetor que aponta para baixo
		return new vec2(0,-1);
	}
	this.a_direita = ()=>{ 
		//vetor que aponta para direita
		return new vec2(1,0);
	}
	this.a_esquerda = ()=>{ 
		//vetor que aponta para baixo
		return new vec2(-1,0);
	}
	/*
		Angulo Entre eese vetor e o vetor x
	*/
	this.angulo_com_eixo_x =function(vetor1){
		//Angulo entre o eixo x e o vetor escolhido
		//Esse Vetor Sera usado para Fazer calculos Vetoriais
		var calculador = new vec2(0,0);
		//A linha abaixo é nosso Vetor a direita, que deixaremos como padrao para representar o eixo x
		var eixo_x = calculador.a_direita();
		//verificação de tipo dos parametros
		//caso tenhamos parametros, ou seja, se vetor1 for de fato um vetor
		if (this.teste_vec2(vetor1)) {
			//calcular o produto interno do vetor1
			var Inter = calculador.produtoInterno(vetor1,eixo_x);
			//calcular o cosseno diretor
			var _cos = Inter/(calculador.comprimento(vetor1)*calculador.comprimento(eixo_x));
		}else {//se não ...
			//calcular o produto interno do propio vetor que chamou o metodo
			var Inter = calculador.produtoInterno(this,eixo_x);
			//calcular o cosseno diretor
			var _cos = Inter/(calculador.comprimento(this)*calculador.comprimento(eixo_x));
		}
		return Math.acos(_cos)*180/Math.PI;
	}
	this.angulo_com_eixo_y = function(vetor1){
		//Angulo entre o eixo y e o vetor escolhido
		//Esse Vetor Sera usado para Fazer calculos Vetoriais
		var calculador = new vec2(0,0);
		//A linha abaixo é nosso Vetor a cima, que deixaremos como padrao para representar o eixo y
		var eixo_y = calculador.a_cima();
		//verificação de tipo dos parametros
		//caso tenhamos parametros, ou seja, se vetor1 for de fato um vetor
		if (this.teste_vec2(vetor1)) {
			//calcular o produto interno do vetor1
			var Inter = calculador.produtoInterno(vetor1,eixo_y);
			//calcular o cosseno diretor
			var _cos = Inter/(calculador.comprimento(vetor1)*calculador.comprimento(eixo_y));
		}else {//se não ...
			//calcular o produto interno do propio vetor que chamou o metodo
			var Inter = calculador.produtoInterno(this,eixo_y);
			//calcular o cosseno diretor
			var _cos = Inter/(calculador.comprimento(this)*calculador.comprimento(eixo_y));
		}
		return Math.acos(_cos)*180/Math.PI;
	}
	this.angulo_tg = (vector1,vector2)=>{
		var calculador = new vec2(0,0);
		if (this.teste_vec2(vector2)) {
			// se o vetor 1 existir
			var deslocamento = calculador.subtrair(vector1,vector2); 
			var teta_x = calculador.angulo_com_eixo_x(deslocamento);
			if (vector1.y>vector2.y) {
				teta_x = 360 -teta_x;
			}
		} else {
			// se o vetor 1 não existir
			var deslocamento = calculador.subtrair(vector1,this); 
			var teta_x = calculador.angulo_com_eixo_x(deslocamento);
			if (this.y>vector1.y) {
				teta_x = 360 -teta_x;
			}
		}
		return teta_x;
	}
	this.vetor_alvo_unitario = (vector1,vector2)=>{
		var calculador = new vec2(0,0);
		var angulo = 0;
		if (this.teste_vec2(vector2)) {
			angulo = calculador.angulo_tg(vector1,vector2);
			return new vec2(Math.cos(angulo*Math.PI/180),Math.sin(angulo*Math.PI/180));
		} else {
			angulo = this.angulo_tg(vector1);
			return new vec2(Math.cos(angulo*Math.PI/180),Math.sin(angulo*Math.PI/180));
		}
	}

	// Vetor Rotação

	this.vetor_rotacao = (angulo,vector1 = this)=>{
		var calculador = new vec2(0,0);
		var x;
		var y;
		if(this.teste_vec2(vector2)){
			x = (vector1.x)*Math.cos(angulo*Math.PI/180) -(vector1.y)*Math.sin(angulo*Math.PI/180);
			y = (vector1.x)*Math.sin(angulo*Math.PI/180) +(vector1.y)*Math.cos(angulo*Math.PI/180);
			return new vec2(x,y);
		}else{
			console.warn('o objeto informado não é um vetor');
		}
	}

	//informações do vector
	this.vec_log = function(){
		return `vec(${this.x},${this.y}) ## modulo: ${this.comprimento().toFixed(2)}`;
	}
	this.clone = function(){
		return new vec2(this.x,this.y);
	}
}
export {vec2};