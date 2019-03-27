define(['jquery', 'underscore', 'tracking'], function ($, _, Tracking) {
    var PersonalizationUtils = {
        constants: {
            localStorageKey: "accountInfo",
            localStorageLibrarykey: "userLibrary",
            localStorageFlagsKey: "flags",
            dmdbaseCookieKey: "personalization",
            interestsServiceURL: "/bin/kpmg/myinterests.<countryCode>-<languageCode>.<boolean>.json",
            getUserLibraryServiceURL: "/bin/kpmg/library",
            getSharedListServiceURL: "<%=location%>.publicshare.<%=oid%>.<%=uid%>.json",
            isProdEnv: !!window.location.host.match(/^home.kpmg.com/),
            UserAccountIncludes: ['identities-active', 'identities-all', 'loginIDs', 'emails', 'subscriptions', 'preferences', 'profile', 'data', 'irank', 'regSource'],
            IPGFilter: ['nickname', 'photoURL', 'thumbnailURL', 'profileURL', 'state', 'city', 'hometown', 'zip', 'languages', 'address', 'phones', 'education', 'honors', 'publications', 'patents', 'certifications', 'professionalHeadline', 'bio', 'industry', 'specialties', 'skills', 'religion', 'politicalView', 'interestedIn', 'relationshipStatus', 'hometown', 'favorites', 'likes', 'followersCount', 'followingCount', 'iRank', 'timezone', 'work', 'companyID', 'description', 'endDate', 'industry', 'isCurrent', 'location', 'startDate', 'companySize', 'gender', 'educationLevel', 'degree', 'endYear', 'fieldOfStudy', 'school', 'schoolType', 'startYear'],
            urlPattern: /^.*\/\/[^\/]+/
        },
        commonUtils: {
            isMobile: null,
            sortObjByAttr: null,
            sortBy: null,
            getCssAttrSelectors: null,
            processInterestsJson: null,
            processCountriesJson: null,
            generateUniqueId: null,
            initializeDom: null,
            isDomInitialized: null,
            processLibraryName: null,
            getMetaObject: null
        },
        dashboardUtils: {
            handleGigyaShare: null
        },
        loggerUtils: {
            error: null,
            info: null,
            log: null,
            warn: null
        },
        pathUtils: {
            getAbsolutePath: null,
            gotoPage: null,
            getURIparam: null
        },
        accountUtils: {
            isLoggedIn: null,
            getInfo: null,
            setInfo: null,
            getLocale: null,
            getCategoryPreferences: null,
            getPasswordStrength: null,
            getProfileInfo : null
        },
        myKpmgFlyoutUtils: {
            getLinksJson: null
        },
        storeUtils: {
            getUserLibrary: null,
            getUserLibraryList: null,
            getArticleFromLibrary: null,
            createNewLibrary: null,
            saveArticleToLibrary: null,
            findArticleByUrl: null,
            fetchBannerArticles: null,
            storeBannerArticlesInLocalStorage: null,
            retrieveBannerArticleFromLocalStorage: null
        },
        privacyUtils: {
            getCookieKey: null,
            getCookieExpiry: null,
            checkAndSetCookie: null,
            isAccepted: null
        }
    };

    var _cachedValues = {
        privacyCookieKey: null,
        accountInfo: null,
        myKpmgFlyoutJSON: {}
    };

    var count = 0, mykpmgNavJsonCall = true;

    function _isActiveUserData(data) {
        //TODO: Author, Test, Qa and Production conflict might happen.
        //      Need to check for domain name as well.
        return !!(data && data.requestParams.APIKey && $.cookie("glt_" + data.requestParams.APIKey));
    }

    /**
     * Common functions
     */
    PersonalizationUtils.commonUtils.isMobile = function isMobile() {
        return window.matchMedia("all and (max-width: 641px)").matches;
    };

    PersonalizationUtils.commonUtils.getUrlParamsObj = function getUrlParamsObj() {
        var urlParamsObj = {};

        location.search.replace(/^\?/, '').split('&').map(function (pair) {
            pair = decodeURIComponent(pair);
            pair = pair.split("=");
            urlParamsObj[pair[0]] = pair[1];
        });

        return urlParamsObj;
    };

    PersonalizationUtils.commonUtils.sortObjByAttr = function sortObjByAttr(attr, a, b) {
        if (a[attr] < b[attr]) {
            return -1;
        } else if (a[attr] > b[attr]) {
            return 1;
        }
        return 0;
    };

    PersonalizationUtils.commonUtils.sortBy = function (field, reverse, primer) {
        var key = function (x) {
            if (primer === 'Date') {
                return new Date(x[field]);
            } else {
                return x[field];
            }
        };

        return function (a, b) {
            var A = key(a),
                B = key(b);
            return ((A < B) ? -1 : ((A > B) ? 1 : 0)) * [-1, 1][+!!reverse];
        };
    };

    PersonalizationUtils.commonUtils.guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
    };

    PersonalizationUtils.commonUtils.getCssAttrSelectors = function (attrName, attrValue) {
        var selector = "[" + attrName + "='" + attrValue + "']";

        return {
            selector: selector,
            notSelector: ":not(" + selector + ")"
        }
    };

    PersonalizationUtils.commonUtils.checkForGigyaObject = function (cb) {
        if (window.gigya) {
            cb();
        } else {
            if (count <= 20) {
                count++;
                setTimeout(PersonalizationUtils.commonUtils.checkForGigyaObject(cb), 400);
            }
        }
    };

    function _sortCollectionsRecursivelyByName(data, collectionName, attrName) {
        function _hasValidCollections(data) {
            return (data instanceof Object &&
                Array.isArray(data[collectionName]) &&
                data[collectionName][0] instanceof Object);
        }

        function _sortCollectionsRecursively(data) {
            if (_hasValidCollections(data)) {
                data[collectionName].sort(PersonalizationUtils.commonUtils.sortObjByAttr.bind(null, attrName));
                data[collectionName].forEach(function (data) {
                    _sortCollectionsRecursively(data);
                });
            }
        }

        _sortCollectionsRecursively(data);
    }

    PersonalizationUtils.commonUtils.processInterestsJson = function (data) {
        var collectionName = 'tags';

        _sortCollectionsRecursivelyByName(data, collectionName, 'name');
        data[collectionName].sort(PersonalizationUtils.commonUtils.sortObjByAttr.bind(null, 'order'));

        return data;
    };

    PersonalizationUtils.commonUtils.processCountriesJson = function (data) {
        _sortCollectionsRecursivelyByName(data, 'category', 'name');

        return data;
    };

    PersonalizationUtils.commonUtils.generateUniqueId = function (prefix) {
        prefix = prefix || '';
        return prefix + "_gen_" + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };

    PersonalizationUtils.commonUtils.initializeDom = function (elem) {
        //Set 'initialized' attribute to DOM
        //This function is added to prevent multiple initialization of DOM.
        //  Once as part of normal initialization flow
        //  Once during Personalization
        elem.initialized = true;
    };

    PersonalizationUtils.commonUtils.getValue = function (key, storeKey) {
        try {
            if (!storeKey) {
                storeKey = PersonalizationUtils.constants.localStorageFlagsKey;
            }

            _cachedValues.flags = JSON.parse(sessionStorage.getItem(storeKey)) || {};
            if (key) {
                return _cachedValues.flags[key];
            } else {
                return _cachedValues.flags;
            }

        } catch (err) {
            return false;
        }
    };

    PersonalizationUtils.commonUtils.setValue = function (key, value, storeKey) {
        try {
            if (!storeKey) {
                storeKey = PersonalizationUtils.constants.localStorageFlagsKey;
            }

            _cachedValues.flags = JSON.parse(sessionStorage.getItem(storeKey)) || {};
            _cachedValues.flags[key] = value;
            sessionStorage.setItem(PersonalizationUtils.constants.localStorageFlagsKey, JSON.stringify(_cachedValues.flags));
            return true;

        } catch (err) {
            return false;
        }
    };

    PersonalizationUtils.commonUtils.clearValues = function (key, storeKey) {
        try {
            if (!storeKey) {
                storeKey = PersonalizationUtils.constants.localStorageFlagsKey;
            }

            _cachedValues.flags = JSON.parse(sessionStorage.getItem(storeKey)) || {};
            if (key) {
                delete _cachedValues.flags[key];
            } else {
                _cachedValues.flags = {};
            }
            return sessionStorage.setItem(PersonalizationUtils.constants.localStorageFlagsKey, JSON.stringify(_cachedValues.flags));

        } catch (err) {
            return false;
        }
    };

    PersonalizationUtils.commonUtils.isDomInitialized = function (elem) {
        return elem.initialized;
    };

    /**
     * Process given name recursively to strip off any valid XML tags
     */
    PersonalizationUtils.commonUtils.processLibraryName = function (name) {
        function _process(n) {
            //return $.trim(n).replace(/<+([^</>]*)\/*([^<>]*)>+/g, '$1$2').replace(/javascript:/g, '');
            return $.trim(n).replace(/</g, '').replace(/>/g, '').replace(/javascript:/g, '');
        }

        name = name || '';
        var processedName = _process(name);

        while(name !== processedName) {
            name = processedName;
            processedName = _process(name);
        }

        return processedName;
    };

    PersonalizationUtils.commonUtils.getMetaObject = function (selector) {
        var metaTags = document.querySelectorAll(selector),
            metaObj = {},
            metaTag;

        for (var i = 0; i < metaTags.length; i++) {
            metaTag = metaTags[i];
            metaObj[metaTag.name] = metaTag.content;
        }

        return metaObj;
    };

    /**
     * Dashboard related functions
     */
    PersonalizationUtils.dashboardUtils.handleGigyaShare = function (context, tracking, componentName, options) {
        var gigyaShareUI, gigyaShareBtn,
            gigyaShareProperties = {},
            jqWrap = $(context),
            data = jqWrap.data();

        gigyaShareProperties = _.extend(gigyaShareProperties, options);

        gigyaShareProperties.shareDescription = data.desc;
        gigyaShareProperties.shareEnabledProviders = "twitter,linkedin,facebook,googleplus";
        gigyaShareProperties.shareImage = data.image;
        gigyaShareProperties.shareLanguage = window.kpmgPersonalize.snp.params.languageCode;
        gigyaShareProperties.shareSiteName = "KPMG";
        gigyaShareProperties.shareTarget = jqWrap.attr("id");
        gigyaShareProperties.shareTitle = data.title;
        gigyaShareProperties.shareUrl = PersonalizationUtils.pathUtils.isAbsolutePath(data.url) ? data.url : window.location.origin + data.url;
        gigyaShareProperties.twitterDefaultText = '';
        gigyaShareProperties.onLoad = function (event) {
            gigyaShareUI = $(".gig-simpleShareUI");

            //Get the focus to share UI
            setTimeout(function () {
                gigyaShareUI.trigger('focus');
            }, 10);

            $('.gig-simpleShareUI-button', gigyaShareUI).attr('tabindex', 0);

            if (PersonalizationUtils.commonUtils.isMobile()) {
                $(gigyaShareUI).css('top', parseInt(gigyaShareUI[0].getAttribute('style').match(/top\s*:\s*([0-9a-z\.]+)\s*;/)[1]) - 55);
            }
            gigyaShareUI[0].setAttribute('style', gigyaShareUI[0].getAttribute('style').replace(/((top|left)\s*:\s*[0-9a-z\.]+\s*);/g, "$1 !important;"));

            if (options && options.onLoad && typeof options.onLoad === 'function') {
                options.onLoad(event);
            }
        };

        showShareUI(gigyaShareProperties, tracking);
    };

    /**
     * Log related functions
     */
    PersonalizationUtils.loggerUtils.error = function () {
        console.error.apply(console, Array.prototype.slice.call(arguments));
    };

    PersonalizationUtils.loggerUtils.info = function () {
        if (!PersonalizationUtils.constants.isProdEnv) {
            console.info.apply(console, Array.prototype.slice.call(arguments));
        }
    };

    PersonalizationUtils.loggerUtils.log = function () {
        if (!PersonalizationUtils.constants.isProdEnv) {
            console.log.apply(console, Array.prototype.slice.call(arguments));
        }
    };

    PersonalizationUtils.loggerUtils.warn = function () {
        if (!PersonalizationUtils.constants.isProdEnv) {
            console.warn.apply(console, Array.prototype.slice.call(arguments));
        }
    };

    /**
     * Accounts related functions
     */
    PersonalizationUtils.accountUtils.isLoggedIn = function () {
        var data = PersonalizationUtils.accountUtils.getInfo();

        if (data && _isActiveUserData(data)) {
            PersonalizationUtils.privacyUtils.checkAndSetCookie();
            return true;
        }
    };

    PersonalizationUtils.accountUtils.IPGFilter = function (data) {
        Object.getOwnPropertyNames(data).forEach(function (key) {
            if (PersonalizationUtils.constants.IPGFilter.indexOf(key) >= 0) {
                if (typeof data[key] === 'string') {
                    // special case for gender to replace with smallcase 'u'
                    if (key === 'gender') {
                        data[key] = 'u';
                    } else {
                        data[key] = 'NA';
                    }
                } else if (typeof data[key] === 'number') {
                    data[key] = 0;
                } else if (_.isArray(data[key])) {
                    // remove unwanted from work array
                    data[key] = data[key].map(function (work) {
                        return _.omit(work, PersonalizationUtils.constants.IPGFilter);
                    });
                }

            } else if (typeof data[key] === 'object' && data[key] !== null ) {
                PersonalizationUtils.accountUtils.IPGFilter(data[key]);
            }
        });

        return data;
    };

    PersonalizationUtils.accountUtils.getProfileInfo = function () {
        if (!PersonalizationUtils.accountUtils.isLoggedIn()) {
            return;
        }

        var profileInfo = PersonalizationUtils.accountUtils.getInfo();

        if (!profileInfo) {
            gigya.accounts.getAccountInfo({
                extraProfileFields: 'work',
                callback: function(response) {
                    if (response.errorCode === 0) {
                        profileInfo = response;
                    } else {
                        PersonalizationUtils.loggerUtils.error("Error in getting account info: ", response.errorMessage);
                    }
                }
            });
        }

        return({
            firstname: profileInfo.profile.firstName || '' ,
            lastName: profileInfo.profile.lastName || '',
            email: profileInfo.profile.email || '',
            company: Array.isArray(profileInfo.profile.work) ? profileInfo.profile.work[0].company : '',
            role: Array.isArray(profileInfo.profile.work) ? profileInfo.profile.work[0].title : '',
            country: profileInfo.profile.country || '',
            kpmgClient: profileInfo.data.kpmg ? profileInfo.data.kpmg.client : false
        });
    };

    PersonalizationUtils.accountUtils.getInfo = function () {
        if (!_cachedValues.accountInfo) {
            _cachedValues.accountInfo = JSON.parse(localStorage.getItem(PersonalizationUtils.constants.localStorageKey) || 'false');
        }

        //Check if the stored account information is a valid one
        if (!_isActiveUserData(_cachedValues.accountInfo)) {
            PersonalizationUtils.accountUtils.clearInfo();
        }

        return _cachedValues.accountInfo;
    };

    PersonalizationUtils.accountUtils.setInfo = function (response) {
        if (response) {
            localStorage.setItem(PersonalizationUtils.constants.localStorageKey, JSON.stringify(response));
            _cachedValues.accountInfo = JSON.parse(localStorage.getItem(PersonalizationUtils.constants.localStorageKey));
        } else {
            PersonalizationUtils.accountUtils.clearInfo();
        }
    };

    PersonalizationUtils.accountUtils.clearExplicitSessionInfo = function () {
        //Clearing snpData from sessionStorage
        var cachedSnpData = JSON.parse(sessionStorage.snpData || '{}');
        Object.keys(cachedSnpData).forEach(function (key) {
            if (key.match(/^e\|\|/)) {
                delete cachedSnpData[key];
            }
        });
        sessionStorage.snpData = JSON.stringify(cachedSnpData);

        //Clearing bannerArticles from sessionStorage
        localStorage.removeItem('bannerArticles');

        //Clear sessionStorage.userLibrary
        if (sessionStorage && sessionStorage.userLibrary) {
            delete sessionStorage.userLibrary;
        }
    };

    PersonalizationUtils.accountUtils.clearInfo = function () {
        //Clearing localStorage.accountInfo
        localStorage.removeItem(PersonalizationUtils.constants.localStorageKey);
        localStorage.removeItem('verifyEmailAlert');
        localStorage.removeItem('congratsPopUp');

        //Clearing sessionStorage
        PersonalizationUtils.accountUtils.clearExplicitSessionInfo();

        //Clear the closure cache
        _cachedValues.accountInfo = null;
    };

    PersonalizationUtils.accountUtils.getCategoryPreferences = function (category, filterList) {
        var preferencesObj,
            preferencesArr = [],
            response = PersonalizationUtils.accountUtils.getInfo();

        filterList = filterList || [];
        if (category === 'topic') {
            category = 'insight';
        }

        /**
         * @level2Preferences {Object}
         *
         * Get all level3 zthes-ids
         * If there is no level3 preferences, pick level2 zthes-id
         */
        function _parseLevel2Preferences(level2Preferences) {
            var retval = [];

            if (level2Preferences && (typeof level2Preferences === "object")) {
                Object.keys(level2Preferences).forEach(function (categoryZthesId) {
                    var categoryObj = level2Preferences[categoryZthesId],
                        subCategoryZthesIds = Object.keys(categoryObj);

                    subCategoryZthesIds = _.filter(subCategoryZthesIds, function (val) {
                        return val !== 'selected';
                    });

                    if (subCategoryZthesIds.length) {
                        //If sub-category level ids are selected, concat them
                        retval = retval.concat(subCategoryZthesIds);
                    }

                    if (categoryObj.selected === true || subCategoryZthesIds.length === 0) {
                        //If the whole category is seleced or no sub-category level ids are available, pick category level id
                        retval.push(categoryZthesId);
                    }
                });
            }

            return retval;
        }

        function _isValidCategory(val) {
            return ((filterList.indexOf(val) === -1) &&
                (!category || (category === "all") || (category === val)));
        }

        if (response && response.data) {
            if (response.data.preferences) {
                preferencesObj = JSON.parse(response.data.preferences);
                Object.keys(preferencesObj).forEach(function (key) {
                    if (_isValidCategory(key)) {
                        preferencesArr = preferencesArr.concat(_parseLevel2Preferences(preferencesObj[key]));
                    }
                });
            }
        }

        //split ids such as 3894839843-2374837483 in two ids >> '3894839843', '2374837483'
        preferencesArr.forEach(function(value, index) {
            if (value.indexOf('-') > -1) {
                var parts = value.split('-');
                preferencesArr[index] = parts[0];
                preferencesArr[preferencesArr.length] = parts[1];
            }
        });

        return _.uniq(preferencesArr).sort().join(',');
    };

    PersonalizationUtils.accountUtils.getPreferencesCount = function () {
        var count = {
            total: 0
        };

        //TODO: Replace the hardcoded array with english names from my-interests service
        ['industry', 'topic', 'service', 'country'].forEach(function (key) {
            var strVal = PersonalizationUtils.accountUtils.getCategoryPreferences(key);
            count[key] = (strVal) ? strVal.split(',').length : 0;
            count.total += count[key];
        });

        return count;
    };

    PersonalizationUtils.accountUtils.getLocale = function () {
        var accountInfo = PersonalizationUtils.accountUtils.getInfo(),
            locale = {
                countryCode: window.kpmgPersonalize.snp.params.countryCode,
                languageCode: window.kpmgPersonalize.snp.params.languageCode
            };

        if (accountInfo && accountInfo.data.kpmg && accountInfo.data.kpmg.registeredLocale) {
            var registeredLocale = accountInfo.data.kpmg.registeredLocale.split("/");
            locale.countryCode = registeredLocale[0] || locale.countryCode;
            locale.languageCode = registeredLocale[1] || locale.languageCode;
        }

        return locale;
    };

    PersonalizationUtils.accountUtils.getPasswordStrength = function (password) {
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(.){8,}$/,
            strength = {
                class: 'weak',
                label: window.kpmgPersonalize.i18n.gigyaMsgs.weak
            };

        if (regex.test(password)) {
            strength = {
                class: 'great',
                label: window.kpmgPersonalize.i18n.gigyaMsgs.strong
            };
        }

        return strength;
    };

    /**
     * Privacy cookie related functions
     */
    PersonalizationUtils.privacyUtils.getCookieKey = function () {
        if (!_cachedValues.privacyCookieKey) {
            _cachedValues.privacyCookieKey = _.find(Object.keys($.cookie()), function matchPrivacyCookiePattern(key) {
                return /^KPMG_privacyCookie/.test(key);
            });
        }

        return _cachedValues.privacyCookieKey;
    };

    PersonalizationUtils.privacyUtils.getCookieExpiry = function () {
        if (PersonalizationUtils.privacyUtils.getCookieKey()) {
            return new Date($.cookie(PersonalizationUtils.privacyUtils.getCookieKey()).split("expires=")[1].split(";path")[0]);
        }
    };

    PersonalizationUtils.privacyUtils.isAccepted = function () {
        var privacyCookieKey = PersonalizationUtils.privacyUtils.getCookieKey();
        if (privacyCookieKey) {
            return JSON.parse($.cookie(privacyCookieKey).split('isTrackEnabled=')[1].split('&value')[0]);
        }
    };

    PersonalizationUtils.privacyUtils.checkAndSetCookie = function () {
        var privacyCookieKey = PersonalizationUtils.privacyUtils.getCookieKey(),
            pathCount = window.kpmgPersonalize.misc.isAuthor ? 5 : 3,
            pathForDotCom = '',
            pathForBlogs = '',
            blogPath = (window.kpmgPersonalize && window.kpmgPersonalize.blogPath) || '';

        blogPath = blogPath.replace('/', '');

        if(window.kpmgPersonalize && window.kpmgPersonalize.isBlog) {
            pathCount = window.kpmgPersonalize.misc.isAuthor ? 6 : 4;
            pathForBlogs = window.location.pathname.split('/').slice(0, pathCount).join('/');
            pathForDotCom = pathForBlogs.replace(blogPath + '/', '');
        } else {
            pathForDotCom = window.location.pathname.split('/').slice(0, pathCount).join('/');
            pathForBlogs = pathForDotCom.split('/');
            pathForBlogs.splice(2, 0, blogPath);
            pathForBlogs = pathForBlogs.join('/');
        }

        if (!PersonalizationUtils.privacyUtils.isAccepted()) {
            //if cookie is created and isTrackEnabled is set to false.
            if(privacyCookieKey){

                _updateCookieValue("KPMG_privacyCookie_" + window.kpmgPersonalize.snp.params.countryCode + "_ver:" + window.privacyJSON.countries[0].cookieVersion, true, "true",privacyCookieKey, pathForDotCom);
                _updateCookieValue("KPMG_privacyCookie_" + window.kpmgPersonalize.snp.params.countryCode + "_ver:" + window.privacyJSON.countries[0].cookieVersion, true, "true",privacyCookieKey, pathForBlogs);
            }else{
                if ($("#policyConsent")[0]) {
                //Enabling tracking
                    $("#policyConsent")[0].checked = true;
                }
                $(".privacy-container .btn-close-main .btn-close").trigger("click");
            }
        }
    };

    /**
     * Path related functions
     */
    PersonalizationUtils.pathUtils.isAbsolutePath = function isAbsolutePath(path) {
        return (/^[a-z]+:\/\//).test(path);
    };

    PersonalizationUtils.pathUtils.getAbsolutePath = function getAbsolutePath(relPath) {
        var winkpmgpath = window.location.pathname,
        pathArr = winkpmgpath.split('/'),
        relPathArr = [];

        if (PersonalizationUtils.pathUtils.isAbsolutePath(relPath)) {
            return relPath;
        }

        //Remove current page from path URL
        pathArr.pop();

        relPath.split('/').forEach(function (path) {
            if (path === "..") {
                pathArr.pop();
            } else if (path.match(/^\w/)) {
                relPathArr.push(path);
            }
        });

        relPathArr.forEach(function (path) {
            pathArr.push(path);
        });

        return pathArr.join('/');
    };

    PersonalizationUtils.pathUtils.gotoPage = function gotoPage(relPath) {
        window.location = PersonalizationUtils.pathUtils.getAbsolutePath(relPath);
    };

    PersonalizationUtils.pathUtils.getURIparam = function getURIparam(param) {
        var pwdResetToken,
            paramsURI = window.location.href.split("?")[1],
            postParamValue = (paramsURI) ? paramsURI.split(param + "=")[1] : null;

        if (window.location.search && paramsURI && postParamValue) {
            return postParamValue.split("&")[0];
        }
    };

    /**
     * MyKpmgFlyoutUtils
     */
    PersonalizationUtils.myKpmgFlyoutUtils.getLinksJson = function () {
        var deferred = $.Deferred(),
            authorPrefix = (window.kpmgPersonalize.misc.isAuthor ? '/content/kpmgpublic' : ''),
            localeObj = PersonalizationUtils.accountUtils.getLocale(),
            localeStr = '/' + localeObj.countryCode + '/' + localeObj.languageCode + '/',
            sessionCache = (sessionStorage.myKpmgFlyoutJSON) ? JSON.parse(sessionStorage.myKpmgFlyoutJSON) : {};

        if (_cachedValues.myKpmgFlyoutJSON[localeStr]) {
            deferred.resolve(_cachedValues.myKpmgFlyoutJSON[localeStr]);
        } else if (sessionCache[localeStr]) {
            _cachedValues.myKpmgFlyoutJSON[localeStr] = sessionCache[localeStr];
            deferred.resolve(_cachedValues.myKpmgFlyoutJSON[localeStr]);
        } else {
            if(window.kpmgPersonalize.isSitePersonalize === true && mykpmgNavJsonCall) {
                $.ajax({
                    url: authorPrefix + localeStr + 'home.mykpmgnav.json',
                    success: function (data) {
                        sessionCache[localeStr] = data;
                        _cachedValues.myKpmgFlyoutJSON[localeStr] = data;
                        sessionStorage.myKpmgFlyoutJSON = JSON.stringify(sessionCache);
                        mykpmgNavJsonCall = false;
                        return deferred.resolve(data);
                    },
                    error: function (error) {
                        PersonalizationUtils.loggerUtils.error("Error in fetching MyKpmgFlyout JSON:", error);
                        return deferred.reject("Error in fetching MyKpmgFlyout JSON.");
                    }
                });
            }
        }

        return deferred;
    };

    /**
     * Store utilites
     */

    PersonalizationUtils.storeUtils.fetchUserLibraryAndUpdate = function (cb, errcb) {
        PersonalizationUtils.loggerUtils.info("fetch user library");

        var localeObj = PersonalizationUtils.accountUtils.getLocale(),
            userInfo = PersonalizationUtils.accountUtils.getInfo(),
            localeStr = '/' + localeObj.countryCode + '/' + localeObj.languageCode;

        $.ajax({
            method: 'POST',
            data: {
                locale: localeStr,
                uid: userInfo.UID,
                UIDSignature: userInfo.UIDSignature,
                signatureTimestamp: userInfo.signatureTimestamp
            },
            url: PersonalizationUtils.constants.getUserLibraryServiceURL
        }).done(function (res) {
            PersonalizationUtils.storeUtils.setUserLibrary(res, cb);
        }).fail(function (obj, msg, err) {
            PersonalizationUtils.loggerUtils.error("could not fetch user library information", err.message, err);
            if (typeof errcb === 'function') {
                errcb(err);
            }
        });
    };

    /**
     * get the complete user library information
     * @return {object}     returns an Object which contains the user library information
     */
    PersonalizationUtils.storeUtils.getUserLibrary = function () {
        try {
            _cachedValues.userLibrary = JSON.parse(sessionStorage.getItem(PersonalizationUtils.constants.localStorageLibrarykey) || 'false');

            // PersonalizationUtils.loggerUtils.info("get User Library", _cachedValues.userLibrary);
            return _cachedValues.userLibrary;

        } catch (err) {
            PersonalizationUtils.loggerUtils.error("could not get user library", err);
        }
        return {};
    };

    PersonalizationUtils.storeUtils.getLibraryAsSortedArray = function (key) {
        var arr = [];
        var prop, unsorted = [],
            library = PersonalizationUtils.storeUtils.getUserLibrary(),
            sorted = {};
        try {

            for (var oid in library.namedLists) {
                unsorted.push(_.extend({}, library.namedLists[oid], {
                    oid: oid
                }));
            }
            sorted = unsorted.sort(PersonalizationUtils.commonUtils.sortBy(key, true));
            return sorted;
        } catch (err) {
            PersonalizationUtils.loggerUtils.error("error getting sorted library", err);
        }
    };

    /**
     * set user library after fetching it from gigya
     * @param {Object} response response object which gets saved into localstorage
     */
    PersonalizationUtils.storeUtils.setUserLibrary = function (response, cb) {
        if (response) {
            sessionStorage.setItem(PersonalizationUtils.constants.localStorageLibrarykey, JSON.stringify(response));
            _cachedValues.userLibrary = false;
            if (typeof cb === 'function') {
                cb(response);
            }
        }
    };

    /**
     * get user libraray list as an array
     * @return {Array}     user library list
     */
    PersonalizationUtils.storeUtils.getUserLibraryList = function () {
        var userLibrary = PersonalizationUtils.storeUtils.getUserLibrary(),
            userLibraries = [];

        for (var library in userLibrary.namedLists) {
            userLibraries.push(userLibrary.namedLists[library].name);
        }

        return userLibraries;

    };

    /**
     * get the complete library count for summary.
     * @return {Numeric} count of libraries
     */
    PersonalizationUtils.storeUtils.getLibraryListCount = function () {
        return PersonalizationUtils.storeUtils.getUserLibraryList().length;
    };

    /**
     * * get article object from the set library based on url
     * @param  {string} libraryName name of the library
     * @param  {String} url         ariticle URL
     * @return {Object}             Article object
     */
    PersonalizationUtils.storeUtils.getArticleFromLibrary = function (libraryId, url) {
        var userLibrary = PersonalizationUtils.storeUtils.getUserLibrary(),
            url = (url.indexOf(window.location.origin) >= 0) ? url.substring(window.location.origin.length) : url;

        try {
            return _.findWhere(userLibrary.namedLists[libraryId].pages, {
                'url': url
            });
        } catch (err) {
            PersonalizationUtils.loggerUtils.error("could not complete the request", err);
        }
    };

    PersonalizationUtils.storeUtils.deleteLibrary = function (oid, cb, errcb) {
        var userInfo = PersonalizationUtils.accountUtils.getInfo();

        var library = {
            type: 'library',
            oid: oid,
            uid: userInfo.UID,
            fields: '*',
            callback: onDelete
        };

        function onDelete(response) {
            if (response.errorCode == 0) {
                var userLibrary = PersonalizationUtils.storeUtils.getUserLibrary();

                if (typeof userLibrary === 'object' && typeof userLibrary.namedLists === 'object') {
                    delete userLibrary.namedLists[oid]
                    PersonalizationUtils.storeUtils.setUserLibrary(userLibrary);
                    // PersonalizationUtils.storeUtils.fetchUserLibraryAndUpdate(cb);
                }

                if (typeof cb === 'function') {
                    cb(userLibrary);
                }

            } else {
                PersonalizationUtils.loggerUtils.error(response.errorMessage, response);

                if (typeof errcb === 'function') {
                    errcb(response);
                }
            }
        }

        try {
            PersonalizationUtils.loggerUtils.info("deleting library", library);
            gigya.ds.delete(library);
        } catch (err) {
            PersonalizationUtils.loggerUtils.error("could not complete the request", response);
        }
    };

    PersonalizationUtils.storeUtils.updateLibrary = function (oid, article, cb, errcb, actionType, updateType) {
        var userInfo = PersonalizationUtils.accountUtils.getInfo(),
            userLibrary = PersonalizationUtils.storeUtils.getUserLibrary(),
            newlibrary = {},
            newdata = _.extend({}, article),
            callGigya = true;

        if (newdata.pages && newdata.pages.length) {
            newdata.pages = _.map(newdata.pages, function (article) {
                article.title = article.title,
                    article.url = article.url.replace(PersonalizationUtils.constants.urlPattern, ''),
                    article.savedDate = (new Date()).toISOString();
                return _.pick(article, 'title', 'url', 'savedDate');
            });
        }

        if (actionType === 'update' || actionType === 'new') {
            newlibrary.updateBehavior = 'arrayPush';
            newlibrary.callback = onSave;
        } else {
            newlibrary.updateBehavior = 'replace';
            newlibrary.callback = onDelete;
        }

        newlibrary = _.extend(newlibrary, {
            type: 'library',
            oid: oid,
            uid: userInfo.UID,
            data: newdata
        });

        function onSave(response) {
            if (response.errorCode == 0) {
                try {
                    if (oid !== 'auto') {
                        if (updateType === 'Article') {
                            if (!_.isArray(userLibrary.namedLists[response.oid].pages)) {
                                userLibrary.namedLists[response.oid].pages = [];
                            }
                            userLibrary.namedLists[response.oid].pages.push(article.pages[0]);
                        } else if (updateType === 'library') {
                            userLibrary.namedLists[response.oid] = _.extend({}, userLibrary.namedLists[response.oid], article);
                        }
                    } else {
                        userLibrary.namedLists[response.oid] = article;
                    }

                    PersonalizationUtils.storeUtils.setUserLibrary(userLibrary);

                    if (typeof cb === 'function') {
                        cb(response.oid, userLibrary.namedLists[response.oid]);
                    }
                } catch (err) {
                    PersonalizationUtils.loggerUtils.error(err.message, err.details);
                    if (typeof errcb === 'function') {
                        errcb(err);
                    }
                }

            } else {
                PersonalizationUtils.loggerUtils.error(response.errorMessage, response);

                if (typeof errcb === 'function') {
                    errcb(response);
                }
            }
        }

        function onDelete(response) {
            if (response.errorCode === 0) {
                try {
                    userLibrary.namedLists[response.oid] = article;
                    PersonalizationUtils.storeUtils.setUserLibrary(userLibrary);

                    if (typeof cb === 'function') {
                        cb(response.oid, userLibrary.namedLists[response.oid]);
                    }
                } catch (err) {
                    PersonalizationUtils.loggerUtils.error(err.message, err.details);

                    if (typeof errcb === 'function') {
                        errcb(err);
                    }
                }
            } else {
                PersonalizationUtils.loggerUtils.error(response.errorMessage, response);

                if (typeof errcb === 'function') {
                    errcb(response);
                }
            }
        }

        if (actionType === 'update' && updateType === 'Article' && PersonalizationUtils.storeUtils.getArticleFromLibrary(oid, article.pages[0].url)) {
            callGigya = false;
        }

        try {
            if (userLibrary && typeof userLibrary.namedLists === 'object' && userLibrary.namedLists !== null) {
                if (callGigya) {
                    PersonalizationUtils.loggerUtils.info("updating gigya store", newlibrary);
                    gigya.ds.store(newlibrary);
                } else {
                    PersonalizationUtils.loggerUtils.info("Article already exists in the Library", newlibrary);
                }
            } else {
                throw new Error('Unable to complete action', 'userLibrary reference missing!');
            }

        } catch (err) {
            if (typeof errcb === 'function') {
                errcb(err);
            }
            PersonalizationUtils.loggerUtils.error("could not complete the request", err);
        }
    };

    PersonalizationUtils.storeUtils.updateLibraryname = function (oid, libraryName, cb, errcb) {
        PersonalizationUtils.storeUtils.updateLibrary(oid, {
            name: libraryName
        }, cb, errcb, 'update', 'library');
    };

    /**
     * create new library list based on the name
     * @param  {String}   libraryName name of the library
     * @param  {Function} cb         callback function
     */
    PersonalizationUtils.storeUtils.createNewLibrary = function (libraryName, article, cb, errcb) {
        var newLibrary = {
            name: libraryName,
            pages: []
        };

        // if there is only three parameter or 2 passed mean article has not been passed
        if (typeof article === 'function') {
            errcb = cb;
            cb = article;
        }


        if (typeof article === 'object') {
            newLibrary.pages.push(article);
        }

        if (!PersonalizationUtils.accountUtils.isLoggedIn()) {
            PersonalizationUtils.loggerUtils.error("unauthenticated user.");
        }

        PersonalizationUtils.storeUtils.updateLibrary("auto", newLibrary, cb, errcb, 'new', 'library');
    };

    /**
     * save new article to library based on library name
     * @param  {String}   libraryName library name as string
     * @param  {Object}   article     article object
     * @param  {Function} cb          callback function
     */
    PersonalizationUtils.storeUtils.saveArticleToLibrary = function (libraryId, article, cb, errcb, selectedListNameTracking, tracking, articleSaveLocation) {
        var newArticle = {
            pages: [article]
        };
        PersonalizationUtils.storeUtils.updateLibrary(libraryId, newArticle, cb, errcb, 'update', 'Article');
    };

    PersonalizationUtils.storeUtils.deleteArticlesFromLibrary = function (LibraryId, articles, cb, errcb) {
        var library = PersonalizationUtils.storeUtils.getLibraryById(LibraryId),
            articleUrls = [];

        //only pick the required fields to match the gigya update schema, else it will throw schema validation error
        library = _.pick(library, 'name', 'pages');
        if (_.isArray(articles)) {
            articles.forEach(function (article) {
                var url = (article.url.indexOf(window.location.origin) >= 0) ? article.url.substring(window.location.origin.length) : article.url;
                articleUrls.push(url);
            });
        }

        if (_.isArray(library.pages)) {
            library.pages = _.filter(library.pages, function (article) {
                return articleUrls.indexOf(article.url) === -1;
            });
        }

        PersonalizationUtils.storeUtils.updateLibrary(LibraryId, library, cb, errcb, 'delete', 'Article');
    };

    PersonalizationUtils.storeUtils.deleteArticleFromLibrary = function (LibraryId, articleUrl, cb, errcb) {
        var library = PersonalizationUtils.storeUtils.getLibraryById(LibraryId);

        //only pick the required fields to match the gigya update schema, else it will throw schema validation error
        library = _.pick(library, 'name', 'pages');

        if (_.isArray(library.pages)) {
            var url = (articleUrl.indexOf(window.location.origin) >= 0) ? articleUrl.substring(window.location.origin.length) : articleUrl;
            library.pages = _.filter(library.pages, function (article) {
                return article.url !== url;
            });
        }

        PersonalizationUtils.storeUtils.updateLibrary(LibraryId, library, cb, errcb, 'delete', 'Article');
    };

    /**
     * [getLibraryIdByName description]
     * @param  {[type]} libraryName [description]
     * @return {[type]}             [description]
     */
    PersonalizationUtils.storeUtils.getLibraryIdByName = function (libraryName) {
        var userLibrary = PersonalizationUtils.storeUtils.getUserLibrary(),
            key;

        for (var library in userLibrary.namedLists) {
            if (userLibrary.namedLists[library].name.toLowerCase() === libraryName.toLowerCase()) {
                key = library;
            }
        }

        return key;
    };

    PersonalizationUtils.storeUtils.getLibraryById = function (libraryId) {
        var key;

        if (libraryId === 'all') {
            return _.extend({}, {
                oid: 'all',
                name: 'all',
                pages: PersonalizationUtils.storeUtils.getAllArticles()
            });
        }

        if (libraryId) {
            var userLibrary = PersonalizationUtils.storeUtils.getUserLibrary();
            return userLibrary.namedLists[libraryId];
        }

        return false;
    };

    PersonalizationUtils.storeUtils.getLibraryByName = function (libraryName) {
        var userLibrary = PersonalizationUtils.storeUtils.getUserLibrary(),
            key;

        for (var library in userLibrary.namedLists) {
            if (userLibrary.namedLists[library].name.toLowerCase() === libraryName.toLowerCase()) {
                key = library;
            }
        }

        if (key) {
            return userLibrary.namedLists[key];
        }

        return false;
    };

    PersonalizationUtils.storeUtils.getRemovedArticles = function (oid) {
        var library = PersonalizationUtils.storeUtils.getLibraryById(oid),
            removed = [];

        library.pages.forEach(function (article) {
            if (!article.active) {
                removed.push(article);
            }
        });

        return removed;
    };

    /**
     * get the article count ina libraray
     * @param  {String} libraryId LibraryID
     * @return {Numeric}           count
     */
    PersonalizationUtils.storeUtils.getArticleCountByLibrary = function (libraryId) {
        var userLibrary = PersonalizationUtils.storeUtils.getUserLibrary();

        if (libraryId === 'all') {
            return PersonalizationUtils.storeUtils.getAllArticles().length;
        }

        if (userLibrary.namedLists[libraryId] && userLibrary.namedLists[libraryId].pages && userLibrary.namedLists[libraryId].pages.length) {
            return userLibrary.namedLists[libraryId].pages.length;
        } else {
            return 0;
        }
    };

    PersonalizationUtils.storeUtils.getArticleSaveLimit = function () {
        var userLibrary = PersonalizationUtils.storeUtils.getUserLibrary();
        return (userLibrary.limit) ? userLibrary.limit : 1000;
    };

    /**
     * get all articles belonging to all libraries to show as default list in library list
     * @return {Object} Complete list of libraries
     */
    PersonalizationUtils.storeUtils.getAllArticles = function () {
        var userLibrary = PersonalizationUtils.storeUtils.getUserLibrary(),
            pages = [];

        if (typeof userLibrary === 'object' && typeof userLibrary.namedLists === 'object') {
            for (var library in userLibrary.namedLists) {
                if (_.isArray(userLibrary.namedLists[library].pages)) {
                    for (var i = 0; i < userLibrary.namedLists[library].pages.length; i++) {
                        userLibrary.namedLists[library].pages[i].oid = library;
                    }

                    pages = _.union(pages, userLibrary.namedLists[library].pages)
                }
            }
        }

        return pages;
    };

    PersonalizationUtils.storeUtils.getSharedList = function () {
        _.template(PersonalizationUtils.constants.getSharedListServiceURL)(data)
    };

    PersonalizationUtils.storeUtils.shareList = function () {
        return true;
    };

    PersonalizationUtils.storeUtils.hasInactive = function (libraryId) {
        var library = PersonalizationUtils.storeUtils.getLibraryById(libraryId),
            hasInactive = false;
        for (var i = 0; i < library.pages.length; i++) {
            if (typeof library.pages[i].active !== 'undefined' && library.pages[i].active === false && hasInactive === false) {
                hasInactive = true;
            }
        }

        return hasInactive;
    };

    /**
     * move article to another library
     * @return {[type]} [description]
     */
    PersonalizationUtils.storeUtils.moveArticle = function (fromLibrary, toLibrary, article, cb, errcb) {
        PersonalizationUtils.storeUtils.deleteArticleFromLibrary(fromLibrary, article.url, function (res) {
            var newArticle = {
                pages: [article]
            };

            PersonalizationUtils.storeUtils.updateLibrary(toLibrary, newArticle, cb, errcb, 'update', 'Article');
        }, errcb)
    };

    /**
     * find article by URL
     * @param  {String} url [description]
     * @return {[type]}     [description]
     */
    PersonalizationUtils.storeUtils.findArticleByUrl = function (url) {
        if (url) {
            var allArticles = PersonalizationUtils.storeUtils.getAllArticles();
            var url = (url.indexOf(window.location.origin) >= 0) ? url.substring(window.location.origin.length) : url;
            return _.filter(allArticles, function (article) {
                if (article.url === url) {
                    return true;
                }
            });
        }
    };

    PersonalizationUtils.storeUtils.fetchBannerArticles = function (params, type, cb) {
        var payload = {},
            snp = window.kpmgPersonalize.snp;

        snp.url.split('?')[1].split('&').forEach(function (pair) {
            var part = pair.split('=');
            payload[part[0]] = part[1];
        });

        payload['site'] = params.site;
        payload['q1'] = params.zethisIds;
        payload['q4'] = params.bannerFlag;
        payload[snp.params.sortTypeKey] = snp.params.sortType.split("=")[1];

        $.ajax({
            url: snp.url.split('?')[0],
            method: 'POST',
            data: payload
        }).done(function(data) {
            var results = data[type].resultset.results.result;
            cb(results);
        }).fail(function(err) {
            console.error('S&P call failed.');
        });
    };

    PersonalizationUtils.storeUtils.storeBannerArticlesInLocalStorage = function (articles) {
        var locale = window.kpmgPersonalize.snp.params,
            localeKey = locale.countryCode + '/' + locale.languageCode,
            bannerArticles = (!!localStorage.bannerArticles) ? JSON.parse(localStorage.bannerArticles) : {};

        bannerArticles[localeKey] = {
            home: [],
            dashboard: []
        };

        // shuffle articles and then store only two articles in localStorage - one for home and another one for dashboard
        articles = _.shuffle(articles).slice(0, 2);

        articles.forEach(function(article, i) {
            if ((i % 2) === 0) {
                bannerArticles[localeKey].home.push(article);
            } else {
                bannerArticles[localeKey].dashboard.push(article);
            }
        });
        localStorage.bannerArticles = JSON.stringify(bannerArticles);
    };

    PersonalizationUtils.storeUtils.retrieveBannerArticleFromLocalStorage = function (pageType) {
        var locale = window.kpmgPersonalize.snp.params,
            localeKey = locale.countryCode + '/' + locale.languageCode,
            bannerArticles;

        if (localStorage.bannerArticles) {
            bannerArticles = JSON.parse(localStorage.bannerArticles);
            if (bannerArticles[localeKey] && Array.isArray(bannerArticles[localeKey][pageType])) {
                return bannerArticles[localeKey][pageType][0];
            }
        }
    };

    /*Update the existing privacy cookie
    * if istrackEnabled is set to false,
    * set to true if user logs in/regsiters to the site
    */
    function _updateCookieValue(c_name, trackingSelection, value,privacyCookieKey, path) {
        var oldExpiryDate = $.cookie(privacyCookieKey).split('expires=')[1].split(';')[0];
        var exdate = new Date(oldExpiryDate);
        var c_value = "isTrackEnabled=" + trackingSelection + "&value=" + escape(value) + ";expires=" + oldExpiryDate + ";path=/";

        $.cookie(c_name, c_value, { path: path, expires: exdate });
    }
    window.kpmgPersonalize = window.kpmgPersonalize || {};
    window.kpmgPersonalize.personalizationUtils = PersonalizationUtils;

    return PersonalizationUtils;
});
