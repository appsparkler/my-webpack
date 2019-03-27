define(['jquery','underscore', 'tracking','handlebars','precompile','personalizationUtils','genericErrorDialog'],
    function($, _, Tracking,Handlebars,PrecompiledHandlebars, personalizationUtils, genericErrorDialog) {
        'use strict';

        var Librarylistmanagement = function(elem, componentName) {
            // Keep the following lines at the bottom of the Librarylistmanagement function
            var tracking = new Tracking(elem, 'Librarylistmanagement');

            var $kpmgmodal = $('#kpmgModal'),
            $listManagementModule = $('.module-librarylistmanagement'),
            $libraryList = $listManagementModule.find('ul.librarylist'),
            $createnewListBtn = $listManagementModule.find('#createnewlistbtn'),
            $libraryListDropdown = $listManagementModule.find('#listManagementLibrarylistdropdown'),
            $newListControl = $('.new-list-controls'),
            $editListControl = $('.edit-list-controls'),
            $newListForm = $('.form-createList .form-group'),
            $newListInput = $listManagementModule.find('#newlistinput'),
            $error = $('#inputerror'),
            $alerts = $('.alert'),
            $createListForm = $('.form-createlist'),
            $newListCancelBtn = $listManagementModule.find('#cancelcreatebtn'),
            $newListCreateBtn =  $listManagementModule.find('#createlistbtn'),
            $allItemTitle = $listManagementModule.find('#listManagementDefaultlisttitle'),
            $createnewListBtnMobile = $listManagementModule.find('#createnewlistbtnmobile'),
            $librarylistmanagementmodal = $('#librarylistmanagementmodal'),
            $Librarylistmanagement = $listManagementModule.find('aside.Librarylistmanagement'),links;

            //CONSTANTS
            var DEFAULTLIST = 'quicksavedlist',
                accountInfo = personalizationUtils.accountUtils.getInfo();

            var selectedList,isProcessing = false,isMobile= false,
            compCreatelistoverlay = 'template-createlistoverlay',
            compDeletelist = 'template-deletelist',
            compEditlist = 'template-editlist',
            compEditlistoverlay = 'template-editlistoverlay',
            compEditsuccess = 'template-editsuccess',
            compSharelist = 'template-sharelist',
            templates = {
                'delete': PrecompiledHandlebars[compDeletelist],
                'share': PrecompiledHandlebars[compSharelist],
                'edit': PrecompiledHandlebars[compEditlist],
                'editsuccess': PrecompiledHandlebars[compEditsuccess],
                'createNewList' : PrecompiledHandlebars[compCreatelistoverlay],
                'editlist': PrecompiledHandlebars[compEditlistoverlay]
            },
            data = {
                'hbs': {
                    'createlistoverlay': {
                        'createAList': window.kpmgPersonalize.i18n.customMsgs.createAList,
                        'thatNameIsTaken': window.kpmgPersonalize.i18n.customMsgs.libraryListThatNameIsTaken,
                        'empty': window.kpmgPersonalize.i18n.customMsgs.libraryListEmpty,
                        'enternewlist': window.kpmgPersonalize.i18n.customMsgs.libraryListEnternewlist,
                        'createsuccessdescription': window.kpmgPersonalize.i18n.customMsgs.createsuccessdescription,
                        'save': window.kpmgPersonalize.i18n.customMsgs.listmanagementsave,
                        'cancel': window.kpmgPersonalize.i18n.customMsgs.libraryListCancel,
                        'close': window.kpmgPersonalize.i18n.customMsgs.close
                    },
                    'deletelist': {
                        'deleteThisList': window.kpmgPersonalize.i18n.customMsgs.deleteThisList,
                        'deleteThisListDescription':  window.kpmgPersonalize.i18n.customMsgs.deleteThisListDescription,
                        'successDescription': window.kpmgPersonalize.i18n.customMsgs.libraryListSuccessDescription,
                        'deleteIt': window.kpmgPersonalize.i18n.customMsgs.libraryListDeleteIt,
                        'keepIt': window.kpmgPersonalize.i18n.customMsgs.keepIt,
                        'close': window.kpmgPersonalize.i18n.customMsgs.close
                    },
                    'editlist':{
                        'editYourListName': window.kpmgPersonalize.i18n.customMsgs.editYourListName,
                        'editsuccessdescriptionmobile': window.kpmgPersonalize.i18n.customMsgs.editsuccessdescriptionmobile,
                        'namechanges': window.kpmgPersonalize.i18n.customMsgs.namechanges,
                        'listnamechanged': window.kpmgPersonalize.i18n.customMsgs.listnamechanged
                    },
                    'sharelist':{
                        'shareThisList': window.kpmgPersonalize.i18n.customMsgs.shareThisList,
                        'shareThisListDescription': window.kpmgPersonalize.i18n.customMsgs.libraryListShareThisListDescription,
                        'copySuccessDescription': window.kpmgPersonalize.i18n.customMsgs.copySuccessDescription,
                        'copyFailedClipboardAccessDenied': window.kpmgPersonalize.i18n.customMsgs.copyFailedClipboardAccessDenied,
                        'listmanagementcopy': window.kpmgPersonalize.i18n.customMsgs.libraryListCopy
                    }
                }
            };

            var processLibraryName = personalizationUtils.commonUtils.processLibraryName;

            function initialize() {
                bindEvents();
                loadLibraryList();
                enableAlly();
            }

            function bindEvents() {
                $libraryList.off().on('click.librarylist','li', _handleListSelection);
                $libraryListDropdown.on('change.librarylist',_handleListSelection);

                $libraryList.on('click','.delete',templates.delete(data), _handleListDeletion);
                $libraryList.on('click.share', '.share', templates.share(data), _handleGigyaShare);
                $libraryList.on('click.edit', '.edit', templates.edit(data), _handListEdit);

                $Librarylistmanagement.on('click.createlist','#createnewlistbtnmobile',templates.createNewList(data), _handleNewListOverlay);
                $createnewListBtn.off().on('click.librarylist', _handleNewListClick);

                $libraryList.on('click.editlist','.edit-list-controls', function (evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                });

                $newListCreateBtn.on('click.createlist', _createNewLibraryList);
                $newListCancelBtn.on('click.createlist', _cancelNewListCreation);
                $createListForm.on('submit.createlist', _createNewLibraryList);

                $librarylistmanagementmodal.on('click.createlist','#createlistoverlaybtn', _createNewLibraryListOverlay);
                $librarylistmanagementmodal.on('submit.createlist','.form-createlist', _createNewLibraryListOverlay);
                $librarylistmanagementmodal.on('click.editlist','#editlistoverlaybtn', _editLibraryListOverlay);
                $librarylistmanagementmodal.on('submit.editlist','.form-editlist', _editLibraryListOverlay);

                $libraryList.on('click.editlist','.canceleditbtn', _cancelEditList);
                $libraryList.on('click.editlist','.editlistbtn', _editLibraryList);
                $libraryList.on('submit.editlist','.form-editlist', _editLibraryList);

                $librarylistmanagementmodal.on('click.deletelist','#deletelistbtn', _deleteList);
                $librarylistmanagementmodal.on('click.copy','#copytocb', _copyToclipboard);
                $libraryList.on('click.librarylist','.librarylistname', _listSelectionTracking);

                $(document).on('library.updated', function(evt,oid) {
                    personalizationUtils.loggerUtils.log(' library updated', evt, oid);
                    loadLibraryList(oid);
                });

                $(document).on('mobileBreakpoint', function() {
                    isMobile = true;
                });

                $(document).on('desktopBreakpoint', function() {
                    isMobile = false;
                });
                personalizationUtils.myKpmgFlyoutUtils.getLinksJson().done(function(data) {
                    links = data.links;
                });
                //Fallback for browsers which doesn't support maxlength property
                $( 'input[maxlength]').on('keyup', function() {
                    var $this = $(this),
                        maxLength = $this.attr('maxlength') && parseInt($this.attr('maxlength'));

                    if (maxLength && $this.val().length >= maxLength) {
                        return false;
                    }
                });
            }

            function loadLibraryList(selected) {
                var sortedLibrary = personalizationUtils.storeUtils.getLibraryAsSortedArray('name');
                var selectiOptions = [];
                var listItems = [],
                userInfo = personalizationUtils.accountUtils.getInfo(),
                data = personalizationUtils.storeUtils.getLibraryById('all');
                data.uid = userInfo.UID;
                data.count = data.pages.length;
                data.name = processLibraryName($allItemTitle.val());
                data.displayName = data.name;
                console.log("Links------------"+JSON.stringify(links));
                data.url =  window.location.origin + links.login.url.slice(0, -11) +'/publiclist.html?oid='+data.oid+'&uid='+data.uid;
                
                var listTmpl =Handlebars.compile('<li class="librarylistitem {{oid}} {{#if count}}hasarticle{{else}}empty{{/if}}" data-id="{{oid}}" data-title="{{name}}" role="listitem">'+
                        '<div class="list-inner">'+
                        '<a href="{{url}}" class="librarylistname">'+
                            '<span class="badge">{{count}} '+window.kpmgPersonalize.i18n.customMsgs.items +'</span><span class="title line-clamp line-clamp-1">{{displayName}}</span> {{#if hasInactive}}<span class="icon-info info">{{/if}}'+
                        '</a>'+
                        '<div class="librarylistitem-actions">'+
                            '<div class="actionitem " ><a href="" aria-label="'+window.kpmgPersonalize.i18n.customMsgs.deleteThisList+'" title="'+window.kpmgPersonalize.i18n.customMsgs.deleteThisList+'" class="delete" data-action="delete"><span class="icon-close"></span></a></div>'+
                            '<div class="actionitem " ><a href="" aria-label="'+window.kpmgPersonalize.i18n.customMsgs.editYourListName+'" title="'+window.kpmgPersonalize.i18n.customMsgs.editYourListName+'" class="edit" data-action="edit"><span class="icon-pencil" ></span></a></div>'+
                            '<div class="actionitem last-child"><a href="share{{oid}}" aria-label="'+window.kpmgPersonalize.i18n.customMsgs.shareThisList+'" title="'+window.kpmgPersonalize.i18n.customMsgs.shareThisList+'" class="share" data-action="share" id="share{{oid}}" data-title="{{name}}"'+
                                'data-url="{{url}}" data-desc="{{displayName}}" data-image="{{image}}/jcr:content/renditions/cq5dam.web.237.158.jpg">'+
                                '<span class="icon-share" ></span></a></div>'+
                        '</div>'+
                        '</div>'+
                    '</li>');

                listItems.push(listTmpl(data));
                selectiOptions.push('<option class="list-item '+data.oid+'" value="'+data.oid+'">'+data.name+'</option>');

                sortedLibrary.forEach(function(data) {
                    data.uid = userInfo.UID;
                    data.name = processLibraryName(data.name);
                    data.count = personalizationUtils.storeUtils.getArticleCountByLibrary(data.oid);
                    data.url =  window.location.origin + links.login.url.slice(0, -11) +'/publiclist.html?oid='+data.oid+'&uid='+data.uid;
                    data.hasInactive = personalizationUtils.storeUtils.hasInactive(data.oid);
                    // selectiOptions.push('<option class="list-item '+data.oid+'" value="'+data.oid+'">'+data.name+'</option>');
                    if (data.name === DEFAULTLIST) {
                        data.displayName = window.kpmgPersonalize.i18n.customMsgs.quicksavedlist;
                        listItems.splice(1,0,listTmpl(data));
                        selectiOptions.splice(1,0,'<option class="list-item '+data.oid+'" value="'+data.oid+'">'+data.displayName+'</option>');
                    } else {
                        data.displayName = data.name;
                        listItems.push(listTmpl(data));
                        selectiOptions.push('<option class="list-item '+data.oid+'" value="'+data.oid+'">'+data.displayName+'</option>');
                    }

                });

                $libraryListDropdown.find('option').remove().end()
                .append(selectiOptions.join(' ')).end();

                $libraryList.find('li').remove().end()
                .append(listItems.join(' ')).end();

                if (selected) {
                    $libraryListDropdown.find('option.'+selected).prop('selected', true);
                    $libraryList.find('li.'+selected).trigger('click');
                } else {
                    $libraryListDropdown.find('option:first-child').prop('selected', true);
                    $libraryList.find('li:first-child').trigger('click');
                }

                isProcessing = false;
            }

            function truncateString(str, num) {
                if (num > str.length) {
                    str.slice(num);
                    return str+"...";
                } else if (num < 3) {
                    str.slice(3);
                    return str;
                } else {
                    return str;
                }
            }

            function _handleListSelection(evt) {
                var selectedListTitle = '';
                evt.preventDefault();
                //evt.stopPropagation();
                $('li', $libraryList)
                .find('.edit-list-controls').remove().end()
                .removeClass('active')
                .removeClass('is-editing')
                .attr('aria-checked',false);
                // $('option', $libraryListDropdown).removeAttr('selected');

                if (evt.type=== 'click' || evt.type === 'focusin') {
                    if (!$(evt.currentTarget).hasClass('active')) {
                        $(evt.currentTarget).addClass('active').attr('aria-hidden',false);
                    }

                    selectedList = $(evt.currentTarget).data('id');
                    selectedListTitle = $(evt.currentTarget).find('.title').text();
                    // $libraryListDropdown.find('option.'+selectedList).attr('selected','selected');

                } else {
                    selectedList = $(evt.currentTarget).prop('selected', true).val();
                    $libraryList.find('li.'+selectedList).addClass('active').attr('aria-hidden',false);
                    selectedListTitle = $(evt.currentTarget).find('option:selected').text();
                }

                if (evt.originalEvent !== undefined) {
                    listTracking(selectedListTitle, 'View List');
                }
                $(document).trigger('library.selected', selectedList);
            }

            function _handleActionClick(evt) {
                evt.preventDefault();
                var id = $(evt.target).parents('.librarylistitem').data('id'),
                action = $(evt.target).data('action'),
                library = personalizationUtils.storeUtils.getLibraryById(id);
                _showModal(templates[action]);

            }

            function _showModal(renderedMarkup, oid, cb, closecb, delay) {

                var args = Array.prototype.slice.call(arguments),
                params = args.slice(0,args.length - 1);

                if (!cb) {
                    cb = handleModalOpened;
                }
                $librarylistmanagementmodal
                .off('show.bs3.modal').on('show.bs3.modal', [renderedMarkup, oid], cb)
                .off('hide.bs3.modal').on('hide.bs3.modal', closecb);
                $librarylistmanagementmodal.bs3modal({
                    backdrop:true,
                    keyboard: true
                });

                if(delay){
                    setTimeout(function(){
                        $librarylistmanagementmodal.bs3modal('hide');
                    },delay);
                }
            }

            function _handListEdit(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                var data = $(evt.target).parents('.librarylistitem').data();
                selectedList = data.id;
                if (isMobile) {
                    _showModal(templates.editlist(data), selectedList, function (evt) {
                        var $modal = $(evt.currentTarget);
                        try {
                            $('.modal-content',$modal).removeClass('success').html(evt.data[0]);
                            setTimeout(function () {
                                $('#editlistoverlayinput',$modal).val(data.title).trigger('select');
                            }, 10);
                        } catch(err) {
                            personalizationUtils.loggerUtils.error("cannot open overlay for edit list", err);
                        }
                    });
                } else {
                    var $parent = $(evt.currentTarget).parents('.librarylistitem');
                    $parent.addClass('is-editing').append(evt.data);
                    $parent.find('.editlistinput').val(data.title).trigger('select');
                }
            }

            function _handleListDeletion(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                var $listItem = $(evt.target).parents('.librarylistitem');
                selectedList = $listItem.data('id');
                $('.btn-close', $librarylistmanagementmodal).removeClass('close-align');
                var library = personalizationUtils.storeUtils.getLibraryById(selectedList);
                if (_.isArray(library.pages)) {

                    _showModal(evt.data, library,handleModalOpened,function () {
                        setTimeout(function() {
                            $('.delete', $listItem).trigger('focus');
                        }, 10);
                    });
                }
            }

            function handleModalOpened(evt) {
                var $modal = $(evt.currentTarget);
                try {
                    $('.modal-content',$modal).removeClass('success').html(evt.data[0]);
                    $('.libraryname', $modal).html('<span class="badge">'+evt.data[1].pages.length +" "+ window.kpmgPersonalize.i18n.customMsgs.items + ' </span>'+evt.data[1].name);
                } catch(err) {
                    personalizationUtils.loggerUtils.error("Cannot delete the list", err);
                }
            }

            function _handleGigyaShare(evt) {
                evt.preventDefault();
                var $share = $(evt.currentTarget),
                    data = evt.data;

                //evt.stopPropagation();
                personalizationUtils.dashboardUtils.handleGigyaShare(evt.currentTarget, tracking, componentName, {
                    onLoad: function (share) {
                        _handleShareOnload(share, $share, data);
                    }
                });
            }

            function _handleShareOnload(share, $parent, overlay) {
                var $shareContainer = $('.gig-simpleShareUI-content');
                var urlShare = '<div class="gig-simpleShareUI-button" provider="urlshare">'+
                                    '<div class="gig-simpleShareUI-button-inner" >'+
                                        '<span class="icon-share"></span>'+
                                        '<span style="" class="gig-simpleShareUI-buttonText gig-simpleShareUI-custom">'+ window.kpmgPersonalize.i18n.customMsgs.urllink +' </span>'+
                                    '</div>'+
                                '</div>';

                $shareContainer.append(urlShare);
                tracking.satelliteTracking({
                    'user': {
                        gigyaID: personalizationUtils.accountUtils.getInfo().UID,
                        listAction: "Share List"
                    }
                }, 'SocialShare', false);

                $shareContainer.on('click touchstart','[provider="urlshare"]',function (ts) {
                    ts.preventDefault();
                    _showModal(overlay, $parent.data(), function (evt) {
                        var $modal = $(evt.currentTarget);
                        try {
                            $('.modal-content',$modal).removeClass('success').html(evt.data[0]);
                            $('#clipboardinput',$modal).val(evt.data[1].url);
                            $('.gig-simpleShareUI').hide();
                        } catch(err) {
                            personalizationUtils.loggerUtils.error("Cannot delete the list", err);
                        }
                    }, function () {
                        setTimeout(function() {
                            $parent.trigger('focus');
                        }, 10);
                    });
                });
            }

            function _handleNewListOverlay(evt) {
                evt.preventDefault();
                _showModal(evt.data, 0, function (evt) {
                    var $modal = $(evt.currentTarget);
                    try {
                        $('.modal-content',$modal).removeClass('success').html(evt.data[0]);
                        setTimeout(function() {
                            $('#newlistoverlayinput',$modal).trigger('focus');
                        }, 10);
                    } catch(err) {
                        personalizationUtils.loggerUtils.error("Cannot delete the list", err);
                    }
                });
            }

            function _handleNewListClick(evt) {
                evt.preventDefault();
                //evt.stopPropagation();
                $newListControl.addClass('is-editing');
                $newListControl.find('form').attr('aria-hidden', false);
                $newListControl.find('.error').attr('aria-hidden', true);
                $newListInput.attr('aria-labelledby','');
                $newListInput.trigger('focus');
            }

            function _resetListCreation() {
                $newListInput.val('');
                $newListForm.removeClass('has-error');
                $('.error > span', $newListForm).hide();
                $newListInput.parents('.form-group').removeClass('has-error');
                $newListControl.find('form').prop('aria-hidden', true);
                $libraryList.removeClass('loading');
            }

            function isValid($input, $context) {
                //changed the variable name from isValid to isValidFlag due to jshint error
                var inputVal = processLibraryName($input.val()),
                    isValidname = inputVal.length ? inputVal.length <= 35: false;

                $input.parents('.form-group').removeClass('has-error');
                $('.error > span', $context).hide();

                if (!inputVal.length) {
                    $('.error', $context).removeClass('hidden').find('.empty').show();
                }

                if (personalizationUtils.storeUtils.getLibraryIdByName(inputVal)) {
                    $('.error', $context).removeClass('hidden').find('.listnameexists').show();
                    isValidname = false;
                }

                if (!isValidname) {
                    var $formGroup = $input.parents('.form-group');
                    $formGroup.addClass('has-error');
                    $formGroup.find('.error').attr('aria-hidden',false);
                    $input.attr('aria-labelledby','inputerror');
                    $input.trigger('focus');
                    return false;
                }

                return true;
            }

            function onSaveArticleSuccess(oid, library) {
                $librarylistmanagementmodal.bs3modal('hide');
                $(parent).addClass('active');
                $(document).trigger('library.updated', oid);
            }

            function onSaveArticleError(err) {
                $alerts.hide();
                $error.removeClass('hidden');
                $librarylistmanagementmodal.bs3modal('hide');
                genericErrorDialog.showDialog();
            }

            function listTracking(listName, listAction) {
                var trackingObj = {
                    list: {
                        listName: listName,
                        interactionType: 'Library Interaction'
                    }
                };

                if (window.digitalData) {
                    window.digitalData.user.gigyaID = accountInfo.UID;
                    window.digitalData.user.listAction = listAction;
                }

                tracking.satelliteTracking(trackingObj, 'libraryInteraction', false);
                tracking.track('libraryInteraction', '');
            }

            function _createNewLibraryListOverlay(evt) {
                evt.preventDefault();
                var $newListControl = $('.new-list-controls',$librarylistmanagementmodal),
                $newlistoverlayinput = $('#newlistoverlayinput',$librarylistmanagementmodal);

                if (isValid($newlistoverlayinput, $newListControl) && !isProcessing) {
                    $newListControl.addClass('loading');
                    isProcessing = true;
                    personalizationUtils.storeUtils.createNewLibrary(processLibraryName($newlistoverlayinput.val()), function (oid) {
                        $newListControl.removeClass('loading');
                        $('.error', $newListControl).addClass('hidden');
                        $librarylistmanagementmodal.bs3modal('hide');
                        loadLibraryList(oid);
                    },onSaveArticleError);
                }
            }

            function _editLibraryListOverlay(evt) {
                evt.preventDefault();
                var $editListControl = $('.edit-list-controls',$librarylistmanagementmodal),
                $editListInput = $('#editlistoverlayinput',$librarylistmanagementmodal),
                currentList = personalizationUtils.storeUtils.getLibraryById(selectedList),
                newName = processLibraryName($editListInput.val());

                if (currentList.name === newName) {
                    $librarylistmanagementmodal.bs3modal('hide');
                    return;
                }

                if (isValid($editListInput,$editListControl) && !isProcessing) {
                    $editListControl.addClass('loading');
                    isProcessing = true;
                    personalizationUtils.storeUtils.updateLibraryname(selectedList, processLibraryName($editListInput.val()), function () {
                        $editListControl.removeClass('loading');
                        $('.error', $editListControl).addClass('hidden');
                        $('.modal-content', $librarylistmanagementmodal).addClass('success');
                        $('.btn-close', $librarylistmanagementmodal).addClass('close-align');
                        loadLibraryList(selectedList);
                        setTimeout(function() {
                            $librarylistmanagementmodal.bs3modal('hide');
                        }, 3000);

                        listTracking(processLibraryName($editListInput.val()), 'Edit List');
                    }, onSaveArticleError);
                }
            }

            function _createNewLibraryList(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                if (isValid($newListInput, $newListControl) && !isProcessing) {
                    $newListControl.addClass('loading');
                    isProcessing = true;
                    personalizationUtils.storeUtils.createNewLibrary(processLibraryName($newListInput.val()), function (oid) {
                        var newListNameVal = $($newListInput).val();
                        $newListControl.removeClass('is-editing');
                        $libraryList.removeClass('loading');
                        $('.error', $newListControl).addClass('hidden');
                        _resetListCreation(evt);
                        loadLibraryList(oid);
                        tracking.satelliteTracking({
                            'list': {
                                listName: newListNameVal,
                                interactionType:"Library Interaction"
                            }
                        }, 'libraryInteraction', false);
                        window.digitalData.user.listAction="Create List";
                        tracking.track('libraryInteraction',evt.currentTarget.text);
                    },onSaveArticleError);
                }
            }

            function _editLibraryList(evt) {
                evt.preventDefault();

                var $editListControl = $(evt.currentTarget).parents('.librarylistitem'),
                    $editListInput = $editListControl.find('.editlistinput'),
                    currentList = personalizationUtils.storeUtils.getLibraryById(selectedList),
                    newName = processLibraryName($editListInput.val());

                if (currentList.name === newName) {
                    $editListControl.removeClass('is-editing');
                    $($editListControl).find('.edit-list-controls').remove();
                    $libraryList.removeClass('loading');
                    return;
                }

                if (isValid($editListInput,$editListControl) && !isProcessing) {
                    $editListControl.addClass('loading');
                    isProcessing = true;
                    personalizationUtils.storeUtils.updateLibraryname(selectedList, processLibraryName($editListInput.val()), function () {
                        $editListControl.removeClass('is-editing');
                        $editListControl.removeClass('loading');
                        $('.error', $editListControl).addClass('hidden');
                        loadLibraryList(selectedList);
                        _showModal(templates.editsuccess(data), selectedList, function (evt) {
                            $('.modal-content',$(evt.currentTarget)).addClass('savesuccess').html(evt.data[0]);
                        }, function (evt) {
                            $('.modal-content',$(evt.currentTarget)).removeClass('savesuccess');
                        }, 3000);

                        listTracking(processLibraryName($editListInput.val()), 'Edit List');
                    }, onSaveArticleError);
                }
            }

            function _cancelNewListCreation(evt) {
                evt.stopPropagation();
                _resetListCreation(evt);
                $newListControl.removeClass('is-editing');
                $('.error', $newListControl).addClass('hidden');
            }

            function _cancelEditList(evt) {
                evt.stopPropagation();
                var $editListControl = $(evt.currentTarget).parents('.librarylistitem');
                $editListControl.removeClass('is-editing');
                $($editListControl).find('.edit-list-controls').remove();
                $libraryList.removeClass('loading');
                setTimeout(function() {
                    $editListControl.find('.edit').trigger('focus');
                }, 10);
            }

            function _deleteList(evt) {
                evt.stopPropagation();
                var listname = personalizationUtils.storeUtils.getLibraryById(selectedList);
                personalizationUtils.storeUtils.deleteLibrary(selectedList, function () {
                    $('.modal-content', $librarylistmanagementmodal).addClass('success');
                    $('.btn-close', $librarylistmanagementmodal).removeClass('close-align');
                    $('.alert-success', $librarylistmanagementmodal).attr('aria-hidden',false);
                    $('.alert-success').find('span').after("<span>\""+listname.name +"\"</span>");
                    loadLibraryList();

                    listTracking(listname.name, 'Delete List');
                });
            }

            function _copyToclipboard(evt) {
                evt.preventDefault();
                $('#clipboardinput', $librarylistmanagementmodal).trigger('select');
                var txtCopied = select_all_and_copy(document.getElementById('clipboardinput'));
                if(!txtCopied){
                    $('.modal-content', $librarylistmanagementmodal).addClass('failure');
                }else{
                    $('.modal-content', $librarylistmanagementmodal).addClass('success');
                }
            }

            function select_all_and_copy(el) {
                // Copy textarea, pre, div, etc.
                if (document.body.createTextRange) {
                    // // IE 
                    el.trigger('select');
                    if (document.queryCommandSupported("copy"))
                    {
                        document.execCommand('copy');
                    }
                    var clipboard = window.clipboardData.getData('Text');
                    if( clipboard !== "" ){
                        return true;
                    }else{
                        return false;
                    } 
                }
                else if (window.getSelection && document.createRange) {
                    // non-IE
                    var editable = el.contentEditable; // Record contentEditable status of element
                    var readOnly = el.readOnly; // Record readOnly status of element
                    el.contentEditable = true; // iOS will only select text on non-form elements if contentEditable = true;
                    el.readOnly = false; // iOS will not select in a read only form element
                    var range = document.createRange();
                    range.selectNodeContents(el);
                    var sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range); // Does not work for Firefox if a textarea or input
                    if (el.nodeName === "TEXTAREA" || el.nodeName === "INPUT") {
                        el.trigger('select'); // Firefox will only select a form element with select()
                    }
                    if (el.setSelectionRange && navigator.userAgent.match(/ipad|ipod|iphone/i)){
                        el.setSelectionRange(0, 999999); // iOS only selects "form" elements with SelectionRange
                    }
                    el.contentEditable = editable; // Restore previous contentEditable status
                    el.readOnly = readOnly; 
                    if (document.queryCommandSupported("copy"))
                    {
                        var successful = document.execCommand('copy');  
                        if (!successful) {console.log("Copy Unscuccessful");}
                    }
                }
                return true;
            } 

            function enableAlly() {
                $librarylistmanagementmodal.on('focus','.btn-cta', function (evt) {
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

            function _listSelectionTracking(evt) {}

            initialize();
			$(document).trigger('template.loaded');
        };

        return Librarylistmanagement;
    }
);
