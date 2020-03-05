import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../screens/HomeScreen'
import PromoScreen from '../screens/PromoScreen'
import MyPromosScreen from "../screens/MyPromosScreen";

const AppNavigation = createBottomTabNavigator(
    {
        'Mes Promos': MyPromosScreen,
        "Accueil" : HomeScreen,
        'Promo en Cours': PromoScreen,
    },
    {
        initialRouteName: 'Accueil',
        headerMode: 'none',
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Accueil') iconName ='md-home';
                if (routeName === 'Promo en Cours') iconName = 'md-pricetags';
                if (routeName === 'Mes Promos') iconName = 'md-bookmarks';

                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'darkseagreen',
            inactiveTintColor: 'darkgray',
        }
    }
);

export default AppNavigation
