import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles'
import { useState } from 'react';

const Matches = ({ gameData, id }) => {
    //const gameDataKeys = Object.keys(gameData);
    const [k,setK] = useState(null)
    const setKSolo = () => {
        setK(420)
    }
    const setKFlex = () => {
        setK(440)
    }
    const setKAram = () => {
        setK(450)
    }
    gameData.sort(function (a, b) {
        return b.gameCreation - a.gameCreation;
    });
    return (
        <View style={{ marginTop: 20, paddingHorizontal: 30, marginBottom: 100 }}>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={setKSolo}>
                <Text style={styles.buttonsFont}>솔로랭크</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={setKFlex}>
                <Text style={styles.buttonsFont}>자유랭크</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={setKAram}>
                <Text style={styles.buttonsFont}>무작위 총력전</Text>
              </TouchableOpacity>
              
            </View>
            {gameData.map((gameData, index) => {
                const time = new Date(gameData.gameEndTimestamp).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', month: 'long', day: 'numeric' })
                const myData = gameData.participants.filter((value) => value.summonerId == id)[0]
                
                if (!myData){return}
                if (k && gameData.queueId !== k){return}
                // if (myData.length >= 20) {
                //     myData.splice(20);
                //   }
                  
                const bgColor = myData.teamEarlySurrendered ? styles.grayBg : ( myData.win ? styles.blueBg : styles.redBg )
                return (
                    <TouchableOpacity key={index} style={[styles.match, bgColor]}>
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
                                        <Text>  {myData.teamEarlySurrendered ? "무효" : ( myData.win ? "승리" : "패배" )}</Text>
                                    </Text>
                                </View>
                                <Text style={{ marginTop: 5 }}>{gameData.queueId == "420" ? "솔로랭크" : (gameData.queueId == "440" ? "자유랭크" : "무작위 총력전")}</Text>

                            </View>
                        </View>
                        <View>
                            <Text> {time}</Text>
                        </View>
                    </TouchableOpacity>
                    )
            }
            )}
        </View>
    )
}

export default Matches