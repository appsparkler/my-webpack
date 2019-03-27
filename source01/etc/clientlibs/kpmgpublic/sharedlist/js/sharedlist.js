define(['jquery', 'underscore', 'tracking', 'handlebars', 'precompile', 'personalizationUtils', 'addtolibrary'],
    function($, _, Tracking, Handlebars, PrecompiledHandlebars, personalizationUtils, AddToLibrary) {
        'use strict';

        var Sharedlist = function(elem, componentName) {
            // Keep the following lines at the bottom of the Sharedlist function
            var tracking = new Tracking(elem, 'Sharedlist'),
                sharedlist;

            var $sortArticles = $('#sort-articles'),
                $articleContainer = $('#sortable-articles .article-container'),
                $resultsContainer = $('#sortable-articles .resultsListContainer'),
                $loadmore = $('.btn-more'),
                $activeSort = $('#activeSort'),
                $itemsLabel = $('#itemsLabel'),
                $listTitle = $('.listtitle'),
                $listCount= $('.listcount');

            var ARTICLERANGE = 15,
                LOADMORE = 15,
                DEFAULTLIST = 'quicksavedlist';

            var sortTypes = [{
                    field: 'savedDate',
                    sort: true,
                    primer: 'Date'
                }, {
                    field: 'articleDate',
                    sort: true,
                    primer: 'Date'
                }, {
                    field: 'articleDate',
                    sort: false,
                    primer: 'Date'
                }],
                selectedList = 'all',
                articles,
                compDelete = 'template-deletearticle',
                compMove = 'template-movearticle',
                compShare = 'template-sharearticle',
                compNoArticle = 'template-noarticleExists',
                templates = {
                    'delete': PrecompiledHandlebars[compDelete],
                    'move': PrecompiledHandlebars[compMove],
                    'share': PrecompiledHandlebars[compShare],
                    'noarticles': PrecompiledHandlebars[compNoArticle]
                },
                data = {
                    'hbs': {
                        'noarticles': {
                            'errorTitle': window.kpmgPersonalize.i18n.customMsgs.noArticleErrorTitle,
                            'errorMessage': window.kpmgPersonalize.i18n.customMsgs.noArticleErrorMessage,
                            'errorDetail': window.kpmgPersonalize.i18n.customMsgs.noArticleErrorDetail,
                            'errorDetail1': window.kpmgPersonalize.i18n.customMsgs.noArticleErrorDetail1,
                            'errorDetail2': window.kpmgPersonalize.i18n.customMsgs.noArticleErrorDetail2,
                            'searchLabel': window.kpmgPersonalize.i18n.customMsgs.searchLabel,
                            'searchLibList': window.kpmgPersonalize.i18n.customMsgs.searchLibList
                        },
                        'shareArticle': {
                            'shareThisList': window.kpmgPersonalize.i18n.customMsgs.shareThisList,
                            'shareThisListDescription': window.kpmgPersonalize.i18n.customMsgs.libraryListShareThisListDescription,
                            'successDescription': window.kpmgPersonalize.i18n.customMsgs.libraryListSuccessDescription,
                            'copy': window.kpmgPersonalize.i18n.customMsgs.libraryListCopy,
                            'cancel': window.kpmgPersonalize.i18n.customMsgs.libraryListCancel,
                            'close': window.kpmgPersonalize.i18n.customMsgs.close
                        }
                    }
                };

            var articleTmpl = Handlebars.compile('<div data-oid="{{oid}}" class="result col-md-height col-sm-height col-full-height col-md-3 col-sm-3 article" tabindex="0">' +
                '<div class="imgContainer">' +
                '<a title="{{title}}" href="{{url}}" tabindex="-1">' +
                '<img src="{{image}}/jcr:content/renditions/cq5dam.web.237.158.jpg" data-src="" data-desktop="{{image}}/jcr:content/renditions/cq5dam.web.237.158.jpg" data-mobile="{{image}}/jcr:content/renditions/cq5dam.web.512.341.jpg" alt="{{title}}" class="img-responsive lazy">' +
                '</a>' +
                '</div>' +
                '<div class="textContainer">' +
                '<h3 class="secondary-head line-clamp line-clamp-1"><a href="{{url}}" title="{{title}}"> <p> {{title}} </p> </a></h3>' +
                '<p class="description line-clamp line-clamp-3">{{description}}</p>' +
                '<div class="row icons-wrap" >' +

                '<span class="module-addtolibrary" aria-label="'+window.kpmgPersonalize.i18n.customMsgs.addtolibrary+'" data-description="{{{description}}}" data-shortDescription="{{{shortDescription}}}" data-href="{{url}}" data-image="{{image}}" data-title="{{{title}}}" data-shortTitle="{{title}}">' +
                    '<a href="#" class="addtolibrary-cta" data-backdrop="static" data-keyboard="false" data-modal-url="" data-remote="" id="addToLibrary" tabindex="0" title="'+window.kpmgPersonalize.i18n.customMsgs.addtolibrary+'" aria-haspopup="true">' +
                        '<span class="icon-star"></span>' +
                    '</a>' +
                '</span>' +

                '<a href="{{url}}" id="sharelist_{{id}}" class="share" title="'+window.kpmgPersonalize.i18n.customMsgs.share+'" data-title="{{title}}"' +
                'data-url="{{url}}" data-desc="{{shortDescription}}" data-image="{{image}}/jcr:content/renditions/cq5dam.web.237.158.jpg">' +
                '<span class="icon-share" data-action="share"></span></a>' +
                '</div>' +
                '</div>' +
                '</div>');

            function initialize() {
                bindEvents();
                fetchSharedList();
            }

            function bindEvents() {
                $sortArticles.on('change.sort', _sortArticles);
                $resultsContainer.on('click.article', '.article .share', templates.share(data), _handleGigyaShare);
                $loadmore.on('click.btn-more', _pagination);
            }

            function loadSharedList(articles, sortby) {
                var articleMarkup = [];
                if (!sortby) {
                    sortby = $activeSort.val();
                }

                if (_.isArray(articles.pages) && articles.pages.length > 0) {
                    var sort = sortTypes[(sortby) ? sortby : 0],
                        sorted =  articles.pages.sort(sortBy(sort.field, sort.sort, sort.primer)),
                        rangeFrom = 0,
                        rangeTo = (sorted.length < ARTICLERANGE) ? sorted.length : ARTICLERANGE,
                        displayName = (articles.name === DEFAULTLIST) ? window.kpmgPersonalize.i18n.customMsgs.quicksavedlist : articles.name;

                    if(sorted.length === 0 || sorted.length <= ARTICLERANGE){
                        $loadmore.hide();
                    } else {
                        $loadmore.show();
                    }

                    $activeSort.val((sortby) ? sortby : 0);

                    for (var i = rangeFrom; i < rangeTo; i++) {
                        articleMarkup.push(articleTmpl(articles.pages[i]));
                    }
                    $resultsContainer.removeClass('empty');
                    $listTitle.html(personalizationUtils.commonUtils.processLibraryName(displayName));
                    $listCount.html(sorted.length +" " + $itemsLabel.val());
                    $articleContainer.html(articleMarkup);

                    enableGigyaShare($('.share', $resultsContainer));

                    $('.module-addtolibrary', $resultsContainer).each(function (index, elem) {
                        AddToLibrary(elem);
                    });

                } else {
                    $resultsContainer.addClass('empty');
                    $articleContainer.html(templates.noarticles(data));
                    $(".sharedlist-header").css("display","none");
                }
                $(".errortohome").on('click', function () {
                    personalizationUtils.pathUtils.gotoPage("../../home.html");
                });

                $(document).trigger('template.loaded');
            }

            function fetchSharedList(cb) {
                var locale = personalizationUtils.accountUtils.getLocale(),
                    location = window.location.origin + window.location.pathname.split('.')[0],
                    serviceURL = _.template(personalizationUtils.constants.getSharedListServiceURL)({
                        location: location,
                        oid: personalizationUtils.pathUtils.getURIparam('oid'),
                        uid: personalizationUtils.pathUtils.getURIparam('uid')
                    });

                selectedList = personalizationUtils.pathUtils.getURIparam('oid');

                $.ajax({
                    url: serviceURL,
                    dataType: 'json',
                    success: function (res) {

                        res.pages = _.filter(res.pages, function (article) {
                            if(article.active) {
                                return true;
                            }
                            return false;
                        });


                        articles = res;
                        loadSharedList(res);
                    },
                    error: function(obj, msg, err) {
                        personalizationUtils.loggerUtils.error("could not fetch shared list", err.message, err);
                    }
                });
            }

            function sortBy(field, reverse, primer) {
                var key = function(x) {
                    if(primer === 'Date'){
                        return new Date(x[field]);
                    } else {
                        return x[field];
                    }
                };

                return function(a, b) {
                    var A = key(a),
                        B = key(b);
                    return ((A < B) ? -1 : ((A > B) ? 1 : 0)) * [-1, 1][+!!reverse];
                };
            }

            function _sortArticles(evt) {
                evt.preventDefault();
                loadSharedList(articles, $(evt.currentTarget).val());
            }

            function _pagination(evt) {
                evt.preventDefault();
                ARTICLERANGE = ARTICLERANGE + LOADMORE;
                loadSharedList(articles, $activeSort.val());
            }

            function enableGigyaShare($share) {
                $share.each(function (index, elem) {
                    $(elem).attr("id", personalizationUtils.commonUtils.generateUniqueId("sharedlist"));
                });
            }

            function _handleGigyaShare(evt) {
                evt.preventDefault();
                var $share = $(evt.currentTarget);
                personalizationUtils.dashboardUtils.handleGigyaShare($share, tracking, componentName);
            }

            initialize();
        };

        return Sharedlist;
    }
);