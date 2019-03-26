define(['jquery', 'cqservice', 'handlebars', 'precompile', 'helpers', 'tracking'],
function($, Service, Handlebars, PrecompiledHandlebars, Helpers, Tracking) {
    'use strict';

    var CaaSDocumentSearchResults = function(elem) {

        var searchResultsModel = {
            results: {},
            pagination: {},
            totalResults: {}
        };
        var caasResultsTemp = 'caasResultSet',
        caasResultsPanel = $('#caasResultSet > div > div > div.modal-body > div.results-found > ul'),
        caasPaginator = $('#caasResultSet .caas-pagination'),
        caasResultList = {
            resultsTemplate: PrecompiledHandlebars[caasResultsTemp],
            currentPage: 1,
            recordSize: 9,
            totalPages: 0
        },
        overlaySearchClick = false,
        searchQuery = $('.module-caasdocumentsearchresults').attr('data-searchurl'),
        defaultResultsPerPage = parseInt( $('.module-caasdocumentsearchresults').attr('data-rows') ),
        caasSearchQuery,
        paginatorClicked = false,
        totalSearchResults = 0;

        // function to show pagination based on number of results
        function generatePagination(current, total) {
            var i, pageNumber=1;
            for( i=total; i>0; i=i-current) {
                caasPaginator.append('<li><a class="page-number" href="#">'+pageNumber+'</a></li>');
                pageNumber++;
            }
            caasPaginator.find('li:first>a').addClass("active");
        }

        // regenerating list of results and footer elements
        function regenerateCaaSResultsList() {
            var currentResultsCount = searchResultsModel.results.length;
            var resultsPerPage = defaultResultsPerPage;
            if( currentResultsCount < resultsPerPage ) {
                resultsPerPage = currentResultsCount;
                $('.pagination-container .next-btn').hide();
            }
            // generating results per page
            var i;
            for( i=0; i<resultsPerPage; i++) {
                caasResultsPanel.append(caasResultList.resultsTemplate(searchResultsModel.results[i]));
            }
            $('.total-results').text(totalSearchResults);
            if( !paginatorClicked ) {
                if( totalSearchResults < resultsPerPage || totalSearchResults === resultsPerPage) {
                    $('.upper-limit').text(totalSearchResults);
                }
                else {
                    $('.upper-limit').text(resultsPerPage);
                }
                caasPaginator.empty(); // start freshly for each result set
                generatePagination(resultsPerPage, totalSearchResults);
            }
        }

        // handle resluts from Ajax call
        function handleCaaSResultsList() {
            searchResultsModel.results = window.KPMG.searchResults.CaaSDocumentation.results;
            caasResultsPanel.empty(); // always fresh start
            if (searchResultsModel.results[0]) {
                $(".no-results-found").hide();
                $('.pagination-container').show();
                $(".resultsContainer").removeClass("search-noResults");
                regenerateCaaSResultsList();
            }
            else {
                $('.pagination-container').hide();
                $(".no-results-found").show();
                $('.search-term').text('\"' + $('#caasOverlayInputBtn').val() + '\"');
            }
            // showing results overlay after all compiled successfully
            showSearchOverlay();
        }

        // showing overlay and respective animations
        function showSearchOverlay() {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            $('#caasResultSet').bs3modal({
                show: true,
                backdrop: 'static',
                keyboard: false
            });
        }

        // sending request and getting results
        function fetchCaaSDocumentResults(data) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if(this.status === 200) {
                        //success
                        window.KPMG = window.KPMG || {};
                        window.KPMG.searchResults = JSON.parse(this.responseText);
                        totalSearchResults = window.KPMG.searchResults.CaaSDocumentation.totalRecords;
                        handleCaaSResultsList();
                        window.KPMG.searchParams = {
                            param: data
                        };

                        //To handle when S&P call is taking time
                        var event = new CustomEvent("searchResultsPrioritize");
                        document.dispatchEvent(event);
                    }
                }
            };
            xhttp.open("GET", data, true);
            xhttp.send();
        }

        function generateSearchQuery() {
            var searchInput = $('.module-caasdocumentsearchresults').find('.search').val().replace(/[^a-zA-Z ]/g, "");
            $('#caasOverlayInputBtn').val(searchInput);
            return searchQuery.replace('<SearchText>', searchInput);
        }

        function generateSearchQueryForOverlay() {
            // user types new word on overlay
            var newSearchInput = $('#caasOverlayInputBtn').val().replace(/[^a-zA-Z ]/g, "");
            $('.module-caasdocumentsearchresults').find('.search').val(newSearchInput);
            $('#caasOverlayInputBtn').val(newSearchInput);
            return searchQuery.replace('<SearchText>', newSearchInput);
        }

        //handling search results on click of enter and search button
        function searchCaaSDocument(){
            if( !overlaySearchClick ) {
                caasSearchQuery = generateSearchQuery();
            }
            else {
                caasSearchQuery = generateSearchQueryForOverlay();
            }
            fetchCaaSDocumentResults(caasSearchQuery);
        }

        // generating new query and fetching results after next button click
        function generateNextBtnSearchQuery(){
            // finding start value ans index
            var startIndex = parseInt(caasSearchQuery.indexOf("start") + 6),
                startValue = parseInt( parseInt(caasSearchQuery.slice(startIndex)) + defaultResultsPerPage );

            // replacing start value and generating new query to fetch results
            var tempSearchQuery = caasSearchQuery.slice(0,startIndex);
            caasSearchQuery = tempSearchQuery + startValue;

            // changing upper and lower limits based on click
            $('.results-shower span:nth-child(1)').text(startValue + 1);
            var upperLimit = startValue + defaultResultsPerPage;
            if( upperLimit > totalSearchResults ) {
                upperLimit = totalSearchResults;
                $('.pagination-container .next-btn').hide();
            }
            $('.upper-limit').text(upperLimit);
        }

        // handling active page after next button click
        function handleModalFooterSection(){
            caasPaginator.find("li>a").each(function() {
                if( $(this).hasClass('active') ) {
                    $(this).removeClass('active');
                    $(this).parent().next().find('a').addClass('active');
                    return false;
                }
            });
        }

        // generating page specific query and respective results
        function generatePageSpecificSearchQuery(pageNumber) {
            var startIndex = parseInt( caasSearchQuery.indexOf("start") + 6 ),
                tempSearchQuery = caasSearchQuery.slice(0,startIndex),
                currentPage = parseInt(pageNumber - 1);
            currentPage = parseInt(defaultResultsPerPage * currentPage);
            caasSearchQuery = tempSearchQuery + currentPage;
            // changing upper and lower limits based on click
            $('.results-shower span:nth-child(1)').text(currentPage + 1);
            var upperValue = currentPage + defaultResultsPerPage;
            if( upperValue > totalSearchResults ) {
                upperValue = totalSearchResults;
                $('.pagination-container .next-btn').hide();
            }
            $('.upper-limit').text(upperValue);
        }

        // handling page numbers click
        $('#caasResultSet').on('click',  '.page-number', function(){
            paginatorClicked = true;
            caasPaginator.find("li>a").each(function() {
                if( $(this).hasClass('active') ) {
                    $(this).removeClass('active');
                }
            });
            $(this).addClass('active');
            // hide next button if its last page
            if( $(this).parent().is(':last-child') ) {
                $('.pagination-container .next-btn').hide();
            }
            else {
                $('.pagination-container .next-btn').show();
            }
            generatePageSpecificSearchQuery($(this).text());
            fetchCaaSDocumentResults(caasSearchQuery);
        });

        // handling next button click
        $('.pagination-container .next-btn').on('click', function(){
            paginatorClicked = true;
            generateNextBtnSearchQuery();
            fetchCaaSDocumentResults(caasSearchQuery);
            handleModalFooterSection();
        });

        // on click of enter key search
        $('.module-caasdocumentsearchresults').on('keypress', function(event) {
            var inputKey = $(this).find('input').val().replace(/[^a-zA-Z ]/g, "");
            if( event.which === 13 && inputKey ) {
                overlaySearchClick = false;
                paginatorClicked = false;
                $('.pagination-container .next-btn').show();
                $('.results-shower span:nth-child(1)').text(1);
                // get results and show overlay
                searchCaaSDocument();
            }
        });

        // on click of search button
        $('.module-caasdocumentsearchresults .submitSearch').on('click', function() {
            var inputKey = $('.module-caasdocumentsearchresults').find('input').val().replace(/[^a-zA-Z ]/g, "");
            if( inputKey ) {
                overlaySearchClick = false;
                paginatorClicked = false;
                $('.pagination-container .next-btn').show();
                $('.results-shower span:nth-child(1)').text(1);
                // get results and show overlay
                searchCaaSDocument();
            }
        });

        // on click of enter key search on overlay
        $('#caasResultSet #caasOverlayInputBtn').on('keypress',  function(event) {
            var inputKey = $('#caasResultSet').find('input').val().replace(/[^a-zA-Z ]/g, "");
            if(event.which === 13 && inputKey ) {
                overlaySearchClick = true;
                paginatorClicked = false;
                $('.pagination-container .next-btn').show();
                $('.results-shower span:nth-child(1)').text(1);
                // get results and show overlay
                searchCaaSDocument();
            }
        });

        // on click of search button from overlay
        $('#caasResultSet .submit-overlay-search').on('click', function() {
            var inputKey = $('#caasResultSet').find('input').val().replace(/[^a-zA-Z ]/g, "");
            if( inputKey ) {
                overlaySearchClick = true;
                paginatorClicked = false;
                $('.pagination-container .next-btn').show();
                $('.results-shower span:nth-child(1)').text(1);
                // get results and show overlay
                searchCaaSDocument();
            }
        });

        //hiding search overlay on click of escape
        $(document).on('keydown', function(event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if ( keycode === 27 ) {
                $('#caasResultSet').bs3modal('hide');
            }
        });

        // Keep the following lines at the bottom of the Caasdocumentsearchresults function
        var trck = new Tracking(elem, 'CaaSDocumentSearchResults');
        $(document).trigger('template.loaded');
    };

    return CaaSDocumentSearchResults;
});
