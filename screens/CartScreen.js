import { StyleSheet, Text, View,TextInput, TouchableOpacity,Image, FlatList } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../redux/CartReducer';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart.map((item) => item.price * item.quantity).reduce((current,previous) => current+previous,0);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const IncreaseQuantity = (item) => {
    dispatch(incrementQuantity(item))
  }
  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item))
  }
  const deleteItem = (item) => {
    dispatch(removeFromCart(item))
  }
  return (
    <View style={{ backgroundColor: '#fff',flex:1 }}>
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

   <View style={{ flexDirection: 'row' , padding: 10,alignItems:'center'}}>
    <Text style={{ fontSize:18,fontWeight:'400' }}>SubTotal : </Text>
    <Text style={{ fontSize:20,fontWeight:'bold' }}>₹ {total}</Text>
   </View>

   <View style={{ paddingHorizontal: 10 }}>
    <Text>EMI details Available</Text>
   </View>

   <TouchableOpacity style={{ backgroundColor:'#FFC72C',alignItems:'center',marginHorizontal:10,paddingVertical:10,marginVertical:10,borderRadius:20 }} onPress={() => {
    cart.length <= 0
    ? null
    : navigation.navigate("ConfirmationScreen")
    }}>
    <Text>Proceed to Buy ({cart.length}) items</Text>
   </TouchableOpacity>

   <View 
   style={{ backgroundColor:'#d0d0d0',height:2,marginBottom:10 }}
   />

   

    <FlatList 
    nestedScrollEnabled
    showsVerticalScrollIndicator={false}
    data={cart}
    keyExtractor={(item, index) => `${item.id || index}`}
    renderItem={({ item }) => {
      return (
    <View>
    <TouchableOpacity>
    <View style={{ flexDirection:'row',justifyContent:'space-around' }}>
    <Image 
    source={{ uri:item.image }}
    style={{ height:140,width:140,marginVertical:10 }}
    />
    <View style={{ margin:10,width:180 }}>
      <Text numberOfLines={2}>{item.title} </Text>
      <Text style={{ fontWeight:'700',fontSize:20,marginTop:5 }}>₹ {item.price}</Text>
      <Image source={{ uri:"https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png" }} style={{ width:30,height:30,resizeMode:'contain' }}/>
      <Text style={{ color:'green',fontWeight:'600' }}>IN STOCK</Text>
    </View>
    </View>
    </TouchableOpacity>
    <View style={{ flexDirection:'row',gap:20 }}>
      <View style={{ flexDirection:'row',marginLeft:15 }}>
        
          {
            item.quantity > 1 
            ?  (<TouchableOpacity style={{ backgroundColor:'lightgray',width:40,height:40,alignItems:'center',justifyContent:'center'}} onPress={() => decreaseQuantity(item)}><AntDesign name="minus" size={24} color="black" /> </TouchableOpacity>)
            :  (<TouchableOpacity style={{ backgroundColor:'lightgray',width:40,height:40,alignItems:'center',justifyContent:'center'}} onPress={() => deleteItem(item)}><AntDesign name="delete" size={24} color="black" /></TouchableOpacity>)
          }
       
        <View style={{ backgroundColor:'white',width:40,height:40,alignItems:'center',justifyContent:'center'}}>
        <Text>{item.quantity}</Text> 
        </View>
        <TouchableOpacity style={{ backgroundColor:'lightgray',width:40,height:40,alignItems:'center',justifyContent:'center'}} onPress={() => IncreaseQuantity(item)}>
        <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ backgroundColor:'#fff',borderWidth:1,borderColor:'#d0d0d0',width:60,justifyContent:'center',alignItems:'center' }} onPress={() => deleteItem(item)}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
      
    <View style={{ flexDirection:'row',gap:15,marginLeft:15,marginTop:15 }}>
      <TouchableOpacity style={{ backgroundColor:'#fff',borderWidth:1,borderColor:'#d0d0d0',justifyContent:'center',alignItems:'center', width:120,paddingVertical:5 }}>
        <Text>Save For Later</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor:'#fff',borderWidth:1,borderColor:'#d0d0d0',justifyContent:'center',alignItems:'center', width:150,paddingVertical:5 }}>
        <Text>See More Like This</Text>
      </TouchableOpacity>
    </View>

    <View style={{ borderBottomWidth:2,borderColor:'#f0f0f0',backgroundColor:'white',marginVertical:10 }}/>
    </View>
      )
    }}
    />

   </View>
  )
}

export default CartScreen

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
  },})