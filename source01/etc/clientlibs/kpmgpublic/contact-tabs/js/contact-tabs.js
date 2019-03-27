/* global s */
/* global kpmgAssetDomain */
/* global shareProperties */
/* global calanderProperties */
/* global dateFormatProperties */
define(['jquery',
        'handlebars',
        'precompile',
        'cqservice',
        'tracking',
        'helpers',
        'personalizationUtils',
        'common-utils'
    ],
    function($, Handlebars, PrecompiledHandlebars, Service, Tracking, Helpers, personalizationUtils, CommonUtils) {
        'use strict';
        var ContactTabs = function(elem) {

            //$('.tabs-container',elem).find('a.tablink').on('click', tabClickHandler).filter(':first').trigger('click');
            $('.tabs-container', elem).find('a.tablink').first().addClass('current');
            $('.tabs-container', elem).find('a.tablink').next().hide();
            $('.tabs-container', elem).find('a.tablink').first().next().show();
            $('.tabs-container', elem).find('a.tablink.current').children('.resp-arrow').removeClass('icon-chevron-down').addClass('icon-chevron-up');
            $('.tabs-container', elem).find('a.tablink').off("click").on("click", function(e) {
                e.preventDefault();
                var _this = $(this),
                    scrollTop = _this.offset().top - $(window).scrollTop();
                if (_this.hasClass('current')) {
                    if (window.kpmg.isMobile) {
                        _this.children('.resp-arrow').removeClass('icon-chevron-up');
                        _this.children('.resp-arrow').addClass('icon-chevron-down');
                        _this.removeClass('current');
                        _this.next().hide();
                    }
                } else {
                    _this.parent().parent().find('a.tablink').removeClass('current');
                    _this.parent().parent().find('a.tablink').next().hide();
                    _this.parent().parent().find('a.tablink').children('.resp-arrow').removeClass('icon-chevron-up').addClass('icon-chevron-down');
                    _this.children('.resp-arrow').removeClass('icon-chevron-down');
                    _this.children('.resp-arrow').addClass('icon-chevron-up');
                    _this.next().show();
                    _this.addClass('current');
                    if (window.kpmg.isMobile) {
                        $('html, body').animate({
                            scrollTop: _this.offset().top - scrollTop
                        }, 1000);
                    }
                }

                setTimeout(function () {
                    $('img.lazy', _this.next()).unveil();
                }, 150);
            });

            $(window).off().on('scroll', function() {
                var scrollDown = false;
                if ($('#publications .contact-tabs-item:last', elem)[0]) {
                    scrollDown = CommonUtils.isScrolledIntoView($('#publications .contact-tabs-item:last', elem)[0]);
                    if (scrollDown) {
                        $(".btn-wrapper-publications .load-more > span").trigger('click');
                    }
                }

                if ($('#connections .contact-tabs-item:last', elem)[0]) {
                    scrollDown = CommonUtils.isScrolledIntoView($('#connections .contact-tabs-item:last', elem)[0]);
                    if (scrollDown) {
                        $(".btn-wrapper-connections .load-more > span").trigger('click');
                    }
                }

                if ($('#affiliatedTo .contact-tabs-item:last', elem)[0]) {
                    scrollDown = CommonUtils.isScrolledIntoView($('#affiliatedTo .contact-tabs-item:last', elem)[0]);
                    if (scrollDown) {
                        $(".btn-wrapper-affiliatedTo .load-more > span").trigger('click');
                    }
                }
            });

            var publicationsPanel = $(".contact-tabs-publications", elem),
                connectionsPanel = $(".contact-tabs-connections", elem),
                affiliatedToPanel = $(".contact-tabs-affiliatedTo", elem),
                ajaxService = new Service('contact-tabs', {}),
                contactModal = $("#contact-tab-quick-view"),
                connectModal = $("#connection-tab-quick-view"),
                tabContainer = $('.tabs-container', elem),
                connectionspartialComp = 'connections',
                quickViewconnectionsComp = 'quickView-connections',
                publicationspartialComp = 'publications',
                publicationsquickviewpartialComp = 'quickView',
                affiliatedtopartialComp = 'affiliatedto',

                connectionObject = {
                    container: $(".connections-container", elem),
                    baseUrl: connectionsPanel.attr("data-basePath"),
                    template: PrecompiledHandlebars[connectionspartialComp],
                    quickViewTemplateConnect: PrecompiledHandlebars[quickViewconnectionsComp],
                    modalContentPanel: $(".modal-content-panel", connectModal),
                    btnWrapper: $(".btn-wrapper-connections", elem),
                    records: $('.connections-content', elem),
                    model: [],
                    totalRecords: 0,
                    currentPage: 1,
                    recordSize: 5,
                    totalPages: 0
                },
                publicationObject = {
                    container: $(".publications-container", elem),
                    baseUrl: publicationsPanel.attr("data-basePath"),
                    template: PrecompiledHandlebars[publicationspartialComp],
                    quickViewTemplate: PrecompiledHandlebars[publicationsquickviewpartialComp],
                    modalContentPanel: $(".modal-content-panel", contactModal),
                    btnWrapper: $(".btn-wrapper-publications", elem),
                    records: $('.publications-content', elem),
                    model: [],
                    totalRecords: 10,
                    currentPage: 0,
                    recordSize: 5,
                    totalPages: 0,
                    maxResultLimit: publicationsPanel.data('maxResultLimit')
                },
                affiliatedtoObject = {
                    container: $(".affiliatedto-container", elem),
                    baseUrl: publicationsPanel.attr("data-basePath"),
                    template: PrecompiledHandlebars[affiliatedtopartialComp],
                    btnWrapper: $(".btn-wrapper-affiliatedTo", elem),
                    records: $('.affiliated-content', elem),
                    model: [],
                    totalRecords: 10,
                    currentPage: 0,
                    recordSize: 5,
                    totalPages: 0,
                    maxResultLimit: publicationsPanel.data('maxResultLimit')
                },
                loadMoreButtons = $('.btn-more', elem),
                quickViewLabel = publicationsPanel.attr("data-qv-label"),
                publicationLoadMore = $('.btn-wrapper-publications'),
                quickViewConnectLabel = connectionsPanel.attr("data-qv-label"),
                connectionContactLabel = connectionsPanel.attr("data-connection-label"),
                connectionContactUrl = connectionsPanel.attr("data-connect-url"),
                publicationTabVisible = false,
                contactTabVisible = false,
                affiliatedTabVisible = false,
                isFirstLoadPublicationTab = true,
                isFirstLoadContactTab = true,
                isFirstLoadAff = true,
                isConnectionLoadMoreClicked = false,
                isAffLoadMoreClicked = false,
                isPubLoadMoreClicked = false;

            function handleServicePublicationInit(data) {
                publicationObject.records.html('');
                if (data) {
                    if (data.totalRecords) {
                        publicationObject.container.removeClass('hide');
                        if (data.totalRecords > 5) {
                            $(loadMoreButtons[0]).removeClass('hide');
                        }
                        publicationTabVisible = true;
                    } else {
                        setTimeout(function() {
                            $('#connections', elem).trigger('click');
                        }, 150);
                        publicationTabVisible = false;
                    }
                    publicationLoadMore.removeClass('hide');
                    publicationObject.totalRecords = parseInt(data.totalRecords);
                    publicationObject.currentPage = parseInt(data.currentPage) || 1;
                    publicationObject.recordSize = parseInt(data.recordsPerPage) || publicationObject.recordSize;


                    if (publicationObject.totalRecords > publicationObject.maxResultLimit) {
                        publicationObject.totalPages = publicationObject.maxResultLimit / publicationObject.recordSize;
                    } else {
                        publicationObject.totalPages = (parseInt(publicationObject.totalRecords / publicationObject.recordSize) + (((publicationObject.totalRecords % publicationObject.recordSize) === 0) ? 0 : 1));
                    }

                    if (publicationObject.totalRecords <= publicationObject.recordSize) {
                        publicationObject.btnWrapper.remove();
                        publicationObject.btnWrapper = null;
                    } else {
                        $(loadMoreButtons[0]).off('click').on('click', handleLoadMoreClick);
                    }
                    if (data.results[0]) {
                        handleServiceResultForPub(data.results);
                    } else {
                        publicationObject.container.remove();
                        $("input", connectionObject.container).attr("checked", true);
                    }
                    accessibility();
                } else {
                    setTimeout(function() {
                        $('#connections', elem).trigger('click');
                    }, 150);
                    publicationTabVisible = false;
                }
            }

            $('.template').on('click', '.pcfLink', function(e) {
                e.preventDefault();
                var target = $(e.target);
                window.kpmg.modalOpenerUrl = target.data('modal-url');
                $("#kpmgModal").bs3modal({
                    remote: target.data("remote")
                }).data('opener', target.attr('data-modal-url'));

            });

            function handleServiceConnectionInit(data) {
                //connectionObject.records.html('');
                if (data) {
                    connectionObject.data = data.results;
                    if (data.totalRecords) {
                        connectionObject.container.removeClass('hide');
                        if (data.totalRecords > 5) {
                            $(".connections-container .btn-more").removeClass('hide');
                        }
                        contactTabVisible = true;
                    }
                    connectionObject.totalRecords = parseInt(data.totalRecords);
                    connectionObject.currentPage = parseInt(data.currentPage) || 1;
                    connectionObject.recordSize = parseInt(data.recordsPerPage) || connectionObject.recordSize;
                    connectionObject.totalPages = (parseInt(connectionObject.totalRecords / connectionObject.recordSize) + (((connectionObject.totalRecords % connectionObject.recordSize) === 0) ? 0 : 1));
                    if (connectionObject.totalRecords <= connectionObject.recordSize) {
                        connectionObject.btnWrapper.remove();
                        connectionObject.btnWrapper = null;
                    } else {
                        $(".connections-container .btn-more").off().on('click', handleLoadMoreClick);
                    }
                    if (data.results[0]) {

                        handleServiceResultForCon(data.results);
                    } else {
                        connectionObject.container.remove();
                        contactTabVisible = false;
                    }
                    accessibility();
                }
            }

            function handleServiceAffiliatedTo(data) {
                //affiliatedtoObject.records.html('');
                affiliatedtoObject.data = data;
                if (data) {
                    if (data.affiliatedList.length) {
                        affiliatedtoObject.container.removeClass('hide');
                        if (data.affiliatedList.length > 5) {
                            $(".btn-wrapper-affiliatedTo .btn-more").removeClass('hide');
                        }
                        affiliatedTabVisible = true;
                    }
                    affiliatedtoObject.totalRecords = data.affiliatedList.length;
                    affiliatedtoObject.currentPage = parseInt(data.currentPage) || 1;
                    affiliatedtoObject.recordSize = parseInt(data.recordsPerPage) || affiliatedtoObject.recordSize;
                    affiliatedtoObject.totalPages = (parseInt(affiliatedtoObject.totalRecords / affiliatedtoObject.recordSize) + (((affiliatedtoObject.totalRecords % affiliatedtoObject.recordSize) === 0) ? 0 : 1));
                    if (affiliatedtoObject.totalRecords <= 5) {
                        affiliatedtoObject.btnWrapper.remove();
                        affiliatedtoObject.btnWrapper = null;
                    } else {
                        $(".btn-wrapper-affiliatedTo .btn-more").off().on('click', handleLoadMoreClick);
                    }
                    if (data.affiliatedList.length) {
                        handleServiceResultForAff(data.affiliatedList.splice(0, 5));
                        affiliatedtoObject.currentPage++;
                    } else {
                        affiliatedtoObject.container.remove();
                        affiliatedTabVisible = false;
                    }
                    accessibility();
                }
            }
            ajaxService.params.baseUrl = publicationObject.baseUrl;
            ajaxService.SOLRFetch(handleServicePublicationInit, 'relatedPublications', publicationObject.recordSize, (publicationObject.currentPage * publicationObject.recordSize));
            ajaxService.params.baseUrl = connectionObject.baseUrl;
            ajaxService.fetch(handleServiceConnectionInit, '', connectionObject.currentPage, connectionObject.recordSize);
            ajaxService.fetch(handleServiceAffiliatedTo, '', affiliatedtoObject.currentPage, affiliatedtoObject.recordSize);


            contactModal.on("show.bs3.modal", showModal).on("hidden.bs3.modal", hideModal);
            connectModal.on("show.bs3.modal", showModalConnect).on("hidden.bs3.modal", hideModalConnect);


            contactModal.on("shown.bs3.modal", function() {
                $('img.lazy', '#contact-tab-quick-view').unveil();
                //Accessibility
                $("a", "#contact-tab-quick-view").on("keyup", function(e) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        if ($(this).is("a") && $(this).find("img").length > 0) {
                            $(this).removeAttr("tabindex").find("img").addClass("focusOutline");
                        } else {
                            $(this).removeAttr("tabindex").addClass("focusOutline");
                        }
                    }
                });
                $("a", "#contact-tab-quick-view").on("blur", function() {
                    if ($(this).is("a") && $(this).find("img").length > 0) {
                        $(this).find("img").removeClass("focusOutline");
                    } else {
                        $(this).removeClass("focusOutline");
                    }
                });
            });

            connectModal.on("shown.bs3.modal", function() {
                $('img.lazy', '#connection-tab-quick-view').unveil();
                //Accessibility
                $("a", "#connection-tab-quick-view").on("keyup", function(e) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        if ($(this).is("a") && $(this).find("img").length > 0) {
                            $(this).removeAttr("tabindex").find("img").addClass("focusOutline");
                        } else {
                            $(this).removeAttr("tabindex").addClass("focusOutline");
                        }
                    }
                });
                $("a", "#connection-tab-quick-view").on("blur", function() {
                    if ($(this).is("a") && $(this).find("img").length > 0) {
                        $(this).find("img").removeClass("focusOutline");
                    } else {
                        $(this).removeClass("focusOutline");
                    }
                });
            });


            function showModal(evt) {

                var opener = $(evt.relatedTarget),
                    idx = opener.attr("data-viewindex"),
                    quickViewResult = publicationObject.model[idx - 1],
                    _window = $(window);

                if (shareProperties && typeof shareProperties === 'object') {
                    quickViewResult = $.extend(true, quickViewResult, shareProperties);
                }

                publicationObject.modalContentPanel.append(publicationObject.quickViewTemplate(quickViewResult));
                $('#contact-tab-quick-view .modal-content').css({
                    top: (_window.height() / 2 - 96)
                });

                Helpers.triggerTracking({
                    "quickView1": $('.secondary-head a', '.modal-content-panel').html(),
                    "events": "event30"
                }, "Article Quick View");

            }

            function showModalConnect(evt) {
                var opener = $(evt.relatedTarget),
                    idx = opener.attr("data-viewindex"),
                    quickViewResultConnect = connectionObject.model[idx - 1],
                    _window = $(window);

                connectionObject.modalContentPanel.append(connectionObject.quickViewTemplateConnect(quickViewResultConnect));
                $('#connection-tab-quick-view .modal-content').css({
                    top: (_window.height() / 2 - 96)
                });
                $("#peoplecontactlink").on('click', function(e) {
                    e.preventDefault();
                    var target = $(e.target);
                    connectModal.bs3modal('hide');
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
                publicationObject.modalContentPanel.empty();
            }

            function hideModalConnect() {
                connectionObject.modalContentPanel.empty();
            }

            function handleLoadMoreClick(evt) {
                evt.preventDefault();
                var page = $(evt.target).attr('data-type');
                if (page === 'publications') {
                    if (publicationObject.currentPage < publicationObject.totalPages) {
                        ++publicationObject.currentPage;
                        if (publicationObject.currentPage === publicationObject.totalPages) {
                            publicationObject.btnWrapper.remove();
                            publicationObject.btnWrapper = null;
                        }
                    }
                    isFirstLoadPublicationTab = false;
                    isPubLoadMoreClicked = true;
                    ajaxService.params.baseUrl = publicationObject.baseUrl;
                    ajaxService.SOLRFetch(handleServiceResultForPub, 'results', publicationObject.recordSize, (publicationObject.currentPage - 1) * publicationObject.recordSize);
                }
                if (page === 'connections') {
                    if (connectionObject.currentPage < connectionObject.totalPages) {
                        connectionObject.currentPage++;
                        if (connectionObject.currentPage === connectionObject.totalPages) {
                            connectionObject.btnWrapper.remove();
                            connectionObject.btnWrapper = null;
                        }
                    }
                    isFirstLoadContactTab = false;
                    var datalist = connectionObject.data;
                    ajaxService.params.baseUrl = connectionObject.baseUrl;
                    isConnectionLoadMoreClicked = true;
                    ajaxService.fetch(handleServiceConnectionInit, '', connectionObject.currentPage, connectionObject.recordSize);
                    // handleServiceResultForCon(datalist);
                }
                if (page === 'affiliatedTo') {
                    isFirstLoadAff = false;
                    isAffLoadMoreClicked = true;
                    var data = affiliatedtoObject.data;
                    if (data.affiliatedList.length) {
                        handleServiceResultForAff(data.affiliatedList.splice(0, 5));

                        if (data.affiliatedList.length === 0) {
                            affiliatedtoObject.btnWrapper.remove();
                            affiliatedtoObject.btnWrapper = null;
                        }
                        affiliatedtoObject.currentPage++;
                    }
                }
            }

            function handleServiceResultForCon(data) {

                if (!isConnectionLoadMoreClicked && connectionObject.btnWrapper !== null) {
                    connectionObject.records.html('');
                } else if (!isConnectionLoadMoreClicked && connectionObject.btnWrapper === null) {
                    connectionsPanel.html('');
                }
                $.each(data, function(index, val) {
                    if (kpmgAssetDomain) {
                        val = $.extend(true, val, {
                            "assetDomainName": kpmgAssetDomain
                        });
                    }
                    val = $.extend(true, val, {
                        "quickViewInTile": quickViewConnectLabel,
                        "contactFormLinkCopy": connectionContactLabel,
                        "peopleContactFormLink": connectionContactUrl,
                        idx: (connectionObject.model.length + 1)
                    });

                    $.merge(connectionObject.model, [val]);
                    if (connectionObject.btnWrapper !== null) {
                        $(connectionObject.template(val)).appendTo(connectionObject.records);
                    } else {
                        connectionsPanel.append(connectionObject.template(val));
                    }
                });
                setTimeout(function() {
                    $('img.lazy', connectionsPanel).unveil();
                }, 150);
                if (!isFirstLoadContactTab) {
                    $(".connections-container", elem).find("a:first").attr("tabindex", "-1");
                    accessibility();
                }
            }

            function handleServiceResultForPub(data) {
                if (!isPubLoadMoreClicked && publicationObject.btnWrapper !== null) {
                    publicationObject.records.html('');
                } else if (!isPubLoadMoreClicked && publicationObject.btnWrapper === null) {
                    publicationsPanel.html('');
                }
                $.each(data, function(index, val) {
                    if (kpmgAssetDomain) {
                        val = $.extend(true, val, {
                            "assetDomainName": kpmgAssetDomain
                        });
                    }
                    if (calanderProperties && dateFormatProperties) {
                        $.merge(dateFormatProperties.fields, [{
                            "item4": ""
                        }]);
                        if (data[index].articleDate) {
                            data[index].articleDate = Helpers.dateFormat(data[index].articleDate, calanderProperties, dateFormatProperties);
                        }
                    }

                    val = $.extend(true, val, {
                        "quickView": quickViewLabel,
                        idx: (publicationObject.model.length + 1)
                    });
                    $.merge(publicationObject.model, [val]);
                    if (publicationObject.btnWrapper !== null) {
                        $(publicationObject.template(val)).appendTo(publicationObject.records);
                    } else {
                        publicationsPanel.append(publicationObject.template(val));
                    }
                });
                setTimeout(function() {
                    $('img.lazy', publicationsPanel).unveil();
                }, 150);
                if (!isFirstLoadPublicationTab) {
                    $(".publications-container", elem).find("a:first").attr("tabindex", "-1");
                    accessibility();
                }
            }

            function handleServiceResultForAff(data) {
                if (!isAffLoadMoreClicked && affiliatedtoObject.btnWrapper !== null) {
                    affiliatedtoObject.records.html('');
                } else if (!isAffLoadMoreClicked && affiliatedtoObject.btnWrapper === null) {
                    affiliatedToPanel.html('');
                }
                $.each(data, function(index, val) {

                    if (kpmgAssetDomain) {
                        val = $.extend(true, val, {
                            "assetDomainName": kpmgAssetDomain
                        });
                    }
                    if (calanderProperties && dateFormatProperties) {
                        $.merge(dateFormatProperties.fields, [{
                            "item4": ""
                        }]);
                        if (data[index].publishDate) {
                            data[index].publishDate = Helpers.dateFormat(data[index].publishDate, calanderProperties, dateFormatProperties);
                        }
                    }

                    $.merge(affiliatedtoObject.model, [val]);
                    if (affiliatedtoObject.btnWrapper !== null) {
                        $(affiliatedtoObject.template(val)).appendTo(affiliatedtoObject.records);
                    } else {
                        affiliatedToPanel.append(affiliatedtoObject.template(val));
                    }
                });
                setTimeout(function() {
                    $('img.lazy', affiliatedToPanel).unveil();
                }, 150);
                if (!isFirstLoadAff) {
                    $(".affiliatedto-container", elem).find("a:first").attr("tabindex", "-1");
                    accessibility();
                }
            }


            var checkTabs = setInterval(function() {
                var tabLen = publicationTabVisible + contactTabVisible + affiliatedTabVisible;

                if (tabLen === 3) {
                    tabContainer.addClass('three-tabs').removeClass('one-tabs').removeClass('two-tabs');
                    publicationObject.container.find("label").addClass("col-md-4").removeClass("col-md-6").removeClass("col-md-12");
                    connectionObject.container.find("label").addClass("col-md-4").removeClass("col-md-6").removeClass("col-md-12");
                    affiliatedtoObject.container.find("label").addClass("col-md-4").removeClass("col-md-6").removeClass("col-md-12");

                }
                if (tabLen === 2) {
                    tabContainer.addClass('two-tabs').removeClass('one-tabs').removeClass('three-tabs');
                    if (publicationTabVisible === true && contactTabVisible === true) {
                        publicationObject.container.find("label").addClass("col-md-6");
                        connectionObject.container.find("label").addClass("col-md-6");
                        $(".tablink.third").addClass('second').removeClass('third');
                    }
                    if (affiliatedTabVisible === true && contactTabVisible === true) {
                        affiliatedtoObject.container.find("label").addClass("col-md-6");
                        connectionObject.container.find("label").addClass("col-md-6");
                        $('.tablink', affiliatedtoObject.container).trigger('click');
                        $(".tablink.second").addClass('first').removeClass('second');
                        $(".tablink.third").addClass('second').removeClass('third');
                    }
                    if (publicationTabVisible === true && affiliatedTabVisible === true) {
                        publicationObject.container.find("label").addClass("col-md-6");
                        affiliatedtoObject.container.find("label").addClass("col-md-6");
                    }
                }

                if (tabLen === 1) {
                    tabContainer.addClass('one-tab').removeClass('two-tabs').removeClass('three-tabs');
                    if (publicationTabVisible === true) {
                        publicationObject.container.find("label").removeClass("col-md-6").addClass("col-md-12");
                    }
                    if (contactTabVisible === true) {
                        connectionObject.container.find("label").removeClass("col-md-6").addClass("col-md-12");
                        $('.tablink', connectionObject.container).trigger('click');
                    }
                    if (affiliatedTabVisible === true) {
                        affiliatedtoObject.container.find("label").removeClass("col-md-6").addClass("col-md-12");
                        $('.tablink', affiliatedtoObject.container).trigger('click');
                    }
                }

                clearInterval(checkTabs);
            }, 1000);

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
                    //$('.custom-tab-content').hide();
                    _this.next().show();
                    $('a.tablink').removeClass('current');
                    _this.addClass('current');
                }
            }


            function accessibility() {
                //Accessibility
                $("a", elem).on("keyup", function(e) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        $(this).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                    }
                });
                $("a", elem).on("blur", function() {
                    $(this).removeAttr("tabindex").removeClass("focusOutline");
                });
            }

            // accessibility handling for contact button
            $(".connections-container", elem).on("keyup", '.contact-tabs-item .contact-btn', function(e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                    $(this).closest('.contact-cta-wrapper').removeAttr("tabindex").removeClass("focusOutline");
                }
            });
            $(".connections-container", elem).on("blur", '.contact-tabs-item .contact-btn', function() {
                $(this).removeAttr("tabindex").removeClass("focusOutline");
            });

            $('.btn-wrapper-publications .load-more, .btn-wrapper-affiliatedTo  .load-more').on('keydown', function(e) {
                if (e.which === 13) {
                    $(this).find('.btn-more').trigger("click");
                }
            });

            $('.btn-wrapper-connections .load-more').on('keydown', function(e) {
                if (e.which === 13) {
                    $(this).find('.btn-more').trigger("click");
                }
            });

            var trck = new Tracking(elem, 'ContactTabs');

            $(document).trigger('template.loaded');
        };
        return ContactTabs;
    }
);