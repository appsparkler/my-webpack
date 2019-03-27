define(['jquery', 'tracking', 'personalizationUtils'],
    function($, Tracking, personalizationUtils) {
        'use strict';

        var Registrationpagetitle = function(elem) {
            var $regTitleD = $('#regTitleD'),
                $regTitleM = $('#regTitleM'),
                $regDescD = $('#regDescD'),
                $regDescM = $('#regDescM'),
                $regBanner = $('#regBanner'),
                origin = personalizationUtils.commonUtils.getUrlParamsObj().origin || '',
                accountInfo = personalizationUtils.accountUtils.getInfo(),
                subscriptionOptIn = accountInfo && accountInfo.subscriptions && accountInfo.subscriptions.subscription_opt_in && accountInfo.subscriptions.subscription_opt_in.email && accountInfo.subscriptions.subscription_opt_in.email.isSubscribed,
                regTitleD = '',
                regTitleM = '',
                regDescD = '',
                regDescM = '',
                imgSrc = '',
                altText = '',
                fontColor = '';
            var pCurrentPage = "";

            if( $('section.module-registrationuserinfo').length > 0 ){
                pCurrentPage = "Registration_Page";
            }
            else if( $('section.module-loginform').length > 0){
                pCurrentPage = "Login_Page";
            }
            else if( $('section.module-registrationinterests').length > 0){
                pCurrentPage = "Registration_Interest_Page";
            }
            else if( $('section.module-subscription-preferences').length > 0){
                pCurrentPage = "Subscription-Preferences_Page";
            }

            $(".reg-section").addClass("white-background");

            if(!window.kpmgPersonalize.isPPC || subscriptionOptIn === false) {
                // registration-interests.html -- final.

                $('#counterSecond_b').removeClass("hideBlock");
                $('#counterSecond_b').addClass("cursor-pointer");
                $('.parent-container').addClass("withTwoCounter");
                
                regTitleD = $regTitleD.data('reg-title');
                regTitleM = $regTitleM.data('reg-title');
                regDescD = $regDescD.data('reg-desc');
                regDescM = $regDescM.data('reg-desc');
                imgSrc = $regBanner.data('img');
                altText = $regBanner.data('alt');
                fontColor = $regBanner.data('font');

            } else if(window.kpmgPersonalize.isPPC) {
                if( origin || personalizationUtils.commonUtils.getValue('origin') ) {

                    // second stage
                    if( pCurrentPage === "Subscription-Preferences_Page" ){
                        $('#counterSecond_b').removeClass("hideBlock");
                        $('#counterThird').removeClass("hideBlock");
                        $('#counterThird').addClass("cursor-pointer");
                    }

                    // third stage
                    if( pCurrentPage === "Registration_Interest_Page" ){
                        $('#counterSecond_a').removeClass("hideBlock");
                        $('#counterSecond_a').addClass("cursor-pointer");

                        $('#counterThird').removeClass("hideBlock");
                        $('#counterThird').addClass("cursor-pointer");
                    }                    

                    regTitleD = $regTitleD.data('reg-title3');
                    regTitleM = $regTitleM.data('reg-title3');
                    regDescD = $regDescD.data('reg-desc3');
                    regDescM = $regDescM.data('reg-desc3');
                    imgSrc = $regBanner.data('img3');
                    altText = $regBanner.data('alt3');
                    fontColor = $regBanner.data('font3');

                } else {
                    // registration page
                    // registration-interests.html
                    // registration-subscriptions.html

                    // second stage
                    if( pCurrentPage === "Registration_Interest_Page" ){
                        $('#counterSecond_b').removeClass("hideBlock");

                        $('#counterThird').removeClass("hideBlock");
                        $('#counterThird').addClass("cursor-pointer");
                    }

                    // third stage
                    if( pCurrentPage === "Subscription-Preferences_Page" ){
                        $('#counterSecond_a').removeClass("hideBlock");
                        $('#counterSecond_a').addClass("cursor-pointer");

                        $('#counterThird').removeClass("hideBlock");
                        $('#counterThird').addClass("cursor-pointer");
                    }

                    regTitleD = $regTitleD.data('reg-title2');
                    regTitleM = $regTitleM.data('reg-title2');
                    regDescD = $regDescD.data('reg-desc2');
                    regDescM = $regDescM.data('reg-desc2');
                    imgSrc = $regBanner.data('img2');
                    altText = $regBanner.data('alt2');
                    fontColor = $regBanner.data('font2');
                }
            }

            // font color obtained from authored.
            $regTitleD.html(regTitleD).css('color', fontColor);
            $regTitleM.html(regTitleM).css('color', fontColor);
            $regDescD.html(regDescD).css('color', fontColor);
            $regDescM.html(regDescM).css('color', fontColor);
            
            $regBanner.attr('src', imgSrc);
            $regBanner.attr('alt', altText);

            
            if( pCurrentPage === "Registration_Page" ){
                $('.reg-container').css("width","95%");
            }

            if( (pCurrentPage === "Registration_Interest_Page") || (pCurrentPage === "Subscription-Preferences_Page")  ){
                $('#stepCounterContainerId').removeClass("hideBlock");
                $('#regBanner').css('visibility','hidden');
            }

            // Keep the following lines at the bottom of the Registrationpagetitle function
            var trck = new Tracking(elem, 'Registrationpagetitle');
            $(document).trigger('template.loaded');
        };

        return Registrationpagetitle;
    }
);