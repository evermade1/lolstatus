import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity, Modal, Button, TouchableWithoutFeedback, Dimensions, Pressable } from 'react-native';
import styles from './styles';

const Badge = ({myData, gameData}) => {
    return (
        <View style={{ flexDirection: "row", marginLeft: 5, flexWrap: "wrap", width: 120 }}>
    {myData.doubleKills !== 0 && myData.tripleKills == 0 ? <View style={{ ...styles.badge, backgroundColor: "#FA5858"}}><Text style={{ fontSize: 10, color: "white" }}>더블킬</Text></View> : null}
    {myData.tripleKills !== 0 && myData.quadraKills == 0 ? <View style={{ ...styles.badge, backgroundColor: "#FE2E2E"}}><Text style={{ fontSize: 10, color: "white" }}>트리플킬</Text></View> : null}
    {myData.quadraKills !== 0 && myData.pentaKills == 0 ? <View style={{ ...styles.badge, backgroundColor: "#DF0101"}}><Text style={{ fontSize: 10, color: "white" }}>쿼드라킬</Text></View> : null}
    {myData.pentaKills !== 0 ? <View style={{ ...styles.badge, backgroundColor: "#B40404"}}><Text style={{ fontSize: 10, color: "white" }}>펜타킬</Text></View> : null}
    {myData.firstBloodKill ? <View style={{ ...styles.badge, backgroundColor: "red"}}><Text style={{ fontSize: 10, color: "white" }}>퍼블</Text></View> : null}
    {myData.firstTowerKill ? <View style={{ ...styles.badge, backgroundColor: "#5882FA"}}><Text style={{ fontSize: 10, color: "white" }}>포블</Text></View> : null}
    {myData.challenges && myData.challenges.soloKills ? <View style={{ ...styles.badge, backgroundColor: "#8904B1"}}><Text style={{ fontSize: 10, color: "white" }}>솔킬{myData.challenges.soloKills}회</Text></View> : null}
    {gameData.participants.slice().sort((a, b) => b.totalDamageDealtToChampions - a.totalDamageDealtToChampions)[0].totalDamageDealtToChampions === myData.totalDamageDealtToChampions ? <View style={{ ...styles.badge, backgroundColor: "red"}}><Text style={{ fontSize: 10, color: "white" }}>딜신</Text></View> : null}
    {gameData.participants.slice().sort((a, b) => b.goldEarned - a.goldEarned)[0].goldEarned === myData.goldEarned ? <View style={{ ...styles.badge, backgroundColor: "#FFBF00"}}><Text style={{ fontSize: 10, color: "white" }}>갑부</Text></View> : null}
    {gameData.participants.slice().sort((a, b) => b.kills - a.kills)[0].kills === myData.kills ? <View style={{...styles.badge, backgroundColor: "red"}}><Text style={{ fontSize: 10, color: "white" }}>학살자</Text></View> : null}
    {gameData.participants.slice().sort((a, b) => b.champExperience - a.champExperience)[0].champExperience === myData.champExperience ? <View style={{ ...styles.badge, backgroundColor: "#86B404"}}><Text style={{ fontSize: 10, color: "white" }}>경험자</Text></View> : null}
    {myData.challenges && gameData.participants.slice().sort((a, b) => b.challenges.skillshotsHit - a.challenges.skillshotsHit)[0].challenges.skillshotsHit === myData.challenges.skillshotsHit ? <View style={{ ...styles.badge, backgroundColor: "#0174DF"}}><Text style={{ fontSize: 10, color: "white" }}>저격수</Text></View> : null}
    {myData.challenges && gameData.participants.slice().sort((a, b) => b.challenges.skillshotsDodged - a.challenges.skillshotsDodged)[0].challenges.skillshotsDodged === myData.challenges.skillshotsDodged ? <View style={{ ...styles.badge, backgroundColor: "#088A29"}}><Text style={{ fontSize: 10, color: "white" }}>무희</Text></View> : null}
    </View>
    )
}

export default Badge