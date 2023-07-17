import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Profile from './Profile'
import Matches from './Matches';
import styles from './styles'

export const API_KEY = "RGAPI-bcd4ed82-a2ae-453b-b210-6b4ae8ca4069"

export default function App() {
  const [ok, setOk] = useState("")
  const [text, setText] = useState("")
  const [summonerName, setSummonerName] = useState("")
  const [summonerData, setSummonerData] = useState(null) //소환사 이름, 레벨 등 정보
  const [rankData, setRankData] = useState(null) //소환사 솔로랭크 정보
  const [flexData, setFlexData] = useState(null) //소환사 자유랭크 정보
  const [gameData, setGameData] = useState([]) //최근 전적
  const abc = async (name) => {
    setOk("1")
    setSummonerData(null)
    setRankData(null)
    setFlexData(null)
    setGameData([])
    const response = await fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`)
    const json = await response.json()
    setSummonerData(json)
    if (json.hasOwnProperty("status")) {
      setSummonerData(null)
      }
    
    else{
      const response1 = await fetch(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${json.id}?api_key=${API_KEY}`)
      const json1 = await response1.json()
      const response2 = await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${json.puuid}/ids?start=0&count=20&api_key=${API_KEY}`)
      const json2 = await response2.json()
      json2.map(async (m) => {
        const response3 = await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/${m}?api_key=${API_KEY}`);
        const json3 = await response3.json();
        if (json3.info) {
          setGameData((prevGameData) => [...prevGameData, json3.info]);
        }
      });
      const solo = json1.filter(obj => obj.queueType === "RANKED_SOLO_5x5")
      setRankData(solo[0])
      const flex = json1.filter(obj => obj.queueType === "RANKED_FLEX_SR")
      setFlexData(flex[0])
    }
    }
  const sendSummonerName = async () => {
    Keyboard.dismiss()
    setSummonerName(text)
    await abc(text)
    setText("")
  }
  const onChangeText = (name) => {
    setText(name)
  }
  return (
    
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logofont}>MOO.GG</Text>
      </View>
      <View style={styles.topBar}>
        <TextInput style={styles.button}
          onSubmitEditing={sendSummonerName}
          onChangeText={onChangeText}
          value={text}
          placeholder='소환사명을 입력하세요.' />
        <TouchableOpacity style={styles.searchButton}
        onPress={sendSummonerName}>
          <Text>검색</Text>
        </TouchableOpacity>
      </View>
      {summonerData !== null ? 
      (rankData !== null ? (rankData !== undefined ? (
          <ScrollView style={styles.datas}>
            <Profile rankData={rankData} flexData={flexData} summonerData={summonerData} />
            <Matches gameData={gameData} rankData={rankData} />
          </ScrollView>)
      : 
      <View style={styles.profile}>
      <Text>{summonerName} Lv.{summonerData.summonerLevel}</Text>
      <Text style={styles.errorPage}>최근 랭크 데이터가 없습니다.</Text>
      </View>) //rankData == undefined
      : null) // rankData == null
       : (ok !== "" ? <Text style={styles.errorPage}>등록된 소환사가 없습니다.</Text> : null)} 
      
      <StatusBar style="auto" />
      
    </View>
  )
      }
