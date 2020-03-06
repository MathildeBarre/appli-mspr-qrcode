import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import CreatePromoScreen from '../screens/CreatePromoScreen'
import PromoScreen from '../screens/PromoScreen'

const AdminNavigation = createBottomTabNavigator(
    {
        'Promos en Cours': PromoScreen,
        "Créer une Promo": CreatePromoScreen,
    },
    {
        initialRouteName: 'Promos en Cours',
        headerMode: 'none',
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Promos en Cours') iconName = 'md-pricetags';
                if (routeName === 'Créer une Promo') iconName = 'md-add-circle';

                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'darkseagreen',
            inactiveTintColor: 'darkgray',
        }
    }
);

export default AdminNavigation