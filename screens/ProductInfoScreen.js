import { StyleSheet, Text, View,TextInput, FlatList,Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Dimensions } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartReducer'

const SLIDER_WIDTH = Dimensions.get('window').width;

const ProductInfoScreen = ({ route }) => {
    const data = route.params.item;
    const dispatch = useDispatch();
    const [addedToCart,setAddedToCart] = useState(false);

    const addItemToCart = (item) => {
      setAddedToCart(true);
      dispatch(addToCart(item));
      setTimeout(() => {
        setAddedToCart(false);
      },60000)
    }
    const cart = useSelector((state) => state.cart.cart)
  return (
    <View style={styles.container}>
        {/* Search Header */}
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
      <View>
        <View>
        {/* Offer Container */}
        <View style={styles.overAllOfferContainer}>
        <View style={styles.offerContainer}>
        <Text style={styles.OfferText}>{data.offer} off</Text>
        </View>
        <View style={styles.shareableContainer}>
        <Entypo name="share" size={24} color="black" />
        </View>    
        </View>
        

        {/* ImageSlider */}
        <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled 
        nestedScrollEnabled
        data={data.carouselImages}
        renderItem={({ item }) => {
            return (
                <View style={{ justifyContent: 'center',alignItems: 'center', width: SLIDER_WIDTH }}>
                <Image 
                source={{ uri: item }}
                style={{ height:320,width:320,resizeMode: 'cover', width: SLIDER_WIDTH }}
                />
                </View>
            )
        }}
        />
        {/* HeartContainer */}
        <View style={[styles.shareableContainer,{ marginLeft: 20,marginTop:10 }]}>
        <Feather name="heart" size={24} color="black" />
        </View>  
      </View>

        {/* InfoContainer */}
      <View style={styles.infoContainer}>
        <Text style={{ fontSize: 15,fontWeight:'500',textAlign: 'justify' }}>{data.title}</Text>
        <Text style={{ fontSize: 16,fontWeight: 'bold',marginVertical: 3 }}>₹{data.price}</Text>
      </View>

      {/* Line   */}
        <View style={styles.lineContainer}/>

      {/* Color and Size Container */}

        <View style={{ gap: 14, padding: 8 }}>
            <View style={styles.colorContainer}>
                <Text>Color:</Text>
                <Text style={{ fontWeight: '700' }}>{data.color}</Text>
            </View>
            <View style={styles.colorContainer}>
                <Text>Size:</Text>
                <Text style={{ fontWeight: '700' }}>{data.size}</Text>
            </View>
        </View>

        {/* Line   */}
        <View style={styles.lineContainer}/>

        {/* Total and location container */}
        <View>
            <View style={{ flexDirection: 'row',gap: 5,marginTop: 8,marginLeft: 8,marginBottom:2 }}>
                <Text style={{ fontWeight: '800' }}>Total:</Text>
                <Text style={{ fontWeight: '800' }}>₹{data.price}</Text>
            </View>
            <Text style={{ color:'#00CED1',marginLeft:8, marginRight:10}}>Free delivery Tomorrow by 3 PM.Order within 10hrs 30 mins</Text>

            <View style={{ flexDirection: 'row',gap:6,marginLeft:10,alignItems: 'center',marginVertical:5 }}>
            <Ionicons name="location-sharp" size={24} color="black" />
            <Text>Deliver To Pudukkottai - 622001 </Text>
            </View>

            <Text style={{ color:'green',marginLeft:10,marginBottom:5 }}>IN STOCK</Text>
        </View>

        {/* Buy now and Add to Cart Container */}
        <View style={{ gap:20 }}>
            <TouchableOpacity style={{ backgroundColor: '#FFC72C',alignItems: 'center',justifyContent:'center',marginHorizontal:10,paddingVertical:10,borderRadius: 20 }} onPress={() => addItemToCart(data)}>
                { addedToCart ? (
                    <Text style={{ fontWeight: '600' }}>Added to Cart</Text>
                ) : (
                  <Text style={{ fontWeight: '600' }}>Add to Cart</Text>
                ) }
                
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: '#FFAC10',alignItems: 'center',justifyContent:'center',marginHorizontal:10,paddingVertical:10,borderRadius: 20,marginBottom:5 }}>
                <Text style={{ fontWeight: '600' }}>Buy Now</Text>
            </TouchableOpacity>
        </View>
        </View>
    </View>
  )
}

export default ProductInfoScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
    },
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
      offerContainer: {
        backgroundColor: '#C60C30',
        borderRadius:30,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
      },
      OfferText: {
        color:'#fff',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'bold'
      },
      overAllOfferContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 10
      },
      shareableContainer: {
        backgroundColor: '#e0e0e0',
        width: 40,
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
      },
      infoContainer: {
        marginHorizontal:10,
        marginVertical:5
      },
      lineContainer: {
        borderWidth: 1,
        borderColor: 'lightgray'
      },
      colorContainer: {
        flexDirection: 'row',
        gap: 5
      }
})