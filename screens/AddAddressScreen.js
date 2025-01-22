import { ScrollView, StyleSheet, Text, View,TextInput, Pressable, Touchable, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { UserType } from '../UserContext';
import Entypo from '@expo/vector-icons/Entypo';

const AddAddressScreen = () => {
    const navigation = useNavigation();
    const [addresses,setAddresses] = useState([]);
    const {userId,setUserId} = useContext(UserType);
    
    useFocusEffect(() => {
      !addresses ? null : fetchAddresses(); 
    })
    useEffect(() => {
      fetchAddresses();
    },[]);
    const fetchAddresses = async () => {
      try{
        const response = await axios.get(`https://amazon-clone-server-cnk1.onrender.com/addresses/${userId}`)
        const {addresses} = response.data;
        
        setAddresses(addresses);
      }catch(error){
        console.log("Error",error);
      }
    }
  return (
    <ScrollView style={{ flex:1,backgroundColor: '#fff' }}>
        {/* searchHeaderContainer */}
      <View style={styles.searchHeaderContainer}>
        <View style={styles.searchInputContainer}>
          <AntDesign name="search1" size={24} color="black" style={{ marginLeft: 5 }} />
          <TextInput
            placeholder="Search Amazon.in"
            style={styles.searchInput}
            numberOfLines={1}
          />
        </View>
        <Feather name="mic" size={24} color="black" style={{ marginRight: 15 }} />
      </View>

        <Text style={{ marginTop:10,fontSize:18,fontWeight:'bold',marginLeft:10 }}>Your Addresses</Text>

        <Pressable style={{ flexDirection:'row',justifyContent:'space-between' ,marginTop:10,borderColor:'#D0D0D0',borderTopWidth:1,paddingVertical:8,paddingHorizontal:10,alignItems:'center',borderBottomWidth:1}} onPress={() => navigation.navigate('AddressScreen')}>
            <Text>Add a New Address</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <FlatList 
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        data={addresses}
        renderItem={({ item }) => {
          return (
            <View style={{ borderColor: '#d0d0d0',borderWidth:1, padding:10, margin:10 }}>
            <View style={{ flexDirection: 'row', gap: 2,alignItems:'center' }}>
              <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
              <Entypo name="location-pin" size={24} color="red" />
            </View>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Text>{item.houseNo},</Text>
              <Text>{item.street},</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Text>{item.landmark},</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Text>{item.city},</Text>
              <Text>India</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Text>Phone No:</Text>
              <Text>{item.mobileNo}</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Text>Pin Code</Text>
              <Text>{item.postcode}</Text>
            </View>
            <View style={{ flexDirection:'row',gap:10 }}>
            <TouchableOpacity style={{ borderColor: '#d0d0d0',borderWidth:1,backgroundColor:'#f5f5f5',width: 'auto', alignItems:'center',padding:5,margin:5,paddingHorizontal:10 }}>
              <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ borderColor: '#d0d0d0',borderWidth:1,backgroundColor:'#f5f5f5',width: 'auto', alignItems:'center',padding:5,margin:5,paddingHorizontal:10 }}>
              <Text>Remove</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ borderColor: '#d0d0d0',borderWidth:1,backgroundColor:'#f5f5f5',width: 'auto', alignItems:'center',padding:5,margin:5,paddingHorizontal:10 }}>
              <Text>Set as Default</Text>
            </TouchableOpacity>
            </View>
            </View>
          )
        }}
        />
       
    </ScrollView>
  )
}

export default AddAddressScreen

const styles = StyleSheet.create({
    searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '88%',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  searchHeaderContainer: {
    backgroundColor: '#00CED1',
    width: '100%',
    marginTop: 30,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    marginLeft: 5,
    width: '90%',
    fontSize: 16,
  },
})