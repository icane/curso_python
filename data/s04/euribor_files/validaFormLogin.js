$(document).ready(function(){
	function validaNif(minif){
		var longMax = 10;
		var cerosquefaltan = 0;
		var ceros = "";
		var convertir_nif = true;
		var hayLetra = true;
		var valido = 0;
		var mensajeNif = "";

		if (minif.length == 0)
			return;

		if (minif.charAt(minif.length-1)< "0" || minif.charAt(minif.length-1)> "9"){
			cerosquefaltan=longMax-minif.length;
			for(var i = 1; i<=cerosquefaltan;i++) {
				ceros = ceros + "0";
			}
		}

		minif = ceros + minif;

		var nrodni    = minif.substring(0,longMax-1);
		var letradni  = minif.substring(longMax-1,longMax).toUpperCase();
		var cociente23        = 0;

		// comprueba que el nif sea numerico
		for (var i=0; i< nrodni.length; i++){
			var ch = nrodni.substring(i,i+1);
			if (ch < "0" || ch > "9"){
				convertir_nif = false;
			}
		}

		if (letradni.length == 0 || letradni == null){    
			mensajeNif = _.t("Por favor, escriba la letra del NIF");
			hayLetra = false;     
			return mensajeNif;
		}

		if (convertir_nif && hayLetra){
			cociente23  = nrodni % 23;
			if (((cociente23==0) && (letradni=="T")) ||
				((cociente23==1) && (letradni=="R")) ||
				((cociente23==2) && (letradni=="W")) ||
				((cociente23==3) && (letradni=="A")) ||
				((cociente23==4) && (letradni=="G")) ||
				((cociente23==5) && (letradni=="M")) ||
				((cociente23==6) && (letradni=="Y")) ||
				((cociente23==7) && (letradni=="F")) ||
				((cociente23==8) && (letradni=="P")) ||
				((cociente23==9) && (letradni=="D")) ||
				((cociente23==10) && (letradni=="X")) ||
				((cociente23==11) && (letradni=="B")) ||
				((cociente23==12) && (letradni=="N")) ||
				((cociente23==13) && (letradni=="J")) ||
				((cociente23==14) && (letradni=="Z")) ||
				((cociente23==15) && (letradni=="S")) ||
				((cociente23==16) && (letradni=="Q")) ||
				((cociente23==17) && (letradni=="V")) ||
				((cociente23==18) && (letradni=="H")) ||
				((cociente23==19) && (letradni=="L")) ||
				((cociente23==20) && (letradni=="C")) ||
				((cociente23==21) && (letradni=="K")) ||
				((cociente23==22) && (letradni=="E"))){
				valido=1
				return valido;
			}else{
				mensajeNif += _.t("La letra del NIF es incorrecta") ;
				return mensajeNif;
			}
		} else 
			if (!convertir_nif) {     
				mensajeNif += _.t("El NIF debe ser numérico") ;
			}
		return _.t(mensajeNif);
	}

	function validarNie(numDoc){
		var cadena = "XJLKMYZR";
		var primeraLet = numDoc.charAt(0);
		var dni = numDoc.substring(1,numDoc.length-1);
		var letdni = numDoc.charAt(numDoc.length-1);
		var valido = 0;
		var mensajeNie = "";

		if (cadena.indexOf(primeraLet.toUpperCase()) == -1){ //Primera Letra de la Tarjeta Incorrecta
			mensajeNie = _.t("La letra del NIE es incorrecta");
		}else if (!isNaN(letdni)){ //Falta la letra
			mensajeNie = _.t("Por favor, escriba la letra del NIE");
		}else{
			if(primeraLet.toUpperCase() == "Y"){
				dni = parseFloat(dni) + 10000000;
			}
			if(primeraLet.toUpperCase() == "Z"){
				dni = parseFloat(dni) + 20000000;
			}
			cadena = "TRWAGMYFPDXBNJZSQVHLCKET";
			posicion = dni % 23;
			letra = cadena.substring(posicion,posicion+1);

			if (letra!=letdni.toUpperCase()){ //Tarjeta no válido
				mensajeNie = _.t("La letra del NIE es incorrecta");
			}else{
				valido = 1;
				return valido;
			}
		}
		return _.t(mensajeNie);
	}
	
	function pintaErrores(campo, mensaje){
		$("#"+campo+"").parent().parent().addClass("is-invalid");
		$("#"+campo+"").attr("aria-describedby", campo+"-description");
		$("#"+campo+"").parent().find(".m-validation__error").html($("#"+campo+"").parent().find(".m-validation__error").html().trim().substring(0,$("#"+campo+"").parent().find(".m-validation__error").html().trim().indexOf("</i>")+4)+mensaje);
	}
	
	function campoValido(campo){
		$("#"+campo+"").parent().parent().removeClass("is-invalid");
		$("#"+campo+"").removeAttr("aria-describedby");
	}

	$("#text_eai_password").focusout(function(e){
		if($("#text_eai_password").val().length > 3 || $("#text_eai_password").val().length < 7){
			campoValido("text_eai_password");
			return false;
		}
	})
	
	$("#text_eai_user").focusout(function(e){
		var numtarjeta = $(this).val();
		var dni = $(this).val();
		var letra = dni.charAt(dni.length-1);
		var primer_caracter = dni.charAt(0);
		var segundo_caracter = dni.charAt(1);
		var numero = dni.substring(0,dni.length-1);
		var numeroNie = dni.substring(1,dni.length-1);
		if (isNaN($(this).val()) == true){
			if ((isNaN(letra) == true) && (isNaN(numero)==false)){
				var op = validaNif(dni);
				if (isNaN(op) == false){
					if(op == 1){
						campoValido("text_eai_user");
						return false;
					}else{
						pintaErrores("text_eai_user" ,"Formato DNI no válido");
						return false;
					}
				}else{
					pintaErrores("text_eai_user" ,op);
					return false;
				}
			}else if (isNaN (primer_caracter) && isNaN(segundo_caracter)){
				campoValido("text_eai_user");
				return false;
			}else if (isNaN(letra) && isNaN (primer_caracter)){
				var op = validarNie(dni);
				if (!isNaN(op)){
					if(op == 1){
						campoValido("text_eai_user");
						return false;
					}else{
						pintaErrores("text_eai_user" ,"Formato NIE no válido");
						return false;
					}
				}else{
					pintaErrores("text_eai_user" , op);
					return false;
				}
			}else{
				campoValido("text_eai_user");
				return false;
			}
		}else{
			campoValido("text_eai_user");
			return false;
		}
	})
	
	function validarAcceso(){
		var numtarjeta = $("#text_eai_user").val();
		var dni = $("#text_eai_user").val();
		var letra = dni.charAt(dni.length-1);
		var primer_caracter = dni.charAt(0);
		var segundo_caracter = dni.charAt(1);
		var numero = dni.substring(0,dni.length-1);
		var numeroNie = dni.substring(1,dni.length-1);
		if (isNaN(dni) == true) //Si todo son números, es decir la variable es un número se trata de una tarjeta va al else
		{ //si tiene almenos una letra, será un dni o un pasaporte
			if ((isNaN(letra) == true) && (isNaN(numero)==false)) //Si el último valor es una letra, y el resto es
			{             //numero, se trata del dni
				var op = validaNif(dni);
				if (isNaN(op) == false){
					if(op == 1){
						var numNums = numero.length;
						for (var i=numNums; i<9;i++){
							numero = "0" + numero;
						}
						var dniFinal ="0019-" + numero + letra.toUpperCase();
						//login($("#text_eai_password").val(), $("#text_eai_user").val());
					}else{
						pintaErrores("text_eai_user" ,"Formato DNI no válido");
					}
				}else{
					pintaErrores("text_eai_user" ,op);
					return false;
				}
			}else if (isNaN (primer_caracter) && isNaN(segundo_caracter)){
				var numNums = numeroNie.length;         
				var dniFinal ="0019-" + dni.toUpperCase();          
				//login($("#text_eai_password").val(), $("#text_eai_user").val());
			}else if (isNaN(letra) && isNaN (primer_caracter)){ //Es un NIE
				var op = validarNie(dni);
				if (!isNaN(op)){
					if(op == 1){
						var numNums = numeroNie.length;           
						var dniFinal ="0019-" + dni.toUpperCase();
						//login($("#text_eai_password").val(), $("#text_eai_user").val());
					}else{
						pintaErrores("text_eai_user" ,"Formato NIE no válido");
					}
				}else{
					pintaErrores("text_eai_user" , op);
				}
			}else{ //Es un pasaporte
				var dniFinal ="0019-" + dni.toUpperCase();
				//login($("#text_eai_password").val(), $("#text_eai_user").val());
			}
		}else{
			if ($("#text_eai_user").val().length == 9){
				var tarj = "404134" + numtarjeta;
				var par = 0;
				var impar = 0;
				var totalPar = 0;
				var totalImpar = 0;
				var totalUnaCifra = 0;
				var total = 0;
				var suma = 0;
				var cifra = 0;
				var tarjFinal = "";
				for(i=0;i<tarj.length;i++){
					if(i % 2 != 0){
						par=tarj.charAt(i);
						totalPar = (par*1)+(totalPar*1);
					}else{
						impar = tarj.charAt(i) * 2;
						if(impar > 9){
							cadena=impar+""; 
							suma = (cadena.substring(0,1)*1) + (cadena.substring(cadena.length-1)*1);
							totalImpar = totalImpar + suma;
						}else{
							totalUnaCifra = (totalUnaCifra*1) + (impar*1);
						}
					}
				}
				total = totalPar + totalImpar + totalUnaCifra;
				sumatotal= total+"";
				if ((sumatotal.substring(sumatotal.length-1)*1) == 0){
					cifra = 0;
				}else{
					cifra = (10*1) - (sumatotal.substring(sumatotal.length-1)*1);
				}
				var userLogin = tarj + "" + cifra;
			}
			//login($("#text_eai_password").val(), userLogin);
		}
	}

	function validacionLogin(){
		if($("#text_eai_user").val() != "" && $("#text_eai_password").val() != ""){
			if($("#text_eai_password").val().length < 4 || $("#text_eai_password").val().length > 6){
				pintaErrores("text_eai_password", "La longitud de la clave de acceso debe ser entre 4 y 6 caracteres");
				return false;
			}else{
				validarAcceso();
			}
		}else{
			if($("#text_eai_user").val() == "" && $("#text_eai_password").val() == ""){
				pintaErrores("text_eai_password", "Introduce usuario y clave de acceso");
				$("#text_eai_user").focus();
			}else if($("#text_eai_user").val() == ""){
				pintaErrores("text_eai_user", "Introduce usuario");
				$("#text_eai_user").focus();
			}else{
				pintaErrores("text_eai_password", "Introduce clave de acceso");
				$("#text_eai_password").focus();
			}
			return false;
		}
	}

	$("form#loginEmpleados").submit(function(event){
		event.preventDefault();
		event.stopPropagation();
		validacionLogin();
	});
})