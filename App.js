import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const API_KEY = "RGAPI-13fde9f9-0098-405b-84a0-4900fef8d128"

export default function App() {
  const [text, setText] = useState("")
  const [summonerName, setSummonerName] = useState("")
  const [summonerData, setSummonerData] = useState([])
  const [rankData, setRankData] = useState([])
  const abc = async (name) => {
    const response = await fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`)
    const json = await response.json()
    setSummonerData(json)
    if (json.hasOwnProperty("status")) {
      return
      }
    else{
      const response1 = await fetch(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${json.id}?api_key=${API_KEY}`)
      const json1 = await response1.json()
      setRankData(json1[0])
    }
    }
    useEffect(() => {
      console.log(rankData);
    }, [rankData]);
  const sendSummonerName = async () => {
    
    setSummonerName(text)
    await abc(text)
    setText("")
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
      {summonerData.hasOwnProperty("status") ? <Text>소환사가 존재하지 않습니다.</Text> :
        <View style={styles.profile}>
          <Text>{rankData.summonerName} Lv.{summonerData.summonerLevel}</Text>
          <Text>{rankData.tier} {rankData.rank} {rankData.leaguePoints}LP</Text>
        </View>
      }


      <StatusBar style="auto" />
    </View>
  )
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50
    // justifyContent: 'center',
  },
  button: {
    backgroundColor: "lightgray",
    padding: 20,
    borderRadius: 10
  },
  profile: {
    alignItems: "center",
    justifyContent: "center"
  }
});
