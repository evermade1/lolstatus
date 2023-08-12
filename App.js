import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Profile from './Profile'
import Rank from './Rank'
import Active from './Active';
import Matches from './Matches';
import styles from './styles'


export default function App() {
  const [API_KEY, setAPI_KEY] = useState("RGAPI-dcc0c285-4d2d-48ce-bba6-d5e4fec056b8")
  const [api, setApi] = useState(null)
  const [ok, setOk] = useState("")
  const [text, setText] = useState("")
  const [text1, setText1] = useState("")
  const [summonerName, setSummonerName] = useState("")
  const [summonerData, setSummonerData] = useState(null) //소환사 이름, 레벨 등 정보
  const [rankData, setRankData] = useState(null) //소환사 솔로랭크 정보
  const [flexData, setFlexData] = useState(null) //소환사 자유랭크 정보
  const [gameData, setGameData] = useState([]) //최근 전적
  const [activeData, setActiveData] = useState([])

  const reset = () => {
    setOk("")
    setSummonerData(null)
    setRankData(null)
    setFlexData(null)
    setGameData([])
    setActiveData([])
  }
  
  const apiVisible = () => {
    api ? setApi(null) : setApi("1")
  }
  const sendApiKey = () => {
    setAPI_KEY(text1)
  }
  const abc = async (name) => {
    setOk("1")
    setSummonerData(null)
    setRankData(null)
    setFlexData(null)
    setGameData([])
    setActiveData([])
    const response = await fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`)
    const json = await response.json()
    setSummonerData(json)
    // if (json.hasOwnProperty("status")) {
    //   setSummonerData(null)
    //   }
    
    // else{
    if (!json.hasOwnProperty("status")) {
      const response1 = await fetch(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${json.id}?api_key=${API_KEY}`)
      const json1 = await response1.json()
      const response2 = await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${json.puuid}/ids?start=0&count=30&api_key=${API_KEY}`)
      const json2 = await response2.json()
      json2.map(async (m) => {
        const response3 = await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/${m}?api_key=${API_KEY}`);
        const json3 = await response3.json();
        if (json3.info) {
          setGameData((prevGameData) => [...prevGameData, json3.info]);
        }
      });
      const response4 = await fetch(`https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${json.id}?api_key=${API_KEY}`)
      const json4 = await response4.json()
      if (!json4.hasOwnProperty("status")) {setActiveData(json4)}
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
  const onChangeText1 = (value) => {
    setText1(value)
  }
  const handleButtonPress = async (dataFromMatches) => {
    console.log(dataFromMatches);
    setSummonerName(dataFromMatches)
    await abc(dataFromMatches)
  };
  return (
    
    <View style={styles.container}>
      <TouchableWithoutFeedback style={styles.logo} onPress={reset}>
        <View style={styles.logo}>
        <Text style={styles.logofont}>MOO.GG</Text>
        </View>
      </TouchableWithoutFeedback>
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
      {summonerData !== null && !summonerData.hasOwnProperty("status") ? (
          <ScrollView style={styles.datas}>
            <Profile summonerData={summonerData} />
            <Rank rankData={rankData} flexData={flexData} />
            <Active activeData={activeData} />
            <Matches gameData={gameData} id={summonerData.id} onButtonPress={handleButtonPress} />
          </ScrollView>) 
       // rankData == null
       : (ok !== "" ? 
       (summonerData && summonerData.hasOwnProperty("status") ? <Text style={styles.errorPage}>등록된 소환사가 없습니다.</Text> : null ) : 
          <View style={{ alignItems: "center" }}>
            {api &&
            <View style={{ ...styles.topBar, margin: 15, marginLeft: 20 }}>
              <TextInput style={styles.button}
                onSubmitEditing={sendApiKey}
                onChangeText={onChangeText1}
                value={text1}
                placeholder='API KEY를 입력하세요.' />
              <TouchableOpacity style={styles.searchButton}
                onPress={sendApiKey}>
                <Text>완료</Text>
              </TouchableOpacity>
            </View>}
            <TouchableOpacity onPress={apiVisible}>
            <Image
              source={{ uri: `https://pbs.twimg.com/media/Elq3NXrU8AAK3Xq.jpg` }}
              style={{ marginTop: 150, width: 200, height: 210, borderRadius: 15, marginRight: 15 }} />
            </TouchableOpacity>
          </View>)} 
      
      <StatusBar style="auto" />
      
    </View>
  )
      }
