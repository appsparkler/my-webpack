define(['jquery', 'vue'], 


function MobileNavTab($, Vue){
	'use strict';
	//
	var VueMobileNavTab;
	//	
	VueMobileNavTab = Vue.component('mobile-nav-tab',{
		template: '#mobile-nav-tab-component-template',
		props: ['vm'],
		mounted: mountedCallback
	});
	//
	return VueMobileNavTab;
	// private functions
	function mountedCallback() {
		/* jshint validthis:true */
        var $this;
        //
        $this = this;
		//
        $($this.$el).on('show.bs.collapse', function() {
			var collapseId;
			//
			collapseId = this.id;
			$("[data-target='#"+ collapseId +"'][data-toggle=collapse]").removeClass('mb-1');
		});
		
        $($this.$el).on('hide.bs.collapse', function() {
			var collapseId;
			//
			collapseId = this.id;
			$("[data-target='#"+ collapseId +"'][data-toggle=collapse]").addClass('mb-1');
		});
        
        $($this.$el).on('shown.bs.collapse', function() {
            $this.$store.commit('components/SET_ICON_MENU_COLLAPSED', false);
        });
        $($this.$el).on('hidden.bs.collapse', function() {
            $this.$store.commit('components/SET_ICON_MENU_COLLAPSED', true);
        });
	}
}

);