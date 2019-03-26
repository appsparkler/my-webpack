define(['jquery', 'handlebars', 'precompile', 'cqservice', 'tracking', 'helpers'],
    function($, Handlebars, PrecompiledHandlebars, Service, Tracking, Helpers) {
        'use strict';

        var Partnerlocator = function(elem) {
            // Keep the following lines at the bottom of the Partnerlocator function
            var trck = new Tracking(elem, 'Partnerlocator');

            var queryContainer = $(".queryContainer", elem),
                industryUrl = queryContainer.attr("data-industryserurl"),
                countryUrl = queryContainer.attr("data-countryurl"),
                solrUrl = queryContainer.attr("data-solrURL"),
                templateUrl = queryContainer.attr("data-templatepath"),
                contactFormUrl = queryContainer.attr("data-contactformlink"),
                allPartnersQuery = queryContainer.attr("data-allpartnersquery"),
                compName = 'partnerresults',
                partnerResultsPartial = PrecompiledHandlebars[compName],
                isMobileDevice = window.matchMedia("all and (max-width: 641px)").matches,
                /*dropdown populate content*/
                dropdownResultObject = {
                    service: new Service('partnerlocator', {
                        baseUrl: queryContainer.attr("data-countryurl")
                    }),
                    countryDropDwnContainer: $(".countrydd", elem),
                    industryDropDwnContainer: $(".industrydd", elem),
                    serviceDropDwnContainer: $(".servicedd", elem)
                },
                searchBtn = $(".listpartners", elem),
                seeallcontact = $(".allcontactlist", elem),

                kpmgPath = window.location.pathname.toLowerCase(),
                countryCode = (kpmgPath.indexOf('content/kpmgpublic') === -1) ? kpmgPath.split('/')[1] : kpmgPath.split('/')[3],
                langCode = (kpmgPath.indexOf('content/kpmgpublic') === -1) ? kpmgPath.split('/')[2] : kpmgPath.split('/')[4],
                currentLocale=countryCode +'-'+langCode,
                countryDDVal="", industryDDVal="", serviceDDVal="",

                jsonObj = [],
                totalResults=0;

            handleCountryDropdown();

            //populate country data into dropdown
            function handleCountryDropdown() {
                var response = JSON.parse(sessionStorage.countryResponse);
                var countryCode, localeCode, localeLang, countryOption;
                var category = response.category[0].category;
                for (var i = 0; i < category.length; i++) {
                    for (var j = 0; j < category[i].category.length; j++) {
                        var item = {};
                        item.name = category[i].category[j].name;
                        item.isocode = category[i].category[j].isoCode;
                        item.id = category[i].category[j].id.replace('/', '-');
                        item.searchpath = category[i].category[j].searchpath;
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
                    if (currentLocale === jsonObj[k].id) {
                        countryOption += '<option value="' + jsonObj[k].id + '" data-countrycode="' + jsonObj[k].isocode + '" data-searchpath="' + jsonObj[k].searchpath + '" title="' + jsonObj[k].name + '" selected="selected">' + jsonObj[k].name + '</option>';
                    } else {
                        countryOption += '<option value="' + jsonObj[k].id + '" data-countrycode="' + jsonObj[k].isocode + '" data-searchpath="' + jsonObj[k].searchpath + '" title="' + jsonObj[k].name + '">' + jsonObj[k].name + '</option>';
                    }
                }


                dropdownResultObject.countryDropDwnContainer.append(countryOption);
                countryDDVal=$(".countrydd option:selected").val();
                //populate the response  for industry and service dropdowns
                handleIndustryServiceDD();
            }
            //change handler for country dropdown
            dropdownResultObject.countryDropDwnContainer.on('change', function() {

                $('.resultsContainer .partner-item', elem).remove();
                $('.searchallcontact', elem).hide();
                serviceDDVal='';
                industryDDVal='';
                countryDDVal = $(".countrydd option:selected").val();
                if (countryDDVal.length > 0 && industryDDVal.length > 0 || countryDDVal.length > 0 && serviceDDVal.length > 0) {
                    searchBtn.addClass('ctaEnabled').removeClass('ctaDisabled');
                }else{
                    searchBtn.addClass('ctaDisabled').removeClass('ctaEnabled');
                }
                populateIndustry();
            });

            function populateIndustry(){
                industryDDVal='';
                serviceDDVal='';
                dropdownResultObject.industryDropDwnContainer.selectedIndex = 0;
                dropdownResultObject.serviceDropDwnContainer.selectedIndex = 0;
                dropdownResultObject.industryDropDwnContainer.find('option').not(':first').remove();
                dropdownResultObject.serviceDropDwnContainer.find('option').not(':first').remove();

                var countryCode=$('option:selected', '.countrydd').val();
                $.ajax({
                    method: "GET",
                    url: countryUrl + '.' + countryCode + '.true.localtags.json'
                }).done(function (data) {
                    handleIndustryServiceDD(data);
                }).fail(function (err) {
                    console.log(err);
                });
            }

            function handleIndustryServiceDD(cresp) {
                var countryBasedResp = '',
                response = JSON.parse(sessionStorage.countryResponse);
                countryBasedResp=cresp;
                var industryOption, serviceOption;
                var data = cresp!==undefined? countryBasedResp.tags:response.tags;
                for (var i = 0; i < data.length; ++i) {
                    for (var key in data[i]) {
                        if (data[i][key] instanceof Object) {
                            for (var tkey in data[i][key]) {
                                if (data[i]['english-name'] === "industry") {
                                    industryOption += '<option value="' + data[i][key][tkey]['zthes-id'] + '" title="'+data[i][key][tkey].name+'">' + data[i][key][tkey].name + '</option>';
                                } else if (data[i]['english-name'] === "service") {
                                    serviceOption += '<option value="' + data[i][key][tkey]['zthes-id'] + '" title="'+data[i][key][tkey].name+'">' + data[i][key][tkey].name + '</option>';
                                } else {
                                    continue;
                                }
                            }
                        }
                    }
                }
                dropdownResultObject.industryDropDwnContainer.append(industryOption);
                dropdownResultObject.serviceDropDwnContainer.append(serviceOption);
            }
            //change handler for industry dropdown
            dropdownResultObject.industryDropDwnContainer.on('change', function() {
                /*
                   1.enable the search btn cta
                   2.get the dropdown value
                */
                industryDDVal = $(".industrydd option:selected").val();
                if (countryDDVal.length > 0 && industryDDVal.length > 0 || countryDDVal.length > 0 && serviceDDVal.length > 0) {
                    searchBtn.addClass('ctaEnabled').removeClass('ctaDisabled');
                }else{
                    searchBtn.addClass('ctaDisabled').removeClass('ctaEnabled');
                }
            });
            //change handler for service dropdown
            dropdownResultObject.serviceDropDwnContainer.on('change', function() {
                /*
                   1.enable the search btn cta
                   2.get the dropdown value
                */
                serviceDDVal = $(".servicedd option:selected").val();
                if (countryDDVal.length > 0 && serviceDDVal.length > 0 || countryDDVal.length > 0 && industryDDVal.length > 0) {
                    searchBtn.addClass('ctaEnabled').removeClass('ctaDisabled');
                }else{
                    searchBtn.addClass('ctaDisabled').removeClass('ctaEnabled');
                }
            });

            seeallcontact.on('click', function(event) {
                event.preventDefault();

                var location = "partnerlocator";
                Helpers.triggerTracking({
                        'linkLocationID1': location + '_' + $(".allcontact").text(),
                        'linkLocationID2': location + '_' + $(".allcontact").text(),
                        'linkLocation1': location,
                        'linkLocation2': location,
                        'events': 'event11'
                    },
                    'Internal Link');


                var countryCode = $('option:selected', '.countrydd').val(),
                
                searchpath = $('option:selected', '.countrydd').attr('data-searchpath'),
                localeVal = countryCode.split('-'),
                winLocObj = window.location,
                domain = winLocObj.host,
                protocol = winLocObj.protocol;
                var serviceVal = $('.servicedd option:selected').val().length > 0 ? $('.servicedd option:selected').text() : "All";
                var industryVal = $('.industrydd option:selected').val().length > 0 ? $('.industrydd option:selected').text() : "All";

                countryCode = countryCode.replace('-','_');
                serviceVal = serviceVal.replace(/\s/g, "+");
                industryVal = industryVal.replace(/\s/g, "+");

                var partnerQuery = allPartnersQuery
                    .replace(/<collectionName>/g, countryCode)
                    .replace(/<Service>/g, serviceVal)
                    .replace(/<Industry>/g, industryVal);

                var query = protocol+"//"+domain + searchpath + partnerQuery;

                window.open(query,'_blank');
            });

            searchBtn.on('click', function(event) {
                event.preventDefault();
                if (searchBtn.hasClass('ctaDisabled')) {
                    return false;
                } else {
                    var countryCode=$('option:selected', '.countrydd').val();
                    var serviceIDParam = serviceDDVal.length > 0 ? "sl-service-id-local:"+ serviceDDVal:"";
                    var industryIDParam= industryDDVal.length > 0 ? "sl-industry-id-local:"+ industryDDVal:"";
                    var countryCodeParam ="contactCountry:"+$('option:selected', '.countrydd').attr('data-countrycode')+"";
                    if(serviceDDVal.length > 0 && industryDDVal.length > 0){
                        serviceIDParam=serviceIDParam+"+AND+";
                    }
                    $.ajax({
                        method: "GET",
                        url: solrUrl+countryCode.replace('-','_')+'/select?q='+serviceIDParam+industryIDParam+'&fq=templatepath:"'+templateUrl+'"&fq=-hideInpartnerlocation:[%22true%22%20TO%20*]&sort=contactLastName+asc&df=templatepath&wt=xslt&tr=contactcarousal.xsl&start=0&rows=20'
                        //url:"/solr/al_en/select?q=*%3A*&fq=templatepath%3A%22%2Fapps%2Fkpmgpublic%2Ftemplates%2Fcontact-details-template%22&df=templatepath&wt=xslt&tr=contactcarousal.xsl",
                    }).done(function (data) {
                        handlePartnerResultdata(data);
                    }).fail(function (err) {
                        console.log(err);
                    });
                }
            });

            function handlePartnerResultdata(data){
                $('.resultsContainer .partner-item',elem).remove();

                if(data.relatedContacts.results.length>0){
                    //$('.resultsContainer').show();
                    $('.defaultDescription,.defaultImageContainer',elem).hide();
                    $('.no-results',elem).hide();


                    $('.resultsContainer',elem).append(partnerResultsPartial(
                    {
                        results:sortResults(data.relatedContacts.results),
                        localePath:'/'+countryDDVal.replace('-','/') + '/'+contactFormUrl
                    }));

                    if(window.kpmg.isMobile){
                        $('.resultsContainer div.partner-item:lt('+5+')',elem).show();
                    }
                    totalResults=$('.partner-item',elem).length;
                }else{
                    $('.no-results',elem).show();
                    $('.defaultDescription',elem).hide();
                    $('.defaultImageContainer', elem).show();
                }
                $('.searchallcontact',elem).show();
            }


            function sortResults(data){
                console.log(data);
                data.sort(function(a, b) {
                    if (a.contactLastName < b.contactLastName) {
                        return -1;
                    } else if (a.contactLastName > b.contactLastName) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                return data;
            }

            $(document).trigger('template.loaded');
        };

        return Partnerlocator;
    }
);
