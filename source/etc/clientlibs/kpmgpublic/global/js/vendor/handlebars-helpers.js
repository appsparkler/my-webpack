/* global calanderProperties */
define(['handlebars'],
        function (Handlebars) {
            'use strict';
            Handlebars.registerHelper('checkboxValidation', function (val) {
                return val ? ' checked="checked"' : '';
            });
            Handlebars.registerHelper('moreFacetsCheck', function (i, options) {
                return (i.length > 5) ? options.fn(this) : options.inverse(this);
            });
            Handlebars.registerHelper('moreItemsCheck', function (i, options) {
                return (i >= 5) ? options.inverse(this) : options.fn(this);
            });
            Handlebars.registerHelper('selectboxValidation', function (val) {
                return val ? 'selected' : '';
            });
            Handlebars.registerHelper('contentTypeIcon', function (val) {
                return val ? val.toLowerCase().trim() : '';
            });
            Handlebars.registerHelper('toLowerCase', function(val) {
                val = val || '';
                return val.toLowerCase();
            });
            /**
             * Handlebar helper method for compare values
             *
             * @private
             * @method compare
             *
             * @param {String/Numeric}
             * @param {String/Numeric}
             *
             * Options: {
             *  eq [return true if LHS and RHS are equal else return false]
             *  neq [return true if LHS and RHS are not equal else return false]
             *  nei[case insesnitive equal to comparism]
             *
             }
             * @return BOOL
             *
             **/
            Handlebars.registerHelper("compare", function (v1, op, v2, options) {
                var c = {
                    "eq": function (v1, v2) {
                        return v1 === v2;
                    },
                    "neq": function (v1, v2) {
                        return v1 !== v2;
                    },
                    "eqi": function (v1, v2) {
                        if(typeof v1 === 'string' && typeof v2 === 'string') {
                            return v1.toLowerCase() === v2.toLowerCase();
                        }
                        else{
                            return false;
                        }

                    }
                };
                if (Object.prototype.hasOwnProperty.call(c, op)) {
                    return c[ op ].call(this, v1, v2) ? options.fn(this) : options.inverse(this);
                }
                return options.inverse(this);
            });
            /**
             * Handlebar helper method for date format - please update in helpers.js
             *
             * @private
             * @method formatDate
             *
             * @param {String} date - Date Ex: Thu Feb 12 2015 17:38:02 GMT+0530 (India Standard Time)
             * @param {String} locale - locale Ex: en-us
             * @param {String} formatType  - return date format type
             *
             * @return {String} Date as a string with provided format
             *
             **/
            Handlebars.registerHelper("formatDate", function (date, formatType) {
                if (!date && !calanderProperties) {
                    return date;
                }
                var months, dateSplit, newDate, d, convertedDate ;
                months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
                dateSplit=date.split("-");
                newDate= new Date(dateSplit[2], months.indexOf(dateSplit[1].toLowerCase()), dateSplit[0],0,0,0);
                d = new Date(newDate), convertedDate = date;
                switch (formatType) {
                    case 'mmmm dd, yyyy':
                        convertedDate = calanderProperties.longMonths[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
                        break;
                    case 'mmmm dd':
                        convertedDate = calanderProperties.longMonths[d.getMonth()] + " " + d.getDate()
                        break;
                    case 'mmm dd':
                        convertedDate = calanderProperties.shortMonths[d.getMonth()] + " " + d.getDate()
                        break;
                    case 'dd mmmm yyyy':
                        convertedDate = d.getDate() + " "  + calanderProperties.longMonths[d.getMonth()] + " "  + d.getFullYear();
                        break;
                    default:
                        convertedDate = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
                        break;
                }
                return convertedDate;
            });

            Handlebars.registerHelper("formateDateSolr", function (date, formatType,finalDate) {
                if (!date && !calanderProperties) {
                    return date;
                }
                var months, dateSplit, newDate, d, convertedDate ;
                months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
                dateSplit=date.split("-");
				/*if(dateSplit.length<2) {
					return finalDate;
				}*/
                newDate= new Date(parseInt(dateSplit[2]), months.indexOf(dateSplit[1].toLowerCase()), dateSplit[0],0,0,0);
                d = new Date(finalDate), convertedDate = date;
                if(isNaN(d.getTime())) {
                    return finalDate;
                }
                switch (formatType) {
                    case 'mmm dd':
                        convertedDate = calanderProperties.shortMonths[d.getMonth()] + " " + d.getDate();
                        break;

                    default:
                        convertedDate = finalDate;
                        break;
                }
                return convertedDate;
            });

             /**
             * Handlebar helper method for date format - please update in helpers.js
             *
             * @private
             * @method formatDate
             *
             * @param {String} date - Date Ex: Thu Feb 12 2015 17:38:02 GMT+0530 (India Standard Time)
             * @param {String} locale - locale Ex: en-us
             * @param {String} formatType  - return date format type
             *
             * @return {String} Date as a string with provided format
             *
             **/
            Handlebars.registerHelper("formatDate", function(date) {
             if (!date && !calanderProperties) {
                 return date;
             }
             var time;
             var isTime=false;
              if(date.indexOf(",")!=-1) {
             time=date.substring(date.lastIndexOf(","),date.length);
             date=date.substring(0,date.lastIndexOf(","));
             isTime=true;
             }
             var formatType;
             var d = new Date(date),
                 convertedDate = date;
                if(isNaN(d.getTime())) {
                    return date;
                }

             if (kpmgDateFormat != undefined) {
                 formatType = kpmgDateFormat;
             } else {
                 formatType = 'mm/dd/yyyy:Month Day Year';
             }
             switch (formatType) {
                 case 'mm/dd/yyyy:Month Day Year':
                     convertedDate = (parseInt(d.getMonth()) + 1)+ kpmgDateSeperator1 + ("0" + d.getDate()).slice(-2) + kpmgDateSeperator2 + d.getFullYear();
                     break;
                 case 'yy/ddd:Julian':
                     convertedDate = d.getMonth() + kpmgDateSeperator1 + d.getDate() + kpmgDateSeperator2 + d.getFullYear();
                     break;

                 case 'dd-mmm-yyyy :Day Month Year':
                     convertedDate = ("0" + d.getDate()).slice(-2) + kpmgDateSeperator1 + calanderProperties.shortMonths[d.getMonth()] + kpmgDateSeperator2 + d.getFullYear();
                     break;
                 case 'dd-mmm-yy:Day Month Year (With Apostrophe Options)':
                     convertedDate = ("0" + d.getDate()).slice(-2) + kpmgDateSeperator1 + calanderProperties.shortMonths[d.getMonth()] + kpmgDateSeperator2 + (d.getFullYear() + '').slice(-2);
                     break;
                 case 'dd.mm.yyyy:European Standard':
                     convertedDate =("0" + d.getDate()).slice(-2) + kpmgDateSeperator1 + (parseInt(d.getMonth()) + 1) + kpmgDateSeperator2 + d.getFullYear();
                     break;
                 case '[full month] dd, yyyy:Month Day Year':
                     convertedDate = calanderProperties.longMonths[d.getMonth()] + kpmgDateSeperator1 + ("0" + d.getDate()).slice(-2) + kpmgDateSeperator2 + d.getFullYear();
                     break;
                 case 'yyyy [full month] dd:Year Month Day':
                     convertedDate = d.getFullYear() + kpmgDateSeperator1 + calanderProperties.longMonths[d.getMonth()] + kpmgDateSeperator2 + ("0" + d.getDate()).slice(-2);
                     break;
                 case 'mm/dd/yy:Month/Day/Year':
                     convertedDate = (parseInt(d.getMonth()) + 1) + kpmgDateSeperator1 + ("0" + d.getDate()).slice(-2) + kpmgDateSeperator2 + (d.getFullYear() + '').slice(-2);
                     break;
                     break;
                 case 'yyyy-mm-dd:International Standards Organization':
                     convertedDate = d.getFullYear() + kpmgDateSeperator1 + (parseInt(d.getMonth()) + 1) + kpmgDateSeperator2 + ("0" + d.getDate()).slice(-2);
                     break;
                 case 'yyyy-mm-dd:Japanese Industrial Standard Christian Era':
                     convertedDate = d.getFullYear() + kpmgDateSeperator1 + (parseInt(d.getMonth()) + 1) + kpmgDateSeperator2 + ("0" + d.getDate()).slice(-2);
                     break;
                 case 'dd/mm/yy:Day/Month/Year':
                     convertedDate = ("0" + d.getDate()).slice(-2) + kpmgDateSeperator1 + (parseInt(d.getMonth()) + 1) + kpmgDateSeperator2 + (d.getFullYear() + '').slice(-2);
                     break;
                 case 'yy/mm/dd:Year/Month/Day':
                     convertedDate = (d.getFullYear() + '').slice(-2) + kpmgDateSeperator1 + (parseInt(d.getMonth()) + 1) + kpmgDateSeperator2 + ("0" + d.getDate()).slice(-2);
                     break;
                 case 'yyyy mmm dd:Year Month Day':
                     convertedDate = d.getFullYear() + kpmgDateSeperator1 + calanderProperties.shortMonths[d.getMonth()] + kpmgDateSeperator2 + ("0" + d.getDate()).slice(-2);
                     break;
                 case 'd [full month] yyyy:Day Month Year':
                     convertedDate = d.getDate()+kpmgDateSeperator1+calanderProperties.longMonths[d.getMonth()] + kpmgDateSeperator2 + d.getFullYear();
                     break;
                 case 'mm/dd/yyyy:USA Standard':
                     convertedDate = (parseInt(d.getMonth()) + 1)+kpmgDateSeperator1+("0" + d.getDate()).slice(-2)+kpmgDateSeperator2+d.getFullYear();
                     break;
                 case 'mmm dd, yyyy:Month Day Year':
                     convertedDate =  calanderProperties.shortMonths[d.getMonth()] + kpmgDateSeperator1 + d.getDate()+kpmgDateSeperator2+d.getFullYear();
                     break;
                 case 'yyyy-mm-dd:Year Month Day':
                     convertedDate = d.getFullYear() + kpmgDateSeperator1 + (parseInt(d.getMonth()) + 1) + kpmgDateSeperator2 + ("0" + d.getDate()).slice(-2);
                     break;

                 default:
                     convertedDate = ("0" + d.getDate()).slice(-2) + "/" + (parseInt(d.getMonth()) + 1) + "/" + d.getFullYear();
                     break;
             }
              if(isTime) {
                 convertedDate=convertedDate+time;
             }
             return convertedDate;
         });

         Handlebars.registerHelper("ifCondx", function (v1, operator, v2, options) {
            switch (operator) {
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                case '!==':
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
         });
         
    }
);
