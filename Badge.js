import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

const Badge = ({myData, gameData}) => {
    return (
        <View style={{ flexDirection: "row", marginLeft: 5, flexWrap: "wrap", width: 135 }}>
    {myData.challenges && myData.challenges.kda && gameData.participants.slice().sort((a, b) => b.challenges.kda - a.challenges.kda)[0].challenges.kda === myData.challenges.kda ? <View style={{ ...styles.badge, backgroundColor: "#5882FA"}}><Text style={{...styles.badgeFont, color: "#FFFF00", textShadowColor: "#FACC2E"}}>MVP</Text></View> : null}
    {myData.doubleKills !== 0 && myData.tripleKills == 0 ? <View style={{ ...styles.badge, backgroundColor: "#FA5858"}}><Text style={styles.badgeFont}>더블킬</Text></View> : null}
    {myData.tripleKills !== 0 && myData.quadraKills == 0 ? <View style={{ ...styles.badge, backgroundColor: "#FE2E2E"}}><Text style={styles.badgeFont}>트리플킬</Text></View> : null}
    {myData.quadraKills !== 0 && myData.pentaKills == 0 ? <View style={{ ...styles.badge, backgroundColor: "#DF0101"}}><Text style={styles.badgeFont}>쿼드라킬</Text></View> : null}
    {myData.pentaKills !== 0 ? <View style={{ ...styles.badge, backgroundColor: "#B40404"}}><Text style={styles.badgeFont}>펜타킬</Text></View> : null}
    {myData.challenges && myData.challenges.legendaryCount !== 0 ? <View style={{ ...styles.badge, backgroundColor: "#FA5858"}}><Text style={{...styles.badgeFont, color: "black", textShadowColor: "gray" }}>전설</Text></View> : null}
    {myData.firstBloodKill ? <View style={{ ...styles.badge, backgroundColor: "red"}}><Text style={styles.badgeFont}>퍼블</Text></View> : null}
    {myData.firstTowerKill ? <View style={{ ...styles.badge, backgroundColor: "#5882FA"}}><Text style={styles.badgeFont}>포블</Text></View> : null}
    {myData.challenges && myData.challenges.soloKills ? <View style={{ ...styles.badge, backgroundColor: "#424242"}}><Text style={styles.badgeFont}>솔킬{myData.challenges.soloKills}회</Text></View> : null}
    {gameData.participants.slice().sort((a, b) => b.totalDamageDealtToChampions - a.totalDamageDealtToChampions)[0].totalDamageDealtToChampions === myData.totalDamageDealtToChampions ? <View style={{ ...styles.badge, backgroundColor: "red"}}><Text style={styles.badgeFont}>딜신</Text></View> : null}
    {gameData.participants.slice().sort((a, b) => b.goldEarned - a.goldEarned)[0].goldEarned === myData.goldEarned ? <View style={{ ...styles.badge, backgroundColor: "#FFBF00"}}><Text style={styles.badgeFont}>갑부</Text></View> : null}
    {gameData.participants.slice().sort((a, b) => b.kills - a.kills)[0].kills === myData.kills ? <View style={{...styles.badge, backgroundColor: "lightgray"}}><Text style={{...styles.badgeFont, color: "red", textShadowColor: "red"}}>학살자</Text></View> : null}
    {gameData.participants.slice().sort((a, b) => b.champExperience - a.champExperience)[0].champExperience === myData.champExperience ? <View style={{ ...styles.badge, backgroundColor: "#86B404"}}><Text style={styles.badgeFont}>경험자</Text></View> : null}
    {myData.challenges && gameData.participants.slice().sort((a, b) => b.challenges.skillshotsHit - a.challenges.skillshotsHit)[0].challenges.skillshotsHit === myData.challenges.skillshotsHit ? <View style={{ ...styles.badge, backgroundColor: "#0174DF"}}><Text style={styles.badgeFont}>저격수</Text></View> : null}
    {myData.challenges && gameData.participants.slice().sort((a, b) => b.challenges.skillshotsDodged - a.challenges.skillshotsDodged)[0].challenges.skillshotsDodged === myData.challenges.skillshotsDodged ? <View style={{ ...styles.badge, backgroundColor: "#088A29"}}><Text style={styles.badgeFont}>무희</Text></View> : null}
    {myData && gameData.participants.slice().sort((a, b) => b.totalHealsOnTeammates - a.totalHealsOnTeammates)[0].totalHealsOnTeammates === myData.totalHealsOnTeammates ? <View style={{ ...styles.badge, backgroundColor: "#A5DF00"}}><Text style={styles.badgeFont}>힐러</Text></View> : null}
    {myData && gameData.participants.slice().sort((a, b) => b.totalTimeCCDealt - a.totalTimeCCDealt)[0].totalTimeCCDealt === myData.totalTimeCCDealt ? <View style={{ ...styles.badge, backgroundColor: "#585858"}}><Text style={styles.badgeFont}>방해자</Text></View> : null}

    </View>
    )
}

export default Badge