import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import AddressScreen from '../screens/AddressScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import OrderScreen from '../screens/OrderScreen';
import SplashScreen from '../screens/SplashScreen';


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const BottomTabs = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen 
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: { color: '#008E97' },
          headerShown: false,
          tabBarIcon: ({focused}) => 
          focused 
          ? (<Entypo name="home" size={24} color="#008E97" />) 
          : (<AntDesign name="home" size={24} color="black" />) 
        }}
        />
        <Tab.Screen 
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: { color: '#008E97' },
          headerShown: false,
          tabBarIcon: ({focused}) => 
          focused 
          ? (<Ionicons name="person" size={24} color="#008E97" />) 
          : (<Ionicons name="person-outline" size={24} color="black" />) 
        }}
        />
        <Tab.Screen 
        name='Cart'
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarLabelStyle: { color: '#008E97' },
          headerShown: false,
          tabBarIcon: ({focused}) => 
          focused 
          ? (<Ionicons name="cart" size={24} color="#008E97" />) 
          : (<Ionicons name="cart-outline" size={24} color="black" />) 
        }}
        />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' component={LoginScreen}/>
            <Stack.Screen name='SplashScreen' component={SplashScreen}/>
            <Stack.Screen name='Register' component={RegisterScreen}/>
            <Stack.Screen name='Main' component={BottomTabs}/>
            <Stack.Screen name='ProductInfoScreen' component={ProductInfoScreen}/>
            <Stack.Screen name='AddAddressScreen' component={AddAddressScreen}/>
            <Stack.Screen name='AddressScreen' component={AddressScreen}/>
            <Stack.Screen name='ConfirmationScreen' component={ConfirmationScreen}/>
            <Stack.Screen name='OrderScreen' component={OrderScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
};

export default StackNavigator;

const styles = StyleSheet.create({});