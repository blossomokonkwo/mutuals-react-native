
import * as Keychain from 'react-native-keychain';
import { productionDomain } from '../../networking/api_variables';
import { Settings} from "react-native";
import SettingsKeys from '../../util/settings/SettingsKeys';
import AccessToken from './AccessToken';
import Session from './Session';
class CurrentUser {
    constructor(session, id, accessToken){
        this.session = session;
        this.id = id;
        this.accessToken = accessToken;
    }

    static async current() {
        try {
            const credential = await Keychain.getInternetCredentials(productionDomain);
            const access = credential.password;
            const id = Settings.get(SettingsKeys.user_id.rawValue);
            const accessExpiresAt = Settings.get(SettingsKeys.access_expires_at.rawValue);
            const token = new AccessToken(accessExpiresAt, access);
            if(id && credential) {
                const finishedOnboarding = Settings.get(SettingsKeys.finishedOnboarding) ? true : false;
                return new CurrentUser(finishedOnboarding ? Session.SignedIn : Session.Onboarding, id, token)
            } else if(!Settings.get(SettingsKeys.saw_onboarding.rawValue)) {
                return new CurrentUser(Session.NewlyDownloaded);
            } else {
                return new CurrentUser(Session.SignedOut);
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}



export default CurrentUser;