import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import DashBoard from '../screens/DashBoard';
import CreateNewMember from '../screens/CreateNewMember';
import RegisteredScreen from '../screens/RegisteredScreen';
import DetailScreen from '../screens/DetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserRegisterScreen from '../screens/UserRegisterScreen';

const Stack = createNativeStackNavigator();

const Auth = () => {
  // Stack Navigator for Login Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="RegisterScreen"
        component={UserRegisterScreen}
        options={{headerShown:false}}
        // options={{
        //   title: "Register", //Set Header Title
        //   headerStyle: {
        //     backgroundColor: "#307ecc", //Set Header color
        //   },
        //   headerTintColor: "#fff", //Set Header text color
        //   headerTitleStyle: {
        //     fontWeight: "bold", //Set Header text style
        //   },
        // }}
      /> */}
    </Stack.Navigator>
  );
};

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Dashboard" component={DashBoard} />
        <Stack.Screen name="CreateNewMember" component={CreateNewMember} />
        <Stack.Screen name="RegisteredScreen" component={RegisteredScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;

const styles = StyleSheet.create({});
