import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity, Modal, Button, TouchableWithoutFeedback, Dimensions } from 'react-native';
import styles from './styles'
import { useState } from 'react';

const Matches = ({ gameData, id }) => {
    //const gameDataKeys = Object.keys(gameData);
    const [k, setK] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedModalData, setSelectedModalData] = useState(null);
    const openModal = (index) => {
        setSelectedModalData(gameData[index]);
        setModalVisible(true);
    };
    const closeModal = () => setModalVisible(false);
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
            <View style={styles.typeButtons}>
                <TouchableOpacity onPress={setKSolo} style={styles.typeButton}>
                    <Text style={styles.buttonsFont}>솔로랭크</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={setKFlex} style={styles.typeButton}>
                    <Text style={styles.buttonsFont}>자유랭크</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={setKAram} style={styles.typeButton}>
                    <Text style={styles.buttonsFont}>무작위 총력전</Text>
                </TouchableOpacity>

            </View>
            {gameData.map((gameData, index) => {
                const time = new Date(gameData.gameEndTimestamp).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', month: 'long', day: 'numeric' })
                const myData = gameData.participants.filter((value) => value.summonerId == id)[0]

                if (!myData) { return }
                if (k && gameData.queueId !== k) { return }
                // if (myData.length >= 20) {
                //     myData.splice(20);
                //   }

                const bgColor = myData.teamEarlySurrendered ? styles.grayBg : (myData.win ? styles.blueBg : styles.redBg)
                return (
                    <View key={index}>
                        <TouchableOpacity key={index} style={[styles.match, bgColor]} onPress={() => openModal(index)}>
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
                                            <Text>  {myData.teamEarlySurrendered ? "무효" : (myData.win ? "승리" : "패배")}</Text>
                                        </Text>
                                    </View>
                                    <Text style={{ marginTop: 5 }}>{gameData.queueId == "420" ? "솔로랭크" : (gameData.queueId == "440" ? "자유랭크" : "무작위 총력전")}</Text>
                                </View>
                            </View>
                            <View>
                                <Text> {time}</Text>
                            </View>
                        </TouchableOpacity>
                        <Modal
                            animationType="fade" // 모달이 열릴 때 애니메이션 유형 설정 (slide, fade 등)
                            transparent={true}   // 모달이 투명하게 보일지 여부 (true면 배경 투명)
                            visible={modalVisible} // 모달의 가시성 상태
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <ScrollView horizontal pagingEnabled>
                                        <View>
                                            {selectedModalData && selectedModalData.participants.map((data, index) => (
                                                <View key={index} style={{flexDirection: "row"}}>

                                                <View style={{ marginVertical: 5, width: Dimensions.get('window').width * 0.9 - 10, marginHorizontal: 5}}>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                        <View style={{ flexDirection: "row" }}>
                                                            <Image
                                                                source={{ uri: `https://z.fow.kr/champ/${data.championId}_64.png` }}
                                                                style={{ width: 35, height: 35 }}
                                                            />
                                                            <View style={{ marginLeft: 3 }}>
                                                                <Image
                                                                    source={{ uri: `https://z.fow.kr/spell/${data.summoner1Id}.png` }}
                                                                    style={{ width: 17.5, height: 17.5 }}
                                                                />
                                                                <Image
                                                                    source={{ uri: `https://z.fow.kr/spell/${data.summoner2Id}.png` }}
                                                                    style={{ width: 17.5, height: 17.5 }}
                                                                />

                                                            </View>
                                                            <View style={{ marginLeft: 3 }}>
                                                                <Image
                                                                    source={{ uri: `https://z.fow.kr/img/perk/${data.perks.styles[0].selections[0].perk}.png?v=3` }}
                                                                    style={{ width: 15, height: 15, marginVertical: 1.25 }}
                                                                />
                                                                <Image
                                                                    source={{ uri: `https://z.fow.kr/img/perk/${data.perks.styles[1].style}.png?v=3` }}
                                                                    style={{ width: 15, height: 15, marginVertical: 1.25 }}
                                                                />

                                                            </View>
                                                            <View style={{ flexDirection: "column" }}>
                                                                <Text style={{ fontSize: 12 }}> {data.summonerName}</Text>
                                                                <Text style={{ fontSize: 12 }}> {data.kills} / {data.deaths} / {data.assists}  CS {data.totalMinionsKilled}  KDA {((data.kills + data.assists) / data.deaths).toFixed(2)} </Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ flexDirection: 'column' }}>
                                                            <View style={{ flexDirection: "row" }}>
                                                                {[0, 1, 2, 6].map((itemIndex) => (
                                                                    <Image
                                                                        key={itemIndex}
                                                                        source={{ uri: `https://z.fow.kr/items3/${data[`item${itemIndex}`]}.png` }}
                                                                        style={{ width: 17.5, height: 17.5 }}
                                                                    />
                                                                ))}
                                                            </View>
                                                            <View style={{ flexDirection: "row" }}>
                                                                {[3, 4, 5].map((itemIndex) => (
                                                                    <Image
                                                                        key={itemIndex}
                                                                        source={{ uri: `https://z.fow.kr/items3/${data[`item${itemIndex}`]}.png` }}
                                                                        style={{ width: 17.5, height: 17.5 }}
                                                                    />))}
                                                            </View>
                                                        </View>

                                                    </View>
                                                </View>
                                                <View style={{ marginVertical: 5, width: Dimensions.get('window').width * 0.9 - 10, marginHorizontal: 5}}>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                        <View style={{ flexDirection: "row" }}>
                                                            <Image
                                                                source={{ uri: `https://z.fow.kr/champ/${data.championId}_64.png` }}
                                                                style={{ width: 35, height: 35 }}
                                                            />
                                                            <View style={{ marginLeft: 3 }}>
                                                                <Image
                                                                    source={{ uri: `https://z.fow.kr/spell/${data.summoner1Id}.png` }}
                                                                    style={{ width: 17.5, height: 17.5 }}
                                                                />
                                                                <Image
                                                                    source={{ uri: `https://z.fow.kr/spell/${data.summoner2Id}.png` }}
                                                                    style={{ width: 17.5, height: 17.5 }}
                                                                />

                                                            </View>
                                                            <View style={{ marginLeft: 3 }}>
                                                                <Image
                                                                    source={{ uri: `https://z.fow.kr/img/perk/${data.perks.styles[0].selections[0].perk}.png?v=3` }}
                                                                    style={{ width: 15, height: 15, marginVertical: 1.25 }}
                                                                />
                                                                <Image
                                                                    source={{ uri: `https://z.fow.kr/img/perk/${data.perks.styles[1].style}.png?v=3` }}
                                                                    style={{ width: 15, height: 15, marginVertical: 1.25 }}
                                                                />

                                                            </View>
                                                            <View style={{ flexDirection: "column" }}>
                                                                <Text style={{ fontSize: 12 }}> {data.summonerName}</Text>
                                                                <Text style={{ fontSize: 12 }}> {data.kills} / {data.deaths} / {data.assists}  CS {data.totalMinionsKilled}  KDA {((data.kills + data.assists) / data.deaths).toFixed(2)} </Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ flexDirection: 'column' }}>
                                                            <View style={{ flexDirection: "row" }}>
                                                                {[0, 1, 2, 6].map((itemIndex) => (
                                                                    <Image
                                                                        key={itemIndex}
                                                                        source={{ uri: `https://z.fow.kr/items3/${data[`item${itemIndex}`]}.png` }}
                                                                        style={{ width: 17.5, height: 17.5 }}
                                                                    />
                                                                ))}
                                                            </View>
                                                            <View style={{ flexDirection: "row" }}>
                                                                {[3, 4, 5].map((itemIndex) => (
                                                                    <Image
                                                                        key={itemIndex}
                                                                        source={{ uri: `https://z.fow.kr/items3/${data[`item${itemIndex}`]}.png` }}
                                                                        style={{ width: 17.5, height: 17.5 }}
                                                                    />))}
                                                            </View>
                                                        </View>

                                                    </View>
                                                </View>
                                                </View>



                                            ))}

                                        </View>
                                        


                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )
            }
            )}
        </View>
    )
}

export default Matches