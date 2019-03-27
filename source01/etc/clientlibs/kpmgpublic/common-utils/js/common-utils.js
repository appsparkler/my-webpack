define(['jquery', 'tracking'], function($, Tracking) {
    'use strict';
    //
    var CommonUtils;
    var hackingChars = ["|", "&amp;", ";", "$", "%", "@", "&#x27;", "&quot;", "&lt;&gt;", "&lt;", "&gt;", "(", ")", "+", "0x0d", "0x0a", ",", "\\"];
    var CONSTANTS = {
        DOMAIN: window.location.origin
    };
    //
    CommonUtils = {
        fixChromeIssueForAuthor: fixChromeIssueForAuthor,
        setBrowserNameOnAllTags: setBrowserNameOnAllTags,
        getSearchQueryParamsAsObject: getSearchQueryParamsAsObject,
        initializeAllComponents: initializeAllComponents,
        redirectForInvalidQueryParams: redirectForInvalidQueryParams,
        isScrolledIntoView: isScrolledIntoView,
        CONSTANTS: CONSTANTS
    };
    //
    function fixChromeIssueForAuthor(tmpl) {
        if (window.kpmgPersonalize.misc.isAuthor) {
            $(tmpl)
                .css('position', 'inherit');
        }
    }
    //
    function initializeAllComponents($componentElems, cb) {
        var $components, elemArray;
        //
        $components = [];
        elemArray = [];
        //
        $.each($componentElems, function(idx, eachEl) {
            var elemClass, moduleName;
            //
            elemClass = $(eachEl).attr('class');
            //
            moduleName = elemClass.substring(7, elemClass.indexOf(' '));
            $components.push(moduleName);
            //
            elemArray.push(eachEl);
        });
        require($components, function() {
            var i;
            //
            // INITIALIZING EACH COMPONENT
            for (i = 0; i < arguments.length; i++) {
                new arguments[i](elemArray[i]);
            }
            //  ALL COMPONENTS ARE LOADED
            cb();
        });
    }
    //
    function setBrowserNameOnAllTags() {
        var BrowserDetect, allElements;
        //
        allElements = $('*');
        //
        BrowserDetect = prepareBrowserDetect();
        BrowserDetect.init();
        //
        allElements.addClass(BrowserDetect.browser.toLowerCase());
        // private functions
        function prepareBrowserDetect() {
            return {
                init: function() {
                    this.browser = this.searchString(this.dataBrowser) || "Other";
                    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
                },
                searchString: function(data) {
                    for (var i = 0; i < data.length; i++) {
                        var dataString = data[i].string;
                        this.versionSearchString = data[i].subString;

                        if (dataString.indexOf(data[i].subString) !== -1) {
                            return data[i].identity;
                        }
                    }
                },
                searchVersion: function(dataString) {
                    var index = dataString.indexOf(this.versionSearchString);
                    if (index === -1) {
                        return;
                    }

                    var rv = dataString.indexOf("rv:");
                    if (this.versionSearchString === "Trident" && rv !== -1) {
                        return parseFloat(dataString.substring(rv + 3));
                    } else {
                        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
                    }
                },

                dataBrowser: [{
                        string: navigator.userAgent,
                        subString: "Edge",
                        identity: "MS Edge"
                    },
                    {
                        string: navigator.userAgent,
                        subString: "MSIE",
                        identity: "Explorer"
                    },
                    {
                        string: navigator.userAgent,
                        subString: "Trident",
                        identity: "Explorer"
                    },
                    {
                        string: navigator.userAgent,
                        subString: "Firefox",
                        identity: "Firefox"
                    },
                    {
                        string: navigator.userAgent,
                        subString: "Opera",
                        identity: "Opera"
                    },
                    {
                        string: navigator.userAgent,
                        subString: "OPR",
                        identity: "Opera"
                    },
                    {
                        string: navigator.userAgent,
                        subString: "Chrome",
                        identity: "Chrome"
                    },
                    {
                        string: navigator.userAgent,
                        subString: "Safari",
                        identity: "Safari"
                    }
                ]
                };
        }
    }

    function getSearchQueryParamsAsObject() {
        try {
            var search = location.search.substring(1);
            return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
        } catch (e) {
            return false;
        }
    }

    function redirectForInvalidQueryParams(paramsObj) {
        var queryParamsObj;
        //
        queryParamsObj = CommonUtils.getSearchQueryParamsAsObject();
        //
        if (window.location.search && !queryParamsObj) {
            var pathName;
            pathName = encodeURI(window.location.pathname);
            var hacking = isPhishing(pathName);
            if (!hacking) {
                window.location.href = paramsObj ? pathName + '?' + $.param(paramsObj) : pathName;
            }
        }
    }

    function isPhishing(inputstring) {
        var hacking = false;

        hackingChars.forEach(function(value) {
            if (inputstring.indexOf(value) > -1) {
                hacking = true;
            }
        });
        return hacking;
    }

    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop(),
            docViewBottom = docViewTop + $(window).height(),
            elemTop = $(elem).offset().top,
            elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    return CommonUtils;
});
