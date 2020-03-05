//AuthNavigation.js
import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'

const AuthNavigation = createStackNavigator(
    {
        Login: { screen: LoginScreen },
        Signup: { screen: SignupScreen }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
);

export default AuthNavigation
