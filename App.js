import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const API_KEY = "RGAPI-36a7789d-c95f-4a3c-9192-c397cbca5437"
const NICKNAME = "tueresmiflor"

export default function App() {
  const [id,setId] = useState("")
  const [data, setData] = useState([])
  const abc = async () => {
    const response = await fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${NICKNAME}?api_key=${API_KEY}`)
    const json = await response.json()
    setId(json.id)
    const response1 = await fetch(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`)
    const json1 = await response1.json()
    setData(json1[0])
  }
  useEffect(() => {
    abc()
  }, [])
  return (
    <View style={styles.container}>
      <Text>{data.summonerName}</Text>
      <Text>{data.tier} {data.rank}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
