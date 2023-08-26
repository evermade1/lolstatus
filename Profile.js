import styles from './styles'
import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Octicons } from '@expo/vector-icons';
import { famous } from './Famous';

const Profile = ({ summonerData, saveFav, removeValueFromFav, saveMy, removeValueFromMy }) => {
    const [my, setMy] = useState(false)
    const mine = async () => {
        const my = await AsyncStorage.getItem('my');
        if (my) {
          const updatedMy = JSON.parse(my).filter(item => item.name == summonerData.name);
          if (updatedMy.length>0) {setMy(true)}
          else {setMy(false)}
        }
    }
    mine()
    const [fav, setFav] = useState(false)
    const favorite = async () => {
        const fav = await AsyncStorage.getItem('fav');
        if (fav) {
          const updatedFav = JSON.parse(fav).filter(item => item.name == summonerData.name);
          if (updatedFav.length>0) {setFav(true)}
          else {setFav(false)}
        }
    }
    favorite()
    const onPress = () => {
        if(!my) {
            Alert.alert(
                "이 소환사를 내 데이터로 저장합니다.",
                "기존 데이터는 사라집니다.",
                [{
                  text: "확인",
                  style: "default"
                }]
              );
            saveMy(summonerData)
        } else {
            removeValueFromMy(summonerData)
        }
        setMy(!my)
    }
    const onPress2 = () => {
        if(!fav) {
            saveFav(summonerData)
        } else {
            removeValueFromFav(summonerData)
        }
        setFav(!fav)
    }
    return (
        <View>
            <ImageBackground resizeMode="cover" blurRadius={3}
            source={{ uri: `https://z.fow.kr/profile/${summonerData.profileIconId}.png` }}>
                <View style={{ ...styles.profile1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                    <Image
                        source={{ uri: `https://z.fow.kr/profile/${summonerData.profileIconId}.png` }}
                        style={{ width: 90, height: 90, borderRadius: 15, marginRight: 15 }} />
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: 250 }}>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={styles.nickname}>{summonerData.name}</Text>
                            <Text style={styles.level}>Lv. {summonerData.summonerLevel}</Text>
                            {famous[summonerData.name.toLowerCase()] ? <Text style={styles.famous}>{famous[summonerData.name.toLowerCase()]}</Text> : null}
                        </View>
                        <TouchableOpacity onPress={onPress}>
                            <Octicons name={my ? "person-fill" : "person"} size={30} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPress2}>
                            <Octicons name={fav ? "star-fill" : "star"} size={30} color={fav ? "#FFFF00" : "white"} />
                        </TouchableOpacity>
                    </View>
                </View>
                
            </ImageBackground>
            
            
        </View>
    )
}

export default Profile