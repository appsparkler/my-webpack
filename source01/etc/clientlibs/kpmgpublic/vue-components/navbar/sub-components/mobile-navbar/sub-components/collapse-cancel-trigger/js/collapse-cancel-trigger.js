define(['vue', 'jquery'], 


function CollapseCancelTrigger(Vue, $){
	'use strict';
	//
	var VueCollapseCancelTriggerComponent;
	//	
	VueCollapseCancelTriggerComponent = Vue.component('collapse-cancel-trigger',{
		template: '#collapse-cancel-trigger-component-template',
		props:['vm'],
		methods: {
			closeCollapse: function (evt) {
				$(evt.target).parents('.collapse').collapse('hide');
				$('.mobile-nav-slide-menu-component').removeClass('menu-shaded');
				$('body').removeClass('menu-shaded');
				$('.mobile-nav-menu-tabs-component').removeClass('menu-unshade');
			}
		}
	});
	//
	return VueCollapseCancelTriggerComponent;
}

);