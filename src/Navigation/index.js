import React from "react";
import { BaseNavigationContainer, NavigationContainer, TabActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Welcome from "../Screens/Welcome";
import Search from "../Screens/Search";
import Saved from "../Screens/Saved";
import Home from "../Screens/Home";
import OneMovie from "../Screens/OneMovie";
import Ionicons from 'react-native-vector-icons/Ionicons'



const Stack =createNativeStackNavigator();
const Tab =createBottomTabNavigator();

export default function Navigation() {
    function HomeStack(){
        return(
            <Stack.Navigator screenOptions={{
                headerShown:false,
            }}
            initialRouteName="Welcome"
            >
                <Stack.Screen name="Home" component={HomeTabs} ></Stack.Screen>
                <Stack.Screen name="Welcome" component={Welcome} ></Stack.Screen>
                <Stack.Screen name="OneMovie" component={OneMovie}  ></Stack.Screen>


            </Stack.Navigator>
        )
    }
    function HomeTabs(){
        return(
            <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: 'red',
              tabBarActiveBackgroundColor:"white",

              tabBarStyle: { backgroundColor: 'black' }, // Set background color of the tab bar to black
            }}>
                <Tab.Screen name="HomeScreen" component={Home} options={{
                    tabBarIcon: () => <Ionicons name="home-outline" color="red" size={30} />,
                }} />
                <Tab.Screen name="Search" component={Search} options={{
                    tabBarIcon: () => <Ionicons name="search-outline" color="red" size={30} />,
                }} />
                <Tab.Screen name="Saved" component={Saved} options={{
                    tabBarIcon: () => <Ionicons name="bookmark-outline" color="red" size={30} />,
                }} />
            </Tab.Navigator>
    )}

    return (
        <NavigationContainer>
            <HomeStack></HomeStack>
        </NavigationContainer>
        
    )
}