import styles from './styles'
import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const Fav = ({ fav, handleButtonPress, removeValueFromFav }) => {
    return (
        <FlatList
          data={fav}
          style={{maxHeight: 125, width: 330, backgroundColor: "white"}}
          ItemSeparatorComponent={() => <View style={{backgroundColor: '#e0e0e0', height: 1}} />}
          renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleButtonPress(item.name)} style={{ width: 320, padding: 5, height: 50, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Image
                          source={{ uri: `https://z.fow.kr/profile/${item.profileIconId}.png` }}
                          style={{ width: 30, height: 30, marginRight: 10, borderRadius: 5 }} />
                      <Text style={{ color: "#424242", fontSize: 12, fontWeight: 600 }}>{item.name}</Text>
                  </View>
                  <TouchableOpacity onPress={() => removeValueFromFav(item)}><AntDesign name="close" size={18} color="#424242" /></TouchableOpacity>

              </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
    )
}

export default Fav