/* global s */
/* global _ */
define(['jquery', 'tracking', 'cookiemgr', 'jqueryui', 'underscore'],
    function($, Tracking) {
        'use strict';
        var SearchInputs = function(elem) {
            var parseJSON;
            var cacheObject = {
                    globalSearch: "?global=true",
                    localSearch: "?global=false",
                    CQModal: JSON.parse($(".searchInputsCQModel", elem).attr('data-CQModal')),
                    suggestionWaitTime: $(elem).data('search-waittime') || 250 /*Default value will be 250 milliseconds*/ ,
                    searchInput: $('.search', elem),
                    domainArr: window.location.href.split("/"),
                    suggestionSelected: false,
                    selectedValue: null
                },
                manageRecentSearch = {
                    cookieField: 'recentSearchKeyList',
                    maxRecentItemCt: 3,
                    get: function() {
                        var cookieVal = $.cookie(this.cookieField);
                        return cookieVal ? JSON.parse(cookieVal) : [];
                    },
                    set: function(value) {
                        $.cookie(this.cookieField, JSON.stringify(value), {
                            path: '/',
                            expires: 365
                        });
                    },
                    reset: function() {
                        $.removeCookie(this.cookieField, {
                            path: '/'
                        });
                    }
                },
                inputTypeAhead = {
                    /*
                     *  Type Ahead functiomlity, which can be injected to
                     * jquety UI auto complete
                     */
                    isTypeAheadActive: false,
                    setVal: function($input, matchText, elem) {
                        var keyTyped = cacheObject.searchInput.val(),
                            keyword = keyTyped.toLowerCase(),
                            typeAheadVal = matchText.replace(new RegExp(keyword, 'i'), ''),
                            left = 0,
                            typeAheadElem = $('.typeahead-value', elem),
                            tempKey = $('.tmp-key', elem),
                            extraWidth = 0,
                            inputLeftSpace = 9;

                        if (typeAheadVal.indexOf(" ") === 0) {
                            typeAheadVal = typeAheadVal.replace(/\s/, "&nbsp;");
                        }
                        typeAheadElem.css({
                            'display': 'none'
                        });
                        if (typeAheadElem.length) {
                            typeAheadElem.html(typeAheadVal);
                        } else {
                            $input.after('<span class="typeahead-value typeahead-elem" >' + typeAheadVal + '</span><span class="tmp-key" style="display:inline-block;left:0;position:absolute;visibility: hidden;font-family:Arial, Helvetica, sans-serif;padding:0;margin:0 0 0 9px;text-transform:none;"></span>');
                            typeAheadElem = $('.typeahead-value', elem);
                            tempKey = $('.tmp-key', elem);
                        }

                        tempKey.text(keyTyped.replace(/\s/, "+"));

                        left = inputLeftSpace + tempKey.width() + parseInt(extraWidth);


                        typeAheadElem.css({
                            'left': left + 'px',
                            'display': 'block'
                        });
                        this.isTypeAheadActive = true;
                    },
                    doKeyUp: function($input, e) {
                        var currentKeyword = $input.val();
                        if ($.trim(currentKeyword) === '') {
                            this.clearTypeAhead();
                            this.isTypeAheadActive = false;
                        }
                    },
                    doKeyDown: function($input, e) {
                        var typeAheadElem = $input.next('.typeahead-value'),
                            currentTypeAheadText = typeAheadElem.text(),
                            currentKeyword = $input.val(),
                            clearForkey = [9, 40, 8],
                            inputChangeKey = [39, 9],
                            ctrlDown = e.ctrlKey || e.metaKey;


                        if (this.isTypeAheadActive && currentTypeAheadText.length && inputChangeKey.indexOf(e.keyCode) > -1) {
                            $input.val(currentKeyword + '' + currentTypeAheadText);
                            typeAheadElem.css({
                                'display': 'none'
                            });
                            this.isTypeAheadActive = false;
                        } else if (clearForkey.indexOf(e.keyCode) > -1 || !currentTypeAheadText.length || (e.keyCode === 88 && ctrlDown)) {
                            this.clearTypeAhead();
                            this.isTypeAheadActive = false;
                        }
                    },
                    clearTypeAhead: function() {
                        $('.typeahead-value').css({
                            'display': 'none'
                        });
                    }
                },
                widgetInst = cacheObject.searchInput.on('keypress', searchOnKeyPress).autocomplete({
                    delay: 120,
                    minLength: 0,
                    open: function() {
                        var recentHead = $('.recent_item_heading');
                        if (recentHead[0]) {
                            recentHead.removeClass('ui-menu-item');
                            recentHead.off('click');
                        }
                        if (!(window.kpmg.isMobile && window.kpmg.isPhone)) {
                            $('ul.ui-autocomplete').css({
                                'width': '181px'
                            });
                        }

                        //Disable the Your Recent Search in Mobile View
                        // if ($("body").hasClass("nav-open")) {
                        //     $('ul.ui-autocomplete').css({
                        //         'display': 'none'
                        //     });
                        // }
                    },
                    source: function(request, response) {
                        request.term = request.term.replace(/[#&())\*\+=\;"'<>\?\%\\/]/g, "");
                        var smartLogicURL = cacheObject.domainArr[0] + '//' + cacheObject.domainArr[2] + '/ses?TBDB=disp_taxonomy&template=service.json&service=PREFIX&term_prefix=' + request.term + '&lang=' + cacheObject.CQModal.searchLanguage + '&language=' + cacheObject.CQModal.searchLanguage + "&prefix_results_limit=" + cacheObject.CQModal.sesPrefixResultsLimit + "&FILTER=DE=" + cacheObject.CQModal.commonModelId + "&DE=" + cacheObject.CQModal.localCountryModelId,
                            //var smartLogicURL = cacheObject.domainArr[0] + '//' + cacheObject.domainArr[2] + '/ses?TBDB=disp_taxonomy&template=service.json&service=PREFIX&term_prefix=' + request.term + '&lang=' + cacheObject.CQModal.searchLanguage + '&language=' + cacheObject.CQModal.searchLanguage+"&prefix_results_limit=100",
                            minLength = cacheObject.searchInput.autocomplete("option", "minLength"),
                            recentList = manageRecentSearch.get(),
                            headerObject = [{
                                "label": cacheObject.CQModal.yourRecentSearchCopy,
                                "value": "recent_item_heading"
                            }],
                            matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(cacheObject.searchInput.val()), "i");
                        if (minLength >= 3) {
                            $.ajax({
                                url: smartLogicURL,
                                success: function(data) {
                                    parseJSON = (data) ? data.termHints : [];
                                    if (parseJSON && parseJSON[0]) {
                                        var jsonObject = _.chain(parseJSON)
                                            .groupBy("name")
                                            .map(function(value, keyName) {
                                                return {
                                                    label: keyName,
                                                    value: _.map(value, function(val) {
                                                        return val.id;
                                                    })
                                                };
                                            }).value(),
                                            startWith = _.filter(jsonObject, function(val) {
                                                return matcher.test(val.label);
                                            }),
                                            contains = _.difference(jsonObject, startWith),
                                            collection = _.union(startWith, contains);
                                        collection = _.first(collection, 5);

                                        if (!window.kpmg.isMobile) {
                                            collection = (collection[0] && recentList[0]) ? _.union(collection, headerObject, recentList) : collection;
                                        }

                                        response(collection);
                                        if (matcher.test(collection[0].label)) {
                                            inputTypeAhead.setVal(cacheObject.searchInput, collection[0].label, elem);
                                        } else {
                                            inputTypeAhead.clearTypeAhead();
                                        }
                                    } else {
                                        inputTypeAhead.clearTypeAhead();
                                    }
                                },
                                error: $.proxy(function(e) {
                                    //console.log(e.respone);
                                }, this)
                            });
                        } else {
                            if ($(window).width() <= 640) {
                                inputTypeAhead.clearTypeAhead();
                                $('.ui-autocomplete').css({
                                    'display': 'none'
                                });
                            }
                            if (recentList[0] && !window.kpmg.isMobile) {
                                response(_.union(headerObject, recentList));
                            }
                        }
                    },
                    focus: function(evt, ui) {

                        if (ui.item.value === "recent_item_heading") {
                            evt.preventDefault();
                            $('.recent_item_heading').next('li').trigger('mouseenter');
                            return false;
                        }
                        inputTypeAhead.clearTypeAhead();
                        $(".ui-helper-hidden-accessible").hide();
                        cacheObject.searchInput.val(ui.item.label);
                        if ($(window).width() <= 640) {
                            inputTypeAhead.clearTypeAhead();
                            $('.ui-autocomplete').css({
                                'display': 'none'
                            });
                        }
                        evt.preventDefault();
                        return false;
                    },
                    select: function(event, ui) {
                        if (ui.item && ui.item.value) {
                            if (ui.item.value !== "recent_item_heading") {
                                cacheObject.searchInput.val(ui.item.label);
                                cacheObject.selectedValue = ui.item.value;
                                cacheObject.suggestionSelected = true;
                            } else {
                                inputTypeAhead.clearTypeAhead();
                                event.preventDefault();
                                return false;
                            }
                        }
                        inputTypeAhead.clearTypeAhead();
                        event.preventDefault();
                        return false;
                    }
                }).on('keyup', function(e) {
                    var _this = $(this),
                        minLength = (_this.val() === "" || _this.val().length < 3) ? 0 : 3;
                    cacheObject.searchInput.autocomplete("option", "minLength", minLength);
                    inputTypeAhead.clearTypeAhead();

                    inputTypeAhead.doKeyUp(_this, e);
                }).on('focus', function() {
                    inputTypeAhead.clearTypeAhead();
                    cacheObject.searchInput.trigger('keydown');
                }).on('blur', function() {
                    inputTypeAhead.clearTypeAhead();
                }).on('keydown', function(e) {
                    inputTypeAhead.clearTypeAhead();
                    inputTypeAhead.doKeyDown($(this), e);
                }).data('ui-autocomplete');

            if (window.kpmg.isMobile) {
                cacheObject.searchInput.autocomplete("option", "appendTo", cacheObject.searchInput.parent());
            }
            widgetInst._renderItem = function(ul, item) {

                var li = (item.value === "recent_item_heading") ? $("<li class='recent_item_heading'>") : $("<li>");
                var conso = li.text(item.label);
                console.log(conso);
                return li
                    .attr("data-value", item.value)
                    .text(item.label)
                    .appendTo(ul);
            };

            function searchOnKeyPress(e) {
                e.stopImmediatePropagation();
                var keycode = (e.keyCode ? e.keyCode : e.which);
                if (keycode === 13) {
                    if (!parseJSON) {
                        setTimeout(function() {
                            //wait for configured(cacheObject.suggestionWaitTime) milliseconds till the smartlogic auto-suggestion gets loaded
                            searchByInput();
                        }, cacheObject.suggestionWaitTime);
                    } else {
                        searchByInput();
                    }
                }
            }

            function searchByInput() {
                if (!cacheObject.suggestionSelected) {
                    cacheObject.selectedValue = null;
                }
                if (cacheObject.searchInput.val()) {
                    var selectedTerm = cacheObject.searchInput.val().replace(/[#&())\*\+=\;"'<>\?\%\\/]/g, ""),
                        recentList = manageRecentSearch.get(),
                        selectedObject = {
                            "label": selectedTerm,
                            "value": cacheObject.selectedValue
                        };
                    if (recentList[0]) {
                        var existSearch = _.find(recentList, function(val) {
                            return val.label.toLowerCase().trim() === selectedTerm.toLowerCase().trim();
                        });
                        if (existSearch) {
                            manageRecentSearch.reset();
                            var removedExist = _.reject(recentList, function(val) {
                                return val.label.toLowerCase().trim() === selectedTerm.toLowerCase().trim();
                            });
                            manageRecentSearch.set(removedExist[0] ? _.union(removedExist, [selectedObject]) : [selectedObject]);
                        } else {
                            if (recentList.length === manageRecentSearch.maxRecentItemCt) {
                                recentList.shift();
                            }
                            manageRecentSearch.set(_.union(recentList, [selectedObject]));
                        }
                    } else {
                        manageRecentSearch.set([selectedObject]);
                    }
                }
                var searchTxt = cacheObject.searchInput.val();
                searchTxt = searchTxt.replace(/[#&())\*\+=\;"'<>\?\%\\/]/g, "");
                //sessionStorage Clear for back button
                /*var sessionStorageClear = window.location.href.indexOf('search.html?') > -1;
                if(sessionStorageClear === false) {
                    sessionStorage.removeItem("backBtnItems");
                }
                var backBtnValueArray = JSON.parse(sessionStorage.getItem("backBtnItems"));
                if(backBtnValueArray !== null) {
                    var backBtnSearchVal = '?q=' + searchTxt;
                    backBtnValueArray.push(backBtnSearchVal);
                    window.sessionStorage.setItem("backBtnItems", JSON.stringify(backBtnValueArray));
                }*/
                cacheObject.suggestionSelected = false;
                //On manual search auto select the smartlog tags if it matches with the search text
                if (!cacheObject.selectedValue && parseJSON) {
                    parseJSON.some(function(element, i) {
                        if (searchTxt.toLowerCase() === element.name.toLowerCase()) {
                            cacheObject.selectedValue = [element.id];
                            searchTxt = element.name;
                            return true;
                        }
                    });
                }
                var params = cacheObject.selectedValue ? '?q=' + encodeURIComponent(searchTxt) + ' ' + cacheObject.selectedValue.join(' ') + '&sp_p=any&SES=' + cacheObject.selectedValue.join(' ') : '?q=' + encodeURIComponent(searchTxt) + '&sp_p=any';

                if (window.location.pathname.match(/\/myinterests\.html$/)) {
                    $(document).trigger('myinterestspage.search', {
                        "searchUrl": cacheObject.CQModal.searchResultPath + params
                    });
                }
                else if( window.kpmgPersonalize.preferenceChange ) {
                    $(document).trigger('communicationpreference.search', {
                        "searchUrl": cacheObject.CQModal.searchResultPath + params
                    });
                }
                 else {
                    window.location = cacheObject.CQModal.searchResultPath + params;
                }
            }
            //On click on the search replace the value inside input
            $('a.btn-back').on('click', function() {
                history.back();
            });
            $('.submitSearch', elem).on('click', function(e) {
                e.stopImmediatePropagation();
                if (!parseJSON) {
                    setTimeout(function() {
                        //wait for configured(cacheObject.suggestionWaitTime) milliseconds till the smartlogic auto-suggestion gets loaded
                        searchByInput();
                    }, cacheObject.suggestionWaitTime);
                } else {
                    searchByInput();
                }
            });
            $(".this-site", elem).on('click', function(e) {
                e.stopImmediatePropagation();
                window.location.replace(cacheObject.CQModal.searchResultPath + cacheObject.globalSearch);
            });
            $(".all-sites", elem).on('click', function(e) {
                e.stopImmediatePropagation();
                window.location.replace(cacheObject.CQModal.searchResultPath + cacheObject.localSearch);
            });
            //Mobile Print the previous search

            function mobilePrintPreviousSearch() {
                var d = manageRecentSearch.get();
                var temp = 0;
                $('#sidr').find(".mob-list-search .mob-previous-search-container p.most-view-list-a div").remove();
                $('#sidr').find(".mob-list-search .mob-previous-search-container p.most-view-list-b div").remove();
                $('#sidr').find(".mob-list-search .mob-previous-search-container p.most-view-list-c div").remove();
                for (var i = 0, j = d.length - 1; i < d.length; i++) {
                    temp = 1;
                    if (i === 0) {
                        $('#sidr').find(".mob-list-search .mob-previous-search-container p.most-view-list-a").append('<div class="previous-search" style="padding:18px 15px">' + d[j].label + '</div>');
                    }
                    if (i === 1) {
                        $('#sidr').find(".mob-list-search .mob-previous-search-container p.most-view-list-b").append('<div class="previous-search" style="padding:18px 15px">' + d[j].label + '</div>');
                    }
                    if (i === 2) {
                        $('#sidr').find(".mob-list-search .mob-previous-search-container p.most-view-list-c").append('<div class="previous-search" style="padding:18px 15px">' + d[j].label + '</div>');
                    }
                    j = j - 1;
                }
                // To print the heading if there is a value
                if (temp === 1) {
                    $('#sidr').find(".mob-previous-search-container .previous-heading").text(cacheObject.CQModal.yourRecentSearchCopy);
                } else {
                    $('#sidr').find(".mob-previous-search-container .previous-heading").remove();
                    $('#sidr').find(".mob-previous-search-container .top-divider").remove();
                }
            }
            //On Click Previous search history - Replace the Search Input Value
            $('.mob-list-search p.most-view-list-a').on('click', function() {
                var text = $(this).find('.previous-search').text();
                $(".mob-list-search .search-input input").val(text);
            });
            $('.mob-list-search p.most-view-list-b').on('click', function() {
                var text = $(this).find('.previous-search').text();
                $(".mob-list-search .search-input input").val(text);
            });
            $('.mob-list-search p.most-view-list-c').on('click', function() {
                var text = $(this).find('.previous-search').text();
                $(".mob-list-search .search-input input").val(text);
            });
            mobilePrintPreviousSearch();
            // Keep the following line at the bottom of the SearchInputs function
            var trck = new Tracking(elem, 'SearchInputs');
            $(document).trigger('template.loaded');
        };
        return SearchInputs;
    }
);
