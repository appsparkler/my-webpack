define(['jquery', 'tracking','personalizationUtils','genericErrorDialog'],
    function($, Tracking, personalizationUtils, genericErrorDialog) {
        'use strict';

        var AddToLibraryOverlay = function(elem, componentName) {
            var tracking = new Tracking(elem, 'AddToLibraryOverlay'),
            $el = (elem instanceof jQuery) ? elem : $('.module-' + componentName);
            //dom
            var  $libraryOverlay = $('.add-to-library-overlay'),
            $kpmgmodal =  $('#kpmgModal'),
            $quickSave =  $libraryOverlay.find('#quicksave'),
            $search =  $libraryOverlay.find('#search'),
            $libraryListDropdown =  $libraryOverlay.find('#librarylistdropdown'),
            $libraryList =  $libraryOverlay.find('#librarylist'),
            $newListControl =  $libraryOverlay.find('.new-list-controls'),
            $newListForm =  $libraryOverlay.find('.form-createList .form-group'),
            $newlistButton =  $libraryOverlay.find('#newlistbtn'),
            $newListInput =  $libraryOverlay.find('#newlist'),
            $newListCancelBtn =  $libraryOverlay.find('#cancelcreate'),
            $newListCreateBtn =   $libraryOverlay.find('#createlist'),
            $cancelAction =  $libraryOverlay.find('#cancelaction'),
            $saveToList =  $libraryOverlay.find('#savetolist'),
            $article =  $libraryOverlay.find('#articlePreview'),
            $saveToListSection =  $libraryOverlay.find('.save-to-list-section'),
            $error =  $libraryOverlay.find('#error'),
            $alerts =  $libraryOverlay.find('.alert'),
            $createListForm =  $libraryOverlay.find('.form-createlist'),
            $searchButton = $libraryOverlay.find('.submitSearch'),
            $closeBtn = $kpmgmodal.find('.btn-close');

            //CONSTANTS
            var DEFAULTLIST = 'quicksavedlist',
                memberFirm = (window.kpmgPersonalize && window.kpmgPersonalize.snp.params.countryCode && window.kpmgPersonalize.snp.params.countryCode.toUpperCase()) || '',
                accountInfo = personalizationUtils.accountUtils.getInfo();

            if (memberFirm === "XX") {
                memberFirm = "GLOBAL";
            }

            //derived
            var article = $kpmgmodal.data('article'),
            parent = '#'+$kpmgmodal.data('parent'),
            articlelimit = $kpmgmodal.data('articlelimit'),
            selectedList, selectedListName;

            if (articlelimit === "true") {
                $libraryOverlay.find('.addtolibraryoverlay').remove();
                $libraryOverlay.find('.articlelimit').show();
                $("#kpmgModal > .modal-dialog > .btn-close").hide();
                $libraryOverlay.find("#gotolibbtn").on('click', function(){
                    var pth, locale;
                    locale = personalizationUtils.accountUtils.getLocale();
                    locale = "/" + locale.countryCode+"/"+locale.languageCode + "/";
                    pth = JSON.parse(sessionStorage.myKpmgFlyoutJSON);
                    pth = pth[locale].links.library.url;
                    personalizationUtils.pathUtils.gotoPage(window.location.origin + pth);
                });
            }

            article.url = article.href;

            var processLibraryName = personalizationUtils.commonUtils.processLibraryName;

            /**
             * initialize the component
             * @return {[type]} [description]
             */
            function initialize(){
                bindEvents();
                loadLibraryList();
                showArticle();
                enableAlly();
            }

            function bindEvents() {
                $newlistButton.on('click.saveArticle', article,  _handleNewListClick);
                $quickSave.on('click.saveArticle', article, _handleQuickSaveClick);
                $search.on('keyup.saveArticle', _filterSearch);
                //$(document).on('change', '.add-to-library-overlay #librarylistdropdown', _handleListSelection);
                $libraryListDropdown.on('change.saveArticle', _handleListSelection);
                $libraryList.on('click.saveArticle','li a', _handleListSelection);
                $newListCreateBtn.on('click.saveArticle', _createNewLibraryList);
                $newListCancelBtn.on('click.saveArticle', _cancelNewListCreation);
                $saveToList.on('click.saveArticle', _handleSavetoLibrary);
                $createListForm.on('submit.saveArticle', _createNewLibraryList);
                $searchButton.on('click.saveArticle',_searchBtnClick);

                //Fallback for browsers which doesn't support maxlength property
                $( 'input[maxlength]').on('keyup', function() {
                    var $this = $(this),
                        maxLength = $this.attr('maxlength') && parseInt($this.attr('maxlength'));

                    if ( maxLength && $this.val().length >= maxLength ) {
                        return false;
                    }
                });
                
                $closeBtn.on("click", function() {
                    $(parent).trigger('focus');
                });
                $closeBtn.on("keydown", function(e) {
                    if (e.key === 'Enter') {
                        $(this).trigger("click");
                        $(parent).trigger('focus');
                    }
                });
            }

            function showArticle() {
                if(typeof article === 'object') {
                    $libraryOverlay.find('.overlay-header .article-title').html('"' + article.title + '"');
                    $('.article-image',$article).attr('src',article.image + '/jcr:content/renditions/cq5dam.web.237.158.jpg');
                    $('.article-title',$article).html(article.title);
                    $('.article-description',$article).html(article.description);
                }
            }

            function loadLibraryList(selected) {
                var sortedLibrary = personalizationUtils.storeUtils.getLibraryAsSortedArray('name');
                var selectiOptions = [];
                var listItems = [], name = '';

                sortedLibrary.forEach(function(library){
                    if(library.name !== DEFAULTLIST) {
                        selectiOptions.push('<option class="list-item" value="'+library.oid+'">'+library.name+'</option>');
                        listItems.push('<li class="list-item" role="radio" aria-checked="false"><a class="" href="'+library.oid+'"><span class="title line-clamp line-clamp-1">'+library.name+'</span></a></li>');
                    }
                });

                $('#librarylistdropdown', $kpmgmodal).find('option').remove().end().append(selectiOptions.join(' '));
                $('#librarylist',$kpmgmodal).find('li').remove().end().append(listItems.join(' '));

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

            function _saveArticle(libraryId, article) {
                var alreadysavedArticles = personalizationUtils.storeUtils.findArticleByUrl(article.url) || [];
                var $alreadySavedError = $error.find('.alreadysaved'), isAlreadySaved = false;

                alreadysavedArticles.forEach(function (article) {
                    if(article.oid === libraryId && !isAlreadySaved) {
                        isAlreadySaved = true;
                    }
                });

                if(isAlreadySaved){
                    $error.removeClass('hidden');
                    $alreadySavedError.show();
                } else {
                    personalizationUtils.storeUtils.saveArticleToLibrary(libraryId, article, onSaveArticleSuccess, onSaveArticleError);
                }
            }

            function _handleSavetoLibrary(evt) {
                if(selectedList && typeof article === 'object') {
                    article.active = true;

                    window.digitalData.page.article.articleDetails = article.title.concat(' | ', 'KPMG', ' | ', memberFirm);
                    _saveArticle(selectedList, article);
                }
            }

            function _handleNewListClick(evt) {
                evt.preventDefault();
                $newListControl.addClass('is-editing');
                $newListControl.find('form').attr('aria-hidden', false);
                $newListControl.find('.error').attr('aria-hidden', true);
                $newListInput.attr('aria-labelledby','');
                $newListInput.trigger('focus');
            }

            function onSaveArticleSuccess(oid, library) {
                var trackingObj = {
                    list: {
                        interactionType: 'Article Interaction'
                    }
                };

                $kpmgmodal.bs3modal('hide');
                $(parent).addClass('active');
                $(parent).attr('title','').css("cursor","default");
                $(document).trigger('library.updated', oid);

                if (library && library.name === DEFAULTLIST) {
                    trackingObj.list.ArticleSaveLocation = "Quick Saved List";
                    trackingObj.list.articleSaveType = "Quick Save";
                } else if (library && library.name) {
                    trackingObj.list.ArticleSaveLocation = library.name;
                    trackingObj.list.articleSaveType = "Save to a list";
                }

                window.digitalData.user.gigyaID = accountInfo.UID;
                tracking.satelliteTracking(trackingObj, 'articleSaveEnd', false);
                tracking.track('articleSaveEnd', '');
            }

            function onSaveArticleError(err) {
                var options = {};
                $alerts.hide();
                $error.removeClass('hidden');
                $kpmgmodal.bs3modal('hide');
                if (err.errorCode === 403007) {
                    options.description = window.kpmgPersonalize.i18n.customMsgs.gigya_cookies_disabled_error_description;
                }
                genericErrorDialog.showDialog(options);
            }

            function _handleQuickSaveClick(evt) {
                evt.preventDefault();
                if(typeof article === 'object') {
                    article.active = true;
                    var libraryId = personalizationUtils.storeUtils.getLibraryIdByName(DEFAULTLIST),
                        libraryName =personalizationUtils.storeUtils.getLibraryByName(DEFAULTLIST);

                    window.digitalData.page.article.articleDetails = article.title.concat(' | ', 'KPMG', ' | ', memberFirm);
                    if(!libraryId) {
                        personalizationUtils.storeUtils.createNewLibrary(DEFAULTLIST, article, onSaveArticleSuccess, onSaveArticleError);
                    } else {
                        _saveArticle(libraryId, article);
                    }
                }
            }

            function _filterSearch(evt) {
                var query = $.trim($search.val());
                var $list = $libraryList.find('li');
                $list.each(function (index, elem) {
                    var listValue = $('a', elem).html().toLowerCase();
                    if(listValue.indexOf(query.toLowerCase()) > -1) {
                        $(elem).show();
                    } else {
                        $(elem).hide();
                    }
                });
            }

            function _searchBtnClick(evt){
                var query = $.trim($search.val());
                _filterSearch(evt);
            }

            function _handleListSelection(evt) {
                evt.preventDefault();
                selectedListName="";
                $('li', $libraryList).removeClass('active').attr('aria-checked',false);
                if (evt.type=== 'click' || evt.type === 'focusin') {
                    $(evt.currentTarget).parent('li').addClass('active').attr('aria-checked',true);
                    selectedList = $(evt.currentTarget).attr('href');
                    selectedListName=$(evt.currentTarget).find('.title').text();
                } else {
                    selectedList = $(evt.currentTarget).val();
                }
            }

            function _resetListCreation() {
                $newListInput.val('');
                $newListForm.removeClass('has-error');
                $newListInput.parents('.form-group').removeClass('has-error');
                $newListControl.find('form').prop('aria-hidden', true);
                $saveToListSection.removeClass('loading');
            }

            function isValid($input, $context) {
                //changed the variable name from isValid to isValidFlag due to jshint error
                var inputVal = processLibraryName($input.val()),
                    isValidname = inputVal.length ? inputVal.length <= 35: false;

                $newListInput.parents('.form-group').removeClass('has-error');
                $('.error > span', $context).hide();
                $alerts.hide();

                if (!inputVal.length) {
                    $('.error', $context).removeClass('hidden').find('.empty').show();
                }

                if (personalizationUtils.storeUtils.getLibraryIdByName(inputVal)) {
                    $('.error', $context).removeClass('hidden').find('.listnameexists').show();
                    isValidname = false;
                }

                if (!isValidname) {
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
                var newList = processLibraryName($newListInput.val());
                if(isValid($newListInput,$newListControl)) {
                    $saveToListSection.addClass('loading');
                    personalizationUtils.storeUtils.createNewLibrary(newList, function () {
                        $newListControl.removeClass('is-editing');
                        $saveToListSection.removeClass('loading');
                        $error.addClass('hidden');
                        _resetListCreation(evt);
                        loadLibraryList();
                        tracking.satelliteTracking({
                                'list': {
                                    listName: newList,
                                    interactionType:"Library Interaction"
                                }
                            }, 'libraryInteraction', false);
                        window.digitalData.user.listAction="Create List";
                        tracking.track('libraryInteraction',evt.currentTarget.text);
                    }, onSaveArticleError);
                }
            }

            function _cancelNewListCreation(evt) {
                _resetListCreation(evt);
                $newListControl.removeClass('is-editing');
                $error.addClass('hidden');
            }

            function enableAlly(argument) {
                $('li', $libraryList).on('focus',function () {
                    $(this).addClass('focus');
                });

                $('li', $libraryList).on('blur',function () {
                    $(this).addClass('focus');
                });

                $('.btn-cta', $libraryOverlay).on('focus', function () {
                    $(this).addClass('focusOutline');
                });

                $('.btn-cta', $libraryOverlay).on('blur', function () {
                    $(this).removeClass('focusOutline');
                });
            }
            initialize();

			$(document).trigger('template.loaded');
        };

        return AddToLibraryOverlay;
    }
);
