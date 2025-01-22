import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { UserType } from '../UserContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AddressScreen = () => {
    const navigation = useNavigation();
    const [name,setName] = useState("");
    const [mobileNo,setmobileNo] = useState("");
    const [houseNo,setHouseNo] = useState("");
    const [street,setStreet] = useState("");
    const [landmark,setLandmark] = useState("");
    const [postcode,setPostCode] = useState("");
    const [city,setCity] = useState("");
    const {userId,setUserId} = useContext(UserType)

    useEffect(()=>{
      const fetchUser = async () =>{
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
      }
      fetchUser();
    },[]);

    const handleAddAddress = () => {
      const address = {
        name,
        mobileNo,
        houseNo,
        street,
        landmark,
        postcode,
        city
      }

      axios.post('https://amazon-clone-server-cnk1.onrender.com/address',{ userId,address })
      .then((response) => {
        Alert.alert("Success","Addresses added successfully");
        setName("");
        setmobileNo("");
        setHouseNo("");
        setStreet("");
        setLandmark("");
        setPostCode("");
        setCity("")
        setTimeout(() => {
          navigation.goBack();
        },500)
      }).catch((error) => {
        Alert.alert("Error","Failed to add address");
        console.log("Error",error);
      })
    }
    
  return (
    <ScrollView style={{ flex:1,backgroundColor:'#fff' }}>
      <View style={{ backgroundColor:'#00CED1',height:50,marginTop: 30, }}/>

      
        <Text style={{ marginLeft:10,marginTop:10,fontSize:17,fontWeight:'bold' }}>Add a new Address</Text>
        <View style={{ borderColor:'#D0D0D0',borderWidth:1,marginHorizontal:10,marginVertical:10 }}>
        <TextInput 
        placeholder='City'
        style={{ marginLeft:8 }}
        value={city}
        onChangeText={setCity}
        />
        </View>
        <Text style={{ marginLeft:10,marginTop:5,fontSize:17,fontWeight:'bold' }}>Full name (First and last name)</Text>
        <View style={{ borderColor:'#D0D0D0',borderWidth:1,marginHorizontal:10,marginVertical:10 }}>
        <TextInput 
        placeholder='Enter your name'
        style={{ marginLeft:8 }}
        value={name}
        onChangeText={setName}
        />
        </View>
        <Text style={{ marginLeft:10,marginTop:5,fontSize:17,fontWeight:'bold' }}>Mobile number</Text>
        <View style={{ borderColor:'#D0D0D0',borderWidth:1,marginHorizontal:10,marginVertical:10 }}>
        <TextInput 
        placeholder='Mobile No'
        style={{ marginLeft:8 }}
        value={mobileNo}
        onChangeText={setmobileNo}
        />
        </View>
        <Text style={{ marginLeft:10,marginTop:5,fontSize:17,fontWeight:'bold' }}>Flat, House No, Building, Company</Text>
        <View style={{ borderColor:'#D0D0D0',borderWidth:1,marginHorizontal:10,marginVertical:10 }}>
        <TextInput 
        placeholder=''
        style={{ marginLeft:8 }}
        value={houseNo}
        onChangeText={setHouseNo}
        />
        </View>
        <Text style={{ marginLeft:10,marginTop:5,fontSize:17,fontWeight:'bold' }}>Area, Street, Sector, Village</Text>
        <View style={{ borderColor:'#D0D0D0',borderWidth:1,marginHorizontal:10,marginVertical:10 }}>
        <TextInput 
        placeholder=''
        style={{ marginLeft:8 }}
        value={street}
        onChangeText={setStreet}
        />
        </View>
        <Text style={{ marginLeft:10,marginTop:5,fontSize:17,fontWeight:'bold' }}>Landmark</Text>
        <View style={{ borderColor:'#D0D0D0',borderWidth:1,marginHorizontal:10,marginVertical:10 }}>
        <TextInput 
        placeholder='Eg: Near Appollo hospital'
        style={{ marginLeft:8 }}
        value={landmark}
        onChangeText={setLandmark}
        />
        </View>
        <Text style={{ marginLeft:10,marginTop:5,fontSize:17,fontWeight:'bold' }}>Pincode</Text>
        <View style={{ borderColor:'#D0D0D0',borderWidth:1,marginHorizontal:10,marginVertical:10 }}>
        <TextInput 
        placeholder='Enter Pincode'
        style={{ marginLeft:8 }}
        value={postcode}
        onChangeText={setPostCode}
        />
        </View>

        <TouchableOpacity style={{ alignItems:'center',justifyContent:'center',backgroundColor:'#FFC72C',paddingVertical:15,paddingHorizontal:10,marginHorizontal:10,marginVertical:5,borderRadius:8 }} onPress={() => handleAddAddress()}>
            <Text style={{ fontWeight:'bold' }}>Add Address</Text>
        </TouchableOpacity>
    </ScrollView>
  )
}

export default AddressScreen

const styles = StyleSheet.create({})