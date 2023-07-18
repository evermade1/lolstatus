import { StyleSheet, Text, View, TextInput, Image, ScrollView } from 'react-native';
import styles from './styles'
import { useState } from 'react';

const Matches = ({ gameData, name }) => {
    //const gameDataKeys = Object.keys(gameData);
    gameData.sort(function (a, b) {
        return b.gameCreation - a.gameCreation;
    });
    return (
        <View style={{ marginTop: 20, paddingHorizontal: 30, marginBottom: 100 }}>
            {gameData.map((gameData, index) => {
                const time = new Date(gameData.gameEndTimestamp).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', month: 'long', day: 'numeric' })
                const myData = gameData.participants.filter((value) => value.summonerName.toLowerCase().replace(/ /g, "") == name.toLowerCase().replace(/ /g, ""))[0]
                if(!myData){return}
                const bgColor = myData.win ? styles.blueBg : styles.redBg;
                return (
                    <View key={index} style={[styles.match, bgColor]}>
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                source={{ uri: `https://z.fow.kr/champ/${myData.championId}_64.png` }}
                                style={{ width: 50, height: 50 }}
                            />
                            <View style={{ flexDirection: "column", marginLeft: 5 }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text>
                                        <Text>{myData.kills} /</Text>
                                        <Text> {myData.deaths} /</Text>
                                        <Text> {myData.assists}</Text>
                                        <Text>  {myData.win ? "승리" : "패배"}</Text>
                                    </Text>
                                </View>
                                <Text style={{ marginTop: 5 }}>{gameData.queueId == "420" ? "솔로랭크" : (gameData.queueId == "440" ? "자유랭크" : "무작위 총력전")}</Text>

                            </View>
                        </View>
                        <View>
                            <Text> {time}</Text>
                        </View>
                    </View>)
            }
            )}
        </View>
    )
}

export default Matches