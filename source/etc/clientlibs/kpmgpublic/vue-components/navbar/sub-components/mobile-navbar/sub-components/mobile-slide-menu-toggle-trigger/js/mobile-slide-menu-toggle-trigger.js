define(['vue'], 


function MobileSlideMenuToggleTrigger(Vue){
	'use strict';
	//
	var VueMobileSlideMenuToggleTriggerComponent;
	//	
	VueMobileSlideMenuToggleTriggerComponent = Vue.component('mobile-slide-menu-toggle-trigger',{
        template: '#mobile-slide-menu-toggle-trigger-component-template',
        mounted: profileIconCallback,
		methods: {    
			toggleMenu: toggleMenu
		}
	});
	//
	return VueMobileSlideMenuToggleTriggerComponent;
    // private functions
    function toggleMenu() {
        /* jshint validthis:true */
        var $this;
        //
        $this = this;
        this.$parent.isMenuVisible = !this.$parent.isMenuVisible;
        this.$parent.isFirstTime = false;

        //Profile tab toggle functionality
        var profileTab = $('#userprofiledata');
        if( profileTab.hasClass('open') ){
            profileTab.slideUp().removeClass('open');                     
        }

        //Globe Tab toggle functionality on toggleMenu
        var GlobetabOn = $("#language-locale").hasClass("show");
        if(GlobetabOn){
            $("ul.mobile-nav-tab-collapse-triggers-component li[data-target='#language-locale']").trigger("click");
        }


        //If this.$parent.isMenuVisible is false then add slideOutTop Animation
        if(!this.$parent.isMenuVisible){
            $('#kpmg-mobile-nav-dropdown-menu').removeClass('slideInTop').addClass('slideOutTop');
            $('.mobile-menu-backdrop').addClass("collapse");
        }else{
            $('#kpmg-mobile-nav-dropdown-menu').removeClass('slideOutTop').removeClass('collapse').addClass('slideInTop');
            $('.mobile-menu-backdrop').removeClass("collapse");
        }
        
        // always hide the menu when the mobile-slide-menu trigger is clicked
        this.$store.commit('components/SET_ICON_MENU_COLLAPSED', true);
        this.$store.commit('components/SET_SLIDE_MENU_VISIBLE_INFO', this.$parent.isMenuVisible);
        // avoid scrolling on body when slide-menu is open
        toggleBodyFixedPosition();
        //
        function toggleBodyFixedPosition() {
            var styleElemId, styleElement, isMenuVisible;
            //
            isMenuVisible = $this.$store.state.components.slideMenuVisible;
            styleElemId = 'mobile-nav-tab-component-style-el-id';
            styleElement = '<style id="' + styleElemId + '">@media only screen and (max-width: 1100px){body {position:fixed !important;}}</style>';
            //
            if(isMenuVisible) {
                if($('#'+styleElemId).length === 0){
                    $('body').append(styleElement);
                }                
            } else {
                $('#' + styleElemId).remove();
            }
        }
    }

    function profileIconCallback(){
		/*jshint validthis:true */
		
		//Mobile redesign profile icon click event and Mobile close my account flyout using close text
		$('#user-profile-icon, #userprofiledata h3.collapse-cancel-trigger-component').on('click', function(e){
			
			e.preventDefault();
			var closeIcon = $('.mobile-slide-menu-toggle-trigger-component');
			if( closeIcon.hasClass('icon-close') ){
                // Checking Globe icon
                var GlobetabOn = $("#language-locale").hasClass("show");
                if(GlobetabOn){
                    $("ul.mobile-nav-tab-collapse-triggers-component li[data-target='#language-locale']").trigger("click");
                }
                //triggering main nav close icon
				closeIcon.trigger( "click" );
            }            
            
			$('#userprofiledata').slideToggle().toggleClass("open");
            $('.mobile-menu-backdrop').toggleClass("collapse");
            
            toggleBodyFixedPositionForProfile();
	
        });	
        //
        function toggleBodyFixedPositionForProfile(){
            var styleElemId, styleElement, isProfileMenuVisible;
            //
            isProfileMenuVisible = $('#userprofiledata').hasClass('open');
            styleElemId = 'mobile-nav-tab-component-style-el-id';
            styleElement = '<style id="' + styleElemId + '">@media only screen and (max-width: 1100px){body {position:fixed !important;}}</style>';
            //
            if(isProfileMenuVisible) {
                if($('#'+styleElemId).length === 0){
                    $('body').append(styleElement);
                }                
            } else {
                $('#' + styleElemId).remove();
            }
        }
        $('.mobile-nav-slide-menu-component').css('height', window.innerHeight-$('.mobile-navbar-component .navbar .navBackdrop').height() + 'px');
        $(window).on("orientationchange", function() {
            setTimeout(function(){$('.mobile-nav-slide-menu-component').css('height', window.innerHeight-$('.mobile-navbar-component .navbar .navBackdrop').height() + 'px');},100);
        });
	}
}

);