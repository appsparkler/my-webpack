define(['vue', 'mykpmgflyout'],


function SubListItemFn(Vue, MyKPMGFlyout){
	'use strict';
	//
	var VueSubListItemComponent;
    MyKPMGFlyout();
	//
	VueSubListItemComponent = Vue.component('sub-list-item',{
		template: '#sub-list-item-component-template',
		props: ['vm'],
		methods: {
			logoutUser: function() {
				//Check if user has made any changes in interests || preferences
				if( window.kpmgPersonalize.interestsChange || window.kpmgPersonalize.preferenceChange ) {
					$(document).trigger('logout.click');
					return false;
				}
				if (typeof event !== "undefined"){ event.stopPropagation(); }
				MyKPMGFlyout.logoutUser();
			},
            openLearnMoreModal: MyKPMGFlyout.learnMoreModalTriggerFn
        },
		mounted: componentMountedCallback
	});
	//
	function componentMountedCallback() {
		/*jshint validthis:true */
		if(this.vm.url !== '') {
            var pageURL = window.location.pathname,
				urlArrayValue = pageURL.split("/"),
				tempUrl = this.vm.url,
				tempUrlArray = tempUrl.split("/");
			if((urlArrayValue[urlArrayValue.length - 1] === tempUrlArray[tempUrlArray.length - 1]) && !$(this.$el).find('a').hasClass('highlight')) {
				$(this.$el).find('a').removeClass('sub-list-item-component-text-color');
				$(this.$el).find('a').addClass('highlight');
			} else {
				$(this.$el).find('a').removeClass('highlight');
			}
		} else {
			$(this.$el).find('a').removeClass('highlight');
		}
	}
	return VueSubListItemComponent;
}

);
