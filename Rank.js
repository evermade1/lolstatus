import styles from './styles'
import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const Rank = ({ rankData, flexData }) => {
    
    const bgColor = {
        0: "white",
        "iron" : "#848484",
        "bronze" : "#886A08",
        "silver" : "#D8D8D8",
        "gold" : "#F5F6CE",
        "platinum" : "#CEF6EC",
        "emerald" : "#CEF6EC",
        "diamond" : "#CEF6F5",
        "master" : "#F6CEF5",
        "grandmaster" : "#F6D8CE",
        "challenger" : "#CEE3F6"
    }
    const bgColor2 = {
        0: "white",
        "iron" : "#848484",
        "bronze" : "#886A08",
        "silver" : "#F2F2F2",
        "gold" : "#F5F6CE",
        "platinum" : "#CEF6EC",
        "emerald" : "#CEF6EC",
        "diamond" : "#CEF6F5",
        "master" : "#F6CEF5",
        "grandmaster" : "#F6D8CE",
        "challenger" : "#F5F6CE"
    }
    // const bgColor2 = myData.teamEarlySurrendered ? "#F2F2F2" : (myData.win ? "#CEF6EC" : "#F6D8CE")
    return (
    <ScrollView
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        >
            <LinearGradient style={styles.profile2}
            colors={["#ffffff", bgColor[rankData ? rankData.tier.toLowerCase() : 0],"#ffffff"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}>
                
                <Text style={{ marginTop: 10, fontSize: 15, fontWeight: 500 }}>솔로랭크</Text>
                {rankData ?
                    <View style={styles.profile2}>
                        <Image
                            source={{ uri: `https://z.fow.kr/img/emblem/${rankData.tier.toLowerCase()}.png` }}
                            style={{ width: 100, height: 100, marginTop: 15 }}
                        />
                        <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 500 }}>{rankData.tier} {rankData.rank} {rankData.leaguePoints}LP</Text>
                        <Text style={{ marginTop: 10, fontSize: 15 }}>{rankData.wins}승 {rankData.losses}패 승률 {(rankData.wins / (rankData.wins + rankData.losses) * 100).toFixed(2)}%</Text>
                    </View> : <View style={styles.profile2}>
                        <Image
                            source={{ uri: `https://z.fow.kr/img/emblem/unranked.png` }}
                            style={{ width: 100, height: 100, marginTop: 15 }}
                        />
                        <Text style={{ marginTop: 20, fontSize: 15, fontWeight: 500 }}>언랭</Text>
                    </View>
                }
            </LinearGradient>
            <LinearGradient style={styles.profile2}
            colors={["#ffffff", bgColor[flexData ? flexData.tier.toLowerCase() : 0],"#ffffff"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}>
                <Text style={{ marginTop: 20, fontSize: 15, fontWeight: 500 }}>자유랭크</Text>
                {flexData ? <View style={styles.profile2}>
                    <Image
                        source={{ uri: `https://z.fow.kr/img/emblem/${flexData.tier.toLowerCase()}.png` }}
                        style={{ width: 100, height: 100, marginTop: 15 }}
                    />
                    <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 500 }}>{flexData.tier} {flexData.rank} {flexData.leaguePoints}LP</Text>
                    <Text style={{ marginTop: 10, fontSize: 15 }}>{flexData.wins}승 {flexData.losses}패 승률 {(flexData.wins / (flexData.wins + flexData.losses) * 100).toFixed(2)}%</Text>
                </View> : <View style={styles.profile2}>
                    <Image
                        source={{ uri: `https://z.fow.kr/img/emblem/unranked.png` }}
                        style={{ width: 100, height: 100, marginTop: 15 }}
                    />
                    <Text style={{ marginTop: 20, fontSize: 15, fontWeight: 500 }}>언랭</Text>

                </View>}
            </LinearGradient>
        </ScrollView>
    )
}

export default Rank