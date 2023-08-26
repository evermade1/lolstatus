import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View, TextInput, Image, TouchableOpacity, Keyboard, ScrollView, TouchableWithoutFeedback, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import Profile from './Profile'
import Rank from './Rank'
import Active from './Active';
import Matches from './Matches';
import styles from './styles';
import SearchHistory from './SearchHistory';
import Fav from './Fav';


export default function App() {
  const [API_KEY, setAPI_KEY] = useState("RGAPI-a5563d54-2b7b-4ffc-b063-9b789f6135a0")
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

  const [fav, setFav] = useState([]); //즐겨찾기 리스트
  const [isFavVisible, setFavVisible] = useState(false); //즐겨찾기 화면 여부
  const [nowFav, setNowFav] = useState(false)

  const [my, setMy] = useState([]); //즐겨찾기 리스트


  
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
    setFavVisible(false)
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
    setSearchHistoryVisible(false)
    const keys = await AsyncStorage.getAllKeys(); // 모든 키를 가져옵니다.
    const keysToDelete = keys.filter(key => key.startsWith('searchHistory'));
    await AsyncStorage.multiRemove(keysToDelete);
  };


  const saveFav = async (searchTerm) => {
    const fav = await AsyncStorage.getItem('fav');
    let favorite = [];
    if (fav) {
      favorite = JSON.parse(fav);
    }
    // 중복 검색어 제거를 위한 처리
    favorite = favorite.filter(item => item.name !== searchTerm.name);
    // // 최대 10개의 검색 기록 유지
    // if (favorite.length >= 10) {
    //   favorite.pop();
    // }
    favorite.unshift(searchTerm);
    await AsyncStorage.setItem('fav', JSON.stringify(favorite));
    setFav(favorite)
  } // 검색기록 저장
  const getFav = async () => {
    const fav = await AsyncStorage.getItem('fav');
    return fav ? JSON.parse(fav) : [];
  } // 검색기록 불러오기
  const openFav = () => {
    Keyboard.dismiss()
    if(!isFavVisible){loadFav()}
    setFavVisible(!isFavVisible)
    setSearchHistoryVisible(false)
  } // 검색기록 창 열고닫기 ('검색기록' 버튼 전용)
  const closeFav = () => {
    setFavVisible(false)
    Keyboard.dismiss()
  } // 검색기록 창 닫기 (검색기록 창 내의 X 버튼 전용)
  const loadFav = async () => {
    const favorite = await getFav();
    setFav(favorite);
  }; // 검색기록 불러와서 Fav에 넣기
  const removeValueFromFav = async (valueToRemove) => {
    const fav = await AsyncStorage.getItem('fav');
    if (fav) {
      const updatedFav = JSON.parse(fav).filter(item => item.name !== valueToRemove.name);
      await AsyncStorage.setItem('fav', JSON.stringify(updatedFav));
      setFav(updatedFav)
    }
  } // 검색기록 하나씩 지우기
  const clearFavStorage = async () => {
    setFavVisible(false)
    const keys = await AsyncStorage.getAllKeys(); // 모든 키를 가져옵니다.
    const keysToDelete = keys.filter(key => key.startsWith('fav'));
    await AsyncStorage.multiRemove(keysToDelete);
  };

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
  } // 검색기록 저장
  const getMy = async () => {
    const my = await AsyncStorage.getItem('my');
    return my ? JSON.parse(my) : [];
  } // 검색기록 불러오기
  const loadMy = async () => {
    const my = await getMy();
    if (my.length == 0) {
        Alert.alert(
          "저장된 내 데이터가 없습니다.",
          "내 데이터를 저장해 보세요.",
          [{
            text: "확인",
            style: "default"
          }]
        );
    } else {searchFunction(my[0].name)}
  }; // 검색기록 불러와서 Fav에 넣기
  const removeValueFromMy = async (valueToRemove) => {
    const my = await AsyncStorage.getItem('my');
    if (my) {
      const updatedMy = JSON.parse(my).filter(item => item.name !== valueToRemove.name);
      await AsyncStorage.setItem('my', JSON.stringify(updatedMy));
      setMy(updatedMy)
    }
  } // 검색기록 하나씩 지우기
  
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
      // saveFav(json)
      setSearchHistoryVisible(false)
      setFavVisible(false)
      setNowFav(false)
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

      <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
        <TouchableOpacity style={{marginTop: 10, marginHorizontal: 80}} onPress={openSearchHistory}><Octicons name="history" size={20} color="#424242" /></TouchableOpacity>
        <TouchableOpacity style={{marginTop: 10}} onPress={loadMy}><Octicons name="person" size={20} color="#424242" /></TouchableOpacity>
        <TouchableOpacity style={{marginHorizontal: 80, marginTop: 10}} onPress={openFav}><Octicons  name="star" size={20} color="#424242" /></TouchableOpacity>
      </View>

      {isSearchHistoryVisible && (
       <View style={{backgroundColor: "white", padding: 10, margin: 10}}>
        <SearchHistory searchHistory={searchHistory} handleButtonPress={handleButtonPress} removeValueFromSearchHistory={removeValueFromSearchHistory} />
        <View style={{flexDirection: 'row', justifyContent: "space-between", marginTop: 10 }}>
            <TouchableOpacity onPress={clearSearchStorage}><Text style={{color: "#585858", fontSize: 12, fontWeight: 600, marginLeft: 10}}>검색기록 전체 삭제</Text></TouchableOpacity>
            <TouchableOpacity onPress={closeSearchHistory}><Text style={{color: "#585858", fontSize: 12, fontWeight: 600, marginRight: 10}}>닫기</Text></TouchableOpacity>
          </View>
        </View>
        
        
      )}
      {isFavVisible && (
       <View style={{backgroundColor: "white", padding: 10, margin: 10}}>
        <Fav fav={fav} handleButtonPress={handleButtonPress} removeValueFromFav={removeValueFromFav} />
        <View style={{flexDirection: 'row', justifyContent: "space-between", marginTop: 10 }}>
            <TouchableOpacity onPress={clearFavStorage}><Text style={{color: "#585858", fontSize: 12, fontWeight: 600, marginLeft: 10}}>즐겨찾기 전체 삭제</Text></TouchableOpacity>
            <TouchableOpacity onPress={closeFav}><Text style={{color: "#585858", fontSize: 12, fontWeight: 600, marginRight: 10}}>닫기</Text></TouchableOpacity>
          </View>
        </View>
        
        
      )}
      {summonerData !== null && !summonerData.hasOwnProperty("status") ? // summonerData가 제대로 있는 경우
        (<ScrollView style={styles.datas}>
          <Profile summonerData={summonerData} saveFav={saveFav} removeValueFromFav={removeValueFromFav} saveMy={saveMy} removeValueFromMy={removeValueFromMy} />
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
