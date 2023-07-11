import { StyleSheet, Text, View, TextInput, Image, ScrollView } from 'react-native';
import styles from './styles'
import { useState } from 'react';

const Matches = ({ gameData, rankData }) => {
    //const gameDataKeys = Object.keys(gameData);
    const nickname = rankData.summonerName
    return (
        <ScrollView style={{ marginTop: 20 }}>
            {gameData.map((gameData, index) => {
                const myData = gameData.participants.filter((value) => value.summonerName == nickname)[0]
                return (
                    <View key={index} style={{ flexDirection: "row", marginTop: 10 }}>
                        <Image
                            source={{ uri: `https://z.fow.kr/champ/${myData.championId}_64.png` }}
                            style={{ width: 50, height: 50 }}
                        />
                        <View style={{ flexDirection: "column"}}>
                        <View style={{ flexDirection: "row"}}>
                            <Text>  {myData.kills} /</Text>
                            <Text> {myData.deaths} /</Text>
                            <Text> {myData.assists}</Text>
                            <Text>   {myData.win ? "승리" : "패배"}</Text>
                        </View>

                        <Text style={{ marginTop: 5 }}> {gameData.gameMode === "CLASSIC" ? "솔로랭크" : "무작위 총력전"}</Text>
                        </View>
                    </View>)
            }
            )}
        </ScrollView>
    )
}

export default Matches