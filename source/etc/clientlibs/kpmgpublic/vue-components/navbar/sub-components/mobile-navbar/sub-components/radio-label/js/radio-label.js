define(['vue'], 

function (Vue){
	'use strict';
	//
	var VueRadioLabelComponent;
	//	
	VueRadioLabelComponent = Vue.component('radio-label',{
		template: '#radio-label-component-template',
		props: ['vm']
	});
	//
	return VueRadioLabelComponent;
}

);