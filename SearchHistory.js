import styles from './styles'
import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const SearchHistory = ({ searchHistory, handleButtonPress, removeValueFromSearchHistory }) => {
    return (
        <FlatList
          data={searchHistory}
          style={{maxHeight: 100, width: 300 }}
          ItemSeparatorComponent={() => <View style={{backgroundColor: '#e0e0e0', height: 1}} />}
          renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleButtonPress(item.name)} style={{ width: 290, padding: 5, height: 50, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Image
                          source={{ uri: `https://z.fow.kr/profile/${item.profileIconId}.png` }}
                          style={{ width: 30, height: 30, marginRight: 5 }} />
                      <Text style={{ color: "#424242", fontWeight: 600 }}>{item.name}</Text>
                  </View>
                  <TouchableOpacity onPress={() => removeValueFromSearchHistory(item)}><AntDesign name="close" size={24} color="black" /></TouchableOpacity>

              </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
    )
}

export default SearchHistory