import { createStackNavigator } from "react-navigation";
import Login from "./views/Login";
import Home from "./views/authorized/Home";

export const UnauthorizedScreens = createStackNavigator(
    {
        Login
    }, {
        initialRouteName: "Login"
    }
);

export const AuthorizedScreens = createStackNavigator(
    {
        Home
    },{
        initialRouteName: "Home"
    }
);
