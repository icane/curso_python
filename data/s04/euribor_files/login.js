//funcion que sobreescribe el AT para traducir textos
function llamarfunciontraduccion() {
  _ = {
    t: function (literal)
    {
      return literal;
    }
  }   

}

$(document).ready(function() {		
	$.fn.placeholder = function(){
    // Ingnoramos si el navegador soporta nativamente esta funcionalidad
	  if (!$.fn.placeholder.supported()){
			  return $(this);
	}
	 };		
		 
	$.fn.placeholder.supported = function(){
		var input = document.createElement('input');
			return !!('placeholder' in input);
	};
	
	if (!$.fn.placeholder.supported()){
		// Limitamos el comportamiento a los placehoder al formulario del login, si queremos que funcione en toda la web		
		$('form#login input[placeholder]').each(function(){				
			texto= $(this).attr('placeholder');
			$(this).parent().css({'position':'relative'})
			$(this).parent().append('<p class="place" style="position:absolute;left:9px;top:0px;font-family:Arial;font-size:12px;color:#a9a9a9;">'+texto+'</p>');
			// Color placeholder en mozilla #434a58 en Chrome #a9a9a9
			$(this).keypress(function() {
				$(this).siblings('.place').hide();
			});

			// Controlamos si se ha usado copia y pega 
			$(this).bind('paste', function(e) {
				$(this).siblings('.place').hide();
			});		
			
			$(this).blur(function(){
				if( $(this).val()==""){
				$(this).siblings('.place').show();
				}	
			});
	    });
	    
	    $('form#loginSub input[placeholder]').each(function(){				
			texto= $(this).attr('placeholder');
			$(this).parent().css({'position':'relative'})
			$(this).parent().append('<p class="place" style="position:absolute;left:9px;top:0px;font-family:Arial;font-size:12px;color:#a9a9a9;">'+texto+'</p>');
			// Color placeholder en mozilla #434a58 en Chrome #a9a9a9
			$(this).keypress(function() {
				$(this).siblings('.place').hide();
			});			
			
			// Controlamos si se ha usado copia y pega 
			$(this).bind('paste', function(e) {
				$(this).siblings('.place').hide();
			});			
			
			$(this).blur(function(){
				if( $(this).val()==""){
				$(this).siblings('.place').show();
				}	
			});			

	    });	
		
		$('.place').click( function(){
			$(this).siblings('input').focus();	
		});
	 }
	
	
	$("form#login").submit(function()
  {
  	if(isLocalStorageNameSupported()){
  		if (window.localStorage) {
  			var timestamp = new Date().getTime();
  			localStorage.setItem('timeStampLogin',timestamp); 
    	}
    }
  	depura();
  	return false;
  })
  
  
	$("form#loginSub").submit(function()
  {
  	depuraSub();
  	return false;
  }) 
  
  $("form#form2").find("a").click(function(e){
		e.preventDefault();
		$("form#form2").submit();
	})  
  
  $("form#form5").find("a").click(function(e){
		e.preventDefault();
		$("form#form5").submit();
	})
        
	function depura()
	{
		llamarfunciontraduccion()
	   var a = $("section.m-sign-in");
       a.find(".c-input-box__description").html(""), a.find(".c-input-box__icon").removeClass("c-icon-alert"), a.find("div.c-input-box").removeClass("is-invalid"), $("form#form").find("#eai_user").val(""), $("form#form").find("#eai_password").val("")
	$( "section.validationSummaryWrapper" ).hide("slow");
	$("section.validationSummaryWrapper #validationSummaryOutput p.entradilla").html("");
        if($("form#login #text_eai_user").length){
			var user = $("form#login").find("#text_eai_user");
		}else{
			var user = $("form#login").find("#eai_user");	
		}
		if($("form#login #text_eai_password").length){
			var pass = $("form#login").find("#text_eai_password");	
		}else{
			var pass = $("form#login").find("#eai_password");		
		}		
		        
		if($(user).val().length==0)
		{
			gestionaErrores(_.t("Debe introducir el número de usuario"), 1); 
			$(user).focus();
			return false;
		}
		else 
		{
			if($(pass).val().length==0)
			{
				gestionaErrores(_.t("Debe introducir la password"), 2) ;
				$(pass).focus();
				return false;
			} 
			else if($(pass).val().length < 4 || $(pass).val().length > 6){
				gestionaErrores(_.t("La longitud de la clave de acceso debe ser entre 4 y 6 caracteres"), 2) ;
				$(pass).focus();
				return false;
			}
			else 
			{
				var dni = $(user).val();
				var letra = dni.charAt(dni.length-1);							
			  if($(user).val().length==7 && ($(user).val()!="7777777") && ($(user).val()!="5555555") && ($(user).val()!="4444444") && (isNaN($(user).val())==false))
				{//Si el usuario introduce 7 caracteres  sin letras es un usuario de netOffice					 
					$("form#login span.c-botones-generico input#acceder").attr("disabled", "true");
					grabarCookieAceptaCookiesLogin();
					accesoOffice();
				}	
				else //Es un usuario de Net
				{
				  $("form#login span.c-botones-generico input#acceder").attr("disabled", "true");
				  grabarCookieAceptaCookiesLogin();
					aceptarTarjeta();
				}
				return false;
			}
		}
	}
/******************************************** RELATIVO A COOKIES LEGALES *************************/
	var versionFaldon="3";
// Hacer busqueda donde se llama  grabarCookieAceptaCookiesLogin();
	function grabarCookieAceptaCookiesLogin(){		
		if($.cookie('aceptarCookies')!= 'si'){
			if($.cookie('aceptarCookies')!= versionFaldon && window==window.top){
			    //$.cookie('aceptarCookies', 'si',{expires:18250,path:'/'});			
				$.cookie('aceptarCookies', versionFaldon,{expires:18250,path:'/'}); 
				$('.avisoCookies').hide();
				// si esta visible el div navegador obsoleto dejamos nargen
				if($('.aviso').is(':visible'))
				{
					$('.c-estructural-cabecera').css({'margin-top':'32px'});
				}
				else
				{
					$('.c-estructural-cabecera').css({'margin-top':'0px'});
				}		
			}
		}else if($.cookie('aceptarCookies')=="si"){
			$('.avisoCookies').show();
			//$.cookie('aceptarCookies', versionFaldon,{expires:18250,path:'/'}); 
		}
	};
 
	$('form#login .recuperar').click(function(){ grabarCookieAceptaCookiesLogin(); });     
    $('form#form2 .enlacePie .enlace').click(function(){ grabarCookieAceptaCookiesLogin(); }); 
	$('ul.c-menu-accesoUsuario li.last').click(function(){ grabarCookieAceptaCookiesLogin();}); 
	
/******************************************** FIN RELATIVO A COOKIES LEGALES **********************/	
	function isLocalStorageNameSupported() 
{
    var testKey = 'test', storage = window.localStorage;
    try 
    {
        storage.setItem(testKey, '1');
        storage.removeItem(testKey);
        return true;
    } 
    catch (error) 
    {
        return false;
    }
}	
	function depuraSub()
	{
	llamarfunciontraduccion()  				
	$( "section.validationSummaryWrapperSub" ).hide("slow");
	$("section.validationSummaryWrapperSub #validationSummaryOutput p.entradilla").html("");
        if($("form#loginSub #text_eai_user").length){	
			var user = $("form#loginSub").find("#text_eai_user");
		}else{
			var user = $("form#loginSub").find("#eai_user");			
		}
		if($("form#loginSub #text_eai_password").length){	
			var pass = $("form#loginSub").find("#text_eai_password");
		}else{
			var pass = $("form#loginSub").find("#eai_password");			
		}		
		       
		if($(user).val().length==0)
		{
			gestionaErroresSub(_.t("Debe introducir el número de usuario"), 1); 
			$(user).focus();
			return false;
		}
		else 
		{
			if($(pass).val().length==0)
			{
				gestionaErroresSub(_.t("Debe introducir la password"), 2) ;
				$(pass).focus();
				return false;
			} 
			else if($(pass).val().length < 4 || $(pass).val().length > 6){
				gestionaErroresSub(_.t("La longitud de la clave de acceso debe ser entre 4 y 6 caracteres"), 2) ;
				$(pass).focus();
				return false;
			}
			else 
			{
				var dni = $(user).val();
				var letra = dni.charAt(dni.length-1);
				
							
			  if($(user).val().length==7 && ($(user).val()!="7777777") && ($(user).val()!="5555555") && ($(user).val()!="4444444") && (isNaN($(user).val())==false))
				{//Si el usuario introduce 7 caracteres  sin letras es un usuario de netOffice				
					$("form#login span.c-botones-generico").hide();
					accesoOfficeSub();
				}	
				else //Es un usuario de Net
				{
				    $("form#login span.c-botones-generico").hide();
					aceptarTarjetaSub();
				}
				return false;
			}
		}
		
		
	}
	
	$("form#login").find("#text_eai_user").keyup(function(){
		if ($(this).length>15)
			$("form#login").find("#text_eai_password").focus();
	})
    $("form#loginSub").find("#text_eai_user").keyup(function(){
		if ($(this).length>15)
			$("form#loginSub").find("#text_eai_password").focus();
	})
	$("form#login").find("#eai_user").keyup(function(){
		if ($(this).length>15)
			$("form#login").find("#eai_password").focus();
	})
    $("form#loginSub").find("#eai_user").keyup(function(){
		if ($(this).length>15)
			$("form#loginSub").find("#eai_password").focus();
	})

	function esTarjetaFacil(bin)
	{
		if (bin=="404134")
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	function accesoOffice()
	{
		if($("form#login #text_eai_password").length){
			pass = $("form#login").find("#text_eai_password").val();
		}else{
			pass = $("form#login").find("#eai_password").val();	
		}
		$("#form3").find("#eai_password").val(pass);
		if($("form#login text_eai_user").length){
			user = $("form#login").find("#text_eai_user").val();
		}else{
			user = $("form#login").find("#eai_user").val();
		}
		$("#form3").find("#eai_user").val(user);
		//Se cambia el origen del formulario de bbvanet a bbvanetoffice
		$("#form3").find("#origen").val("office");
		$("#form3").find("#eai_URLDestino").val("/BBVANETOFFICE/bbvanetoffice/LogonServlet?action=index&version=2&desconexion=1&" + $("#form3 #eai_url_params").val());		
		$("#form3").attr("action","https://office.bbva.es/DFAUTH/slod/DFServlet")
		if(document.domain == "ei-bbvaglobal.igrupobbva"){
				$("#form3").attr("action","https://ei-office.bbvaglobal.igrupobbva/DFAUTH/slod/DFServlet");				
	  }
		else if(document.domain == "qa.grupobbva.com"){
				$("#form3").attr("action","https://qa.grupobbva.com/DFAUTH/slod/DFServlet");
				$("#form3").find("#eai_URLDestino").val("/BBVANETOFFICE_CLON/bbvanetoffice/LogonServlet?action=index&version=2&desconexion=1&" + $("#form3 #eai_url_params").val());		
	  }
		var sCampo = "<input id=\"eai_tipoCP\" type=\"hidden\" value=\"up\" name=\"eai_tipoCP\"/>";
		$("#form3").append(sCampo);		
		$("#form3").submit();
}
	function accesoOfficeSub()
	{
		if($("form#loginSub #text_eai_password").length){
			pass = $("form#loginSub").find("#text_eai_password").val();
		}else{
			pass = $("form#loginSub").find("#eai_password").val();	
		}

		$("#form4").find("#eai_password").val(pass);
		
		if($("form#loginSub #text_eai_user").length){
			user = $("form#loginSub").find("#eai_user").val();
		}else{
			user = $("form#loginSub").find("#text_eai_user").val();
		}

		$("#form4").find("#eai_user").val(user);
		//Se cambia el origen del formulario de bbvanet a bbvanetoffice
		$("#form4").find("#origen").val("office");
		$("#form4").find("#eai_URLDestino").val("/BBVANETOFFICE/bbvanetoffice/LogonServlet?action=index&version=2&desconexion=1&" + $("#form4 #eai_url_params").val());		
		$("#form4").attr("action","https://office.bbva.es/DFAUTH/slod/DFServlet")
		if(document.domain == "ei-bbvaglobal.igrupobbva"){
				$("#form4").attr("action","https://ei-office.bbvaglobal.igrupobbva/DFAUTH/slod/DFServlet");				
	  }
		else if(document.domain == "qa.grupobbva.com"){
				$("#form4").attr("action","https://qa.grupobbva.com/DFAUTH/slod/DFServlet");
				$("#form4").find("#eai_URLDestino").val("/BBVANETOFFICE_CLON/bbvanetoffice/LogonServlet?action=index&version=2&desconexion=1&" + $("#form4 #eai_url_params").val());		
	  }
		var sCampo = "<input id=\"eai_tipoCP\" type=\"hidden\" value=\"up\" name=\"eai_tipoCP\"/>";
		$("#form4").append(sCampo);	
		$("#form4").submit();	
}

	function aceptarTarjeta()
	{
		llamarfunciontraduccion()
		tarjeta_params = $("#form3").find("#eai_url_params").val();
		if($("form#login #text_eai_password").length){
			pass = $("form#login").find("#text_eai_password").val();
		}else{
			pass = $("form#login").find("#eai_password").val();	
		}			

		$("#form3").find("#eai_password").val(pass);
		if($("form#login #text_eai_user").length){
			user = $("form#login").find("#text_eai_user").val();
		}else{
			user = $("form#login").find("#eai_user").val();
		}	

		$("#form3").find("#eai_user").val(user);
		if(tarjeta_params != ""){
			if (tarjeta_params.indexOf("/BBVANet/") != 0)			
				$("#form3").find("#eai_URLDestino").val("/BBVANet/" + $("#form3").find("#eai_url_params").val());				
			else
				$("#form3").find("#eai_URLDestino").val($("#form3").find("#eai_url_params").val());
	  }else{		  
		  $("#form3").find("#eai_URLDestino").val("/BBVANet/");		  
	  }		
		numtarjeta = user;
		var bin = numtarjeta.substring(0,6);
	
		var dni = user;
		var letra = dni.charAt(dni.length-1);
		var primer_caracter = dni.charAt(0);
		var segundo_caracter = dni.charAt(1);
		var numero = dni.substring(0,dni.length-1);
		var numeroNie = dni.substring(1,dni.length-1);
		if (isNaN(dni) == true) //Si todo son números, es decir la variable es un número se trata de una tarjeta va al else
		{	//si tiene almenos una letra, será un dni o un pasaporte
			if ((isNaN(letra) == true) && (isNaN(numero)==false)) //Si el último valor es una letra, y el resto es
			{							//numero, se trata del dni
				var op = validaNif(dni);
				if (isNaN(op) == false)
				{
					if(op == 1)
					{
						var numNums = numero.length;
						for (var i=numNums; i<9;i++)
						{
							numero = "0" + numero;
						}
						var dniFinal ="0019-" + numero + letra.toUpperCase();
						$("#form3").find("#eai_user").val(dniFinal);					
						$("#form3").submit();
					}
					else
					{
						gestionaErrores(_.t("Formato DNI no válido"), 1);
					}
				}
				else
				{
					gestionaErrores(op, 1);
					return false;
					
				}
			}
			else if (isNaN (primer_caracter) && isNaN(segundo_caracter)){
					var numNums = numeroNie.length;					
					var dniFinal ="0019-" + dni.toUpperCase();
					
					$("#form3").find("#eai_user").val(dniFinal);
				    $("#form3").submit();
			}
			else if (isNaN(letra) && isNaN (primer_caracter)) //Es un NIE
			{
				var op = validarNie(dni)			  
				if (!isNaN(op))
				{
					if(op == 1)
					{
						var numNums = numeroNie.length;						
						var dniFinal ="0019-" + dni.toUpperCase();
						
						$("#form3").find("#eai_user").val(dniFinal);						
						$("#form3").submit();
					}
					else
					{
						gestionaErrores(_.t("Formato NIE no válido"), 1);
					}
				}
				else
				{
					gestionaErrores(op, 1);
				}
				
			}
			else //Es un pasaporte
			{
				var dniFinal ="0019-" + dni.toUpperCase();
				$("#form3").find("#eai_user").val(dniFinal);			
				$("#form3").submit();
			}			
		}
		else
		{	
			if (user.length == 9)
			{
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
				for(i=0;i<tarj.length;i++)
				{
					if(i % 2 != 0)
					{
						par=tarj.charAt(i);
						totalPar = (par*1)+(totalPar*1);
					}
					else
					{
						impar = tarj.charAt(i) * 2;
						if(impar > 9)
						{
							cadena=impar+""; 
							suma = (cadena.substring(0,1)*1) + (cadena.substring(cadena.length-1)*1);
							totalImpar = totalImpar + suma;
						}
						else
						{
							totalUnaCifra = (totalUnaCifra*1) + (impar*1);
						}
					}
				}
				total = totalPar + totalImpar + totalUnaCifra;
				sumatotal= total+"";
				if ((sumatotal.substring(sumatotal.length-1)*1) == 0)
				{
					cifra = 0;
				}
				else
				{
					cifra = (10*1) - (sumatotal.substring(sumatotal.length-1)*1);
				}
				$("#form3").find("#eai_user").val(tarj + "" + cifra);
			}
			else
			{
				$("#form3").find("#eai_user").val(user);
			}		
			$("#form3").submit();
		}
		
		}

	function aceptarTarjetaSub()
	{
		llamarfunciontraduccion()
		if($("form#loginSub #text_eai_password").length){
			pass = $("form#loginSub").find("#text_eai_password").val();
		}else{
			pass = $("form#loginSub").find("#eai_password").val();	
		}
		
		$("#form4").find("#eai_password").val(pass);
		
		if($("form#loginSub #text_eai_user").length){
			user = $("form#loginSub").find("#text_eai_user").val();
		}else{
			user = $("form#loginSub").find("#eai_user").val();	
		}
		

		$("#form4").find("#eai_user").val(user);
		if($("#form4").find("#eai_url_params").val() != ""){
		   $("#form4").find("#eai_URLDestino").val("/BBVANet/" + $("#form4").find("#eai_url_params").val());
	  }else{
	  	 $("#form4").find("#eai_URLDestino").val("/BBVANet/");
	  }
				
		numtarjeta = user;
		var bin = numtarjeta.substring(0,6);
	
		var dni = user;
		var letra = dni.charAt(dni.length-1);
		var primer_caracter = dni.charAt(0);
		var segundo_caracter = dni.charAt(1);
		var numero = dni.substring(0,dni.length-1);
		var numeroNie = dni.substring(1,dni.length-1);
		if (isNaN(dni) == true) //Si todo son números, es decir la variable es un número se trata de una tarjeta va al else
		{	//si tiene almenos una letra, será un dni o un pasaporte
			if ((isNaN(letra) == true) && (isNaN(numero)==false)) //Si el último valor es una letra, y el resto es
			{							//numero, se trata del dni
				var op = validaNif(dni);
				if (isNaN(op) == false)
				{
					if(op == 1)
					{
						var numNums = numero.length;
						for (var i=numNums; i<9;i++)
						{
							numero = "0" + numero;
						}
						var dniFinal ="0019-" + numero + letra.toUpperCase();
						$("#form4").find("#eai_user").val(dniFinal);						
						$("#form4").submit();
					}
					else
					{
						gestionaErroresSub(_.t("Formato DNI no válido"), 1);
					}
				}
				else
				{
					gestionaErroresSub(op, 1);
					return false;
					
				}
			}
			else if (isNaN (primer_caracter) && isNaN(segundo_caracter)){
					var numNums = numeroNie.length;					
					var dniFinal ="0019-" + dni.toUpperCase();
					
					$("#form4").find("#eai_user").val(dniFinal);				
				 $("#form4").submit();
			}
			else if (isNaN(letra) && isNaN (primer_caracter)) //Es un NIE
			{
				var op = validarNie(dni)			  
				if (!isNaN(op))
				{
					if(op == 1)
					{
						var numNums = numeroNie.length;						
						var dniFinal ="0019-" + dni.toUpperCase();						
						$("#form4").find("#eai_user").val(dniFinal);						
						$("#form4").submit();
					}
					else
					{
						gestionaErroresSub(_.t("Formato NIE no válido"), 1);
					}
				}
				else
				{
					gestionaErroresSub(op, 1);
				}
				
			}
			else //Es un pasaporte
			{
				var dniFinal ="0019-" + dni.toUpperCase();
				$("#form4").find("#eai_user").val(dniFinal);			
				$("#form4").submit();
			}			
		}
		else
		{	
			if (user.length == 9)
			{
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
				for(i=0;i<tarj.length;i++)
				{
					if(i % 2 != 0)
					{
						par=tarj.charAt(i);
						totalPar = (par*1)+(totalPar*1);
					}
					else
					{
						impar = tarj.charAt(i) * 2;
						if(impar > 9)
						{
							cadena=impar+""; 
							suma = (cadena.substring(0,1)*1) + (cadena.substring(cadena.length-1)*1);
							totalImpar = totalImpar + suma;
						}
						else
						{
							totalUnaCifra = (totalUnaCifra*1) + (impar*1);
						}
					}
				}
				total = totalPar + totalImpar + totalUnaCifra;
				sumatotal= total+"";
				if ((sumatotal.substring(sumatotal.length-1)*1) == 0)
				{
					cifra = 0;
				}
				else
				{
					cifra = (10*1) - (sumatotal.substring(sumatotal.length-1)*1);
				}
				$("#form4").find("#eai_user").val(tarj + "" + cifra);
			}
			else
			{
				$("#form4").find("#eai_user").val(user);
			}			
			$("#form4").submit();
		}		
		}

	function trackSelect2(){	
		depura();
	}

	function validaNif(minif){
		llamarfunciontraduccion()
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
	    $("form#login span.c-botones-generico input#acceder").removeAttr("disabled");
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
	      $("form#login span.c-botones-generico input#acceder").removeAttr("disabled");
	      return mensajeNif;
	    }
	  } else 
	  if (!convertir_nif) {	    
	    mensajeNif += _.t("El NIF debe ser numérico") ;
	    $("form#login span.c-botones-generico input#acceder").removeAttr("disabled");	   
	  }
	   return _.t(mensajeNif);
	}   // Fin de validaNif

	function validarNie(numDoc)
	{
		llamarfunciontraduccion()
		var cadena = "XJLKMYZR";
		var primeraLet = numDoc.charAt(0);
		var dni = numDoc.substring(1,numDoc.length-1);
		var letdni = numDoc.charAt(numDoc.length-1);
		var valido = 0;
		var mensajeNie = "";
		            
		if (cadena.indexOf(primeraLet.toUpperCase()) == -1)
		{
		  //Primera Letra de la Tarjeta Incorrecta
		   mensajeNie = _.t("La letra del NIE es incorrecta");
		}
		else if (!isNaN(letdni))
		{
		  //Falta la letra
		  mensajeNie = _.t("Por favor, escriba la letra del NIE");
		}else
		{
		  if(primeraLet.toUpperCase() == "Y")
		  {
		    dni = parseFloat(dni) + 10000000;
		  }    
		  if(primeraLet.toUpperCase() == "Z")
		  {
		    dni = parseFloat(dni) + 20000000;
		  }
		  
		  cadena = "TRWAGMYFPDXBNJZSQVHLCKET";
		  posicion = dni % 23;
		  letra = cadena.substring(posicion,posicion+1);
		  
		  if (letra!=letdni.toUpperCase())
		  {
		    //Tarjeta no válido
		    mensajeNie = _.t("La letra del NIE es incorrecta");
		  }
		  else
		  {
		  	valido = 1;
		  	return valido;
		  }
		 }
		return _.t(mensajeNie);
	}

	function enviarForm(e){
		if (e.keyCode == 13)
		{
			trackSelect2();
		}
	}
      
  function gestionaErrores( mensaje, o){
  	llamarfunciontraduccion()
      if(o == 1){
            var a = $("section.m-sign-in");
            a.find(".c-input-box__description:first").html(_.t(mensaje)), a.find(".c-input-box__icon:first").addClass("c-icon-alert"), a.find("div.c-input-box:first").addClass("is-invalid"), $("form#form").find("#eai_user").val(""), $("form#form").find("#eai_password").val("")
      }else if(o == 2){
           var a = $("section.m-sign-in");
           a.find(".c-input-box__description:last").html(_.t(mensaje)), a.find(".c-input-box__icon:last").addClass("c-icon-alert"), a.find("div.c-input-box:last").addClass("is-invalid"), $("form#form").find("#eai_user").val(""), $("form#form").find("#eai_password").val("")
      }
	}	

  function gestionaErroresSub( mensaje, o){
  	llamarfunciontraduccion()
    if(o == 1){
          var a = $("section.m-sign-in");
          a.find(".c-input-box__description:first").html(_.t(mensaje)), a.find(".c-input-box__icon:first").addClass("c-icon-alert"), a.find("div.c-input-box:first").addClass("is-invalid"), $("form#form").find("#eai_user").val(""), $("form#form").find("#eai_password").val("")
    }else if(o == 2){
          var a = $("section.m-sign-in");
          a.find(".c-input-box__description:last").html(_.t(mensaje)), a.find(".c-input-box__icon:last").addClass("c-icon-alert"), a.find("div.c-input-box:last").addClass("is-invalid"), $("form#form").find("#eai_user").val(""), $("form#form").find("#eai_password").val("")
    }
    $( "form#form4").find("#eai_user" ).val( "" );
    $( "form#form4").find("#eai_password" ).val( "" );
	}	
		
});

(function($){
	processFormData = function ( form ) {
		var loginData = $(form).formParams(false);
		return loginData;
	}
})( jQuery );