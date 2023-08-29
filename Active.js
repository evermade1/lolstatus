import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

const Active = ({ activeData }) => {
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

    return (
        <View>
        <View style={activeData.participants ? { padding: 10, margin: 10, backgroundColor: "lightgray", alignItems: "center", borderRadius: 10 } : null}>
            {activeData.participants &&
                <View style={{alignItems: "center"}}>
                    <Text style={{ margin: 3 }}>{QUEUETYPE[activeData.gameQueueConfigId]}</Text>
                    <Text style={{ margin: 3 }}>{Math.floor(activeData.gameLength / 60)}분 {activeData.gameLength % 60}초</Text>
                    <View style={{flexDirection: "row"}}>
                    {activeData.bannedChampions.slice(0,5).map((data,index) => 
                    <Image
                    key={index}
                    source={{ uri: `https://z.fow.kr/champ/${data.championId}_64.png` }}
                    style={{ width: 25, height: 25, margin: 3, borderColor: "#B40404", borderWidth: 1 }}                  
                />)}
                <View style={{marginHorizontal: 10}} />
                {activeData.bannedChampions.slice(5).map((data,index) => 
                    <Image
                    key={index}
                    source={{ uri: `https://z.fow.kr/champ/${data.championId}_64.png` }}
                    style={{ width: 25, height: 25, margin: 3, borderColor: "#B40404", borderWidth: 1 }}                  
                />)}
                
                </View>
                </View>}

            <View style={{flexDirection: "row"}}>
            <View style={{ width: "50%" }}>
                {activeData.participants && activeData.participants.slice(0, 5).map((data, index) =>
                (

                    <View key={index} style={{ flexDirection: "row", backgroundColor: data.teamId === 100 ? "#CEECF5" : "#F6CECE", height: 45, margin: 1 }}>
                        {/* <View style={{ margin: 5, width: Dimensions.get('window').width * 0.9 - 30 }}> */}
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            
                                <Image
                                    source={{ uri: `https://z.fow.kr/champ/${data.championId}_64.png` }}
                                    style={{ width: 40, height: 40, marginLeft: 3 }}
                                />
                                <View style={{ marginLeft: 3 }}>
                                    <Image
                                        source={{ uri: `https://z.fow.kr/spell/${data.spell1Id}.png` }}
                                        style={{ width: 20, height: 20 }}
                                    />
                                    <Image
                                        source={{ uri: `https://z.fow.kr/spell/${data.spell2Id}.png` }}
                                        style={{ width: 20, height: 20 }}
                                    />

                                </View>
                                <View style={{ marginLeft: 3 }}>
                                    <Image
                                        source={{ uri: `https://z.fow.kr/img/perk/${data.perks.perkIds[0]}.png?v=3` }}
                                        style={{ width: 17.5, height: 17.5, marginVertical: 1.25 }}
                                    />
                                    <Image
                                        source={{ uri: `https://z.fow.kr/img/perk/${data.perks.perkSubStyle}.png?v=3` }}
                                        style={{ width: 17.5, height: 17.5, marginVertical: 1.25 }}
                                    />

                                </View>
                                <View style={{ flexDirection: "column", width: "50%", marginLeft: 3 }}>
                                    <Text style={{ fontSize: 8, fontWeight: 600, marginBottom: 3 }}>{data.summonerName}</Text>
                                </View>

                            

                        </View>

                    </View>

                ))}
            </View>
            <View style={{ width: "50%" }}>
                {activeData.participants && activeData.participants.slice(5).map((data, index) =>
                (

                    <View key={index} style={{ flexDirection: "row", backgroundColor: data.teamId === 100 ? "#CEECF5" : "#F6CECE", height: 45, margin: 1, justifyContent: "flex-end" }}>
                        {/* <View style={{ margin: 5, width: Dimensions.get('window').width * 0.9 - 30 }}> */}
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>

                            <View style={{ flexDirection: "column", width: "50%", marginRight: 3 }}>
                                <Text style={{ fontSize: 8, fontWeight: 600, marginBottom: 3, textAlign: "right" }}>{data.summonerName}</Text>
                            </View>
                            <View style={{ marginRight: 3 }}>
                                <Image
                                    source={{ uri: `https://z.fow.kr/img/perk/${data.perks.perkIds[0]}.png?v=3` }}
                                    style={{ width: 17.5, height: 17.5, marginVertical: 1.25 }}
                                />
                                <Image
                                    source={{ uri: `https://z.fow.kr/img/perk/${data.perks.perkSubStyle}.png?v=3` }}
                                    style={{ width: 17.5, height: 17.5, marginVertical: 1.25 }}
                                />

                            </View>
                            <View style={{ marginRight: 3 }}>
                                <Image
                                    source={{ uri: `https://z.fow.kr/spell/${data.spell1Id}.png` }}
                                    style={{ width: 20, height: 20 }}
                                />
                                <Image
                                    source={{ uri: `https://z.fow.kr/spell/${data.spell2Id}.png` }}
                                    style={{ width: 20, height: 20 }}
                                />

                            </View>
                            <Image
                                source={{ uri: `https://z.fow.kr/champ/${data.championId}_64.png` }}
                                style={{ width: 40, height: 40, marginRight: 3 }}
                            />



                        </View>



                    </View>

                ))}
            </View>
            </View>
        </View>
        </View>
    )
}

export default Active;