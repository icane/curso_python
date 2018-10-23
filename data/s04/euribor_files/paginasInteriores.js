   	$(document).ready(function() {
        /* Iframe Ayuda*/	
		$("#bocadillo-asesoramiento a").click(function(e){
		     	$("#idAsesoramiento").attr("src", $("#idAsesoramiento").attr("url"));
					$("#bocadillo-asesoramiento").hide();				
					$(".asesoramiento").slideDown(400);
					e.preventDefault();
				});
				
		$('span[class="c-botones-generico mayor"]').click(function(e){
		     	$("#idAsesoramiento").attr("src", $("#idAsesoramiento").attr("url"));
					$("#bocadillo-asesoramiento").hide();				
					$(".grid_16").css({'margin-top':'20px'});
					$(".asesoramiento").slideDown(400);
					$("#idAsesoramiento").show();
				  $("#idAsesoramiento").attr("src", "/BBVANet/public/#asesoramiento");
				  $("#idAsesoramiento").attr("url", "/BBVANet/public/#asesoramiento");
					e.preventDefault();
				});
								
				
								
        $(".asesoramiento div.close img").click(function(e){		
			    $(".grid_16").css({'margin-top':'150px'});
			    $("#bocadillo-asesoramiento").show();
			    $(".asesoramiento").slideUp(400);		       
			  });
		
			$(".close").hide();
			
		var x = $(".rastro-migas").html();
		if(x==null || $.trim(x)=="")
		{
		  $('.rastro-migas').addClass('breadcrumb1');
		}
	});

