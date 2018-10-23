// JavaScript Document
	
	_ = {
			t: function (literal)
			{
				return literal;
			}
		}
	var esPerfil="";
	var errores_de_java_script=0;
	var versionFaldon="3";
	/*//creamos el objeto para la cookie y sus valores
	var cookiesFaldon = '{ "version": 4, "tecnica": true, "publicidad": true, "personalizacion": true, "analitica": true } ';
	//$.cookie('aceptarCookies', cookiesFaldon,{expires:18250,path:'/'}); 
	//$.cookie('aceptarCookies', cookiesFaldon,{expires:18250,path:'/'}); 
   // var cookiesFaldon = JSON.stringify({ "version": 4, "tecnica": true, "publicidad": false, "personalizacion": false, "analitica": false });
	//leemos el obj cookie
	var json=($.cookie('aceptarCookies'));
	var objCookie = $.parseJSON(json);*/
	window.onerror= function(msg, url, linenumber) {
		return false;
	};
	
		function  escribirCookieTestAB(){
			  var date = new Date();			          
        date.setTime(date.getTime() + (60 * 60 * 1000));
			  var parImpar = "";
			  var testAB = Math.floor((Math.random() * 10) + 1);
			  if(testAB%2==0){
			      parImpar = "par";
			  }else{
			  	  parImpar = "impar";
			  }
			  
			  if(!$.cookie("person_testa") && !$.cookie("person_testb")){
			  	 if(parImpar == "par"){
			  	 	  $.cookie("person_testa","testa", {expires: date, path: '/' });
			  	 	  $.cookie("person_testb","testb", {expires:-10000, path: '/' });
			  	 }else if(parImpar == "impar"){
			  	 	 	$.cookie("person_testa","testa", {expires:-10000, path: '/' });
			  	 	  $.cookie("person_testb","testb", {expires: date, path: '/' });
			  	 }
			  }
			  
			
		}	


  	//INI Desarrollo para sustitución CPD por Amazon
	try {
		var sPadre = window.parent.location.href.indexOf("/BBVANet/") == -1? "no": "si";
	}
	catch(err) {
		var sPadre = "no"
	}
    if($.cookie("forzarAntigua") == null /*&& $.cookie("isEmployee") != null */&& sPadre == "no"){     
      var date = new Date();
      var now = date.toLocaleDateString().split("/").join("");   
      var entornoPrivada = "https://web.bbva.es/index.html";
      var entornoPrivada2 = "https://web.bbva.es/public.html";
      var sRamaRedirect = "";
      var sLang = "";
      if($.cookie("rama") != null){
        sRamaRedirect = $.cookie("rama");
      }else{	  
        sRamaRedirect = "release";
      }	  
      if(document.domain.indexOf("ei") != -1){
        entornoPrivada = "https://pre.web.bbva.es/ei/"+sRamaRedirect+"/index.html?v="+now;
        entornoPrivada2 = "https://pre.web.bbva.es/ei/"+sRamaRedirect+"/public.html?v="+now;
      }else if(document.domain.indexOf("qa") != -1){
        entornoPrivada = "https://qa.web.grupobbva.com/"+sRamaRedirect+"/index.html?v="+now;
        entornoPrivada2 = "https://qa.web.grupobbva.com/"+sRamaRedirect+"/public.html?v="+now;
      }else{
        entornoPrivada = "https://web.bbva.es/index.html?v="+now;
        entornoPrivada2 = "https://web.bbva.es/public.html?v="+now;
      }
      if (document.location.href.indexOf("/cat/") != -1) {
      	sLang = "/cat";
      } else if (document.location.href.indexOf("/eng/") != -1) {
      	sLang = "/eng";
      }
    }
    //END Desarrollo para sustitución CPD por Amazon
   /***********************************FUNCIONES RELATIVAS AL ANCLA**************************************************/
	
	 function subirScroll(){
	  	 $("html, body").animate({scrollTop:"0px"},{duration:500,easing:"swing"});
	  }
	  
	  function cambiarOverOn(){
	  	   $("#anclaArriba img").attr("src", "/estaticos/mult/anclaHover.png");	 
	  }
	  
	  function cambiarOverOut(){
	  	   $("#anclaArriba img").attr("src", "/estaticos/mult/ancla.png");	 
	  }  
	  
  $(document).ready(function() {
	  
		

	 // if(($.cookie("cintilla-renta-201805") == null || $.cookie("cintilla-renta-201805") != "1") && window.location.href.indexOf("mb=si") == -1){
	   // $("body").prepend("<style>.for-eur a{color: #FFFFFF;}.for-eur a:hover{color: #FFFFFF;border-bottom: 1px #FFFFFF solid;}.for-eur{height: 4.8rem;background: #DA3851;text-align: center; }.for-eur p {text-align: center;margin-left: 4.8rem;line-height: 4.8rem;font-size: 1.4rem;font-family: \"BBVA Web Medium\", sans-serif;  color: #FFFFFF;text-transform: uppercase;display: inline-block; }.for-eur img {margin-left: 1.6rem;}.for-eur span {float: right;cursor: pointer;}.for-eur span:hover:before{color: #FFFFFF; }.for-eur span:before {line-height: 4.5rem;font-size: 2.4rem; margin-right: 2.4rem;color: #FFFFFF;display: inline-block;vertical-align: top; }.for-eur span.c-icon-close:before {font-size: 1.6rem;}</style>");
       // $("div.reset-c:first").prepend("<div class='reset-c'><div class='for-eur'><p><a href='/general/finanzas-vistazo/planes-de-pensiones/renta-2017/index.jsp' title='"+_.t("RENTA 2017 - TODO LO QUE DEBES SABER")+"'>"+_.t("RENTA 2017 - TODO LO QUE DEBES SABER")+"<span class=\"c-icon-forward\"></span></a></p><span class='c-icon-close'></span></div></div>");
       // $(".for-eur span").on("click",function(){
         // $(this).parent().parent().css("display","none");
		 // $.cookie("cintilla-renta-201805", "1", {path:"/"});
       // });
	 // }
	 
	 
	
	var mb = getQueryVariable("mb");

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
        if (pair[1] == "si"){
            esPerfil = "CLI";
        }else{
            esPerfil = "PUB";
        }
    }else{
        esPerfil = "PUB";
    }
  }
}
  redimensionarNavBar(false);  
	  
  	if ($.cookie('redirOn')== 'si'){
  		$.cookie('redirOn', 'no', { path: '/' });
  	}else{
  		$.cookie('refInterno', document.referrer, { path: '/' });
  	}
  	
  	        
  	        var anteriorPulsada="";
  	        $("body").click(function(e){
                    if($(e.target).parent().attr("class") != "c-botones-generico" && !$(e.target).parents(".c-login-accesoUsuario").length && !$(e.target).hasClass("c-login-accesoUsuario")){
                            if($(".c-login-accesoUsuario").is(":visible")){
                                      $(".c-login-accesoUsuario").hide();
                                      $(".c-menu-accesoUsuario li.activo").removeClass("activo");
                            }
                    }
                    if($(e.target).parent().attr("class") != "ayuda" && $(e.target).parent().attr("class") != "ayuda conectado"){
                    	if($("li.ayuda .c-menu-cabecera").is(":visible")){
                    		$("li.ayuda .c-menu-cabecera").hide();
                    	}
                    }
                    if($(e.target).parent().attr("class") != "idiomas"){
                    	if($("li.idiomas #menuidiomas").is(":visible")){
                    		 $("li.idiomas #menuidiomas").hide();
                    	}
                    }
            });
              
            escribirCookieTestAB();

         $("p.b_90x20,p.b_110x30").click(function(e){
            if($(e.target).prop("tagName") == "P"){            	    
            	  if($(e.target).children("a").attr("target") != "Popin"){
            	     document.location.href = $(e.target).children().attr("href");
            	  }else{
            	  	$(e.target).children().click();
            	  }
            }	 
         });
         
         
  	 if($(".fichaPestaniasInferior aside").html()==null || $(".fichaPestaniasInferior aside").html().trim()==""){     
			$(".fichaPestaniasInferior .texto.wysiwyg table").each(function(){                
                  var estiloTabla = $(this).attr("width");
			      if(estiloTabla!=null && estiloTabla.indexOf("%")==-1){
			          $(this).attr("width","100%");
			      }
			      
				  var estiloTablaStyle = $(this).attr("style");
			      if (estiloTablaStyle!=null&&estiloTablaStyle.toLowerCase().indexOf("width")>-1){
			           estiloTablaStyle=estiloTablaStyle.toLowerCase();
			           var ArrayTablaStyle= estiloTablaStyle.split(";");
			       	   for(var i=0; i<ArrayTablaStyle.length; i++){
			               	if( ArrayTablaStyle[i].indexOf("width")>-1){
			                     if(ArrayTablaStyle[i].indexOf("%")==-1){
			        	               estiloTablaStyle=estiloTablaStyle.replace(ArrayTablaStyle[i],"width:100%;");
			                           $(this).attr("style",estiloTablaStyle);
			                     }
			                }
			           }                                 
			
		         }
		     });
     }				  
  	

	var heightInicial = $("#contenido").outerHeight(false);
	
	function hInicial(){
		heightInicial = $("#contenido").outerHeight(false);
	}
  setTimeout(hInicial, 500);

  $("a").each(function (i){  
  	var attr = $(this).attr("href");	
	var attrSrc = $(this).attr("src");
  	if (typeof attr !== 'undefined' && attr !== false) {
  	  if(attr.indexOf("www.momentum.bbva.com") == -1 && attr.indexOf(document.domain) == -1 && attr.indexOf("mailto") == -1 && attr.substring(0,1) != "/" && attr.substring(0,1) != "#" && attr != ""){
  	  	/*if(attr.indexOf("sc_ref_bbva") == -1){
  	  	   if(attr.indexOf("?") != -1){
  	  	   	  $(this).attr("href",$(this).attr("href")+"&sc_ref_bbva="+encodeURIComponent(document.URL)); 
  	  	   }else{  	  	   	
  	  	      $(this).attr("href",$(this).attr("href")+"?sc_ref_bbva="+encodeURIComponent(document.URL)); 
  	  	   }
  	  	}*/ 
		if(document.domain != "www.bbva.es"){
			if (typeof attrSrc !== 'undefined' && attrSrc !== false) {
				if(attrSrc.indexOf("/BBVANet/") != -1){
					if($.cookie("beta") == "KQOS" || $.cookie("beta") == "SBOX"){
						attrSrc = "/" + $.cookie("beta") + attrSrc;
						$(this).attr("src", attrSrc);
					}
				}
			}	
		}		     
  	  }
  	  if ($(this).attr('target') == undefined && attr.indexOf("#") != -1 && attr != "#"){
  		$(this).attr('target', '_top');
  	  }
  	}
  });
 
  $("a[target='Popin']").each(function(i){
	  	if($.cookie("forzarAntigua") == null /*&& $.cookie("isEmployee") != null */&& sPadre == "no"){  
		  	if(typeof $(this).attr("href") != "undefined"){  
		  		var link = $(this).attr("href");
		  		var aDom = "";
		        if (link.indexOf('https://') != -1) {
		        	aDom = "https://"+document.domain;
		        }
		  		if (link.indexOf("/BBVANet/particulares/") != -1) {
		  			$(this).attr("href", $(this).attr("href").replace(aDom+"/BBVANet/particulares/", entornoPrivada).replace(sLang, ""));
		  		}
		  		else if (link.indexOf("/BBVANet/public/") != -1) {
		  			$(this).attr("href", $(this).attr("href").replace(aDom+"/BBVANet/public/", entornoPrivada2).replace(sLang, ""));
		  		} else if (link.indexOf("/BBVANet/") != -1) {
		  			$(this).attr("href", $(this).attr("href").replace(aDom+"/BBVANet/", entornoPrivada).replace(sLang, ""));
		  		}
		  	}
	  	}
		if(esPerfil == "CLI"){
			if($(this).attr("href").indexOf("contratacion.jsp") > 0){
				var date2 = new Date();
				var now2 = date2.toLocaleDateString().split("/").join("");   
				var entornoPrivada4 = "https://web.bbva.es/index.html";
				var sRamaRedirect2 = "";
				if($.cookie("rama") != null){
					sRamaRedirect2 = $.cookie("rama");
				}else{	  
					sRamaRedirect2 = "release";
				}	  
				if(location.href.indexOf("ei-bbvaglobal") > -1 || location.href.indexOf("ei.bbva") > -1){
					entornoPrivada4 = "https://pre.web.bbva.es/ei/"+sRamaRedirect2+"/index.html?v="+now2;
				}else if(location.href.indexOf("qa.grupobbva") > -1 || location.href.indexOf("qa2.grupobbva.com") > -1){
					entornoPrivada4 = "https://qa.web.grupobbva.com/"+sRamaRedirect2+"/index.html?v="+now2;
				}else{
					entornoPrivada4 = "https://web.bbva.es/index.html?v="+now2;
				}
				$(this).removeAttr("rel");
				$(this).attr("target", "_top");
				var urlPriv = $(this).attr("href");
				urlPriv = urlPriv.substring(urlPriv.indexOf("url2=")+5);
				if(urlPriv.indexOf("&") > 0){
					urlPriv = urlPriv.substring(0, urlPriv.indexOf("&"));
				}
				urlPriv = entornoPrivada4 + "#" + urlPriv;

				$(this).attr("href", urlPriv);
			}
		}else{
			$(this).attr("rel", $(this).attr("rel") + ";" + $(this).attr("href"));
			$(this).attr("href", "#");
		}
  }); 
  
	$("a").each(function(){
		if($(this).attr("href")!="" && $(this).attr("href")!="undefined" && $(this).attr("href")!=null && $(this).attr("href").substring(0, 3) != "tel" && $(this).attr("href").substring(0, 1) != "/" && $(this).attr("href").substring(0, 1) != "#"){
			if($(this).attr("href").indexOf("ei.bbva.es") == -1 && $(this).attr("href").indexOf("www.bbva.es") == -1 && $(this).attr("href").indexOf("qa.grupobbva.com") == -1 && $(this).attr("href").indexOf("web.bbva.es") == -1 && $(this).attr("href").indexOf("qa.web.grupobbva.com") == -1){
				if($(this).attr("target")!="_blank"){
					$(this).attr("target","_blank");
				}
			}
		}
	});
  
   $("iframe").each(function (i){
   		if(typeof $(this).attr("src") != "undefined"){
	        var attrSrc = $(this).attr("src");
	        var sDom = "";
	        if (attrSrc.indexOf('https://') != -1) {
	        	sDom = "https://"+document.domain;
	        }
		  	if($.cookie("forzarAntigua") == null /*&& $.cookie("isEmployee") != null*/ && sPadre == "no"){    
		  		if (attrSrc.indexOf("/BBVANet/particulares/") != -1) {
		  			$(this).attr("src", $(this).attr("src").replace(sDom+"/BBVANet/particulares/", entornoPrivada).replace(sLang, ""));
		  		} else if (attrSrc.indexOf("/BBVANet/public/") != -1) {
		  			$(this).attr("src", $(this).attr("src").replace(sDom+"/BBVANet/public/", entornoPrivada2).replace(sLang, ""));
		  		} else if (attrSrc.indexOf("/BBVANet/public") != -1) {
		  			$(this).attr("src", $(this).attr("src").replace(sDom+"/BBVANet/public", entornoPrivada2).replace(sLang, ""));
		  		} else if (attrSrc.indexOf("/BBVANet/") != -1) {
		  			$(this).attr("src", $(this).attr("src").replace(sDom+"/BBVANet/", entornoPrivada).replace(sLang, ""));
		  		}
		  	}


			if(document.domain != "www.bbva.es"){
				if (typeof attrSrc !== 'undefined' && attrSrc !== false) {
					if(attrSrc.indexOf("/BBVANet/") != -1){
						if($.cookie("beta") == "KQOS" || $.cookie("beta") == "SBOX"){
							attrSrc = "/" + $.cookie("beta") + attrSrc;
							$(this).attr("src", attrSrc);
						}
					}
				}			
			}
		}
   });
   
  /***********************************************RELATIVO A DOBLE CLICK EN BOTÓN GALLETA******************************/	
    $( "a[data-change-visibility]" ).dblclick(function(){
    		$( "a[data-change-visibility]" ).click();
    });
    
  /******************************************************RELATIVO A ERROR EN GALLETA******************************/
	function getURLParameter() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
  }
  var errorGalleta = getURLParameter()["errMsg"];
  if(typeof(errorGalleta) != "undefined" && errorGalleta != "" && errorGalleta != null){  
		  if(errorGalleta.indexOf("KQOF-BBVANet")!=-1 || errorGalleta.indexOf("USU")!=-1 ){
		   		if((errorGalleta.indexOf("KQOF-BBVANet-001")!=-1) || (errorGalleta.indexOf("KQOF-BBVANet-002")!=-1) || (errorGalleta.indexOf("KQOF-BBVANet-003")!=-1) || (errorGalleta.indexOf("KQOF-BBVANet-004")!=-1) || (errorGalleta.indexOf("KQOF-BBVANet-005")!=-1) || (errorGalleta.indexOf("KQOF-BBVANet-006")!=-1) || (errorGalleta.indexOf("KQOF-BBVANet-007")!=-1) || (errorGalleta.indexOf("KQOF-BBVANet-008")!=-1) || (errorGalleta.indexOf("USU0100001")!=-1)){
		   		   errorGalleta = _.t("Se ha producido un error inesperado.");
		   		   errorGalleta = errorGalleta + _.t(" Por favor, inténtelo de nuevo.");    		
		   	  }		 
		  }else if(errorGalleta.indexOf("BDNT-BBVANet-001")!=-1){
		     errorGalleta = _.t("Has intentado acceder desde un origen no permitido. Por favor, hazlo desde aquí.");		
		  }else{
		     	errorGalleta = "";
		  }
	}     
  if(typeof(errorGalleta) != "undefined" && errorGalleta != "" && errorGalleta != null){  	   
  	   $(".c-login-accesoUsuario").find("div#validationSummaryOutput").html("<p class=\"entradilla\">"+errorGalleta+"</p>");
  	   $("section.validationSummaryWrapper" ).show( "fast" );
  	   $("ul.c-menu-accesoUsuario li").first().addClass("activo");
  	   $("div.c-login-accesoUsuario").show();
  }	

/********************************************************RELATIVO A NAVEGADOR OBSOLETO****************************/	 
var mostradoMensajeNavegadorObsoleto = false;

if (navigator.userAgent.toLowerCase().indexOf('msie') > -1) { // Si el navegador es IE
	if(navigator.userAgent.toLowerCase().indexOf('msie 8') > -1 || navigator.userAgent.toLowerCase().indexOf('msie 9') > -1){ // Si es la versión 8
		if (window==window.top) {  // Si no estamos en un iframe	
			 var aviso = $.cookie('aviso'); 			 		  
			  if(aviso != 'no'){ // si la cookie es distinta de "no" colocamos div			  			
					$("#app").prepend('<div class="aviso"><div><img alt="'+_.t("Aviso")+'" src="/estaticos/mult/ico-info-obsoleto.png" width="20px" height="22px"/><div >'+_.t("El navegador que está usando no soporta toda la funcionalidad de la web.")+' <a class="navegadores" href="#"  >'+_.t("Más información")+'</a></div></div><div id="cerrarAviso" alt="' +_.t("Cerrar")+'" title="' +_.t("Cerrar")+'" ></div></div><div><a style="display:none" id="abreShadowbox" href="/sistema/obsoleto.jsp" rel="shadowbox;width=655px;height=315px" target="Popin" ></a></div>');
					$('header.c-estructural-cabecera').toggleClass("avisocab");
					  	
					 $('.aviso a.navegadores').click(function(){ 
						$.cookie('aviso','no', { path: '/' });
						$('.aviso').slideUp('slow');
						$('header.c-estructural-cabecera').toggleClass("avisocab");
						$('#abreShadowbox').click();
						if($('.avisoCookies').is(':visible')){
							$('.avisoCookies').css({'margin-top':'0px'});
							$('.c-estructural-cabecera').css({'margin-top':'151px'});
						  $('.mutacion .ph_usuario').css({'margin-top':'151px'});
						}
						else{
							$('.c-estructural-cabecera').css({'margin-top':'0px'});
							$('.mutacion .ph_usuario').css({'margin-top':'0px'});
						}
						
				   });				   
				   
				   $('.aviso div#cerrarAviso').click(function(){ 
						$.cookie('aviso','no', { path: '/' });
						$('.aviso').slideUp('slow');
						$('header.c-estructural-cabecera').toggleClass("avisocab");
						$('.c-estructural-cabecera').css({'margin-top':'0px'});
						$('.mutacion .ph_usuario').css({'margin-top':'0px'});
						// Si esta visible es div avisoCookies lo recolocamos
						if($('.avisoCookies').is(':visible')){
							$('.avisoCookies').css({'margin-top':'0px'});
							var heightMensajeCookies = $('.avisoCookies').outerHeight(false) ;
							heightMensajeCookies = heightMensajeCookies+"px";
							$('.c-estructural-cabecera').css({'margin-top':heightMensajeCookies});
							$('.mutacion .ph_usuario').css({'margin-top':heightMensajeCookies});
						}											
				   });
				   var mostradoMensajeNavegadorObsoleto = true;
		   		}
		 } // FIN ESTAMOS EN UN IFRAME  
	}  // FIN VERSION 8
}// FIN NAVEGADOR IE
/********************************************************FIN NAVEGADOR OBSOLETO **********************************/ 
if((window.location.href.indexOf("ei.bbva.es") != -1||window.location.href.indexOf("ei-bbvaglobal.igrupobbva") == -1)&&(window.location.href.indexOf("ei-bbvaglobal.igrupobbva") != -1||window.location.href.indexOf("ei.bbva.es") == -1)){
/********************************************************RELATIVO A POLITICA DE COOKIE****************************/ 
// EN EL FICHERO login.js Tambien se incluye una grabación de la cookie
	function dameValorParametro(nameParametro) {
			nameParametro = nameParametro.replace(/[\[]/, '\\[');
			nameParametro = nameParametro.replace(/[\]]/, '\\]');
			var pattern = "[\\?&]" + nameParametro + "=([^&#]*)";
			var regex = new RegExp(pattern);
			var url = unescape(window.location.href);
			var results = regex.exec(url);
			if (results === null) {
			 return null;
			} else {
			  return results[1];
			}
		}

		
if($.cookie('aceptarCookies')!="si"){
	//comprobamos el estado actual de la cookie y actualizamos
	
 if($.cookie('aceptarCookies')!= versionFaldon && window==window.top){  // SI la cookie aceptarCookies es distinto de si y no estamos en iframe
 /*//Actualizamos la validacion para nuevo objeto cookie
 if((objCookie==null||objCookie.version!= versionFaldon) && window==window.top){  // SI la cookie aceptarCookies es distinto de si y no estamos en iframe*/
 
	var hayMarcaBlanca= dameValorParametro("mb");
    if (hayMarcaBlanca!='si'){ 
			var referrer = document.referrer.split("?")[0]; // Por si vienen parametros, nos quedamos con la primera parte de "?"
			var dominio = document.domain ;
			var longitudDeRaizSitio=  dominio.length + 9 ;// 9 = "https:///".length
			var idiomaAnterior = "";
			var hemosNavegado = false;
			var aliasEstaticos ="/estaticos/";
			var redireccionPartePrivada= "www.bbva.es/BBVANet/";	
			// Si referrer incluye dominio       y referre incluye más ruta que lo basico    y la ruta anterior no esta en estaticos y la ruta anterior no contiene www.bbva.es/BBVANet/ (cuando al usuario se redirecciona de la parte privada para lograse )
			
			if( referrer.indexOf(dominio) > -1 && referrer.length > longitudDeRaizSitio && referrer.indexOf(aliasEstaticos)== -1 && referrer.indexOf(redireccionPartePrivada)== -1 ){					
				if(dominio != "bbvaglobal.igrupobbva"){ // Si no estamos en dearrollo, en desrrollo no hay traducción
					if( referrer.indexOf("/eng/") > -1){
						idiomaAnterior="eng";	
					}
					else if(referrer.indexOf("/cat/") > -1){
						idiomaAnterior="cat";
					}
					else {idiomaAnterior = "cas"}
					// Comparamos el idioma anterior con el idioma actual 
					var cookieIdiAuto = $.cookie('idiomaAuto');
					if (cookieIdiAuto == null) cookieIdiAuto= "cas"
					if(idiomaAnterior == cookieIdiAuto){
						  hemosNavegado= true;
					} 
				 }
				 else{
			       hemosNavegado= true;	
			     }
			}
			
			if (hemosNavegado) {
				grabarCookieAceptaCookies();
				/*$.cookie('aceptarCookies', cookiesFaldon,{expires:18250,path:'/'});
				//actualizamos version del faldon de cookies
				updateCookieAceptaCookies("version",versionFaldon);*/
			}
			else {
				pintarMensajeCookiesLegales();
			}	
			
		}// MARCA BLANCA
} } // SI HAY ACEPTAR COOKIES distinto de si y no estamos en un eframe	


if($.cookie('aceptarCookies')=="si"||$.cookie('aceptarCookies')==null){
	pintarMensajeCookiesLegales();
	//grabarCookieAceptaCookies();
}
		function pintarMensajeCookiesLegales(){		
				var sAvisoCookie="";	
				sAvisoCookie+="<div class=\"avisoCookies\" >\n";
					sAvisoCookie +="		<div id=\"cajonContenido\">\n";
					sAvisoCookie +="				<div id=\"aviCooInfo\" >\n";
					sAvisoCookie +="						<p>"+_.t('Información')+ "</p>\n";
					sAvisoCookie +="				</div>\n";
					sAvisoCookie +="				<div id=\"cerrarAviso\"  alt=\"Cerrar\" title=\"Cerrar\"  ></div>\n";
					sAvisoCookie +="				\n";
					sAvisoCookie +="				<div class=\"clearBoth\"></div>\n";
					sAvisoCookie +="				<div id=\"aviCooBajoClear\">\n";				
					var sTexTraducir = _.t('Utilizamos cookies propias y de terceros para mejorar nuestros servicios y mostrar a los usuarios publicidad relacionada con sus preferencias mediante el análisis de sus hábitos de navegación. Si se continúa navegando, consideramos que se acepta su uso. Es posible cambiar la configuración u obtener más información _aquí._');
					sTexTraducir = sTexTraducir.replace('_', '<a href=\"/sistema/meta/politica-cookies/index.jsp\"><samp id=\"infoCookie\"> ');
					sTexTraducir = sTexTraducir.replace('_', '</samp></a></p>');				
					sAvisoCookie +="						<p id=\"aviCooBajoClearP2\">"+sTexTraducir+ "</p>\n";
					sAvisoCookie +="				</div>\n";
					sAvisoCookie +="		</div>\n";
					sAvisoCookie +="</div>\n"			
					
					if($("#app").length > 0){
						$("#app").prepend(sAvisoCookie);
					}else{
						$("#contenido").prepend(sAvisoCookie);
					}

					var heightMensaje = $('.avisoCookies').outerHeight(false) ;// 107 --> necesitamos empujar  97 ¿10? 
	
					 if(mostradoMensajeNavegadorObsoleto){
						 // Si ya hay mensaje de obsoleto bajamos el mensaje de aviso
						 $('.avisoCookies').css({'margin-top':'25px'});
						 var altoConObsoleto  = heightMensaje + 25;
						 altoConObsoleto =  altoConObsoleto+ "px"; 
						 $('.c-estructural-cabecera').css({'margin-top': altoConObsoleto}); // 175
						 $('.mutacion .ph_usuario').css({'margin-top': altoConObsoleto});
					 } 
					 else{
						 heightMensaje = heightMensaje + "px";
	
						 $('.c-estructural-cabecera').css({'margin-top':heightMensaje}); // 181px 151 97				
						 $('.mutacion .ph_usuario').css({'margin-top':heightMensaje});		
					 }
				 	
					$('.avisoCookies div#cerrarAviso').click(function(){ 
						grabarCookieAceptaCookies();
						/*//Actualizamos la versión del faldón de cookies
						$.cookie('aceptarCookies', cookiesFaldon,{expires:18250,path:'/'});
						updateCookieAceptaCookies("version",versionFaldon);*/
						$("div.condiciones-babyplanner").css("margin-bottom","0px");
						$('.avisoCookies').hide();
						// si esta visible el div navegador obsoleto dejamos nargen
						if($('.aviso').is(':visible'))
						{
							$('.c-estructural-cabecera').css({'margin-top':'32px'});
							$('.ph_usuario').css({'margin-top':'32px'});
						}
						else
						{
							$('.c-estructural-cabecera').css({'margin-top':'0px'});
							$('.ph_usuario').css({'margin-top':'0px'});
						}
					 });
				}
	
			function grabarCookieAceptaCookies(){
			   	$.cookie('aceptarCookies', versionFaldon,{expires:18250,path:'/'}); 
			};
			
			//funcion para actualizar valor cookie
			/*function updateCookieAceptaCookies(nCookie,newValue){
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
						cookiesFaldon = '{ "version":'+newValue+', "tecnica": true, "publicidad": false, "personalizacion": false, "analitica": false } ';
						$.cookie('aceptarCookies', cookiesFaldon,{expires:18250,path:'/'});  
						break;
				}

			};*/
			
			
			
/********************************************************FIN A POLITICA DE COOKIE*********************************/ 
}
		if($(".sin-imagen").find("p.textoDescriptivo").size() == 0){     
		    $(".sin-imagen").css("height","3em");
		    $(".sin-imagen").find("h2").css("border-right","none");
		    $(".sin-imagen").find("p.b_90x20").css("margin-top","7px");
		    
		} 

  	$("li.cliente").click(function(){
  		 if($(this).attr("class") == "cliente"){
  		 		$(this).addClass("desplegado");	
  		 }else if($(this).attr("class") == "cliente desplegado"){
  		 		$(this).removeClass("desplegado");
  		 }
  	});
  	$("li.cliente").mouseleave(function(){
  		 $(this).removeClass("desplegado");
  	});

/****************************************RELATIVO AL ANCLA***********************************************/
  $(window).scroll(function(){
  	   if($(window).scrollTop() > 700){
  	   	 if (!$("#anclaArriba").length){
  	        $(".c-estructural-cabecera").append("<div class=\"c-ancla_general\" id=\"anclaArriba\" style=\"display: block; bottom: 10px;\" onclick=\"subirScroll();\" onmouseover=\"cambiarOverOn();\" onmouseout=\"cambiarOverOut();\"><img src=\"/estaticos/mult/ancla.png\" width=\"50px\" height=\"50px\"></div>");
  	        $(".c-ancla_general").css("bottom","10px");
  	        $(".c-ancla_general").css("cursor","pointer");
  	        $(".c-ancla_general").css("position","fixed");
            $(".c-ancla_general").css("right","10px");            
  	     }else{
  	     		if($(window).scrollTop()===$(document).height()-$(window).height()){
                $(".c-ancla_general").css("bottom","60px");
            }else{
            	 	$(".c-ancla_general").css("bottom","10px");
            }
  	     }
  	   }else{
		   if ($("#anclaArriba").length){
  	   	        $("#anclaArriba").remove();  
		   }
  	   }
  });   

/********************************************************RELATIVO A OMNITURE****************************/		
	$('a').click(function(e){		 	 
		 var href= $(this).attr('href');
		 var classEn= $(this).attr('class');
		 var txt = $(this).text();
		 var inf=false;	 
		if(classEn != "bullet-derecho" && (classEn != "enlace" || txt.indexOf("Oficinas y cajeros") != -1)){ 
			    		    	
			    if(typeof(href) != "undefined"){
					if( href.indexOf(".pdf")>-1){
						title="";
					    title=$(this).attr('title');
					    if (title=="" || typeof(title)==="undefined"){
									title=$(this).attr('alt') 						   
							}
						
							if(title=="" || typeof(title)==="undefined"){ // cogemos el nombre del PDF
							var trozos= href.split("/");
							var a= (trozos.length)-1;
							title= trozos[a].replace(".pdf","");
						}			           
			        }
					else if(href.indexOf("facebook")>-1) inf=true; // pie
					else if(href.indexOf("twitter")>-1) inf=true; // pie
					else if(href.indexOf("youtube")>-1) inf=true; //  pie
					else if(href.indexOf("google")>-1) inf=true; // pie
					else if(href.indexOf("blogbbva")>-1) inf=true; // pie
					else if(href.indexOf("blogbbva")>-1) inf=true; // pie
					else if(href.indexOf("www.decomprasbbva.com")>-1) inf=true; // / Banca personal /index/ aside
					else if(href.indexOf("bbvavivienda.com/JVIV/inmuebles")>-1) inf=true; // Banca personal /index/aside
					else if(href.indexOf("maps.bbva.com/TLGO/tlgo/oficinas?op=svInicio")>-1) inf=true; //  Banca personal /index/pie Oficinas y cajeros
					else if(href.indexOf("www.bbva.com")>-1) inf=true; // Banca personal /index/pie /Web Corporativa BBVA.com
					else if(href.indexOf("inversores.bbva.com")>-1)  inf=true; //  Banca personal /index/pie /Información para accionistas
					else if(href.indexOf("empleo.bbva.com/es")>-1) inf=true;  //  Banca personal /index/pie / Empleo en BBVA
					else if(href.indexOf("www.bbvaresearch.com")>-1) inf=true; //  Banca personal /index/pie / BBVA Research
					else if(href.indexOf("prensa.bbva.com")>-1) inf=true; //  Banca personal /index/pie / Sala de prensa
					else if(href.indexOf("w3.grupobbva.com/TLAG/bbvagentes/esp/publico/index.jsp")>-1) inf=true; //  Banca personal /index/pie //Red de Agentes BBVA					
				}
   	}else{
   		 s.eVar25="";
   		 if(typeof(s.events) != 'undefined')
   		    s.events=s.events.replace("event25", "");
   	}
		//Para enlaces que se abren en popin se evita que la página haga scrolltop en el evento onclick
		if ($(this).attr("href") == "#") {
			e.preventDefault();
		}	 
	});
	
		$('a.fbdown').click(function(){
			  //alert("prueba");
		});
						
		function completarHREF(href){
			if(href.indexOf("http")== -1){// Si la ruta es relativa, ponemos el dominio
				href="https://"+(document.domain)+href;
			} 
			return href;	
		}	 
		 function reemplazarOmniture (cadena)
           {      		//'Ñ','ñ','Á','á','À','à','Â','â','Ã','ã','Ä','ä','É','é','È','è','Ê','ê','Ë','ë','Ì','ì','Í','í','Î','î','Ï','ï','Ò','ò','Ó','ó','Õ','õ','Ô','ô','Ö','ö','Ù','ù','Ú','ú','Û','û','Ü','ü','Ç','ç','º','ª',',','.',';',':','¡','!','¿','?','"','/','<','>'
        //  'Ñ','ñ','Á','á','À','à','Â','â','Ã','ã','Ä','ä','É','é','È','è','Ê','ê','Ë','ë','Ì','ì','Í','í','Î','ì','Ï','ï','Ò','ò','Ó','ó','Õ','õ','Ô','ô','Ö','ö','Ù','ù','Ú','ú','Û','û','Ü','ü','Ç','ç','º','ª',',','.',';',':','¡','!','¿','?','"','/','<','>'
		 carEspeciales = 'Ñ','ñ','Á','á','À','à','Â','â','Ã','ã','Ä','ä','É','é','È','è','Ê','ê','Ë','ë','Ì','ì','Í','í','Î','ì','Ï','ï','Ò','ò','Ó','ó','Õ','õ','Ô','ô','Ö','ö','Ù','ù','Ú','ú','Û','û','Ü','ü','Ç','ç','º','ª',',','.',';',':','¡','!','¿','?','"','/','<','>';
		 carNormales  ='N','n','A','a','A','a','A','a','A','a','A','a','E','e','E','e','E','e','E','e','I','i','I','i','I','i','I','i','O','o','O','o','O','o','O','o','O','o','U','u','U','u','U','u','U','u','C','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','\'','-',' ',' ';
		  numCaractEspeciales = carEspeciales.length;
	 
			for ( i=0;i< numCaractEspeciales;i++) 
			{ 
				cadena = cadena.replace(carEspeciales[i],carNormales[i]); 
			} 
				cadena= cadena.toLowerCase();
			return cadena; 	
		}
 
 /**********************************************************************************************************/
  
  if ($(".c-menu-accesoUsuario").size()==0)
	{
		$("a[href$='contratacion.jsp']").removeAttr("target").click(function(e){
			e.preventDefault();
			window.top.location.href = "/BBVANet";
		})
	}
	else
	{
		var posicionGalleta = $(".c-menu-accesoUsuario").outerWidth(false) - $(".c-menu-accesoUsuario li:first").outerWidth(false);
		if(window.location.href.indexOf("/cat/") != -1){
		$(".c-login-accesoUsuario").css("right","115px");
	  }else if(window.location.href.indexOf("/eng/") != -1){
	  $(".c-login-accesoUsuario").css("right","83px");
	  }else{
		  if(window.location.href.indexOf("/empresas/") != -1 || window.location.href.indexOf("/instituciones/") != -1){
			  $(".c-login-accesoUsuario").css("right","94px");
		  }else{
			$(".c-login-accesoUsuario").css("right","113px");
		  }
	  }	
	}
	
	//Modificar los elementos th de las tablas
	$('tr th:last-child').addClass('last');	
	function redimensionarNavBar( plegar) {
      var anchoElementos = 0,
        anchoSobrante,
        paddingExtra,
        anchoLista = 850,
        i;

        if(plegar){
          anchoLista = 720;
        }

			var elemMenu = $(".c-estructural-navegacionPrincipal_R2").find('li');
			numeroOpciones = elemMenu.size();// 5 elementos
			
      if(numeroOpciones < 7){
        for (i = 1; i < numeroOpciones; i += 1) {
			var auxInt = $(elemMenu[i]).find('span').outerWidth(false);
           anchoElementos = anchoElementos + auxInt;
        }
              anchoElementos= anchoElementos+$(elemMenu[0]).width(); // AHORA A PELO CAMBIAR DINAMICO
        anchoSobrante = anchoLista - anchoElementos;
        paddingExtra = (anchoSobrante / (numeroOpciones - 1));
		
		var nuevoAncho= anchoElementos + ((paddingExtra)*(numeroOpciones-1)) ;		
		
        paddingExtra = Math.floor(paddingExtra/2) + 'px';	
	   $(".c-estructural-navegacionPrincipal_R2").find('li:not(:first)').find('a').css('padding-right',paddingExtra).css('padding-left',paddingExtra)	   
      }
    }

	$("input#buscon").blur(function(){
   	   	if ($("input#buscon").val()==""){
				$("nav.c-estructural-navegacionPrincipal_R2").toggleClass('buscadorDesplegado');
		}
	});
					
	$("input#buscon").focus(function(){
		if ($("input#buscon").val()==""){
			$("nav.c-estructural-navegacionPrincipal_R2").toggleClass('buscadorDesplegado');
		}
	});
		
	/*combo de cambio idioma*/				
	$(".c-menu-auxiliar_R2 li.idioma ul.idiomas li.actual a.enlace").click(function(e){
	    e.preventDefault();
		$(".c-menu-auxiliar_R2 li.idioma ul.idiomas").toggleClass('activo');
	});
	
	/*Pestañas menu lateral*/				
	$("#pstnys-paginas div#pst1").click(function() {
		$('#pstnys-paginas div').each(function(index) {
			$(this).removeClass();
		}); 		
		$("#pstnys-paginas div#pst1").addClass("activo")
		$("div.pst1-paginas").hide();
		$("div#pst1-contenido").show();
	});
				
	$("#pstnys-paginas div#pst2").click(function() {
		$('#pstnys-paginas div').each(function(index) {
			$(this).removeClass();
		}); 
		$("#pstnys-paginas div#pst2").addClass("activo")
		$("div.pst1-paginas").hide();
		$("div#pst2-contenido").show();
		
		setTimeout(function resize(){var parentWindow = window.parent;if(esPerfil=="CLI"){bridge.trigger('resize:publica', parentWindow, {height: $("#contenido").outerHeight(false)+'px', source:'publica' })};}, 500);
	});			
				
	$("#pstnys-paginas div#pst3").click(function() {
		$('#pstnys-paginas div').each(function(index) {
			$(this).removeClass();
		}); 				
		$("#pstnys-paginas div#pst3").addClass("activo")
		$("div.pst1-paginas").hide();
		$("div#pst3-contenido").show();
	});
			
	$("#pstnys-paginas div#pst4").click(function() {
		$('#pstnys-paginas div').each(function(index) {
			$(this).removeClass();
		}); 
		$("#pstnys-paginas div#pst4").addClass("activo")
		$("div.pst1-paginas").hide();
		$("div#pst4-contenido").show();
	});
		
	/*combo de cambio idioma*/
	$("div#Particulares").removeAttr("style");
			
	$("h3#pst1pst4").click(function() {
         $('h3').each(function(index) {
             $(this).removeClass();
         });
         $(this).addClass("activo");
         $('div.bloque-central').hide();              
         $("div[id='"+$(this).find("p").text()+"']").show();
         $("div[id='"+$(this).find("p").attr("id")+"']").show(); //para que funcionen las pestañas de mapaProductos.jsp en catalan si su literal es distinto del de castellano
    });
       
    $("h3#pst2pst4").click(function() {
         $('h3').each(function(index) {
             $(this).removeClass();
         });
         $(this).addClass("activo");
         $('div.bloque-central').hide();
		 $("div[id='"+$(this).find("p").text()+"']").show();
         $("div[id='"+$(this).find("p").attr("id")+"']").show(); //para que funcionen las pestañas de mapaProductos.jsp en catalan si su literal es distinto del de castellano
    });
	
    $("h3#pst3pst4").click(function() {
         $('h3').each(function(index) {
             $(this).removeClass();
         });
         $(this).addClass("activo");
         $('div.bloque-central').hide();
	     $("div[id='"+$(this).find("p").text()+"']").show();
         $("div[id='"+$(this).find("p").attr("id")+"']").show(); //para que funcionen las pestañas de mapaProductos.jsp en catalan si su literal es distinto del de castellano
     });
	 
     $("h3#pst4pst4").click(function() {
         $('h3').each(function(index) {
              $(this).removeClass();
         });
         $(this).addClass("activo");
         $('div.bloque-central').hide();
	     $("div[id='"+$(this).find("p").text()+"']").show();
         $("div[id='"+$(this).find("p").attr("id")+"']").show(); //para que funcionen las pestañas de mapaProductos.jsp en catalan si su literal es distinto del de castellano
     });
	 
     $("h3#pst5pst4").click(function() {
         $('h3').each(function(index) {
             $(this).removeClass();
         });
         $(this).addClass("activo");
         $('div.bloque-central').hide();
         $("div[id='"+$(this).find("p").text()+"']").show();
         $("div[id='"+$(this).find("p").attr("id")+"']").show(); //para que funcionen las pestañas de mapaProductos.jsp en catalan si su literal es distinto del de castellano
     });
	 
     $("h3#pst6pst4").click(function() {
         $('h3').each(function(index) {
             $(this).removeClass();
         });
         $(this).addClass("activo");
         $('div.bloque-central').hide();
	     $("div[id='"+$(this).find("p").text()+"']").show();
         $("div[id='"+$(this).find("p").attr("id")+"']").show(); //para que funcionen las pestañas de mapaProductos.jsp en catalan si su literal es distinto del de castellano
     });       
        
     $("h2#pst1pst4").click(function() {
         $('h2').each(function(index) {
             $(this).removeClass();
         });
         $(this).addClass("activo");
         $('div.bloque-central').hide();              
         $("div[id='"+$(this).find("p").text()+"']").show();
	     $("div[id='"+$(this).find("p").attr("id")+"']").show(); //para que funcionen las pestañas de mapaProductos.jsp en catalan si su literal es distinto del de castellano
     });
        
        $("h2#pst2pst4").click(function() {
           $('h2').each(function(index) {
               $(this).removeClass();
           });
           $(this).addClass("activo");
           $('div.bloque-central').hide();
		   $("div[id='"+$(this).find("p").text()+"']").show();
           $("div[id='"+$(this).find("p").attr("id")+"']").show(); //para que funcionen las pestañas de mapaProductos.jsp en catalan si su literal es distinto del de castellano
        });
        $("h2#pst3pst4").click(function() {
           $('h2').each(function(index) {
               $(this).removeClass();
           });
           $(this).addClass("activo");
           $('div.bloque-central').hide();
		   $("div[id='"+$(this).find("p").text()+"']").show();
           $("div[id='"+$(this).find("p").attr("id")+"']").show(); //para que funcionen las pestañas de mapaProductos.jsp en catalan si su literal es distinto del de castellano
        });
        $("h2#pst4pst4").click(function() {
           $('h2').each(function(index) {
               $(this).removeClass();
           });
           $(this).addClass("activo");
           $('div.bloque-central').hide();
		   $("div[id='"+$(this).find("p").text()+"']").show();
           $("div[id='"+$(this).find("p").attr("id")+"']").show(); //para que funcionen las pestañas de mapaProductos.jsp en catalan si su literal es distinto del de castellano
        });
        $("h2#pst5pst4").click(function() {
           $('h2').each(function(index) {
               $(this).removeClass();
           });
           $(this).addClass("activo");
           $('div.bloque-central').hide();
		   $("div[id='"+$(this).find("p").text()+"']").show();
           $("div[id='"+$(this).find("p").attr("id")+"']").show(); //para que funcionen las pestañas de mapaProductos.jsp en catalan si su literal es distinto del de castellano
        });
        $("h2#pst6pst4").click(function() {
           $('h3').each(function(index) {
               $(this).removeClass();
           });
           $(this).addClass("activo");
           $('div.bloque-central').hide();
		   $("div[id='"+$(this).find("p").text()+"']").show();
           $("div[id='"+$(this).find("p").attr("id")+"']").show(); //para que funcionen las pestañas de mapaProductos.jsp en catalan si su literal es distinto del de castellano
        });
		
				$(".enlacesDesplegables").click(function(e) {
				  	 e.preventDefault();
				  	 if($(this).parent().find("ul").is(':hidden')){
				  	 	 $(".productos").hide("slow");
				  	 	 $("li#despliegue").attr("class", "despliegue");
				  		 $(this).parent().attr("class", "repliegue");
				  	   $(this).parent().find("ul").show("slow");
				  	 }else{
				  	 	 $(".productos").hide("slow");	
				  	 	 $("li#despliegue").attr("class", "despliegue");
				   		 $(this).parent().attr("class", "despliegue");
				   	   $(this).parent().find("ul").hide("slow");
				   	 }
			  });	
			  
			  generarEnlaces($(".mapaProductos").find("div.familia ul.lista-bullet li:not(.despliegue)"));
				function generarEnlaces (capa)
				{
					$form = $("<form id=\"formEnlace\" method=\"POST\" action=\"\"></form>");
					$("body").append($form);
					$(capa).find("a").click(function(e){
						e.preventDefault();
						var sUrl = $(this).attr("href");
						var params = sUrl.substring(sUrl.indexOf("?")+1);
						sUrl = sUrl.substring(0,sUrl.indexOf("?"));
						if (params!="")
						{
							var arrayParams = params.split("&");
							for (i=0; i<arrayParams.length; i++)
							{
								var input = arrayParams[i];
								var name = input.split("=")[0];
								var value = input.split("=")[1];
								$("#formEnlace").append("<input type=\"hidden\" value=\""+value+"\" name=\""+name+"\"/>");
							}
						}
						$("#formEnlace").attr("action",sUrl);
						$("#formEnlace").submit();
					})
				}

				/*  pestañas para la ficha*/
				
				var numeroPestanias= $("ul#fichaContenido >li").size();				
				
				if(numeroPestanias ==1){
				 $('div.bloque-color').addClass('no-border-inf');
				 $('ul#fichaPestanias li:first >h3').addClass('unica activo');	
				 $('ul#fichaPestanias li:first >h2').addClass('unica activo');
				}
				else{
					$('div.bloque-color').addClass('no-border-inf');
					$("ul#fichaContenido > li").hide();
					$('ul#fichaContenido > li:first').show();
					
					$('ul#fichaPestanias li:first >h3').addClass('first activo');
					$('ul#fichaPestanias li:last >h3').addClass('last');
					
					$('ul#fichaPestanias li:first >h2').addClass('first activo');
					$('ul#fichaPestanias li:last >h2').addClass('last');
				
					$('ul#fichaPestanias li').click( function(){
						 
						  if(!$(this).find("h3").hasClass('activo')){
							 $('ul#fichaPestanias li h3.activo').removeClass('activo');
							 $(this).find("h3").addClass('activo');
							  var pst= $(this).attr('pst');
							  
							  $('ul#fichaContenido li').hide();
							  
							  var selector= "ul#fichaContenido li[pst="+pst+"]";
							  $(selector).show();
							  $(selector+" ul li").show();
							 
							 var parentWindow = window.parent;
							 
							if(esPerfil=="CLI"){bridge.trigger('resize:publica', parentWindow, { height: $("#contenido").outerHeight(false)+'px', source:'publica' })};
							}
							 if(!$(this).find("h2").hasClass('activo')){
							 $('ul#fichaPestanias li h2.activo').removeClass('activo');
							 $(this).find("h2").addClass('activo');
							  var pst= $(this).attr('pst');
							  
							  $('ul#fichaContenido li').hide();
							  
							  var selector= "ul#fichaContenido li[pst="+pst+"]";
							  $(selector).show();
							  $(selector+" ul li").show();
							 
							 var parentWindow = window.parent;
							 
							if(esPerfil=="CLI"){bridge.trigger('resize:publica', parentWindow, { height: $("#contenido").outerHeight(false)+'px', source:'publica' })};
							}
					} )
				}
			 
			 // Evento en ficha me gusta no me gusta
			 
			 $(".estado-producto .sup #botMegus,#botNoMegus").click(function(){ 
				var sUrl= $(this).find('a').attr("url");
						$.ajax({
						url: sUrl,	
						dataType: "json",
						type: "GET",
						async: false,						
						cache: false,
						success: function() 
						{
							$(".estado-producto .sup #botMegus,#botNoMegus").hide();
						}
						});	
	
			 });  
      
       $("div#tituloLegal").click(function(ev) {
			    ev.preventDefault();
			    var auxLegal = $(this).siblings("div#textoLegal").attr("style");
				
				if(auxLegal!=undefined && auxLegal.indexOf("display: none")>-1)
				{
					
				  $(this).siblings("#textoLegal").slideDown("slow");
				  setTimeout(sldDown, 500);	
				}
				else
				{
				  $(this).siblings("#textoLegal").slideUp("slow");
					 setTimeout(sldUp, 500);
				}	
         });
         
       function sldDown() {       
				$(this).find("strong").html($(this).find("strong").text().replace(_.t("Ver"),_.t("Ocultar")));		
		     	$(this).find("img").attr("src", "/estaticos/mult/ico-abierto.GIF"); 
				

				if(esPerfil=="CLI"){bridge.trigger('resize:publica', window.parent, { height: $("#contenido").outerHeight(false)+'px', source:'publica' })};
       }
       
       function sldUp() {       
			    $(this).find("strong").html($(this).find("strong").text().replace(_.t("Ocultar"),_.t("Ver")));
			    $(this).find("img").attr("src", "/estaticos/mult/ico-cerrado.GIF"); 	
			    if(esPerfil=="CLI"){bridge.trigger('resize:publica', window.parent, { height: heightInicial+'px', source:'publica' })};
       }	
         
        $("div#tituloLegal2").click(function(ev) {
			      ev.preventDefault();
			  	  var auxLegal = $(this).next().attr("style");				
						if(auxLegal!=undefined && auxLegal.indexOf("display: none")>-1)
						{							
						  $(this).next().slideDown("slow");						  
						  $(this).find("a").html($(this).find("a").text().replace(_.t("Ver"), _.t("Ocultar")));						  
						  $(this).attr("class","ab-preg-tit-desplegar");
				     	if(esPerfil=="CLI"){bridge.trigger('resize:publica', window.parent, { height: $("#contenido").outerHeight(false)+'px', source:'publica' })};	
						}
						else
						{
						  $(this).next().slideUp("slow");						
						    $(this).find("a").html($(this).find("a").text().replace(_.t("Ocultar"),_.t("Ver") ));						  
							$(this).attr("class","ab-preg-tit");
					    if(esPerfil=="CLI"){bridge.trigger('resize:publica', window.parent, { height: heightInicial+'px', source:'publica' })};							
						}						    			   
         });
				setTimeout(function(){selectCintilla();}, 400);
});


function selectCintilla(){

		
$.getScript("/estaticos/js/jquery.cookie.js", function(){
			_ = {
			t: function (literal)
			{
				return literal;
			}
		}
	
	if(($.cookie("cintilla-gdpr-201809") == null || $.cookie("cintilla-gdpr-201809") != "1") && window.location.href.indexOf("mb=si") == -1){
		if(window.location.href.indexOf("mb=ordenMapa") == -1){
			if($.cookie("ordenMapa")!=4 && $.cookie("ordenMapa")!=5){
					$("body").prepend("<style>.for-eur a{color: #5083c9;}.for-eur a:hover{color: #5083c9;border-bottom: 1px #5083c9 solid;}.for-eur{height: 4.8rem;background: #fde6f3;text-align: center; }.for-eur p {text-align: center;margin-left: 2rem;line-height: 4.8rem;font-size: 1.4rem;font-family: \"BBVA Web Medium\", sans-serif;  color: #5083c9;text-transform: uppercase;display: inline-block; position:relative; top:-1rem; }.for-eur img {margin-left: 0rem;}.for-eur span {float: right;cursor: pointer;}.for-eur span:hover:before{color: #5083c9; }.for-eur span:before {line-height: 4.5rem;font-size: 2.4rem; margin-right: 2.4rem;color: #5083c9;display: inline-block;vertical-align: top; }.for-eur span.c-icon-close:before {font-size: 1.6rem;}</style>");
						$("div.reset-c:first").prepend("<div class='reset-c'><div class='for-eur'><img src='/estaticos/mult/lazos_40x40_001.jpg' alt=''><p><a href='#' title='"+_.t("Hoy, además de mirar tus cuentas, puedes luchar contra el cáncer de mama. Dona a AECC desde aquí.")+"'>"+_.t("Hoy, además de mirar tus cuentas, puedes luchar contra el cáncer de mama. Dona a AECC desde ")+"<span class=\"link-cin\" style=\"float: none;text-decoration: underline;\">"+_.t("aquí.")+"</span><span class=\"c-icon-forward\"></span></a></p><img src='/estaticos/mult/lazos_40x40_001.jpg' alt=''><span class='c-icon-close'></span></div></div>");
						$(".for-eur span").on("click",function(){
							$(this).parent().parent().css("display","none");
							$.cookie("cintilla-gdpr-201809", "1", {path:"/"});
						});
						function abrirVentanaUrlExternaCintillo(var1, var2, var3){
							document.cookie="kqof_var_contratacion/contrataciondirecta_token=" + var3;

							var var2Aux = var2;
							if($.cookie("idiomaAuto") != ""&&$.cookie("idiomaAuto") != "cas"&&$.cookie("idiomaAuto") != null){
								var2Aux = "/"+$.cookie("idiomaAuto")+var2;
							}
							

							var urlExt="/productos/contratacion.jsp?"+var1;// parUrlExt
							// AAE     
							// Pasamos la url de contratacion a la pate privada cortada
							// En este punto sURLContratar tiene una "#", si lo pasamos tal cual el string se corta , lo dividimos

							var iframe = "<div class=\"headerModalDes\"><p class=\"cerrarModal\" id=\"cerrarModalDescon\" role=\"button\"><img src=\"/estaticos/mult/ico-cerrar-tipo1.png\" alt=\"Cerrar\" title=\"Cerrar\" width=\"20px\" height=\"20px\"></p></div><div id=\"contieneIframe\" style=\"overflow:hidden;\"><iframe src=\"" + urlExt + "\" scrolling=\"no\" width=\"654\" height=\"520\"  /></div>";

							var $divVentanaUrlExterna = $('<div class="contenidoModal" style="overflow:hidden;"></div>')
							.html(iframe)
							.dialog({
								autoOpen: false,
								title: 'Desconexión',
								resizable: false,
								show: 'fade',
								height:525,
								width:682,
								modal: true,
								dialogClass: "c-contenedores-ventanaModal",
								buttons: {	            
								},
								open: function(){ // Al pulsar aspa de ventana modal cerramos la ventana
									// $("div.headerModalDes p.cerrarModal").click(function(){
									$("p.cerrarModal").click(function(){
										$divVentanaUrlExterna.dialog("close");
									}) 
								},
								close: function(){
								}
							});
							// Abrimos la ventana

							$divVentanaUrlExterna .dialog("open");
						}
						$(".for-eur a").on("click",function(e){
							e.preventDefault();
							abrirVentanaUrlExternaCintillo('url1=/BBVANet/particulares&url2=bizum/enviarong/33334&int=pc-bizumcancer&token', '', '');
						});
			}else if ($.cookie("ordenMapa")==4 || $.cookie("ordenMapa")==5){
					$("body").prepend("<style>.for-eur a{color: #FFFFFF;}.for-eur a:hover{color: #FFFFFF;border-bottom: 1px #FFFFFF solid;}.for-eur{height: 4.8rem;background: #F7893B;text-align: center; }.for-eur p {text-align: center;margin-left: 4.8rem;line-height: 4.8rem;font-size: 1.4rem;font-family: \"BBVA Web Medium\", sans-serif;  color: #FFFFFF;text-transform: uppercase;display: inline-block; }.for-eur img {margin-left: 1.6rem;}.for-eur span {float: right;cursor: pointer;}.for-eur span:hover:before{color: #FFFFFF; }.for-eur span:before {line-height: 4.5rem;font-size: 2.4rem; margin-right: 2.4rem;color: #FFFFFF;display: inline-block;vertical-align: top; }.for-eur span.c-icon-close:before {font-size: 1.6rem;}</style>");
						$("div.reset-c:first").prepend("<div class='reset-c'><div class='for-eur'><p><a href='/general/finanzas-vistazo/empresas/gdpr/index.jsp' title='"+_.t("Prepara a tu empresa para cumplir con el GDPR")+"'>"+_.t("Prepara a tu empresa para cumplir con el GDPR")+"<span class=\"c-icon-forward\"></span></a></p><span class='c-icon-close'></span></div></div>");
						$(".for-eur span").on("click",function(){
							$(this).parent().parent().css("display","none");
							$.cookie("cintilla-gdpr-201809", "1", {path:"/"});
						});
			}else{
					$("body").prepend("<style>.for-eur a{color: #5083c9;}.for-eur a:hover{color: #5083c9;border-bottom: 1px #5083c9 solid;}.for-eur{height: 4.8rem;background: #fde6f3;text-align: center; }.for-eur p {text-align: center;margin-left: 2rem;line-height: 4.8rem;font-size: 1.4rem;font-family: \"BBVA Web Medium\", sans-serif;  color: #5083c9;text-transform: uppercase;display: inline-block; position:relative; top:-1rem; }.for-eur img {margin-left: 0rem;}.for-eur span {float: right;cursor: pointer;}.for-eur span:hover:before{color: #5083c9; }.for-eur span:before {line-height: 4.5rem;font-size: 2.4rem; margin-right: 2.4rem;color: #5083c9;display: inline-block;vertical-align: top; }.for-eur span.c-icon-close:before {font-size: 1.6rem;}</style>");
						$("div.reset-c:first").prepend("<div class='reset-c'><div class='for-eur'><img src='/estaticos/mult/lazos_40x40_001.jpg' alt=''><p><a href='#' title='"+_.t("Hoy, además de mirar tus cuentas, puedes luchar contra el cáncer de mama. Dona a AECC desde aquí.")+"'>"+_.t("Hoy, además de mirar tus cuentas, puedes luchar contra el cáncer de mama. Dona a AECC desde aquí.")+"<span class=\"c-icon-forward\"></span></a></p><img src='/estaticos/mult/lazos_40x40_001.jpg' alt=''><span class='c-icon-close'></span></div></div>");
						$(".for-eur span").on("click",function(){
							$(this).parent().parent().css("display","none");
							$.cookie("cintilla-gdpr-201809", "1", {path:"/"});
						});
						function abrirVentanaUrlExternaCintillo(var1, var2, var3){
							document.cookie="kqof_var_contratacion/contrataciondirecta_token=" + var3;

							var var2Aux = var2;
							if($.cookie("idiomaAuto") != ""&&$.cookie("idiomaAuto") != "cas"&&$.cookie("idiomaAuto") != null){
								var2Aux = "/"+$.cookie("idiomaAuto")+var2;
							}
							

							var urlExt="/productos/contratacion.jsp?"+var1;// parUrlExt
							// AAE     
							// Pasamos la url de contratacion a la pate privada cortada
							// En este punto sURLContratar tiene una "#", si lo pasamos tal cual el string se corta , lo dividimos

							var iframe = "<div class=\"headerModalDes\"><p class=\"cerrarModal\" id=\"cerrarModalDescon\" role=\"button\"><img src=\"/estaticos/mult/ico-cerrar-tipo1.png\" alt=\"Cerrar\" title=\"Cerrar\" width=\"20px\" height=\"20px\"></p></div><div id=\"contieneIframe\" style=\"overflow:hidden;\"><iframe src=\"" + urlExt + "\" scrolling=\"no\" width=\"654\" height=\"520\"  /></div>";

							var $divVentanaUrlExterna = $('<div class="contenidoModal" style="overflow:hidden;"></div>')
							.html(iframe)
							.dialog({
								autoOpen: false,
								title: 'Desconexión',
								resizable: false,
								show: 'fade',
								height:525,
								width:682,
								modal: true,
								dialogClass: "c-contenedores-ventanaModal",
								buttons: {	            
								},
								open: function(){ // Al pulsar aspa de ventana modal cerramos la ventana
									// $("div.headerModalDes p.cerrarModal").click(function(){
									$("p.cerrarModal").click(function(){
										$divVentanaUrlExterna.dialog("close");
									}) 
								},
								close: function(){
								}
							});
							// Abrimos la ventana

							$divVentanaUrlExterna .dialog("open");
						}
						$(".for-eur a").on("click",function(e){
							e.preventDefault();
							abrirVentanaUrlExternaCintillo('url1=/BBVANet/particulares&url2=bizum/enviarong/33334&int=pc-bizumcancer&token', '', '');
						});
			}
		
		}
	}
});
}


	(function($){
    /** Listeners enlaces con cambio en visibilidad
    */    
	$(document).on( "click" , "[data-change-visibility]", function( ev ){
      ev.preventDefault();

      var padreTr = $( this ).parents( "tr" )[0];
      if( padreTr != undefined && padreTr.tagName == "TR" ){
        ev.stopImmediatePropagation();
      }

      var visibility = $(this).data('change-visibility');

      var transition = visibility.transition;

      if ( visibility.toggle != undefined ){
        var tdInicial = $( this );
        var padreLI = $( this ).parents( "li" ).eq(0);
        var padreTD = $( this ).parents( "td" ).eq(0);
        if ( padreLI.length != 0 ) padreLI.toggleClass( "activo" );

        if ( padreTD.length != 0 ) {
          padreTD.closest("table").find("td").each( function( i, td ) {
            if( $( td ).hasClass("activo") && td != tdInicial ) {
              $( td ).removeClass("activo");
              $( td ).find( "ul.menu" ).eq(0).hide();
            }
          });
          padreTD.toggleClass( "activo" );
        }
        
      }

      $( visibility.show ).show( transition );
      $( visibility.hide ).hide( transition );
      $( visibility.toggle ).toggle( transition );
       $(".c-login-accesoUsuario").find("input#eai_user").focus();

      $(document).click(function () {
          $( ".acciones_producto" ).removeClass("activo");
          $(".widget ul").hide();
           });

       });
     
   
    })( jQuery );
    
	var bbvaapijquerHeadJquer = "bbva.api_jquer";
	if(window.location.href.indexOf("ei.bbva.es") == "-1"){
		bbvaapijquerHeadJquer = "/estaticos/js/"+bbvaapijquerHeadJquer;
	}
	
    require([bbvaapijquerHeadJquer], function (api) {
    	bridge = api.integration();
    	bridge.on('cerrarLightbox:alta',  function(){
    	    $(".contenidoModal" ).empty();
    	   	$( ".contenidoModal" ).dialog("close");
    	});
    	
    	bridge.on('abrirUrl',  function(data){
    	    $(".contenidoModal" ).empty();
    	   	$( ".contenidoModal" ).dialog("close");
			if (data.token!=undefined && data.token!=null && data.token!="")
			{
				$objForm = $("<form id=\"abrirUrl\" method=\"POST\" target=\"_top\" action=\"\"></form>");
				$("body").append($objForm);
				$("#abrirUrl").append("<input type=\"hidden\" value=\""+data.token+"\" name=\"token\"/>");
				$("#abrirUrl").attr("action",data.url);
				$("#abrirUrl").submit();
			}
			else
			{				
				if (data.token2!=undefined && data.token2!=null && data.token2!="")
				{
					$objForm = $("<form id=\"abrirUrl\" method=\"POST\" target=\"_top\" action=\"\"></form>");
					$("body").append($objForm);
					$("#abrirUrl").append("<input type=\"hidden\" value=\""+data.token2+"\" name=\"token2\"/>");
					$("#abrirUrl").attr("action",data.url);
					$("#abrirUrl").submit();
				}
				else{
					window.location = data.url;
				}
			}
    	});
		
		bridge.on('datosPersonalesRequest:facebook', function () 
		{
			var mailFace = $("#FacebookEmail").val();
			if (mailFace == "" || mailFace == "undefined" || mailFace == null)
				mailFace = "";
				
			var nombreFace = $("#FacebookNombre").val();
			if (nombreFace == "" || nombreFace == "undefined" || nombreFace == null)
				nombreFace = "";
				
			var apellidosFace = $("#FacebookApellidos").val();
			if (apellidosFace == "" || apellidosFace == "undefined" || apellidosFace == null)
				apellidosFace = "";
				
			var fechaNacimientoFace = $("#FacebookFechNacimiento").val();
			if (fechaNacimientoFace == "" || fechaNacimientoFace == "undefined" || fechaNacimientoFace == null)
				fechaNacimientoFace = "";
				
			var idiomaFace = $("#FacebookIdioma").val();
			if (idiomaFace == "" || idiomaFace == "undefined" || idiomaFace == null)
				idiomaFace = "";
				
			var ciudadNatalFace = $("#FacebookCiudadNatal").val();
			if (ciudadNatalFace == "" || ciudadNatalFace == "undefined" || ciudadNatalFace == null)
				ciudadNatalFace = "";
			
					var ciudadActualFace = $("#FacebookCiudadActual").val();
			if (ciudadActualFace == "" || ciudadActualFace == "undefined" || ciudadActualFace == null)
				ciudadActualFace = "";
				
				
						var aliasFace = $("#FacebookAlias").val();
			if (aliasFace == "" || aliasFace == "undefined" || aliasFace == null)
				aliasFace = "";
			
			var objIframe;
			objIframe = $("iframe[data-src='/BBVANet/public/#alta-cliente']")[0];
			if (objIframe!=undefined)
			{
				if(esPerfil=="CLI"){bridge.trigger('datosPersonales:facebook', objIframe.contentWindow, {email:mailFace, nombre:nombreFace, apellidos:apellidosFace, fechaNacimiento:fechaNacimientoFace, idiomaFace:idiomaFace, ciudadNatal:ciudadNatalFace, ciudadActual:ciudadActualFace, alias:aliasFace})};
			}
			
			objIframe = $("#idIframeCentral")[0];
			if (objIframe!=undefined)
			{
				if(esPerfil=="CLI"){bridge.trigger('datosPersonales:facebook', objIframe.contentWindow, {email:mailFace, nombre:nombreFace, apellidos:apellidosFace, fechaNacimiento:fechaNacimientoFace, idiomaFace:idiomaFace, ciudadNatal:ciudadNatalFace, ciudadActual:ciudadActualFace, alias:aliasFace})};
			}	
			
		});
		
/********************************************************RELATIVO A ORDEN DE TABULACION DE LOS ENLACES EN LA CABECERA****************************/
	
		 var contElemTab =1;		 
		 $('.logo_bbva a').attr('tabindex',contElemTab);
		 contElemTab++;
		 $('.c-estructural-cabecera .c-menu-auxiliar_R2 a').each(function(){	
				$(this).attr('tabindex',contElemTab);	
				contElemTab++;	 
			})
			$('.c-estructural-cabecera .c-menu-clientes_R2 a').each(function(){			
				$(this).attr('tabindex',contElemTab);	
				contElemTab++;	 
			})
			$('.c-estructural-cabecera .c-menu-accesoUsuario a:eq(0)').attr('accesskey',"l").attr('tabindex',contElemTab);contElemTab++;	
			$('.c-estructural-cabecera .c-login-accesoUsuario #login input#eai_user').attr('tabindex',contElemTab);contElemTab++;	
			$('.c-estructural-cabecera .c-login-accesoUsuario #login input#eai_password').attr('tabindex',contElemTab);contElemTab++;
			$('.c-estructural-cabecera .c-login-accesoUsuario #login input#acceder').attr('tabindex',contElemTab);contElemTab++; 
			$('.c-estructural-cabecera .c-login-accesoUsuario #login p.recuperar a').attr('tabindex',contElemTab);contElemTab++;
			$('.c-estructural-cabecera .c-login-accesoUsuario #form2 a').attr('tabindex',contElemTab);contElemTab++;
			$('.c-estructural-cabecera .c-login-accesoUsuario #fb-login').attr('tabindex',contElemTab);contElemTab++;
			$('.c-estructural-cabecera .c-menu-accesoUsuario a:eq(1)').attr('tabindex',contElemTab);contElemTab++;	
			
			$('.c-estructural-cabecera .c-estructural-navegacionPrincipal_R2 a').each(function(){		
				$(this).attr('tabindex',contElemTab);	
				contElemTab++;	 					
			})			
		});
/* Función para detectar si es internet explorer*/
function isIE () {
	var myNav = navigator.userAgent.toLowerCase();
	return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
	
};
/* Función para detectar si es internet explorer*/

/********************************************************Aplicar estilos impares a tablas con estructura compleja y a tablas en ie8****************************/
$(function(){
	$("td[rowspan]").each(function(index, el) {
			var repeciones = $(this).attr("rowspan");
			var backgroundColor = $(this).css("background-color");
			var backgroundColorAnte="";
			var padre = $(this).closest("tr");
			for (var i=1; i < repeciones; i++){
				padre= padre.next();
				if (backgroundColorAnte===""){
					if ((backgroundColorAnte=padre.children('td').css("background-color")) == backgroundColor){
						backgroundColorAnte="";
					}
				}
				padre.children('td').css("background-color",backgroundColor);
			}
			padre= padre.next();
			if(padre.children('td').css("background-color") != backgroundColorAnte){
				padre.children('td').css("background-color",backgroundColorAnte);
			}

	});
	$("tr:first-child").each(function(){
		var primerhijo = $(this).find("*:first-child");
		if( String(primerhijo.html()).trim() == "" && !primerhijo.closest('table').hasClass('tabla1') ){	//la comprobación de la tabla1 es por una incidencia de la página https://www.bbva.es/sistema/meta/info-legal/sepa.jsp
			primerhijo.css({"background-color":"white","border":"0"});
		}
	});
	if (isIE() && isIE() <=8){
		$("tbody tr").each(function(index, el) {
				if(((index+1)%2)===0){
				$(this).addClass('even');
			}
		});
	}
});
/********************************************************Aplicar estilos impares a tablas con estructura compleja y a tablas en ie8****************************/