import React from 'react';
import * as Keychain from 'react-native-keychain';
import MainTabBar from './components/MainTabBar.js';
import { productionDomain } from './networking/api_variables.js';
import SplashScreen from './components/SplashScreen.js';
import { Settings } from "react-native";
import { UserAuthContext } from './context';
import LoginOrSignUp from './components/LoginOrSignUp.js';
import OnboardNavStack from './components/OnboardNavStack.js';



const App = () => {
  const initialState = { isLoading: true, isSignOut: true, userToken: null, completedOnboarding: Settings.get('completed_onboarding') };
  const [state, dispatch] = React.useReducer((prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
          completedOnboarding: true
        }
        break;
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignOut: false,
          userToken: action.token,
          completedOnboarding: true,
          isLoading: false
        }
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignOut: true,
          userToken: null,
          isLoading: false,
        }
        break;
      default:
        break;
    }
  }, initialState);

  React.useEffect(() => {
    const fetchToken = async () => {
      let userToken;
      try {
        userToken = await Keychain.getInternetCredentials(productionDomain);
      } catch (error) {
        // Restoring token failed
        dispatch({ type: 'SIGN_OUT' })
      }
      if (userToken) {
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      } else if (Settings.get("completed_onboarding")) {
        dispatch({ type: 'SIGN_OUT', completedOnboarding: true })
      } else {
        dispatch({ type: 'SIGN_OUT' })
      }
    };
    fetchToken();
  }, []);

  if (state.isLoading) {
    return <SplashScreen></SplashScreen>
  } else {
    return (
      <UserAuthContext.Provider value={dispatch}>
        {
          state.userToken ? (
            <MainTabBar />
          )
            :
            (
              // state.completedOnboarding ? (
              //   <LoginOrSignUp></LoginOrSignUp>
              // )
              //   :
              // (
              <OnboardNavStack />
              // )

            )
        }
      </UserAuthContext.Provider >
    );
  }
};

export default App;

