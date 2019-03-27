define(['jquery', 'handlebars', 'precompile', 'cqservice', 'tracking', 'helpers', 'personalizationUtils'],
    function($, Handlebars, PrecompiledHandlebars, Service, Tracking, Helpers, personalizationUtils) {
        'use strict';

        var Officelocator = function(elem) {
            // Keep the following lines at the bottom of the Officelocator function
            var trck = new Tracking(elem, 'Officelocator');
            var queryContainer = $(".queryContainer", elem),
                countryUrl = queryContainer.attr("data-countryurl"),
                cityserUrl = queryContainer.attr("data-cityserurl"),
                officeSearchUrl = queryContainer.attr("data-officeSearchUrl"),
                apiKey = queryContainer.attr("data-apikey"),
                compName = 'officelocatorresults',
                officeResultsPartial = PrecompiledHandlebars[compName],
                /*dropdown populate content*/
                officeDropdownObject = {
                    service: new Service('officelocator', {
                        baseUrl: queryContainer.attr("data-countryurl")
                    }),
                    countryDropDwnContainer: $(".officecountrydd", elem),
                    cityDropDwnContainer: $(".officecitydd", elem)
                },
                searchBtn = $(".searchBtn", elem),
                kpmgPath = window.location.pathname.toLowerCase(),
                countryCode = (kpmgPath.indexOf('content/kpmgpublic') === -1) ? kpmgPath.split('/')[1] : kpmgPath.split('/')[3],
                langCode = (kpmgPath.indexOf('content/kpmgpublic') === -1) ? kpmgPath.split('/')[2] : kpmgPath.split('/')[4],
                currentLocale = countryCode + '-' + langCode,
                officecountryddVal = "",
                officecityddVal = "",
                serviceDDVal = "",
                loadMore = $('.load-more', elem),
                currentLocBtn = $('.currentLocationBtn', elem),
                jsonObj = [],
                cityResponse = "",
                countryResponse = "",
                geocoder = "",
                geoCity = '',
                geoLocation = false,
                latitude = 0,
                longitude = 0,
                officeLocatorData="",
                totalResults = 0;

            handleCountryDropdown();
            populateCity();
            loadMaps();
            loadOfficeLocationsData();

            //populate country data into dropdown
            function handleCountryDropdown() {
                var response = JSON.parse(sessionStorage.countryResponse);
                var countryOption;
                var category = response.category[0].category;
                for (var i = 0; i < category.length; i++) {
                    for (var j = 0; j < category[i].category.length; j++) {
                        var item = {};
                        item.name = category[i].category[j].name;
                        if(category[i].category[j].isoCode){
                            item.isocode = category[i].category[j].isoCode;
                        }else{
                            item.isocode = category[i].category[j].isoCodes;
                        }
                        item.id = category[i].category[j].id.replace('/', '-');
                        jsonObj.push(item);
                    }
                }
                jsonObj.sort(function(a, b) {
                    if (a.name.toLowerCase().split('(')[0] < b.name.toLowerCase().split('(')[0]) {
                        return -1;
                    } else if (a.name.toLowerCase().split('(')[0] > b.name.toLowerCase().split('(')[0]) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                for (var k = 0; k < jsonObj.length; k++) {
                    if (jsonObj[k].id === "xx-en") {
                        countryOption += '<option value="' + jsonObj[k].id + '" data-countrycode="' + jsonObj[k].isocode + '" title="' + jsonObj[k].name + '">' + jsonObj[k].name + '</option>';
                        officeDropdownObject.countryDropDwnContainer.selectedIndex = 0;
                    } else if (currentLocale === jsonObj[k].id) {
                        countryOption += '<option value="' + jsonObj[k].id + '" data-countrycode="' + jsonObj[k].isocode + '" title="' + jsonObj[k].name + '" selected="selected">' + jsonObj[k].name + '</option>';
                    } else {
                        countryOption += '<option value="' + jsonObj[k].id + '" data-countrycode="' + jsonObj[k].isocode + '" title="' + jsonObj[k].name + '">' + jsonObj[k].name + '</option>';
                    }
                }

                officeDropdownObject.countryDropDwnContainer.append(countryOption);
                officecountryddVal = $(".officecountrydd option:selected",elem).val();

                handleofficecitydd(cityResponse);
            }
            //change handler for country dropdown
            officeDropdownObject.countryDropDwnContainer.on('change', function(e,data) {
                loadMore.hide().removeClass('visible-xs');

                if(data && data.geoloc){
                    geoLocation = true;
                }else{
                    geoLocation = false;
                }

                //if the user changes the value via dropdown, it means geolocation is not used.
                console.log($(this).val());
                var val = $(this).val();
                //$(this).find('option').removeAttr('selected');
                //$(this).find("option[value=" + val +"]").attr('selected', true);
                officecountryddVal = $(".officecountrydd option:selected",elem).val();
                if (officecountryddVal.length > 0) {
                    searchBtn.addClass('ctaEnabled').removeClass('ctaDisabled');
                    officecountryddVal = $(".officecountrydd option:selected",elem).val().replace('/', '-');
                } else {
                    searchBtn.addClass('ctaDisabled').removeClass('ctaEnabled');
                }

                handleofficecitydd(cityResponse);
            });

            function populateCity() {
                $.ajax({
                    method: "GET",
                    url: cityserUrl
                }).done(function(data) {
                    cityResponse = data;
                    handleofficecitydd(cityResponse);
                }).fail(function(err) {
                    console.log(err);
                });
            }

            function handleofficecitydd(response) {

                officeDropdownObject.cityDropDwnContainer.selectedIndex = 0;
                officecityddVal="";
                if (officecountryddVal.length > 0) {
                    officeDropdownObject.cityDropDwnContainer.find('option').not(':first').remove();
                    var countryListLen = response[officecountryddVal]  ? response[officecountryddVal].length : 0,
                        cityOption = "";
                    if(countryListLen>0){
                        for (var i = 0; i < countryListLen; i++) {
                            cityOption += '<option value="' + response[officecountryddVal][i] + '"  title="' + response[officecountryddVal][i] + '">' + response[officecountryddVal][i] + '</option>';
                        }
                        officeDropdownObject.cityDropDwnContainer.append(cityOption);
                        $('.no-results', elem).hide();
                        $('.defaultDescription',elem).show();
                        $('.defaultImageContainer',elem).show();
                        $('.resultsContainer .partner-item', elem).remove();
                        searchBtn.addClass('ctaEnabled').removeClass('ctaDisabled');
                    }else{
                        $('.defaultDescription',elem).hide();
                        $('.resultsContainer .partner-item', elem).remove();
                        $('.defaultImageContainer',elem).show();
                        $('.no-results', elem).empty().html(window.kpmgPersonalize.i18n.customMsgs.office_locator_nocities_error).show();
                        searchBtn.addClass('ctaDisabled').removeClass('ctaEnabled');
                    }
                }
                /* Set the value of the dropdown based on the value obtained by geolocation*/
                if (geoLocation) {
                    setDropDownVal(".officecitydd", geoCity.long_name, 'value');
                    officecityddVal = $(".officecitydd option:selected").val();
                }
            }

            //change handler for industry dropdown
            officeDropdownObject.cityDropDwnContainer.on('change', function() {
                /*
                   1.enable the search btn cta
                   2.get the dropdown value
                */
                officecityddVal = $(".officecitydd option:selected").val();
                if (officecountryddVal.length > 0) {
                    searchBtn.addClass('ctaEnabled').removeClass('ctaDisabled');
                } else {
                    searchBtn.addClass('ctaDisabled').removeClass('ctaEnabled');
                }
            });

            searchBtn.on('click', function(event) {
                event.preventDefault();
                if (searchBtn.hasClass('ctaDisabled')) {
                    return false;
                } else {
                    handleOfficeLocatorResultdata(officeLocatorData);
                }
            });

            function handleOfficeLocatorResultdata(resp) {
                $('.resultsContainer .partner-item', elem).remove();
                $('.defaultDescription,.defaultImageContainer', elem).hide();
                loadMore.hide().removeClass('visible-xs');
                var data = "";
                if (officecityddVal.length > 0) {
                    //Sort city results based on the selection
                    data = sortCityResults(resp[officecountryddVal][officecityddVal]);
                } else {
                    //Sort all the city results based on the country selection
                    data = officeResultData(resp[officecountryddVal]);
                }

                if (data.length > 0) {
                    if (!geoLocation) {
                        $('.resultsContainer', elem).append(officeResultsPartial({
                            results: data
                        }));
                    } else {
                        $('.resultsContainer', elem).append(officeResultsPartial({
                            results: sortResults(data)
                        }));

                    }
                    if($('.partner-item', elem).length > 5){
                        loadMore.show().addClass('visible-xs');
                    }
                    if (window.kpmg.isMobile) {
                        $('.resultsContainer div.partner-item:lt(' + 5 + ')', elem).show();

                    }
                    totalResults = $('.partner-item', elem).length;
                } else {
                    $('.no-results', elem).empty().html(window.kpmgPersonalize.i18n.customMsgs.office_locator_noresults_error).show();
                    $('.defaultDescription',elem).hide();
                    $('.defaultImageContainer', elem).show();
                    loadMore.hide().removeClass('visible-xs');
                }

            }
            loadMore.on('click', function() {
                var visibleResultslength = $('.partner-item:visible',elem).length;
                if (visibleResultslength < totalResults) {
                    var resultsvisible = $('.partner-item:visible',elem);
                    visibleResultslength = $('.partner-item:visible',elem).length;
                    var requiredResultslength = visibleResultslength + 4;
                    resultsvisible.nextAll().slice( 0, requiredResultslength ).css('display','block');
                    if (requiredResultslength >= totalResults) {
                        loadMore.hide().removeClass('visible-xs');
                    }
                } else {
                    loadMore.hide().removeClass('visible-xs');
                }
            });

            currentLocBtn.on('click', function() {
                geoLocation = true;
                initialize();
            });

            function initialize() {

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
                }
            }

            function errorFunction(status) {
                $('.no-results', elem).empty().html(window.kpmgPersonalize.i18n.customMsgs.office_locator_geolocation_error).show();
                $('.defaultDescription',elem).hide();
                $('.resultsContainer .partner-item', elem).remove();
                geoLocation=false;
                console.log('Error retrieving data');
            }

            function successFunction(position) {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                codeLatLng(latitude, longitude);
            }

            function codeLatLng(lat, lng) {
                var geoCountrycode = "";
                geocoder = new window.google.maps.Geocoder();
                var latlng = new window.google.maps.LatLng(lat, lng);
                geocoder.geocode({
                    'latLng': latlng
                }, function(results, status) {
                    if (status === window.google.maps.GeocoderStatus.OK) {
                        console.log(results);
                        if (results[1]) {
                            for (var i = 0; i < results[0].address_components.length; i++) {
                                for (var b = 0; b < results[0].address_components[i].types.length; b++) {

                                    /*capture the value in type of locality for city name*/
                                    if (results[0].address_components[i].types[b] === "locality") {
                                        geoCity = results[0].address_components[i];
                                    }
                                    /*capture the value in type of locality for city name*/
                                    if (results[0].address_components[i].types[b] === "country") {
                                        geoCountrycode = results[0].address_components[i];
                                        console.log(geoCountrycode);
                                        break;
                                    }
                                }
                            }
                            loadMore.hide().removeClass('visible-xs');
                            /*  check for multiple entries of country code
                             *  if exists show a pop up with the different languages present
                             *  else directly populate the country dropdown
                             */
                            var count = 0,
                                langArr = [];
                            for (var c = 0; c < jsonObj.length; c++) {

                                if(Array.isArray(jsonObj[c].isocode)){
                                    if($.inArray(geoCountrycode.short_name, jsonObj[c].isocode) > -1){
                                        count++;
                                        langArr.push(jsonObj[c]);
                                    }
                                }else{
                                    if (geoCountrycode.short_name === jsonObj[c].isocode) {
                                        count++;
                                        langArr.push(jsonObj[c]);
                                    }
                                }
                            }
                            if (count > 1) {
                                var langlist = "";
                                $('#langSelectionModal .langListContainer').empty();
                                for (var l = 0; l < langArr.length; l++) {
                                    langlist += '<div class="langListSection"><div class="langListItem" data-locale=' + langArr[l].id + '><span class="icon-chevron-right"></span>' + langArr[l].name + '</div></div>';
                                }
                                $('#langSelectionModal .langListContainer').append(langlist);
                                $('#langSelectionModal .langListContainer .langListItem').on('click', function(event) {

                                    officeDropdownObject.countryDropDwnContainer.selectedIndex = 0;
                                    langSelected(event);
                                });
                                showLangPopup();

                            } else {

                                officeDropdownObject.countryDropDwnContainer.selectedIndex = 0;
                                //$(officeDropdownObject.countryDropDwnContainer).trigger('change', [{geoloc:true}]);
                                $('.resultsContainer .partner-item', elem).remove();
                                $('.defaultDescription,.defaultImageContainer', elem).show();
                                setDropDownVal(".officecountrydd", geoCountrycode.short_name, 'data-countrycode');
                            }

                        } else {
                            $('.no-results', elem).empty().html(window.kpmgPersonalize.i18n.customMsgs.office_locator_geolocation_error).show();
                            $('.resultsContainer .partner-item', elem).remove();
                            $('.defaultDescription',elem).hide();
                            $('.defaultImageContainer', elem).show();
                        }
                    } else {
                        $('.no-results', elem).empty().html(window.kpmgPersonalize.i18n.customMsgs.office_locator_geolocation_error).show();
                        $('.resultsContainer .partner-item', elem).remove();
                        $('.defaultDescription',elem).hide();
                        $('.defaultImageContainer', elem).show();

                    }
                });
            }

            function loadMaps() {
                var script = document.createElement('script');
                var apiKeyParam = apiKey.length > 0 ? "key="+apiKey : "";

                var sourcePath = 'https://maps.googleapis.com/maps/api/js?'+apiKeyParam;
                script.type = 'text/javascript';
                script.src = sourcePath;
                if ($('script[src="'+sourcePath+'"]').length === 0) {
                    document.body.appendChild(script);
                }
            }

            function setDropDownVal(dropdownElem, val, attrName) {
                $(dropdownElem + ' option').each(function() {
                    if ($(this).attr(attrName) === val) {
                        $(this).prop('selected', true);
                        $(dropdownElem).val($(this).val());
                        $(officeDropdownObject.dropdownElem).trigger('change', [{geoloc:true}]);
                        searchBtn.addClass('ctaEnabled').removeClass('ctaDisabled');
                    }
                });
                officecountryddVal = $(".officecountrydd option:selected").val();
                if (dropdownElem ===".officecountrydd") {
                    handleofficecitydd(cityResponse);
                }
            }

            function sortResults(data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].distance = getDistanceFromLatLonInKm(latitude, longitude, data[i].lat, data[i].lon);

                }
                data.sort(function(a, b) {
                    if (a.distance < b.distance) {
                        return -1;
                    } else if (a.distance > b.distance) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                return data;
            }

            function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
                // Radius of the earth in km
                var R = 6371;
                // deg2rad below
                var dLat = deg2rad(lat2 - lat1);
                var dLon = deg2rad(lon2 - lon1);
                var a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                // Distance in km
                var d = R * c;

                return d;
            }

            function deg2rad(deg) {
                return deg * (Math.PI / 180);
            }

            function showLangPopup() {
                $("#langSelectionModal").bs3modal();
            }

            function langSelected(event) {
                var selectedLang = $(event.currentTarget).attr('data-locale');
                setDropDownVal(".officecountrydd", selectedLang, 'value');
                $('#langSelectionModal').bs3modal('hide');
                $('.resultsContainer .partner-item', elem).remove();
                $('.defaultDescription,.defaultImageContainer', elem).show();
            }
            function officeResultData(data){
                var citiesArr=[];
                Object.keys(data).forEach(function (key) {
                    if (typeof data[key] === 'object') {
                        for(var q=0;q<data[key].length;q++){
                            citiesArr.push(data[key][q]);
                        }
                    }
                });
                return sortCityResults(citiesArr);
            }
            function sortCityResults(data){
                data.sort(function(a, b) {
                    if (a.title < b.title) {
                        return -1;
                    } else if (a.title > b.title) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                return data;
            }
            function loadOfficeLocationsData(){
                $.ajax({
                    method: "GET",
                    url: officeSearchUrl
                }).done(function(data) {
                    officeLocatorData = data;
                }).fail(function(err) {
                    console.log(err);
                });
            }

            $(elem).on('click', '.officeDetails', function () {
                window.open($(this).find(".linkTag").attr("href"), '_blank');
            });

            $(document).trigger('template.loaded');
        };
        return Officelocator;
    }
);
