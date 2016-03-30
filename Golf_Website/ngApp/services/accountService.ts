namespace MyApp.Services {

    export class AccountService {

        // Store access token and claims in browser session storage
        storeUserInfo(userInfo) {
            // store auth token
            
            this.$window.sessionStorage.setItem('token', userInfo.access_token);
            this.$window.sessionStorage.setItem('userName', userInfo.userName);
            this.$window.sessionStorage.setItem('userId', userInfo.userId);
            // store claims
            for (let prop in userInfo) {
                if (prop.indexOf('claim_') == 0) {
                    this.$window.sessionStorage.setItem(prop, userInfo[prop]);
                }
            }
        }

        getClaim(type) {
            return this.$window.sessionStorage.getItem('claim_' + type);
        }

        getUserName() {
            return this.$window.sessionStorage.getItem('userName');
        }        

        login(loginUser) {
            return this.$q((resolve, reject) => {
                let data = "grant_type=password&username=" + loginUser.userName + "&password=" + loginUser.password;
                this.$http.post('/Token', data,
                    {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success((result) => {
                        this.storeUserInfo(result);
                        // redirect to home
                        resolve();
                    }).error((result) => {
                        reject(result);
                    });
            });
        }

        register(userLogin) {
            return this.$q((resolve, reject) => {
                this.$http.post('/api/account/register', userLogin)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((result) => {
                        // flatten error messages
                        let messages = [];
                        for (let prop in result.data.modelState) {
                            messages = messages.concat(result.data.modelState[prop]);
                        }
                        reject(messages);
                    });
            });
        }



        logout() {
            // clear all of session storage (including claims)
            this.$window.sessionStorage.clear();
        }

        isLoggedIn() {
            return this.$window.sessionStorage.getItem('token');
        }

        // associate external login (e.g., Twitter) with local user account 
        registerExternal(email, token) {
            return this.$q((resolve, reject) => {
                this.$http.post('/api/account/registerExternal', { email: email }, { headers: { Authorization: 'Bearer ' + token } })
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((result) => {
                        // flatten error messages
                        let messages = [];
                        for (let prop in result.data.modelState) {
                            messages = messages.concat(result.data.modelState[prop]);
                        }
                        reject(messages);
                    });
            });
        }

        // get email, registration status, and provider for current user 
        getUserInfo(externalAccessToken) {
            return this.$q((resolve, reject) => {
                this.$http.get('/api/account/userinfo', { headers: { Authorization: 'Bearer ' + externalAccessToken } })
                    .then((result) => {
                        resolve(result.data);
                    })
                    .catch((result) => {
                        // flatten error messages
                        let messages = [];
                        for (let prop in result.data.modelState) {
                            messages = messages.concat(result.data.modelState[prop]);
                        }
                        return messages;
                    });
            });
        }

        getExternalLogins(): ng.IPromise<{}> {
            return this.$q((resolve, reject) => {
                let url = `api/Account/ExternalLogins?returnUrl=%2FexternalLogin&generateState=true`;
                this.$http.get(url).then((result: any) => {
                    resolve(result.data);
                }).catch((result) => {
                    reject(result);
                });
            });
        }


        confirmEmail(userId, code): ng.IPromise<{}> {
            return this.$q((resolve, reject) => {
                let data = {
                    userId: userId,
                    code: code
                };
                this.$http.post('/api/account/confirmEmail', data).then((result: any) => {
                    resolve(result.data);
                }).catch((result) => {
                    reject(result);
                });
            });
        }


        // extract access token from response
        parseOAuthResponse(token) {
            let results = {};
            token.split('&').forEach((item) => {
                let pair = item.split('=');
                results[pair[0]] = pair[1];
            });
            return results;
        }

        constructor
        (
            private $q: ng.IQService,
            private $http: ng.IHttpService,
            private $window: ng.IWindowService,
            private $resource: ng.resource.IResourceService
        ) { }

    }

    angular.module('MyApp').service('accountService', AccountService);
}