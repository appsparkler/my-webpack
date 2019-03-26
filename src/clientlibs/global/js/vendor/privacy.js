/* global s */
/* global privacyJSON */
/* _satellite */
define('privacy',['jquery','helpers','cookiemgr'],
        function ($, Helpers) {
            'use strict';
            var isTrackEnabled = true;
            var trakerCookie = $.cookie('sat_track');
            var distinctPrivPolicy=false;
            if(!window.kpmgPersonalize.misc.isAuthor && typeof privacyJSON !== 'undefined' && privacyJSON !== undefined){
                distinctPrivPolicy=privacyJSON.options[0].distinctPrivacyPolicy;
            }

            if(!trakerCookie) {

                $.cookie('sat_track', false, {path: '/'});
            }
            if(typeof window._satellite === "undefined") {
                window._satellite = {};
                window._satellite.track = function(){};
            }
            var kpmgPath = window.location.pathname.toLowerCase();
            var countryCode = (kpmgPath.indexOf('content/kpmgpublic') === -1) ? kpmgPath.split('/')[1] : kpmgPath.split('/')[3];
            var langCode = (kpmgPath.indexOf('content/kpmgpublic') === -1) ? kpmgPath.split('/')[2] : kpmgPath.split('/')[4];
            var IE8orLess = document.all && !document.addEventListener;
            var cookie;
            var setCookieDistinct =false;
            var closeOnPrivacyClicked=false;

            if(window.kpmgPersonalize && window.kpmgPersonalize.isBlog) {
                countryCode = window.kpmgPersonalize.snp.params.countryCode;
                langCode = window.kpmgPersonalize.snp.params.languageCode;
            }

            var countryParams = getCountryInformation();

            function setCookie(c_name, trackingSelection, value, path) {
                var exdate = new Date();
                var daysToExpire = 90;
                exdate.setDate(exdate.getDate() + daysToExpire);
                var c_value = "isTrackEnabled=" + trackingSelection + "&value=" + escape(value) + ";expires=" + exdate.toUTCString() + ";path=/";

                $.cookie(c_name, c_value, { path: path, expires: exdate });
               // document.cookie=c_name + "=" + c_value;
            }

            function getCookie(c_name) {
                var i, x, y, ARRcookies = $.cookie();
                for(var x in ARRcookies) {
                    if (x === c_name) {
                        var fetchedCookie = new Object();
                        y = ARRcookies[x];
                        fetchedCookie.isTrackEnabled = y.split("&")[0].split("=")[1];
                        fetchedCookie.choice = y.split("&")[1].split(";")[0].split("=")[1];
                        return fetchedCookie;
                    }
                }
            }

            function deleteSpecificCookies(cookiesToDelete) {
                for (var expression in cookiesToDelete) {
                    for (var current in $.cookie()) {
                        var pattern = new RegExp(cookiesToDelete[expression]);
                        if (current.match(pattern)) {
                            var deleted = $.removeCookie(current, {path: '/'}) || $.removeCookie(current, {path: '/'});
                        }
                    }
                }
            }

            function hasProperty(obj) {
                for(var prop in obj) {
                    if(obj.hasOwnProperty(prop)) {
                        return true;
                    }
                }
                return false;
            }
            function overideCookieSetterGetters(cookiesToDelete) {
                var old_cookie = $.cookie();
                if (typeof overideCookieSetterGetters.supressedList === "undefined") {
                    // It has not... perform the initialization
                    overideCookieSetterGetters.supressedList = cookiesToDelete;
                    var tempCookie;
                    for (var i in overideCookieSetterGetters.supressedList) {
                        var pattern = new RegExp(overideCookieSetterGetters.supressedList[i]);
                        var newval = JSON.stringify($.cookie());
                        if (newval.match(pattern)) {
                            tempCookie = $.cookie();
                        }
                        else {
                            tempCookie = (newval + JSON.stringify($.cookie()));
                        }
                    }
                    $.cookie(tempCookie);
                }
            }
            //Ends override

            function createPrivacyOverlay(policyText, link, option, language, customFunction, cookieVersion, cookiesToDelete) {
                var pathCount = window.kpmgPersonalize.misc.isAuthor ? 5 : 3,
                    pathForDotCom = '',
                    pathForBlogs = '',
                    blogPath = (window.kpmgPersonalize && window.kpmgPersonalize.blogPath) || '';

                blogPath = blogPath.replace('/', '');

                if(window.kpmgPersonalize && window.kpmgPersonalize.isBlog) {
                    pathCount = window.kpmgPersonalize.misc.isAuthor ? 6 : 4;
                    pathForBlogs = kpmgPath.split('/').slice(0, pathCount).join('/');
                    pathForDotCom = pathForBlogs.replace(blogPath + '/', '');
                } else {
                    pathForDotCom = kpmgPath.split('/').slice(0, pathCount).join('/');
                    pathForBlogs = pathForDotCom.split('/');
                    pathForBlogs.splice(2, 0, blogPath);
                    pathForBlogs = pathForBlogs.join('/');
                }

                function trackUser(setCurrentCookie, runAnalytics) {
                    if (runAnalytics) {

                        if (customFunction) {
                            window[customFunction.name](customFunction.arguments);
                        }
                        var trakerCookie = $.cookie('sat_track');
                        if(trakerCookie === "false") {
                            _satellite.track("DirectTagLoadSC");
                            _satellite.track("DirectTagLoadGA");
                        }
                    }

                    $.cookie('sat_track', runAnalytics, {path: '/'});

                    if (setCurrentCookie) {
                        setCookie("KPMG_privacyCookie_" + countryCode + "_ver:" + cookieVersion, true, "true", pathForDotCom);
                        setCookie("KPMG_privacyCookie_" + countryCode + "_ver:" + cookieVersion, true, "true", pathForBlogs);
                    }
                }

                if (!cookie) {
                    //Option 1
                    if (!option.checkbox) {
                        if(option.distinctPrivacyPolicy==="4" && document.referrer.length>0){
                            //if condition is true then the user has navigated from the home page.
                            //$.cookie('sat_track', true, {path: '/'});
                            setCookieDistinct=true;
                            _satellite.track("PrivacyAccept_Cookie");
                        }else if (customFunction) {
                            window[customFunction.name](customFunction.arguments);
                            trackUser(false, true);
                        }else if (option.distinctPrivacyPolicy==="4" && document.referrer.length===0) {
                            /*this implies distinctprivacypolicy is true and the user is on the home page
                            *   wherein the sat_track cookie is created and set to false
                            */
                            trackUser(false, false);
                        }else{
                            trackUser(false, true);
                        }
                    } else {
                        trackUser(false, false);
                    }
                    var closeAnchor = $('<a class="btn-close-main" href="javascript:;"><span class="btn-close"> <span class="icon-chevron-right"></span><span class="btn-copy">' + option.buttonText[language] + '</span></span></a>');

                    $(document).on('click', '.btn-close-main .btn-close', function () {
                        //Tracking logic
                        if ($('#policyConsent')[0] && (!$('#policyConsent')[0].checked)) {
                            isTrackEnabled = false;
                        }
                        $(this).parents('.privacy-container').remove();
                        if (isTrackEnabled) {
                            if(option.distinctPrivacyPolicy ==="4"){
                                setCookieDistinct=true;
                                closeOnPrivacyClicked=true;
                                loadBlockedJSFiles();
                            }else{
                                trackUser(true, true);
                                _satellite.track("PrivacyAccept_Cookie");
                            }

                        }
                        else
                        {
                            //If the user leaves the banner open and they leave the page run the same code
                            setCookie("KPMG_privacyCookie_" + countryCode + "_ver:" + cookieVersion, isTrackEnabled, "true", pathForDotCom);
                            setCookie("KPMG_privacyCookie_" + countryCode + "_ver:" + cookieVersion, isTrackEnabled, "true", pathForBlogs);
                            deleteSpecificCookies(cookiesToDelete);
                            overideCookieSetterGetters(cookiesToDelete);
                        }
                        Helpers.undoTrapFocus($(".privacy-container"), "privacyContainer");
                    });


                    //Option logic
                    /*  if distinctPrivacyPolicy is false then the privacy pop up should be displayed.
                        Else if true the privacy pop up should not be displayed in subsequent pages.
                    */

                    if(!(option.distinctPrivacyPolicy==="4")){

                        var checkBoxHTML = (option.checkbox) ? '<a class="privacy-overlay half-width" href="javascript:void(0)"><input id="policyConsent" type="checkbox" class="form-control"' + option.value + '/>' + '<label for="policyConsent">' + option.label[language] + '</label></a>' : '';
                        var privacyPrefix = $("<p class='privacy-prefix'/>");
                        var privacyAnchor = $("<a class='privacy-anchor'/>").attr("href", link.anchor).html(link.text).attr("target", "_blank");
                        var userAgentString = navigator.userAgent;
                        policyText = policyText.replace(link.text, "<div id='anchorReplace'></div>");
                        privacyPrefix.html(policyText);
                        var div = $("<div class='privacy-container'/>").append($("<div class='privacy-inner'/>").append(privacyPrefix).append(checkBoxHTML).append(closeAnchor));
                        div.prependTo($("body"));
                        if(userAgentString.indexOf('MSIE') !== -1 ||
                           userAgentString.indexOf('rv:11') !== -1 ||
                           userAgentString.indexOf('Edge') !== -1 ||
                           userAgentString.indexOf('Firefox') !== -1 ){
                            $('label[for="policyConsent"]').addClass('useragent_ie');
                        }
                        $("#anchorReplace").replaceWith(privacyAnchor);
                        setTimeout(function () {
                            div.show();
                            Helpers.trapFocus($(".privacy-container"), "privacyContainer");
                        }, 0);

                    }else{
                        /* if distinctPrivacyPolicy is true check if document referrer length > 0.
                         * If yes, the user has navigated from another page and do not show the privacy pop up
                        */
                        if(!(document.referrer.length>0)){
                            var checkBoxHTML = (option.checkbox) ? '<a class="privacy-overlay half-width" href="javascript:void(0)"><input id="policyConsent" type="checkbox" class="form-control"' + option.value + '/>' + '<label for="policyConsent">' + option.label[language] + '</label></a>' : '';
                            var privacyPrefix = $("<p class='privacy-prefix'/>");
                            var privacyAnchor = $("<a class='privacy-anchor'/>").attr("href", link.anchor).html(link.text).attr("target", "_blank");
                            var userAgentString = navigator.userAgent;
                            policyText = policyText.replace(link.text, "<div id='anchorReplace'></div>");
                            privacyPrefix.html(policyText);
                            var div = $("<div class='privacy-container'/>").append($("<div class='privacy-inner'/>").append(privacyPrefix).append(checkBoxHTML).append(closeAnchor));
                            div.prependTo($("body"));
                            if(userAgentString.indexOf('MSIE') !== -1 ||
                               userAgentString.indexOf('rv:11') !== -1 ||
                               userAgentString.indexOf('Edge') !== -1 ||
                               userAgentString.indexOf('Firefox') !== -1 ){
                                $('label[for="policyConsent"]').addClass('useragent_ie');
                            }
                            $("#anchorReplace").replaceWith(privacyAnchor);
                            setTimeout(function () {
                                div.show();
                                Helpers.trapFocus($(".privacy-container"), "privacyContainer");
                            }, 0);
                        }else{

                            /*This block executes when the document referrer length > 0 and privacy pop up is hidden.
                            * Calling the trackUser method as the cookie needs to be set for implicit personalization to be triggered.
                            */
                            trackUser(true, true);
                        }
                    }
                }
                else if (cookie.choice && (cookie.isTrackEnabled === "true")) {
                    trackUser(false, true);
                }
                else if (cookie.choice && (cookie.isTrackEnabled === "false")) {
                    deleteSpecificCookies(cookiesToDelete);
                    overideCookieSetterGetters(cookiesToDelete);
                }
                function loadBlockedJSFiles(){
                    /*script to load demand base async url*/
                    var script = document.createElement('script');
                        script.type = 'text/javascript';
                        script.setAttribute('async','');
                        script.src = demandbaseAsyncURL
                        document.body.appendChild(script);

                        trackUser(true, true);
                        _satellite.track("PrivacyAccept_Cookie");
                        /*Check if user as clicked on close button on the privacy policy
                         * and if site personalization turned on
                        */

                        if(closeOnPrivacyClicked && window.kpmgPersonalize.isSitePersonalize){
                            script.onload = function() {
                                /*The search call is triggered but cells on the home page are not
                                * personalized until page reload.
                                */
                                window.kpmgPersonalize.fetchDataAndPersonalize();
                            };
                        }
                }

                //Accessbility for checkbox
                $('a.privacy-overlay').on('keydown', function(e){
                    if(e.which === 32){
                        e.preventDefault();
                        var checkbox = $('#policyConsent');
                        if(checkbox.prop('checked') === true){
                            checkbox.prop('checked', false);
                        }else{
                            checkbox.prop('checked', true);
                        }
                    }
                });
                $('.btn-close-main').on('keydown', function(e){
                    if(e.which === 13){
                        e.preventDefault();
                        $(document).find('.btn-close-main .btn-close').trigger('click');
                        Helpers.undoTrapFocus($(".privacy-container"), "privacyContainer");
                    }
                });
            }
            function getCountryInformation() {
                if (typeof privacyJSON !== 'undefined' && privacyJSON !== undefined && privacyJSON.countries !== undefined) {
                    var data = privacyJSON;
                    var countries = data.countries;
                    var options = data.options;
                    var cookiesToDelete = data.cookiesToDelete.split(",");
                    var isFound = false;
                    var isInactive = false;
                    for (var i = 0, len = countries.length; i < len; i++) {
                        if (countries[i].country === countryCode && countries[i].active) {
                            var languages = countries[i].languages;
                            for (var j = 0, lensub = languages.length; j < lensub; j++) {
                                if (languages[j] === langCode) {
                                    cookie = getCookie("KPMG_privacyCookie_" + countryCode + "_ver:" + countries[i].cookieVersion);
                                    createPrivacyOverlay(countries[i].text[langCode], countries[i].links[j], options[countries[i].option - 1], languages[j], countries[i].functionOptions, countries[i].cookieVersion, cookiesToDelete);
                                    isFound = true;
                                }
                            }
                        }
                        else if (countries[i].country === countryCode && !countries[i].active) {
                            isInactive = true;
                        }
                    }
                    if (!isFound && !isInactive) {
                        $.cookie('sat_track', true, {path: '/'});
                    }
                }
            }
        }
);
