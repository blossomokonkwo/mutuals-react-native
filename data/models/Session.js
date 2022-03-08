class Session {
    static NewlyDownloaded = new Session("newlydownloaded");
    static SignedIn = new Session("signedIn");
    static SignedOut = new Session("signedOut");
    static Onboarding = new Session("onboarding");

    constructor(rawValue) {
        this.rawValue = rawValue;
    }
}
export default Session;