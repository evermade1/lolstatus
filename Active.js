import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity, Modal, Button, TouchableWithoutFeedback, Dimensions, Pressable } from 'react-native';
import styles from './styles'; 

const Active = ({activeData}) => {
    return (
        <View style={{padding: 20}}>
            { activeData.participants && activeData.participants.map((data, index) =>
            (

                <View key={index} style={{ flexDirection: "row", backgroundColor: data.teamId === 100 ? "#CEECF5" : "#F6CECE", height: 51 }}>
                    <View style={{ margin: 5, width: Dimensions.get('window').width * 0.9 - 30 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    source={{ uri: `https://z.fow.kr/champ/${data.championId}_64.png` }}
                                    style={{ width: 40, height: 40 }}
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
                                {/* <View style={{ marginLeft: 3 }}>
                                    <Image
                                        source={{ uri: `https://z.fow.kr/img/perk/${data.perks.styles[0].selections[0].perk}.png?v=3` }}
                                        style={{ width: 17.5, height: 17.5, marginVertical: 1.25 }}
                                    />
                                    <Image
                                        source={{ uri: `https://z.fow.kr/img/perk/${data.perks.styles[1].style}.png?v=3` }}
                                        style={{ width: 17.5, height: 17.5, marginVertical: 1.25 }}
                                    />

                                </View> */}
                                <View style={{ flexDirection: "column", width: "50%", marginLeft: 3 }}>
                                                                        <Text style={{ fontSize: 11, fontWeight: 600, marginBottom: 3 }}>{data.summonerName}</Text>
                                                                        </View>
                                
                            </View>

                        </View>
                    </View>

                </View>

            ))}

        </View>
    )
}

export default Active;