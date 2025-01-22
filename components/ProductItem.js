import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartReducer';

const ProductItem = ({ data }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // State to track added items
  const [addedToCart, setAddedToCart] = useState({});

  const addItemToCart = (item) => {
    setAddedToCart((prev) => ({
      ...prev,
      [item.id]: true, // Mark this specific item as added
    }));

    dispatch(addToCart(item));

    setTimeout(() => {
      setAddedToCart((prev) => ({
        ...prev,
        [item.id]: false, // Reset after 60 seconds
      }));
    }, 60000);
  };

  return (
    <FlatList
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return (
          <View style={styles.ProductItemContainer}>
            <View>
              <TouchableOpacity>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text numberOfLines={1} style={{ marginVertical: 2 }}>
                  {item.title}
                </Text>
                <View style={{ flexDirection: 'row', gap: 43, marginVertical: 2 }}>
                  <Text style={{ fontWeight: 'bold' }}>₹{item.price}</Text>
                  <Text style={{ color: '#FFC72C', fontWeight: 'bold' }}>
                    {item.rating.rate} ratings
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#FFC72C',
                alignItems: 'center',
                paddingVertical: 8,
                borderRadius: 25,
                width: '80%',
                marginVertical: 5,
              }}
              onPress={() => addItemToCart(item)}
            >
              {addedToCart[item.id] ? (
                <Text style={{ fontWeight: '600' }}>Added to Cart</Text>
              ) : (
                <Text style={{ fontWeight: '600' }}>Add to Cart</Text>
              )}
            </TouchableOpacity>
          </View>
        );
      }}
      numColumns={2}
    />
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  ProductItemContainer: {
    margin: 12,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
