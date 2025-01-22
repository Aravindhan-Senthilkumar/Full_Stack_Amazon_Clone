import { StyleSheet, Text,Image, View } from 'react-native'
import React from 'react'

const SplashScreen = () => {
  return (
    <View style={{ flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems:'center' }}>
                <Image
                style={{ width: 200, height: 200 }}
                source={{
                  uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
                }}
                />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})