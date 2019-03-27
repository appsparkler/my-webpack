(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['cqservice'], factory);
    } else {
        root.amdWeb = factory(root.CQService);
    }
}(this, function() {
    var options = {
            baseUrl: document.location.origin + '/remove.html/', // The URL to call on every request
            extension: '.export', // the extension to use on every request
            recordSize: 5, // the number of records to call on each request
            callbackParams: {} // an artibrary object for callback
        },
        //need to explicitly set $ due to jQuery.noConflict
        $ = window.jQuery;

    function CQService(component, opts) {
        if (!component) {
            this.error('A component name is required for the CQService');
        }
        this.component = component;
        this.data = false;
        this.val = false;
        // set options
        this.params = $.extend({}, options, opts);
    }

    /**
     * Checks if the type is truely an object type
     *
     * @private
     *
     * @method isObject
     * @param {Object} obj - The object to check
     * @return {Boolean} Returns true or false
     **/
    CQService.prototype.isObject = function(obj) {
        return (Object.prototype.toString.call(obj).slice(8, -1) === "Object");
    };

    /**
     * Iterates over an object looking for a specific key.
     * It returns the value or false if the key isn't found
     *
     * @private
     *
     * @method iterate
     * @param {Object} obj - The object to iterate over
     * @param {String} key - The key for the value
     * @return {any} Returns the associate value for the key or false if nothing found
     **/
    CQService.prototype.iterate = function(obj, key) {
        if (this.isObject(obj)) {
            var keys = Object.getOwnPropertyNames(obj),
                len = keys.length;
            for (var i = 0; i < len; i++) {
                if (keys[i] !== key) {
                    this.iterate(obj[keys[i]], key);
                } else {
                    this.val = obj[keys[i]];
                    break;
                }
            }
            return this.val;
        }
    };

    /**
     * If data is already loaded, retrieves the value for the key
     *
     * @method getValueByKey
     * @param {String} key - The key for the value
     * @return {any} Returns the associate value for the key
     **/
    CQService.prototype.getValueByKey = function(key) {
        if (key && this.data) {
            return this.iterate(this.data, key);
        }
    };

    /**
     * A generic error handler
     *
     * @private
     *
     * @method error
     * @param {String} msg - The message to display
     * @return {Null} Returns nothing
     **/
    CQService.prototype.error = function(msg) {
        //console.log('An error occured due to JSON response is blank', msg);
    };

    /**
     * Calls a service and returns the result. Optionally filters
     * the result and returns a specific key.
     *
     * @method fetch
     * @param {Function} callback - The callback when the service call succeeds
     * @param {String} key (Optional) - The key to filter the results by (pass null if not needed, but page is)
     * @param {Number} page (Optional) - The page to retrieve
     * @param {Number} records (Optional) - The record size to fetch
     * @return {any} Object of data or false if key doesnt' exist
     **/
    CQService.prototype.fetch = function(callback, key, page, records) {
      var timestamp = new Date().getTime();
        $.ajax({
            dataType: "json",
            url: this.params.baseUrl + '.' + (records || this.params.recordSize) + this.params.extension + '/' + this.component + '/' + page + '.json?t=' + timestamp,
            success: $.proxy(function(data) {
                this.data = data;
                if (key) {
                    data = this.iterate(data, key);
                }
                callback(data, this.data, this.params.callbackParams);
            }, this),
            error: $.proxy(function(bj, msg, err) {
                this.error(err.message);
            }, this)
        });
    };

    /**
     * Calls a service and returns the result. Optionally filters
     * the result and returns a specific key.
     *
     * @method searchFetch
     * @param {Function} callback - The callback when the service call succeeds
     * @param {String} paramUrl - The key to filter the results by (pass null if not needed, but page is)
     * @return {any} Object of data or false if key doesnt' exist
     **/
    CQService.prototype.searchFetch = function(callback, paramUrl, operation) {
        var ur = paramUrl;
        if (!KPMG.isAuthor) {
            $.ajax({
                dataType: "json",
                url: this.params.baseUrl + paramUrl,
                success: $.proxy(function(data) {
                    this.data = data;
                    this.params.callbackParams.url = ur.indexOf('?')<0? this.params.baseUrl.split('/search')[1]: ur;
                    this.params.callbackParams.param = paramUrl;
                    callback(data, this.params.callbackParams, operation);

                }, this),
                error: $.proxy(function(bj, msg, err) {
                    this.error(err.message);
                }, this)
            });
        }
    };

    /**
     * Calls a service and returns the result. Optionally filters
     * the result and returns a specific key.
     *
     * @method SOLRFetch
     * @param {Function} callback - The callback when the service call succeeds
     * @param {String} key (Optional) - The key to filter the results by (pass null if not needed, but page is)
     * @param {Number} page - The page to retrieve
     * @param {Number} records - The record size to fetch
     * @return {any} Object of data or false if key doesnt' exist
     **/
    CQService.prototype.SOLRFetch = function(callback, key, records, page) {
        if (!KPMG.isAuthor) {
            $.ajax({
                dataType: "json",
                url: this.params.baseUrl + "&rows=" + records + "&start=" + page,
                success: $.proxy(function(data) {
                    this.data = data;
                    if (key) {
                        data = this.iterate(data, key);
                    }
                    callback(data, this.data, this.params.callbackParams);
                }, this),
                error: $.proxy(function(bj, msg, err) {
                    this.error(err.message);
                }, this)
            });
        }
    };
    return CQService;
}));
