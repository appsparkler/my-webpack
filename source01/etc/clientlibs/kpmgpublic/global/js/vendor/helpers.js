/* global s */
/* _satellite */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['helpers'], factory);
    } else {
        root.amdWeb = factory(root.Helpers);
    }
}(this, function () {
    function Helpers() {
    }
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    Helpers.prototype.debounce = function (func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments,
                later = function () {
                    timeout = null;
                    if (!immediate) {
                        func.apply(context, args);
                    }
                },
                callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    };
    /**
     * helper method for date format - please update in handlebars-helpers.js
     * 
     * @private
     * @method dateFormat
     * 
     * @param {String} date - Date Ex: Thu Feb 12 2015 17:38:02 GMT+0530 (India Standard Time)
     * @param {String} locale - locale Ex: en-us
     * @param {String} formatType  - return date format type
     * 
     * @return {String} Date as a string with provided format
     * 
     **/
    Helpers.prototype.dateFormat = function (date, i18nProperties, dateProperties) {
        if (!date && !i18nProperties && !dateProperties) {
            return date;
        }

        var dateFormat = {
                pad: function (val, len) {
                    val = String(val);
                    len = len || 2;
                    while (val.length < len)
                        val = "0" + val;
                    return val;
                },
                getDate: function (dateType) {
                    if (!this.date) {
                        return null;
                    }
                    var date = this.date.getDate();
                    switch (dateType) {
                        case "dd":
                            return this.pad(date);
                        case "ddd":
                            return Math.round((this.date.setHours(23) - new Date(this.date.getYear()+1900, 0, 1, 0, 0, 0))/1000/60/60/24);
                        default:
                            return date;
                    }
                },
                getMonth: function (monthType, monthCase) {
                    if (!this.date) {
                        return null;
                    }
                    var month = this.date.getMonth();
                    switch (monthType) {
                        case "mm":
                            month = this.pad(month + 1);
                            break;
                        case "mmm":
                            month = this.i18nLabels.shortMonths[month];
                            break;
                        case "mmmm" :
                            month = this.i18nLabels.longMonths[month];
                            break;
                        default:
                            month = month + 1;
                            break;
                    }
                    switch (monthCase) {
                        case "lc":
                            return month.toLowerCase();
                        case "uc":
                            return month.toUpperCase();
                        default:
                            return month;
                    }
                },
                getYear: function (yearType) {
                    if (!this.date) {
                        return null;
                    }
                    var year = this.date.getFullYear();
                    switch (yearType) {
                        case "yy":
                            return String(year).slice(2);
                        default:
                            return year;
                    }
                },
                getHourMinute: function (hourType) {
                    if (!this.date) {
                        return null;
                    }
                    var hour = this.date.getHours(),
                        minute = this.date.getMinutes(),
                        ampm = hour >= 12 ? this.i18nLabels.timeMeridiems[1] : this.i18nLabels.timeMeridiems[0],
                        showMeridiem = this.dateFormatProperties.showMeridiem,
                        timeSeparator = this.dateFormatProperties.timeSeparator,
                        meridiem;

                        if(showMeridiem && showMeridiem !== "undefined") {
                            meridiem = ampm;
                        } else {
                            meridiem = "";
                        }
                    switch (hourType) {
                        case "hh":
                            return " " + this.pad(hour % 12 || 12) + timeSeparator + this.pad(minute) + " " + meridiem;
                        default:
                            return " " + this.pad(hour) + timeSeparator + this.pad(minute);
                    }
                },
                getDateValue: function (val, type) {
                    switch (val) {
                        case "day":
                            return this.getDate(type.dayType);
                        case "month":
                            return this.getMonth(type.monthType, type.monthCase);
                        case "year":
                            return this.getYear(type.yearType);
                        case "time":
                            return this.getHourMinute(type.hourType);
                        default:
                            return "";
                    }
                },
                getFormattedDate: function () {
                    if (!this.dateFormatProperties) {
                        return this.date;
                    }
                    var dateField = "";
                    for (var field in this.dateFormatProperties.fields) {
                        for(var item in this.dateFormatProperties.fields[field]){
                            var itemVal = this.dateFormatProperties.fields[field][item],separatorVal;
                            if(field <= 2) { 
                                separatorVal = this.dateFormatProperties.separators[field][item];
                            }
                            dateField += this.getDateValue(itemVal, this.dateFormatProperties.transformations);
                            if (itemVal !== "null") {
                                if(item === "item4") {
                                    separatorVal = " ";
                                }
                                dateField += (separatorVal) ? separatorVal : "";
                            }
                        }
                    }
                    return dateField;
                }
            };        
            dateFormat.date = new Date(date);
            dateFormat.i18nLabels = i18nProperties;
            dateFormat.dateFormatProperties = dateProperties;
            return dateFormat.getFormattedDate();
    };
    /**
     * helper method for time zone format - please update in handlebars-helpers.js
     * 
     **/

    Helpers.prototype.timeZoneFormat = function(timezone, i18nProperties, dateProperties ) {
        if (!timezone && !i18nProperties && !dateProperties) {
            return timezone;
        }

        var timeZoneFormat = {
            pad: function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len)
                    val = "0" + val;
                return val;
            },
            getHourMinute: function (hourType) {
                if (!this.startTime && !this.endTime) {
                    return null;
                }

                var hour1 = this.startTime.split(':')[0],
                    minute1 = this.startTime.split(':')[1],
                    ampm1 = this.startTimeMerdiem === this.i18nLabels.timeMeridiems[1] ? this.i18nLabels.timeMeridiems[1] : this.i18nLabels.timeMeridiems[0],
                    hour2 = this.endTime.split(':')[0],
                    minute2 = this.endTime.split(':')[1],
                    ampm2 = this.endTimeMerdiem === this.i18nLabels.timeMeridiems[1] ? this.i18nLabels.timeMeridiems[1] : this.i18nLabels.timeMeridiems[0],
                    showMeridiem = this.dateFormatProperties.showMeridiem,
                    timeSeparator = this.dateFormatProperties.timeSeparator,
                    meridiem1, meridiem2, hour3, hour4;

                    if(ampm1 === this.i18nLabels.timeMeridiems[1]) {
                        hour3 = Number(hour1) + 12;
                    } else {
                        hour3 = hour1;
                    }

                    if(ampm2 === this.i18nLabels.timeMeridiems[1]) {
                        hour4 = Number(hour2) + 12;
                    } else {
                        hour4 = hour2;
                    }

                    if(showMeridiem && showMeridiem !== "undefined") {
                        meridiem1 = ampm1;
                        meridiem2 = ampm2;
                    } else {
                        meridiem1 = "";
                        meridiem2 = "";
                    }
                switch (hourType) {
                    case "hh":
                        if(showMeridiem) {
                            return " " + this.pad(hour1) + timeSeparator + this.pad(minute1) + " " + meridiem1 + " - " + this.pad(hour2) + timeSeparator + this.pad(minute2) + " " + meridiem2;
                        } else {
                            return " " + this.pad(hour1) + timeSeparator + this.pad(minute1) + " - " + this.pad(hour2) + timeSeparator + this.pad(minute2);
                        }
                    default:
                        return " " + this.pad(hour3) + timeSeparator + this.pad(minute1) + " - " + this.pad(hour4) + timeSeparator + this.pad(minute2);
                }
            }
        }

        timeZoneFormat.startTime = timezone.split(',')[0].split('-')[0].split(' ')[0];
        timeZoneFormat.endTime = timezone.split(',')[0].split('-')[1].trim().split(' ')[0];
        timeZoneFormat.startTimeMerdiem = timezone.split(',')[0].split('-')[0].split(' ')[1];
        timeZoneFormat.endTimeMerdiem = timezone.split(',')[0].split('-')[1].trim().split(' ')[1];
        timeZoneFormat.timezone = timezone.split(',')[1].trim();
        timeZoneFormat.i18nLabels = i18nProperties;
        timeZoneFormat.dateFormatProperties = dateProperties;
        return timeZoneFormat.getHourMinute(timeZoneFormat.dateFormatProperties.transformations.hourType) + ", " + timeZoneFormat.timezone;
    };
     
    /**
     * helper method for filter particular JSON object
     * 
     * @private
     * @method filterJSON
     * 
     * @param {object} json - json object
     * @param {String} key - json key
     * 
     * @return {json}
     * 
     **/
    Helpers.prototype.filterJSON = function (json, key) {
        if (!json) {
            return json;
        }
        var hits = [];
        $.each(json, function (k, v) {
            if (k === key) {
                hits.push(v);
            }
            if (typeof (v) === "string") {
                return true;
            } else if ($.isArray(v) || $.isPlainObject(v)) {
                var r = Helpers.prototype.filterJSON.call(this, v, key);
                if (r.length > 0) {
                    hits = hits.concat(r);
                }
            }
        });
        return hits;
    };
    /**
     * helper method for xml to JSON object
     * 
     * @private
     * @method xmlToJson
     * 
     * @param {xml} xml - xml object
     * 
     * @return {json}
     * 
     **/
    Helpers.prototype.xmlToJson = function (xml) {
        var obj = {};
        if (xml.nodeType === 1) {
            if (xml.attributes.length > 0) {
                obj.searchInputs = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj.searchInputs[attribute.nodeName] = attribute.value;
                }
            }
        } else if (xml.nodeType === 3) {
            obj = xml.nodeValue;
        }
        if (xml.hasChildNodes()) {
            for (var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof (obj[nodeName]) === "undefined") {
                    obj[nodeName] = Helpers.prototype.xmlToJson.call(this, item);
                } else {
                    if (typeof (obj[nodeName].push) === "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(Helpers.prototype.xmlToJson.call(this, item));
                }
            }
        }
        return obj;
    };
    /**
     * Helper method for warping the tracking calls
     * to avoid breaking of the components/templates
     *
     * @private
     * @method Helpers.triggerTracking
     * 
     * @param {object} trackingParam - trackingParam object
     * @param {string} trackingName - trackingName string
     * 
     **/
    Helpers.prototype.triggerTracking = function (trackingParam, trackingName) {
        try {
            s.trackEvent(trackingParam, trackingName);
        } catch (err) {
            //console.log('Tracking disabled hence "S" object is undefined...');
        }
    };
    /**
     * Helper method for warping the tracking calls
     * to avoid breaking of the components/templates
     *
     * @private
     * @method triggerSatteliteTracking
     * 
     * @param {string} trackingName - trackingName string
     * 
     **/
    Helpers.prototype.triggerSatteliteTracking = function (trackingName) {
        try {
            _satellite.track(trackingName);
        } catch (err) {
            //console.log('Tracking error : ', err);
        }
    };


    /**
     * Helper method for getting query values
     * 
     *
     * @string (url)
     * @method triggerSatteliteTracking
     * 
     * @param {string} getUrlParams - trackingName string
     * 
     **/
    Helpers.prototype.getUrlParams = function (queryString) {
        var keyArrays = [];
        try {
            var queryComponents = queryString.indexOf("?") > -1 ? queryString.split("?"): "",
                q = queryComponents[1] ? queryComponents[1].split("&") : "",
                keyArrays = [];
            for(var i = 0; i<q.length ; i++) {
                var  s = q[i].split("=");
                keyArrays[s[0]] = decodeURI(s[1]);
            }
            
        } catch (err) {
        }
        return keyArrays;

    };

    Helpers.prototype.isOSXSafari= function () {
        if (navigator.userAgent.indexOf('Mac OS X') != -1 && 
            navigator.userAgent.indexOf('Safari') != -1 && 
            navigator.userAgent.indexOf('Chrome') == -1) {
                return true;
        } 
    };

    /* Focus trap code adapted from: https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element */
    Helpers.prototype.trapFocus = function (element, namespace) {
        var focusableEls = element.find('a, object, :input, iframe, [tabindex]').not('svg'),
            firstFocusableEl = focusableEls.first()[0],
            lastFocusableEl = focusableEls.last()[0],
            KEYCODE_TAB = 9;

        $(element).on('keydown', function(e) {
            var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

            if (!isTabPressed) { 
                return; 
            }

            if (e.shiftKey) { /* shift + tab */
                if (document.activeElement === firstFocusableEl) {
                    lastFocusableEl.trigger('focus');
                    e.preventDefault();
                }
            } else { /* tab */
                if (document.activeElement === lastFocusableEl) {
                    firstFocusableEl.trigger('focus');
                    e.preventDefault();
                }
            }
        });
    };
    Helpers.prototype.undoTrapFocus = function (element, namespace) {
        $(element).off('keydown.' + namespace);
    };

    return new Helpers();
}));