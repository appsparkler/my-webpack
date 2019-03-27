define(['vue'], 


function MobileNavCollapseTrigger(Vue){
	'use strict';
	//
	var VueMobileNavCollapseTriggerComponent;
	//	
	VueMobileNavCollapseTriggerComponent = Vue.component('mobile-nav-collapse-trigger',{
		template: '#mobile-nav-collapse-trigger-component-template',
		props: ['vm'],
		mounted: componentMountedCallback
	});
	//
	function componentMountedCallback() {
		/*jshint validthis:true */
		if(this.vm.linkURL !== '') {
            var pageURL = window.location.pathname,
				urlArrayValue = pageURL.split("/"),
				tempUrl = this.vm.linkURL,
				tempUrlArray = tempUrl.split("/");
			if((urlArrayValue[urlArrayValue.length - 1] === tempUrlArray[tempUrlArray.length - 1]) && !$(this.$el).find('a').hasClass('highlight')) {
				$(this.$el).find('a').removeClass('text-kpmg-blue');
				$(this.$el).find('a').addClass('highlight');
				$(this.$el).find('.collapse-trigger-area').addClass('highlight');
			} else {
				$(this.$el).find('a').removeClass('highlight');
				$(this.$el).find('.collapse-trigger-area').removeClass('highlight');
			}
		} else {
			$(this.$el).find('a').removeClass('highlight');
			$(this.$el).find('.collapse-trigger-area').removeClass('highlight');
		}
	}
	return VueMobileNavCollapseTriggerComponent;
}

);