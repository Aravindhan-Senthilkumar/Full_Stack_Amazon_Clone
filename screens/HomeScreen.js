import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { list, images, deals, offers } from '../data/FlatlistHomeData.js';
import { Dimensions } from 'react-native';
import axios from 'axios';
import ProductItem from '../components/ProductItem.js';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { UserType } from '../UserContext.js';

const SLIDER_WIDTH = Dimensions.get('window').width;

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [category, setCategory] = useState("jewelery");
  const { userId, setUserId } = useContext(UserType);
  const [items, setItems] = useState([
    { label: "men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" }
  ]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.log('Error message', error);
      }
    };
    fetchData();
  }, []);

  const filteredData = products.filter((item) => item.category === category);

  const cart = useSelector((state) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`https://amazon-clone-server-cnk1.onrender.com/addresses/${userId}`);
      const { addresses } = response.data;
      setAddresses(addresses);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);

  const renderHeader = () => (
    <View>
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

      {/* Location Container */}
      <Pressable onPress={() => setModalVisible(!modalVisible)}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={25} color="black" />
          {selectedAddress ? (
            <Text style={styles.locationText}>
              Deliver to {selectedAddress.name} - {selectedAddress.city} {selectedAddress.postcode}
            </Text>
          ) : (
            <Text style={styles.locationText}>Add an Address</Text>
          )}
          <AntDesign name="down" size={15} color="black" />
        </View>
      </Pressable>

      {/* Categories FlatList */}
      <FlatList
        nestedScrollEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        data={list}
        renderItem={({ item }) => (
          <View style={styles.flatListContainer}>
            <Image source={{ uri: item.image }} style={styles.flatListImage} />
            <Text style={styles.flatListText}>{item.name}</Text>
          </View>
        )}
      />

      {/* Image Slider FlatList */}
      <FlatList
        nestedScrollEnabled
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={images}
        renderItem={({ item }) => (
          <View style={styles.imageSliderContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
          </View>
        )}
      />

      {/* Trending Deals */}
      <Text style={styles.sectionTitle}>Trending Deals of the Week</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={deals}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProductInfoScreen', { item })}>
            <View style={{ margin: 20 }}>
              <Image source={{ uri: item.image }} style={{ height: 150, width: 150, resizeMode: 'cover' }} />
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <View>
            <Text style={styles.sectionTitle}>Today's Deals</Text>
            <FlatList
              nestedScrollEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
              data={offers}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('ProductInfoScreen', { item })}>
                  <View style={{ alignItems: 'center', marginBottom: 10 }}>
                    <Image source={{ uri: item.image }} style={{ height: 150, width: 150, resizeMode: 'contain' }} />
                    <View style={styles.offerContainerText}>
                      <Text style={{ color: '#fff' }}>Upto {item.offer} off</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
            <View style={styles.lineContainer} />
            <DropDownPicker
              dropDownContainerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              open={open}
              value={category}
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="Choose Category"
              placeholderStyle={styles.placeholderStyles}
              zIndex={3000}
              zIndexInverse={1000}
            />
            <ProductItem data={filteredData} />
          </View>
        }
      />

      {/* Modal */}
      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Choose your Location</Text>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalDescription}>
            Select a delivery location to see product availability and delivery options
          </Text>
          <FlatList
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            data={addresses}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.addressContainer,
                  selectedAddress === item && styles.selectedAddress
                ]}
                onPress={() => setSelectedAddress(item)}
              >
                <Text style={styles.addressText}>{item.name}</Text>
                <Text style={styles.addressDetails}>{item.city}, {item.postcode}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchHeaderContainer: {
    backgroundColor: '#00CED1',
    width: '100%',
    marginTop: 30,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
  searchInput: {
    marginLeft: 5,
    width: '90%',
    fontSize: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#AFEEEE',
    padding: 12,
    gap: 9,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '400',
  },
  flatListContainer: {
    margin: 10,
    alignItems: 'center',
  },
  flatListImage: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  flatListText: {
    marginTop: 8,
    fontWeight: '700',
  },
  image: {
    height: 200,
    width: SLIDER_WIDTH,
    resizeMode: 'cover',
  },
  imageSliderContainer: {
    width: SLIDER_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    alignSelf: 'flex-start',
    margin: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  offerContainerText: {
    backgroundColor: '#E31837',
    paddingHorizontal: 25,
    paddingVertical: 5,
    margin: 10,
    borderRadius: 4,
  },
  lineContainer: {
    borderWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 20,
  },
  dropdown: {
    borderColor: '#B7B7B7',
    height: 30,
    marginBottom: 20,
    width: '50%',
    marginLeft: 10,
  },
  dropdownContainer: {
    borderColor: '#B7B7B7',
    width: '50%',
    marginLeft: 10,
  },
  placeholderStyles: {
    color: 'gray',
  },
  modalContainer: {
    backgroundColor: '#fff',
    height: 500,
    marginTop: 500,
    width: '100%',
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  modalDescription: {
    marginTop: 5,
    fontSize: 16,
    color: 'gray',
  },
  addressContainer: {
    width: 140,
    height: 140,
    borderColor: '#D0D0D0',
    marginTop: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  selectedAddress: {
    backgroundColor: '#FBCEB1',
  },
  addressText: {
    fontWeight: 'bold',
  },
  addressDetails: {
    fontSize: 12,
  },
});
