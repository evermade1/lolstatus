import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get("window").width

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: '#424242',
      backgroundColor: "#fff",
      alignItems: 'center',
      //marginTop: 40
      // justifyContent: 'center',
    },
    container2: {
      flex: 1,
      //backgroundColor: '#424242',
      backgroundColor: "#000",
      alignItems: 'center',
      //marginTop: 40
      // justifyContent: 'center',
    },
    logo: {
      marginTop: 40,
      padding: 20
    },
    logofont: {
      fontSize: 30,
      fontWeight: 700,
      color: "#00FFBF"
    },
    topBar: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "90%"
    },
    button: {
      backgroundColor: "#F2F2F2",
      width: "70%",
      padding: 20,
      borderRadius: 10,
    },
    searchButton: {
      backgroundColor: "#00FFBF",
      width: "20%",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center"
    },
    datas: {
      width: "100%",
      marginTop: 15,
      paddingTop: 20,
      paddingBottom: 100
    },
    typeButtons: {
      flexDirection: "row",
      justifyContent: "space-around",
      margin: 10
    },
    typeButton: {
      backgroundColor: "lightgray",
      width: "30%",
      //height: "10%",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center"
    },
    buttonsFont: {
      margin: 3,
      fontSize: 15
    },
    imagebackground: {
      width: "100%"
    },
    profile1: {
      flexDirection: "row",
      justifyContent: 'flex-start',
      paddingHorizontal: 30,
      paddingVertical: 20
    },
    tiers: {
      flexDirection: "row",
      justifyContent: "space-around"
    },
    profile2: {
      width: SCREEN_WIDTH,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    nickname: {
      marginBottom: 5,
      fontSize: 22,
      fontWeight: 600,
      color: "white"
    },
    level: {
      marginBottom: 7,
      fontSize: 20,
      color: "white"
    },
    famous: {
      fontSize: 13,
      color: "white"
    },
    match: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderRadius: 10,
      padding: 10,
      height: 70,
      marginTop: 5,
    },
    modalContainer: {
      flex: 1,
      // position: "relative",
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
       // 모달의 너비를 70%로 설정
      width: "100%"
      //width: SCREEN_WIDTH
    },
    modalOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // 흐리게 보이는 오버레이 (투명도 0.5)
    },
    matchTeam: {
      width: "100%"
    },
    blueBg: {backgroundColor: "#CEECF5"},
    redBg: {backgroundColor: "#F6CECE"},
    grayBg: {backgroundColor: "#F2F2F2"},
    errorPage: {
      marginTop: 200,
      fontSize: 20
    },
    modalPage1: {
      //width: SCREEN_WIDTH
    },
    progressContainer: {
      width: '100%',
      height: 20,
      backgroundColor: '#e0e0e0',
      borderRadius: 10,
      overflow: 'hidden', // 내용이 컨테이너를 벗어나지 않도록 설정
    },
    progress: {
      height: '100%',
      borderRadius: 10,
      backgroundColor: '#3f51b5',
    },
  });

export default styles;