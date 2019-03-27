define(['vue'], 


function MobileMenuToggleAndMenu(Vue){
	'use strict';
	//
	var VueMobileMenuToggleAndMenuComponent;
	//	
	VueMobileMenuToggleAndMenuComponent = Vue.component('mobile-menu-toggle-and-menu',{
		template: '#mobile-menu-toggle-and-menu-component-template',
		data: function() {
			return {
				isMenuVisible: false,
				isFirstTime: true
			};
		},
		computed:{
			isMobile: function(){
				var result;
				try{
					if(window.innerWidth < 1100){
						result = true;
					}else{
						result = false;
					}					
				}catch(e){
					console.log('error in vue mobile check');
				}
				return result;
			}
		},
		props: ['vm']
	});
	//
	return VueMobileMenuToggleAndMenuComponent;
}

);