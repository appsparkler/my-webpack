define(['jquery', 'tracking', 'jquerymobilereflow', 'handlebars', 'helpers', 'personalizationUtils'],
    function($, Tracking, mobileReflow, Handlebars, helpers, personalizationUtils) {
        'use strict';

        var TouchMykpmgpromo = function(elem) {

            var tracking = new Tracking(elem, 'TouchMykpmgpromo'),
                hideInTemplate = $(".module-touch-mykpmgpromo").closest('.col-top').attr('hidePromoInTemplate') || "false";

            $(document).on('mobileBreakpoint', function() {
                if ($(".mykpmgpromo-design")) {
                    $(".mykpmgpromo-design").removeClass('mykpmgpromo-design');
                }
            });
            $(document).on('desktopBreakpoint', function() {
                if ($(".module-touch-mykpmgpromo")) {
                    $(".module-touch-mykpmgpromo").closest('.col-top').addClass('mykpmgpromo-design');
                }
            });

            $('.module-touch-mykpmgpromo .unknown-user').hide();
            $('.module-touch-mykpmgpromo .new-user').hide();
            $('.module-touch-mykpmgpromo .non-new-user').hide();

            $('.learnmore-link', elem)
                .attr("oncontextmenu", "return false")
                .on('focus', function() {
                    $(this).addClass('focusOutline');
                })
                .on('blur', function() {
                    $(this).removeClass('focusOutline');
                });

            if (personalizationUtils.accountUtils.isLoggedIn()) {
                /*if hideinTemplate is true and if revised header and footer is enabled hide the displayed
                 * mykpmgpromo component and show the underlying promotional component
                 * else, show the mykpmgpromo component for standard header and footer.
                 */
                if (hideInTemplate === "true" && window.kpmgPersonalize.misc.isSitePersonalizeAndRhfEnabled === "true" && !window.kpmgPersonalize.misc.isAuthor) {
                    $(".module-touch-mykpmgpromo").prev().removeAttr('style').css('display', 'block');
                    $(".module-touch-mykpmgpromo").closest('.col-top').addClass('mykpmgpromo-design').css({
                            "background": "#fff",
                            "height":"0px"
                        });

                    $(".module-touch-mykpmgpromo").closest('.col-top').addClass('promotional-cell-hover');
                    $(".module-touch-mykpmgpromo").css('display', 'none');
                    $(".module-touch-mykpmgpromo").prev().removeClass('promotional-cell-hover');
                } else {
                    var userAccountInfo = personalizationUtils.accountUtils.getInfo(),
                        storageKey = 'loginCount' + userAccountInfo.UID,
                        registeredDate = (helpers.dateFormat(userAccountInfo.registered)).toString(),
                        formattedDate = registeredDate.substring(4, 10) + ', ' + registeredDate.substring(11, 15) + '.';

                    $('.module-touch-mykpmgpromo .first-name').text(userAccountInfo.profile.firstName + ' ');
                    $('.module-touch-mykpmgpromo .last-name').text(userAccountInfo.profile.lastName);
                    $('.module-touch-mykpmgpromo .non-new-user .logged-in-time').text(formattedDate);

                    localStorage[storageKey] = localStorage[storageKey] || '0';

                    if (parseInt(localStorage[storageKey]) < 5 && personalizationUtils.accountUtils.getPreferencesCount().total === 0) {
                        localStorage[storageKey] = parseInt(localStorage[storageKey]) + 1;
                        $('.module-touch-mykpmgpromo .new-user').show();
                    } else {

                        $('.module-touch-mykpmgpromo .non-new-user').show();
                    }
                }
            } else {
                if (hideInTemplate === "true" && window.kpmgPersonalize.misc.isSitePersonalizeAndRhfEnabled === "true" && !window.kpmgPersonalize.misc.isAuthor) {
                    $(".module-touch-mykpmgpromo").prev().css('display', 'none');
                    $('.module-touch-mykpmgpromo .unknown-user').css({
                        "visibility": "visible",
                        "display": "block"
                    });
                    $('.module-touch-mykpmgpromo').css({
                        "display":"block",
                        "visibility": "visible"
                    });
                    $(".module-touch-mykpmgpromo").closest('.col-top').removeClass('promotional-cell-hover');
                } else {
                    if (hideInTemplate === "true" && !window.kpmgPersonalize.misc.isAuthor) {
                        $(".module-touch-mykpmgpromo").prev().hide();
                    }
                    if (hideInTemplate === "true" && window.kpmgPersonalize.misc.isAuthor) {
                        $(".module-touch-mykpmgpromo").prev().removeAttr('style').css('display', 'block');
                        $(".module-touch-mykpmgpromo").closest('.col-top').addClass('mykpmgpromo-design').css({
                            "background": "#fff",
                            "height":"0px"
                        });
                    }
                    $('.module-touch-mykpmgpromo .unknown-user').show();
                }
            }


            if (!window.kpmgPersonalize.misc.isAuthor) {
                personalizationUtils.myKpmgFlyoutUtils.getLinksJson().done(function(data) {
                    var links = data.links;
                    var url = links.learnmore.url;
                    $("[data-name='learnmore']").attr({
                        'data-modal-url': url,
                        'data-remote': url,
                        'data-target': '#kpmgModal',
                        'data-toggle': 'modal',
                        'data-backdrop': 'static'
                    });
                });
            }
            if (personalizationUtils.commonUtils.isMobile()) {
                $(".non-new-user .image-title p").text($(".non-new-user .image-title p").text().split(',')[0]);
            }

            $('.my-kpmg-profile').on('click', function() {
                /*tracking.satelliteTracking({
                    'link': {
                        LinkName: $(this).text(),
                        FindingMethod: componentName,
                        internalLink: 'link',
                        internalLinkcategory: componentName
                    }
                }, 'MYKPMGProfile'); */
                tracking.satelliteTracking({}, 'MYKPMGProfile');
            });

            if (personalizationUtils.accountUtils.isLoggedIn()) {
                /*if RHF enabled and hideintemplate is true, it means for loggedin users promotional component will be displayed,
                * thus the title attribute is set in the else part
                */
                if(hideInTemplate !== "true" && window.kpmgPersonalize.misc.isSitePersonalizeAndRhfEnabled !== "true"){
                    var cellWrapperElement = $('.inner-container').find('.module-touch-mykpmgpromo>a');
                    cellWrapperElement.attr('title', $('.inner-container').find('.module-touch-mykpmgpromo .non-new-user a').text());
                    $('.inner-container .module-touch-mykpmgpromo').closest('[data-desktop-cell]').attr('title', cellWrapperElement.attr('title'));
                }else{
                    var promoTitleVal = $('.mykpmgpromo-design').children().closest('div').closest('[title]').attr('title');
                    $('.mykpmgpromo-design').attr('title',promoTitleVal);
                }
            } else {
                $('.inner-container .module-touch-mykpmgpromo').closest('[data-desktop-cell]').attr('title', $('.inner-container').find('.module-touch-mykpmgpromo a').attr('title'));
            }

            $('.inner-container .module-touch-mykpmgpromo').parent().on('click', function(e) {
                if (personalizationUtils.accountUtils.isLoggedIn()) {
                    /*if RHF enabled and hideintemplate is true, it means for loggedin users promotional component will be displayed,
                    * thus the link to dashboard is no longer required.
                    */
                    if(hideInTemplate !== "true" && window.kpmgPersonalize.misc.isSitePersonalizeAndRhfEnabled !== "true"){
                        if ($(e.target).is("div")) {
                            e.stopImmediatePropagation();
                            window.location.href = $('.inner-container').find('.module-touch-mykpmgpromo .non-new-user a').attr('href');
                        }
                    }else{
                        if ($(e.target).is("div")) {
                            e.stopImmediatePropagation();
                            window.location.href = $(".module-touch-mykpmgpromo").prev().find('section').find('a').attr('href');
                        }
                    }
                }
            });

            $('a', elem).on('keyup', function (e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).trigger('focus').addClass("focusOutline");
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });
            $('a', elem).on('keydown', function(e) {
                if( e.which === 9 ) {
                    $(this).removeClass("focusOutline");
                }
                if (e.which === 13) {
                    $(this).trigger("click");
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });

			$(document).trigger('template.loaded');
        };
        $(".module-touch-mykpmgpromo").closest('.col-top').removeClass('mykpmgpromo-design');

        return TouchMykpmgpromo;
    }
);
