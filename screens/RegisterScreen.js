import { StyleSheet, Text, View, SafeAreaView,Image, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleRegister = () => {
    const user = {
      name:name,
      email:email,
      password:password,
    };

    //send the post request to the backend API
    axios.post("https://amazon-clone-server-cnk1.onrender.com/register",user)
    .then((response) => {
      console.log(response.data);
      const token = response.data.token;
      AsyncStorage.setItem("authToken",token);
      setName("");
      setPassword("");
      setEmail("");
      Alert.alert("Please,verify and try login")
    })
    .catch((error) => {
      
      console.error("Registration failed:", error);
      Alert.alert("Error", "You are already registered and Please, verify to login");
    });
};

  return (
    <SafeAreaView style={styles.safeArea}>
    {/* ImageContainer */}
    <View>
    <Image
        style={{ width: 150, height: 100,marginTop: 60 }}
        source={{
          uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
        }}
        />
    </View>

    <KeyboardAvoidingView>
      
    {/* TextContainer */}
      <View style={{ alignItems: 'center' }}>
      <Text style={styles.LoginText}>Register To your Account</Text>
      </View>

    {/* InputContainers */}
    <View style={styles.parentInputContainer}>

    <View style={styles.InputContainer}>
    <MaterialCommunityIcons name="account" size={24} color="gray" />
    <TextInput 
    placeholder='Enter your Name' 
    style={styles.inputStyle}
    value={name}
    onChangeText={setName}
    />
    </View>

    <View style={styles.InputContainer}>
    <MaterialIcons name="email" size={24} color="gray" />
    <TextInput 
    placeholder='Enter your Email' 
    style={styles.inputStyle}
    value={email}
    onChangeText={setEmail}
    />
    </View>

    <View style={styles.InputContainer}>
    <AntDesign name="lock" size={24} color="gray" />
    <TextInput 
    placeholder='Enter your Password' 
    style={styles.inputStyle} 
    secureTextEntry
    value={password}
    onChangeText={setPassword}
    />
    </View>

    {/* Forgot Text Container */}
    <View style={styles.forgotContainer}>
      <Text>Keep me logged in</Text>
      <Text style={styles.forgotText}>Forgot Password?</Text>
    </View>
    </View>

      {/* LoginPressbleContainer */}
    <TouchableOpacity style={styles.TOContainer} onPress={handleRegister}>
      <Text style={styles.LoginTOText}>Register</Text>
    </TouchableOpacity>

        {/* NavigationLinkContainer */}
    <View style={styles.NavlinkContainer}>
      <Text style={styles.navLinkText1}>Already have an account!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navLinkText2}>Login Here</Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  safeArea:{
  flex: 1,
  alignItems: 'center',
  backgroundColor: '#fff'
},
LoginText: {
  fontSize: 17,
  fontWeight: 'bold',
  marginTop: 12,
  color: '#041E42'
},
InputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  width: 350,
  paddingHorizontal: 10,
  gap: 8,
  borderRadius: 10,
  paddingVertical: 3,
  marginBottom: 20,
  backgroundColor: 'lightgray'
},
parentInputContainer: {
  marginTop: 70,
  justifyContent: 'center',
  alignItems: 'center'
},
forgotContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: 350,
},
forgotText: {
  color: '#007FFF'
},
TOContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FEBE10',
  marginHorizontal: 80,
  paddingVertical: 15,
  borderRadius: 10,
  marginTop: 60
},
LoginTOText: {
  color: '#fff',
  fontSize: 15,
  fontWeight: 'bold'
},
NavlinkContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 5,
  marginTop: 10
},
navLinkText1:{
  fontSize: 15,
},
navLinkText2: {
  fontWeight: 'bold',
  fontSize: 15,
}})