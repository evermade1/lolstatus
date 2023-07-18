import styles from './styles'
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { famous } from './Famous';

const Profile = ({ summonerData }) => {
    return (
        <View>
            <View style={styles.profile1}>
                <Image
                    source={{ uri: `https://z.fow.kr/profile/${summonerData.profileIconId}.png` }}
                    style={{ width: 90, height: 90, borderRadius: 15, marginRight: 15 }} />
                <View>
                    <Text style={styles.nickname}>{summonerData.name}</Text>
                    <Text style={styles.level}>Lv. {summonerData.summonerLevel}</Text>
                    {famous[summonerData.name.toLowerCase()] ? <Text style={styles.famous}>{famous[summonerData.name.toLowerCase()]}</Text> : null}
                </View>
            </View>
            
            
        </View>
    )
}

export default Profile