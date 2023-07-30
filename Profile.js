import styles from './styles'
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { famous } from './Famous';

const Profile = ({ summonerData }) => {
    return (
        <View>
            <ImageBackground resizeMode="cover" blurRadius={3}
            source={{ uri: `https://z.fow.kr/profile/${summonerData.profileIconId}.png` }}>
                <View style={{...styles.profile1,flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)',}}>
                <Image
                    source={{ uri: `https://z.fow.kr/profile/${summonerData.profileIconId}.png` }}
                    style={{ width: 90, height: 90, borderRadius: 15, marginRight: 15 }} />
                <View>
                    <Text style={styles.nickname}>{summonerData.name}</Text>
                    <Text style={styles.level}>Lv. {summonerData.summonerLevel}</Text>
                    {famous[summonerData.name.toLowerCase()] ? <Text style={styles.famous}>{famous[summonerData.name.toLowerCase()]}</Text> : null}
                </View>
                </View>
                
            </ImageBackground>
            
            
        </View>
    )
}

export default Profile