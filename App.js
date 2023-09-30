import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View, TextInput, Image, TouchableOpacity, Keyboard, ScrollView, TouchableWithoutFeedback, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Octicons } from '@expo/vector-icons';
import Profile from './Profile'
import Rank from './Rank'
import Active from './Active';
import Matches from './Matches';
import styles from './styles';
import SearchHistory from './SearchHistory';
import Fav from './Fav';


export default function App() {
  const API_KEY = "RGAPI-6ce4dc81-2d2c-45ff-93d5-2e52f69ce22f"
  const [ok, setOk] = useState("") // 홈 화면 여부
  const [text, setText] = useState("") // 소환사명 입력값
  const [summonerData, setSummonerData] = useState(null) // 소환사 이름, 레벨 등 정보
  const [rankData, setRankData] = useState(null) // 솔로랭크 정보
  const [flexData, setFlexData] = useState(null) // 자유랭크 정보
  const [gameData, setGameData] = useState([]) // 최근 전적
  const [activeData, setActiveData] = useState([]) // 인게임 정보

  const [searchHistory, setSearchHistory] = useState([]); // 검색기록 리스트
  const [isSearchHistoryVisible, setSearchHistoryVisible] = useState(false); // 검색기록 화면 여부

  const [fav, setFav] = useState([]); // 즐겨찾기 리스트
  const [isFavVisible, setFavVisible] = useState(false); // 즐겨찾기 화면 여부
  
  const [isActiveVisible, setActiveVisible] = useState(false); // 인게임 정보 화면 여부
  const [isQueueListVisible, setQueueListVisible] = useState(false) // 게임 모드 화면 여부

  const queueIdData = [
    { id: null, name: '전체' },
    { id: 420, name: '솔로랭크' },
    { id: 440, name: '자유랭크' },
    { id: 430, name: '일반' },
    { id: 450, name: '무작위 총력전' },
    // ... 더 많은 아이템 데이터
  ] // 게임 모드

  
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
  const openAndCloseSearchHistory = () => {
    Keyboard.dismiss()
    if (!isSearchHistoryVisible) { loadSearchHistory() }
    setSearchHistoryVisible(!isSearchHistoryVisible)
    setFavVisible(false)
  } // 검색기록 창 열고닫기
  const loadSearchHistory = async () => {
    const searchHistory = await AsyncStorage.getItem('searchHistory');
    const history = searchHistory ? JSON.parse(searchHistory) : [];
    setSearchHistory(history);
  } // 검색기록 리스트 불러오기
  const removeValueFromSearchHistory = async (valueToRemove) => {
    const searchHistory = await AsyncStorage.getItem('searchHistory');
    if (searchHistory) {
      const updatedHistory = JSON.parse(searchHistory).filter(item => item.name !== valueToRemove.name);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      setSearchHistory(updatedHistory)
    }
  } // 검색기록 하나씩 지우기
  const clearSearchStorage = async () => {
    setSearchHistoryVisible(false)
    const keys = await AsyncStorage.getAllKeys(); // 모든 키를 가져옵니다.
    const keysToDelete = keys.filter(key => key.startsWith('searchHistory'));
    await AsyncStorage.multiRemove(keysToDelete);
  } // 검색기록 비우기

  const saveFav = async (searchTerm) => {
    const fav = await AsyncStorage.getItem('fav');
    let favorite = [];
    if (fav) {
      favorite = JSON.parse(fav);
    }
    // 중복 프로필 처리
    favorite = favorite.filter(item => item.name !== searchTerm.name);
    favorite.unshift(searchTerm);
    await AsyncStorage.setItem('fav', JSON.stringify(favorite));
    setFav(favorite)
  } // 즐겨찾기 저장
  const openAndCloseFav = () => {
    Keyboard.dismiss()
    if (!isFavVisible) { loadFav() }
    setFavVisible(!isFavVisible)
    setSearchHistoryVisible(false)
  } // 즐겨찾기 창 열고닫기
  const loadFav = async () => {
    const fav = await AsyncStorage.getItem('fav');
    const favorite = fav ? JSON.parse(fav) : [];
    setFav(favorite);
  } // 즐겨찾기 리스트 불러오기
  const removeValueFromFav = async (valueToRemove) => {
    const fav = await AsyncStorage.getItem('fav');
    if (fav) {
      const updatedFav = JSON.parse(fav).filter(item => item.name !== valueToRemove.name);
      await AsyncStorage.setItem('fav', JSON.stringify(updatedFav));
      setFav(updatedFav)
    }
  } // 즐겨찾기 하나씩 지우기
  const clearFavStorage = async () => {
    setFavVisible(false)
    const keys = await AsyncStorage.getAllKeys(); // 모든 키를 가져옵니다.
    const keysToDelete = keys.filter(key => key.startsWith('fav'));
    await AsyncStorage.multiRemove(keysToDelete);
  } // 즐겨찾기 비우기

  const saveMy = async (searchTerm) => {
    const my = await AsyncStorage.getItem('my');
    let mine = [];
    if (my) {
      mine = JSON.parse(my);
    }
    mine.unshift(searchTerm);
    if (mine.length > 1) {
      mine.pop();
    }
    await AsyncStorage.setItem('my', JSON.stringify(mine));
  } // 마이 프로필 저장
  const loadMy = async () => {
    Keyboard.dismiss()
    const my = await AsyncStorage.getItem('my');
    if (my) {
      const myData = JSON.parse(my);
      if (myData.length === 0) {
        Alert.alert(
          "저장된 내 데이터가 없습니다.",
          "내 데이터를 저장해 보세요.",
          [{
            text: "확인",
            style: "default"
          }]
        );
      } else {
        searchFunction(myData[0].name);
      }
    }
  } // 마이 프로필 불러와 바로 검색
  const removeValueFromMy = async (valueToRemove) => {
    const my = await AsyncStorage.getItem('my');
    if (my) {
      const updatedMy = JSON.parse(my).filter(item => item.name !== valueToRemove.name);
      await AsyncStorage.setItem('my', JSON.stringify(updatedMy));
    }
  } // 마이 프로필 삭제

  const handleActiveButtonClick = () => {
    setActiveVisible(!isActiveVisible);
  } // 인게임 정보 버튼 클릭
  const gameModeButtonClick = () => {
    setQueueListVisible(!isQueueListVisible)
  } // 게임 모드 버튼 클릭

  const reset = () => {
    Keyboard.dismiss()
    setOk("")
    setSummonerData(null)
    setRankData(null)
    setFlexData(null)
    setGameData([])
    setActiveData([])
    setSearchHistoryVisible(false)
    setFavVisible(false)
  } // 데이터 리셋 함수
  const searchFunction = async (name) => {
    const previousProfile = summonerData
    // 기본 프로필
    const profile = await (await fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`)).json();
    setSummonerData(profile)
    if (profile.hasOwnProperty("status")) {
      setSummonerData(previousProfile)
      Alert.alert(
        "등록된 소환사가 없습니다.",
        "소환사 아이디를 확인해 주세요.",
        [{
          text: "확인",
          style: "default"
        }]
      )
    }
    else {
      setOk("1")
      setRankData(null)
      setFlexData(null)
      setGameData([])
      setActiveData([])
      saveSearchHistory(profile)
      setSearchHistoryVisible(false)
      setFavVisible(false)
      setActiveVisible(false)
      setQueueListVisible(false)
      // 랭크 데이터
      const rank = await (await fetch(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${profile.id}?api_key=${API_KEY}`)).json()
      // 솔로랭크 데이터
      const solo = rank.filter(obj => obj.queueType === "RANKED_SOLO_5x5")
      setRankData(solo[0])
      // 자유랭크 데이터
      const flex = rank.filter(obj => obj.queueType === "RANKED_FLEX_SR")
      setFlexData(flex[0])
      // 매치 데이터
      const matches = await (await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${profile.puuid}/ids?start=0&count=30&api_key=${API_KEY}`)).json()
      matches.map(async (m) => {
        // 매치 각각의 데이터
        const match = await (await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/${m}?api_key=${API_KEY}`)).json();
        if (match.info) {
          setGameData((prevGameData) => [...prevGameData, match.info]);
        }
      });
      // 인게임 데이터
      const active = await (await fetch(`https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${profile.id}?api_key=${API_KEY}`)).json()
      if (!active.hasOwnProperty("status")) { setActiveData(active) }
    }
  } // 소환사 검색 함수
  const sendSummonerName = async () => {
    Keyboard.dismiss()
    await searchFunction(text)
    setText("")
  } // 사용자가 닉네임 입력 후 버튼 클릭 시 정리 + searchFunction 실행
  const onChangeText = (name) => {
    setText(name)
  } // 글자 입력시마다 text에 반영
  const handleButtonPress = async (dataFromMatches) => {
    setSearchHistoryVisible(false)
    await searchFunction(dataFromMatches)
  } // 클릭 검색 시 해당 데이터로 searchFunction 실행
  const matchFunctionForQueue = async (queueId) => {
    setQueueListVisible(false)
    setGameData([])
    if (queueId !== null) {
      const matches = await (await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerData.puuid}/ids?queue=${queueId}&start=0&count=30&api_key=${API_KEY}`)).json()
      matches.map(async (m) => {
        const match = await (await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/${m}?api_key=${API_KEY}`)).json();
        if (match.info) {
          setGameData((prevGameData) => [...prevGameData, match.info]);
        }
      });
    } // 특정 게임 모드
    else {
      const matches = await (await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerData.puuid}/ids?start=0&count=30&api_key=${API_KEY}`)).json()
      matches.map(async (m) => {
        const match = await (await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/${m}?api_key=${API_KEY}`)).json();
        if (match.info) {
          setGameData((prevGameData) => [...prevGameData, match.info]);
        }
      });
    } // 매치 전체

  } // 특정 게임 모드에 대한 매치 검색 

  return (
    <View style={styles.container}>

      {/* 로고 */}
      <TouchableWithoutFeedback style={styles.logo} onPress={reset}>
        {/* <View style={styles.logo}>
          <Text style={styles.logofont}>MOO.GG</Text>
        </View> */}
        <View style={styles.logo}>
          <Image
            source={require("./assets/2.png")} // 챔피언
            style={{ height: 50, resizeMode: "contain" }}
          />
        </View>
      </TouchableWithoutFeedback>

      {/* 검색창 */}
      <View style={styles.topBar}>
        <TextInput style={styles.button}
          onSubmitEditing={sendSummonerName}
          onChangeText={onChangeText}
          value={text}
          placeholder='소환사명을 입력하세요.'
          returnKeyType="search" />
        <TouchableOpacity style={styles.searchButton} onPress={sendSummonerName}>
          <Text style={{color: "white"}}>검색</Text>
        </TouchableOpacity>
      </View>

      {/* 버튼 */}
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <TouchableOpacity style={{ marginTop: 10, marginHorizontal: 80 }} onPress={openAndCloseSearchHistory}><Octicons name="history" size={20} color="#424242" /></TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 10 }} onPress={loadMy}><Octicons name="person" size={20} color="#424242" /></TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 80, marginTop: 10 }} onPress={openAndCloseFav}><Octicons name="star" size={20} color="#424242" /></TouchableOpacity>
      </View>

      {/* 검색기록 */}
      {isSearchHistoryVisible && (
        <View style={{ backgroundColor: "white", padding: 10, margin: 10 }}>
          <SearchHistory searchHistory={searchHistory} handleButtonPress={handleButtonPress} removeValueFromSearchHistory={removeValueFromSearchHistory} />
          <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 10 }}>
            <TouchableOpacity onPress={clearSearchStorage}><Text style={{ color: "#585858", fontSize: 12, fontWeight: 600, marginLeft: 10 }}>검색기록 전체 삭제</Text></TouchableOpacity>
            <TouchableOpacity onPress={openAndCloseSearchHistory}><Text style={{ color: "#585858", fontSize: 12, fontWeight: 600, marginRight: 10 }}>닫기</Text></TouchableOpacity>
          </View>
        </View>
      )}

      {/* 즐겨찾기 */}
      {isFavVisible && (
        <View style={{ backgroundColor: "white", padding: 10, margin: 10 }}>
          <Fav fav={fav} handleButtonPress={handleButtonPress} removeValueFromFav={removeValueFromFav} />
          <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 10 }}>
            <TouchableOpacity onPress={clearFavStorage}><Text style={{ color: "#585858", fontSize: 12, fontWeight: 600, marginLeft: 10 }}>즐겨찾기 전체 삭제</Text></TouchableOpacity>
            <TouchableOpacity onPress={openAndCloseFav}><Text style={{ color: "#585858", fontSize: 12, fontWeight: 600, marginRight: 10 }}>닫기</Text></TouchableOpacity>
          </View>
        </View>
      )}
      
      {/* 메인 화면 */}
      {summonerData !== null && !summonerData.hasOwnProperty("status") ? // summonerData가 제대로 있는 경우
        (<ScrollView style={styles.datas}>
          <Profile summonerData={summonerData} saveFav={saveFav} removeValueFromFav={removeValueFromFav} saveMy={saveMy} removeValueFromMy={removeValueFromMy} />
          <Rank rankData={rankData} flexData={flexData} />
          <View style={styles.activeAndQueueIdButtons}>
            <TouchableOpacity onPress={handleActiveButtonClick} style={{ ...styles.activeAndQueueIdButton}}>
              <Text style={styles.activeAndQueueIdButtonFont}>인게임 정보</Text>
            </TouchableOpacity>
            <View style={{borderRightWidth: 1.5, borderColor: "#424242"}} />
            <TouchableOpacity onPress={gameModeButtonClick} style={{ ...styles.activeAndQueueIdButton }}>
              <Text style={styles.activeAndQueueIdButtonFont}>게임 모드</Text>
            </TouchableOpacity>
          </View>
          {isActiveVisible && <Active activeData={activeData} />}
          {isQueueListVisible && <View>
        {queueIdData.map((item, index) => (
          <TouchableOpacity
            key={item.id} // key 추가 (각 요소는 고유한 key를 가져야 함)
            onPress={() => matchFunctionForQueue(item.id)}
            style={{ height: 40, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "#424242", fontSize: 12, fontWeight: "600" }}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>}
          <Matches gameData={gameData} id={summonerData.id} onButtonPress={handleButtonPress} />
        </ScrollView>)
        : // summonerData가 없거나 유효하지 않은 경우
        (ok !== "" ? null // 검색 이후임에도 데이터가 없거나 유효하지 않은 경우 - Alert
          : // 검색하기 전(초기값)이라 데이터가 없는 경우
          null)}
      <StatusBar style="auto" />
    </View>
  )
}
