import { StyleSheet, Text, View, TextInput, Image, ScrollView } from 'react-native';
import styles from './styles'
import { useState } from 'react';

const Matches = ({ gameData, rankData }) => {
    //const gameDataKeys = Object.keys(gameData);
    const nickname = rankData.summonerName
    return (
        <View style={{ marginTop: 20, paddingHorizontal: 30 }}>
            {gameData.map((gameData, index) => {
                const myData = gameData.participants.filter((value) => value.summonerName == nickname)[0]
                const bgColor = myData.win ? styles.blueBg : styles.redBg;
                return (
                    <View key={index} style={[styles.match, bgColor]}>
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
        </View>
    )
}

export default Matches