define(['jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer', 'personalizationUtils', 'resendVerificationEmail'],
    function($, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer, personalizationUtils, resendVerificationEmail) {
        'use strict';

        var TmplTouchBlogHome = function(elem) {
            var nav             = new Navigation(),
                footer          = new Footer(),
                navflyouta       = new NavFlyoutA(),
                navflyoutb       = new NavFlyoutB(),
                navflyoutc       = new NavFlyoutC(),
                $components     = $('.component'),
                $kpmgModal      = $('#kpmgModal'),links;

            $.each($components, function(index, val) {
                var name = $(val).attr('class'),
                    module = name.substring(7, name.indexOf(' '));

                require([module], function(mod) {
                    mod(val);
                });
            });
            personalizationUtils.myKpmgFlyoutUtils.getLinksJson().done(function(data) {
                links = data.links;
            });

            if (personalizationUtils.accountUtils.isLoggedIn() && !personalizationUtils.commonUtils.getValue('cross_site')) {//Show learn more if the user is coming from registration, else check if email verification alert needs to be shown
                var userAccountInfo = personalizationUtils.accountUtils.getInfo(),
                    prevUrl = document.referrer,
                    registrationUrl = links.registrationInterestsLink.url.split("/"),
                    subscriptionsLinkUrl = links.subscriptionsLink.url.split("/");
                registrationUrl = registrationUrl[registrationUrl.length-1].split(".html");
                registrationUrl = registrationUrl[0];
                subscriptionsLinkUrl = subscriptionsLinkUrl[subscriptionsLinkUrl.length-1].split(".html");
                subscriptionsLinkUrl = subscriptionsLinkUrl[0];

                if (((prevUrl && registrationUrl && prevUrl.indexOf(registrationUrl) > -1) || (prevUrl && subscriptionsLinkUrl && prevUrl.indexOf(subscriptionsLinkUrl) > -1)) && !window.kpmgPersonalize.misc.isAuthor) {
                    setTimeout(function() {

                        var url = links.learnmore.url;
                        $(".module-tmpl-touch-blog-home").append("<a href=" + url + " style='display:none' data-modal-url=" + url + "  data-target='#kpmgModal'  data-remote=" + url + "  data-toggle='modal' data-backdrop='static' class='learnmore'> Learn More </a>");
                        $(".learnmore").off("click").trigger("click");
                    }, 1000);
                } else {
                    //Supress verify email modal when RS OPP/Generic modal is shown - KPMGS-14867
                    if(window.kpmgPersonalize.oppModalVerified) {
                        if(!window.kpmgPersonalize.rsOppShown && !window.kpmgPersonalize.rsGenericShown) {
                            resendVerificationEmail.validate();
                        }
                    } else {
                        document.addEventListener("oppModal", function() {
                            if(!window.kpmgPersonalize.rsOppShown && !window.kpmgPersonalize.rsGenericShown) {
                                resendVerificationEmail.validate();
                            }
                        });
                    }

                }
            }

            $(document).trigger('template.loaded');
        };

        $(function(){
            var tmpl = new TmplTouchBlogHome();
        });
    }
);
