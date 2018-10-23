$(document).ready(function(){
	$(".validacion").hide();
	$(".button").click(function(){
		if($(this).parent().attr("action").indexOf("bbvavivienda")!=-1){
			
			var sIdioma = $.cookie("idiomaAuto");
			
			if(null!=sIdioma && ""!=sIdioma){
				if(sIdioma=='eng')
					$(this).siblings("input[name='lang']").val('EN');
			}			
			
			if(!$(this).siblings("input[type='text']").hasClass("error")){
			   $(this).parent("form").submit();
		  }
		}else{
			if(!$(this).siblings("input[type='text']").hasClass("error")){
			   $(this).parent("form").submit();
		  }
		}
	});
	
	$(".modulo_2-2").click(function(){
		$(this).find("input[type='text']").focus();
	});	
	
	$(".modulo_2-2").hover(
		function(){
			$("div.puntos-barra-h").removeClass("activo");
			$(this).children("div.puntos-barra-h").addClass("activo");
		});
		
		$('select').selectmenu({
           style:'dropdown', 
           width:'14.5em',
           select: function(){}
   });
   
   $("#ingresoDeseado").keyup(function(){
   	   if(!isNaN($("#ingresoDeseado").val())){
   	   	   $("#ingresoDeseado").removeClass("error");
   	       format($("#ingresoDeseado"));
   	       if($("div#errorValidacionIngresoDeseado").is(":visible")){
   	       	   $("div#errorValidacionIngresoDeseado").hide();
   	       }
   	   }else{
   	   	   $("#ingresoDeseado").addClass("error");
   	   	   if(!$("div#errorValidacionIngresoDeseado").length){
   	   	      $("<div id='errorValidacionIngresoDeseado' generated='true' class='errorValidacion v06 error validacion'><div class='validacionInterior'><div class='textoGestionable'><p class='message'><abbr class='type'>Por favor, introduce un valor num&eacute;rico.</abbr></p></div></div><span class='puntero'></span></div>").insertBefore("#ingresoDeseado");
   	   	   }
   	   }
   });   
   
    $("#ingresoDeseado").mouseenter(function(){
    	  if($("#ingresoDeseado").hasClass("error")){
    	  	   $("div#errorValidacionIngresoDeseado").show();
    	  }
    });
    
    $("#ingresoDeseado").mouseleave(function(){    	 
    	  	   $("div#errorValidacionIngresoDeseado").hide();    
    });
   
   $("#hsv").keyup(function(){
   	   if(!isNaN($("#hsv").val())){
   	   	   $("#hsv").removeClass("error");
   	       format($("#hsv"));
   	        if($("div#errorValidacionhsv").is(":visible")){
   	       	   $("div#errorValidacionhsv").hide();
   	       }
   	   }else{
   	   	   $("#hsv").addClass("error");
   	   	    if(!$("div#errorValidacionhsv").length){
   	   	      $("<div id='errorValidacionhsv' generated='true' class='errorValidacion v06 error validacion'><div class='validacionInterior'><div class='textoGestionable'><p class='message'><abbr class='type'>Por favor, introduce un valor num&eacute;rico.</abbr></p></div></div><span class='puntero'></span></div>").insertBefore("#hsv");
   	   	   }
   	   }
   });
   
    $("#hsv").mouseenter(function(){
    	  if($("#hsv").hasClass("error")){
    	  	   $("div#errorValidacionhsv").show();
    	  }
    });
    
    $("#hsv").mouseleave(function(){    	  
    	  	   $("div#errorValidacionhsv").hide();    
    });
   
   
  function format(input)
  {
    var num = $(input).val().replace(/\./g,"");
    if(!isNaN(num)){
        num = num.toString().split("").reverse().join("").replace(/(?=\d*\.?)(\d{3})/g,"$1.");
        num = num.split("").reverse().join("").replace(/^[\.]/,"");
        $(input).val(num);
    }
  }
  
  $(".form-bocadillo form").each(function(){
   	var iContenedor = $(this).outerWidth();
   	var iInput = $(this).find("input[type='text']").outerWidth();
   	
   	if(iInput==null)   		
   		iInput = $("a#c_provin_filt-button").outerWidth();
   	
   	$(this).find("div.button").width((iContenedor-15)-(iInput+6));
   	
  });
  
  $(".modulo_2-2").each(function(){
  	var hModuloBalnco = $(this).find(".banner-blanco").outerHeight();
  	var hModuloForm = $(this).find(".form-bocadillo").outerHeight();
  	
  	if(hModuloBalnco>hModuloForm){
  		$(this).find(".form-bocadillo > span").height(hModuloBalnco);
  	}
  	else if(hModuloForm>hModuloBalnco){
  		$(this).find(".banner-blanco > span").height(hModuloForm);
  	}
  	
  });
});
