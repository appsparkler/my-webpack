define(['jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer', 'helpers', 'personalization','personalizationUtils', 'resendVerificationEmail', 'genericErrorDialog'],
    function ($, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer, Helpers, personalization, personalizationUtils, resendVerificationEmail, genericErrorDialog) {
        'use strict';
        var TmplMykpmgdashboard = function (elem) {
            var nav = new Navigation(),
                footer = new Footer(),
                navflyouta = new NavFlyoutA(),
                navflyoutb = new NavFlyoutB(),
                navflyoutc = new NavFlyoutC(),
                $components = $('.component'),
                $kpmgModal = $('#kpmgModal'), links,
                logger = personalizationUtils.loggerUtils,
                ACTIVATION_LINK_EXPIRED_ERRORCODE = 403002,
                ACTIVATION_CODE_REDIRECT_DISABLED = 0,
                ACTIVATION_CODE_REDIRECT_ENABLED = 206005;

            var congratsModal = '<div class="modal fade congratulationsModal" id="congratsModal" role="dialog">' + ' <div class="modal-dialog">' + '<div class="modal-content">' + '<div class="modal-header">' + '<span class="icon-close btn-close close" data-dismiss="modal">' + '<span class="sr-only">' + window.kpmgPersonalize.i18n.customMsgs.close + '</span>' + '</span>' + '<h4 class="congratulationsModal-title">'+ window.kpmgPersonalize.i18n.customMsgs.verify_email_congrats_title +'</h4>' + '</div>' + '<div class="modal-body">' + '<p class="success-msg alert-success">' + '<span class="icon-checkmark"></span>'+ window.kpmgPersonalize.i18n.customMsgs.verify_email_congrats_desc +'</p>' + '</div>' + '<div class="modal-footer">' + '<button type="button" class="btn-default col-md-6 pull-left btn" data-dismiss="modal">' + '<span class="icon-close"></span>' + window.kpmgPersonalize.i18n.customMsgs.close + '</button>' + '</div>' + '</div>' + '</div>' + '</div>';
            $("body").append($(congratsModal));

            $.each($components, function (index, val) {
                var name = $(val).attr('class'),
                    module = name.substring(7, name.indexOf(' '));
                require([module], function (mod) {
                    mod(val, module);
                });
            });
            personalizationUtils.myKpmgFlyoutUtils.getLinksJson().done(function(data) {
                links = data.links;
            });
            if (!personalizationUtils.accountUtils.isLoggedIn() && !window.kpmgPersonalize.misc.isAuthor) {
                personalizationUtils.pathUtils.gotoPage(location.origin + links.login.url);
                return;
            }

            if (localStorage && localStorage.getItem("showCongratsPopUp") && !localStorage.getItem("congratsPopUp")) {
                $('.loading-spinner').show();
                showCongralationsModal();
            }

            function showCongralationsModal() {
                $('.loading-spinner').hide();
                if (localStorage && !localStorage.getItem("congratsPopUp")) {
                    localStorage.setItem("congratsPopUp", "true");
                    localStorage.removeItem("showCongratsPopUp");

                    Helpers.triggerSatteliteTracking("verifiedEmailSticky");

                    $("html, body").animate({
                        scrollTop: 0
                    }, "slow", function () {
                        $("#congratsModal").bs3modal({
                            show: true,
                            backdrop: 'static',
                            keyboard: false
                        });
                    });
                }
            }

            function isCrossSite() {
                var returnValue = false;
                if (!document.referrer.match(encodeURI(window.location.hostname)) && (encodeURI(window.location.search).match("errorCode=" + ACTIVATION_CODE_REDIRECT_DISABLED) || encodeURI(window.location.search).match("errorCode=" + ACTIVATION_CODE_REDIRECT_ENABLED)) && !encodeURI(window.location).match("errorCode=" + ACTIVATION_LINK_EXPIRED_ERRORCODE)) {
                    returnValue = true;
                }
                return returnValue;
            }

            function getAccountInfo() {
                var deferred = $.Deferred();
                if (personalizationUtils.accountUtils.isLoggedIn()) {
                    window.gigya.accounts.getAccountInfo({
                        include: personalizationUtils.constants.UserAccountIncludes.join(','),
                        callback: function (response) {
                            if (response.errorCode === 0) {
                                deferred.resolve(response);
                            } else {
                                deferred.reject("Error in getting account info");
                            }
                        }
                    });
                } else {
                    deferred.reject("User is not logged in");
                }

                return deferred.promise();
            }

            //KPMGS-13079 Error dialog for Cross site subscription flow
            if (personalizationUtils.accountUtils.isLoggedIn() && !personalizationUtils.commonUtils.getValue('cross_site')) {//Show learn more if the user is coming from registration, else check if email verification alert needs to be shown
                var userAccountInfo = personalizationUtils.accountUtils.getInfo();
                     /*prevUrl = document.referrer,
                    registrationUrl = links.registrationInterestsLink.url.split("/"),
                    subscriptionsLinkUrl = links.subscriptionsLink.url.split("/");
                registrationUrl = registrationUrl[registrationUrl.length-1].split(".html");
                registrationUrl = registrationUrl[0];
                subscriptionsLinkUrl = subscriptionsLinkUrl[subscriptionsLinkUrl.length-1].split(".html");
                subscriptionsLinkUrl = subscriptionsLinkUrl[0];

                if ((prevUrl.indexOf(registrationUrl) > -1 || prevUrl.indexOf(subscriptionsLinkUrl) > -1) && !window.kpmgPersonalize.misc.isAuthor) {
                    setTimeout(function() {

                        var url = links.learnmore.url;
                        $(".module-tmpl-mykpmgdashboard").append("<a href=" + url + " style='display:none' data-modal-url=" + url + "  data-target='#kpmgModal'  data-remote=" + url + "  data-toggle='modal' data-backdrop='static' class='learnmore'> Learn More </a>");
                        $(".learnmore").off("click").trigger("click");
                    }, 1000);
                } else {*/
                //Supress verify email modal when RS OPP/Generic modal is shown - KPMGS-14867
                var crossSite = isCrossSite();

                if (crossSite && !userAccountInfo.isVerified && !window.kpmgPersonalize.misc.isAuthor) {
                    $('.loading-spinner').show();
                    $.when(getAccountInfo())
                        .done(function (response) {
                            personalizationUtils.accountUtils.setInfo(response);
                            $('#emailVerifyStickyBar').trigger('show:hide');
                            personalization.showAsterisk();
                            showCongralationsModal();
                        }).fail(function (response) {
                            $('.loading-spinner').hide();
                            genericErrorDialog.showDialog();
                            logger.error("Error in Setting data.\n\tMSG:", response.errorMessage);
                        });

                }

                if (!window.kpmgPersonalize.rsOppShown && !window.kpmgPersonalize.rsGenericShown) {
                    if (!crossSite) {
                        resendVerificationEmail.validate();
                    }
                }
                /*}*/
            }


            $kpmgModal
                .on('loaded.bs3.modal', handleRemoteModalLoaded)
                .on('hide.bs3.modal', handleModalClosed);

            function handleRemoteModalLoaded(evt) {
                var $currentTarget = $(evt.currentTarget);

                //Add the module classes into the condition for which you want to add theme-grey class
                if ($currentTarget.find('.module-contentrefreshfeedback').length || $currentTarget.find('.module-addtolibraryoverlay').length) {
                    $currentTarget.addClass('theme-gray').trigger('focus');
                }
            }

            function handleModalClosed(evt) {
                $(evt.currentTarget).removeClass('theme-gray');
            }

            $(document).trigger('template.loaded');
        };

        $(function () {
            var tmpl = new TmplMykpmgdashboard();
        });
    }
);
