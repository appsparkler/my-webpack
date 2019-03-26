define(['jquery', 'tracking', 'handlebars', 'helpers', 'personalizationUtils'],
function($, Tracking, Handlebars, helpers, personalizationUtils) {
    'use strict';
    function reflowFooterRfp() {
        var selectFooterRfp = $(".footer-and-social-links").find(".footer-footersubscriptionrfp");
        if ($(window).width() <= 1099) {
            $(".footer-and-social-links").find(".footer-socialchannelLinks").after(selectFooterRfp);
        } else {
            $(".footer-and-social-links").find(".organizational-footer-links").after(selectFooterRfp);
        }
    }
    if ($(window).width() <= 1099) {
        reflowFooterRfp();
    }
    document.onresize=function(){
        reflowFooterRfp();
    };
    

    var FootersubscriptionRFP = function(elem, componentName) {
        // Keep the following lines at the bottom of the FootersubscriptionRFP function
        var trck = new Tracking(elem, 'FootersubscriptionRFP'), links;
        personalizationUtils.myKpmgFlyoutUtils.getLinksJson().done(function(data){
            links = data.links;
        });
        $(".authenticatedState").on('click', function(){
            var linkText= $(this).find('button').attr('title');
            var trackingObj={
                "linkLocationID1": "footer_"+linkText.toString(),
                "linkLocationID2": "footer_"+linkText.toString(),
                'linkLocation1': "footer",
                'linkLocation2': "footer",
                'events': 'event11'
            };
            helpers.triggerTracking(trackingObj,'Internal Link');

            if(links.profile.url.length>0){
                personalizationUtils.pathUtils.gotoPage((window.location.origin + links.profile.url));
            }

        });
        function redirectToLogin() {
            var emaiId = $("#email").val();
            sessionStorage.setItem("email_Id", emaiId);
            personalizationUtils.pathUtils.gotoPage((window.location.origin + links.login.url));
        }
        function subscriptionEmailValidation(){
            var re, email;
            //
            email = $("#email").val();
            if(email.length===0){
                $('.emailErrorMsg').text(window.kpmgPersonalize.i18n.gigyaMsgs.this_field_is_required);
                return false;
            }else{
                re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                //
                if(!(re.test(email.toLowerCase()))){
                    $('.emailErrorMsg').text(window.kpmgPersonalize.i18n.gigyaMsgs.email_address_is_invalid);
                }
                return re.test(email.toLowerCase());  
            }       
        }
        $("#email").on('keyup', function(e) {
            if(e.keyCode === 13) {
                if(subscriptionEmailValidation()){
                    $('.emailErrorMsg').hide();
                    redirectToLogin();
                }else{
                    $('.emailErrorMsg').show();
                }
            }
        });
        $("#submit").on('click', function() {
            if(subscriptionEmailValidation()){
                var linkText= $('.module-footersubscriptionrfp').find('.annonymousState').attr('title');
                var trackingObj={
                    "linkLocationID1": "footer_"+linkText.toString(),
                    "linkLocationID2": "footer_"+linkText.toString(),
                    'linkLocation1': "footer",
                    'linkLocation2': "footer",
                    'events': 'event11'
                };
                helpers.triggerTracking(trackingObj,'Internal Link'); 
                
                $('.emailErrorMsg').hide();
                redirectToLogin();
            }else{
                $('.emailErrorMsg').show();
            }
        });

        if (window.footersubscriptioncalloutval === "subscription") {
            if(window.kpmgPersonalize.isPPC) {
                if (personalizationUtils.accountUtils.isLoggedIn()) {
                    $('.module-footersubscriptionrfp .authenticatedState').show();
                }
                else{
                    $('.module-footersubscriptionrfp .annonymousState').show(); 
                }
            }
            else{
                $('.module-footersubscriptionrfp').hide();
            }          
        } else if (window.footersubscriptioncalloutval === "rfp") {
            $('.module-footersubscriptionrfp .rfpCompoent').show();
            $('.module-footersubscriptionrfp').find('.rfpCompoent').off('click').on('click',function(event){
                var linkText= $(this).find('button').attr('title');
                var trackingObj={
                    "linkLocationID1": "footer_"+linkText.toString(),
                    "linkLocationID2": "footer_"+linkText.toString(),
                    'linkLocation1': "footer",
                    'linkLocation2': "footer",
                    'events': 'event11'
                };
                helpers.triggerTracking(trackingObj,'Internal Link');
                var lastvisitedURL = window.location.href,
                redirectURL,rfpPageUrl = $(this).find('button').data('remote');
                localStorage.setItem("lastvisitedURL", lastvisitedURL);
                redirectURL = window.location.origin + rfpPageUrl;
                window.location.href=encodeURI(redirectURL);
            });
        } else {
            $('.module-footersubscriptionrfp ').hide();
        }
        if(personalizationUtils.pathUtils.getURIparam("form")==="rfp") {
            $("#rfp-process-modal").trigger("click");
        }
    };
    $(document).trigger('template.loaded');
    return FootersubscriptionRFP;
});