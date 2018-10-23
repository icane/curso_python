var bCaptcha = !1
  , bCheck = !1;
  
var codoficina = "0";
var tipoDoc = "1";
var timeoutAjax = 60000;
var sFormId = "";
// function getPayload() {
    // var e = '{"ref":"XXW","esCliente":"","fuente":"1","idiomaFormulario":"ES","procesoNuevo":"si","canal":"' + (-1 != navigator.userAgent.toUpperCase().indexOf("ANDROID") ? "Net-Android" : -1 != navigator.userAgent.toUpperCase().indexOf("IPHONE") ? "Net-Iphone" : -1 != navigator.userAgent.toUpperCase().indexOf("IPAD") ? "Net-Ipad" : -1 != navigator.userAgent.toUpperCase().indexOf("MAC OS X") ? "Net-Mac" : -1 != navigator.userAgent.toUpperCase().indexOf("LINUX") ? "Net-Linux" : -1 != navigator.userAgent.toUpperCase().indexOf("WINDOWS") ? "Net-Windows" : "Net-Otros") + '","codOficina":"'+codoficina+'","otrasObservaciones":"","idexterno":"0","enviarAltaNuevoPersonas":"S","idPromocion":"","datosPersonales":{"codPerson":"","nombre":"' + $("#nombre").val() + '","apellido1":"' + $("#primerApellido").val() + '","apellido2":".","tipoDoc":"' + $(document).data("tipoDoc") + '","email":"no-informado@no-informado.com","numDoc":"' + $("#numDoc").val() + '","movil":"' + $("#telefono").val()+ '","cpostal":"'+$("#cppostal").val() + '","condiciones":"true","tipoPersona":"F"}}'
      // , a = jQuery.parseJSON(e);
    // return JSON.stringify(a)
// }

//Al interactuar con cualquier elemento del formulario comprobar si se habilita el envio de datos
function checkForm () {
	var enableButton = true;
	if ($("input.error").length > 0) {
		enableButton = false;
	} else {
		$("input.entrada").each(function () {
			$(this).val() == "" ? enableButton = false : enableButton;
		});
	}
	return enableButton && bCaptcha && bCheck;
}

function isValidDocumento(e) {
    var a = "";
    return "" != e && (a = isNaN(e.substring(0, 1)) ? "6" : "1",
    tipoDoc = a),
    "1" == a ? isValidNumNIF(e) : "6" != a || isValidNumTARJETA(e)
}
function isValidNumNIF(e) {
    dni = e.substring(0, e.length - 1);
    var a = e.charAt(e.length - 1);
    return !!isNaN(a) && (cadena = "TRWAGMYFPDXBNJZSQVHLCKET",
    posicion = dni % 23,
    letra = cadena.substring(posicion, posicion + 1),
    letra == a.toUpperCase())
}
function isValidNumTARJETA(e) {
    cadena = "XJLKMYZR",
    primeraLet = e.charAt(0),
    dni = e.substring(1, e.length - 1);
    var a = e.charAt(e.length - 1);
    return -1 != cadena.indexOf(primeraLet.toUpperCase()) && (!!isNaN(a) && ("Y" == primeraLet && (dni = parseFloat(dni) + 1e7),
    "Z" == primeraLet && (dni = parseFloat(dni) + 2e7),
    cadena = "TRWAGMYFPDXBNJZSQVHLCKET",
    posicion = dni % 23,
    letra = cadena.substring(posicion, posicion + 1),
    letra == a.toUpperCase()))
}
function updateDatalayer() {
	if (window.location.pathname.indexOf("/prestamos/") > 0){
		var e = JSON.parse(sessionStorage.getItem("digitalData"));
		"undefined" != e && (e.application.step = "1 datos personales",
		e.application.state = "inicio",
		e.application.application.type = "formulario",
		e.application.application.name = "formulario crm prestamos corto",
		e.page.pageInfo.level1 = "formulario",
		e.page.pageInfo.level2 = "formulario:formulario crm prestamos corto",
		e.page.pageInfo.level3 = "1 datos personales",
		e.page.pageInfo.pageName = e.page.pageInfo.area + ":" + e.page.pageInfo.pageSegment + ":formulario:formulario crm prestamos corto:1 datos personales",
		digitalChange("view", e))
    }else{
		var e = JSON.parse(sessionStorage.getItem("digitalData"));
		"undefined" != e && (e.application.step = "1 datos personales",
		e.application.state = "inicio",
		e.application.application.type = "formulario",
		e.application.application.name = "formulario crm hipoteca corto",
		e.page.pageInfo.level1 = "formulario",
		e.page.pageInfo.level2 = "formulario:formulario crm hipoteca corto",
		e.page.pageInfo.level3 = "1 datos personales",
		e.page.pageInfo.pageName = e.page.pageInfo.area + ":" + e.page.pageInfo.pageSegment + ":formulario:formulario crm hipoteca corto:1 datos personales",
		digitalChange("view", e))
	}
}
function updateDatalayerExito(e) {
	if (window.location.pathname.indexOf("/prestamos/") > 0){
		var a = JSON.parse(sessionStorage.getItem("digitalData"));
		a.application.step = "confirmacion",
		a.application.state = "finalizado",
		a.application.operationNumber = e,
		a.application.application.type = "formulario",
		a.application.application.name = "formulario crm prestamos corto",
		a.page.pageInfo.level1 = "formulario",
		a.page.pageInfo.level2 = "formulario:formulario crm prestamos corto",
		a.page.pageInfo.level3 = "confirmacion",
		a.page.pageInfo.pageName = a.page.pageInfo.area + ":" + a.page.pageInfo.pageSegment + ":formulario:formulario crm prestamos corto:confirmacion",
		digitalChange("view", a)
    }else{
		var a = JSON.parse(sessionStorage.getItem("digitalData"));
		a.application.step = "confirmacion",
		a.application.state = "finalizado",
		a.application.operationNumber = e,
		a.application.application.type = "formulario",
		a.application.application.name = "formulario crm hipoteca corto",
		a.page.pageInfo.level1 = "formulario",
		a.page.pageInfo.level2 = "formulario:formulario crm hipoteca corto",
		a.page.pageInfo.level3 = "confirmacion",
		a.page.pageInfo.pageName = a.page.pageInfo.area + ":" + a.page.pageInfo.pageSegment + ":formulario:formulario crm hipoteca corto:confirmacion",
		digitalChange("view", a)
	}
}
function callbackCaptcha() {
    bCaptcha = !0;
    checkForm() ? $(".send").removeClass("dis") : $(".send").addClass("dis");
}

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start === -1) {
      c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start === -1) {
      c_value = null;
    } else {
      c_start = c_value.indexOf("=", c_start) + 1;
      var c_end = c_value.indexOf(";", c_start);
      if (c_end === -1) {
        c_end = c_value.length;
      }
      c_value = unescape(c_value.substring(c_start, c_end));
    }
	if(c_value == null) {
		c_value = false;
	}
    return c_value;
}

function buscaroficina() {
	var vcp = $("input#cppostal").val()+",spain";

	var idiomapeticion = "spa";
	if(getCookie("idiomaAuto") != "spa" && getCookie("language") != "es" && getCookie("language")) {
		idiomapeticion = getCookie("language");
	}
	try {
		/* timeout es de 1 (1000 milisegundos) segundo para evitar problemas con el servicio */
		$.ajax({
			type: "POST",
			crossDomain: true,
			contentType: "application/json; charset=utf-8",
			url: 'https://w3.grupobbva.com/TLGO/tlgo/oficinas?',
			cache:false,
			timeout: timeoutAjax,
			data: {"op": "TLGOSvONBusquedaOficinaPorCP","query":vcp,"pais":"ESP","idioma":idiomapeticion.toUpperCase(),"tipofi":"P","controlCP":"si"},  dataType: 'jsonp',
				success: function(data) {
					if(data.MOSTRARMAPA.trim() =="false") {
						codoficina = data.CODIGO;
					}
					else {
						codoficina = "";
						$("#ko").show();
					}
				},
				error:  function(data) {
					codoficina = "";
					$("#ko").show();
					//console.log("codigo erroneo");
				}
		});
	}
	catch(ex) {
		codoficina = "";
		$("#ko").show();
		//console.log("codigo no obtenido");
		
//			console.log(ex);
	}
	
}

require(["/estaticos/js/apiFront.min"], function(e) {
    $.extend($.validator.messages, {
        required: _.t("Campo requerido"),
        telefonoMovil: _.t("El número de teléfono móvil no es correcto")
    });
    $("form#form").validate({
        rules: {
            nombre: {
                required: !0
            },
            primerApellido: {
                required: !0
            },
            telefono: {
                required: !0,
                telefonoMovil: !0
            },
            numDoc: {
                required: !0,
                validarDocumento: !0
            }
        },
        errorPlacement: function(e, a) {
            e.insertBefore(a)
        },
        errorElement: "div",
        errorClass: "error"
    });
    $.validator.addMethod("telefonoMovil", function(e, a) {
        var o = e.substr(0, 1);
        return !(e.length < 9 || e.length > 9) && (6 == o || 7 == o)
    }, $.validator.messages.telefonoMovil),
    $.validator.addMethod("validarDocumento", function(e) {
        return isValidDocumento($("#numDoc").val())
    }, _.t("El número del documento es incorrecto")),
    $.idleTimer(3e4),
    $(function() {
        e.arregosGtmetrix(),
        e.fondosDataImg(),
        $(".boxTool").igualarAltura(!0),
        $(".grid-row").each(function() {
            $(".boxBotons", $(this)).igualarAltura(!0)
        }),
        $(".contenido.videos , .contenido.glosario:not(.articulo)").igualarAltura(!0),
        $(".banner .cierra").on("click", function() {
            $(".banner").css("right", "-600px")
        }),
        $(".global-wrap .wrap-item").on("click", function(e) {
            $(this).toggleClass("on"),
            $(this).find("input").is(":checked") ? $(this).find("input").attr("checked", !1) : $(this).find("input").attr("checked", !0),
            $("[id^=tarea]").each(function(e) {
                localStorage[$(this).attr("name")] = !!$(this).is(":checked")
            }),
            e.preventDefault(),
            e.stopPropagation()
        }),
        $("[id^=tarea]").each(function(e) {
            localStorage["tarea" + e] && "true" == localStorage["tarea" + e] && ($(this).attr("checked", !0),
            $(this).parent().addClass("on"))
        }),
        $("#localStorageLista").submit(function() {
            return $("[id^=tarea]").each(function(e) {
                localStorage[$(this).attr("name")] = !!$(this).is(":checked")
            }),
            !1
        }),
        $(".blue.send").click(function() {
            $("#ko").hide(),
            $("#ok").hide(),
            $("#formulario").show(),
            grecaptcha.reset()
        }),
        $("#check1").click(function() {
            bCheck = $("#check1").is(":checked");
            checkForm() ? $(".send").removeClass("dis") : $(".send").addClass("dis");
        }),
        $(".green.send").click(function() {
			//buscaroficina();
            //getPayload();

				var vcp = $("input#cppostal").val()+",spain";

				var idiomapeticion = "spa";
				if(getCookie("idiomaAuto") != "spa" && getCookie("language") != "es" && getCookie("language")) {
					idiomapeticion = getCookie("language");
				}
				try {
					/* timeout es de 1 (1000 milisegundos) segundo para evitar problemas con el servicio */
					$.ajax({
						type: "POST",
						crossDomain: true,
						contentType: "application/json; charset=utf-8",
						url: 'https://w3.grupobbva.com/TLGO/tlgo/oficinas?',
						cache:false,
						timeout: timeoutAjax,
						data: {"op": "TLGOSvONBusquedaOficinaPorCP","query":vcp,"pais":"ESP","idioma":idiomapeticion.toUpperCase(),"tipofi":"P","controlCP":"si"},  dataType: 'jsonp',
							success: function(data) {
								if(data.MOSTRARMAPA.trim() =="false") {
									codoficina = data.CODIGO;
									
									$(this).hasClass("dis") || $("form#form").valid() && $("#check1").is(":checked") && "" != grecaptcha.getResponse() && $.ajax({
									url: "/sistema/recubrimiento-captcha.jsp",
									timeout: timeoutAjax,
									type: "POST",
									dataType: "json",
									data: "response=" + grecaptcha.getResponse(),
									success: function(e) {
										e.success && ($("#formulario").hide(),
										$("#loading").show(),
										$.ajax({
											url: "/productos/ClientProspect",
											type: "POST",
											encoding: "UTF-8",
											contentType: "application/json, charset=UTF-8",
											dataType: "jsonp",
											data: unescape(JSON.stringify(jQuery.parseJSON('{"ref":"'+sFormId+'","esCliente":"no","idiomaFormulario":"ES","procesoNuevo":"si","canal":"' + (-1 != navigator.userAgent.toUpperCase().indexOf("ANDROID") ? "Net-Android" : -1 != navigator.userAgent.toUpperCase().indexOf("IPHONE") ? "Net-Iphone" : -1 != navigator.userAgent.toUpperCase().indexOf("IPAD") ? "Net-Ipad" : -1 != navigator.userAgent.toUpperCase().indexOf("MAC OS X") ? "Net-Mac" : -1 != navigator.userAgent.toUpperCase().indexOf("LINUX") ? "Net-Linux" : -1 != navigator.userAgent.toUpperCase().indexOf("WINDOWS") ? "Net-Windows" : "Net-Otros") + '","codOficina":"'+codoficina+'","otrasObservaciones":"","idexterno":"0","enviarAltaNuevoPersonas":"S","idPromocion":"","datosPersonales":{"codPerson":"","nombre":"' + $("#nombre").val() + '","apellido1":"' + $("#primerApellido").val() + '","apellido2":".","tipoDoc":"' + tipoDoc + '","email":"' + $("#email").val() + '","numDoc":"' + $("#numDoc").val() + '","movil":"' + $("#telefono").val()+ '","cpostal":"'+$("#cppostal").val() + '","condiciones":"true","tipoPersona":"F"}}')).replace(/\\u/g, '%u')),
											success: function(e) {
												null != e && null != e && null != e.numeroReferenciaEnvio && "" != e.numeroReferenciaEnvio ? ("C" == e.tipoCliente ? utag_data = {
													cclient: e.cclien
												} : "" == e.tipoCliente && "" != e.cclien ? utag_data = {
													prospect: e.cclien
												} : "" == e.tipoCliente && "" == e.cclien ? utag_data = {
													cclien: codPerson
												} : utag_data = {
													prospect: e.cclien
												},
												updateDatalayerExito(e.numeroReferenciaEnvio),
												$("#loading").hide(),
												$("#ok").show()) : null != e && null != e && null != e.numeroReferenciaEnvio && "" != e.numeroReferenciaEnvio || ($("#loading").hide(),
												$("#ko").show())
											},
											error: function(e, a, o) {
												200 == e.status ? ($("#loading").hide(),
												$("#ok").show()) : ($("#loading").hide(),
												$("#ko").show())
											}
										}))
									},
									error: function(e, a, o) {
										
										e.success && ($("#formulario").hide(),
										$("#loading").show(),
										$.ajax({
											url: "/productos/ClientProspect",
											type: "POST",
											encoding: "UTF-8",
											contentType: "application/json, charset=UTF-8",
											dataType: "jsonp",
											data: unescape(JSON.stringify(jQuery.parseJSON('{"ref":"'+sFormId+'","esCliente":"no","idiomaFormulario":"ES","procesoNuevo":"si","canal":"' + (-1 != navigator.userAgent.toUpperCase().indexOf("ANDROID") ? "Net-Android" : -1 != navigator.userAgent.toUpperCase().indexOf("IPHONE") ? "Net-Iphone" : -1 != navigator.userAgent.toUpperCase().indexOf("IPAD") ? "Net-Ipad" : -1 != navigator.userAgent.toUpperCase().indexOf("MAC OS X") ? "Net-Mac" : -1 != navigator.userAgent.toUpperCase().indexOf("LINUX") ? "Net-Linux" : -1 != navigator.userAgent.toUpperCase().indexOf("WINDOWS") ? "Net-Windows" : "Net-Otros") + '","codOficina":"'+codoficina+'","otrasObservaciones":"","idexterno":"0","enviarAltaNuevoPersonas":"S","idPromocion":"","datosPersonales":{"codPerson":"","nombre":"' + $("#nombre").val() + '","apellido1":"' + $("#primerApellido").val() + '","apellido2":".","tipoDoc":"' + tipoDoc + '","email":"' + $("#email").val() + '","numDoc":"' + $("#numDoc").val() + '","movil":"' + $("#telefono").val()+ '","cpostal":"'+$("#cppostal").val() + '","condiciones":"true","tipoPersona":"F"}}')).replace(/\\u/g, '%u')),
											success: function(e) {
												null != e && null != e && null != e.numeroReferenciaEnvio && "" != e.numeroReferenciaEnvio ? ("C" == e.tipoCliente ? utag_data = {
													cclient: e.cclien
												} : "" == e.tipoCliente && "" != e.cclien ? utag_data = {
													prospect: e.cclien
												} : "" == e.tipoCliente && "" == e.cclien ? utag_data = {
													cclien: codPerson
												} : utag_data = {
													prospect: e.cclien
												},
												updateDatalayerExito(e.numeroReferenciaEnvio),
												$("#loading").hide(),
												$("#ok").show()) : null != e && null != e && null != e.numeroReferenciaEnvio && "" != e.numeroReferenciaEnvio || ($("#loading").hide(),
												$("#ko").show())
											},
											error: function(e, a, o) {
												200 == e.status ? ($("#loading").hide(),
												$("#ok").show()) : ($("#loading").hide(),
												$("#ko").show())
											}
										}))
										
										
									},
									complete: function(e, a) {}
								})
							}
							else {
								codoficina = "0";
								$("#ko").show();
							}

						},
						error:  function(data) {
							codoficina = "0";
							$("#ko").show();
						}
					
					});
				}
				catch(ex) {
					codoficina = "0";
					$("#ko").show();
					console.log("codigo no obtenido");
					
			//			console.log(ex);
				}
			


        });
    }),
    $(document).bind("idle.idleTimer", function() {
        $("#ko").is(":visible") || $("#ok").is(":visible") || $("#loading").is(":visible") || $("#formulario").addClass("nav-right")
    }),
    $(document).ready(function() {
    	if (window.location.pathname.indexOf("/prestamos/") > 0){
    		sFormId = "XCW";
    	} else if (window.location.pathname.indexOf("/hipotecas/") > 0) {
    		sFormId = "XXW";
    	}
        $(".send").addClass("dis");
        var e = !1;
        $("#nombre").on("focus", function() {
            e || (updateDatalayer(),
            e = !0)
        })
        $("input").on("focusout", function() {
        	checkForm() ? $(".send").removeClass("dis") : $(".send").addClass("dis");
        })
    });
})
