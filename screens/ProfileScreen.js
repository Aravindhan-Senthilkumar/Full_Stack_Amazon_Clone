import { StyleSheet, Text, View,Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { UserType } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const {userId,setUserId} = useContext(UserType)
  const [user,setUser] = useState([]);
  const [orders,setOrders] = useState([]);
  const [loading,setLoading] = useState(true);
  const navigation = useNavigation();
  const [orderArray,setOrderArray] = useState([]);
  
  const productArray = () => {
    if(orders.length > 0){
      const products = orders.reduce((prev,curr) => {
        return [...prev,...curr.products]
      },[])
      setOrderArray(products)
    }
  }

  useEffect(() => {
    productArray();
  }, [orders]);

  useEffect(() => {
    const fetchOrders = async () => {
      try{
        const response = await axios.get(`https://amazon-clone-server-cnk1.onrender.com/orders/${userId}`)
        const orders = response.data.orders
        setOrders(orders);
        setLoading(false);
      }catch(error){
        console.log("Error finding orders",error);
      }
    } 
    fetchOrders();
  },[])
  useEffect(() => {
    const fetchProfile = async () => {
      try{
        const response = await axios.get(`https://amazon-clone-server-cnk1.onrender.com/profile/${userId}`)
        const user = response.data.user
        setUser(user);
      }catch(error){
        console.log("Profile not found",error)
      }
    }
    fetchProfile();
  },[]);
  
  const logout = () => {
    clearAuthToken();
  }

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("Auth token cleared");
    navigation.replace("Login");
  }
  
  return (
    <View style={{ flex:1,backgroundColor:'#fff' }}>

      {/* Header */}
      <View style={{ backgroundColor:'#00CED1',height:85  }}>
      <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          }}
        />
        <View style={{ flexDirection:'row',paddingHorizontal:10,gap:10 }}>
        <Ionicons name="notifications-outline" size={24} color="black" />
        <Ionicons name="search" size={24} color="black" />
        </View>
      </View>
      </View>

      <Text style={{ fontSize:17,fontWeight:"bold",padding:10 }}>Welcome {user.name}</Text>

      <View style={{ flexDirection:'row',alignItems:'center',gap:10,marginHorizontal:5 }}>
        <TouchableOpacity style={{ padding:10,backgroundColor:'#e0e0e0',borderRadius:25,justifyContent:'center',alignItems:'center',flex:1 }}>
          <Text>Your orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding:10,backgroundColor:'#e0e0e0',borderRadius:25,justifyContent:'center',alignItems:'center',flex:1 }}>
          <Text>Your Account</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection:'row',alignItems:'center',gap:10,marginTop:12,marginHorizontal:5 }}>
        <TouchableOpacity style={{ padding:10,backgroundColor:'#e0e0e0',borderRadius:25,justifyContent:'center',alignItems:'center',flex:1 }}>
          <Text>Buy Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding:10,backgroundColor:'#e0e0e0',borderRadius:25,justifyContent:'center',alignItems:'center',flex:1 }} onPress={logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
          {
            orderArray.length > 0 ? (

              <FlatList 
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              horizontal
              data={orderArray}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity style={{ borderRadius:8,borderWidth:1,borderColor:'#d0d0d0',height:130,margin:15}}>
              <View style={{ marginVertical:10 }}>
              <Image 
              source={{ uri: item.image }}
              style={{ width:100,height:100,resizeMode:'contain' }}
              />
              </View>
              </TouchableOpacity>
                )
              }}
              />

              
            )
            : null
          } 
      
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})