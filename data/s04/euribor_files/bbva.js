var FeedbackConf = (function () {
    /*objeto con la lista de objetos de operativa en las que se pone el opinator*/
    this.detallesOperativa = {};
    this.momentosDePresentacion = {};
    /*objeto adicional para incluir datos de prueba en el objeto de Opinator*/
    this.aditionalOpinatorResponse = {};

   //--------------------------------------------------------------------------

    /*//Objeto de configuracion para el formulario del boton "Valora tu experiencia" en la home publica
    this.detallesOperativa.pullHomePublicaParticulares = {
      'urlLocation': ['/particulares/'],
      'opiName': 'experiencia_canal_home_pull',
      'botonType': 'boton_pull_feedback'//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };*/
    //Objeto de configuracion para el formulario del boton "Valora tu experiencia" en la pagina de desconexion
    this.detallesOperativa.pullDesconexion = {
      'urlLocation': ['/sistema/'],
      'opiName': 'pull_push_Desconexion_Web',
      'botonType': 'boton_pull_feedback'//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    //Objeto de configuracion para el formulario del boton "Nos gustaria conocer tu opinion" del buscador Wally
    this.detallesOperativa.pullBuscador = {
      'urlLocation': ['/'],
      'opiName': 'BBVA-BD-BUSCADOR-MOV',
      'botonType': 'boton_pull_feedback'//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    //Objeto de configuracion para el formulario de solicitud de hipotecas
    this.detallesOperativa.hipotecasAbandono = {
      'urlLocation': ['/productos/formulario/'],
      'opiName': 'Formulario_hipotecario_abandono',
      //'botonType':
      'fileName': 'hipoteca-bbva'
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    this.detallesOperativa.hipotecasExito = {
      'urlLocation': ['/productos/formulario/'],
      'opiName': 'formulario_solicitud_hipoteca_exito',
      'botonType': 'boton_pull_feedback',//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      'fileName': 'hipoteca-bbva'
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    //Objeto de configuracion para el formulario de calculadora de hipotecas
    this.detallesOperativa.calculadoraHipotecaExito = {
      'urlLocation': ['/productos/formulario/'],
      'opiName': 'push_calculadora_hipoteca_exito',
      'bCoexistingDicotomy': true,//Conviven con el mismo ViewStateId, mismo evento y misma operativa dos Opis distintos
      'fileName': 'simulador-hipoteca'//'calculadora-hipoteca-feedback'
      //'botonType':
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    this.detallesOperativa.calculadoraHipotecaAbandono = {
      'urlLocation': ['/productos/formulario/'],
      'opiName': 'push_calculadora_hipoteca_abandono',
      'bCoexistingDicotomy': false,//Conviven con el mismo ViewStateId, mismo evento y misma operativa dos Opis distintos
      'fileName': 'simulador-hipoteca'//'calculadora-hipoteca-feedback'
      //'botonType':
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    //Objeto de configuracion para el formulario de Simulador de Prestamos Personales (Consumo Reactivo)
    this.detallesOperativa.SimulacionConsumoReactivoAbandono1 = {
      'urlLocation': ['/particulares/hipotecas-prestamos/prestamos/'],
      'opiName': 'solicitud_prestamo_simulacion_abandono'
      //'noModelButton':
      //'aditionalButtonClasses':
      //'botonType':
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    this.detallesOperativa.SimulacionConsumoReactivoAbandono2 = {
      'urlLocation': ['/particulares/hipotecas-prestamos/prestamos/'],
      'opiName': 'solicitud_prestamo_abandono'
      //'botonType':
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    this.detallesOperativa.ContratacionConsumoReactivoAbandono = {
      'urlLocation': ['/particulares/hipotecas-prestamos/prestamos/'],
      'opiName': 'solicitud_prestamo_abandono_2'
      //'botonType':
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    this.detallesOperativa.ContratacionConsumoReactivoExito = {
      'urlLocation': ['/particulares/hipotecas-prestamos/prestamos/'],
      'opiName': 'solicitud_prestamo_exito',
      //'noModelButton':
      //'aditionalButtonClasses':
      'botonType': 'boton_pull_feedback'//,//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    //Objeto de configuracion para el formulario de Simulador de Hipotecas
    this.detallesOperativa.simuladorHipotecaAbandono = {
      'urlLocation': ['/particulares/hipotecas-prestamos/hipotecas/'],
      'opiName': 'push_simulador_hipoteca_abandono'//,
      //'botonType':
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    this.detallesOperativa.simuladorHipotecaExito = {
      'urlLocation': ['/particulares/hipotecas-prestamos/hipotecas/'],
      'opiName': 'push_simulador_hipoteca_exito'//,
      //'noModelButton':
      //'aditionalButtonClasses':
      //'botonType':
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    //Objeto de configuracion para el formulario de Calculadora de Depositos
    this.detallesOperativa.simuladorDepositosAbandono = {
      'urlLocation': ['/particulares/ahorro-inversion/depositos/'],
      'opiName': 'simulacion_depositos_abandono'//,
      //'botonType':
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    this.detallesOperativa.simuladorDepositosExito = {
      'urlLocation': ['/particulares/ahorro-inversion/depositos/'],
      'opiName': 'simulacion_depositos_push_pull_exito',
      'botonType': 'boton_pull_feedback'//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    /*//Objeto de configuracion para el formulario de Simulador de Planes de pensiones
    this.detallesOperativa.simuladorPensionesAbandono = {
      'urlLocation': ['/particulares/ahorro-inversion/planes-de-pensiones/'],
      'opiName': 'simulacion_ppi_abandono_pub'//,
      //'botonType':
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    this.detallesOperativa.simuladorPensionesExito = {
      'urlLocation': ['/particulares/ahorro-inversion/planes-de-pensiones/'],
      'opiName': 'simulacion_ppi_exito_pub',
      'botonType': 'boton_pull_feedback'//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };*/
    //Objeto de configuracion para el formulario de Contratacion de Tarjetas de credito
    this.detallesOperativa.contratacionTarjetaCreditoAbandono = {
      'urlLocation': ['/productos/formulario/'],
      'opiName': 'sol_contra_tarjeta_credito_abandono_pub',
      //'botonType':
      'fileName': 'tarjetas',
      //'listaDatosModelo':
      //'events':
      'additional_carry': 'carry_tipoTarjeta'
    };
    this.detallesOperativa.contratacionTarjetaCreditoExito = {
      'urlLocation': ['/productos/formulario/'],
      'opiName': 'sol_contra_tarjeta_credito_exito_pub',
      'botonType': 'boton_pull_feedback',//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      'fileName': 'tarjetas',
      //'listaDatosModelo':
      //'events':
      'additional_carry': 'carry_tipoTarjeta'
    };
    //Objeto de configuracion para el abandono en el enrollment de cabecera
    this.detallesOperativa.pullEnrollment = {
      'urlLocation': ['/'],
      'opiName': 'enrollment_abandono_web'//,
      //'botonType': 'boton_pull_feedback'//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    //Objeto de configuracion para el exito/abandono de la operativa de "Valora"
    this.detallesOperativa.valora = {
      'urlLocation': ['/particulares/hipotecas-prestamos/hipotecas/bbva-valora/'],
      'opiName': 'bbva_valora_web',
      'botonType': 'boton_pull_feedback'//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    //Objeto de configuracion para el exito/abandono de la operativa de "Valora" en la subhome de hipotecas
    this.detallesOperativa.valoraHipotecas = {
      'urlLocation': ['/particulares/hipotecas-prestamos/hipotecas/index.jsp'],
      'opiName': 'bbva_valora_web',
      'botonType': 'boton_pull_feedback'//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
	//Objeto de configuracion para el exito/abandono de la operativa de "buscador" de planes de pensiones
    this.detallesOperativa.buscadorplanespensiones = {
      'urlLocation': ['/ahorro-inversion/planes-de-pensiones/buscador.jsp'],
      'opiName': 'buscador_planes_web',
	  'botonType': 'boton_pull_feedback'//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
	//Objeto de configuracion para el exito/abandono de la operativa de "buscador" de planes de pensiones en subhome
    this.detallesOperativa.buscadorplanespensionessubhome = {
      'urlLocation': ['/ahorro-inversion/planes-de-pensiones/index.jsp'],
      'opiName': 'buscador_planes_web',
	  'botonType': 'boton_pull_feedback'//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
	//Objeto de configuracion para el exito/abandono de la operativa de "buscador" de planes de pensiones en bancapersonal y bancaprivada
    this.detallesOperativa.buscadorplanespensionessubhomebanca = {
      'urlLocation': ['/ahorroeinversion/planes-de-pensiones/index.jsp'],
      'opiName': 'buscador_planes_bancaprivada_web',
	  'botonType': 'boton_pull_feedback'//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
		//Objeto de configuracion para el exito/abandono de la operativa de "buscador" de fondos
    this.detallesOperativa.buscadorfondos = {
      'urlLocation': ['/ahorro-inversion/fondos/buscador-de-fondos-de-inversion.jsp'],
      'opiName': 'buscador_fondos_web',
	  'botonType': 'boton_pull_feedback'//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
	//Objeto de configuracion para el exito/abandono de la operativa de "buscador" de fondos en subhome
    this.detallesOperativa.buscadorfondossubhome = {
      'urlLocation': ['/ahorro-inversion/fondos/bbva/index.jsp'],
      'opiName': 'buscador_fondos_web',
	  'botonType': 'boton_pull_feedback'//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
	//Objeto de configuracion para el exito/abandono de la operativa de "buscador" de fondos en bancapersonal y bancaprivada
    this.detallesOperativa.buscadorfondossubhomebanca = {
      'urlLocation': ['/ahorroeinversion/fondos-inversion/bbva/index.jsp'],
      'opiName': 'buscador_fondos_bancaprivada_web',
	  'botonType': 'boton_pull_feedback'//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    //Objeto de configuracion para el formulario del boton "Valora tu experiencia" en las fichas de producto: Fondos de inversion
    this.detallesOperativa.fichaFondo = {
      'urlLocation': ['/productos/ficha-inversion/'],
      'opiName': 'fondos_nueva_ficha_web',
      'botonType': 'boton_pull_feedback'//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    //Objeto de configuracion para el formulario del boton "Valora tu experiencia" en las fichas de producto: Depositos
    this.detallesOperativa.fichaDepo = {
      'urlLocation': ['/productos/ficha/'],
      'opiName': 'depos_nueva_ficha_web',
      'bCoexistingDicotomy': false,//Define si se debe mostrar el form en tercera persona (fichaDepoPrivada) o no (fichaDepo)
      'botonType': 'boton_pull_feedback'//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    //Objeto de configuracion para el formulario del boton "Valora tu experiencia" en fichas de producto: Depositos para segmentos redactados en tercera persona de cortesia
    this.detallesOperativa.fichaDepoPrivada = {
      'urlLocation': ['/productos/ficha/'],
      'opiName': 'depos_nueva_ficha_bancaprivada_web',
      'bCoexistingDicotomy': true,//Define si se debe mostrar el form en tercera persona (fichaDepoPrivada) o no (fichaDepo)
      'botonType': 'boton_pull_feedback'//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
    //Objeto de configuracion para el formulario del boton "Valora tu experiencia" en la calculadora de depositos
    this.detallesOperativa.calculaDepos = {
      'urlLocation': ['/particulares/ahorro-inversion/depositos/'],
      'opiName': 'calculadora_depos_web_es',
      'botonType': 'boton_pull_feedback'//Este campo debe ser obligatorio para operativas con boton pull, ya que se comprueba en la funcion openModal
      //'listaDatosModelo':
      //'events':
      //'additional_carry':
    };
   //--------------------------------------------------------------------------

    //objeto con la lista de objetos de operativa en las que se pone el opinator
    this.momentosDePresentacion = {//'sf0' es el ViewStateID
      'feedback_btn_pull_publica': [this.detallesOperativa.pullHomePublicaParticulares],//'experiencia_canal_home_pull'///////////////home publica experiencia canal
      'pullDesconexion': [this.detallesOperativa.pullDesconexion],////////////////////////'pull_push_Desconexion_Web',////////////////desconexion boton pull
      'resultsPane': [this.detallesOperativa.pullBuscador],///////////////////////////////'BBVA-BD-BUSCADOR-MOV',/////////////////////buscador Wally boton pull
      'sf0': [this.detallesOperativa.hipotecasAbandono,///////////////////////////////////'Formulario_hipotecario_abandono',//////////solicitud de hipotecas
            this.detallesOperativa.SimulacionConsumoReactivoAbandono1,////////////////////'solicitud_prestamo_simulacion_abandono',///consumo reactivo
            this.detallesOperativa.calculadoraHipotecaExito,//////////////////////////////'push_calculadora_hipoteca_exito',//////////calculadora de hipotecas
            this.detallesOperativa.calculadoraHipotecaAbandono,///////////////////////////'push_calculadora_hipoteca_abandono',///////calculadora de hipotecas
            this.detallesOperativa.contratacionTarjetaCreditoAbandono],///////////////////'sol_contra_tarjeta_credito_abandono_pub',//contratacion de Tarjetas de credito
      'sf1': [this.detallesOperativa.hipotecasAbandono,///////////////////////////////////'Formulario_hipotecario_abandono',//////////solicitud de hipotecas
            this.detallesOperativa.SimulacionConsumoReactivoAbandono2,////////////////////'solicitud_prestamo_abandono',//////////////consumo reactivo
            this.detallesOperativa.contratacionTarjetaCreditoAbandono],///////////////////'sol_contra_tarjeta_credito_abandono_pub',//contratacion de Tarjetas de credito
      'sf2': [this.detallesOperativa.hipotecasAbandono,///////////////////////////////////'Formulario_hipotecario_abandono',//////////solicitud de hipotecas
            this.detallesOperativa.ContratacionConsumoReactivoAbandono,///////////////////'solicitud_prestamo_abandono_2',////////////consumo reactivo
            this.detallesOperativa.contratacionTarjetaCreditoAbandono],///////////////////'sol_contra_tarjeta_credito_abandono_pub',//contratacion de Tarjetas de credito
      'sf3': [this.detallesOperativa.hipotecasExito,//////////////////////////////////////'formulario_solicitud_hipoteca_exito',//////solicitud de hipotecas
            this.detallesOperativa.ContratacionConsumoReactivoAbandono,///////////////////'solicitud_prestamo_abandono_2',////////////consumo reactivo
            this.detallesOperativa.contratacionTarjetaCreditoExito],//////////////////////'sol_contra_tarjeta_credito_exito_pub',/////contratacion de Tarjetas de credito
      'sf4': [this.detallesOperativa.ContratacionConsumoReactivoAbandono],////////////////'solicitud_prestamo_exito',/////////////////consumo reactivo
      'sf5': [this.detallesOperativa.ContratacionConsumoReactivoExito],///////////////////'solicitud_prestamo_exito',/////////////////consumo reactivo
      '1_Datos_Hipoteca': [this.detallesOperativa.simuladorHipotecaAbandono],/////////////'push_simulador_hipoteca_abandono',/////////simulador de hipotecas
      '2_Resultado': [this.detallesOperativa.simuladorHipotecaExito,//////////////////////'push_simulador_hipoteca_exito',////////////simulador de hipotecas
                    this.detallesOperativa.simuladorDepositosExito],//////////////////////'simulacion_depositos_push_pull_exito',/////calculadora de depositos
      '2_Resultados': [this.detallesOperativa.simuladorPensionesExito],///////////////////'simulacion_ppi_exito_pub',/////////////////simulador de planes de pensiones
      '1_Datos_Personales': [this.detallesOperativa.simuladorDepositosAbandono],//////////'simulacion_depositos_abandono',////////////calculadora de depositos
      '1_Datos_para_la_simulacion': [this.detallesOperativa.simuladorPensionesAbandono],//'simulacion_ppi_abandono_pub',//////////////simulador de planes de pensiones
      'contenidoModal': [this.detallesOperativa.pullEnrollment],//////////////////////////'enrollment_abandono_web'///////////////////enrollment push abandono
      'wrapvaloratop': [this.detallesOperativa.valora,////////////////////////////////////'bbva_valora_web'///////////////////////////valora
                        this.detallesOperativa.valoraHipotecas],//////////////////////////'bbva_valora_web'///////////////////////////valora hipotecas
      'fichaFondo': [this.detallesOperativa.fichaFondo],//////////////////////////////////'fichaFondo'/////////////////////////////////ficha de productos FI
      'fichaDepo': [this.detallesOperativa.fichaDepo,/////////////////////////////////////'fichaDepo'/////////////////////////////////ficha de productos Depositos
                    this.detallesOperativa.fichaDepoPrivada],/////////////////////////////'fichaDepo'/////////////////////////////////ficha de productos Depositos Privada
      'calculaDepos': [this.detallesOperativa.calculaDepos],///////////////////////////////'calculaDepos'//////////////////////////////calculadora de depositos
	  'buscPlanes': [this.detallesOperativa.buscadorplanespensiones,////////////////////////////////////'buscador_planes_web'///////////////////////////buscador planes
                     this.detallesOperativa.buscadorplanespensionessubhome,//////////////////////////'buscador_planes_web'///////////////////////////buscador planes
                     this.detallesOperativa.buscadorplanespensionessubhomebanca],//////////////////////////'buscador_planes_bancaprivada_web'///////////////////////////buscador planes bancaprivada	
	  'buscFondos': [this.detallesOperativa.buscadorfondos,////////////////////////////////////'buscador_fondos_web'///////////////////////////buscador fondos
                     this.detallesOperativa.buscadorfondossubhome,//////////////////////////'buscador_fondos_web'///////////////////////////buscador fondos
                     this.detallesOperativa.buscadorfondossubhomebanca],//////////////////////////'buscador_fondos_bancaprivada_web'///////////////////////////buscador fondos bancaprivada							  
    };
    
    //--------------------------------------------------------------------------
    
    this.aditionalOpinatorResponse = [
      {
        "page": "fichaDepo",
        "newPage": "fichaDepo",
        "forms": [
          {
            "opiName": "depos_nueva_ficha_bancaprivada_web",
            "mustShowOpi": true,
            "url": "//www.opinator.com/opi/depos_nueva_ficha_bancaprivada_web?carry_formulario=depos_nueva_ficha_bancaprivada_web&id=publica&carry_lang=es&lang=es",
            "urlPullButton": null,
            "urlWidget": null,
            "starSelected": 0,
            "width": 400
          }]
      }/*,
      {
        "page": "calculaDepos",
        "newPage": "calculaDepos",
        "forms": [
          {
            "opiName": "calculadora_depos_web_es",
            "mustShowOpi": true,
            "url": "//www.opinator.com/opi/calculadora_depos_web_es?carry_formulario=calculadora_depos_web_es&id=publica&carry_lang=es&lang=es",
            "urlPullButton": null,
            "urlWidget": null,
            "starSelected": 0,
            "width": 400
          }]
      }*/
    ];
    return this;
  }());