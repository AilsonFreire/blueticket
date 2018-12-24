import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import Login from "./views/Login";
import Home from "./views/authorized/Home";
import Logout from "./views/authorized/Logout";


export const UnauthorizedScreens = createStackNavigator(
    {
        Login,
    }, {
        initialRouteName: "Login"
    }
);

export const AuthorizedScreens = createStackNavigator(
    {
        Home,
        Logout,
    },{
        initialRouteName: "Home"
    }
);

export const createRootNavigator = (signedIn = false) => {
    return createSwitchNavigator(
      {
        SignedIn: {
          screen: AuthorizedScreens
        },
        SignedOut: {
          screen: UnauthorizedScreens
        }
      },
      {
        initialRouteName: signedIn ? "SignedIn" : "SignedOut"
      }
    );
  };