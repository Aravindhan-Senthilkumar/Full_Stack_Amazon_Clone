import { FlatList, ScrollView, StyleSheet, Text, View,TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { UserType } from '../UserContext';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { cleanCart } from '../redux/CartReducer';

const ConfirmationScreen = () => {
    const [addresses,setAddresses] = useState([]);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const data = [
        {title:"Address",content:"Address Options"},
        {title:"Delivery",content:"Delivery Options"},
        {title:"Payment",content:"Payment Details"},
        {title:"Place Order",content:"Order Summary"},
    ]
    const {userId,setUserId} = useContext(UserType);
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
      const [currentStep,setCurrentStep] = useState(0);
      const [selectedAddress,setSelectedAddress] = useState("");
      const [option,setOption] = useState(true)
      const toggleOption = () => {
        setOption(!option)
      }
      const [selectedOption,setSelectedOption] = useState("");
      const cart = useSelector((state) => state.cart.cart);
        const total = cart.map((item) => item.price * item.quantity).reduce((current,previous) => current+previous,0);
        const handlePlaceOrder = async() => {
            try{
                const orderData = {
                    userId:userId,
                    cartItems:cart,
                    totalPrice:total,
                    shippingAddress:selectedAddress,
                    paymentMethod:selectedOption
                }

                const response = await axios.post('https://amazon-clone-server-cnk1.onrender.com/orders',orderData);
                if(response.status === 200){
                    navigation.navigate("OrderScreen")
                    dispatch(cleanCart());
                    console.log("Order created successfully",response.data.order);
                }else{
                    console.log("Error creating order",response.data)
                }
                }catch(error){
                console.log("Error",error)
                }
        };
  return (
    <View style={{ backgroundColor:'white',paddingTop:55 }}>
        <FlatList 
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        data={data}
        horizontal
        renderItem={({ item,index }) => {
            return (
        <View style={{ justifyContent:'center',alignItems:'center',width:98,gap:5 }}> 
        <View style={[{ width:30,height:30,borderRadius:15,alignItems:'center',justifyContent:'center' }, index < currentStep  ? { backgroundColor:'green' } : {backgroundColor:'#ccc'}]}>
            {
                index < currentStep ? <Text style={{ color:'#fff' }}>&#10003;</Text>
                : <Text style={{ color:'#fff' }}>{index+1}</Text>
            }
        
        </View>
        <Text>{item.title}</Text>
        </View>
            )
        }}
        />
        <View style={{ borderBottomWidth:2,borderColor:'#f0f0f0',backgroundColor:'white',marginVertical:10 }}/>

        {
            currentStep == 0 && (
                <View>
                <Text style={{ fontWeight:'600',fontSize:17, marginLeft:15}}>Select Delivery Address</Text>
        
                <FlatList 
                data={addresses}
                renderItem={({ item }) => {
                  return (
                    <View style={{ flexDirection:'row',alignItems:'center',borderColor:'#ccc',borderWidth:1,margin:10,borderRadius:6 }}>
                    <TouchableOpacity onPress={() => setSelectedAddress(item)}>
                        {
                            selectedAddress && selectedAddress._id === item._id ? <FontAwesome5 name="dot-circle" size={20.5} color="#008397" style={{ marginLeft:10 }}/> 
                            : <FontAwesome name="circle-thin" size={24} color="gray" style={{ marginLeft:10 }}/>
                        }
                    
                    </TouchableOpacity>
                    
                    <View style={{ padding:10 }}>
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
                    {
                        selectedAddress && selectedAddress._id === item._id 
                        ? (<View>
                            <TouchableOpacity style={{ backgroundColor:'#008397',justifyContent:'center',alignItems:'center',paddingVertical:8,marginVertical:5,borderRadius:20 }} onPress={() => setCurrentStep(1)}>
                                <Text style={{ textAlign:'center',color:'#fff',fontWeight:'600' }}>Deliver to this Address</Text>
                            </TouchableOpacity>
                        </View>)
                        : null
                    }
                    </View>
                    </View>
                  )
                }}
                />
                </View>        
            )
        }

        {
            currentStep == 1 && (
                <View>
                    <Text style={{ fontWeight:'600',fontSize:17, marginLeft:15}}>Choose your delivery options</Text>
                    <View style={{ flexDirection:'row',alignItems:'center',backgroundColor:'white',gap:7,borderColor:'#d0d0d0',borderWidth:1,padding:8,marginHorizontal:10,marginTop:5 }}>
                        {
                            option ? <TouchableOpacity><FontAwesome5 name="dot-circle" size={20.5} color="#008397" style={{ marginLeft:10 }} onPress={toggleOption}/>
                                </TouchableOpacity>
                            : <TouchableOpacity onPress={toggleOption}><FontAwesome name="circle-thin" size={24} color="gray" style={{ marginLeft:10 }}/>
                                </TouchableOpacity>
                        }
                    
                    <Text><Text style={{ color:'green',fontWeight:'500' }}>Tomorrow by 9 pm</Text> - Free delivery with your Prime Membership</Text>
                    </View>
                    {
                        option === true && (
                            <View>
                        <TouchableOpacity style={{ backgroundColor:'#FFC72C',alignItems:'center',justifyContent:'center',paddingVertical:10,margin:15,borderRadius:20 }} onPress={() => setCurrentStep(2)}>
                        <Text style={{ color:'black',fontWeight:'600' }}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                        )
                    }
                    
                </View>
            )
        }
       
        {
            currentStep == 2 && (
                <View>
                    <Text style={{ fontWeight:'600',fontSize:17, marginLeft:15}}>Select your payment method</Text>
                    <View>
                    <View style={{ flexDirection:'row',alignItems:'center',backgroundColor:'white',gap:7,borderColor:'#d0d0d0',borderWidth:1,padding:8,marginHorizontal:10,marginTop:5 }}>
                    <TouchableOpacity onPress={() => setSelectedOption("cash")}>
                        {
                            selectedOption === "cash" 
                            ? <FontAwesome5 name="dot-circle" size={21} color="#008397" style={{ marginLeft:10 }}/>
                            : <FontAwesome name="circle-thin" size={24} color="gray" style={{ marginLeft:10 }}/>
                        }
                    </TouchableOpacity>
                    <Text>Cash on Delivery</Text>
                    </View>
                    <View style={{ flexDirection:'row',alignItems:'center',backgroundColor:'white',gap:7,borderColor:'#d0d0d0',borderWidth:1,padding:8,marginHorizontal:10,marginTop:10 }}>
                    <TouchableOpacity  onPress={() => 
                        {
                        setSelectedOption("card")
                        Alert.alert("UPI/Debit card","Pay Online",
                            [
                                {
                                    text:"Cancel",
                                    onPress:() => console.log("Cancel is pressed")
                            },
                            {
                                    text:"Ok",
                                    onPress:() => Alert.alert("Paid Successfully")
                            }
                        ])
                    }
                        }>
                    {
                            selectedOption === "card" 
                            ? <FontAwesome5 name="dot-circle" size={21} color="#008397" style={{ marginLeft:10 }}/>
                            : <FontAwesome name="circle-thin" size={24} color="gray" style={{ marginLeft:10 }}/>
                    }
                    </TouchableOpacity>
                    <Text>UPI / Credit or debit card</Text>
                    </View>
                    {
                        selectedOption && (
                            <View>
                            <TouchableOpacity style={{ backgroundColor:'#FFC72C',alignItems:'center',justifyContent:'center',paddingVertical:10,margin:15,borderRadius:20 }} onPress={() => setCurrentStep(3)}>
                            <Text style={{ color:'black',fontWeight:'600' }}>Continue</Text>
                            </TouchableOpacity>
                            </View>
                        )
                    }
                    </View>
                </View>
            )
        }

        {
            currentStep == 3 && (
                <View>
                    <Text  style={{ fontWeight:'600',fontSize:17, marginLeft:15}}>Order Now</Text>
                    <View style={{ flexDirection:'row',alignItems:'center',backgroundColor:'white',gap:7,borderColor:'#d0d0d0',borderWidth:1,padding:8,marginHorizontal:10,marginTop:5,justifyContent:'space-between' }}>
                        <View>
                        <Text style={{ fontWeight:'bold',fontSize:16 }}>Save 5% and never run out</Text>
                        <Text style={{ color:'#d0d0d0' }}>Turn on auto deliveries</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                    <View style={{ backgroundColor:'white',gap:7,borderColor:'#d0d0d0',borderWidth:1,padding:8,marginHorizontal:10,marginTop:10,justifyContent:'space-between' }}>
                        <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'space-between' }}>
                        <Text style={{ color:'black' }}>Shipping to {selectedAddress.name}</Text>
                        </View>
                        <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'space-between' }}>
                        <Text style={{ color:'gray' }}>Items</Text>
                        <Text style={{ color:'gray' }}>₹{total}</Text>
                        </View>
                        <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'space-between' }}>
                        <Text style={{ color:'gray' }}>Delivery</Text>
                        <Text style={{ color:'gray' }}>0</Text>
                        </View>
                        <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'space-between' }}>
                        <Text style={{ color:'black',fontSize:20,fontWeight:'bold' }}>Order Total</Text>
                        <Text style={{ color:'#C60C30',fontWeight:'bold',fontSize:17 }}>₹{total}</Text>
                        </View>
                    </View>


                    <View style={{ flexDirection:'column',backgroundColor:'white',gap:7,borderColor:'#d0d0d0',borderWidth:1,padding:8,marginHorizontal:10,marginTop:10,justifyContent:'flex-start' }}>
                        <Text style={{ color:'gray' }}>Pay with</Text>
                        <Text style={{ fontSize:16,fontWeight:'600' }}>Pay on delivery (Cash)</Text>
                    </View>
                    <View>
                            <TouchableOpacity style={{ backgroundColor:'#FFC72C',alignItems:'center',justifyContent:'center',paddingVertical:10,margin:15,borderRadius:20 }} onPress={handlePlaceOrder}>
                            <Text style={{ color:'black',fontWeight:'500' }}>Place your order</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            )
        }

    </View>
  )
}

export default ConfirmationScreen

const styles = StyleSheet.create({})