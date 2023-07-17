import styles from './styles'
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { famous } from './Famous';

const SCREEN_WIDTH = Dimensions.get("window").width

const Profile = ({ rankData, flexData, summonerData }) => {
    return (
        <View>
            <View style={styles.profile1}>
                <Image
                    source={{ uri: `https://z.fow.kr/profile/${summonerData.profileIconId}.png` }}
                    style={{ width: 90, height: 90, borderRadius: 15, marginRight: 15 }} />
                <View>
                    <Text style={styles.nickname}>{rankData.summonerName}</Text>
                    <Text style={styles.level}>Lv. {summonerData.summonerLevel}</Text>
                    {famous[rankData.summonerName.toLowerCase()] ? <Text style={styles.famous}>{famous[rankData.summonerName.toLowerCase()]}</Text> : null}
                </View>
            </View>
            <ScrollView
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        contentContainerStyle={styles.weather}>
                {rankData ? <View style={styles.profile2}>
                <Text style={{ marginTop: 20, fontSize: 15, fontWeight: 500 }}>솔로랭크</Text>
                <Image
                    source={{ uri: `https://z.fow.kr/img/emblem/${rankData.tier.toLowerCase()}.png` }}
                    style={{ width: 100, height: 100, marginTop: 15 }}
                />
                <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 500 }}>{rankData.tier} {rankData.rank} {rankData.leaguePoints}LP</Text>
                <Text style={{ marginTop: 10, fontSize: 15 }}>{rankData.wins}승 {rankData.losses}패 승률 {(rankData.wins / (rankData.wins + rankData.losses) * 100).toFixed(2)}%</Text>
            </View> : null }
            
            {flexData ? <View style={styles.profile2}>
                <Text style={{ marginTop: 20, fontSize: 15, fontWeight: 500 }}>자유랭크</Text>
                <Image
                    source={{ uri: `https://z.fow.kr/img/emblem/${flexData.tier.toLowerCase()}.png` }}
                    style={{ width: 100, height: 100, marginTop: 15 }}
                />
                <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 500 }}>{flexData.tier} {flexData.rank} {flexData.leaguePoints}LP</Text>
                <Text style={{ marginTop: 10, fontSize: 15 }}>{flexData.wins}승 {flexData.losses}패 승률 {(flexData.wins / (flexData.wins + flexData.losses) * 100).toFixed(2)}%</Text>
            </View> : null }
            </ScrollView>
            
            
        </View>
    )
}

export default Profile