class SettingsKeys {
    static user_id = new SettingsKeys("user_id");
    static uuid = new SettingsKeys("uuid");
    static completed_onboarding = new SettingsKeys("completed_onboarding");
    static saw_onboarding = new SettingsKeys("saw_onboarding");
    static access_expires_at = new SettingsKeys("access_expires_at");
    static csrf = new SettingsKeys("csrf");
    constructor(rawValue) {
        this.rawValue = rawValue;
    }
};
export default SettingsKeys;