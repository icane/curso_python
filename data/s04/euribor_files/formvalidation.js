/**
 * @fileOverview Microformat form validation library for jquery. 
 * With this library, you can add validations to the form with markup, 
 * completely separating the implementation of the validation from its
 * definitions.<br/>
 * Uses MIT License
 * @author <a href="mailto:gonzalo.ruizdevilla@adesis.com">Gonzalo Ruiz de Villa</a>
 * @version 1.0.0
 */

(function($){


var Formvalidation = {
	
	Type:{
		Integer:"Integer"
		,Float:"Float"
		,Date:"Date"
		,RegExp:"RegExp"
		,Nif:"Nif"
		,Nie:"Nie"
		,Cif:"Cif"
		,Iban:"Iban"
		,CCC:"CCC"
		,Checked:"Checked"
		,FillAtLeastOne:"FillAtLeastOne"
	}
	,DataKeys:{
		validations: 'validations'
		,labels: 'validation-labels'
		,report: 'validation-report'
		,checkInterval: 'validation-checkinterval'
		,wrappersJQM: 'ui-field-contain'
	}
	,Validators:{}
};
/** 
*  @name Validators
*  @namespace jQuery.formvalidation
*  @description Validators package 
*/
/** 
*  @name Core
*  @class Core
*  @memberOf Validators
*  @description Validator superclass. 
*/
Formvalidation.Validators.Core = {
	ignoreIfDisabledClass:"ignoreIfDisabled"
	/** Verifies that an input with "inputid" id exists and is not disabled
	* @memberOf Validators.Core
	* @param {String} inputid Id of input to check
	* @returns boolean
	*/
	,undefOrDisabled: function( inputid ){
		var input,result = false;
		if( (typeof inputid === "undefined") ){
			result = true;
		} else {
			input = $("#" + inputid);
			if( (input.length === 1) && input.attr("disabled") && input.hasClass(this.ignoreIfDisabledClass) ){
				result = true;
			}
		};
		return result;
	}
	/** Executes validation. Checks whether is required and not empty and then the "concreteValidate" of the subclass.
	* @memberOf Validators.Core
	* @param value Value of the input
	* @param options Hash of validation options
	* @input to validate
	* @returns boolean Result of validation
	*/
	,validate: function( value, options, input ){
		var result;
		if( value === "" ){ 
			result = !options.required;
		}else{
			result = this.concreteValidate( value, options, input );
		}
		return result;
	}
	/** Get the value casted to the right type. Should be overridden as necessary.
	* @memberOf Validators.Core
	* @param {String} value Value of the input
	* @returns Object Casted value
	*/
	,getTypedValue: function( value, options ){
		return value;
	}
	/** Get the value casted to the right type. Should be overridden as necessary.
	* @memberOf Validators.Core
	* @param {String} inputid Input id
	* @param {Hash} options Options needed when casting the value to type from a string. For example, i18n data for date and number casting.
	* @returns Object Casted value
	*/
	,findValue: function( inputid, options ){
		return this.getTypedValue($("#"+inputid).val(), options);
	}
};

/** 
*  @class Checked
*  @name Checked
*  @memberOf Validators
*  @description Checked validation. 
*/

Formvalidation.Validators.Checked = $.extend( {}, Formvalidation.Validators.Core, 
/** @lends Validators.Checked */
{
	/** Checked concrete validation
	* @param value Ignored
	* @param options Ignored
	* @param input Input to validate
	* @returns {boolean} Input is checked
	*/
	concreteValidate: function( value, options, input ){
		return $(input).parents("form").find('input[name="' + input.name  + '"]:checked').size()>0;
	}
})

/** Validation for spanish account numbers (CCC: Codigo Cuenta Corriente)
*  @class CCC
*  @name CCC
*  @memberOf Validators
*/
Formvalidation.Validators.CCC =  $.extend( {}, Formvalidation.Validators.Core, 
/** @lends Validators.CCC */
{	
	/** Weights vector for the calculation of the control digit
	* @constant pesos
	*/
	pesos: ( new Array(1,2,4,8,5,10,9,7,3,6) ) // vector de pesos
	/** Value for DC when is not required
	* @constant noDCValue
	*/
	,noDCValue:"**"
	/** CCC validation
	*/
	,concreteValidate: function( value, options ){
		if(value.length<20){
			return false;
		}
		var cc1 = value.substring( 0, 8 );
		var dc = value.substring( 8, 10 );
		var cc2 = value.substring( 10, 20 );
		return this.checkDC( cc1, cc2, dc, options );
	},
	/** Checks control digit of the account numbers
	* @param cc1 First part of the account (entidad, oficina)
	* @param cc2 Second part of the account(numero de cuenta)
	* @param dc Control digit
	* @param options options.withoutDC
	* @returns {boolean} Control digit is right
	*/
	checkDC:function( cc1, cc2, dc, options ){
		if ( !this.correctLengths(cc1,cc2,dc) ){
			return false;  
		}
		if( this.checkEmptyDC( dc, options) ){
			return true;
		}
		var dc1 = this.calculateDC( cc1 ); 
		var dc2 = this.calculateDC( cc2 ); 
		return ( 10 * dc1 + dc2 === parseInt(dc,10) );
	},
	/** Returns true if dc is empty and it is allowed to be empty
	* @param dc Control digit 
	* @param options Validation options
	* @returns {boolean} Empty and allowed to be empty
	*/
	checkEmptyDC: function( dc, options ){
		return options.withoutDC && ( dc === this.noDCValue );
	},
	/** Calculates de digit control for a number
	* @memberOf Validators.CCC
	* @param cc  Part of account
	* @returns {int} Control digit 
	*/
	calculateDC: function( cc ){
		var dc = 0;
		var lengthDif = this.pesos.length - cc.length;
		for ( i=cc.length-1; i>=0; i-- ){
			dc += this.pesos[i+lengthDif] * cc.charAt(i);
		}
		dc = 11 - (dc % 11);
		if( 11 === dc ){
			dc = 0;
		}
		if( 10 === dc ){
			dc = 1;
		}
		return dc;
	},
	correctLengths:function( cc1, cc2, dc){
		return ( cc1.match( /^\d{8}$/ ) && cc2.match( /^\d{10}$/ ) && ( dc.match( /^\d{2}$/ ) || dc.match( /^\*\*$/ ) ) );
	}
});

/** Validation for international account numbers (Iban: Codigo Cuenta Cliente)
*  @class Iban
*  @name Iban
*  @memberOf Validators
*  @see <a href="http://en.wikipedia.org/wiki/International_Bank_Account_Number">http://en.wikipedia.org/wiki/International_Bank_Account_Number</a>
*/
Formvalidation.Validators.Iban =  $.extend( {}, Formvalidation.Validators.Core,
/** @lends Validators.Iban */
{
	/** Iban validation
	*/
	concreteValidate: function(value, options){
		return this.validateValue(value);
		//TODO: locale validators
	}
	/** Iban strict validation (no locale validation)
	*/
	,validateValue: function(value){
		var countryCode = value.substring( 0, 2 );
		if ( !this.correctLength( value, countryCode ) ){
			return false;
		}
		return this.checkIbanDigits(value);
	}
	/** Iban control digits validation
	*/
	,checkIbanDigits: function(iban){
		var countryCode = iban.substring( 0, 2 );
		var checkDigits = iban.substring( 2, 4 );
		var accountCode = iban.substring( 4 );
		var digits = "";
		digits += this.string2Digits( accountCode );
		digits += this.string2Digits( countryCode );
		digits += checkDigits;
		var check = 98 - this.m97( digits );
		return (check === 97)
	}
	,m97:function( digits ){
		var m = 0;
		$.each( digits.split(''), function( counter, digit ){
			m= ( m * 10 + parseInt( digit ) ) % 97;
		})
		return m;
	}
	,string2Digits: function( str ){
		var resultado = "";
		var t = this;
		$.each( str.split(''), function( counter, ch ){
			if( "0" <= ch && ch <= "9" ){
				resultado += ch;
			} else {
				resultado += t.char2Digits(ch);
			}
		})
		return resultado;
	}
	,char2Digits:function( ch ){
		var upp="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var i;
		for( i=0; i<upp.length; ++i ){
			if ( ch === upp.charAt(i) ){
				return i+10;
			}
		}
	}
	/** Check the length of the account for de spcified country
	*/
	,correctLength: function( value, countryCode ){
		if (typeof this.accountLengths[countryCode] == 'undefined'){
			return false;
		}
		return ( value.length === this.accountLengths[countryCode] );
	}
	/** Country account lengths
	*/
	,accountLengths: {
		'DE':22, //Alemania
		'AD':24, //Andorra
		'AT':20, //Austria
		'AZ':17, //Azerbaian    
		'BE':16, //Bélgica
		'CY':28, //Chipre
		'DK':18, //Dinamarca
		'SI':19, //Eslovenia
		'ES':24, //España
		'EE':20, //Estonia
		'FI':18, //Finlandia
		'FR':27, //Francia
		'GI':23, //Gibraltar
		'GR':27, //Grecia
		'HU':28, //Hungría
		'IE':22, //Irlanda
		'IS':26, //Islandia
		'IT':27, //Italia
		'LV':21, //Latvia
		'LT':20, //Lituania
		'LU':20, //Luxemburgo
		'NO':15, //Noruega
		'NL':18, //Países Bajos
		'PL':28, //Polonia
		'PT':25, //Portugal
		'GB':22, //Reino Unido
		'CZ':24, //República Checa
		'SK':24, //República Eslovaca
		'SE':24, //Suecia
		'CH':21 //Suiza
	}
});

/** Validation spanish Cif code:  C&oacute;digo de identificaci&oacute;n fiscal
*  @class Cif
*  @name Cif
*  @memberOf Validators
*  @see <a href="http://es.wikipedia.org/wiki/C%C3%B3digo_de_identificaci%C3%B3n_fiscal">http://es.wikipedia.org/wiki/C%C3%B3digo_de_identificaci%C3%B3n_fiscal</a>
*/
Formvalidation.Validators.Cif =  $.extend( {}, Formvalidation.Validators.Core, 
/** @lends Validators.Cif */
{
	concreteValidate: function(value, options){
		var result = this.getRegExp(options).test(value);
		result = result && this.validateLetter(value);
		return result;
	}
	/** Regular Expression for CIF
	*/
	,getRegExp: function(){
		return /^[ABCDEFGHJKLMNPQRSUVWabcdefghjklmnpqrsuvw][0-9]{7}[JABCDEFGHIJjabcdefghij\d]$/;
	}
	/** Validate letter and control letter or control number.
	*/
	,validateLetter: function(value){
		var cif = value;
		var validLetters = "ABCDEFGHJKLMNPRQSUVW";
		var lastDigit = cif.charAt(cif.length-1);
		var firstLetter = cif.charAt(0); 
		var par = 0;
		var non = 0;
		var caracterControlLetra = "KPQS";
		var caracterControlNum = "ABEH";
		var i;
		var parcial;
		var control;
		var controlLetra = "JABCDEFGHIJ";
		if(cif.length!=9)
			return false;
		if (validLetters.indexOf(firstLetter.toUpperCase())==-1)
			return false;
		for (i=2;i<8;i+=2) {
			par = par + parseInt(cif.charAt(i));
		}
		for (i=1;i<9;i+=2) {
			var nn = 2 * parseInt(cif.charAt(i));
			if (nn > 9) nn = 1 + (nn-10);
			non = non + nn;
		}
		parcial = par + non;
		control = (10 - ( parcial % 10));
		if (caracterControlLetra.indexOf(firstLetter.toUpperCase()) != -1){
			// El caracter de control deberá ser una letra
			if (controlLetra.charAt(control) != cif.charAt(8).toUpperCase()){
			  return false
			}
		}
		if (caracterControlNum.indexOf(firstLetter.toUpperCase()) != -1){
			// El caracter de control deberá ser un número
			if (control == 10) 
				control = 0;
			if (control != cif.charAt(8))
				return false;
		}
		if ((caracterControlLetra.indexOf(firstLetter.toUpperCase()) == -1) && (caracterControlNum.indexOf(firstLetter.toUpperCase()) == -1)){
			// En este caso el carácter de control puede ser una letra o un número
			if (control == 10)
				control = 0;
			if ((controlLetra.charAt(control) != cif.charAt(8).toUpperCase()) && (control != cif.charAt(8))){
				return false
			}
		}
		return true
	}
}); 
/** Spanish personal document validator superclass
*  @class Documento
*  @name Documento
*  @memberOf Validators
*/
Formvalidation.Validators.Documento =  $.extend( {}, Formvalidation.Validators.Core, {
	concreteValidate: function(value, options){
		var result = this.getRegExp(options).test(value);
		result = result && this.validateLetter(value);
		return result;
	}
});
/** "N&uacute;mero de identificaci&oacute;n fiscal" validator.
*  @class Nif
*  @name Nif
*  @memberOf Validators
*  @see <a href="http://es.wikipedia.org/wiki/N%C3%BAmero_de_identificaci%C3%B3n_fiscal">http://es.wikipedia.org/wiki/N%C3%BAmero_de_identificaci%C3%B3n_fiscal</a>
*/
Formvalidation.Validators.Nif =  $.extend( {}, Formvalidation.Validators.Documento, 
/** @lends Validators.Nif */
{
	/** NIF reg exp validation
	*/
	getRegExp: function(){
		return /^([0-9]{1,8}|[KLkl][0-9]{7})[TRWAGMYFPDXBNJZSQVHLCKEtrwagmyfpdxbnjzsqvhlcke]$/;
	}
	/** Validates NIF letter
	*/
	,validateLetter: function(value){
		var nif = value;
		var lookup = 'TRWAGMYFPDXBNJZSQVHLCKE';
		var lastLetter = nif.charAt(nif.length-1).toUpperCase();
		var isNumberFirstLetter = !isNaN(parseInt(nif.charAt(0),10)); 
		var nifNumbers = isNumberFirstLetter?nif.substr(0,nif.length-1):nif.substr(1,nif.length-2);
		var nifInteger = parseInt(nifNumbers,10);
		if(isNaN(nifInteger))
			return false;
		return lookup.charAt(nifInteger % 23) == lastLetter;
	}
}); 
// 
/** "N&uacute;mero de identificaci&oacute;n de extranjero" validator.
*  @class Nie
*  @name Nie
*  @memberOf Validators
*  @see <a href="http://es.wikipedia.org/wiki/N%C3%BAmero_de_identificaci%C3%B3n_fiscal">http://es.wikipedia.org/wiki/N%C3%BAmero_de_identificaci%C3%B3n_fiscal</a>
*/
Formvalidation.Validators.Nie =  $.extend( {}, Formvalidation.Validators.Documento, 
/** @lends Validators.Nie */
{
	/** NIE reg exp validation
	*/
	getRegExp: function(){
		return /^[XYZxyz][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKEtrwagmyfpdxbnjzsqvhlcke]$/;
	}
	/** Validates NIE letter
	*/
	,validateLetter: function(value){
		var nie = value;
		var lookup = 'TRWAGMYFPDXBNJZSQVHLCKE';
		var lastLetter = nie.charAt(nie.length-1).toUpperCase();
		var firstLetter = nie.charAt(0).toUpperCase();
		
		switch(firstLetter){
			case "X":
				var numeroValidar = nie.substr(1,nie.length-2);
				break;
			case "Y":
				var numeroValidar = "1" + nie.substr(1,nie.length-2);
				break;
			case "Z":
				var numeroValidar = "2" + nie.substr(1,nie.length-2);
				break;
		}
		
		return lookup.charAt(numeroValidar % 23) == lastLetter;
	}
}); 

/** "N&uacute;mero de identificaci&oacute;n de extranjero" validator.
*  @class RegExp
*  @name RegExp
*  @memberOf Validators
*  @see <a href="http://es.wikipedia.org/wiki/N%C3%BAmero_de_identificaci%C3%B3n_fiscal">http://es.wikipedia.org/wiki/N%C3%BAmero_de_identificaci%C3%B3n_fiscal</a>
*/
Formvalidation.Validators.RegExp =  $.extend( {}, Formvalidation.Validators.Core, 
/** @lends Validators.RegExp */
{
	concreteValidate: function(value, options){
		var result = this.getRegExp(options).test(value);
		return result;
	}
	/** Returns reg exp selected in options
	* @returns {RegularExpression}
	*/
	,getRegExp: function(options){
		if(options.notEmpty){
			return /^(.+)$/;
		}
		if(options.isNotEmpty){
			return /^(.+)$/;
		}
		if(options.isSelectNotEmpty){
			return /^(.+)$/;
		}			
		if(options.isLatin){
			return /^[ÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöü¡¿çÇßØøÅåÆæÞþÐðºª%""\w\d-'´.,&amp;#@:?!()$\/\\]+[ÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöü¡¿çÇßØøÅåÆæÞþÐðºª%""”“\w\d\s-'´.,&amp;#@:?!()$\/\\]*$/
		}
		if(options.is4To8Letters){
			return /^(\w{4,8})$/;
		}
		if(options.isClave){
			return /^([0-9]{4,8})$/;
		}
		if(options.isFirma){
			return /^([0-9]{5,8})$/;
		}
		if(options.is2Digits){
			return /^([0-9]{2})$/;
		}
		if(options.is4Digits){
			return /^([0-9]{4})$/;
		}
		if(options.is5Digits){
			return /^([0-9]{5})$/;
		}
		if(options.is8Digits){
			return /^([0-9]{8})$/;
		}
		if(options.is9Digits){
			return /^([0-9]{9})$/;
		}
		if(options.is10Digits){
			return /^([0-9]{10})$/;
		}
		if(options.is16Digits){
			return /^([0-9]{16})$/;
		}
		if(options.isMovil){
			return /^(6[0-9]{8})$/;
		}
		if(options.isEmail){
			return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		}
		if(options.isAlfanumerico){
			return /^([a-zA-Z0-9\sÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð])+$/;
		}
		if(options.isNie){
			return /^[MXYZmxyz][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKEtrwagmyfpdxbnjzsqvhlcke]$/;
		}
		if(options.isNif){
			return /^([0-9]{1,8}|[KLkl][0-9]{7})[TRWAGMYFPDXBNJZSQVHLCKEtrwagmyfpdxbnjzsqvhlcke]$/;
		}
		if(options.isCif){
			return /^[ABCDEFGHJKLMNPQRSUVWabcdefghjklmnpqrsuvw][0-9]{7}[JABCDEFGHIJjabcdefghij\d]$/;
		}
		if(options.isURL){
			return /^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([\w]+)(.[\w]+){1,2}$/;
		}
		if(options.regExp){
			return options.regExp;
		}
	}
})


Formvalidation.Validators.Comparable =  $.extend( {}, Formvalidation.Validators.Core, {
	concreteValidate: function(value, options){
		return true;
	}
	,checkSeparator: function( options ){
		if(typeof options.dotForThousands == "undefined"){
			if(document.documentElement.lang){
				options.dotForThousands = this.i18nDotForThousands[document.documentElement.lang.substr(0,2)];
			}else{
				options.dotForThousands = false;
			}
		}
	}
	,thousandSeparator: function( options ){
		this.checkSeparator( options );
		return options.dotForThousands?"\\.":"\\,";
	}
	,decimalSeparator: function( options ){
		this.checkSeparator( options );
		return options.dotForThousands?"\\,":"\\.";
	}
	,i18nDotForThousands:{
		"ca":true,
		"en":false,
		"es":true,
		"va":true,
		"eu":true,
		"fr":true,
		"de":true
	}
	,undefOrDisabledOrNotValidType: function(value, options){
		var res =  this.undefOrDisabled(value) || !this.validType( $("#"+value).val(), options );
		return res;
	}
	,concreteValidate:function( value, options ){
		/** Validaciones particulares de entero
		* @returns resultado validación
		*/
		var result = true;
		
		if( this.validType( value, options ) ){
			var typedValue = this.getTypedValue( value, options ); 
			result &= ( this.undefOrDisabled(options.min) || (typedValue >= this.getTypedValue(options.min, options)) );
			result &= ( this.undefOrDisabled(options.max) || (typedValue <= this.getTypedValue(options.max, options)) );
			result &= (	this.undefOrDisabledOrNotValidType(options.lessThan, options) || (typedValue < this.findValue(options.lessThan, options)) );
			result &= (	this.undefOrDisabledOrNotValidType(options.greaterThan, options) || (typedValue > this.findValue(options.greaterThan, options)) );
			result &= (	this.undefOrDisabledOrNotValidType(options.lessOrEqualThan, options) || (typedValue <= this.findValue(options.lessOrEqualThan, options)) );
			result &= (	this.undefOrDisabledOrNotValidType(options.greaterOrEqualThan, options) || (typedValue >= this.findValue(options.greaterOrEqualThan, options)) );
			result &= this.concreteComparableValidate( typedValue, options );
		}else{
			result = false;
		}
		return result;
	}

});


Formvalidation.Validators[Formvalidation.Type.Date] = $.extend( {}, Formvalidation.Validators.Comparable, {
	separator:"."
	,dayPos:2
	,monthPos:1
	,yearPos:0
	
	,concreteComparableValidate: function( value, options ){
		return true;
	}
	,validType: function( value, options ){
		return this.isDateObject( this.getTypedValue(value,options), options );
	}
	,isDateObject: function( object ){
		return object == null ? false:
			typeof(object)==='object' ? (object.constructor && object.constructor.toString().match(/date/i) !== null ): false;
	}
	,getTypedValue: function( value, options ){
		var data = (value+"").split( this.getSeparator(options) );
		if( data.length != 3 ){
			return false;
		}
		var day = parseInt( data[this.getDayPos(options)], 10 );
		var month = parseInt( data[this.getMonthPos(options)], 10 );
		var year = parseInt( data[this.getYearPos(options)], 10 );
		if(isNaN(day) || isNaN(month) || isNaN(year) || 
			(this.addLeftZerosAsNecesary(day,2) != data[this.getDayPos(options)]) || 
			(this.addLeftZerosAsNecesary(month,2) != data[this.getMonthPos(options)]) || 
			(this.addLeftZerosAsNecesary(year,4) != data[this.getYearPos(options)]) ) {
			return false;
		}
		month -= 1; //meses de 0 a 11
		var date = new Date( year, month, day );
		if( (date.getFullYear() != year) || (date.getMonth() != month) || (date.getDate() != day) ) { 
			return false;
		}
		return date;
	}
	,addLeftZerosAsNecesary:function( value, maxDigits ){
		var tempValue = "0000" + value;
		return tempValue.substring(tempValue.length - maxDigits,tempValue.length)
	}
	,getSeparator: function( options ){
		return options.separator ? options.separator : this.separator;
	}
	,getDayPos: function( options ){
		return this.getPos(options, "dayPos"); 
	}
	,getMonthPos: function( options ){
		return this.getPos(options, "monthPos"); 
	}
	,getYearPos: function( options ){
		return this.getPos(options, "yearPos");
	}
	,getPos: function( options, pos ){
		return (!(typeof options[pos] == "undefined")) ? options[pos] : this[pos];
	}
});

Formvalidation.Validators[Formvalidation.Type.Float] = $.extend( {}, Formvalidation.Validators.Comparable, {
	concreteComparableValidate: function( value, options ){
		var result = true;
		result &= (	this.undefOrDisabled(options.multipleOf) || this.isMultiple(value, this.getTypedValue(options.multipleOf, options)) );
		result &= (	this.undefOrDisabled(options.multipleOfInput) || this.isMultiple(value, this.findValue(options.multipleOfInput, options)) );	
		return result;
	}
	,validationRegExp: function( options ){
		var baseExpression = "^-?\\d{1,3}(THOUSAND_SEPARATOR\\d{3})*(DECIMAL_SEPARATORDECIMAL_COUNT)?$|^-?\\d+(DECIMAL_SEPARATORDECIMAL_COUNT)?$",
			thousandSep = this.thousandSeparator( options ),
			decimalSep = this.decimalSeparator( options );
		var decimalCount = options.maximumDecimals?"\\d{1,"+options.maximumDecimals+"}":"\\d+";
		var particularRegExp = $.string(baseExpression)
					.gsub("THOUSAND_SEPARATOR",thousandSep)
					.gsub("DECIMAL_SEPARATOR",decimalSep)
					.gsub("DECIMAL_COUNT",decimalCount).str;
		return new RegExp(  particularRegExp );
	}
	,getTypedValue: function( value, options){
		if(typeof value === "number"){
			return value;
		}else{
			return this.validationRegExp( options ).test( value ) ? parseFloat( this.getCleanValue(value,options),10 ) : NaN;
		}
	}
	,getCleanValue: function( value, options ){
		return $.string( value ).gsub( this.thousandSeparator(options), "" ).str;
	}
	,validType: function( value, options ){
		return !isNaN( this.getTypedValue(value,options) );
	}
	,isMultiple: function( value, base ){
		return (value % base).toFixed(10) == 0 || (((value % base) -base).toFixed(10) == 0);
	}
});

Formvalidation.Validators[Formvalidation.Type.Integer] = $.extend( {}, Formvalidation.Validators.Comparable, {
	concreteComparableValidate: function( value, options ){
		var result = true;
		result &= (	this.undefOrDisabled(options.multipleOf) || this.isMultiple(value, this.getTypedValue(options.multipleOf, options)) );
		result &= (	this.undefOrDisabled(options.multipleOfInput) || this.isMultiple(value, this.findValue(options.multipleOfInput, options)) );	
		return result;
	}
	,validationRegExp: function( options ){
		var baseExpression = "^-?\\d{1,3}(THOUSAND_SEPARATOR\\d{3})*$|^-?\\d+$",
			separator = this.thousandSeparator( options );
		var particularRegExp = $.string(baseExpression).gsub("THOUSAND_SEPARATOR",separator).str;
		return new RegExp(  particularRegExp );
	}
	,isMultiple: function( value, base ){
		return (value % base).toFixed(10) == 0 || (((value % base) -base).toFixed(10) == 0);
	}
	,getTypedValue: function( value, options){
		if(typeof value === "number"){
			return value;
		}else{
			return this.validationRegExp( options ).test( value ) ? parseInt( this.getCleanValue(value,options),10 ) : NaN;
		}
	}
	,getCleanValue: function( value, options ){
			return $.string( value ).gsub( this.thousandSeparator(options), "" ).str;
	}
	,validType: function( value, options ){
		return !isNaN( this.getTypedValue(value,options) );
	}
});

/** 
*  @class FillAtLeastOne
*  @name FillAtLeastOne
*  @memberOf Validators
*  @description FillAtLeastOne validation. 
*/
Formvalidation.Validators[Formvalidation.Type.FillAtLeastOne] = $.extend( {}, Formvalidation.Validators.Core, 
/** @lends Validators.FillAtLeastOne */
{
	/** FillAtLeastOne concrete validation
	* @param value Ignored
	* @param options Ignored
	* @returns {boolean} At least on of options.oneOf inputs is checked
	*/
	validate: function( value, options, input ){
		var result = false;
		if(!options.oneOf){
			options.oneOf =[];
		}
		$.each(options.oneOf, function(index,inputId){
			if($("#"+inputId).val() != ""){
				result = true;
				return false;
			}
		})
		return result;
	}
});




$.formvalidation = Formvalidation;

/** Helper to execute validations
* @class ValidatorHelper
* @name ValidatorHelper
*/

var ValidatorHelper = {
	/** @lends ValidatorHelper */
	/** Opciones por defecto, inicializadas para el campo
	* @returns opciones por defecto
	*/
	defaultOptions:function(input){
		
		return {
			helpValue: ""
			,helpValueClass: "showingHelpValue"
			,errorLabelClass: "errorLabel"
			,hasFocusClass: "hasFocus"
			,requiredClassPrefix:"required_"
			,message: "Error in field " + input.id
			,required: false
		};
	}
	,prepareInputValidator: function( input, validation ){
		/** Copia validacion para cada campo
		* @returns validador ampliado
		*/
		return $.extend( true, {
			validates:false
			,options: this.defaultOptions(input)
		}, validation );
	}
	,markRequired: function( input, validation ){
		var options = validation.options;
		if(options.required){
			var suffix, preffix = options.requiredClassPrefix;
			if(input.nodeName == "INPUT"){
				suffix = $(input).attr("type");
				var watermarkInput = $(input).data('watermarkPassword');
				if(watermarkInput){
					$(watermarkInput).addClass(preffix + $(watermarkInput).attr("type"));
				}
			}else{
				suffix = input.nodeName.toLowerCase();
			}
			var wrappersJMQ = $( input ).parents( 'span[data-role="fieldcontain"]' );
			if(wrappersJMQ.size() > 0)
				$( wrappersJMQ ).find( '.campo' ).eq(0).addClass( preffix + suffix ); 
			$( input ).addClass( preffix + suffix );
		}
	}
	/**Binds events that executes de validations: keyup, focus, blur
	* @returns null
	*/
	,bindEvents: function( input, validation ){
		$(input).keyup(function(event){
			$(this).validate();
		})
		var targetElements = input;
		if( input.type === "checkbox" || input.type === "radio" ){
			targetElements = $(input).parents( "form" ).find( 'input[name="' + input.name + '"]' );
		}
		$(targetElements).focus( validation, function(event){
			$(this).addClass(event.data.options.hasFocusClass).validate();
			if(this.type === "checkbox" || this.type === "radio"){
				var intervalId = setInterval( $.proxy( $(input).validate, $(input) ), 100 );
				$(this).data( $.formvalidation.DataKeys.checkInterval, intervalId );
			}
		})
		$(targetElements).blur( validation, function( event ){
			$(this).removeClass(event.data.options.hasFocusClass).validate();
			if(this.type === "checkbox" || this.type === "radio"){
				var intervalId = $(this).data( $.formvalidation.DataKeys.checkInterval );
				clearInterval( intervalId );
			}
		})
	}
	/** Stores input validations in data
	* @returns validaciones
	*/
	,storeValidation: function( input, validation ){
		var datakey = $.formvalidation.DataKeys.validations;
		var validations = $(input).data(datakey);
		validations = validations ? validations : $(input).data( datakey, [] ).data( datakey );
		validations.push(validation);
		return validations;
	}
	/** Executes al validations for the value
	* @returns validation results
	*/
	,executeValidations:function( value, validations, input ){
		
		var result = true;
		if(validations){
			$.each( validations, function( index, validation ){
				validation.validates = $.formvalidation.Validators[validation.type].validate( value, validation.options, input);
				result &= validation.validates;
			})
		}
		return result;
	}
	,setHelpValue: function( input, validations ){
		var helpValue = "";
		$.each(validations,function(index,validation){
			if(validation.options.helpValue.length>0){
				helpValue = validation.options.helpValue;
				return false;
			}
		})
		if(helpValue.length > 0)
			$(input).watermark( helpValue );
	}
	/** Marks associated label with error class y validations failed
	*/
	,markWrappers: function( input, validates, validations){
		var wrappers = this.findWrappers(input);
		if(!wrappers){
			wrappers = this.findLabels(input);
			var datakey = $.formvalidation.DataKeys.wrappers;
			$(input).data( datakey, wrappers );
		}
		var errorClass = "";
		if(validations && validations.length>0){
			errorClass = validations[0].options.errorLabelClass;
		}
		wrappers[ validates ? "removeClass" : "addClass" ](errorClass);
	}
	,findWrappers: function( input ){
		var wrappersJMQ = $( input ).parents( '.ui-field-contain' );
		if(wrappersJMQ.size() > 0){
			return wrappersJMQ; 
		} else {
			return this.findLabels(input);
		}
		// return wrappersJMQ.size()>0?wrappersJMQ:this.findLabels(input);
	}
	/** Marks error in errror summary as corrected if input has valid value
	*/
	,markError: function( input, validates ){
		var links = $("a.validationError[href='#" + input.id + "']");
		if( validates ){
			links.addClass("correctedError");
		} else {
			links.removeClass("correctedError");
			links.html( $(input).validate("message") );
		}
	}
	,findLabels: function( input ){
		return $("label[for='"+input.id+"']")
	}
	
}

/** Used to print the error report
* @class ValidationSummary
* @name ValidationSummary
*/
var ValidationSummary = {
	/** @lends ValidationSummary */
	defaultOptions:function(input){
		return {
			wrapperSelector: ".validationSummaryWrapper"
		};
	}
	,extendReportData: function( reportData ){
		return $.extend( this.defaultOptions(), reportData );
	}
	/** Publish error report in reportData.validationSummary tag. Shows/hides parend div with wrapperSelector class.
	*/
	,publishErrors: function( result, reportData, inputs ){
		if(!reportData)
			return;
		var summary = $("#" + reportData.validationSummary);
		var wrapper = $("#" + reportData.validationSummary).parents( reportData.wrapperSelector );
		if( result ){
			wrapper.hide();
		} else {
			summary.html("");
			this.prepareReport( reportData, inputs ).appendTo(summary);
			wrapper.show();
		}
	}
	/** Prepares the reports html list
	*/
	,prepareReport: function( reportData, inputs ){
		
		var inputDatakey = $.formvalidation.DataKeys.validations;
		var ul = $("<ul>");
		$( inputs ).each(function(iterator, input){
			var validations = $(input).data( inputDatakey );
			if(validations){
				$.each( validations, function( iterator, validation ){
					if( !validation.validates){
						if(reportData.summaryInLabels){
							var wrapper = $(input).parents(".ui-field-contain").size()>0?$(input).parents(".ui-field-contain"):$(input).parents("label");
							$(wrapper).find(".descripcion-error").html(validation.options.message);
						} else {
							var link = $("<a>").attr( "href" , "#" + input.id).addClass("validationError").html( $(input).validate("message") );
							var li = $("<li>").append(link);
							link.click(function(){
								try{
									$(input).focus();
								}catch(e){
								}
								return false;
							})
							ul.append(li);
							return false;
						}
					}
				})
			}
		})
		return ul;
	}
}

/** $.fn.validate Helper methods
* @class methods
* @name methods
*/
var methods = {
/** @lends methods */
	/** Adds validation. Stores the valdiation, sets the help value and, if necesary, mark the field as required.
	*/
	add: function( validation ){
		
		return this.each(function(){
			if( this.nodeName === "FORM" ){
				var datakey = $.formvalidation.DataKeys.report;
				$(this).data( datakey, ValidationSummary.extendReportData(validation) );
			} else {
				var _validation = ValidatorHelper.prepareInputValidator( this, validation );
				ValidatorHelper.bindEvents( this, _validation );
				var validations = ValidatorHelper.storeValidation( this, _validation )
				ValidatorHelper.setHelpValue( this, validations);
				ValidatorHelper.markRequired( this, _validation );
			}
		})
	}
	/** Executes all validations of the field or form. 
	* On failure of form validations, the error report is published.
	* On faliure of field validation, the field is marked with error.
	*/
	,validate: function(){		
		var result = true;
		this.each(function(){
			var formDatakey = $.formvalidation.DataKeys.report;
			var inputDatakey = $.formvalidation.DataKeys.validations;
			if( this.nodeName === "FORM" ){
				var inputs = $(this).find( "input,textarea,select" );
				result &= inputs.validate();
				var reportData = $(this).data( formDatakey );
				ValidationSummary.publishErrors( result, reportData, inputs );
					
			}else{
				if( !this.disabled ){
					var validations = $(this).data( inputDatakey );
					$.watermark.hide($(this));
					var value = $(this).val();
					$.watermark.show( $(this) );
					var validates = ValidatorHelper.executeValidations( value, validations, this );
					//ValidatorHelper.markLabels( this, validates, validations);
					ValidatorHelper.markWrappers( this, validates, validations);
					ValidatorHelper.markError( this, validates );
					result &= validates;
				}
			}
		})
		return result;
	}
	/** Returns the message of the first failed validation
	* @returns error messages
	*/
	,message: function(){
		var message = "";
		var validations = $(this).data( 'validations' );
		if( validations ){
			$.each( validations, function( index, validation ){
				if( !validation.validates ){
					message = validation.options.message;
					return false;
				}
			});
		}
		return $.isFunction( message )?message():message;
	}
}

/** Validate plugin
* @name $.fn.validate
* @class $.fn.validate
* @example
* //add validation
* $("#input.id").validate({
*    type:$.formvalidation.Type.Integer
*   ,options:{
*     required:true
*   }
* })
* //validate
* $("#input.id").validate();
* //get error message
* $("#input.id").validate("message");
*/
$.fn.validate = function( method ) {
	if ( methods[method] ) {
		return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	} else if ( typeof method  === 'object' ){
		 return methods.add.apply( this, arguments );
	}else{
		 return methods.validate.apply( this, arguments );
	}
}
/** Declarative validations (microformat). Interprets the microformat and registers the validations defined.
* @name DeclarativeValidations
* @class DeclarativeValidations
* @example
* &lt;div class="hvalidation"&gt;
*  &lt;h2&gt;Validations for 
*     &lt;a class="validated-form" href="#viajeForm"&gt;"configure your trip"&lt;/a&gt;
*  &lt;/h2&gt;
*  &lt;ul&gt;
*    &lt;li class="validator"&gt;&lt;label class="has-hint message for" for="days"
*      title="Write an integer"&gt;Days should be
*      &lt;abbr class="type" title="Integer"&gt;integer&lt;/abbr&gt;, 
*      between &lt;span class="parameter" title="min"&gt;1&lt;/span&gt;
*      and &lt;span class="parameter" title="max"&gt;31&lt;/span&gt;.
*      &lt;span class="false-parameter" title="required"&gt;Days are not required&lt;/span&gt;.
*      &lt;span class='parameter' title='helpValue'&gt;Days&lt;/span&gt;
*    &lt;/label&gt;&lt;/li&gt;
*    &lt;li class="validator"&gt;&lt;label class="message for" for="budget"&gt;Budget should be a
*      &lt;abbr class="type" title="Float"&gt;number&lt;/abbr&gt;
*      with &lt;span class="parameter" title="maximumDecimals"&gt;2&lt;/span&gt; or less decimals, 
*      greater than &lt;span class="parameter" title="min"&gt;0&lt;/span&gt;. 
*      &lt;span class="true-parameter" title="required"&gt;Budget is required&lt;/span&gt;.
*    &lt;/label&gt;&lt;/li&gt;
*    &lt;li class="validator"&gt;&lt;label class="message for" for="email"&gt;
*      &lt;abbr class="type" title="RegExp"&gt;Email&lt;/abbr&gt;
*      &lt;span class="true-parameter" title="isEmail"&gt;should be valid.&lt;/span&gt;
*    &lt;/label&gt;&lt;/li&gt;
*    &lt;li class="validator"&gt;&lt;label class="message for" for="date"&gt;
*      &lt;abbr class="type" title="Date"&gt;Date 1&lt;/abbr&gt;
*      &lt;span class="id-parameter" title="greaterThan date2"&gt;should be greter 
*      than Date 2.&lt;/span&gt;
*    &lt;/label&gt;&lt;/li&gt;
*    &lt;li class="validator"&gt;&lt;label class="message for" for="fillAtLeastOneInput2"&gt;
*      &lt;abbr class="type" title="FillAtLeastOne"&gt;Fill at least one of&lt;/abbr&gt;
*      &lt;span class="array-id-parameter" title="oneOf fillAtLeastOneInput1"&gt;One&lt;/span&gt;,
*      &lt;span class="array-id-parameter" title="oneOf fillAtLeastOneInput2"&gt;Two&lt;/span&gt;,
*      &lt;span class="array-id-parameter" title="oneOf fillAtLeastOneInput3"&gt;Three&lt;/span&gt;,
*      &lt;span class="array-id-parameter" title="oneOf fillAtLeastOneInput4"&gt;Four&lt;/span&gt;
*    &lt;/label&gt;&lt;/li&gt;
*  &lt;/ul&gt;
*  &lt;p&gt;See the result of all validations 
*    &lt;a class="validation-summary" href="#validationSummaryOutput"&gt;here&lt;/a&gt;
*  &lt;/p&gt;
* &lt;/div&gt;
*/
var DeclarativeValidations = {
/** @lends DeclarativeValidations */
	registerSummary: function( hvalidation ){
		var formIdHref = hvalidation.find( ".validated-form" ).attr( "href" );
		var formId = formIdHref.substr(formIdHref.indexOf("#")+1);
		var summaryIdHref = hvalidation.find( ".validation-summary" ).attr( "href" );
		var summaryInLabels =  hvalidation.find( ".validation-summary" ).hasClass("summary-in-labels");
		var summaryId = summaryIdHref.substr(summaryIdHref.indexOf("#")+1);
		$("#" + formId ).validate({
			validationSummary:summaryId
			,summaryInLabels:summaryInLabels
		}).submit(function(event){
			var resultado = $(this).validate();
			if( resultado == 0 ){
				event.preventDefault();
				return false;
			} else {
				return true;
			}
		});
	}
	,registerValidation: function( validation ){
		var forInput = validation.find(".for").attr("for");
		if($("forInput")){
			var message = validation.find(".message").html();
			var type = validation.find(".type").attr("title");
			var parameters = {
				message:message
			};
			this.findParameters( validation, parameters );
			this.findBooleanParameters( validation, true, parameters );
			this.findBooleanParameters( validation, false, parameters );
			this.findIdParameters( validation, parameters );
			this.findArrayIdParameters( validation, parameters );
			$("#" + forInput).validate({
				type: type
				,options: parameters
			});
		}
	}
	,findParameters: function( validation, parameters ){
		validation.find(".parameter").each(function( it, parameter ){
			var key = $( parameter ).attr("title");
			var value = $( parameter ).text();
			parameters[key] = value;
		})
	}
	,findBooleanParameters: function( validation, type, parameters ){
		validation.find("." + type +"-parameter" ).each(function( it, parameter ){
			var key = $( parameter ).attr("title");
			parameters[key] = type;
		})
	}
	,findIdParameters: function( validation, parameters ){
		validation.find(".id-parameter").each(function( it, parameter ){
			var data = $( parameter ).attr("title").split(" ");
			parameters[data[0]] = data[1];
		})
	}
	,findArrayIdParameters: function( validation, parameters ){
		validation.find(".array-id-parameter").each(function( it, parameter ){
			var data = $( parameter ).attr("title").split(" ");
			var array = parameters[data[0]];
			if(!array){
				array = [];
				parameters[data[0]] = array;
			}
			array.push(data[1]);
		})
	}
}

/** Register validations defined inside de container.
* @class $.registerValidations
* @name $.registerValidations
*/
$.registerValidations = function(container){
	$(container).find(".hvalidation").each(function( it, hvalidation ){
		DeclarativeValidations.registerSummary( $(hvalidation) );
		$( hvalidation ).find(".validator").each(function( it, validation ){
			DeclarativeValidations.registerValidation( $(validation) );
		})
		
	})
}
$(document).ready(function(){

	
	$.registerValidations($("body"));
	$( ".hvalidation" ).remove();
})

})( jQuery );

