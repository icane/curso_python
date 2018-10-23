 function llamarfunciontraduccion() {
  _ = {
    t: function (literal)
    {
      return literal;
    }
  }   
}
  var sPassword = "";
  var sUsuario = "";
  var sRama = "";
  var publicContactId = "";
  
  $(document).ready(function(){
    $("input#text_eai_user, input#eai_user").change(function(){
        var a = $("section.m-sign-in");
      a.find(".c-input-box__icon:first").removeClass("c-icon-alert")
      a.find(".c-input-box:first").removeClass("is-invalid"), 
      $("form#formEmpleados").find("#text_eai_user").val("");
      $("form#formEmpleados").find("#eai_user").val("");
      if(!a.find(".c-input-box:last").hasClass("is-invalid")){
         a.find(".c-input-box__description:first").html("")
         a.find(".c-input-box__description:last").html("")
      }
      
    });
    $("input#text_eai_password, input#eai_password").change(function(){
        var a = $("section.m-sign-in");
      a.find(".c-input-box__icon:last").removeClass("c-icon-alert")
      a.find(".c-input-box:last").removeClass("is-invalid"), 
      $("form#formEmpleados").find("#text_eai_password").val("");
      $("form#formEmpleados").find("#eai_password").val("");
      if(!a.find(".c-input-box:first").hasClass("is-invalid")){
         a.find(".c-input-box__description:first").html("")
         a.find(".c-input-box__description:last").html("")
      }
      
    });

    $("form#loginEmpleados").submit(function(event){
     event.preventDefault();
     event.stopPropagation();
     validarCamposVacios();
    });
    var dominio = getCurrentDomain() == "ei.bbva.es" ? ".bbva.es" : getCurrentDomain();
    /*if (document.referrer.indexOf(dominio) == -1) {
      $.cookie('contactId', "", { path: '/', domain: dominio});
    }*/
    if ($.cookie("HTTP_CONTACTID") == null || $.cookie("HTTP_CONTACTID") == "") {
      publicContactId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          var r = Math.random() * 16 | 0;
          var v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        }
      );
      $.cookie('HTTP_CONTACTID', publicContactId, { path: '/', domain: dominio});
      $.cookie('contactId', publicContactId, { path: '/', domain: dominio});
    }
  });

    /*function SetCookie(name, value, date, path, dom){
      document.cookie = name + "=" + escape (value) + ", expires=" + date + ", path=" + path + ", domain=" + getCurrentDomain();
    }  */
    function getCurrentDomain () {
      if(window.location.hostname.indexOf("ei-bbvaglobal") != -1){
        return "ei.bbva.es";
      }else{
        return window.location.hostname.split('.').slice(-2).join('.');
      }
    }
  function getPrivateDomain(dominio){  
    var date = new Date();
    var now = date.toLocaleDateString().split("/").join("");
	
	if($.cookie("rama") != null){
	  sRama = $.cookie("rama");
	}else if(dominio.indexOf("ei.bbva.es") != -1){
	  sRama = "develop"; 
	}else{    
	  sRama = "release";
	}   
	
    if($("#eai_url_params").val() != ""){
      if(dominio != "qa.grupobbva.com" && dominio != "ei.bbva.es"){
      return $("#eai_url_params").val().replace("/#", "/index.html?v="+now+"#");
      }else{
      return $("#eai_url_params").val().replace("/#", "/"+sRama+"/index.html?v="+now+"#");  
      }
    }else{
      if (dominio.indexOf("ei.bbva.es") != -1 || dominio.indexOf("ei-bbvaglobal") != -1){
        return "https://pre.web.bbva.es/ei/"+sRama+"/index.html?v="+now;
      }else if(dominio.indexOf("qa.grupobbva.com") != -1 || dominio.indexOf("qa2.grupobbva.com") != -1){
        return "https://qa.web.grupobbva.com/"+sRama+"/index.html?v="+now;
      }else if(dominio.indexOf("au.bbva.es") != -1 || dominio.indexOf("au-bbvaglobal.igrupobbva") != -1) {
        return "https://pre.web.bbva.es/au/release/index.html?v="+now;
      }else{
        return "https://web.bbva.es/index.html?v="+now;
      }
    }
  }
  function getPayload (sPassword, sUsuario, multistepProcessId) {
    var payload = {
      authentication: {
        consumerID: '00000001',
        authenticationData: [{
          authenticationData: [
            sPassword
          ],
          idAuthenticationData: 'password'
        }],
        authenticationType: '02',
        userID: fillUser(sUsuario.trim()).toUpperCase()
      }
    };
   
    // If the password is currently being changed
    if (multistepProcessId) {
      payload.authentication.authenticationData[0].idAuthenticationData = 'newpassword';
      payload.authentication.multistepProcessId = multistepProcessId;
    }
   
    return payload;
  }

  function fillUser (txt) {
    var prefix = '0019-';
    var letra = txt.charAt(txt.length-1);
  var primer_caracter = txt.charAt(0);
  if (!isNaN(letra) && !isNaN (primer_caracter) && txt.length == 16) {
    //PAN
      return txt;  
  } else if (txt.length <= 10) {
    if (isNaN(letra) && isNaN(primer_caracter)){
      if (txt.length == 9 && ["X", "Y", "Z"].includes(primer_caracter.toUpperCase())) {
        //NIE
        return prefix + String('0000000000' + txt).slice(-9);
      } else {
        //Pasaporte
        return prefix + txt;
      }
    } else if (isNaN(letra)) {
      //NIF
      return prefix + String('0000000000' + txt).slice(-10);
    } else {
      //resto (Pasaporte)
      return prefix + txt;      
    }
  } else {
    //resto (Pasaporte)
    return prefix + txt;
  }
  /*var prefix = '0019-';
  if(txt.length > 10){
    return txt;
  }else{
    var letra = txt.charAt(txt.length-1);
    var primer_caracter = txt.charAt(0);
    if(isNaN(letra) && isNaN (primer_caracter)){
      return prefix + String('0000000000' + txt).slice(-9);
    }else{
      return prefix + String('0000000000' + txt).slice(-10);
    }
  }*/
  }
  
  	function pintaErrores(campo, mensaje){
		$("#"+campo+"").parent().parent().addClass("is-invalid");
		$("#"+campo+"").attr("aria-describedby", campo+"-description");
		$("#"+campo+"").parent().find(".m-validation__error").html($("#"+campo+"").parent().find(".m-validation__error").html().trim().substring(0,$("#"+campo+"").parent().find(".m-validation__error").html().trim().indexOf("</i>")+4)+mensaje);
	}
  
  
  
   function gestionaErrores(mensaje, o){
      llamarfunciontraduccion();
      if ($("section.m-sign-in").length == 0) {
        $("div#validationSummaryOutput").css({'font-size': '1.2em','margin-bottom': '.417em','min-height': '1.083em','padding-top': '.5em'});
        $("section.validationSummaryWrapper h1").remove();
        $("div#validationSummaryOutput").html(mensaje);
        $( "section.validationSummaryWrapper" ).show("slow");
      } else {
        if(o == 1){
			pintaErrores("text_eai_password", mensaje);
        }else if(o == 2){
          pintaErrores("text_eai_password", mensaje);
        }else if(o == 3){
          pintaErrores("text_eai_password", mensaje);
        }
      }
      
    } 
  function validarCamposVacios()
  {
    llamarfunciontraduccion();
     var a = $("section.m-sign-in");
       a.find(".c-input-box__description").html(""), a.find(".c-input-box__icon").removeClass("c-icon-alert"), a.find("div.c-input-box").removeClass("is-invalid"), $("form#form").find("#eai_user").val(""), $("form#form").find("#eai_password").val("")
     $( "section.validationSummaryWrapper" ).hide("slow");
     $("section.validationSummaryWrapper #validationSummaryOutput p.entradilla").html("");  
     if($("form#loginEmpleados #text_eai_user").length){
       var user = $("form#loginEmpleados").find("#text_eai_user");
     }else{
       var user = $("form#loginEmpleados").find("#eai_user");
     }
     
     if($("form#loginEmpleados #text_eai_password").length){
       var pass = $("form#loginEmpleados").find("#text_eai_password");  
     }else{
       var pass = $("form#loginEmpleados").find("#eai_password"); 
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
          //grabarCookieAceptaCookiesLogin();
          accesoOffice();
        } 
        else //Es un usuario de Net
        {
          $("form#login span.c-botones-generico input#acceder").attr("disabled", "true");
          //grabarCookieAceptaCookiesLogin();
          validar();
        }
        return false;
      }
    }
  }
  function validar()
  {   
    llamarfunciontraduccion();
      if($("form#loginEmpleados #text_eai_password").length){
        pass = $("form#loginEmpleados").find("#text_eai_password").val();     
    }else{
      pass = $("form#loginEmpleados").find("#eai_password").val();      
    }
    
    if($("form#loginEmpleados #text_eai_user").length){
        user = $("form#loginEmpleados").find("#text_eai_user").val(); 
    }else{
      user = $("form#loginEmpleados").find("#eai_user").val();      
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
    { //si tiene almenos una letra, será un dni o un pasaporte
      if ((isNaN(letra) == true) && (isNaN(numero)==false)) //Si el último valor es una letra, y el resto es
      {             //numero, se trata del dni
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
            login(pass, user);
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
            login(pass, user);
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
            login(pass, user);
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
        login(pass, user);
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
        user=tarj + "" + cifra;
      }     
      login(pass, user);
    }
    
    }
    
  function login (sPassword, sUsuario, multistepProcessId) {
  llamarfunciontraduccion();
    $.ajax({
      cache: false,
      url: 'https://' + document.domain + '/ASO/TechArchitecture/grantingTickets/V02',
	  headers: {
        "contactId": publicContactId
      },
      type: 'POST',
      async: true,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(getPayload(sPassword, sUsuario, multistepProcessId)),
      dataType: 'json',
      success: function (data, textStatus, request) {
        if (isSingleUseAccessKey(data)) {
          changeAccessKey(sUsuario, data.multistepProcessId);
          return;
        }
 
        delete data.user.alias;
        delete data.user.authenticationType;

        var now = new Date();
        var time = now.getTime() + 3600000; // 1 hour
        var loginAWS = {
          tsec: request.getResponseHeader('tsec'),
          tsecTimestamp: Date.now(),
          paramUser: JSON.stringify(data.user),
          codUser: sUsuario.slice(-3),
          //contactId: publicContactId,
          clearPersistence: $('input[type=hidden]#activeSession').attr('value')
        };
 
        now.setTime(time);
 
    //Codigo comentado el la subida de 130518
        /*if(window.location.hostname.indexOf("qa.grupobbva.com") != -1){
          $.cookie("idiomaAuto", $.cookie("idiomaAuto", {domain:'qa.grupobbva.com'}), {domain:'.grupobbva.com', path:'/'});
        }else if(window.location.hostname.indexOf("ei.bbva.es") != -1 || window.location.hostname.indexOf("ei-bbvaglobal.igrupobbva") != -1){
          $.cookie("idiomaAuto", $.cookie("idiomaAuto", {domain:'ei.bbva.es'}), {domain:'.bbva.es', path:'/'});
        }else{
          $.cookie("idiomaAuto", $.cookie("idiomaAuto", {domain:'www.bbva.es'}), {domain:'.bbva.es', path:'/'});
        }*/
        document.cookie = 'idiomaAuto=;expires=' + new Date(0).toUTCString() +
          '; path=/';
        document.cookie = 'loginAWS' + '=' + JSON.stringify(loginAWS) +
          ';expires=' + now.toUTCString() + ';path=/;domain=' +
          getCurrentDomain();

        if ($("#eai_url_params").val() !== ''){
          //parent.window.location.assign(getPrivateDomain(document.domain));
          //parent.window.location = document.domain.split('.').slice(-2).join('.');
	$.getScript("/estaticos/js/jquery.cookie.js", function(){
          parent.window.location = getPrivateDomain(document.domain);
	});
        } else {
          //window.location.assign(getPrivateDomain(document.domain));
          //window.location = document.domain.split('.').slice(-2).join('.');
	$.getScript("/estaticos/js/jquery.cookie.js", function(){
          window.location = getPrivateDomain(document.domain);
	});
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        if (xhr.status == 403){
          gestionaErrores(_.t('Usuario y/o clave de acceso incorrecta'), 3);
        } else {
          gestionaErrores(_.t('Servicio no disponible'), 3);
        }
      }
    });
  }
 
  function isSingleUseAccessKey (gtResponse) {
    return gtResponse.authenticationState === 'GO_ON' &&
      gtResponse.hasOwnProperty('multistepProcessId');
  }
 
  function changeAccessKey (user, multistepProcessId) {
    require(['change-access-key'], function (changeAccessKey) {
      changeAccessKey(function onAccessKeyChanged (newKey) {
        login(newKey, user, multistepProcessId);
      });
    });
  }
  
  	var versionFaldon="3";
	//nuevos valores cookie-obj
	var cookiesFaldon = '{ "version": 4, "tecnica": true, "publicidad": true, "personalizacion": true, "analitica": true } ';
	var json=($.cookie('aceptarCookies'));
	var objCookie = $.parseJSON(json);
	
    function grabarCookieAceptaCookiesLogin(){    
		if($.cookie('aceptarCookies')!= 'si'){
			if(objCookie.version!= versionFaldon && window==window.top){
				  //$.cookie('aceptarCookies', 'si',{expires:18250,path:'/'});     	  
				//$.cookie('aceptarCookies', versionFaldon,{expires:18250,path:'/'}); 
				$.cookie('aceptarCookies', cookiesFaldon,{expires:18250,path:'/'});					
				updateCookieAceptaCookies("version",versionFaldon);  
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
	//funcion para actualizar valor cookie
			function updateCookieAceptaCookies(nCookie,newValue){
				switch(nCookie) {
					case "version":
						cookiesFaldon = '{ "version":'+newValue+', "tecnica": true, "publicidad": true, "personalizacion": true, "analitica": true } ';
						$.cookie('aceptarCookies', cookiesFaldon,{expires:18250,path:'/'});  
						break;
					case "tecnica":
						cookiesFaldon = '{ "version":'+versionFaldon+', "tecnica":'+newValue+', "publicidad": true, "personalizacion": true, "analitica": true } ';
						$.cookie('aceptarCookies', cookiesFaldon,{expires:18250,path:'/'});  
						break;
					case "publicidad":
						cookiesFaldon = '{ "version":'+versionFaldon+', "tecnica": true, "publicidad":'+newValue+', "personalizacion": true, "analitica": true } ';
						$.cookie('aceptarCookies', cookiesFaldon,{expires:18250,path:'/'});  
						break;
					case "personalizacion":
						cookiesFaldon = '{ "version":'+versionFaldon+', "tecnica": true, "publicidad": true, "personalizacion":'+newValue+', "analitica": true } ';
						$.cookie('aceptarCookies', cookiesFaldon,{expires:18250,path:'/'});  
						break;
					case "analitica":
						cookiesFaldon = '{ "version":'+versionFaldon+', "tecnica": true, "publicidad": true, "personalizacion": true, "analitica":'+newValue+'} ';
						$.cookie('aceptarCookies', cookiesFaldon,{expires:18250,path:'/'});  
						break;
					default:
						cookiesFaldon = '{ "version":'+newValue+', "tecnica": true, "publicidad": true, "personalizacion": true, "analitica": true } ';
						$.cookie('aceptarCookies', cookiesFaldon,{expires:18250,path:'/'});  
						break;
				}

			};
  function validaNif(minif){
    llamarfunciontraduccion();
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
    llamarfunciontraduccion();
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