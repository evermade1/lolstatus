import styles from './styles'
import React from 'react';
import { View, Text, Image } from 'react-native';

const Profile = ({ rankData, summonerData }) => {
    return (
        <View style={styles.profile}>
            <View style={styles.profile1}>
                <Image
                    source={{ uri: `https://z.fow.kr/profile/${summonerData.profileIconId}.png` }}
                    style={{ width: 100, height: 100, marginRight:30, borderRadius: 15 }} />
                <View>
                    <Text style={styles.nickname}>{rankData.summonerName}</Text>
                    <Text style={styles.nickname}>Lv.{summonerData.summonerLevel}</Text>
                </View>
            </View>
            <Image
                source={{ uri: `https://z.fow.kr/img/emblem/${rankData.tier.toLowerCase()}.png` }}
                style={{ width: 100, height: 100, marginTop: 30 }}
            />
            <Text style={{marginTop: 20, fontSize: 18, fontWeight:500}}>{rankData.tier} {rankData.rank} {rankData.leaguePoints}LP</Text>
            <Text style={{marginTop: 10, fontSize: 15}}>{rankData.wins}승 {rankData.losses}패 승률 {(rankData.wins / (rankData.wins + rankData.losses) * 100).toFixed(2)}%</Text>
            
        </View>
    )
}

export default Profile