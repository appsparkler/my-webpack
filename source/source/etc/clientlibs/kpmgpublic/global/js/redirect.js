(function () {
    var pluses = /\+/g,
        config = { defaults: {} };
    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }
    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }
    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }
    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) {
        }
    }
    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return isFunction(converter) ? converter(value) : value;
    }
    function isFunction(obj) {
        return (typeof obj === "function");
    }
    function extend() {
        var option, name,
            i = 1,
            length = arguments.length,
            target = arguments[0];

        for (; i < length; i++) {
            option = arguments[i];

            if (typeof option === 'object') {
                for (name in option) {
                    target[name] = option[name];
                }
            }
        }

        return target;
    }
    function cookie(key, value, options) {
        // Write
        if (value !== undefined && !isFunction(value)) {
            options = extend({}, config.defaults, options);
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }
            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }
        // Read
        var result = key ? undefined : {};
        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');
            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }
            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }
        return result;
    }
    function removeCookie(key, options) {
        if (cookie(key) === undefined) {
            return false;
        }
        // Must not alter options, thus extending a fresh object...
        cookie(key, '', extend({}, options, {expires: -1}));
        return !cookie(key);
    };

    var accountUtils = {},
        pathUtils = {};

    function _isActiveUserData(data) {
        //TODO: Author, Test, Qa and Production conflict might happen.
        //      Need to check for domain name as well.
        return !!(data && data.requestParams.APIKey && cookie("glt_" + data.requestParams.APIKey));
    }

    accountUtils.isLoggedIn = function () {
        var data = accountUtils.getInfo();

        if (data && _isActiveUserData(data)) {
            return true;
        }
    };

    accountUtils.getInfo = function () {
        var accountInfo = JSON.parse(localStorage.getItem('accountInfo') || 'false');

        //Check if the stored account information is a valid one
        if (!_isActiveUserData(accountInfo)) {
            accountInfo = null;
        }

        return accountInfo;
    };

    accountUtils.getLocale = function () {
        var accountInfo = accountUtils.getInfo(),
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

    pathUtils.isAbsolutePath = function isAbsolutePath(path) {
        return (/^[a-z]+:\/\//).test(path);
    };

    pathUtils.getAbsolutePath = function getAbsolutePath(relPath) {
        var winkpmgpath = window.location.pathname,
        pathArr = winkpmgpath.split('/'),
        relPathArr = [];

        if (pathUtils.isAbsolutePath(relPath)) {
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

    pathUtils.gotoPage = function gotoPage(relPath) {
        window.location = pathUtils.getAbsolutePath(relPath);
    };

    function checkAuthAndRedirect(pageName) {
        if (window.kpmgPersonalize.misc.isAuthor) {
            //No redirection for author environment
            return false;
        }
        if (!accountUtils.isLoggedIn()) {
            pathUtils.gotoPage(window.kpmgPersonalize.pagesInfo[pageName].redirectTo + window.location.search);
            return true;
        }
    }

    function checkLocaleAndRedirect() {
        var processedPath,
            localeObj = accountUtils.getLocale(),
            localeStr = '/' + localeObj.countryCode + '/' + localeObj.languageCode + '/';

        if (window.kpmgPersonalize.misc.isAuthor) {
            //No redirection for author environment
            return false;
        }

        if (window.kpmgPersonalize.misc.isAuthor) {
            processedPath = window.location.pathname.replace(/^\/(\w+)\/(\w+)\/(\w+)\/(\w+)\//, "/$1/$2" + localeStr);
        } else {
            processedPath = window.location.pathname.replace(/^\/(\w+)\/(\w+)\//, localeStr);
        }

        if (processedPath !== window.location.pathname) {
            pathUtils.gotoPage(window.location.origin + processedPath);
            return true;
        }
    }

    function registerForHardReload() {
        //In most browsers, visited pages and its JS objects state are preserved while navigating to
        //other pages by clicking on a link. It is not the typical browser cache, rather it is called
        //as BFCACHE i.e. Back/Forward cache. This cache facilitates user to navigate his recently
        //visited pages fast enough.
        //This behavior prevents loggedin user from getting redirected to Dashboard page on hitting
        //'Back' button in browser. Behavior is especially observed in mobile browsers.
        //Defect Link: https://tools.publicis.sapient.com/jira/browse/KPMGS-9524
        window.onunload = function () {};
        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload();
            }
        };
    }

    window.kpmgPersonalize = window.kpmgPersonalize || {};
    window.kpmgPersonalize.personalizationUtils = {
        'accountUtils': accountUtils,
        'pathUtils': pathUtils,
        'checkAuthAndRedirect': checkAuthAndRedirect,
        'checkLocaleAndRedirect': checkLocaleAndRedirect,
        'registerForHardReload': registerForHardReload
    };
    /*  KPMGS-8772: This is to handle when distinct privacy policy set to true and
        third party scripts didn't load
    */

    if( typeof _satellite === 'undefined') {
        _satellite = {};
        _satellite.track = function(){};
    }

    window.__gigyaConf = window.__gigyaConf || {};
    window.__gigyaConf.validation = {
        'gigya-register-screen': function(formData, eventType, callback) {
            if (eventType === 'change') {
                if (formData['profile.firstName'].match(/[^a-zA-Z\-'\s]/)) {
                    return {
                        'profile.firstName': window.kpmgPersonalize.i18n.customMsgs.gigya_name_validation_error_message
                    };
                }
                if (formData['profile.lastName'].match(/[^a-zA-Z\-'\s]/)) {
                    return {
                        'profile.lastName': window.kpmgPersonalize.i18n.customMsgs.gigya_name_validation_error_message
                    };
                }
            }
            return true;
        }
    };
})();
