define([], function(){
    return {
        setupPersonalizationObject: setupPersonalizationObject
    };

    function setupPersonalizationObject(ctx, payload) {
        var promise;
        promise = new Promise(promiseFn);
        return promise;
        // private functions
        function promiseFn(resolve, reject) {
            setUserLoggedInBoolean()
                .then(setUserAccountInfoObject)
                .then(setLinksJSON)
                .then(setPrivacyAcceptanceBoolean)
                .then(setSNPResults)
                .then(setPreferencesCountObject)
                .then(resolve);
        }
        //
        function setUserLoggedInBoolean() {
            var promise;
            promise = new Promise(promiseFn);
            return promise;
            // private functions
            function promiseFn(resolve, reject) {
                require(['personalizationUtils'], function(p13n) {
                    var isUserLoggedIn;
                    isUserLoggedIn = p13n.accountUtils.isLoggedIn() || false;
                    //
                    ctx.commit('SET_IS_USER_LOGGED_IN', isUserLoggedIn);
                    resolve();
                });
            }
        }

        function setUserAccountInfoObject() {
            var promise;
            promise = new Promise(promiseFn);
            return promise;
            //
            function promiseFn(resolve, reject) {
                var isUserLoggedIn;
                isUserLoggedIn = ctx.state.personalizationUtils.isUserLoggedIn;
                //
                if(isUserLoggedIn) {
                    require(['personalizationUtils'], function(p13n){
                        var accountInfo;
                        accountInfo = p13n.accountUtils.getInfo();
                        //
                        ctx.commit('SET_ACCOUNT_INFO', accountInfo);
                        resolve();
                    });
                } else {
                    resolve();
                }
            }
        }

        function setLinksJSON() {
            var promise;
            promise = new Promise(promiseFn);
            return promise;
            // private functions
            function promiseFn(resolve, reject) {
                var isUserLoggedIn, isSitePersonalized;
                isUserLoggedIn = ctx.state.personalizationUtils.isUserLoggedIn;
                isSitePersonalized = ctx.rootState.data.siteInfo.isPersonalized;
                //
                if(isUserLoggedIn || isSitePersonalized) {
                    require(['personalizationUtils'], function(p13n) {
                        p13n.myKpmgFlyoutUtils.getLinksJson()
                            .done(function(linksJSON){
                                if (linksJSON) {
                                    ctx.commit('SET_LINKS_JSON', linksJSON);
                                }
                                resolve();
                            });
                    });
                } else {
                    resolve();
                }
            }
        }

        function setPrivacyAcceptanceBoolean() {
            var promise;
            promise = new Promise(promiseFn);
            return promise;
            //
            function promiseFn(resolve, reject) {
                require(['personalizationUtils'], function(p13n){
                    var privacyPolicyAccepted;
                    privacyPolicyAccepted = p13n.privacyUtils.isAccepted() || false;
                    //
                    ctx.commit('SET_PRIVACY_POLICY_ACCEPTED_BOOLEAN', privacyPolicyAccepted);
                    //
                    resolve();
                });
            }
        }

        function setSNPResults() {
            var promise;
            promise = new Promise(promiseFn);
            return promise;
            // private functions
            function promiseFn(resolve, reject) {
                var hasUserAcceptedPrivacyPolicy, isSitePersonalized, hasDBData;
                //
                isSitePersonalized = ctx.rootState.data.siteInfo.isPersonalized;
                hasUserAcceptedPrivacyPolicy = ctx.state.personalizationUtils.privacyPolicyAccepted;
                //
                hasDBData = window.kpmgPersonalize && window.kpmgPersonalize.db && window.kpmgPersonalize.db.data;

                if (isSitePersonalized && hasUserAcceptedPrivacyPolicy && hasDBData) {
                  require(['personalization'], function(p13n){
                        p13n.getZthesIDs()
                        .then(function(zthesIds){
                            p13n.getSnPResults(zthesIds)
                                .then(function(snpResults){
                                    snpResults["personalized-results"].resultset.results.result.splice(0,$('[personalize="true"]').length);
                                    ctx.commit('SET_SNP_RESULTS_OBJECT', snpResults);
                                    resolve();
                                  })
                                .fail(function() {
                                  console.log(arguments);
                                });
                        })
                        .fail(function(){
                          console.log(arguments)
                        })
                    });
                } else {
                    resolve();
                }
            }
        }

        function setPreferencesCountObject() {
            var promise;
            promise = new Promise(promiseFn);
            return promise;
            // private functions
            function promiseFn(resolve, reject){
                var isUserLoggedIn;
                //
                isUserLoggedIn = ctx.state.personalizationUtils.isUserLoggedIn;
                if(isUserLoggedIn) {
                    require(['personalizationUtils'], function(p13n){
                        var preferencesCount;
                        preferencesCount = p13n.accountUtils.getPreferencesCount();
                        ctx.commit('SET_PREFERENCES_COUNT', preferencesCount);
                        resolve();
                    });
                } else {
                    resolve();
                }
            }
        }
    }
});
