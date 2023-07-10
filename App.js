import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import Profile from './Profile'
import styles from './styles'

const API_KEY = "RGAPI-cb9b33c2-0d6b-404b-af8a-0f07e6231310"

export default function App() {
  const [ok, setOk] = useState("")
  const [text, setText] = useState("")
  const [summonerName, setSummonerName] = useState("")
  const [summonerData, setSummonerData] = useState(null)
  const [rankData, setRankData] = useState(null)
  const abc = async (name) => {
    setOk("1")
    setSummonerData(null)
    setRankData(null)
    const response = await fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`)
    const json = await response.json()
    setSummonerData(json)
    if (json.hasOwnProperty("status")) {
      setSummonerData(null)
      }
    
    else{
      const response1 = await fetch(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${json.id}?api_key=${API_KEY}`)
      const json1 = await response1.json()
      const c = json1.filter(obj => obj.queueType === "RANKED_SOLO_5x5")
      setRankData(c[0])
        
    }
    }
    useEffect(() => {
      console.log(rankData);
    }, [rankData]);
  const sendSummonerName = async () => {
    
    setSummonerName(text)
    await abc(text)
  }
  const onChangeText = (name) => {
    setText(name)
  }
  return (
    <View style={styles.container}>
      <TextInput style={styles.button}
        onSubmitEditing={sendSummonerName}
        onChangeText={onChangeText}
        value={text}
        placeholder='소환사명을 입력하세요.' />
      {summonerData !== null ? 
      (rankData !== null ? (rankData !== undefined ? 
      <Profile rankData={rankData} summonerData={summonerData}/>
      : 
      <View style={styles.profile}>
      <Text>{summonerName} Lv.{summonerData.summonerLevel}</Text>
      <Text>최근 랭크 데이터가 없습니다.</Text>
      </View>) //rankData == undefined
      : null) // rankData == null
       : (ok !== "" ? <Text>등록된 소환사가 없습니다.</Text> : null)} 
      
      <StatusBar style="auto" />
    </View>
  )
      }
