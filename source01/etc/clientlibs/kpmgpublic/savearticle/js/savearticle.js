define(['jquery', 'tracking','personalizationUtils'],
    function($, Tracking, personalizationUtils) {
        'use strict';

        var SaveArticle = function(elem, componentName) {
            var trck = new Tracking(elem, 'SaveArticle'),
            $el = (elem instanceof jQuery) ? elem : $('.module-' + componentName);


            var $kpmgmodal = $('#kpmgModal'),
            $quickSave = $('#quicksave'),
            $search = $('#search'),
            $libraryListDropdown = $('#librarylistdropdown'),
            $libraryList = $('#librarylist'),
            $newListControl = $('.new-list-controls'),
            $newListForm = $('.form-createList .form-group'),
            $newlistButton = $('#newlistbtn'),
            $newListInput = $('#newlist'),
            $newListCancelBtn = $('#cancelcreate'),
            $newListCreateBtn =  $('#createlist'),
            $cancelAction = $('#cancelaction'),
            $saveToList = $('#savetolist'),
            $article = $('#articlePreview'),
            $saveToListSection = $('.save-to-list-section');

            var article = $kpmgmodal.data('article');
            var DEFAULTLIST = 'quicksavedlist';


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
                $newlistButton.on('click.saveArticle', _handleNewListClick);
                $quickSave.on('click.saveArticle', _handleQuickSaveClick);
                $search.on('keyup.saveArticle', _filterSearch);
                $libraryListDropdown.on('change.saveArticle', _handleListSelection);
                $newListCreateBtn.on('click.saveArticle', _createNewLibraryList);
                $newListCancelBtn.on('click.saveArticle', _cancelNewListCreation);
            }

            function showArticle() {
                if(typeof article === 'object') {
                    $('.article-image',$article).attr('src',article.image);
                    $('.article-title',$article).html(article.title);
                    $('.article-description',$article).html(article.description);
                }
            }

            function loadLibraryList() {
                var userLibrary = personalizationUtils.storeUtils.getUserLibrary();
                var selectiOptions = [];
                var listItems = [], name = '';

                for(var library in userLibrary.libraries) {
                    if(userLibrary.libraries.hasOwnProperty(library)) {
                        name = userLibrary.libraries[library].name;
                        if(name !== DEFAULTLIST) {
                            selectiOptions.push('<option class="list-item" value='+library+'">'+name+'</option>');
                            listItems.push('<li class="list-item" role="radio" aria-checked="false"><a href="'+library+'">'+name+'</a></li>');
                        }
                    }
                }

                $libraryListDropdown.find('option').remove().end().append(selectiOptions.join(' '));
                $libraryList.find('li').remove().end().append(listItems.join(' '));
            }

            function saveArticle() {
                personalizationUtils.storeUtils.saveArticleToLibrary();
            }

            function createList() {
                personalizationUtils.storeUtils.createNewLibrary();
            }

            function _handleNewListClick(evt) {
                evt.preventDefault();
                $newListControl.addClass('is-editing');
                $newListControl.find('form').attr('aria-hidden', false);
                $newListControl.find('.error').attr('aria-hidden', true);
                $newListInput.attr('aria-labelledby','');
                $newListInput.trigger('focus');
            }

            function _handleQuickSaveClick(evt) {
                evt.preventDefault();
                if(typeof article === 'object' && article.href) {
                    personalizationUtils.storeUtils.saveArticleToLibrary(DEFAULTLIST, article.href);
                }
            }

            function _filterSearch(evt) {
                var query = $.trim($search.val());
            }

            function _handleListSelection(evt) {
                // body...
            }

            function _resetListCreation() {
                $newListInput.val('');
                $newListForm.removeClass('has-error');
                $newListInput.parents('.form-group').removeClass('has-error');
                $newListControl.find('form').prop('aria-hidden', true);
                $saveToListSection.removeClass('loading');
            }

            function isValid() {
                //changed the variable name from isValid to isValidFlag due to jshint error
                var inputVal = $.trim($newListInput.val()),
                isValidFlag = inputVal.length,
                validPtrn = /[A-Za-z]/g;
                $newListInput.parents('.form-group').removeClass('has-error');

                if(!isValidFlag && !validPtrn.test(inputVal))  {
                    var $formGroup = $newListInput.parents('.form-group');
                    $formGroup.addClass('has-error');
                    $formGroup.find('.error').attr('aria-hidden',false);
                    $newListInput.attr('aria-labelledby','inputerror');
                    console.log($newListInput);
                    $newListInput.trigger('focus');
                    return false;
                }

                return true;
            }

            function _createNewLibraryList(evt) {
                evt.preventDefault();
                if(isValid()) {
                    var newList = $.trim($newListInput.val());
                    $saveToListSection.addClass('loading');
                    personalizationUtils.storeUtils.createNewLibrary(newList, function () {
                        $newListControl.removeClass('is-editing');
                        $saveToListSection.removeClass('loading');
                        _resetListCreation(evt);
                        loadLibraryList();
                    });
                }
            }

            function _cancelNewListCreation(evt) {
                _resetListCreation(evt);
                $newListControl.removeClass('is-editing');
            }

            function enableAlly(argument) {
                $saveToList.on('blur.saveArticle', function () {
                    $(this).parents('.component').trigger('focus');
                });
            }

            initialize();

			$(document).trigger('template.loaded');
        };

        return SaveArticle;
    }
);