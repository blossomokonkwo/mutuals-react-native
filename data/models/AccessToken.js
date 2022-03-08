class AccessToken {
    constructor(accessExpiresAt, access, csrf) {
        this.accessExpiresAt = accessExpiresAt;
        this.access = access;
        this.csrf = csrf;
    }
}

export default AccessToken;