import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View, TextInput, Image, TouchableOpacity, Keyboard, ScrollView, TouchableWithoutFeedback, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import Profile from './Profile'
import Rank from './Rank'
import Active from './Active';
import Matches from './Matches';
import styles from './styles'
import SearchHistory from './SearchHistory';


export default function App() {
  const [API_KEY, setAPI_KEY] = useState("RGAPI-c7137c95-74be-49c0-9340-c9815f791e45")
  const [api, setApi] = useState(null) //api 입력 화면 여부
  const [ok, setOk] = useState("") //초기상태 여부
  const [text, setText] = useState("") //소환사명 입력값
  const [text1, setText1] = useState("") //api 입력값
  const [summonerData, setSummonerData] = useState(null) //소환사 이름, 레벨 등 정보
  const [rankData, setRankData] = useState(null) //솔로랭크 정보
  const [flexData, setFlexData] = useState(null) //자유랭크 정보
  const [gameData, setGameData] = useState([]) //최근 전적
  const [activeData, setActiveData] = useState([]) //인게임 정보

  const [searchHistory, setSearchHistory] = useState([]); //검색기록 리스트
  const [isSearchHistoryVisible, setSearchHistoryVisible] = useState(false); //검색기록 화면 여부

  
  const saveSearchHistory = async (searchTerm) => {
    const searchHistory = await AsyncStorage.getItem('searchHistory');
    let history = [];
    if (searchHistory) {
      history = JSON.parse(searchHistory);
    }
    // 중복 검색어 제거를 위한 처리
    history = history.filter(item => item.name !== searchTerm.name);
    // 최대 10개의 검색 기록 유지
    if (history.length >= 10) {
      history.pop();
    }
    history.unshift(searchTerm);
    await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
  } // 검색기록 저장
  const getSearchHistory = async () => {
    const searchHistory = await AsyncStorage.getItem('searchHistory');
    return searchHistory ? JSON.parse(searchHistory) : [];
  } // 검색기록 불러오기
  const openSearchHistory = () => {
    Keyboard.dismiss()
    if(!isSearchHistoryVisible){loadSearchHistory()}
    setSearchHistoryVisible(!isSearchHistoryVisible)
  } // 검색기록 창 열고닫기 ('검색기록' 버튼 전용)
  const closeSearchHistory = () => {
    setSearchHistoryVisible(false)
    Keyboard.dismiss()
  } // 검색기록 창 닫기 (검색기록 창 내의 X 버튼 전용)
  const loadSearchHistory = async () => {
    const history = await getSearchHistory();
    setSearchHistory(history);
  }; // 검색기록 불러와서 searchHistory에 넣기
  const removeValueFromSearchHistory = async (valueToRemove) => {
    const searchHistory = await AsyncStorage.getItem('searchHistory');
    if (searchHistory) {
      const updatedHistory = JSON.parse(searchHistory).filter(item => item.name !== valueToRemove.name);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      setSearchHistory(updatedHistory)
    }
  } // 검색기록 하나씩 지우기
  const clearSearchStorage = async () => {
      await AsyncStorage.clear();
      setSearchHistoryVisible(false)
  } // 검색기록 초기화
  
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
      saveSearchHistory(json)
      setSearchHistoryVisible(false)
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
    setSearchHistoryVisible(false)
    console.log(dataFromMatches)
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
          returnKeyType="search"
          />
        <TouchableOpacity style={styles.searchButton} onPress={sendSummonerName}>
          <Text>검색</Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: "row"}}>
        <TouchableOpacity style={{marginTop: 10, borderRightWidth: 1, paddingHorizontal: 71}} onPress={openSearchHistory}><Text style={{color: "#424242", fontWeight: 600}}>검색기록</Text></TouchableOpacity>
        <TouchableOpacity style={{marginHorizontal: 70, marginTop: 10}} onPress={clearSearchStorage}><Text style={{color: "#424242", fontWeight: 600}}>즐겨찾기</Text></TouchableOpacity>
      </View>

      {isSearchHistoryVisible && (
       <View style={{backgroundColor: "white", padding: 10, margin: 10}}>
        <SearchHistory searchHistory={searchHistory} handleButtonPress={handleButtonPress} removeValueFromSearchHistory={removeValueFromSearchHistory} />
        <View style={{flexDirection: 'row', justifyContent: "space-between", marginTop: 10 }}>
            <TouchableOpacity onPress={clearSearchStorage}><Text style={{color: "#585858", fontSize: 12, fontWeight: 600, marginLeft: 10}}>검색 기록 삭제</Text></TouchableOpacity>
            <TouchableOpacity onPress={closeSearchHistory}><Text style={{color: "#585858", fontSize: 12, fontWeight: 600, marginRight: 10}}>닫기</Text></TouchableOpacity>
          </View>
        </View>
        
        
      )}
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
