import { createStackNavigator } from "react-navigation";
import Login from "./views/Login";

const UnauthorizedScreens = createStackNavigator(
    {
        Login
    }, {
        initialRouteName: "Login"
    }
)

export default UnauthorizedScreens;