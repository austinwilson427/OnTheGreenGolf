var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var AccountService = (function () {
            function AccountService($q, $http, $window, $resource) {
                this.$q = $q;
                this.$http = $http;
                this.$window = $window;
                this.$resource = $resource;
            }
            // Store access token and claims in browser session storage
            AccountService.prototype.storeUserInfo = function (userInfo) {
                // store auth token
                this.$window.sessionStorage.setItem('token', userInfo.access_token);
                this.$window.sessionStorage.setItem('userName', userInfo.userName);
                this.$window.sessionStorage.setItem('userId', userInfo.userId);
                // store claims
                for (var prop in userInfo) {
                    if (prop.indexOf('claim_') == 0) {
                        this.$window.sessionStorage.setItem(prop, userInfo[prop]);
                    }
                }
            };
            AccountService.prototype.getClaim = function (type) {
                return this.$window.sessionStorage.getItem('claim_' + type);
            };
            AccountService.prototype.getUserName = function () {
                return this.$window.sessionStorage.getItem('userName');
            };
            AccountService.prototype.login = function (loginUser) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    var data = "grant_type=password&username=" + loginUser.userName + "&password=" + loginUser.password;
                    _this.$http.post('/Token', data, {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function (result) {
                        _this.storeUserInfo(result);
                        // redirect to home
                        resolve();
                    }).error(function (result) {
                        reject(result);
                    });
                });
            };
            AccountService.prototype.register = function (userLogin) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    _this.$http.post('/api/account/register', userLogin)
                        .then(function (result) {
                        resolve(result);
                    })
                        .catch(function (result) {
                        // flatten error messages
                        var messages = [];
                        for (var prop in result.data.modelState) {
                            messages = messages.concat(result.data.modelState[prop]);
                        }
                        reject(messages);
                    });
                });
            };
            AccountService.prototype.logout = function () {
                // clear all of session storage (including claims)
                this.$window.sessionStorage.clear();
            };
            AccountService.prototype.isLoggedIn = function () {
                return this.$window.sessionStorage.getItem('token');
            };
            // associate external login (e.g., Twitter) with local user account 
            AccountService.prototype.registerExternal = function (email, token) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    _this.$http.post('/api/account/registerExternal', { email: email }, { headers: { Authorization: 'Bearer ' + token } })
                        .then(function (result) {
                        resolve(result);
                    })
                        .catch(function (result) {
                        // flatten error messages
                        var messages = [];
                        for (var prop in result.data.modelState) {
                            messages = messages.concat(result.data.modelState[prop]);
                        }
                        reject(messages);
                    });
                });
            };
            // get email, registration status, and provider for current user 
            AccountService.prototype.getUserInfo = function (externalAccessToken) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    _this.$http.get('/api/account/userinfo', { headers: { Authorization: 'Bearer ' + externalAccessToken } })
                        .then(function (result) {
                        resolve(result.data);
                    })
                        .catch(function (result) {
                        // flatten error messages
                        var messages = [];
                        for (var prop in result.data.modelState) {
                            messages = messages.concat(result.data.modelState[prop]);
                        }
                        return messages;
                    });
                });
            };
            AccountService.prototype.getExternalLogins = function () {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    var url = "api/Account/ExternalLogins?returnUrl=%2FexternalLogin&generateState=true";
                    _this.$http.get(url).then(function (result) {
                        resolve(result.data);
                    }).catch(function (result) {
                        reject(result);
                    });
                });
            };
            AccountService.prototype.confirmEmail = function (userId, code) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    var data = {
                        userId: userId,
                        code: code
                    };
                    _this.$http.post('/api/account/confirmEmail', data).then(function (result) {
                        resolve(result.data);
                    }).catch(function (result) {
                        reject(result);
                    });
                });
            };
            // extract access token from response
            AccountService.prototype.parseOAuthResponse = function (token) {
                var results = {};
                token.split('&').forEach(function (item) {
                    var pair = item.split('=');
                    results[pair[0]] = pair[1];
                });
                return results;
            };
            return AccountService;
        })();
        Services.AccountService = AccountService;
        angular.module('MyApp').service('accountService', AccountService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=accountService.js.map