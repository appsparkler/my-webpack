/* global calanderProperties */
/* global dateFormatProperties */
define(['jquery', 'tracking', 'jquerymobilereflow', 'handlebars', 'helpers', 'personalizationUtils'],
    function($, Tracking, mobileReflow, Handlebars, helpers, personalizationUtils) {
        'use strict';
        var MyKpmgPromob = function(elem, componentName) {
            // Keep the following line at the bottom of the MyKpmgPromo function
            var tracking = new Tracking(elem, 'MyKpmgPromo');
            var hideInTemplate = $(".module-mykpmgpromob").closest('.col-top').attr('hidePromoInTemplate') || "false";

            $(document).on('mobileBreakpoint', function() {
                if ($(".mykpmgpromo-design")) {
                    $(".mykpmgpromo-design").removeClass('mykpmgpromo-design');
                }
            });
            $(document).on('desktopBreakpoint', function() {
                if ($(".module-mykpmgpromob")) {
                    $(".module-mykpmgpromob").closest('.col-top').addClass('mykpmgpromo-design');
                }
            });

            $('.module-mykpmgpromob .unknown-user').hide();
            $('.module-mykpmgpromob .new-user').hide();
            $('.module-mykpmgpromob .non-new-user').hide();

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
                    $(".module-mykpmgpromob").prev().removeAttr('style').css('display', 'block');
                    $(".module-mykpmgpromob").closest('.col-top').addClass('mykpmgpromo-design').css({
                            "background": "#fff",
                            "height":"0px"
                        });

                    $(".module-mykpmgpromob").closest('.col-top').addClass('promotional-cell-hover');
                    $(".module-mykpmgpromob").css('display', 'none');
                    $(".module-mykpmgpromob").prev().removeClass('promotional-cell-hover');
                } else {
                    var userAccountInfo = personalizationUtils.accountUtils.getInfo(),
                        storageKey = 'loginCount' + userAccountInfo.UID,
                        registeredDate = (helpers.dateFormat(userAccountInfo.created)).toString(),
                        formattedDate = registeredDate.substring(4, 10) + ', ' + registeredDate.substring(11, 15) + '.',
                        nameSwitch = $(".module-mykpmgpromob").data('name-switch');
                    if(nameSwitch){
                        $('.module-mykpmgpromob .first-name').text(userAccountInfo.profile.lastName + ' ');
                        $('.module-mykpmgpromob .last-name').text(userAccountInfo.profile.firstName);
                    }else{
                        $('.module-mykpmgpromob .first-name').text(userAccountInfo.profile.firstName + ' ');
                        $('.module-mykpmgpromob .last-name').text(userAccountInfo.profile.lastName);
                    }
                    $('.module-mykpmgpromob .non-new-user .logged-in-time').text(formattedDate);

                    localStorage[storageKey] = localStorage[storageKey] || '0';

                    if (parseInt(localStorage[storageKey]) < 5 && personalizationUtils.accountUtils.getPreferencesCount().total === 0) {
                        $('.module-mykpmgpromob .new-user').show();
                    } else {

                        $('.module-mykpmgpromob .non-new-user').show();
                    }
                }
            } else {
                if (hideInTemplate === "true" && window.kpmgPersonalize.misc.isSitePersonalizeAndRhfEnabled === "true" && !window.kpmgPersonalize.misc.isAuthor) {
                    $(".module-mykpmgpromob").prev().css('display', 'none');
                    $('.module-mykpmgpromob .unknown-user').css({
                        "visibility": "visible",
                        "display": "block"
                    });
                    $('.module-mykpmgpromob').css({
                        "display":"block",
                        "visibility": "visible"
                    });
                    $(".module-mykpmgpromob").closest('.col-top').removeClass('promotional-cell-hover');
                } else {
                    if (hideInTemplate === "true" && !window.kpmgPersonalize.misc.isAuthor) {
                        $(".module-mykpmgpromob").prev().hide();
                    }
                    if (hideInTemplate === "true" && window.kpmgPersonalize.misc.isAuthor) {
                        $(".module-mykpmgpromob").prev().removeAttr('style').css('display', 'block');
                        $(".module-mykpmgpromob").closest('.col-top').addClass('mykpmgpromo-design').css({
                            "background": "#fff",
                            "height":"0px"
                        });
                    }
                    $('.module-mykpmgpromob .unknown-user').show();
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
                    var cellWrapperElement = $('.inner-container').find('.module-mykpmgpromob>a');
                    cellWrapperElement.attr('title', $('.inner-container').find('.module-mykpmgpromob .non-new-user a').text());
                    $('.inner-container .module-mykpmgpromob').closest('[data-desktop-cell]').attr('title', cellWrapperElement.attr('title'));
                }else{
                    var promoTitleVal = $('.mykpmgpromo-design').children().closest('div').closest('[title]').attr('title');
                    $('.mykpmgpromo-design').attr('title',promoTitleVal);
                }
            } else {
                $('.inner-container .module-mykpmgpromob').closest('[data-desktop-cell]').attr('title', $('.inner-container').find('.module-mykpmgpromob a').attr('title'));
            }

            $('.inner-container .module-mykpmgpromob').parent().on('click', '.non-new-user', function(e) {
                if (personalizationUtils.accountUtils.isLoggedIn()) {
                    /*if RHF enabled and hideintemplate is true, it means for loggedin users promotional component will be displayed,
                    * thus the link to dashboard is no longer required.
                    */
                    if(hideInTemplate !== "true" && window.kpmgPersonalize.misc.isSitePersonalizeAndRhfEnabled !== "true"){
                        if ($(e.target).is("div") || $(e.target).is("p") || $(e.target).is("span") || $(e.target).is("img") ) {
                            e.stopImmediatePropagation();
                            window.location.href = $('.inner-container').find('.module-mykpmgpromob .non-new-user a').attr('href');
                        }
                    }else{
                        if(window.kpmgPersonalize.misc.isSitePersonalizeAndRhfEnabled ==="true"){
                            e.stopImmediatePropagation();
                            window.location.href = $('.inner-container').find('.module-mykpmgpromob .non-new-user a').attr('href');
                        }
                        else if ($(e.target).is("div")) {
                            e.stopImmediatePropagation();
                            window.location.href = $(".module-mykpmgpromob").prev().find('section').find('a').attr('href');
                        }
                    }
                }
            });

            $(document).trigger('template.loaded');
        };
        $(".module-mykpmgpromob").closest('.col-top').removeClass('mykpmgpromo-design');
        return MyKpmgPromob;

    }
);