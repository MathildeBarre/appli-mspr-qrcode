import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import AuthNavigation from './AuthNavigation'
import AppNavigation from "./AppNavigation";
import AdminNavigation from "./AdminNavigation";


const SwitchNavigator = createSwitchNavigator(
    {
        Auth: AuthNavigation,
        App: AppNavigation,
        Admin: AdminNavigation
    },
    {
        initialRouteName: 'Auth'
    }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer
