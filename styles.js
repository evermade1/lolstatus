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
      paddingTop: 35,
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
      paddingHorizontal: 30
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
      fontWeight: 600
    },
    level: {
      marginBottom: 6,
      fontSize: 20
    },
    famous: {
      fontSize: 13
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
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: "5%"
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: "5%",
       // 모달의 너비를 70%로 설정
      width: "100%"
      //width: SCREEN_WIDTH
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
    }
  });

export default styles;