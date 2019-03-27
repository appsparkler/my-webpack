define(['jquery', 'underscore', 'tracking', 'handlebars', 'precompile', 'personalizationUtils','addtolibrary','genericErrorDialog', 'personalization'],
    function($, _, Tracking, Handlebars, PrecompiledHandlebars, personalizationUtils, AddToLibrary, genericErrorDialog, personalization) {
        'use strict';

        var Librarylist = function(elem, componentName) {
            var tracking = new Tracking(elem, 'Librarylist');

            var $libraryListModule = $('.module-librarylist'),
                $sortArticles = $libraryListModule.find('#sort-articles'),
                $articleContainer = $libraryListModule.find('#sortable-articles .article-container'),
                $resultsContainer = $libraryListModule.find('#sortable-articles .resultsListContainer'),
                $loadmore = $libraryListModule.find('.btn-more'),
                $librarylistmodal = $('#librarylistmodal'),
                $activeList = $libraryListModule.find('#activeList'),
                $activeSort = $libraryListModule.find('#activeSort'),
                $allItemTitle = $libraryListModule.find('#defaultlisttitle'),
                $itemsLabel = $libraryListModule.find('#itemsLabel'),
                $listTitle = $libraryListModule.find('.listtitle'),
                $listCount= $libraryListModule.find('.listcount'),
                $recommendBanner = $libraryListModule.find('.librarylist-recommend');

            var $search,
                $libraryListDropdown,
                $libraryList,
                $newListControl,
                $newListForm,
                $newlistButton,
                $newListInput,
                $newListCancelBtn,
                $newListCreateBtn,
                $cancelAction,
                $saveToList,
                $article,
                $saveToListSection,
                $error,
                $alerts,
                $createListForm;

            var sortTypes = [{
                    field: 'savedDate',
                    sort: false,
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
                articleURL,
                compDelete = 'template-deletearticle',
                compMove = 'template-movearticle',
                compShare = 'template-sharearticle',
                compRemoved = 'template-articlesremoved',                
                templates = {
                    'delete': PrecompiledHandlebars[compDelete],
                    'move': PrecompiledHandlebars[compMove],
                    'share': PrecompiledHandlebars[compShare],
                    'removed': PrecompiledHandlebars[compRemoved]
                },
                data = {
                    'hbs': {
                        'deleteArticle': {
                            'deleteThisArticle': window.kpmgPersonalize.i18n.customMsgs.libraryListDeleteThisArticle,
                            'deleteThisArticleDescription': window.kpmgPersonalize.i18n.customMsgs.libraryListDeleteThisArticleDescription,
                            'successDescription': window.kpmgPersonalize.i18n.customMsgs.libraryListSuccessDescription,
                            'deleteIt': window.kpmgPersonalize.i18n.customMsgs.libraryListDeleteIt,
                            'close': window.kpmgPersonalize.i18n.customMsgs.close
                        },
                        'moveArticle': {
                            'movearticle': window.kpmgPersonalize.i18n.customMsgs.libraryListMovearticle,
                            'instrutiontext': window.kpmgPersonalize.i18n.customMsgs.libraryListInstrutiontext,
                            'alreadysaved': window.kpmgPersonalize.i18n.customMsgs.libraryListAlreadysaved,
                            'alreadysavedarticle': window.kpmgPersonalize.i18n.customMsgs.libraryListAlreadysavedarticle,
                            'choosealist': window.kpmgPersonalize.i18n.customMsgs.libraryListChoosealist,
                            'searchLabel': window.kpmgPersonalize.i18n.customMsgs.searchLabel,
                            'searchLibList': window.kpmgPersonalize.i18n.customMsgs.searchLibList,
                            'createalist': window.kpmgPersonalize.i18n.customMsgs.libraryListCreatealist,
                            'thatNameIsTaken': window.kpmgPersonalize.i18n.customMsgs.libraryListThatNameIsTaken,
                            'empty': window.kpmgPersonalize.i18n.customMsgs.libraryListEmpty,
                            'enternewlist': window.kpmgPersonalize.i18n.customMsgs.libraryListEnternewlist,
                            'addtolibraryoverlayCancel': window.kpmgPersonalize.i18n.customMsgs.libraryListAddtolibraryoverlayCancel,
                            'move': window.kpmgPersonalize.i18n.customMsgs.move,
                            'cancel': window.kpmgPersonalize.i18n.customMsgs.libraryListCancel1,
                            'successDescription': window.kpmgPersonalize.i18n.customMsgs.libraryListSuccessDescription,
                        },
                        'articlesRemoved': {
                            'notlongeravailable': window.kpmgPersonalize.i18n.customMsgs.libraryListNotlongeravailable,
                            'articlenolongeravailabledescription': window.kpmgPersonalize.i18n.customMsgs.libraryListArticlenolongeravailabledescription,
                            'articlewasremovedfromlabel': window.kpmgPersonalize.i18n.customMsgs.libraryListArticlewasremovedfromlabel,
                            'mobilenolongeravlbl': window.kpmgPersonalize.i18n.customMsgs.libraryListMobilenolongeravlbl,
                            'artitwasremovedfrom': window.kpmgPersonalize.i18n.customMsgs.libraryListArtitwasremovedfrom,
                            'articlesnolongeravailabledescription': window.kpmgPersonalize.i18n.customMsgs.libraryListArticlesnolongeravailabledescription,
                            'close': window.kpmgPersonalize.i18n.customMsgs.close
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
              

            var RECOMMENDRANGE=6,
                ARTICLERANGE = 15,LOADMORE=15,
                DEFAULTLIST = 'quicksavedlist';

            var article,parent;

            var articleTmpl = Handlebars.compile('<div data-oid={{oid}} class="result col-md-height col-sm-height col-full-height col-md-4 col-sm-4 article" tabindex="0">' +
                '<div class="imgContainer">' +
                    '<a title="{{title}}" href="{{url}}" tabindex="-1">' +
                        '<img src="{{image}}/jcr:content/renditions/cq5dam.web.237.158.jpg" data-src="" data-desktop="{{image}}/jcr:content/renditions/cq5dam.web.237.158.jpg" data-mobile="{{image}}/jcr:content/renditions/cq5dam.web.512.341.jpg" alt="{{title}}" class="img-responsive lazy">' +
                    '</a>' +
                '</div>' +
                '<div class="textContainer">' +
                    '<h3 class="secondary-head line-clamp line-clamp-1"><a href="{{url}}" title="{{title}}"> <p> {{title}} </p> </a></h3>' +
                    '<p class="description line-clamp line-clamp-3">{{description}}</p>' +
                        '<div class="row icons-wrap" >' +

                            '{{#if savedArticle}}'+
                            '<a href="{{url}}" title="'+window.kpmgPersonalize.i18n.customMsgs.delete+'" class="delete"><span class="icon-close"></span></a>' +
                            '<a href="{{url}}" title="'+window.kpmgPersonalize.i18n.customMsgs.move+'" class="move" data-description="{{{description}}}" data-shortDescription="{{{shortDescription}}}" data-href="{{url}}" data-image="{{image}}" data-title="{{{title}}}" data-shortTitle="{{title}}"><span class="icon-move" ></span></a>' +
                            '{{/if}}'+

                            '{{#unless savedArticle}}'+
                            '<span class="module-addtolibrary" aria-label="'+window.kpmgPersonalize.i18n.customMsgs.addtolibrary+'" data-description="{{{description}}}" data-shortDescription="{{{shortDescription}}}" data-href="{{url}}" data-image="{{image}}" data-title="{{{title}}}" data-shortTitle="{{title}}">'+
                                '<a href="#" class="addtolibrary-cta" data-backdrop="static" data-keyboard="false" data-modal-url="" data-remote="" id="addToLibrary" tabindex="0" title="'+window.kpmgPersonalize.i18n.customMsgs.addtolibrary+'" aria-haspopup="true">'+
                                    '<span class="icon-star"></span>'+
                             '</a>'+
                            '</span>'+
                            '{{/unless}}'+

                            '<a href="{{url}}" id="share{{id}}" class="share" title="'+window.kpmgPersonalize.i18n.customMsgs.share+'" data-title="{{title}}"' +
                            'data-url="{{url}}" data-desc="{{shortDescription}}" data-image="{{image}}/jcr:content/renditions/cq5dam.web.237.158.jpg">' +
                            '<span class="icon-share" data-action="share"></span></a>' +
                        '</div>' +
                    '</div>' +
                '</div>');

            function initialize() {
                bindEvents();
                loadArticles(selectedList);
                enableAlly();
            }

            function bindEvents() {
                $(document).on('library.selected', _librarySelected);
                $sortArticles.on('change.sort', _sortArticles);
                $loadmore.on('click.btn-more', _pagination);
                $resultsContainer.on('click.article', '.article .share', templates.share(data), _handleGigyaShare);
                $resultsContainer.on('click.delete', '.article .delete', templates.delete(data), _handleListDeletion);
                $resultsContainer.on('click.move', '.article .move', templates.move(data), _handleMoveArticle);
                $librarylistmodal.on('click.deletelist', '#deletearticlebtn', _deleteArticle);
                $librarylistmodal.on('click.copy','#copytocb', _copyToclipboard);
                $recommendBanner.on('click.closerecommended', 'a', resetList);
            }

            function showRecommendedArticles(articles, sortby) {
                var articleMarkup = [];

                if (!sortby) {
                    sortby = $activeSort.val();
                }

                resetResult();
                if (_.isArray(articles) && articles.length > 0) {
                    var sort = sortTypes[(sortby) ? sortby : 0],
                    sorted =  articles.sort(sortBy('KPMG_Article_Date', false, 'Date')),
                    rangeFrom = 0,
                    rangeTo = (sorted.length < RECOMMENDRANGE) ? sorted.length : RECOMMENDRANGE;

                    for (var i = rangeFrom; i < rangeTo; i++) {
                        articleMarkup.push(articleTmpl({
                            oid : 'recommended' + articles[i].index,
                            url: window.location.origin + articles[i].KPMG_URL,
                            title: articles[i].KPMG_Title,
                            image: articles[i].KPMG_Image,
                            description: articles[i].KPMG_Description,
                            shortDescription: articles[i].KPMG_Short_Desc,
                            id: articles[i].index
                        }));
                    }
                    $resultsContainer.removeClass('empty');
                } else {
                    $resultsContainer.addClass('empty');
                }

                $sortArticles.parent().hide();
                $recommendBanner.show();
                $articleContainer.html(articleMarkup);
                $listTitle.html($allItemTitle.val());
                $listCount.html("0 " + $itemsLabel.val());

                $('.module-addtolibrary', elem).each(function (index, elem) {
                    AddToLibrary(elem);
                });
            }

            function loadArticles(oid, sortby) {
                try {
                    if (!oid) {
                        oid = $activeList.val();
                        sortby = parseInt($activeSort.val());
                    }

                    // persist value for future.
                    $activeList.val(oid);

                    if (oid !== 'all') {
                        showRemovedArticleAlert(oid);
                    }

                    var library = personalizationUtils.storeUtils.getLibraryById(oid),
                        articles, articleMarkup = [],
                        displayName = (library.name === DEFAULTLIST) ? window.kpmgPersonalize.i18n.customMsgs.quicksavedlist : library.name;

                    personalizationUtils.loggerUtils.info('loading articles', oid, library);

                    resetResult();
                    if (_.isArray(library.pages) && library.pages.length > 0) {
                        var sort = sortTypes[(sortby) ? sortby : 0],
                        sorted =  library.pages.sort(sortBy(sort.field, sort.sort, sort.primer)),
                        rangeFrom = 0,
                        rangeTo = (sorted.length < ARTICLERANGE) ? sorted.length : ARTICLERANGE;

                        if (sorted.length === 0 || sorted.length <= ARTICLERANGE) {
                            $loadmore.hide();
                        } else {
                            $loadmore.show();
                        }

                        $activeSort.val((sortby) ? sortby : 0);

                        for (var i = rangeFrom; i < rangeTo; i++) {
                            // only active items are shown
                            if (typeof sorted[i].active !== 'undefined' && sorted[i].active === true) {
                                articleMarkup.push(articleTmpl(_.extend({}, sorted[i], {
                                    id: personalizationUtils.commonUtils.guid(),
                                    oid: (oid === 'all') ? sorted[i].oid : oid,
                                    url: window.location.origin + sorted[i].url,
                                    savedArticle: true
                                })));
                            }
                        }

                        $resultsContainer.removeClass('empty');
                        $listTitle.html((oid === 'all') ? $allItemTitle.val() : displayName);
                        $listCount.html(sorted.length +" " + $itemsLabel.val());
                        $articleContainer.html(articleMarkup);
                        $sortArticles.parent().show();
                    } else {
                        $resultsContainer.addClass('empty');
                        if (oid === 'all') {
                            getSnpRecommendation();
                        } else {
                            $sortArticles.parent().show();
                        }

                        $listTitle.html((oid === 'all') ? $allItemTitle.val() : displayName);
                        $listCount.html("0 " + $itemsLabel.val());
                    }

                    $(document).trigger('template.loaded');
                    //enableGigyaShare($('.share',$resultsContainer));

                } catch (err) {
                    personalizationUtils.loggerUtils.error("cannot show library.pages", err);
                }
            }

            function sortBy(field, reverse,primer) {
                var key = function (x) {
                    if (primer === 'Date') {
                        return new Date(x[field]);
                    } else {
                        return x[field];
                    }
                };

                return function (a,b) {
                    var A = key(a), B = key(b);
                    return ((A < B) ? -1 : ((A > B) ? 1 : 0)) * [-1,1][+!!reverse];
                };
            }

            function enableGigyaShare($share) {
                $share.attr("id", personalizationUtils.commonUtils.generateUniqueId("librarylist"));
            }

            function showRemovedArticleAlert(oid) {
                var hasArticlesRemoved = personalizationUtils.storeUtils.getRemovedArticles(oid),
                library = personalizationUtils.storeUtils.getLibraryById(oid);
                if (hasArticlesRemoved.length) {
                    _showModal(templates.removed(data), {
                        oid: oid,
                        removed: hasArticlesRemoved,
                        library: library
                    }, _handleRemovedArticleModalOpened,
                    _handleRemovedArticleModalClosed);
                }
            }

            function enableAlly() {
                $('.module-librarylist').on('keyup', "span.icon*,select", function(e) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        $(this).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                    }
                });
                $('.module-librarylist').on('blur', "span.icon*,select", function(e) {
                    $(this).removeAttr("tabindex").removeClass("focusOutline");
                });

                $librarylistmodal.on('focus','.btn-cta', function (evt) {
                    $(this).addClass('focusOutline');
                }).on('blur', '.btn-cta', function (evt) {
                    $(this).removeClass('focusOutline');
                });

                $(elem).on('focus','.btn-cta', function () {
                    $(this).addClass('focusOutline');
                });

                $(elem).on('blur','.btn-cta', function () {
                    $(this).removeClass('focusOutline');
                });
            }

            function resetList() {
                $sortArticles.parent().show();
                resetResult();
            }

            function resetResult() {
                $recommendBanner.hide();
                $articleContainer.html('');
                $resultsContainer.removeClass('empty');
                $listTitle.html('');
                $listCount.html('');
                $loadmore.hide();
            }

            function getSnpRecommendation() {
                personalization.getZthesIDs(window.kpmgPersonalize.db.data)
                    .then(personalization.getSnPResults)
                    .then(function (snpData) {
                        if (snpData && snpData['personalized-results'] && snpData['personalized-results'].resultset.results.result.length) {
                            showRecommendedArticles(snpData['personalized-results'].resultset.results.result);
                        }
                    })
                    .fail(function (err) {
                        genericErrorDialog.showDialog();
                        personalizationUtils.loggerUtils.error("Cannot getch user recommendations. ", err);
                    });
            }

            function _handleGigyaShare(evt) {
                evt.preventDefault();
                var  $share = $(evt.currentTarget);
                /*{
                    onLoad: function (share) {
                        _handleShareOnload(share, $share.data(), evt.data);
                    }
                }*/
                tracking.satelliteTracking({
                    'list': {
                        ArticleShareLocation: "Library",
                        interactionType: 'Article Interaction'
                    }
                }, 'SocialShare', false);
                var memberFirm = (window.kpmgPersonalize && window.kpmgPersonalize.snp.params.countryCode && window.kpmgPersonalize.snp.params.countryCode.toUpperCase()) || '',
                    articleTitle = $('.resultsListContainer').find('.secondary-head>a>p').text();
                if (memberFirm === "XX") {
                    memberFirm = "GLOBAL";
                }
                // window.digitalData.page.pageInfo.industryPath = $(this).closest('[data-article-type]').attr('data-article-type');
                window.digitalData.page.article.articleDetails = articleTitle.concat(' | ', 'KPMG', ' | ', memberFirm);
                personalizationUtils.dashboardUtils.handleGigyaShare($share, tracking, componentName);
            }

            /**
             * this funtion is not used anymore
             * @param  {[type]} share   [description]
             * @param  {[type]} data    [description]
             * @param  {[type]} overlay [description]
             * @return {[type]}         [description]
             */
            function _handleShareOnload(share, data, overlay) {
                var $shareContainer = $('.gig-simpleShareUI-content','#'+share.sourceContainerID);
                var urlShare = '<div class="gig-simpleShareUI-button" provider="urlshare">'+
                                    '<div class="gig-simpleShareUI-button-inner" >'+
                                        '<span class="icon-share"></span>'+
                                        '<span style="" class="gig-simpleShareUI-buttonText gig-simpleShareUI-custom">'+ window.kpmgPersonalize.i18n.customMsgs.urllink +' </span>'+
                                    '</div>'+
                                '</div>';

                $shareContainer.append(urlShare);
                $shareContainer.on('click','[provider="urlshare"]',function () {
                    _showModal(overlay, data, function (evt) {
                        var $modal = $(evt.currentTarget);
                        try {
                            $('.modal-content',$modal).removeClass('success').html(evt.data[0]);
                            $('.alert-info', $modal).val(evt.data[1].url);
                            $('.gig-simpleShareUI').hide();
                        } catch(err) {
                            genericErrorDialog.showDialog();
                            personalizationUtils.loggerUtils.error("Cannot delete the list", err);
                        }
                    });
                });
            }

            function _librarySelected(evt, oid) {
                personalizationUtils.loggerUtils.info('list selected', selectedList, oid);
                selectedList = oid;
                loadArticles(selectedList);
            }

            function _sortArticles(evt) {
                evt.preventDefault();
                loadArticles(selectedList, $(evt.currentTarget).val());
            }

            function _pagination(evt) {
                evt.preventDefault();
                ARTICLERANGE = ARTICLERANGE + LOADMORE;
                loadArticles(selectedList, $activeSort.val());
            }

            function bindMoveArticleOverlayEvents($modal, currentOid, article) {
                $search = $('#moveArticleSearch', $modal);
                $libraryListDropdown = $('#moveArticleLibrarylistdropdown', $modal);
                $libraryList = $('#moveArticleLibrarylist', $modal);
                $newListControl = $('.new-list-controls', $modal);
                $newListForm = $('.form-createList .form-group', $modal);
                $newlistButton = $('#moveArticleNewlistbtn', $modal);
                $newListInput = $('#moveArticleNewlist', $modal);
                $newListCancelBtn = $('#moveArticleCancelcreate', $modal);
                $newListCreateBtn =  $('#moveArticleCreatelist', $modal);
                $cancelAction = $('#moveArticleCancelaction', $modal);
                $saveToList = $('#moveArticleSavetolist', $modal);
                $article = $('#moveArticlePreview', $modal);
                $saveToListSection = $('.save-to-list-section', $modal);
                $error = $('#moveArticleError', $modal);
                $alerts = $('.alert', $modal);
                $createListForm = $('.form-createlist', $modal);

                $newlistButton.on('click.moveArticle', article,  _handleNewListClick);

                $search.on('keyup.moveArticle', _filterSearch);

                $libraryListDropdown.on('change.moveArticle', _handleListSelection);
                $libraryList.on('click.moveArticle','li a', _handleListSelection);

                $newListCreateBtn.on('click.moveArticle', _createNewLibraryList);
                $createListForm.on('submit.moveArticle', _createNewLibraryList);

                $newListCancelBtn.on('click.moveArticle', _cancelNewListCreation);
                $saveToList.off('click.moveArticle').on('click.moveArticle', [currentOid, article], _handleSavetoLibrary);
            }

            function unbindMoveArticleOverlayEvents() {
                $newlistButton.off('click.moveArticle');
                $search.off('keyup.moveArticle');
                $libraryListDropdown.off('change.moveArticle');
                $libraryList.off('click.moveArticle');
                $newListCreateBtn.off('click.moveArticle');
                $newListCancelBtn.off('click.moveArticle');
                $saveToList.off('click.moveArticle');
                $createListForm.off('submit.moveArticle');
            }

            function showArticle(article) {
                if (typeof article === 'object') {
                    $('.article-image',$article).attr('src',article.image + '/jcr:content/renditions/cq5dam.web.237.158.jpg');
                    $('.article-title',$article).html(article.title);
                    $('.article-description',$article).html(article.description);
                }
            }

            function loadLibraryList(selected) {
                var sortedLibrary = personalizationUtils.storeUtils.getLibraryAsSortedArray('name');
                var selectiOptions = [];
                var listItems = [], name = '';

                sortedLibrary.forEach(function(library) {
                    if (library.name !== DEFAULTLIST) {
                        selectiOptions.push('<option class="list-item" value="'+library.oid+'">'+library.name+'</option>');
                        listItems.push('<li class="list-item" role="radio" aria-checked="false"><a href="'+library.oid+'"><span class="title line-clamp line-clamp-1">'+library.name+'</span></a></li>');
                    }
                });

                $libraryListDropdown.find('option').remove().end().append(selectiOptions.join(' '));
                $libraryList.find('li').remove().end().append(listItems.join(' '));

                if (selected) {
                    $libraryListDropdown.find('option.'+selected).prop('selected', true);
                    $libraryList.find('li.'+selected).addClass('active');
                } else {
                    $libraryListDropdown.find('option:first-child').prop('selected', true);
                    $libraryList.find('li:first-child').addClass('active');
                }

                if (personalizationUtils.commonUtils.isMobile()) {
                    selectedList = $libraryListDropdown.find('option:selected').val();
                } else {
                    selectedList = $libraryList.find('.active a').attr('href');
                }
            }

            function _showModal(renderedMarkup, article, cb, hidecb) {
                if (!cb) {
                    cb = handleModalOpened;
                }

                if (!hidecb) {
                    hidecb = $.noop;
                }

                $librarylistmodal.off('show.bs3.modal').on('show.bs3.modal', [renderedMarkup, article], cb)
                    .off('hide.bs3.modal').on('hide.bs3.modal', [renderedMarkup, article], hidecb);

                $librarylistmodal.data(article);
                $librarylistmodal.bs3modal({
                    backdrop: true,
                    keyboard: true
                });
            }

            function _handleListDeletion(evt) {
                evt.preventDefault();
                selectedList = $(evt.target).parents('.article').data('oid');
                articleURL = $(evt.target).parent('a').attr('href');
                var article = personalizationUtils.storeUtils.getArticleFromLibrary(selectedList, articleURL);
                _showModal(evt.data, article, _handleListDeletionModalOpened);
            }

            function _handleMoveArticle(evt) {
                evt.preventDefault();
                var selectedList = $(evt.target).parents('.article').data('oid'),
                article = $(evt.target).parent('a').data(),
                id = 'move' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
                $(evt.target).parent('a').attr('id', id);

                //TODO: refactor to replace href with url
                article.url = article.href;

                _showModal(evt.data, {
                    article : personalizationUtils.storeUtils.getArticleFromLibrary(selectedList, article.url),
                    parent: id,
                    oid: selectedList
                }, _handleMoveArticleModalOpened);
                $('.overlay-header .article-title').html('"' + article.title + '"');
            }

            function handleModalOpened(evt) {
                var $modal = $(evt.currentTarget);

                try {
                    $('.modal-content', $modal).removeClass('success').html(evt.data[0]);
                    $('.articlename', $modal).html(evt.data[1].title);
                } catch (err) {
                    personalizationUtils.loggerUtils.error("Cannot delete the list", err);
                }

            }

            function _handleRemovedArticleModalOpened(evt) {
                var $modal = $(evt.currentTarget), articles = [], data = evt.data[1];
                try {
                    $('.modal-content',$modal).removeClass('success').html(evt.data[0]);
                    $('.description-item',$modal).hide();

                    data.removed.forEach(function (article) {
                        articles.push('<li class="listitem">"'+article.title+'"</li>');
                    });

                    if (data.removed.length > 1) {
                        $('.multiplearticles',$modal).show();
                        $('.multiplearticles .listname',$modal).html(data.library.name);
                        $('.multiplearticles .list', $modal).html('').append(articles);
                    } else {
                        $('.singlearticle',$modal).show();
                        $('.singlearticle .listname',$modal).html(data.library.name);
                        $('.singlearticle .list', $modal).html('').append(articles);
                    }

                } catch (err) {
                    personalizationUtils.loggerUtils.error();
                }
            }

            function _handleRemovedArticleModalClosed(evt) {
                var $modal = $(evt.currentTarget), data = evt.data[1];
                personalizationUtils.storeUtils.deleteArticlesFromLibrary(data.oid,data.removed,function() {
                    $('.modal-content', $modal).addClass('success');
                    $('.alert-success', $modal).attr('aria-hidden', false);
                    $(document).trigger('library.updated', data.oid);
                    loadArticles();
                }, function (err) {
                    genericErrorDialog.showDialog();
                });
            }

            function _handleMoveArticleModalOpened(evt) {
                var $modal = $(evt.currentTarget);
                try {
                    $('.modal-content',$modal).removeClass('success').html(evt.data[0]);
                    var article = $modal.data('article');
                    bindMoveArticleOverlayEvents($modal, evt.data[1].oid,evt.data[1].article);
                    loadLibraryList();
                    showArticle(article);

                } catch (err) {
                    personalizationUtils.loggerUtils.error();
                }
            }

            function _handleListDeletionModalOpened(evt) {
                var $modal = $(evt.currentTarget);

                try {
                    $('.modal-content', $modal).removeClass('success').html(evt.data[0]);
                    $('.articlename', $modal).html(evt.data[1].title);
                } catch (err) {
                    personalizationUtils.loggerUtils.error("Cannot delete the list", err);
                }
            }

            function _deleteArticle(evt) {
                evt.stopPropagation();

                var article = personalizationUtils.storeUtils.getArticleFromLibrary(selectedList, articleURL);
                personalizationUtils.storeUtils.deleteArticleFromLibrary(selectedList, articleURL, function() {
                    $('.modal-content', $librarylistmodal).addClass('success');
                    $('.alert-success', $librarylistmodal).attr('aria-hidden', false);
                    $('.overlay-footer', $librarylistmodal).find('#moveArticleCancelaction').addClass('btn-default');

                    $('.alert-success').find('span').after("<span>\""+ article.title +"\"</span>");
                    $(document).trigger('library.updated', selectedList);
					loadArticles();
                    var activeListName = $(".librarylist .librarylistitem.active").attr("data-title");
                    tracking.satelliteTracking({
                        'list': {
                            listName: activeListName,
                            ArticleSaveLocation: activeListName,
                            interactionType: 'Article Interaction',
                            articleSaveType : 'Unsaved Article'
                        },
                        'user': {
                            gigyaID: personalizationUtils.accountUtils.getInfo().UID
                        }
                    }, 'unsavedArticle', false);
                    var memberFirm = (window.kpmgPersonalize && window.kpmgPersonalize.snp.params.countryCode && window.kpmgPersonalize.snp.params.countryCode.toUpperCase()) || '';
                    if (memberFirm === "XX") {
                        memberFirm = "GLOBAL";
                    }
                    // window.digitalData.page.pageInfo.industryPath = $(this).closest('[data-article-type]').attr('data-article-type');
                    window.digitalData.page.article.articleDetails = article.title.concat(' | ', 'KPMG', ' | ', memberFirm);
                    tracking.track('unsavedArticle', 'delete');
                }, function (err) {
                    genericErrorDialog.showDialog();
                });
            }

            function _setShownFlagforArticleRemoved() {
                $librarylistmodal.bs3modal('hide');
                personalizationUtils.commonUtils.setValue('removedArticleOverlayShown',true);
            }

            function _handleNewListClick(evt) {
                evt.preventDefault();
                $newListControl.addClass('is-editing');
                $newListControl.find('form').attr('aria-hidden', false);
                $newListControl.find('.error').attr('aria-hidden', true);
                $newListInput.attr('aria-labelledby','');
                $newListInput.trigger('focus');
                $alerts.hide();
            }

            function _filterSearch(evt) {
                var query = $.trim($search.val());
                var $list = $libraryList.find('li');
                $list.each(function (index, elem) {
                    var listValue = $('a', elem).html().toLowerCase();
                    if (listValue.indexOf(query.toLowerCase()) > -1) {
                        $(elem).show();
                    } else {
                        $(elem).hide();
                    }
                });
            }

            function _handleListSelection(evt) {
                evt.preventDefault();
                $('li', $libraryList).removeClass('active').attr('aria-checked',false);
                if (evt.type=== 'click' || evt.type === 'focusin') {
                    $(evt.currentTarget).parent('li').addClass('active').attr('aria-checked',true);
                    selectedList = $(evt.currentTarget).attr('href');
                } else {
                    selectedList = $(evt.currentTarget).val();
                }
            }

            function _resetListCreation() {
                $newListInput.val('');
                $newListForm.removeClass('has-error');
                $('.error > span', $newListForm).hide();
                $newListInput.parents('.form-group').removeClass('has-error');
                $newListControl.find('form').prop('aria-hidden', true);
                $saveToListSection.removeClass('loading');
            }

            function isValid($input, $context) {
                //changed the variable name from isValid to isValidFlag due to jshint error
                var inputVal = $.trim($input.val()),
                isValidname = inputVal.length,
                validPtrn = /^[^<>;]*$/g;

                $newListInput.parents('.form-group').removeClass('has-error');
                $('.error > span', $context).hide();
                $error.addClass('hidden');

                if (!isValidname) {
                    $('.error', $context).removeClass('hidden').find('.empty').show();
                    $error.removeClass('hidden').find('.empty').show();
                }

                if (personalizationUtils.storeUtils.getLibraryIdByName(inputVal)) {
                    $alerts.hide();
                    // $error.removeClass('hidden').find('.listnameexists').show();
                    $('.error', $context).removeClass('hidden').find('.listnameexists').show();
                    isValidname = false;
                }
                
                if (!isValidname || !validPtrn.test(inputVal)) {

                    var $formGroup = $newListInput.parents('.form-group');
                    $formGroup.addClass('has-error');
                    $formGroup.find('.error').attr('aria-hidden',false);
                    $newListInput.attr('aria-labelledby','inputerror');
                    $newListInput.trigger('focus');
                    return false;
                }

                return true;
            }

            function _createNewLibraryList(evt) {
                evt.preventDefault();
                var newList = $.trim($newListInput.val());
                if (isValid($newListInput,$newListControl)) {
                    $saveToListSection.addClass('loading');
                    personalizationUtils.storeUtils.createNewLibrary(newList, function () {
                        $newListControl.removeClass('is-editing');
                        $saveToListSection.removeClass('loading');
                        $error.addClass('hidden');
                        _resetListCreation(evt);
                        loadLibraryList();
                    }, function (err) {
                        genericErrorDialog.showDialog();
                    });
                }
            }

            function _cancelNewListCreation(evt) {
                _resetListCreation(evt);
                $newListControl.removeClass('is-editing');
                $error.addClass('hidden');
            }

            function _handleSavetoLibrary(evt) {
                var fromList = evt.data[0],
                    toList = selectedList,
                    article = evt.data[1];

                $alerts.hide();

                if (fromList && toList && article) {
                    var alreadysavedArticles = personalizationUtils.storeUtils.findArticleByUrl(article.url);
                    var $alreadySavedError = $error.find('.alreadysaved'), isAlreadySaved = false;

                    alreadysavedArticles.forEach(function (article) {
                        if (article.oid === toList && !isAlreadySaved) {
                            isAlreadySaved = true;
                        }
                    });
                    var listName = personalizationUtils.storeUtils.getLibraryById(toList);
                    listName =  listName.name  ;

                    if (fromList === toList || isAlreadySaved) {

                        $error.removeClass('hidden');
                        var savedList = $('.alert-error.alreadysaved span');
                        savedList.text( listName );
                        $alreadySavedError.show();

                    } else {
                        personalizationUtils.storeUtils.moveArticle(fromList, toList, article, function(toList) {
                            $librarylistmodal.find('.article-title').hide();
                            $librarylistmodal.find('.overlay-footer').remove();
                            $librarylistmodal.find('#description').hide();
                            var footer = "<div class='overlay-footer' role='footer'><div class='row-same-height row-full-height ' role='row'><div class='col-md-6'><div class='overlay-controls'><a class='btn btn-cta btn-default btn-cancel' href='#' id='' data-dismiss='modal'><span class='icon-close'></span>"+ window.kpmgPersonalize.i18n.customMsgs.close +"</a></div></div></div></div>";
                            $librarylistmodal.find(".overlay-content > div:first-child").html("<div class='alert alert-success'><span class='icon-checkmark'></span>"+ article.title +" moved to "+ listName + "</div>" );
                            $librarylistmodal.find(".movearticle").append(footer);
                            $librarylistmodal.find(".overlay-content").addClass('movearticle-content');
                            $librarylistmodal.find(".overlay-header").append("<hr class='divider'>");
                            $('.overlay-content  .alert-success', $librarylistmodal).show();
                            $(document).trigger('library.updated', toList);
                        }, _onMoveFailed);
                    }
                }
            }

            function _onMoveFailed(err) {
                $librarylistmodal.bs3modal('hide');
                genericErrorDialog.showDialog();
            }

            function _saveArticle(libraryId, article) {
                personalizationUtils.storeUtils.saveArticleToLibrary(libraryId, article, onSaveArticleSuccess, onSaveArticleError);
            }

            function onSaveArticleSuccess(oid, library) {
                $librarylistmodal.bs3modal('hide');
                $(parent).addClass('active');
                $(document).trigger('library.updated', oid);
            }

            function onSaveArticleError(err) {
                genericErrorDialog.showDialog();
            }

            function _copyToclipboard(evt) {
                evt.preventDefault();
                $('#clipboardinput', $librarylistmodal).trigger('select');
                document.execCommand('copy');
                $('.modal-content', $librarylistmodal).addClass('success');
            }

            initialize();
        };

        return Librarylist;
    }
);
