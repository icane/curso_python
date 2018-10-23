 function llamarfunciontraduccion() {
	_ = {
		t: function (literal)
		{
			return literal;
		}
	}   
}

$(document).ready(function()
{
	var mb = getQueryVariable("mb");
	var esPerfil;

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
  
	if(window.location.href.indexOf("mb=si") !=-1){
  
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
	} else if(typeof(bPerfil)!="undefined"&&bPerfil!=""){
	  	if(bPerfil=="CLI"){
				esPerfil = "CLI";
			} else if(bPerfil="PUB"){
				esPerfil = "PUB";
			}
	} else {
	    if(s.prop14 == "logado"){
			esPerfil = "CLI";
		}else{
			esPerfil = "PUB";
		}
	}
	//si estamos dentro de un iframe x ejemplo en la parte privada
	if(window.top !== window.self) {
		$(".avisoCookies").hide();
		$(".container_expandido").hide();
		$("footer .pie-sup").hide();		
	}
}
      require(['/estaticos/js/bbva.api_jquer'], function (api) {
        //console.log('api', api);   
//$("body").append("<div class=\"ui-widget-overlay\" style=\"z-index: 1001; width: 100%; height: 100%; \"></div>");
       var bridge, iframe, contentWindow;
        var aviso = false;
        bridge = api.integration();
        iframe = $(".asesoramiento iframe");
        iframe2 = $("#idIframeCentral");
		iframeUnico = $("#frameUnico");
        $("a").click(function(e){              
             
              if(($(this).parent().parent().attr("id") != "bocadillo-asesoramiento") && ($(this).attr("class") != "c-botones-generico menor" && $(this).attr("class") != "c-botones-generico menor verde" && $(this).attr("class") != "c-botones-generico" && $(this).attr("class") != "c-botones-generico verde")){
                 if(aviso){
                  e.preventDefault();
                  abrirVentanaSalir($(this).attr("href"));  
                 }
              }
        });		
		
		
		$(".lupaBuscador input").click(function(e){              
             
              if(($(this).parent().parent().attr("id") != "bocadillo-asesoramiento") && ($(this).attr("class") != "c-botones-generico menor" && $(this).attr("class") != "c-botones-generico menor verde")){
                 if(aviso){
                  e.preventDefault();
				  var parametros = $('input#buscon').val();
				  
                  abrirVentanaSalir("/productos/buscador.jsp?q="+parametros);  
                 }
              }
        });		
		

			bridge.on('loginCondicional:parametrizado', function(data){
    		var sParams = "";
    		var iCont = 0;
    		if (data != null){
	    		sParams="?";
	    		$.each(data, function(key,val){
	   					if(iCont != 0){
	   						sParams += "&";
	   					}
	   					sParams += key+"="+val;
	   					iCont++;
	       });
	       
	       $("#eai_url_params").val(sParams);
	       
	      }    		
    	});
    	
    	bridge.on('cerrarmodal', function(data){    		
    		if (data.surl != null){
	    		var url=data.surl;
	    		$(".contenidoModal").dialog("close");
	    		window.location = url;	       
	      }    		
    	});   
    	
    			
			bridge.on('redimensionarIframe:parametrizado', function(data){
          alert("redimensionar"+data + " height: " + data.height);
          
                       if  (!(data.height == "undefined")){
          	                $("iframe[name='prueba']").height(data.height);
          	              }	          	
          	
          	
       });

	   	
    	bridge.on('fichafondos:ventanacompleta', function(data){                  
    		  window.top.location.href = "https://"+document.domain+"/particulares/ahorro-inversion/fondos/ficha-fondos.jsp?sac="+data.codigo;
       });
	   
		bridge.on('fichaplanes:ventanacompleta', function(data){                  
    		  window.top.location.href = "https://"+document.domain+"/particulares/ahorro-inversion/planes-de-pensiones/ficha-planes.jsp?sac="+data.codigo;
		});
		
		bridge.on("resize:valora",function(data){
			$("#idIframeCentral").height(data.height);
		});
    	
    	bridge.on('showOrHide:mostrarAsesoramiento', function(data){                  
    		  $(".subhome-central.grid_16").css({'margin-top':'150px'});
					$("#bocadillo-asesoramiento").show();				
          $("#idAsesoramiento").attr("src", "");
          $("#idAsesoramiento").attr("url", "");
		      $("#idAsesoramiento").hide();
       });


    	bridge.on('showOrHide:asesoramientobuscador', function(data){                  
            //console.log('mensaje de asesoramiento o buscador: ', data);
            //Si es buscador se cierra asesoramiento
            if (data.src == "buscador"){
                    //$(".bloque-color").hide();
					$(".bloque-color").css("display","none");
            //Si es asesoramiento se cierra el buscador
            }else if(data.src == "asesoramiento"){
                     /*$(".lateral").hide();
                     $(".grid_16").hide();
                     $(".bloque-blanco").hide();*/					 
					 $(".lateral").css("display","none");
                     $(".grid_16").css("display","none");
                     $(".bloque-blanco").css("display","none");
            }
       });
        

        bridge.on('resize:asesoramiento', function (data) {
          //console.log('mensaje de asesoramiento: ', data);
          
          if (data.source == "buscadorAvanz")
          {
          	$(iframe2).height(data.height);
          }
          else
          {
          	$(iframe).height(data.height);
          }
					var parentWindow = window.parent;
					
					
					
 				if(esPerfil=="CLI"){bridge.trigger('resize:publica', parentWindow, { height: $("div#contenido").outerHeight(false)+'px', source:'publica' })};
        });
		
		bridge.on('resize:adeudo', function (data) {
          //console.log('mensaje de adeudo: ', data);			
          	$(iframeUnico).height(data.height);
		});
		
				 bridge.on('resize:pagos', function (data) {
				 	$("#frameUnico").height(data.height);
				 });

				bridge.on('hideBackground:asesoramiento', function () {
					if(location.href.indexOf("altanif") < 0){
          $("body").append("<div id=\"capahideBackground\" class=\"ui-widget-overlay\" style=\"z-index: 25; width: 100%; height: "+$("body").height()+"px; \"></div>");
					}
		 			$("header.c-estructural-cabecera").css("z-index","20");
		  		$("iframe#idIframeCentral").addClass("ZIframeCentral");
		          });
        
        bridge.on('urlFicha:asesoramiento', function (data) {
        	if(data.cerrarmodal == true){
        		$(".contenidoModal").dialog("close");
        	}
          abrirLightbox(data.url,890,660);

        });
        
        bridge.on('urlFicha:altaNet', function (data) {
        	if(data.cerrarmodal == true){
        		$(".contenidoModal").dialog("close");
        	}
          abrirLightbox(data.url,895,660);

        });
		
		bridge.on('urlFicha:altaNetRedim', function (data) {
        	if(data.cerrarmodal == true){
				if($(".fancybox-close").length > 0){
					$(".fancybox-close").click();
				}else{
					$(".contenidoModal").dialog("close");
				}
        	}
			abrirLightbox(data.url,980,570);
			$(".ui-widget-overlay").hide();
			$(".ui-dialog.ui-widget.ui-widget-content.ui-corner-all.c-contenedores-ventanaModal.ui-draggable").css("height","680px");
			$(".contenidoModal.ui-dialog-content.ui-widget-content").css("height","660px");
			$("h1").css("margin-top","2px");

        });
        
        bridge.on('urlFicha:olvidastePss', function (data) {
        	if(data.cerrarmodal == true){
				if($(".fancybox-skin a").length > 0){
					$(".fancybox-skin a").click();
				}else if($(".contenidoModal").length > 0){
					$(".contenidoModal").dialog("close");
				}
        	}
			abrirLightbox(data.url,980,570);
			$(".ui-widget-overlay").hide();
			$(".ui-dialog.ui-widget.ui-widget-content.ui-corner-all.c-contenedores-ventanaModal.ui-draggable").css("height","680px");
			$(".contenidoModal.ui-dialog-content.ui-widget-content").css("height","660px");
			$("h1").css("margin-top","2px");
	
        });
        
               
        bridge.on('recuperarPropuesta', function (data){
        	$(".contenidoModal").dialog("close");
        });

        bridge.on('scroll:top', function (data){
           if (data.source == "buscadorAvanz"){
			$("html,body").animate({scrollTop:$('iframe#idIframeCentral').offset().top});
			if(esPerfil=="CLI"){bridge.trigger('scroll:top', window.parent, {source:'publica' })};
          }
        });

        bridge.on('showBackground:asesoramiento', function () {
          $("#capahideBackground").remove();
		  		$("header.c-estructural-cabecera").css("z-index","50");
		  		$("iframe#idIframeCentral").removeClass("ZIframeCentral");
        });

       bridge.on('iniciado:asesoramiento', function(data){                  
                  //console.log('mensaje de asesoramiento: ', data);
                  if (data.confirmacionRequerida == true){
                        aviso = true;
                  }else{
                        aviso = false;
                   }
       })
		bridge.on("resize:babyplanner",function(data){
			 var alto = data.height;
			 alto = alto.replace("px", "");
			 alto = parseInt(alto) + 10;
			$("iframe#idIframeCentral").height(alto);
		});     
		bridge.on("resize:babyplannermodal",function(data){
			var alto = data.height;
			alto = alto.replace("px", "");
			alto = ($("iframe").height()/2)-100; 
       	    $("html,body").animate({scrollTop:alto+"px"});
		}); 

		bridge.on('resize:babyplannerpdfclose', function(data){ 
			$("html,body").animate({scrollTop:0+176});
			$("iframe#idIframeCentral").height(data.height);
			$("html,body").animate({scrollTop:data.position-data.height.replace("px", "")+"px"});
		})
		
		bridge.on('scrollToPosition:babyplanner', function(data){ 
			var alto = parseInt(data.offsetTop.replace("px", ""))+250;
       	    $("html,body").animate({scrollTop:alto+"px"});
       })
		
   
       bridge.on('resize:iFrameHipotecas', function(data){ 
       	    $("iframe#idIframeCentSubhome").css("height", data.height);
       })
	   
	   bridge.on('resize:fondosInternacionales', function(data){ 
       	    $("iframe#frameUnico").css("height", data.height);
       })
	   
	   bridge.on('scroll:fondos-internacionales', function(data){ 
			//if($.cookie("isEmployee") != null){
			// document.domain = document.domain.split('.').slice(-2).join('.');
			// $("html,body", window.parent.document).animate({scrollTop:0});
			/*}else{
				 $("html,body", window.parent.document).animate({scrollTop:0});
			}*/
			try {
				if(window.top !== window.self){
					//document.domain = document.domain.split('.').slice(-2).join('.');
					$("html,body", window.parent.document).animate({scrollTop:0});
				}else{
					$("html,body", window.parent.document).animate({scrollTop:0});
				}
			}
			catch(err) {
				document.domain = document.domain.split('.').slice(-2).join('.');
				$("html,body", window.parent.document).animate({scrollTop:0});
			}
       })
	   bridge.on('scrolladhoc:fondos-internacionales', function(data){ 
	        var alto = data.height;
			alto = alto.replace("px", "");
			alto = parseInt(alto) - 176;	
            //if($.cookie("isEmployee") != null){
			document.domain = document.domain.split('.').slice(-2).join('.');
			$("html,body", window.parent.document).animate({scrollTop:alto+"px"});
			/*}else{
				$("html,body", window.parent.document).animate({scrollTop:alto+"px"}); 	
			}*/		
       	    
       })   
	   
	   bridge.on('abreContratacion', function(data){
		    if(typeof(sPerfil) == "undefined"){
				var sPerfil = esPerfil;
			}
			if(data.familia != null && data.familia == "00003"){
				if(sPerfil!="CLI"){
					abrirLightbox("/productos/contratacion.jsp?url1=/BBVANet/particulares&url2=planes/altaplanes/" + data.parametro,661,473);
				}else{
					window.parent.location.href = "/BBVANet/particulares#planes/altaplanes/" + data.parametro;
				}
			}else{
				if(sPerfil!="CLI"){
					abrirLightbox("/productos/contratacion.jsp?url1=/BBVANet/particulares&url2=fondos/traspaso/alta/" + data.parametro,661,473);
				}else{
					window.parent.location.href = "/BBVANet/particulares#fondos/traspaso/alta/" + data.parametro.split("&")[0];
				}
				
			}	   		
        });
		
		bridge.on('abreAportacion', function(data){
			if(sPerfil!="CLI"){
				abrirLightbox("/productos/contratacion-directa.jsp?url=planes/aportaciondirecta",661,473);  
			}else{
				window.parent.location.href = "/BBVANet/particulares#planes/aportaciondirecta";
			}
        });
			
		bridge.on('resize:fondos', function(data){
			if(data.height != null){
				var iframe = $("iframe#idIframeCentral");
				var alturaDiferencia = (data.height - $(iframe).height())+ 15;
				$("iframe#idIframeCentral").attr("height", data.height + "px");
				//if($.cookie("isEmployee") != null){
				if(($("#idIframeCentral").attr("src").indexOf("fondos-inversion") > 0 || $("#idIframeCentral").attr("src").indexOf("planes-pensiones") > 0) && window.location.href.indexOf("/productos/") != -1){
					bridge.trigger('maxHeight:publica', window.parent, {height: (data.height+600)+ "px"});				
					bridge.trigger('resize:publica', window.parent, { height: parseInt($("#app").outerHeight(false))+'px', source:'publica' })
				}
				/*}else{
					if(($("#idIframeCentral").attr("src").indexOf("fondos-inversion") > 0 || $("#idIframeCentral").attr("src").indexOf("planes-pensiones") > 0) && $('#catalogoProductos', window.parent.document).length > 0){
						//var altura = $('#catalogoProductos', window.parent.document).height() + $(iframe).height();
						$(iframe).height(data.height);
						$('#catalogoProductos', window.parent.document).height($('#catalogoProductos', window.parent.document).height()+alturaDiferencia);
					}
					$('#catalogoProductos', window.parent.document).height($('#catalogoProductos', window.parent.document).height()+alturaDiferencia);
					$('#iFrameContenidoPublico', window.parent.document).height($('#iFrameContenidoPublico', window.parent.document).height()+alturaDiferencia);
				}*/
				//$(iframe).height(data.height);
				//e.stopPropagation();
			}
        });
			
		
		bridge.on('load:uroboro', function(data){
			var iframe = $("iframe#idIframeCentral");
			$(iframe).css({
				"background-image": "url(/estaticos/mult/ico-modal-cargando-fast.gif)",
				"background-repeat": "no-repeat",
				"background-position": "50% 20%"
			});
        });
		
		bridge.on('scroll:fondos', function(data){
			$('html, body').animate({
				scrollTop: $("#idIframeCentral").offset().top
			}, 1000);
		});

		bridge.on('resize:hipotecario', function (data) {
		  if (data.source == "hipotecario") {
		    $(iframe2).height(data.height);
		  }else if(data.source == "privada"){
			  var altoIframe = data.height;
			altoIframe = altoIframe.replace("px", "");
			altoIframe = parseInt(altoIframe) + 150;
			$(iframe2).height(altoIframe+"px");  
		  }
		});
		
		bridge.on('scroll:rentvsbuy', function(data){ 
			var alto = data.height;
			alto = alto.replace("px", "");
			alto = parseInt(alto);
			if(alto == 120){
				alto = 840;
			}
			$("html,body", window.parent.document).animate({scrollTop:alto+"px"}); 	
		}) 

		function checkRemoteAddress(ip) {
		  //Se comprueba si la IP desde la que se accede pertenece al banco. Si es así, se eliminan las restricciones de búsquedas para usuarios no logados
		  var IPsOficina = [/*Contenido eliminado a petición del ANS*/];

		  var isIPOf = $.inArray(ip.attr('value'), IPsOficina);

		  return isIPOf;
		}

		function urlParam(name){
		    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		    if (results==null){
		       return null;
		    }
		    else{
		       return results[1] || 0;
		    }
		}

		bridge.on('lanzarFormulario', function (data) {
		  if (data.source == "hipotecario" && (checkRemoteAddress($('input[type=hidden]#IPRemote')) === -1 || urlParam('referencia') != null)) {
		      document.getElementById("formBuscador").click();
		      $("div.headerModal p.cerrarModal").click(function() {
		        window.location="/particulares/hipotecas-prestamos/hipotecas/index.jsp";
		        //Si el usuario abandona una segunda busqueda antes de finalizar el formulario no se guardan los datos de busqueda para que no "pierda" una gratis
		        localStorage.removeItem('AH_BUSQUEDA_SMS');
		      });
		  } else {
		  	    //localStorage.removeItem('AH_BUSQUEDA_SMS');
			    localStorage.removeItem('AH_BUSQUEDAS_REALIZADAS');
			    localStorage.removeItem('AH_FORMULARIO_ENVIADO');
			    bridge.trigger('lanzarSegundaBusqueda', window.top, { source: 'hipotecario' });
		  }
		});
		bridge.on('lanzarGameOver', function (data) {
		  if (data.source == "hipotecario" && checkRemoteAddress($('input[type=hidden]#IPRemote')) === -1) {
		    document.getElementById("gameOver").click();
		    $("div.headerModal p.cerrarModal").click(function() {
		      window.location="/particulares/hipotecas-prestamos/hipotecas/index.jsp";
		    });
		  } else {
		  	    //localStorage.removeItem('AH_BUSQUEDA_SMS');
			    localStorage.removeItem('AH_BUSQUEDAS_REALIZADAS');
			    localStorage.removeItem('AH_FORMULARIO_ENVIADO');
		  }
		});
                   

				function abrirLightbox (enlace, ancho, alto)
				{
					
					var ventanaModal = $("<div class='contenidoModal'><div class='headerModal'><p class='cerrarModal' role='button'><img src='/estaticos/mult/ico-cerrar-tipo1.png' alt='cerrar' width='20px' height='20px'></p></div><div class='cuerpoModal'><iframe id='idFrameModal' frameborder='0' src='' width='' height='' title='acceso en ventana modal'></iframe></div></div>");
							ventanaModal.find("iframe").attr("width",ancho);
							ventanaModal.find("iframe").attr("height",alto);
							ventanaModal.find("iframe").attr("src",enlace);
					
						
						$("body").append(ventanaModal);
						ventanaModal.dialog({
							height: parseInt(alto)+57,
							width: parseInt(ancho)+40,
							modal: true,
							autoOpen: false,
							resizable: false,
							dialogClass: "c-contenedores-ventanaModal"
						});
						
						ventanaModal.dialog("open");
						
						ventanaModal.find("p.cerrarModal").click(function(){
							  ventanaModal.remove();
						})
						
						ventanaModal.find(".ui-widget-header").remove();
					
				};

function abrirVentanaSalir(enlace, cerrar){
		llamarfunciontraduccion();
		var $divVentanaCall = $('<div class="contenidoModal"></div>')
	    .html('<div class="headerModalDes"><div class="title"><h2>'+_.t("Salir")+'</h2></div><p class="cerrarModal" id="cerrarModalDescon" role="button"><img src="/estaticos/mult/ico-cerrar-tipo1.png" alt="Cerrar" title="Cerrar" width="20px" height="20px"></p></div><div class="cuerpoModalDes"><p>'+_.t("Vas a salir del Proceso. Se perderán todos los datos introducidos no guardados ¿Desea continuar?")+'</p></div>')
	    .dialog({
	      autoOpen: false,
	      title: _.t("Desconexión"),
	      resizable: false,
	      show: 'fade',
	      height:260,
	      width:650,
	      modal: true,
	      dialogClass: "c-contenedores-ventanaModal",
	      buttons: {
	            "Cancelar": function() {
	                $( this ).dialog( "close" );		                  
	            },  
	            "Aceptar": function() {
	                $( this ).dialog( "close" ); 
                        aviso = false;	
                        if(!cerrar)
                             window.location = enlace;

                       
	            }
	        },
	      open: function(){ // Al pulsar aspa de ventana modal cerramos la ventana
					$("div.headerModalDes p.cerrarModal").click(function(){
					$divVentanaCall.dialog("close");
				}) 
	      },
	      close: function(){
					}
	    });
		// Abrimos la ventana
		$divVentanaCall.dialog("open");
	}

	
	function abrirVentanaSesion(){
		llamarfunciontraduccion();
		var $divVentanaSesion = $('<div class="contenidoModal"></div>')
	    .html('<div class="headerModalDes"><div class="title"><h2>'+_.t("Salir")+'</h2></div></div><div class="cuerpoModalDes"><p>'+_.t("La sesión ha expirado")+'</p></div>')
	    .dialog({
	      autoOpen: false,
	      title: _.t("Aviso sesión"),
	      resizable: false,
	      show: 'fade',
	      height:260,
	      width:650,
	      modal: true,
	      dialogClass: "c-contenedores-ventanaModal",
	      buttons: {
	            "Aceptar": function() {
	                $( this ).dialog( "close" ); 
                        aviso = false;	
                        window.location = "/particulares/index.jsp";
						}
	        }
	    });
		// Abrimos la ventana
		$divVentanaSesion.dialog("open");
	}
	
	if ($("section.contenedorForm").size()==0)
	{
		if ($("div.errorAplicacion").size()>0)
		{
			strHeight= $("div.errorAplicacion").parent().outerHeight(false);
		}
		else
		{
			strHeight= $("div#contenido").outerHeight(false);
		}
		
		if($("#contenido").find(".bloque-tarifas_161").html() != null){
			strHeight += 40;
		}		
		
		if(strHeight<=610){
			strHeight = 690;
		}


		if (!$("section.cabeceraLandingMGM").size()==0) {
			if(esPerfil=="CLI") {
				strHeight = $("div#contenedor").outerHeight(false);
				bridge.trigger('resize:publica', window.parent, { height: strHeight+'px', source:'publica' });
			}
		} else{
			bridge.trigger('resize:publica', window.parent, { height: strHeight+'px', source:'publica' });	
		}
	}else{
		setTimeout(function(){strHeight= $("div#contenido").outerHeight(false);if(esPerfil=="CLI"){bridge.trigger('resize:publica', window.parent, { height: strHeight+'px', source:'publica' })};},500);
	}

var texto = $(".rastro-migas").clone().children().remove().end().text();
texto = $.trim(texto);
var sNavegacion = new Array();
var urls= new Array();
var cont = 0;
var json = "{\"navegaciones\":[";
var bExiste = false;
$("section.rastro-migas a").each(function(i){
	if(i >= 1){
	 if(typeof(sNavegacion) === 'undefined'){
	    sNavegacion[cont] = $(this).text();
	    urls[cont] = $(this).attr("href");
	    cont++;
	    if(texto != "" && i==$("section.rastro-migas a").length - 1  && !bExiste){	    	
	      sNavegacion[cont] = texto;
	      urls[cont] = "actual";
	      cont++;
	      bExiste = true;    
	    }
	 }else{
	 	  sNavegacion[cont] = $(this).text();
	 	  urls[cont] = $(this).attr("href");
	 	  cont++;
	 	   if(texto != "" &&  i==$("section.rastro-migas a").length - 1 && !bExiste){	    
	      sNavegacion[cont] = texto;
	      urls[cont] = "actual";
	      cont++;	 
	      bExiste = true;     
	    }
	 }
	}else if(i == 1 && texto != "" && $("section.rastro-migas a").length <= 1){
		  sNavegacion[cont] = texto;
		  urls[cont] = "actual";	
		  cont++;	    
	}else if(i == 0 && texto!="" && $("section.rastro-migas a").length <= 1){
		  sNavegacion[cont] = texto;
		  urls[cont] = "actual";	
		  cont++;    
	}


});
for(var o=0; o < cont; o++){
	if(json == "{\"navegaciones\":[")
	  json += "{\"navegacion\": \"" + sNavegacion[o] + "\", \"url\": \"" + urls[o]+ "\"}";
	else
		json += ",{\"navegacion\": \"" + sNavegacion[o] + "\", \"url\": \"" + urls[o]+ "\"}";
}
json += "]}";

if(esPerfil=="CLI"){bridge.trigger('navegacion:publica', window.parent, json)};

$(".subhome-penensiones-elegir-plan").on("click", "li", function() {
	 bridge.trigger("resize:publica", window.parent, {height: $("div.old").outerHeight(!0) + "px", source: "publica"});
});

bridge.on('emailRequest:publica', function (data) 
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
	
  if(esPerfil=="CLI"){bridge.trigger('envioDeEmail:publica', document.getElementById("idAsesoramiento").contentWindow, {email:mailFace,nombre:nombreFace,apellidos:apellidosFace})};
  if(esPerfil=="CLI"){bridge.trigger('envioDeEmail:publica', document.getElementById("idIframeCentral").contentWindow, {email:mailFace,nombre:nombreFace,apellidos:apellidosFace})};
  
});

bridge.on('ocultar:widgets', function (data) 
{
	$("#idIframeCentral").parent().removeClass("grid_16").addClass("grid_24 redim");

    var sumatoria=0;
	var heightElement;
	var heightSide;

	heightSide = $("div.bloque-blanco aside.lateral").outerHeight(false);

	$("div.bloque-blanco section.cont-izq").each(function(i)
	{
		heightElement = $(this).outerHeight(false);
		sumatoria = sumatoria + heightElement      
	});
 
	if(sumatoria < heightSide)
	{		
		$("#idIframeCentral").parent().siblings("aside").hide();
	}	
	
});

bridge.on('SESION_CADUCADA', function () 
{
	abrirVentanaSesion();
});

$("#contLight").click(function(e){
	if (top.location.href.indexOf("/BBVANet/")>-1){
		e.preventDefault();
		//console.log('api', 'navegacion:desdeFicha: '+$(this).find("a").attr("href")); 
		var ruta = $(this).find("a").attr("href");
		ruta = ruta.substring(ruta.indexOf("#")+1);
		bridge.trigger('navegacion:desdeFicha', window.top, {url:ruta});
	}
});

bridge.on('resize:login', function () 
{
	$.each($('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.c-contenedores-ventanaModal.ui-draggable'), function (index, obj) {
		if($(obj).is(':visible')) {
			$(obj).css({'width':'360px'});
			$(obj).css("left",(($(window).outerWidth(true)/2)-360/2)+"px");
		}
	});
});

     });
});