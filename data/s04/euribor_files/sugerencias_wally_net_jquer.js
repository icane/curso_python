
 var urlAction="";
 
 if(document.URL.indexOf("/cat/") != -1){
 	urlAction="/cat/productos/buscador.jsp";
 }
 else if(document.URL.indexOf("/eng/") != -1){
 	urlAction="/eng/productos/buscador.jsp";
 }else{
 	urlAction="/productos/buscador.jsp";
 }

function escapeHtml(unsafe) {
	return unsafe
	.replace(/&/g, "&amp;")
	.replace(/</g, "&lt;")
	.replace(/>/g, "&gt;")
	.replace(/"/g, "&quot;")
	.replace(/'/g, "&#39;");
}

//FUNCIONES FAQS WALLY
function votoFAQSWally(obj){
		$(obj).closest(".b-preg-util-ayudas").hide().next(".ab-preg-votada-ayuda").show("slow");
		
		$(obj).parent().parent().parent('.util').hide();
		$(obj).parent().parent().parent().parent().find('.ab-preg-votada-ayudas').show();			
				
		informarInbentaVotoFAQSWally(obj);	
}

function verOcultarRespuestaFAQSWally(objecto)
{
		
		if($(objecto).hasClass("question-active")){
			$(objecto)
				.removeClass("question-active")
				.next().hide("slow");
		}
		else{
			$(objecto)
				.addClass("question-active")
					.next().show("slow")
				.parent()
					.siblings()
						.children(".response").hide("slow")
							.end()
						.children(".question").removeClass("question-active");
			informarInbentaAbroPreguntaFAQSWally(objecto);
		}
}
	
	
function informarInbentaAbroPreguntaFAQSWally(elemento)
{ 
		 //elemento.preventDefault();
		 
		 var elemenA = $(elemento).find('a');
			 
	    if(typeof(sPerfil) == "undefined"){ // Si no la tenemos el perfil
			  var sPerfil = "PUB";
		}
	     var idiomaBusqueda="es"
		 if(document.URL.indexOf("/cat/") != -1){idiomaBusqueda="ca";}
		 else if(document.URL.indexOf("/eng/") != -1){idiomaBusqueda="en";}
		 var perfilInbenta ="publico";
		 if (sPerfil == "CLI"){ perfilInbenta ="privado";}
		 
		 var evento= "click";		 	 
		 var atributosPeticion = "command="+evento+"&format=jsonp&id="+ elemenA.attr("qgo:clickCallbackId")+"&language="+idiomaBusqueda+"&profile="+perfilInbenta;

		$.ajax ( 
		{
				url: "https://bbva.inbenta.com/",
				cache: false,
				dataType: "jsonp",
				type: "POST",
				data:atributosPeticion,
				success: function(datos)
			{
				var  respuesta  = datos;
			
			},
			complete: function()
			{
				
			}
		});	
		 
}
     
function informarInbentaVotoFAQSWally(elemento){ // Recibo el elemento <a>	 
		 
	    if(typeof(sPerfil) == "undefined"){ // Si no la tenemos el perfil
			  var sPerfil = "PUB";
		}
	     var idiomaInbenta="es"
		 if(document.URL.indexOf("/cat/") != -1){idiomaInbenta="ca";}
		 else if(document.URL.indexOf("/eng/") != -1){idiomaInbenta="en";}
		 var perfilInbenta ="publico";
		 if (sPerfil == "CLI"){ perfilInbenta ="privado";}
		 
		 var sRating ="";	
		 $(elemento).hasClass("fbdown")?sRating="1":sRating="2";
		 
		 var evento= "sendContentRating";		
			 
		 var atributosPeticion = "command="+evento+"&format=jsonp&id="+ elemento.attributes['qgo:clickCallbackId'].value+"&language="+idiomaInbenta+"&profile="+perfilInbenta+"&rating="+ sRating+"&comment=";
		 

		$.ajax ( 
		{
				url: "https://bbva.inbenta.com/",
				cache: false,
				dataType: "jsonp",
				type: "POST",
				data:atributosPeticion,
				success: function(datos)
			{
				var  respuesta  = datos;
			
			},
			complete: function()
			{
				
			}
		});	
		 	 
}


$(document).ready(function() {
	var
		showMoreButtonEnable,
		currentFaqs = null,
		totalResults=null,
		timeoutMovs = 0,
		timeoutId = 0,
		firstCallDone = false;
		mapaCargadoWally=false;
		charsToPredict = 3,
		timeToPredict =1500,
		timeToResults =2000,
		maxVisibleOperations = 10,
		numeroResultadosPaginaWally = 3,
		numeroResultadosPaginaDireccionesWally = 3,
		previousQueryLength = 0,
		idVideo = new Array(),
		allEmpty = {
				results : true,
				faqs : true,
				oficinas: true
		},
		isQueryInProgress = false,
		queryInQueue = false,
		bCargada = false,
		bNueva = false,
		bInicio=true;
		bCentrar = false,
		bClick = false;
		bPrimeraVez=true;
		bHayOficinas=false;
		urlIconDefecto='',
		currentFaqs = null,
		centroMapaWally = new Array (39.956778,-3.734476),
		zoomInicialWally = 5,
		zoomBuscarWally = 14;
		zoomLocalidadesWally = 9
		zoomDetalladoWally = 13,
		zoomCentradoWally = 16,
		newMarkersWally=new Array(),
		dirMarkersWally=new Array(),
		markerActualWally = "",
		strResult="";
		sResultados=_.t(" resultados");
		sResultado=_.t(" resultado");



  $("#buscon").focus(function(){  
  	tryToShowResults(); 
 })
 
   $("#buscon").click(function(e){  

  	tryToShowResults();  
 })
 

 $("#buscon").focusout(function(e) {
	hideSuggestion();
 })


 $("#enlaceProd").click(function(){
            window.open($(this).attr('href'));
  });
    
  $("#enlaceArchivo").click(function(){
            window.open($(this).attr('href'));
  });
  
$("#buscon").on("paste", function(ev){

		var  
		$target = $(ev.currentTarget),
        querySize,
        query

      setTimeout( function(){
        querySize = $target.val().length;
        query=$target.val();
        launch(querySize,query);
        previousQueryLength = querySize;
        manageResetTextButton(query);
      },500);

});
  
$("#buscon").keyup(function(ev){
  		//var
		//$target = $(ev.currentTarget),
		$('.aspaBorrar').removeClass('hidden');
		query = $(this).val(),
		querySize = query.length,
		$resultsPane = $(this).find('#resultsPane');
		manageResetTextButton(query);
		
		
		if (ev.keyCode === 40 && $resultsPane.is(':visible')) {
			$(this).tabDown();

		} else if (ev.keyCode !== 16 && ev.keyCode !== 13 && ev.keyCode !== 17 && ev.keyCode !== 18 && ev.keyCode !== 37 && ev.keyCode !== 38 && ev.keyCode !== 39 && ev.keyCode !== 91) {
        launch(querySize,query);
      	}
		previousQueryLength = querySize;
	
});
function launch(querySize,query){
	if (querySize < charsToPredict && querySize > previousQueryLength || querySize === 0) {
				showSuggestion();
				hideMoreTopics();
				checkFirstCallDone(false);
	} else {
			showLoading();
			clearTimeout(timeoutId);
			clearTimeout(timeoutMovs);
			if (querySize >= charsToPredict) {
				showMoreButtonEnable =  false;
				totalResults=null;
				currentFaqs=null;
				hideResults();
				showSuggestion();
				showLoading();
				setTimeout(function(){getResultsGSA(query,0)},timeToPredict);
				setTimeout(function(){getFaqsWally(query)},timeToPredict);
				setTimeout(function(){getResultsVideos(query)},timeToPredict);
				setTimeout(function(){getResultsOficinas(query)},timeToPredict);
				setTimeout(function(){comprobarResultados(query)},timeToResults);	
			}
	}


}

function getIdiomaActivo() {

    var idioma = "";

    if (idioActivo == null || "" == idioActivo) {
            idioma = "CAS";
    } else if (idioActivo == "eng") {
            idioma = "ING";
    } else {
            idioma = idioActivo.toUpperCase();
    }
    return idioma;
}
  

    
  $('.aspaBorrar').click( function(ev){
  	var
	$target = $(ev.currentTarget);
	$target.closest('p').find('#buscon').val('');
	$target.addClass('hidden');
	$("nav.c-estructural-navegacionPrincipal_R2").toggleClass('buscadorDesplegado');
	manageResetTextButton("");
	hideMoreTopics();
	scrollToTop(); 
	mapaCargadoWally=false;
 })
 
  $('.showAll').click( function(e){
  	$("#verResultados").submit();
  	
  })


 $("#btnOpinatorWally").click(function(event)
	{
		$(".ui-widget-overlay").css("z-index","100005");
		$("div[class='ui-dialog ui-widget ui-widget-content ui-corner-all c-contenedores-ventanaModal ui-draggable']").css("z-index","100006");
		$("div[class='ui-dialog ui-widget ui-widget-content ui-corner-all c-contenedores-ventanaModal ui-draggable']").css("top","20px");
			
	 	if (typeof(Feedback) !== "undefined") {
	        	var dataOpi = {};
	        	//dataOpi.datosUserInfo = datosUserInfo;
	        	dataOpi.idioActivo = getIdiomaActivo();
	        	dataOpi.isPullButton = true;
	        	Feedback.checkAddEvent(event, dataOpi);//La función se encuentra en la pieza cross de feedback
		}
	});
	
 function mostrarResultados(query){

 	var result="<form action=\""+urlAction+"\" role=\"search\" method=\"POST\" id=\"verResultados\">";   
        result+="<input type=\"hidden\" name=\"q\" value=\""+escapeHtml(query)+"\">";
        result+="<input type=\"hidden\" name=\"segmento\" value=\""+segmento+"\">";  
        result+="<p><span>"+_.t("Ver todos los resultados")+"</span></p></form>";
        
        $(".showAll").html(result);
 	
 }
  
 function hideMoreTopics(){
	$(this).find('#fullResults').hide();
	//$('#fullResultsTranslucent').remove();
 }
 
 function scrollToTop()  {
	$('html,body').animate({scrollTop:'0px'});
  }
  
 
  
 function tryToShowResults(){ 
  
	
	var
		$pane = $('#resultsPane');

	if ($('#buscon').val()) {
		if (((totalResults)!= null && totalResults.length !== 0) || (currentFaqs != null && currentFaqs.length !== 0) || bHayOficinas) {
			showResults();
		} else {
			showNoResults();
		}
	} else {
		showSuggestion();
	}
	subirScroll();
 }
 
 
 function showResults() {
	var
		$pane = $('#resultsPane');

	hideSuggestion();
	hideNoResults();
	$pane.fadeIn();
	bindClickOutsideWally($pane);
	hideMoreTopics();
	showSelectedResults();

}

 
 function showAnimationContainer(message,step) {
	bindClickOutsideWally($('#resultsPane'));
	$('#resultsPane').hide();
	$('#suggestionMessage').html(_.t(message));
	addStepClass($('#suggestionPane'), step);
	$('#suggestionPane').show();

 }
 
 
 function showSuggestion() {
 	var mensajeAnimation="<p class='textoSugerencia'><span>" +_.t("Ahora al realizar una búsqueda obtendrá información de ")+"<b>"+_.t("productos, oficinas, videos, preguntas más frecuentes...")+"</b></span></p>";
	showAnimationContainer(mensajeAnimation, 1);
	checkFirstCallDone(false);
 }
 
 $('[data-result-no-navigate="chat"]').click(function (ev) {
		      ev.preventDefault();
		      ev.stopPropagation();
		      var $form = $('form#formChat'),
		      nombreUsuario = $B.cabecera2014 ? $('.headerAreaPersonal .nombreUsuario').text() : $('[data-pg-perfil] .usuario span').eq(1).text();
		      $form.find('[name="clientid"]').attr('value', nombreUsuario  );
		      $form.submit(function(){
		        window.open('', 'ntr', 'menubar=no,toolbar=no,width=560,height=500,location=no,directories=no,personalbar=no,status=no,resizable=no');
		        this.target = 'ntr';
		      });
		      $form.submit();
});
 
 
 function showLoading() {
	addStepClass($('#suggestionPane'), 2);
	$('#suggestionPane').find('#suggestionMessage').html("<p><span><b>..."+_.t("buscando !")+"</b><span>"+ _.t("en un segundo te mostramos resultados")+"</span></span></p>");
 }
 
 function showNoResults(){
	showAnimationContainer('<p class="sorryMessage"><span><b>'+_.t("Lo sentimos.")+'</b><span>'+_.t("No se han encontrado resultados")+'.</span></span></p>', 3);
	
 }
 
 function hideSuggestion() {
	$('#suggestionPane.step1').fadeOut();
	$('#suggestionPane.step2').fadeOut();
 }
 
 function hideNoResults() {
	$('#suggestionPane.step3').fadeOut();
 }
 
 function showMoreButton() {
	//$('.showAll').find('[data-results-number]').html('(' + totalResultsNumber + ')');
	$('.showAll').show();
 }

 function hideMoreButton() {
	$('.showAll').hide();
 }
 
 function addStepClass($pane, step) {
			var
				$animation = $pane.find('#svg-anim');

			$pane.removeClass('step1').removeClass('step2').removeClass('step3');
			$pane.addClass('step' + step);

			if ( step === 3 ) {
				$animation.addClass('fail');			
			} else {
				$animation.removeClass('fail');			
			}
 }
 
 function hideResults() {
	$('#resultsPane').fadeOut();
	unbindClickOutsideWally();
 }
 
 function evaluateIfNoResults() {
	if (allEmpty.results && allEmpty.faqs && allEmpty.oficinas ) {
		if (checkFirstCallDone(true) && !isQueryInProgress) {
			showNoResults();
		}
	} else {
		hideNoResults();
		hideSuggestion();
		showResults();
	}
}

 function checkFirstCallDone(value) {
	firstCallDone = (value) ? value : firstCallDone;
	return firstCallDone;
 }
 
 
 
 function bindClickOutsideWally($pane) {
	var self = this;
	$(document).off('click.outsideWally').on('click.outsideWally', function (ev) {
		if (!$(ev.target).is('#buscon') 
			&&  $(ev.target).closest('#capaMapaOficinasWally').length == 0 
			&& !$(ev.target).parent().hasClass('aspaBorrar') 
			&& !$(ev.target).hasClass('qgoanchor') 
			&& !$(ev.target).parent().hasClass('oficinas') 
			&& !$(ev.target).parent().parent().parent().hasClass('oficinas') 
			&& !$(ev.target).parent().hasClass('fbup')  
			&& !$(ev.target).parent().hasClass('fbdown')
			&& !$(ev.target).hasClass('header')
			&& !$(ev.target).parent().hasClass('header')
			&& !$(ev.target).is('#icoBuscadorPlegMut')   
			&& !$(ev.target).closest('p').is('[data-resultados-category]')
			&& !$(ev.target).closest('li').is('[data-gsa-result]')) {
				
			hideResults();
			hideSuggestion();
			hideNoResults();
		}
	});
 }
		
 function unbindClickOutsideWally() {
	$(document).off('click.outsideWally');
 }
 
 
 function tabDown () {
	var $results = $('#resultsPane').find('[nav-list-item]:not(.hidden)');
	if ($results.length !== 0) {
			$results[0].focus();
	}
 }
 
 function manageResetTextButton (text) {
	if ( text.length !== 0 ) {
		$('.cajaBuscador').addClass('buscando');
	} else {
		$('.cajaBuscador').removeClass('buscando');
	}
 }
 
 function comprobarResultados(query){
 	
 	if (showMoreButtonEnable) {
		mostrarResultados(query);
		showMoreButton();
	} else {
		hideMoreButton();
	}
	
	setTimeout(function(){evaluateIfNoResults()},timeToPredict);
 	
 }
 
 
 //FUNCIONES FAQS
 function getFaqsWally(query) {
			
		
		
		
		if(typeof(sPerfil) == "undefined"){ // Si no la tenemos el perfil
			  var sPerfil = "PUB";
		}
	    	 var idiomaBusqueda="es"
		 if(document.URL.indexOf("/cat/") != -1){idiomaBusqueda="ca";}
		 else if(document.URL.indexOf("/eng/") != -1){idiomaBusqueda="en";}
		 var perfilBusqueda ="publico";
		 if (sPerfil == "CLI"){ perfilBusqueda ="privado";}
		 
		 var atributosPeticion = "command=searchContents&format=jsonp&language="+idiomaBusqueda+"&profile="+perfilBusqueda+"&question="+query;
		
	$.ajax ( 
	{
			
			url: "https://bbva.inbenta.com/",
			cache: false,
			dataType: "jsonp",
		  	type: "POST",
    			data: atributosPeticion,
			success: function(datos) 
			{
				currentFaqs = datos.results;
				if (currentFaqs != "undefined" && currentFaqs != null)
				{
					if (currentFaqs.length !== 0) {
						
						if (currentFaqs.length > 1){
							strResult=sResultados;
						}else{
							strResult=sResultado;
						}
						pintarInbentaWally(datos);
						$('#resultsFaqs').removeClass('hidden');
						$('#resultsFaqs').find('[data-resultados-category]').html(currentFaqs.length+strResult);
						allEmpty.faqs = false;
						showMoreButtonEnable=true;
						
					} else {
						$('#resultsFaqs').addClass('hidden');
						$('#FAQSNet').empty();
						allEmpty.faqs = true;
					}
				}else{
					$('#resultsFaqs').addClass('hidden');
					$('#FAQS').empty();
					allEmpty.faqs = true;
				}
				
				
		
			}
		});			
		
		
 }
 
 
 function pintarInbentaWally(datos)
{
	 var respuestaBuscador="";
	 respuestaBuscador +="<section data-category=\"FAQS\"  class=\"category\">";
	 respuestaBuscador +="<header class=\"headerNet\">";
         respuestaBuscador +=" <h1 class=\"title\"> "+ _.t("Ayuda")+"</h1>";
         respuestaBuscador +="<p data-show-more=\"\" data-resultados-category=\"\"></p>";
         respuestaBuscador +=" </header>";
         respuestaBuscador +="<ul id=\"FAQSNet\" class=\"faqs\"></ul>";
         respuestaBuscador +="</section>";
	 $("#resultsFaqs").html(respuestaBuscador);
	       
	if (datos!=null && datos!="")
	{
		bLlamadaQGO = false;
		var indice;
		respuestaBuscador="";
		for(var i=0; i<datos.results.length; i++)
		{
			 // Cada posicion de results
			indice=i+1;
			respuestaBuscador +=" <li id=\"qnreAyuda\">\n";
			respuestaBuscador +=" <div onclick=\"verOcultarRespuestaFAQSWally(this);return false\" > <a qgo:handle=\"1377824\" qgo:clickCallbackId=\""+ datos.results[i]["clickCallbackId"] +"\" qgo:aid=\"" + datos.results[i].id +"\" qgo:qid=\"" +datos.results[i].id +"\" title=\""+ datos.results[i].title +"\" href=\"#\" class=\"qgoanchor\">" + datos.results[i].title + "</a> </div>\n";
			respuestaBuscador +=" <div class=\"response\">\n";
			respuestaBuscador +=" <p>" + datos.results[i].answer+ "</p>\n";
			respuestaBuscador +=" <div class=\"b-preg-util-ayudas fb1044\"> <span>"+ _.t("¿Te ha resultado útil la información?")+"</span>\n";
			respuestaBuscador +=" <ul>\n";
			respuestaBuscador +=" <li class=\"first\"> <a qgo:handle=\"1377824\" qgo:clickCallbackId=\""+ datos.results[i]["clickCallbackId"] +"\" qgo:aid=\"" + datos.results[i].id +"\" qgo:qid=\"" + datos.results[i].id +"\" class=\"fbup\" title=\"" + _.t("S&iacute;")+ "\" href=\"#\" onclick=\"votoFAQSWally(this)\"><img src=\"/estaticos/mult/ico-up.png\" title=\""+ _.t("S&iacute;")+ "\" alt=\"" + _.t("S&iacute;")+"\"></a> </li>\n";
			respuestaBuscador +=" <li class=\"last\"> <a qgo:handle=\"1377824\" qgo:clickCallbackId=\""+ datos.results[i]["clickCallbackId"] +"\" qgo:aid=\"" + datos.results[i].id +"\" qgo:qid=\"" + datos.results[i].id +"\" class=\"fbdown\" title=\""+ _.t("No")+"\" href=\"#\" onclick=\"votoFAQSWally(this)\" ><img src=\"/estaticos/mult/ico-down.png\" title=\""+_.t("No")+"\" alt=\"" +_.t("No")+"\"></a> </li>\n";
			respuestaBuscador +=" </ul>\n";
			respuestaBuscador +=" </div>\n";
			respuestaBuscador +=" <div style=\"display:none;\" class=\"ab-preg-votada-ayudas th1044\"> "+_.t("&iexcl;Gracias! Tu voto ha sido registrado.")+" </div>\n";
			respuestaBuscador +=" </div>\n";
			respuestaBuscador +=" </li>\n";
		}
		$("#FAQSNet").html(respuestaBuscador);
		
	}else{
		$(this).find('#resultsFaqs').html('');
	}
}

 //FUNCIONES GSA
 function getResultsGSA(query, iStart) {
	var coleccion = "";
    var resultados = "";
	if (document.URL.indexOf("/cat/") !== -1) {
		coleccion = "wally_ca";
	} else if (document.URL.indexOf("/eng/") !== -1) {
		coleccion = "wally_en";
	} else {
		coleccion = "wally_es";
	}

	if (!isQueryInProgress) {

		isQueryInProgress =  true;

		var queryData;

		if (segmento && segmento !== "" && segmento !== undefined /*&& $('meta[name=segmento]')*/) {
			var dataPartialFields = getPartialFields(segmento);
			queryData = {"site": coleccion, "q": query, "entorno": "ie", "oe": "UTF-8", "ie": "UTF-8", "ajax": "S", "filter": "0", "num": numeroResultadosPaginaWally, "start": iStart * numeroResultadosPaginaWally, "json": "S", "getfields": "*", "partialfields": dataPartialFields};
		} else {
			queryData = {"site": coleccion, "q": query, "entorno": "ie", "oe": "UTF-8", "ie": "UTF-8", "ajax": "S", "filter": "0", "num": numeroResultadosPaginaWally, "start": iStart * numeroResultadosPaginaWally, "json": "S", "getfields": "*"};
		}

		$.ajax({

			url: "https://" + dominioTLGO + "/TLGO/tlgo/GSA_search",
			data: (queryData),
			cache: false,
			dataType: "jsonp",
			success: function (datos) {
				isQueryInProgress = false;
				resultados=pintarProductosWally(datos);
				showMoreButtonEnable = true;
					actualizarDataLayer(query,resultados);			
			},
			error: function () {
				isQueryInProgress = false;
			}


		});
		//evaluateIfNoResults();
		checkFirstCallDone(true);
	} else {
		queryInQueue = true;
	}
}

function actualizarDataLayer(palabra, resultados){
	var timer = setInterval(function(){ 
	//if panel cargado
	if($("#resultsPane").is(":visible")){
		//if resultado final
		if( $("#buscon").val() == palabra){
			var oJson = JSON.parse(sessionStorage.getItem("digitalData"));
			oJson.page.pageActivity.search.onSiteSearchTerm = palabra;
			oJson.page.pageActivity.search.originalPage = oJson.page.pageInfo.pageName;
			if(typeof(resultados) != "undefined" && resultados != ""){
				oJson.page.pageActivity.search.onSiteSearchResults = resultados.replace(" resultados", "");
			}	
			digitalChange("link", oJson);
			sessionStorage.setItem("digitalData", JSON.stringify(oJson));	
			//Lo limpiamos una vez ha lanzado una petición
		    clearInterval(timer);
		}		
		}
	}, 500);
}	
	
 function recuperarMetasProductosWally(metas)
 {
	iPdfs = 0;
	var producto = {
		nombre: "",
		pdfs_alpha: "",
		pdfs_omega: "",
		titulo: "",
		descripcion: ""
	};		
		for (i=0;i< metas.length;i++)
		{
			sPdf="";
			datoMeta = metas[i];
			if (datoMeta.N=="namePro")
			{
				producto.nombre = datoMeta.V;
			}
			else if (datoMeta.N=="Title"){
				producto.titulo = datoMeta.V;
			}
			else if (datoMeta.N=="description"){
			  producto.descripcion = datoMeta.V;
			}
			else if (datoMeta.N=="meta_pdf")
			{
				datos = datoMeta.V.split("##")
				nombre = datos[0];
				urlPdf = datos[1];
				sPeso = datos[2];
				
				if (sPeso >= 0)
				{
					sPeso = Math.floor(sPeso);
				}
				else
				{
					sPeso = Math.ceil(sPeso);
				}
				
				sPdf+= "<li class=\"enlace-archivo-pdf\">";
				sPdf+= "<div class=\"enlace\">";
				sPdf+= "<p>("+sPeso+" Kb) ---&nbsp;</p>";
				sPdf+= "<a class=\"stagMedio\" target=\"_blank\" href=\""+urlPdf+"\" >"+_.t(nombre)+"</a>";
				sPdf+= "</div></li>";
				if (iPdfs%2==0)
					producto.pdfs_alpha+=sPdf;
				else
					producto.pdfs_omega+=sPdf;
				iPdfs++;
			}
		}
	return producto;
 }
	
	
 function pintarProductoWally(dato)
 {
	
	sResult="<li data-gsa-result=\"\" nav-list-item=\"\" tabindex=\"-1\">";
	sResult+="<div class=\"results\">"
	url = dato.U;
	if (dato.S.length>0)
		descripcion = dato.S;
	else
		descripcion = "lorem ipsum";
	producto = recuperarMetasProductosWally(dato.MT);
	if (producto.nombre=="")
		sResult+="<p><a target=\"_blank\" href=\""+url+"\">"+dato.T+"</a></p>";
	else
		sResult+="<p><a target=\"_blank\" href=\""+url+"\">"+_.t(producto.nombre)+"</a></p>";
	sResult+="</div>"
	sResult+="<div class=\"descripcion hidden\"> "
	sResult+=_.t(producto.descripcion);
	sResult+="</div>";
	sResult+="</li>"
	return sResult;
 }

 function pintarProductosWally(datos)
 {
	var resultados = datos.GSP.RES;
	var pag = "";
	
	var respuestaBuscador="";
	 respuestaBuscador +=" <section data-category=\"GSA\"  class=\"category\">";
	 respuestaBuscador +="<header class=\"headerNet\">";
         respuestaBuscador +="  <h1 class=\"title\">"+_.t("Productos y Servicios")+"</h1>";
         respuestaBuscador +="<p data-show-more=\"\" data-resultados-category=\"\"></p>";
         respuestaBuscador +=" </header>";
         respuestaBuscador +="<ul id=\"GSANet\"></ul>";
         respuestaBuscador +="</section>";
	 $("#resultsGSA").html(respuestaBuscador);

	if (resultados!=null && resultados.M > 0)
	{
	    nResultados = resultados.M;
		var view_begin = resultados.SN;
		var view_end = resultados.EN;
		var sResult = "";

		if (resultados.R.T!=undefined && resultados.R.T!=null && resultados.R.T!="")
		{	
			
			sResult = pintarProductoWally(resultados.R)
		}
		for (j=0;j<resultados.R.length;j++)
		{
			
			if (resultados.R[j].MT != null){
				sResult+= pintarProductoWally(resultados.R[j])
			}
		}

		$("#GSANet").find("li").remove();
		$("#GSANet").prepend(sResult);
		totalResults=resultados.M;
		if (totalResults > 1){
			strResult=sResultados;
		}else{
			strResult=sResultado;
		}
		$('#resultsGSA').find('[data-resultados-category]').html(totalResults+strResult);	
		generarEnlacesWally($("#GSANet"));
		allEmpty.results =  false;
		return totalResults+strResult;
	}
	else
	{
		$('#resultsGSA').html('');
		allEmpty.results =  true;
		
	}
			
 }

 function generarEnlacesWally (capa)
 {
	$form = $("<form id=\"formEnlace\" method=\"POST\" action=\"\"></form>");
	$("body").append($form);
	$(capa).find(".results >  p > a").click(function(e){
		e.preventDefault();
		var sUrl = $(this).attr("href");
		if(sUrl.indexOf("?") != -1){
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
	 	}
		$("#formEnlace").attr("action",sUrl);
		$("#formEnlace").attr("method","GET");
		$("#formEnlace").submit();
	})
 }
 
 //FUNCIONES VIDEOS
 
 
 function getResultsVideos(sCadena)
 {
	sCadena = rempCaractEspeciales(sCadena);
	
	var sURL = "https://api.brightcove.com/services/library?command=search_videos&any=tag:"+sCadena+"&token=Yz9l_rMdlCNBekBuxBj6AHTb3HXXIB4D_G4x3-hOrmtde3lyhs_2bw..";
  
    	$.ajax ( {
	      cache: false, // Antes de realizar la llamada mostramos el ajax load
	      type: "GET", // Variables GET
	      url: sURL, 	
	      dataType: "jsonp", 
	      contentType : "application/x-www-form-urlencoded; charset=iso-8859-1",               
	      // cuando es exitoso el llamado
				success: function(datos) 
				{
					if(datos.items.length > 0){ 
					    $('#resultsVideos').removeClass('hidden');  
				            pintarVideosWally(datos);
				            if (datos.items.length > 1){
								strResult=sResultados;
							}else{
								strResult=sResultado;
							}
				            $('#resultsVideos').find('[data-resultados-category]').html(datos.items.length+strResult);
				            bAsistente=true; 
				         }else{
				             $('#resultsVideos').empty();
				         }
				}	
			});
			
			
			
	
  
 }
 
 function pintarVideosWally (videos)
 {
		
		var strVideos="";
		strVideos +="<section data-category=\"Videos\" class=\"category\">";
		strVideos +="<header class=\"headerNet\">";
	        strVideos +="<h1 class=\"title\">"+_.t("Videos")+"</h1>";
	        strVideos +="<p data-show-more=\"\" data-resultados-category=\"\"></p>";
	        strVideos +="</header>";
	        strVideos +="<ul id=\"videosNet\"></ul>";
	        strVideos +="</section>";
		$("#resultsVideos").html(strVideos);

		var esChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

		strVideos = "";
		sImagen = videos.items[0].thumbnailURL;
		sDesc = videos.items[0].name;
		titulo = videos.items[0].name;			
	  	idVideo = videos.items[0].id;
	  
	  
	  	strVideos="<li id=\"video\" data-gsa-result=\"\" nav-list-item=\"\" tabindex=\"-1\">";
		strVideos+="</li>";
		
		$("#videosNet").html(strVideos);
		
		$("li#video").data("descripcion",sDesc);
		$("li#video").data("imagen",sImagen);	
		$("li#video").data("titulo",titulo);	
		$("li#video").data("id",idVideo);	
		$("li#video").data("url",videos.items[0].FLVURL);

				
		
		$("#videosNet li").click(function(e){
			e.preventDefault();	
			if(esChrome){
				reproducirChrome($(this));
			}else{	
				reproducirVideo ($(this));	
				
			}
		})
	
		$("#videosNet li:first").click();
 }
 
 
 function reproducirChrome(video)
	{
		var titulo = _.t(video.data("titulo")); 
		var descripcion = _.t(video.data("descripcion"));
		var imagenVideo = video.data("imagen");
		var idVideo = video.data("id");
		var sUrl = video.data("url");
		var resultVideo="<div class=\"results\">"
		resultVideo+="<p>"+_.t(titulo)+"</p>";
		resultVideo+="<video controls=\"controls\" id=\"videoBrightcove\" src=\""+sUrl+"\" width=\"100%\" height=\"100%\" autoplay ></video>";		
		$("li#video").html(resultVideo);	        
	}	
	
 function reproducirVideo (video)
 {
	var titulo = _.t(video.data("titulo")); 
	var descripcion = _.t(video.data("descripcion"));
	var imagenVideo = video.data("imagen");
  	var idVideo = video.data("id");
  	
  	var resultVideo="<div class=\"results\">"
	resultVideo+="<p>"+_.t(titulo)+"</p>";
	resultVideo += "<object id=\"myExperience\" class=\"BrightcoveExperience\">";
	resultVideo += "<param name=\"bgcolor\" value=\"#FFFFFF\" />";
	resultVideo += "<param name=\"width\" value=\"322px\" />";
	resultVideo += "<param name=\"height\" value=\"180px\" />";
	resultVideo += "<param name=\"playerID\" value=\"2156209944001\" />";
	resultVideo += "<param name=\"playerKey\" value=\"AQ~~,AAAB9FzAuHE~,CSZYwdIIDihmw5PeLQh3ZCyG00ogWuG8\"/>";
	resultVideo += "<param name=\"isVid\" value=\"true\" />";
	resultVideo += "<param name=\"isUI\" value=\"true\" />";
	resultVideo += "<param name=\"dynamicStreaming\" value=\"true\" />";
	resultVideo += "<param name=\"secureConnections\" value=\"true\" /> ";		
	resultVideo += "<param name=\"includeAPI\" value=\"true\" />";
	resultVideo += "<param name=\"templateLoadHandler\" value=\"myTemplateLoaded\"/>";
	resultVideo += "<param name=\"templateReadyHandler\" value=\"myTemplateReady\"/>";
	resultVideo += "<param name=\"@videoPlayer\" value=\""+idVideo+"\" />";
	resultVideo += "</object>";
	
	$("li#video").html(resultVideo);		
	brightcove.createExperiences();          
 }
	
  	
	
 function rempCaractEspeciales(cadena)
 {
	if(cadena.indexOf("ñ") != -1){
	   cadena = cadena.replace(/ñ/g,"\xf1");
	}else if(cadena.indexOf("á")){
	   cadena = cadena.replace(/á/g,"\xe1");           
	}else if(cadena.indexOf("é")){
	   cadena = cadena.replace(/é/g,"\xe9");
	}else if(cadena.indexOf("í")){
	   cadena = cadena.replace(/í/g,"\xed");
	}else if(cadena.indexOf("ó")){
	  cadena = cadena.replace(/ó/g,"\xf3");
	}else if(cadena.indexOf("ú")){
	  cadena = cadena.replace(/ú/g,"\xfa");
	}
	return cadena;
 }
  
  
 function myTemplateLoaded(experienceID) {	
	
  BCL.player = brightcove.getExperience(experienceID);
  // obtener una referencia al reproductor de vídeo
  BCL.videoPlayer = BCL.player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);   	
 }
 
 
 //FUNCIONES OFICINAS
 function getResultsOficinas(sCadena){
	var sUrl;
	bNueva = true;
	bInicio=true;
	bPrimeraVez=true;
	bHayOficinas=false;
	sCadenaOficinas = sCadena;
	bCodigoOficina = esNumericoLongitud(sCadena,4);
	dir = sCadena
	dir += ", spain";
	if (bCodigoOficina)
	{
		sUrl="https://"+dominioTLGO+"/TLGO/tlgo/oficinas?op=svOficinaAyudas&codigo="+sCadena+"&tipo=P&pais=ESP";
		
	}
	else
	{
		sUrl="https://"+dominioTLGO+"/TLGO/tlgo/oficinas?op=svDireccionesAyudas&query="+dir;
	}	
	
	$.ajax ( 
	{
	    url: sUrl,
	    //url: "https://w3.grupobbva.com/TLGO/tlgo/oficinas?op=svOficinaAyudas&codigo="+sCadena+"&tipo=P&pais=ESP",

	    async: false,
	    cache: false,
	    dataType: "jsonp",
	    success: function(html)
	    {
	    	jsonOficinas = html;

	    	if (jsonOficinas != undefined && jsonOficinas != null)
	    	{
	    		if (bCodigoOficina){
	    			if ( hayOficinaCodigoWally(jsonOficinas)){
	    				bHayOficinas=true;
	    			}

	    		}else{
	    			if ( hayOficinasWally(jsonOficinas)){
	    				bHayOficinas=true;
	    			}
	    		}
				if (bHayOficinas)
				{
				    var respuestaBuscador="";
					respuestaBuscador +="<section data-category=\"Oficinas\"  class=\"category\">";
					respuestaBuscador +="<header class=\"headerNet\">";
			        respuestaBuscador +=" <h1 class=\"title\">"+ _.t("Encuentranos")+"</h1>";
			        respuestaBuscador +="<p data-show-more=\"\" data-resultados-category=\"\"></p>";
			        respuestaBuscador +=" </header>";
			        respuestaBuscador +="<ul id=\"oficinasNet\" class=\"oficinas\"></ul>";
			        respuestaBuscador +="</section>";
			        $("#resultsOficinas").html(respuestaBuscador);
			        $("#resultsOficinas").removeClass('hidden'); 
			        setTimeout(function(){initMapaWally()},timeToResults)
			        showMoreButtonEnable=true;
			        allEmpty.oficinas = false;
		        }else{
		        	$("#resultsOficinas").addClass('hidden');
				 	$("#resultsOficinas").html('');
					 mapaCargadoWally=false;
					 allEmpty.oficinas = true;
		        }	
			        
			}else{
				 $("#resultsOficinas").addClass('hidden');
				 $("#resultsOficinas").html('');
				 mapaCargadoWally=false;
				 allEmpty.oficinas = true;
			 
			}
		}
	        				        
	});

 	
 }
 
 function mapsLoadedWally()
 {
	   	   var objCoordenadas;
	   	   if ($("div#capaMapaOficinasWally").length==0)
	   	   {
	   	   	$("#oficinasNet").after("<div class=\"grid_08 alpha\" id=\"capaMapaOficinasWally\" ></div>");
	   	   	/*if (ocultar){
	   	   		$("#capaMapaOficinasWally").hide();
	   	   	}*/
	   	   }

		   iconDefecto = urlIconDefecto;    

	    		var myOptions = {		
			    	zoom: zoomInicialWally,			    	
			    	center:  new google.maps.LatLng(centroMapaWally[0],centroMapaWally[1]),
			    	panControl: false,
			    	zoomControl: false,
			  	mapTypeControl: false,
			  	scaleControl: false,
			  	streetViewControl: false,
			  	scrollwheel: false,
			  	draggable:false,
			  	overviewMapControl: false,
			  	disableDoubleClickZoom:true					      		
			}
		
			//creo el mapa
	 		mapWally = new google.maps.Map(document.getElementById("capaMapaOficinasWally"),  myOptions);
		
			mapWally.setOptions({
			    	navigationControl: true,
			    	navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL}
			});
			
		pintarProvinciasWally(mapWally);
	 
	 	if (bInicio){
			if (bCodigoOficina){
						pintarOficinaCodigoWally(jsonOficinas);
			}else{
						pintarOficinasWally(jsonOficinas);
			}
		}			
							
		
								             
		google.maps.event.addListener(mapWally,'idle', function(){
		
	        bZoom = true;
	         	
					var zoomCh = mapWally.getZoom();

		    if (zoomInicialWally != zoomCh){
		    	
					
							if (!bClick || bCentrar)
						{
							if (zoomCh >= zoomInicialWally && zoomCh < zoomLocalidadesWally )
							{
								pintarProvinciasWally(mapWally);
							}
							else if (zoomCh >= zoomLocalidadesWally && zoomCh < zoomDetalladoWally)
							{
								pintarLocalidadesWally(mapWally);
							}
							else if (zoomCh >= zoomDetalladoWally)
							{
								
								pintarDetalladoWally(mapWally);
							}
							else
							{
								pintarPaisWally(mapWally);
							}
						}
				}
					zoomAnterior=zoomCh;
					bClick = false;
					bCentrar = false; 
					
		});

	
  }


 
 function hayOficinaCodigoWally(jsonOficinas)
	{
		hay = false;
		
		if (jsonOficinas!=undefined && jsonOficinas!=null && jsonOficinas!="")
		{
			var oficina = jsonOficinas.codigo;
			
			if (oficina!=undefined && oficina!=null && oficina!="")
			{
				hay = true;
			}
		}
		return hay;
	}
	
 function hayOficinasWally(jsonOficinas)
 {
	hay = false;
	
	if (jsonOficinas!=undefined && jsonOficinas!=null && jsonOficinas!="")
	{
		var puntos = jsonOficinas.GeocodeResponse.result;
		
		if (puntos!=undefined && puntos!=null && puntos!="")
		{
			hay = true;
		}
	}
	return hay;
 }


 function pintarOficinasWally(jsonOficinas)
 {
	
	if (bNueva)
	{
		bNueva = false;

		if (hayOficinasWally(jsonOficinas))
		{
			var puntos = jsonOficinas.GeocodeResponse.result;
			if (puntos!=undefined && puntos!=null && puntos!="")
			{
				//sólo hay un punto
				$("#resultsOficinas").find('[data-resultados-category]').html("1"+ sResultado);
				if (puntos.length==undefined)
				{
					var coordinates = puntos.geometry.location;
					irAWally(coordinates.lat,coordinates.lng);								
				}			
				else
				{	
					if (bPrimeraVez){
						$("#capaMapaOficinasWally").hide();	
						pintarDireccionesWally(jsonOficinas.GeocodeResponse.result);
					}
					
				}
				
			}
		}else{

			$("#resultsOficinas").html('');
			mapaCargadoWally=false;
			allEmpty.oficinas = true;
		}
	} 
 }


 function pintarOficinaCodigoWally(jsonOficinas,mapWally)
 {
	if (bNueva)
	{
		bNueva = false;
		if (hayOficinaCodigoWally(jsonOficinas))
		{			
	   		var punto = jsonOficinas.coord;
			if (punto!=undefined && punto!=null && punto!="")
			{	
				irAWally(punto.coorX, punto.coorY);
				numOfi = true;
			}
		}else{

			$("#resultsOficinas").html('');
			mapaCargadoWally=false;
			allEmpty.oficinas = true;
		}
	}
 }
 
 function initMapaWally() {
	  	if (!bCargada){
			google.load("maps", "3", {other_params:'client=gme-bbva&sensor=false&ssl=true',callback : mapsLoadedWally});
			bCargada=true;
			bNueva=true;
		}
		else if ($("div#capaMapaOficinasWally").length==0)
		{
			mapsLoadedWally();
			bNueva=true;
		}
 } 
 
 function pintarDireccionesWally(puntos)
 {
 	//$("#capaMapaOficinasWally").hide();
		intDivDetalle = 0;

    	var i=0;
	cont = 0;
	var rPunto;
	if( $("#quisoDecir").length == 0)
	{
    	$("#oficinasNet").append("<div id='quisoDecir' class='quisoDecir' style=''><span>"+_.t("Quiz&aacutes quiso decir")+":</span></div>");
	}
	if (puntos.length > 1){
		strResult=sResultados;
	}else{
		strResult=sResultado;
	}
    $("#resultsOficinas").find('[data-resultados-category]').html(puntos.length+strResult);
    	for (i=0; i <= puntos.length -1; i++)
	{
		var punto = puntos[i];
		var address = punto.formatted_address;
		var coordinates = punto.geometry.location;
		var id;	
		var elemDir;		
		rPunto = "";
		rPunto += "<li id=\"direc"+i+"\"";
		if (i==0)
		{
			rPunto += 'class="ab-enc-first"'
		}
		rPunto +="><div class='results'>";
		rPunto +='<a href="#">'+address+'</a></div></li>';
		intDivDetalle++;
		rObject= $(rPunto);
		rObject.find("a").data("pos", coordinates);

         if ($("#direc"+i+" .results").length ==0){
		   $("ul#oficinasNet").append(rObject);
		}

		if (i == 2)
		{			
			puntos.length=0;
		}
				
	}
	
	$("ul#oficinasNet").find("a").click(function(e){
	//$("#oficinas").find("li").each(function(){ $(this).click(function(e){
			e.preventDefault();
			bInicio=false;
			bPrimeraVez=false;
			var puntoLat=$(this).data("pos").lat;
			var puntoLng=$(this).data("pos").lng;
				
			if (!$("#capaMapaOficinasWally").is(':visible')){
				$("#capaMapaOficinasWally").show();
			}
			mapsLoadedWally();


			$("#capaMapaOficinasWally").width("336px");
			$("#capaMapaOficinasWally").height("200px");
             
			irAWally(puntoLat,puntoLng);
			
			return false;
			
	//})});
	});

 }
	
function pintarPaisWally(mapWally)
{
		//$("#capaDetalleMapa").empty();
		borrarMarkersWally();
		nombre = _.t(pais[0]);
		lat0 = pais[1];
		lon0 = pais[2];
		punto = new google.maps.LatLng(lat0,lon0);
		marker = crearPuntoMarkerWally(punto, iconDefecto, nombre, nombre, "")
		marker.setMap(mapWally);		        					     
		newMarkersWally[0]=marker; 
		 
 }
	
 function pintarProvinciasWally(mapWally)
 {
		//$("#oficinas").find("span.numResult").html("");
		//$("#capaDetalleMapa").empty();
		borrarMarkersWally();
		for (i=0;i<provincias.length;i++)
		{
			nombre = unescape(provincias [i][0]);
			lat0 = provincias[i][1];
			lon0 = provincias[i][2];
			punto = new google.maps.LatLng(lat0,lon0);
			marker = crearPuntoMarkerWally(punto, iconDefecto, nombre, nombre, "")
			marker.setMap(mapWally);		        					     
			newMarkersWally[i]=marker;   
		}
 }
	

	
 function pintarDetalleOficinasWally(pos,icon,codigo,codOficina,direccion,cp,localidad,tlf,numCajeros)
 {
	var i=0;
    var result = '';
    var cont=0;
    
    
    if  ($("#direc"+pos+" .results").length ==0)
    {
        if (cont < numeroResultadosPaginaDireccionesWally){

		    result += "<li id=\"direc"+pos+"\"";
			
			if (pos==0)
			{
				result += ' class="ab-enc-first"'
			}
			result +='>';
			
			//result +='<a href="javascript:void(0);" onclick=\'centrar("'+pos+'");\' title="Descripci&oacute;n de la direcci&oacute;n encontrada">';
			//result +='<a href="javascript:void(0);" onclick="centrar('+pos+');" title="'+_.t("Descripción de la dirección encontrada")+'">';
			result +='<div class="results">';
			result +='<a href="#" title="'+_.t("Descripción de la dirección encontrada")+'">';
			
			
			if (tlf==""){
				result += _.t('Cajero ');
			}else if (numCajeros!=0)
			{
				result += _.t('Oficina ')+codOficina;
			}else{
				result += _.t('Oficina ')+codOficina+ _.t(' (sin cajero)');
			}
			result +="</br> "+direccion +"," +cp+ "," +localidad+"</br>";

			if (tlf!=""){
		 		result += _.t('Teléfono: ')+tlf;
		 	}else{
		 		result += _.t('Oficina asociada: ')+codOficina;
		 	}	
			result += "</a></div></li>";

			rObject= $(result);
			rObject.find("a").data("pos", pos);
			$("ul#oficinasNet").append(rObject);
			cont++;
			
			$("ul#oficinasNet").find("a").click(function(e){
				e.preventDefault();
				centrarWally($(this).data("pos"));
			});

		}
	
	}
		
		
		
 }
	
	
	
 function centrarWally (pos)
 {
	bCentrar = true;
	google.maps.event.trigger(newMarkersWally[pos],"click");
 }
	
	//function irA(coordinates)
	//lat(y),lng(x)
 function irAWally(lat0, lon0)
 {
   		birA = true;
   		borrarMarkersDirecciones(null);
		var punto = new google.maps.LatLng(lat0,lon0);
		var marker = crearPuntoMarkerWally(punto, "", "", "", "");
		marker.setMap(mapWally);
		dirMarkersWally.push(marker);
		if( $("#quisoDecir").length > 0){
			$("#quisoDecir").remove();
			$("#oficinasNet").html('');
		}
		buscaOfiCajCercanoWally(lat0,lon0);
  }
    
  function crearPuntoMarkerWally(punto, iconBBVA, nombre, tipo, info) 
		{
		var marker= new google.maps.Marker({map: mapWally,position: punto,icon: iconBBVA});
		
   		google.maps.event.addListener(marker, "click", function() {
	   		var zoom = mapWally.getZoom();
	   		bClick = true;
	   		if (bCentrar)
			{
				mapWally.setCenter(punto);
				mapWally.setZoom(zoomCentradoWally);
				bCentrar = false;
			}
			else
			{
	   			if (zoom < zoomLocalidadesWally)
	     		{
	     			mapWally.setCenter(punto);	
	     			mapWally.setZoom(zoomLocalidadesWally);    		
	     			pintarLocalidadesWally(mapWally);
	     		}		
				// Pintamos solo las localidades
				else if (zoom < zoomDetalladoWally)
				{
	     			mapWally.setCenter(punto);
	     			mapWally.setZoom(zoomDetalladoWally);    
					pintarDetalladoWally(mapWally);
				}
				else if (zoom < zoomCentradoWally)
				{
					bCentrar = true;
	     			mapWally.setCenter(punto);
	     			mapWally.setZoom(zoomCentradoWally); 

					bCentrar = false;
				}
			}
   		});
		return marker;
 }
	
 function pintarLocalidadesWally(mapWally)
 {
		
		var extremosMapa = mapWally.getBounds(); 
	 	var extremoSO = extremosMapa.getSouthWest();
	 	var extremoNE = extremosMapa.getNorthEast();
	 	lat1 = extremoNE.lat();
	 	lat2 = extremoSO.lat();
	 	lon1 = extremoNE.lng();
	 	lon2 = extremoSO.lng();
		$.ajax(
		{
			url:"https://"+dominioTLGO+"/TLGO/tlgo/oficinas",
			//url:"https://w3.grupobbva.com/TLGO/tlgo/oficinas",

			cache: false,
		    dataType: "jsonp",
		    type: "GET",
			data: ({"op":"svLocalidadesZonaAyudas","pais":"ESP","lat1":lat1,"lat2":lat2,"lon1":lon1,"lon2":lon2}),
			success: function(data) 
			{
				if (data!=null && data!=undefined && data!="" && data.length>0)
				{
					borrarMarkersWally();
					$.each(data, function(i,item)
					{
					        var lat0 = item.coord.X;
					        var lon0 = item.coord.Y;
						var nombre = item.localidad;
						punto = new google.maps.LatLng(lat0,lon0);
							
							
						marker = crearPuntoMarkerWally(punto, iconDefecto, nombre, nombre, "");
						marker.setMap(mapWally);	
						newMarkersWally[i]=marker;
			   		});
			   	}				
			}
		});
		
					
 }
 
 function borrarMarkersDirecciones(mapWally) {
  	for (var i = 0; i < dirMarkersWally.length; i++) {
    		dirMarkersWally[i].setMap(mapWally);
  }
 }

	
 function borrarMarkersWally()
 {
		for(var i=0; i<newMarkersWally.length; i++)
		{
			if (!igualesWally(markerActualWally,newMarkersWally[i]))
				newMarkersWally[i].setMap(null);
		}
		newMarkersWally = new Array();
	}
	
	function igualesWally(marker, marker2)
	{
		var enc = false;
		
		if (marker!="" && marker2!="")
		{
			var latlng = marker.getLatLng();
			var lat = latlng.lat();
			var lon = latlng.lng();
			
			var latlng2 = marker2.getLatLng();
			var lat2 = latlng2.lat();
			var lon2 = latlng2.lng();
			
			if (lat==lat2 && lon==lon2)
				enc = true;
		}
			
		return enc;
	}
	
	function pintarDetalladoWally(mapWally)
	{
		//$("#capaDetalleMapa").empty();
		intDivDetalle = 0;
		var extremosMapa = mapWally.getBounds(); 
	 	var extremoSO = extremosMapa.getSouthWest();
	 	var extremoNE = extremosMapa.getNorthEast();
		var lat1 = extremoNE.lat();
	 	var lat2 = extremoSO.lat();
	 	var lon1 = extremoNE.lng();
	 	var lon2 = extremoSO.lng();
	 	var centro = mapWally.getCenter();
	 	var lat = centro.lat();
	 	var lon = centro.lng();
 		cont = 0;
	 
		$.ajax( 
		{
		
			url:"https://"+dominioTLGO+"/TLGO/tlgo/oficinas",
			//url:"https://w3.grupobbva.com/TLGO/tlgo/oficinas",
			

			cache: false,
		    dataType: "jsonp",
		    type: "GET",
			data: ({"op":"svOfiCajZonaAyudas","pais":"ESP","idioma":"ESP","lat":lat,"lon":lon,"lat1":lat1,"lat2":lat2,"lon1":lon1,"lon2":lon2}),			
			success: function(data) 
			{
				if (data!=null && data!=undefined && data!="" && data.length>0)
				{
					borrarMarkersWally();
					$("ul#oficinasNet").append("<div id='cajCercanos' class='quisoDecir' style=''><span>"+_.t("Cajeros Cercanos")+":</span></div>");
					//$("#oficinas").find("span.numResult").html(data.length);
					$.each(data, function(i,item)
					{
						codigo = item.codigo;
						localidad = item.localidad;;
						codOficina = item.oficina;
						direccion = item.des_direc;
						cp = item.cod_postal;
						tlf = item.telefono;
						nombreOficina = item.nom_ofi;
						lat0 = item.coorX;
						lon0 = item.coorY;
						numCajeros = item.numCajeros;
						
		
						if (codigo != codOficina)
						{
							icon = 'https://www.bbva.es/estaticos/mult/bocadillo-cajero.png';
							tipo = _.t("Cajero");
						}
						else if (parseInt(numCajeros)>0)
						{
							icon = 'https://www.bbva.es/estaticos/mult/bocadillo-sin-saturacion.png'; 
							tipo = _.t("Oficina con cajero");
						}
						else
						{
							icon = 'https://www.bbva.es/estaticos/mult/bocadillo-sin-saturacion.png'; 	
							tipo = _.t("Oficina sin cajero");
						}
						//icon.iconAnchor = new google.maps.Point(6, 20);
						//icon.infoWindowAnchor = new Point(9, 2);
						//icon.infoShadowAnchor = new Point(18, 25);			   			
						
						punto = new google.maps.LatLng(lat0,lon0);
						marker = crearPuntoMarkerWally(punto, icon, codigo, tipo, "detalle");
						marker.setMap(mapWally);
						
						if (cont < numeroResultadosPaginaDireccionesWally){
							pintarDetalleOficinasWally(i,icon,codigo,codOficina,direccion,cp,localidad,tlf,numCajeros);
						}
						newMarkersWally[i]=marker;
						cont++; 
						
					});
					if (cont > 1){
						strResult=sResultados;
					}else{
						strResult=sResultado;
					}
					$('#resultsOficinas').find('[data-resultados-category]').html(cont+strResult);
					

					$("div#capaDetalleMapa").show();
				}		
			}	
		});
		
 }
	
 function buscaOfiCajCercanoWally(coorX,coorY)
 {
	
		$.ajax( 
		{
			url:"https://"+dominioTLGO+"/TLGO/tlgo/oficinas?op=svOfiCajCercanoAyudas&coorX="+coorX+"&coorY="+coorY+"&cod_pais=ESP&dir="+dir,
			//url:"https://w3.grupobbva.com/TLGO/tlgo/oficinas?op=svOfiCajCercanoAyudas&coorX="+coorX+"&coorY="+coorY+"&cod_pais=ESP&dir="+dir,

			cache: false,
		    dataType: "jsonp",
		    type: "GET",
			success: function(data) 
			{
				if (data!=null && data!="")
					ajustarMapaWally(data.coord.longitud,data.coord.latitud,coorX,coorY);
			}
		});
 }
 
 function esNumericoLongitud(dato, longitud)
 {
	return !isNaN(dato) && dato.length <= longitud
 }
 
 function verOcultarMapsWally(objecto,indice)
{
	

		if($(objecto).hasClass("mapa-activo")){
			$(objecto)
				.removeClass("mapa-activo")
				.next().hide("slow");
		}
		else{
			$(objecto)
				.addClass("mapa-activo")
					.next().show("slow")
				.parent()
					.siblings()
						.children("#capaMapaOficinasWally").hide("slow")
							.end()
						.children(".question").removeClass("mapa-activo");
			
		}
}
	
 function ajustarMapaWally(coorX,coorY,coorX2,coorY2)
 {
		var norte = "";
		var sur = "";
		var este = "";
		var oeste = "";
		var zoom = zoomBuscarWally;
		
		coorX = new String(coorX);
		coorY = new String(coorY);
		coorX2 = new String(coorX2);
		coorY2 = new String(coorY2);

		if ((coorX < 0) && (coorX2 < 0))
		{
			if (coorX < coorX2)
			{
				norte = coorX2;
				sur = coorX;	
			}
			else
			{
				norte = coorX;
				sur = coorX2;
			}	
		}
		else
		{
			if (coorX < coorX2)
			{
				norte = coorX;
				sur = coorX2;
			}
			else
			{
				norte = coorX2;
				sur = coorX;
			}
		}
		
		if ((coorY < 0) && (coorY2 < 0))
		{
			if (coorY < coorY2)
			{
				este = coorY;
				oeste = coorY2;
			}
			else
			{
				este = coorY2;
				oeste = coorY;
			}
		}
		else
		{
			if (coorY < coorY2)
			{
				este = coorY2;
				oeste = coorY;
			}
			else
			{
				este = coorY;
				oeste = coorY2;
			}
		}
		
		var ne = new google.maps.LatLng(norte,este);
		var sw = new google.maps.LatLng(sur,oeste);
		var rect = new google.maps.LatLngBounds(sw,ne);

		if (sw.lat() != ne.lat())
		{
			var GLOBE_WIDTH = 250; // a constant in Google's map projection0
			var west = sw.lng();
			var east = ne.lng();
			var angle = east - west;
			if (angle < 0) {
				angle += 360;
			}
		
			var latZoomLevel = Math.floor(Math.log($("#capaMapaOficinasWally").height() * 360 / (sw.lat() - ne.lat()) / GLOBE_WIDTH) / Math.LN2) - 1;
			var lngZoomLevel = Math.floor(Math.log($("#capaMapaOficinasWally").width() * 360 / angle / GLOBE_WIDTH) / Math.LN2);

			zoom = (latZoomLevel < lngZoomLevel) ? latZoomLevel : lngZoomLevel;

		}
		else
			if (numOfi)
			{
				zoom = 14;
				numOfi = false;
			}
			else
				zoom = 12;
		

		mapWally.setCenter(rect.getCenter());
		mapWally.setZoom(zoom);
 }

 /*Función que excluye todos los segmentos excepto el actual en la consulta a la GSA, 
para que las páginas que no pertenecen a ningún segmento aparezcan entre los resultados de la búsqueda
"-" == NOT
"." == AND
*/
 function getPartialFields(segmento) {
 	var strPartialFields = "";

 	if(segmento.indexOf("par") === -1) {
		strPartialFields = strPartialFields += "-segmento:par";
 	}
 	if (segmento.indexOf("bpe") === -1) {
 		if(segmento.indexOf("par") === -1) {
			strPartialFields = strPartialFields += ".";
		}
		strPartialFields = strPartialFields += "-segmento:bpe";
 	}
 	if (segmento.indexOf("bpr") === -1) {
		strPartialFields = strPartialFields += ".-segmento:bpr";
 	}
 	if (segmento.indexOf("aut") === -1) {
		strPartialFields = strPartialFields += ".-segmento:aut";
 	}
 	if (segmento.indexOf("emp") === -1) {
		strPartialFields = strPartialFields += ".-segmento:emp";
 	}
 	if (segmento.indexOf("ins") === -1) {
		strPartialFields = strPartialFields += ".-segmento:ins";
 	}

 	return strPartialFields;
 }

});

function showSelectedResults() {
	$("p[data-show-more]").click(function(e){
		//var valor = $(this.closest("[data-category]")).attr("data-category");
		//$("#verResultados").append('<input type="hidden" name="filtro" value="' + valor + '">');
		$("#verResultados").submit();
	})
}
		