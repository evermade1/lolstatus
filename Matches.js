import { Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from './Progress';
import styles from './styles'
import Badge from './Badge'
import { useEffect, useState } from 'react';

const Matches = ({ gameData, id, onButtonPress}) => {
  //const gameDataKeys = Object.keys(gameData);
  const QUEUETYPE = {
    400: '일반', //Normal Draft Pick
    420: '솔로랭크',
    430: '일반',
    440: '자유랭크',
    450: '무작위 총력전',
    700: '격전',
    800: 'ai',  // Deprecated
    810: 'ai',  // Deprecated
    820: 'ai',  // Deprecated
    830: 'ai',
    840: 'ai',
    850: 'ai',
    900: '우르프',
    920: '전설의 포로 왕',
    1020: '단일 챔피언',
    1300: 'nbg',
    1400: '궁극기 주문서', // Ultimate Spellbook
    1700: "아레나",
    2000: 'tut',
    2010: 'tut',
    2020: 'tut',
  }
  const [k, setK] = useState(null)
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null); //유저가 클릭한 매치를 저장하는 변수
  const handleInternalButtonPress = (x) => () => {
    setSelectedButtonIndex(null)
    onButtonPress(x); // 데이터와 함께 함수 호출
  }; //디테일에서 클릭 후 검색될 경우
  useEffect(() => {
    setSelectedButtonIndex(null)
  },[gameData]) //검색창에서 검색할 경우
  const handleButtonClick = (index) => {
    setSelectedButtonIndex(index === selectedButtonIndex ? null : index);
  }; //유저가 클릭한 매치 디테일 여는 함수
  

  gameData.sort(function (a, b) {
    return b.gameCreation - a.gameCreation;
  }); //시간 순서로 정렬
  return (
    <View style={{ paddingHorizontal: 20, marginBottom: 50 }}>
      <View style={styles.typeButtons}>
        <TouchableOpacity onPress={() => setK(null)} style={styles.typeButton}>
          <Text style={styles.buttonsFont}>전체</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setK(420)} style={styles.typeButton}>
          <Text style={styles.buttonsFont}>솔로랭크</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setK(440)} style={styles.typeButton}>
          <Text style={styles.buttonsFont}>자유랭크</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setK(430)} style={styles.typeButton}>
          <Text style={styles.buttonsFont}>일반</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setK(450)} style={styles.typeButton}>
          <Text style={styles.buttonsFont}>무작위 총력전</Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity onPress={handlePickerClick} style={{...styles.typeButton, height: 30}}>
                    <Text style={styles.buttonsFont}>게임 종류</Text>
                </TouchableOpacity>
      {isVisible && <Picker  
               selectedValue={selectedValue}
               onValueChange={handleValueChange}>
            <Picker.Item label='전체' value="null" />
            <Picker.Item label='솔로랭크' value="420"/>
            <Picker.Item label='자유랭크' value="440"/>
            <Picker.Item label='무작위 총력전' value="450"/>
        </Picker>} */}

  
      {gameData.map((gameData, index) => {
        const time = new Date(gameData.gameEndTimestamp).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', month: 'long', day: 'numeric' }) //Date 형태의 시간을 변환
        const timeDifference = Date.now() - gameData.gameEndTimestamp;
        const seconds = Math.floor(timeDifference / 1000);
        let timeAfter = null
        if (seconds < 60) {
          timeAfter = `${seconds}초 전`;
        } else {
          // 초를 분과 초로 변환
          const minutes = Math.floor(seconds / 60);

          if (minutes < 60) {
            timeAfter =`${minutes}분 전`;
          } else {
            // 분을 시간과 분으로 변환
            const hours = Math.floor(minutes / 60);

            
            if (hours < 24) {
              timeAfter =`${hours}시간 전`;
            } else {
              const days = Math.floor(hours / 24)
              timeAfter =`${days}일 전`;
            }
          }
        }
        const myData = gameData.participants.filter((value) => value.summonerId == id)[0] //전체 데이터에서 내 데이터만 추출
        if (!myData) { return } //내 데이터가 없으면 실행x
        if (k && gameData.queueId !== k) { return } //유저가 원하는 게임 종류만 출력
        // if (myData.length >= 20) {
        //     myData.splice(20);
        //   }

        // const bgColor = myData.teamEarlySurrendered ? styles.grayBg : (myData.win ? styles.blueBg : styles.redBg)
        const bgColor = myData.gameEndedInEarlySurrender ? "#D8D8D8" : (myData.win ? "#A9E2F3" : "#F5A9A9") //배경 그라데이션 1
        const bgColor2 = myData.gameEndedInEarlySurrender ? "#D8D8D8" : (myData.win ? "#CEF6EC" : "#F6D8CE") //배경 그라데이션 2

        // const championName = gameData.championName
        // const championImageURI = `./assets/championImage/Ezreal.png`;
        return (
          <View key={index}>

            <TouchableOpacity key={index} onPress={() => handleButtonClick(index)}>
              <LinearGradient
                colors={[bgColor, bgColor2]}
                style={[styles.match, bgColor]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{ uri: `https://z.fow.kr/champ/${myData.championId}_64.png` }} // 챔피언
                    style={{ width: 50, height: 50, borderRadius: 10 }}
                  />
                  <View style={{ marginLeft: 3 }}>
                    <Image
                      source={{ uri: `https://z.fow.kr/spell/${myData.summoner1Id}.png` }} // 스펠1
                      style={{ width: 22, height: 22, margin: 1.5, borderRadius: 5 }}
                    />
                    <Image
                      source={{ uri: `https://z.fow.kr/spell/${myData.summoner2Id}.png` }} // 스펠2
                      style={{ width: 22, height: 22, margin: 1.5, borderRadius: 5 }}
                    />
                  </View>
                  <View style={{ flexDirection: "column", marginLeft: 5, width: 75 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={{fontSize: 13, fontWeight: 600, color: "#424242"}}>
                        <Text style={myData.kills > 20 ? {color: "#424242", textShadowColor: 'red', textShadowRadius: myData.kills/10} : null }>{myData.kills} </Text>
                        <Text>/ {myData.deaths} /</Text>
                        <Text> {myData.assists}</Text>
                      </Text>
                    </View>
                    <Text style={{ marginTop: 4, fontSize: 12, color: "#424242", fontWeight: 600 }}>{QUEUETYPE[gameData.queueId]}</Text>
                    <Text style={{ marginTop: 4, fontSize: 12, color: myData.gameEndedInEarlySurrender ? "#424242" : (myData.win ? "#0174DF" : "#FE2E2E"), fontWeight: 600 }}>{myData.gameEndedInEarlySurrender ? "다시하기" : (myData.win ? "승리" : "패배")}</Text>
                  </View>
                  <View>
                    <View style={{ flexDirection: "row", marginLeft: 4 }}>
                      {[0, 1, 2, 3, 4, 5, 6].map((itemIndex) => (
                        <Image
                          key={itemIndex}
                          source={{ uri: `https://z.fow.kr/items3/${myData[`item${itemIndex}`]}.png` }}
                          style={{ width: 17, height: 17, margin: 1, borderRadius: 5 }}
                        />
                      ))}
                    </View>
                    {!myData.gameEndedInEarlySurrender && <Badge myData={myData} gameData={gameData} />}
                  </View>
                </View>
                <View>
                  <Text style={{fontSize: 12, fontWeight: 500, color: "#424242", textAlign: 'right'}}> {time}</Text>
                  <Text style={{marginTop: 2, fontSize: 10, fontWeight: 500, color: "#424242", textAlign: 'right'}}> {Math.floor(gameData.gameDuration/60)}분 {gameData.gameDuration%60}초</Text>
                  <Text style={{marginTop: 2, fontSize: 9, fontWeight: 500, color: "#424242", textAlign: 'right'}}> {timeAfter}</Text>
                  
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <View>
              {selectedButtonIndex === index &&
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <ScrollView horizontal pagingEnabled pointerEvents="box-none">

                      <View>

                        <View style={{ height: 20, justifyContent: "center", alignItems: "center" }}><Text style={{ fontWeight: 600 }}>Overall</Text></View>
                        {gameData && gameData.participants.map((data, index) =>
                        (

                          <View key={index} style={{ flexDirection: "row", backgroundColor: data.teamId === 100 ? "#CEECF5" : "#F6CECE", height: 51 }}>
                            <View style={{ margin: 5, width: Dimensions.get('window').width - 50 }}>
                              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ flexDirection: "row" }}>
                                  <Image
                                    source={{ uri: `https://z.fow.kr/champ/${data.championId}_64.png` }}
                                    style={{ width: 40, height: 40 }}
                                  />
                                  <View style={{ marginLeft: 3 }}>
                                    <Image
                                      source={{ uri: `https://z.fow.kr/spell/${data.summoner1Id}.png` }}
                                      style={{ width: 20, height: 20 }}
                                    />
                                    <Image
                                      source={{ uri: `https://z.fow.kr/spell/${data.summoner2Id}.png` }}
                                      style={{ width: 20, height: 20 }}
                                    />

                                  </View>
                                  <View style={{ marginLeft: 3 }}>
                                    <Image
                                      source={{ uri: `https://z.fow.kr/img/perk/${data.perks.styles[0].selections[0].perk}.png?v=3` }}
                                      style={{ width: 17.5, height: 17.5, marginVertical: 1.25 }}
                                    />
                                    <Image
                                      source={{ uri: `https://z.fow.kr/img/perk/${data.perks.styles[1].style}.png?v=3` }}
                                      style={{ width: 17.5, height: 17.5, marginVertical: 1.25 }}
                                    />

                                  </View>
                                  <View style={{ flexDirection: "column" }}>
                                    <TouchableOpacity onPress={handleInternalButtonPress(data.summonerName)}>
                                      <Text style={{ fontSize: 11, fontWeight: 600 }}> {data.summonerName}</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 11 }}> {data.kills} / {data.deaths} / {data.assists}  CS {data.totalMinionsKilled}  KDA {((data.kills + data.assists) / data.deaths).toFixed(2)} </Text>
                                    <Text style={{ fontSize: 11 }}> {data.totalDamageDealtToChampions.toLocaleString()} {data.goldEarned.toLocaleString()}G 시야 {data.visionScore}</Text>
                                  </View>
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                  <View style={{ flexDirection: "row" }}>
                                    {[0, 1, 2, 6].map((itemIndex) => (
                                      <Image
                                        key={itemIndex}
                                        source={{ uri: `https://z.fow.kr/items3/${data[`item${itemIndex}`]}.png` }}
                                        style={{ width: 20, height: 20 }}
                                      />
                                    ))}
                                  </View>
                                  <View style={{ flexDirection: "row" }}>
                                    {[3, 4, 5].map((itemIndex) => (
                                      <Image
                                        key={itemIndex}
                                        source={{ uri: `https://z.fow.kr/items3/${data[`item${itemIndex}`]}.png` }}
                                        style={{ width: 20, height: 20 }}
                                      />))}
                                  </View>
                                </View>

                              </View>
                            </View>

                          </View>

                        ))}
                      </View>
                      <View>
                        <View style={{ height: 20, justifyContent: "center", alignItems: "center" }}><Text style={{ fontWeight: 600 }}>딜량</Text></View>
                        {gameData && gameData.participants.slice() // 새로운 배열을 생성하여 원본 배열을 변경하지 않도록 합니다.
                          .sort((a, b) => b.totalDamageDealtToChampions - a.totalDamageDealtToChampions).map((data, index) =>
                          (
                            <View key={index} style={{ flexDirection: "row", backgroundColor: data.teamId === 100 ? "#CEECF5" : "#F6CECE", height: 51 }}>
                              <View style={{ margin: 5, width: Dimensions.get('window').width - 50 }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                  <View style={{ flexDirection: "row" }}>
                                    <Image
                                      source={{ uri: `https://z.fow.kr/champ/${data.championId}_64.png` }}
                                      style={{ width: 40, height: 40 }}
                                    />
                                    <View style={{ marginLeft: 3 }}>
                                      <Image
                                        source={{ uri: `https://z.fow.kr/spell/${data.summoner1Id}.png` }}
                                        style={{ width: 20, height: 20 }}
                                      />
                                      <Image
                                        source={{ uri: `https://z.fow.kr/spell/${data.summoner2Id}.png` }}
                                        style={{ width: 20, height: 20 }} SS
                                      />

                                    </View>
                                    <View style={{ marginLeft: 3 }}>
                                      <Image
                                        source={{ uri: `https://z.fow.kr/img/perk/${data.perks.styles[0].selections[0].perk}.png?v=3` }}
                                        style={{ width: 17.5, height: 17.5, marginVertical: 1.25 }}
                                      />
                                      <Image
                                        source={{ uri: `https://z.fow.kr/img/perk/${data.perks.styles[1].style}.png?v=3` }}
                                        style={{ width: 17.5, height: 17.5, marginVertical: 1.25 }}
                                      />

                                    </View>
                                    <View style={{ flexDirection: "column", width: "50%", marginLeft: 3 }}>
                                      <Text style={{ fontSize: 11, fontWeight: 600, marginBottom: 3 }}>{data.summonerName}</Text>
                                      <ProgressBar max={gameData.participants.slice() // 새로운 배열을 생성하여 원본 배열을 변경하지 않도록 합니다.
                                        .sort((a, b) => b.totalDamageDealtToChampions - a.totalDamageDealtToChampions)[0].totalDamageDealtToChampions} value={data.totalDamageDealtToChampions} color={"#FA5858"} />
                                    </View>
                                  </View>
                                  <View style={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: "row" }}>
                                      {[0, 1, 2, 6].map((itemIndex) => (
                                        <Image
                                          key={itemIndex}
                                          source={{ uri: `https://z.fow.kr/items3/${data[`item${itemIndex}`]}.png` }}
                                          style={{ width: 20, height: 20 }}
                                        />
                                      ))}
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                      {[3, 4, 5].map((itemIndex) => (
                                        <Image
                                          key={itemIndex}
                                          source={{ uri: `https://z.fow.kr/items3/${data[`item${itemIndex}`]}.png` }}
                                          style={{ width: 20, height: 20 }}
                                        />))}
                                    </View>
                                  </View>

                                </View>
                              </View>

                            </View>

                          ))}

                      </View>
                      <View>
                        <View style={{ height: 20, justifyContent: "center", alignItems: "center" }}><Text style={{ fontWeight: 600 }}>획득한 골드</Text></View>

                        {gameData && gameData.participants.slice() // 새로운 배열을 생성하여 원본 배열을 변경하지 않도록 합니다.
                          .sort((a, b) => b.goldEarned - a.goldEarned).map((data, index) =>
                          // 여기
                          (
                            <View key={index} style={{ flexDirection: "row", backgroundColor: data.teamId === 100 ? "#CEECF5" : "#F6CECE", height: 51 }}>
                              <View style={{ margin: 5, width: Dimensions.get('window').width - 50 }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                  <View style={{ flexDirection: "row" }}>
                                    <Image
                                      source={{ uri: `https://z.fow.kr/champ/${data.championId}_64.png` }}
                                      style={{ width: 40, height: 40 }}
                                    />
                                    <View style={{ marginLeft: 3 }}>
                                      <Image
                                        source={{ uri: `https://z.fow.kr/spell/${data.summoner1Id}.png` }}
                                        style={{ width: 20, height: 20 }}
                                      />
                                      <Image
                                        source={{ uri: `https://z.fow.kr/spell/${data.summoner2Id}.png` }}
                                        style={{ width: 20, height: 20 }}
                                      />

                                    </View>
                                    <View style={{ marginLeft: 3 }}>
                                      <Image
                                        source={{ uri: `https://z.fow.kr/img/perk/${data.perks.styles[0].selections[0].perk}.png?v=3` }}
                                        style={{ width: 17.5, height: 17.5, marginVertical: 1.25 }}
                                      />
                                      <Image
                                        source={{ uri: `https://z.fow.kr/img/perk/${data.perks.styles[1].style}.png?v=3` }}
                                        style={{ width: 17.5, height: 17.5, marginVertical: 1.25 }}
                                      />

                                    </View>
                                    <View style={{ flexDirection: "column", width: "50%", marginLeft: 3 }}>
                                      <Text style={{ fontSize: 11, fontWeight: 600, marginBottom: 3 }}>{data.summonerName}</Text>
                                      <ProgressBar max={gameData.participants.slice() // 새로운 배열을 생성하여 원본 배열을 변경하지 않도록 합니다.
                                        .sort((a, b) => b.goldEarned - a.goldEarned)[0].goldEarned} value={data.goldEarned} color={"#FACC2E"} />

                                    </View>
                                  </View>
                                  <View style={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: "row" }}>
                                      {[0, 1, 2, 6].map((itemIndex) => (
                                        <Image
                                          key={itemIndex}
                                          source={{ uri: `https://z.fow.kr/items3/${data[`item${itemIndex}`]}.png` }}
                                          style={{ width: 20, height: 20 }}
                                        />
                                      ))}
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                      {[3, 4, 5].map((itemIndex) => (
                                        <Image
                                          key={itemIndex}
                                          source={{ uri: `https://z.fow.kr/items3/${data[`item${itemIndex}`]}.png` }}
                                          style={{ width: 20, height: 20 }}
                                        />))}
                                    </View>
                                  </View>

                                </View>
                              </View>
                            </View>

                          ))}

                      </View>

                    </ScrollView>
                  </View>

                </View>}
            </View>
          </View>
        )
      }
      )}
    </View>
  )
}

export default Matches