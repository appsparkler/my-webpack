define(['jquery', 'clamp', 'tracking', 'handlebars', 'owl', 'helpers', 'handlebarshelpers', 'personalizationUtils', 'genericErrorDialog'],
    function($, $clamp, Tracking, Handlebars, owl, Helpers, Handlebarshelpers, personalizationUtils, genericErrorDialog) {
        'use strict';

        var Mykpmgflyout = function(elem, componentName) {
            // Keep the following lines at the bottom of the Mykpmgflyout function
            var tracking = new Tracking(elem, 'Mykpmgflyout'),
                regExReplacementStr,
                authorPrefix = (window.kpmgPersonalize.misc.isAuthor ? '/content/kpmgpublic' : ''),
                localeObj = personalizationUtils.accountUtils.getLocale(),
                localeStr = '/' + localeObj.countryCode + '/' + localeObj.languageCode + '/',
                isMobileDevice = window.matchMedia("all and (max-width: 641px)").matches,
                count = 0,
                logoutModal = {}, links;

            logoutModal.templateHTML = '<div class="modal fade logoutModal" tabindex="0" id="logoutModal" role="alert">' +
                '<div class="modal-dialog">' +
                    '<div class="modal-content" role="dialog" aria-labelledby="logoutTitle ">' +
                        '<div class="modal-header">' +
                            '<span class="icon-close btn-close close logoutCTA" data-dismiss="modal">' +
                                '<span class="sr-only modal-title"></span>' +
                            '</span>' +
                            '<h4 class="logoutModal-title" id="logoutTitle">' + window.kpmgPersonalize.i18n.customMsgs.logoutinfo + '</h4>' +
                        '</div>' +
                        '<div class="modal-body logoutbody">' +
                            '<div class="success-msg alert-success"><span class="icon-checkmark"></span>' + window.kpmgPersonalize.i18n.customMsgs.logoutdescription + '</div>' +
                        '</div>' +
                        '<div class="modal-footer">' +
                            '<div class="col-md-5 close-align">' +
                                '<button type="button" class="btn logoutCTA" id="logoutCTA" data-dismiss="modal">' +
                                    '<span class="icon-close"></span>' + window.kpmgPersonalize.i18n.customMsgs.close +
                                '</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';

            if (window.kpmgPersonalize.misc.isAuthor) {
                regExReplacementStr = "/$1/$2" + localeStr;
            } else {
                regExReplacementStr = localeStr;
            }

            $(document).ready(function() {
                if (!window.kpmgPersonalize.misc.isAuthor) {
                    personalizationUtils.myKpmgFlyoutUtils.getLinksJson().done(function(data) {
                        links = data.links;
                        var url = links.learnmore.url;
                        $(".logged-in-list li a, .nonlogged-in-list li a").each(function() {
                            if ($(this).attr("href").indexOf("/kpmglearnmore") > -1) {
                                $(this).attr({
                                    'data-modal-url': url,
                                    'data-remote': url,
                                    'data-target': '#kpmgModal',
                                    'data-toggle': 'modal',
                                    'data-backdrop': 'static'
                                });
                            }
                        });
                    });
                }

                setTimeout(function() {
                    $('.sidr a[href*="/home/user/overlays/kpmglearnmore"]').on('click', function (e) {
                        e.preventDefault();
                        var url = window.kpmgPath.substring(0, 6) + '/home/user/overlays/kpmglearnmore.html';

                        window.kpmg.modalOpenerUrl = url;
                        $('#kpmgModal').bs3modal({
                            backdrop: 'static',
                            keyboard: false,
                            remote: url,
                            modalUrl: url
                        });
                    });
                }, 0);

            });

            //Update user registered locale information
            $(".logged-in-list li a, .nonlogged-in-list li a").each(function() {
                var jqWrap = $(this),
                    href = jqWrap.data("uri");
                if (href) {
                    jqWrap.attr("href", href.replace(/^\/(\w+)\/(\w+)\/(\w+)\/(\w+)\//, regExReplacementStr));
                }
            });

            function addGigyaListeners() {
                window.gigya.accounts.addEventHandlers({
                    onLogout: function () {
                        personalizationUtils.accountUtils.clearInfo();
                        personalizationUtils.storeUtils.setUserLibrary({});
                    }
                });
            }

            personalizationUtils.commonUtils.checkForGigyaObject(addGigyaListeners);

            if (personalizationUtils.accountUtils.isLoggedIn()) {
                window.digitalData.user.gigyaID = window.kpmgPersonalize.personalizationUtils.accountUtils.getInfo().UID;
                window.digitalData.login={
                    loginStatus:'Logged-In'
                };
                if(window.kpmgPersonalize.personalizationUtils.accountUtils.getInfo().loginProvider==="site"){
                    window.digitalData.Register={
                        RegistrationMethod:"Form Registration"
                    };
                }else{
                    window.digitalData.Register={
                        RegistrationMethod:window.kpmgPersonalize.personalizationUtils.accountUtils.getInfo().loginProvider
                    };
                }
                $('.logged-in-list', elem).show();
                $('li.nav-primary-menu-item.kpmg-menu').show();
                $('.mobile-mykpmgflyout').show();
                if (isMobileDevice) {
                    $('.module-quickselectoroverlay').addClass("quickselector-personalised");
                }
                $('.mobile-lang').addClass("mobile-lang-personalised");
                $('.kpmg-menu .icon-user').removeClass('icon-user').addClass('icon-person1');
                $('.mobile-mykpmgflyout .icon-user').removeClass('icon-user').addClass('icon-person1');
                $(".mobile-utility-toggle-search").on('click', function() {
                    $(".mobile-mykpmgflyout").hide();
                });
                $(".mobile-search-form a").on('click', function() {
                    $(".mobile-mykpmgflyout").show();
                });

                $('.logged-in-list li:last a', elem)
                    .attr("onclick", "return false")
                    .on('click', function(event) {
                        //Check if user has made any changes in interests
                        if (window.kpmgPersonalize.interestsChange) {
                            $(document).trigger('logout.click');
                            return false;
                        }
                        Mykpmgflyout.logoutUser();
                    });

                personalizationUtils.myKpmgFlyoutUtils.getLinksJson()
                    .done(function (data) {
                        var order = ['dashboard', 'library', 'aboutmykpmg', 'interests', 'profile', 'logout'];
                        $(".kpmg-menu-title").html(data.myKPMGLabel);
                        $('.logged-in-list li a', elem).each(function (index) {
                            $(this)
                                .attr('href', authorPrefix + data.links[order[index]].url)
                                .html(data.links[order[index]].label);
                        });
                        $('.navflyoutb-feature-link', elem)
                            .find('img')
                            .attr('src', data.myNavigationPromo.image)
                            .end()
                            .find('a')
                            .attr('href', authorPrefix + data.myNavigationPromo.url)
                            .attr('data-desktop', data.myNavigationPromo.url)
                            .attr('alt', data.myNavigationPromo.altText)
                            .end()
                            .find('a h3.navflyoutb-heading')
                            .html(data.myNavigationPromo.title)
                            .end()
                            .find('p.navflyoutb-description')
                            .html(data.myNavigationPromo.description)
                            .end()
                            .find('.navflyoutb-uppercase')
                            .html(data.myNavigationPromo.readMOreLabel);
                    });
                $('.logged-in-list li:nth-child(3)', elem).find("a").attr("oncontextmenu", "return false"); // disable right click
            }
            else if (window.kpmgPersonalize.isSitePersonalize || window.kpmgPersonalize.misc.isAuthor) {
                if(!window.kpmgPersonalize.misc.isAuthor){
                    window.digitalData.user.gigyaID = '';
                    window.digitalData.login={
                        loginStatus:'Logged-Out'
                    };
                }
                $('.nonlogged-in-list', elem).show();
                $('li.nav-primary-menu-item.kpmg-menu').show();
                $('.mobile-mykpmgflyout').show();
                $('.nonlogged-in-list li:last', elem).find("a").attr("oncontextmenu", "return false"); // disable right click
                $('.mobile-lang').addClass("mobile-lang-personalised");
                if (isMobileDevice) {
                    $('.module-quickselectoroverlay').addClass("quickselector-personalised");
                }
                $('.kpmg-menu .icon-person1').removeClass('icon-person1').addClass('icon-user');
                $('.mobile-mykpmgflyout .icon-person1').removeClass('icon-person1').addClass('icon-user');
            }

            $('.nonlogged-in-list a').off().on('click', function(event) {
                //event.stopPropagation();
                mykpmgflyouttracking(event);
            });

            var winkpmgpath = window.location.pathname;

            Mykpmgflyout.logoutUser = function() {
                window.gigya.accounts.logout({
                    callback: function(response) {
                        if (response.errorCode) {
                            console.error("Error occurred in logout.\n\tMSG: " + response.errorMessage);
                            genericErrorDialog.showDialog();
                        } else {
                            sessionStorage.removeItem("verifyEmailAlert");
                            $("body").append(logoutModal.templateHTML);
                            $("#logoutModal").bs3modal();
                            $("#logoutModal .logoutCTA").on("click", function() {
                                var homeURL = winkpmgpath.split('/').slice(0, (window.kpmgPersonalize.misc.isAuthor ? 3 : 1));
                                homeURL.push(localeObj.countryCode, localeObj.languageCode, "home.html");
                                tracking.satelliteTracking({
                                    'Profile': {
                                        ProfileManagement: 'Logout'
                                    }
                                }, 'profileManagement', false);
                                tracking.track('profileManagement');
                                // setting logout status based on personalization status
                                if( window.kpmgPersonalize.isSitePersonalize ) {
                                    tracking.satelliteTracking({
                                        'login': {
                                            loginStatus: 'Logged-Out'
                                        }
                                    }, 'profileManagement', false);
                                }
                                window.location = homeURL.join("/");
                            });
                        }
                    }
                });
            };

            function mykpmgflyouttracking(event) {
                if ($(event.target).attr('data-name') === "register") {
                    window.location.href = $(event.target).attr('href');
                } else if ($(event.target).attr('data-name') === "login") {
                    tracking.satelliteTracking({
                        'Profile': {
                            ProfileManagement: "SignInMethod"
                        }
                    }, 'ProfileManagementStart', false);
                    tracking.track('ProfileManagementStart',event.currentTarget.text);
                    window.location.href = $(event.target).attr('href');
                } else {
                    return true;
                }
            }

            $(document).trigger('template.loaded');
        };

        return Mykpmgflyout;
    }
);
