import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View, TextInput, Image, TouchableOpacity, Keyboard, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
import Profile from './Profile'
import Rank from './Rank'
import Active from './Active';
import Matches from './Matches';
import styles from './styles'


export default function App() {
  const [API_KEY, setAPI_KEY] = useState("RGAPI-493e95ac-3e67-4b0f-9f88-957993a01f1d")
  const [api, setApi] = useState(null) //api 입력 화면 여부
  const [ok, setOk] = useState("") //초기상태 여부
  const [text, setText] = useState("") //소환사명 입력값
  const [text1, setText1] = useState("") //api 입력값
  const [summonerData, setSummonerData] = useState(null) //소환사 이름, 레벨 등 정보
  const [rankData, setRankData] = useState(null) //솔로랭크 정보
  const [flexData, setFlexData] = useState(null) //자유랭크 정보
  const [gameData, setGameData] = useState([]) //최근 전적
  const [activeData, setActiveData] = useState([]) //인게임 정보


  const reset = () => {
    setOk("")
    setSummonerData(null)
    setRankData(null)
    setFlexData(null)
    setGameData([])
    setActiveData([])
  } // 데이터 리셋 함수
  const apiVisible = () => {
    api ? setApi(null) : setApi("1")
  } // api 입력 화면 여부
  const sendApiKey = () => {
    setAPI_KEY(text1)
  } // 입력한 api_key를 저장하는 함수
  const searchFunction = async (name) => {
    const previousJson = summonerData
    const response = await fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`)
    const json = await response.json()
    setSummonerData(json)
    if (json.hasOwnProperty("status")) {
      setSummonerData(previousJson)
      Alert.alert(
        "등록된 소환사가 없습니다.",
        "소환사 아이디를 확인해 주세요.",
        [{
          text: "확인",
          style: "default"
        }]
      );
    }

    else {
      setOk("1")
      // setSummonerData(null)
      setRankData(null)
      setFlexData(null)
      setGameData([])
      setActiveData([])
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
      if (!json4.hasOwnProperty("status")) { setActiveData(json4) }
      const solo = json1.filter(obj => obj.queueType === "RANKED_SOLO_5x5")
      setRankData(solo[0])
      const flex = json1.filter(obj => obj.queueType === "RANKED_FLEX_SR")
      setFlexData(flex[0])
    }
  } // 검색하는 함수
  const sendSummonerName = async () => {
    Keyboard.dismiss()
    await searchFunction(text)
    setText("")
  } // 사용자가 닉네임 입력 후 버튼 클릭 시 정리 + searchFunction 실행
  const onChangeText = (name) => {
    setText(name)
  } // 글자 입력시마다 text에 반영
  const onChangeText1 = (value) => {
    setText1(value)
  } // 글자 입력시마다 text에 반영 (api)
  const handleButtonPress = async (dataFromMatches) => {
    await searchFunction(dataFromMatches)
  } // Matches.js에서 선택 검색 시 해당 데이터로 searchFunction 실행

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
          placeholder='소환사명을 입력하세요.'
          returnKeyType="search" />
        <TouchableOpacity style={styles.searchButton} onPress={sendSummonerName}>
          <Text>검색</Text>
        </TouchableOpacity>
      </View>
      {summonerData !== null && !summonerData.hasOwnProperty("status") ? // summonerData가 제대로 있는 경우
        (<ScrollView style={styles.datas}>
          <Profile summonerData={summonerData} />
          <Rank rankData={rankData} flexData={flexData} />
          <Active activeData={activeData} />
          <Matches gameData={gameData} id={summonerData.id} onButtonPress={handleButtonPress} />
        </ScrollView>)
        : // summonerData가 없거나 유효하지 않은 경우
        (ok !== "" ? null // 검색 이후임에도 데이터가 없거나 유효하지 않은 경우 - Alert
        : // 검색하기 전(초기값)이라 데이터가 없는 경우
          <View style={{ alignItems: "center" }}>
            {api &&
              <View style={{ ...styles.topBar, margin: 15, marginLeft: 25 }}>
                <TextInput style={styles.button}
                  onSubmitEditing={sendApiKey}
                  onChangeText={onChangeText1}
                  value={text1}
                  placeholder='API KEY를 입력하세요.' />
                <TouchableOpacity style={styles.searchButton} onPress={sendApiKey}>
                  <Text>완료</Text>
                </TouchableOpacity>
              </View>}
            <TouchableOpacity onPress={apiVisible} style={{ marginTop: 150 }}>
              <Image
                source={{ uri: `https://pbs.twimg.com/media/Elq3NXrU8AAK3Xq.jpg` }}
                style={{ width: 200, height: 210, borderRadius: 15, marginRight: 15 }} />
            </TouchableOpacity>
          </View>)}
      <StatusBar style="auto" />
    </View>
  )
}
