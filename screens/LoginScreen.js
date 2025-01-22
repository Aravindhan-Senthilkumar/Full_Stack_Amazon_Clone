import { StyleSheet, Text, View, SafeAreaView,Image, KeyboardAvoidingView, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import SplashScreen from './SplashScreen';

const LoginScreen = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigation = useNavigation();
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try{
        const token = await AsyncStorage.getItem("authToken");
        if(token){
          setTimeout(() => {
            navigation.replace("Main")
          },1000)
        }else{
          setLoading(false)
        }
      }catch(error){
        console.log("Error message",error)
        setLoading(false)
      }
    }
    checkLoginStatus();
  },[navigation]);

  if(loading === true){
    return <SplashScreen />
  }

  const handleLogin = () => {
    const user = {
      email:email,
      password:password
    }
    axios.post("https://amazon-clone-server-cnk1.onrender.com/login",user)
    .then((response) => {
      console.log(response.data);
      const token = response.data.token;
      AsyncStorage.setItem("authToken",token);
      navigation.replace("Main");
    }).catch((error) => {
        Alert.alert("Login Error","Invalid Email");
        console.log(error)
      })
  }

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
        <Text style={styles.LoginText}>Login In To your Account</Text>
        </View>

      {/* InputContainers */}
      <View style={styles.parentInputContainer}>
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
      onChangeText={setPassword}/>
      </View>

      {/* Forgot Text Container */}
      <View style={styles.forgotContainer}>
        <Text>Keep me logged in</Text>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </View>
      </View>

      {/* LoginPressbleContainer */}
      <TouchableOpacity style={styles.TOContainer} onPress={handleLogin}>
        <Text style={styles.LoginTOText}>Login</Text>
      </TouchableOpacity>

      {/* NavigationLinkContainer */}
      <View style={styles.NavlinkContainer}>
        <Text style={styles.navLinkText1}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.navLinkText2}>SignUp Now</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

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
  }
})