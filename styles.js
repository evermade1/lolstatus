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
      marginTop: 3,
    },
    blueBg: {backgroundColor: "#CEECF5"},
    redBg: {backgroundColor: "#F6CECE"},
    errorPage: {
      marginTop: 200,
      fontSize: 20
    },
  });

export default styles;