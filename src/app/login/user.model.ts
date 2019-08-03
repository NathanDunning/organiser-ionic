export class User {
    constructor (
        public id: string,
        public email: string,
        private _token: string,
        private tokenExpiration: Date
    ) {}

    get token() {
        if (!this.tokenExpiration || this.tokenExpiration <= new Date()) {
            return null;
        } else {
            return this._token;
        }
    }
}