import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity, Modal, Button, TouchableWithoutFeedback, Dimensions, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import ProgressBar from './Progress';
import styles from './styles'
import { useState } from 'react';

const Matches = ({ gameData, id }) => {
    //const gameDataKeys = Object.keys(gameData);
    const QUEUETYPE = {
        400: '일반', //Normal Draft Pick
        420: '솔로랭크',
        430: '일반',
        440: '자유랭크',
        450: '무작위 총력전',
        700: '격전',
        800: 'ai',  // Deprecated
        810: 'ai',  // Deprecated
        820: 'ai',  // Deprecated
        830: 'ai',
        840: 'ai',
        850: 'ai',
        900: '우르프',
        920: '전설의 포로 왕',
        1020: '단일 챔피언',
        1300: 'nbg',
        1400: '궁극기 주문서', // Ultimate Spellbook
        1700: "아레나",
        2000: 'tut',
        2010: 'tut',
        2020: 'tut',
    }
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
    const handleModalPress = (event) => {
        // 모달 바깥 영역 클릭 시에만 모달을 닫도록 처리
        if (event.target === event.currentTarget) {
          closeModal();
        }
      };
    gameData.sort(function (a, b) {
        return b.gameCreation - a.gameCreation;
    });
    return (
        <View style={{ paddingHorizontal: 30, marginBottom: 100 }}>
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
                // const championName = gameData.championName
                // const championImageURI = `./assets/championImage/Ezreal.png`;
                return (
                    <View key={index}>
                        <TouchableOpacity key={index} style={[styles.match, bgColor]} onPress={() => openModal(index)}>
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    source={{ uri: `https://z.fow.kr/champ/${myData.championId}_64.png`}}
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
                                    <Text style={{ marginTop: 5 }}>{QUEUETYPE[gameData.queueId]}</Text>
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
                            onBackdropPress={closeModal}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <ScrollView horizontal pagingEnabled pointerEvents="box-none">
                                    <View>
                                    <View style={{height: 20, justifyContent: "center", alignItems: "center"}}><Text style={{fontWeight: 600}}>Overall</Text></View>
                                            {selectedModalData && selectedModalData.participants.map((data, index) =>
                                                (
                                                    
                                                    <View key={index} style={{ flexDirection: "row", backgroundColor: data.teamId === 100 ? "#CEECF5" : "#F6CECE", height: 51 }}>
                                                        <View style={{ margin: 5, width: Dimensions.get('window').width * 0.9 - 30 }}>
                                                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                                <View style={{ flexDirection: "row" }}>
                                                                    <Image
                                                                        source={{ uri: `https://z.fow.kr/champ/${data.championId}_64.png`}}
                                                                        style={{ width: 40, height: 40 }}
                                                                    />
                                                                    <View style={{ marginLeft: 3 }}>
                                                                        <Image
                                                                            source={{ uri: `https://z.fow.kr/spell/${data.summoner1Id}.png` }}
                                                                            style={{ width: 20, height: 20 }}
                                                                        />
                                                                        <Image
                                                                            source={{ uri: `https://z.fow.kr/spell/${data.summoner2Id}.png` }}
                                                                            style={{ width: 20, height: 20 }}
                                                                        />

                                                                    </View>
                                                                    <View style={{ marginLeft: 3 }}>
                                                                        <Image
                                                                            source={{ uri: `https://z.fow.kr/img/perk/${data.perks.styles[0].selections[0].perk}.png?v=3` }}
                                                                            style={{ width: 17.5, height: 17.5, marginVertical: 1.25 }}
                                                                        />
                                                                        <Image
                                                                            source={{ uri: `https://z.fow.kr/img/perk/${data.perks.styles[1].style}.png?v=3` }}
                                                                            style={{ width: 17.5, height: 17.5, marginVertical: 1.25 }}
                                                                        />

                                                                    </View>
                                                                    <View style={{ flexDirection: "column" }}>
                                                                        <Text style={{ fontSize: 11, fontWeight: 600 }}> {data.summonerName}</Text>
                                                                        <Text style={{ fontSize: 11 }}> {data.kills} / {data.deaths} / {data.assists}  CS {data.totalMinionsKilled}  KDA {((data.kills + data.assists) / data.deaths).toFixed(2)} </Text>
                                                                        <Text style={{ fontSize: 11 }}> {data.totalDamageDealtToChampions.toLocaleString()} {data.goldEarned.toLocaleString()}G 시야 {data.visionScore}</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={{ flexDirection: 'column' }}>
                                                                    <View style={{ flexDirection: "row" }}>
                                                                        {[0, 1, 2, 6].map((itemIndex) => (
                                                                            <Image
                                                                                key={itemIndex}
                                                                                source={{ uri: `https://z.fow.kr/items3/${data[`item${itemIndex}`]}.png` }}
                                                                                style={{ width: 20, height: 20 }}
                                                                            />
                                                                        ))}
                                                                    </View>
                                                                    <View style={{ flexDirection: "row" }}>
                                                                        {[3, 4, 5].map((itemIndex) => (
                                                                            <Image
                                                                                key={itemIndex}
                                                                                source={{ uri: `https://z.fow.kr/items3/${data[`item${itemIndex}`]}.png` }}
                                                                                style={{ width: 20, height: 20 }}
                                                                            />))}
                                                                    </View>
                                                                </View>

                                                            </View>
                                                        </View>
                                                        
                                                    </View>

                                                ))}

                                        </View>
                                        <View>
                                        <View style={{height: 20, justifyContent: "center", alignItems: "center"}}><Text style={{fontWeight: 600}}>딜량</Text></View>
                                            {selectedModalData && selectedModalData.participants.slice() // 새로운 배열을 생성하여 원본 배열을 변경하지 않도록 합니다.
                                                .sort((a, b) => b.totalDamageDealtToChampions - a.totalDamageDealtToChampions).map((data, index) =>
                                                (
                                                    <View key={index} style={{ flexDirection: "row", backgroundColor: data.teamId === 100 ? "#CEECF5" : "#F6CECE", height: 51 }}>
                                                        <View style={{ margin: 5, width: Dimensions.get('window').width * 0.9 - 30}}>
                                                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                                <View style={{ flexDirection: "row" }}>
                                                                    <Image
                                                                        source={{ uri: `https://z.fow.kr/champ/${data.championId}_64.png` }}
                                                                        style={{ width: 40, height: 40 }}
                                                                    />
                                                                    <View style={{ marginLeft: 3 }}>
                                                                        <Image
                                                                            source={{ uri: `https://z.fow.kr/spell/${data.summoner1Id}.png` }}
                                                                            style={{ width: 20, height: 20 }}
                                                                        />
                                                                        <Image
                                                                            source={{ uri: `https://z.fow.kr/spell/${data.summoner2Id}.png` }}
                                                                            style={{ width: 20, height: 20 }}SS
                                                                        />

                                                                    </View>
                                                                    <View style={{ marginLeft: 3 }}>
                                                                        <Image
                                                                            source={{ uri: `https://z.fow.kr/img/perk/${data.perks.styles[0].selections[0].perk}.png?v=3` }}
                                                                            style={{ width: 17.5, height: 17.5, marginVertical: 1.25 }}
                                                                        />
                                                                        <Image
                                                                            source={{ uri: `https://z.fow.kr/img/perk/${data.perks.styles[1].style}.png?v=3` }}
                                                                            style={{ width: 17.5, height: 17.5, marginVertical: 1.25 }}
                                                                        />

                                                                    </View>
                                                                    <View style={{ flexDirection: "column", width: "50%", marginLeft: 3 }}>
                                                                        <Text style={{ fontSize: 11, fontWeight: 600, marginBottom: 3 }}>{data.summonerName}</Text>
                                                                        <ProgressBar max={selectedModalData.participants.slice() // 새로운 배열을 생성하여 원본 배열을 변경하지 않도록 합니다.
                                                .sort((a, b) => b.totalDamageDealtToChampions - a.totalDamageDealtToChampions)[0].totalDamageDealtToChampions} value={data.totalDamageDealtToChampions} color={"#FA5858"} />
                                                                    </View>
                                                                </View>
                                                                <View style={{ flexDirection: 'column' }}>
                                                                    <View style={{ flexDirection: "row" }}>
                                                                        {[0, 1, 2, 6].map((itemIndex) => (
                                                                            <Image
                                                                                key={itemIndex}
                                                                                source={{ uri: `https://z.fow.kr/items3/${data[`item${itemIndex}`]}.png` }}
                                                                                style={{ width: 20, height: 20 }}
                                                                            />
                                                                        ))}
                                                                    </View>
                                                                    <View style={{ flexDirection: "row" }}>
                                                                        {[3, 4, 5].map((itemIndex) => (
                                                                            <Image
                                                                                key={itemIndex}
                                                                                source={{ uri: `https://z.fow.kr/items3/${data[`item${itemIndex}`]}.png` }}
                                                                                style={{ width: 20, height: 20 }}
                                                                            />))}
                                                                    </View>
                                                                </View>

                                                            </View>
                                                        </View>
                                                        
                                                    </View>

                                                ))}

                                        </View>
                                        <View>
                                            <View style={{height: 20, justifyContent: "center", alignItems: "center"}}><Text style={{fontWeight: 600}}>획득한 골드</Text></View>
                                        
                                            {selectedModalData && selectedModalData.participants.slice() // 새로운 배열을 생성하여 원본 배열을 변경하지 않도록 합니다.
                                                .sort((a, b) => b.goldEarned - a.goldEarned).map((data, index) =>
                                                // 여기
                                                (
                                                    <View key={index} style={{ flexDirection: "row", backgroundColor: data.teamId === 100 ? "#CEECF5" : "#F6CECE", height: 51 }}>
                                                        <View style={{ margin: 5, width: Dimensions.get('window').width * 0.9 - 30}}>
                                                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                                <View style={{ flexDirection: "row" }}>
                                                                    <Image
                                                                        source={{ uri: `https://z.fow.kr/champ/${data.championId}_64.png` }}
                                                                        style={{ width: 40, height: 40 }}
                                                                    />
                                                                    <View style={{ marginLeft: 3 }}>
                                                                        <Image
                                                                            source={{ uri: `https://z.fow.kr/spell/${data.summoner1Id}.png` }}
                                                                            style={{ width: 20, height: 20 }}
                                                                        />
                                                                        <Image
                                                                            source={{ uri: `https://z.fow.kr/spell/${data.summoner2Id}.png` }}
                                                                            style={{ width: 20, height: 20 }}
                                                                        />

                                                                    </View>
                                                                    <View style={{ marginLeft: 3 }}>
                                                                        <Image
                                                                            source={{ uri: `https://z.fow.kr/img/perk/${data.perks.styles[0].selections[0].perk}.png?v=3` }}
                                                                            style={{ width: 17.5, height: 17.5, marginVertical: 1.25 }}
                                                                        />
                                                                        <Image
                                                                            source={{ uri: `https://z.fow.kr/img/perk/${data.perks.styles[1].style}.png?v=3` }}
                                                                            style={{ width: 17.5, height: 17.5, marginVertical: 1.25 }}
                                                                        />

                                                                    </View>
                                                                    <View style={{ flexDirection: "column", width: "50%", marginLeft: 3 }}>
                                                                        <Text style={{ fontSize: 11, fontWeight: 600, marginBottom: 3 }}>{data.summonerName}</Text>
                                                                        <ProgressBar max={selectedModalData.participants.slice() // 새로운 배열을 생성하여 원본 배열을 변경하지 않도록 합니다.
                                                .sort((a, b) => b.goldEarned - a.goldEarned)[0].goldEarned} value={data.goldEarned} color={"#FACC2E"} />
                                                                    
                                                                    </View>
                                                                </View>
                                                                <View style={{ flexDirection: 'column' }}>
                                                                    <View style={{ flexDirection: "row" }}>
                                                                        {[0, 1, 2, 6].map((itemIndex) => (
                                                                            <Image
                                                                                key={itemIndex}
                                                                                source={{ uri: `https://z.fow.kr/items3/${data[`item${itemIndex}`]}.png` }}
                                                                                style={{ width: 20, height: 20 }}
                                                                            />
                                                                        ))}
                                                                    </View>
                                                                    <View style={{ flexDirection: "row" }}>
                                                                        {[3, 4, 5].map((itemIndex) => (
                                                                            <Image
                                                                                key={itemIndex}
                                                                                source={{ uri: `https://z.fow.kr/items3/${data[`item${itemIndex}`]}.png` }}
                                                                                style={{ width: 20, height: 20 }}
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