/* global s */
/* global kpmgAssetDomain */
/* global shareProperties */
define(['jquery',
        'handlebars',
        'precompile',
        'cqservice',
        'tracking',
        'helpers',
        'personalizationUtils'
    ],
    function($, Handlebars, PrecompiledHandlebars, Service, Tracking, Helpers,PersonalizationUtils) {
        'use strict';
        var EventTabs = function(elem) {
            /*To prevent multiple intializations on mobile*/
            if (PersonalizationUtils.commonUtils.isDomInitialized(elem)) {
                return;
            }
            PersonalizationUtils.commonUtils.initializeDom(elem);
            $('.cq-element-eventtabs_47bodytext2').css("visibility","hidden");
            $('.cq-element-eventtabs_47bodytext1').css("visibility","hidden");
            var speakersPanel = $(".eventtabs-speakers", elem),
                speakerModal = $('#speaker-tab-quick-view'),
                quickviewpartialComp = 'eventtabs-quickView',
                eventSpeakerpartialComp = 'speakers',
                speakerObject = {
                    service: new Service('eventtabs', {
                        baseUrl: speakersPanel.attr("data-basePath")
                    }),
                    btnWrapper: $(".btn-wrapper-speakers", elem),
                    quickViewTemplate:  PrecompiledHandlebars[quickviewpartialComp],
                    template:  PrecompiledHandlebars[eventSpeakerpartialComp],
                    totalRecords: parseInt(speakersPanel.attr("data-totalRecords")),
                    currentPage: parseInt(speakersPanel.attr("data-currentPage")),
                    recordsPerPage: parseInt(speakersPanel.attr("data-recordsPerPage")),
                    peopleLink: speakersPanel.attr("data-people-link"),
                    contactLink: speakersPanel.attr("data-contact-link"),
                    quickTile: speakersPanel.attr("data-quick-tile"),
                    modalContentPanel: $('.modal-content-panel', speakerModal),
                    btnMore: $(".btn-more", elem),
                    model: []
                },
                tabContainer = $('.tabs-container', elem),
                isFirstLoad = true,
                totalPages = (parseInt(speakerObject.totalRecords / speakerObject.recordsPerPage) + (((speakerObject.totalRecords % speakerObject.recordsPerPage) === 0) ? 0 : 1));
            $('.tabs-container',elem).find('a.tablink').first().addClass('current');
            if(window.kpmgPersonalize.misc.isAuthor) {
                $('.tabs-container',elem).find('a.tablink').next().show();
                $(".bodytext1 h4").html("Body Text - Agenda tab");
                $(".bodytext2 h4").html("Body Text - Guide tab");
            }
            else {
                $('.tabs-container',elem).find('a.tablink').next().hide();
            }
            $('.tabs-container',elem).find('a.tablink').first().next().show();
            $('.tabs-container',elem).find('a.tablink.current').children('.resp-arrow').removeClass('icon-chevron-down').addClass('icon-chevron-up');
           
            $('.tabs-container', elem).find('a.tablink').off('click').on('click', function(e) {
                e.preventDefault();
                var _this = $(this);
                if (_this.hasClass('current')) {
                    _this.children('.resp-arrow').removeClass('icon-chevron-up');
                    _this.children('.resp-arrow').addClass('icon-chevron-down');
                    _this.children().show();
                    _this.removeClass('current');
                    _this.next().hide();
                } else {
                    _this.parent().parent().find('a.tablink').removeClass('current');
                    _this.parent().parent().find('a.tablink').next().hide();
                    _this.parent().parent().find('a.tablink').children('.resp-arrow').removeClass('icon-chevron-up').addClass('icon-chevron-down');
                    _this.children('.resp-arrow').removeClass('icon-chevron-down');
                    _this.children('.resp-arrow').addClass('icon-chevron-up');
                    _this.next().show();
                    _this.addClass('current');
                    if (_this.next().children().hasClass('cq-placeholder-eventtabs_47bodytext2')) {
                        $('.cq-element-eventtabs_47bodytext1').css("visibility","hidden");
                        $('.cq-element-eventtabs_47bodytext2').css("visibility","visible");                      
                    }
                    else if(_this.next().children().hasClass('cq-placeholder-eventtabs_47bodytext1')){
                        $('.cq-element-eventtabs_47bodytext2').css("visibility","hidden");
                        $('.cq-element-eventtabs_47bodytext1').css("visibility","visible");
                    }
                    else{
                        $('.cq-element-eventtabs_47bodytext2').css("visibility","hidden");
                        $('.cq-element-eventtabs_47bodytext1').css("visibility","hidden");
                    }
                }
            });

            speakerObject.service.fetch(handleServiceResultForEvent, 'results', speakerObject.currentPage, speakerObject.recordsPerPage);

            if (speakerObject.totalRecords <= speakerObject.recordsPerPage) {
                speakerObject.btnWrapper.remove();
            } else {
                speakerObject.btnMore.on('click', handleLoadMoreClick);
            }
            if (!(window.kpmg.isMobile && window.kpmg.isPhone)) {
                var evenTabs = $('.module-eventtabs');
                evenTabs.find('.tab-title:first').css('margin-left', '9px');
                evenTabs.find('.tab-title:last').css('margin-right', '9px');
            }


            speakerModal.on("show.bs3.modal", showModal).on("hidden.bs3.modal", hideModal);

            speakerModal.on("shown.bs3.modal", function() {
                $('img.lazy', '#speaker-tab-quick-view').unveil();
                //Accessibility
                $("a", "#speaker-tab-quick-view").on("keyup", function(e) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        if ($(this).is("a") && $(this).find("img").length > 0) {
                            $(this).removeAttr("tabindex").find("img").addClass("focusOutline");
                        } else {
                            $(this).removeAttr("tabindex").addClass("focusOutline");
                        }
                    }
                });
                $("a", "#speaker-tab-quick-view").on("blur", function() {
                    if ($(this).is("a") && $(this).find("img").length > 0) {
                        $(this).find("img").removeClass("focusOutline");
                    } else {
                        $(this).removeClass("focusOutline");
                    }
                });
            });

            function showModal(evt) {
                var opener = $(evt.relatedTarget),
                    indexVal = opener.attr("data-viewindex"),
                    quickViewResult = speakerObject.model[indexVal - 1],
                    _window = $(window);

                if (shareProperties && typeof shareProperties === 'object') {
                    quickViewResult = $.extend(true, quickViewResult, shareProperties);
                }
                speakerObject.modalContentPanel.append(speakerObject.quickViewTemplate(quickViewResult));

                $('#speaker-tab-quick-view .modal-content').css({
                    top: (_window.height() / 2 - 96)
                });

                $("#peoplecontactlink").on('click', function(e) {
                    e.preventDefault();
                    var target = $(e.target);
                    speakerModal.bs3modal('hide');
                    window.kpmg.modalOpenerUrl = target.data('modal-url');
                    $("#kpmgModal").bs3modal({
                        remote: target.data("remote")
                    }).data('opener', target.attr('data-modal-url'));

                });
                Helpers.triggerTracking({
                    "quickView1": $('.secondary-head a', '.modal-content-panel').html(),
                    "events": "event30"
                }, "Article Quick View");
            }

            function hideModal() {
                speakerObject.modalContentPanel.empty();
            }

            if ($(document).width() <= 640) {
                $('.eventtabs-tab #guide').on("click", function() {
                    $(document).scrollTop($('.eventtabs-nav').offset().top - 100);
                });
                $('.eventtabs-tab #speakers').on("click", function() {
                    $(document).scrollTop($('.eventtabs-nav').offset().top - 100);
                });
            } else {
                $('.tabs-container', elem).find('a.tablink').on('click', function(e) {
                    e.preventDefault();
                    var _this = $(this);
                    if (!(_this.hasClass('current'))) {
                        _this.parent().parent().find('a.tablink').removeClass('current');
                        _this.parent().parent().find('a.tablink').next().hide();
                        _this.next().show();
                        _this.addClass('current');
                    }
                });
            }

            //speaker contact link popup
            $('.template').on('click', '.pcfLink', function(e) {
                e.preventDefault();
                var target = $(e.target);
                window.kpmg.modalOpenerUrl = target.data('modal-url');
                $("#kpmgModal").bs3modal({
                    remote: target.data("remote")
                }).data('opener', target.attr('data-modal-url'));
            });

            function handleLoadMoreClick(evt) {
                evt.preventDefault();
                if (speakerObject.currentPage < totalPages) {
                    ++speakerObject.currentPage;
                    if (speakerObject.currentPage === totalPages) {
                        speakerObject.btnWrapper.remove();
                    }
                }
                isFirstLoad = false;
                speakerObject.service.fetch(handleServiceResultForEventLoadMore, 'results', speakerObject.currentPage, speakerObject.recordsPerPage);
            }

            function handleServiceResultForEvent(data) {
                if (typeof data !== 'undefined' && data !== null) {
                    data.reverse();
                }

                $.each(data, function(index, val) {
                    var data_val = {};
                    if (kpmgAssetDomain) {
                        data_val = $.extend(true, val, {
                            "assetDomainName": kpmgAssetDomain
                        });
                    }
                    data_val = $.extend(true, data_val, {
                        "contactFormLinkCopy": speakerObject.contactLink,
                        "peopleContactFormLink": speakerObject.peopleLink,
                        "quickViewInTile": speakerObject.quickTile,
                        indexVal: (speakerObject.model.length + 1)
                    });
                    $.merge(speakerObject.model, [data_val]);
                    if ($(".btn-wrapper-speakers", elem).length !== 0) {
                        $(speakerObject.template(data_val)).insertBefore(speakerObject.btnWrapper);
                    } else {
                        speakersPanel.append(speakerObject.template(data_val));
                    }
                });

                setTimeout(function() {
                    $('img.lazy', speakersPanel).unveil();
                }, 150);
                accessibility();
            }

            function handleServiceResultForEventLoadMore(data) {
                var _this = $(".speaker-data", elem),
                    speakerData = '';
                $.each(data, function(index, val) {
                    var data_val = {};
                    if (kpmgAssetDomain) {
                        data_val = $.extend(true, val, {
                            "assetDomainName": kpmgAssetDomain
                        });
                    }
                    data_val = $.extend(true, data_val, {
                        "contactFormLinkCopy": speakerObject.contactLink,
                        "peopleContactFormLink": speakerObject.peopleLink,
                        "quickViewInTile": speakerObject.quickTile,
                        indexVal: (speakerObject.model.length + 1)
                    });
                    $.merge(speakerObject.model, [data_val]);
                    speakerData = speakerObject.template(data_val);
                    $(_this[_this.length - 1]).after(speakerData);

                });

                setTimeout(function() {
                    $('img.lazy', speakersPanel).unveil();
                }, 150);
                if (!isFirstLoad) {
                    $("#speakers").find("a:first").attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                }
                accessibility();
            }

            $('.module-eventtabs .two-tabs a.tablink.first').on('keydown', function(e) {
                /*if (e.keyCode === 13) {
                    $(".module-eventtabs .tablink.first").addClass('current');
                    $(".module-eventtabs .tablink.second").removeClass('current');
                    $('#agenda').show();
                    $('#guide').hide();
                    e.preventDefault();
                }*/
            });
            $('.module-eventtabs .two-tabs a.tablink.second').on('keydown', function(e) {
                /*if (e.keyCode === 13) {
                    $(".module-eventtabs .tablink.first").removeClass('current');
                    $(".module-eventtabs .tablink.second").addClass('current');
                    $('#agenda').hide();
                    $('#guide').show();
                    e.preventDefault();
                }*/
            });
            $('.module-eventtabs .three-tabs a.tablink.first').on('keydown', function(e) {
                /*if (e.keyCode === 13) {
                    $(".module-eventtabs .tablink.first").addClass('current');
                    $(".module-eventtabs .tablink.second").removeClass('current');
                    $(".module-eventtabs .tablink.third").removeClass('current');
                    $('#agenda').show();
                    $('#speakers').hide();
                    $('#guide').hide();
                    e.preventDefault();
                }*/
            });
            $('.module-eventtabs .three-tabs a.tablink.second').on('keydown', function(e) {
                /*if (e.keyCode === 13) {
                    $(".module-eventtabs .tablink.first").removeClass('current');
                    $(".module-eventtabs .tablink.second").addClass('current');
                    $(".module-eventtabs .tablink.third").removeClass('current');
                    $('#agenda').hide();
                    $('#speakers').show();
                    $('#guide').hide();
                    e.preventDefault();
                }*/
            });
            $('.module-eventtabs .three-tabs a.tablink.third').on('keydown', function(e) {
                /*if (e.keyCode === 13) {
                    $(".module-eventtabs .tablink.first").removeClass('current');
                    $(".module-eventtabs .tablink.second").removeClass('current');
                    $(".module-eventtabs .tablink.third").addClass('current');
                    $('#agenda').hide();
                    $('#speakers').hide();
                    $('#guide').show();
                    e.preventDefault();
                }*/
            });

            function tabClickHandler(e) {
                e.preventDefault();
                var _this = $(e.target);
                if (_this.hasClass('icon-chevron-right')) {
                    _this = _this.parents('a');
                }
                if (_this.hasClass('current')) {
                    _this.next().hide();
                    _this.removeClass('current');
                } else {
                    $('.custom-tab-content', elem).hide();
                    _this.next().show();                  
                    $('a.tablink', elem).removeClass('current');
                    _this.addClass('current');
                }
            }

            function accessibility() {
                //Accessibility
                if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                    $("a", elem).on("keyup", function(e) {
                        if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                            $(this).attr("tabindex", "-1").trigger('focus').addClass("focusOutline-moz");
                        }
                    });
                    $("a", elem).on("blur", function() {
                        $(this).removeAttr("tabindex").removeClass("focusOutline-moz");
                    });
                } else {
                    $("a", elem).on("keyup", function(e) {
                        if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                            $(this).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                        }
                    });
                    $("a", elem).on("blur", function() {
                        $(this).removeAttr("tabindex").removeClass("focusOutline");
                    });
                }
            }

            // Keep the following line at the bottom of the EventTabs function
            var trck = new Tracking(elem, 'EventTabs');
            $(document).trigger('template.loaded');
        };
        return EventTabs;
    }
);
