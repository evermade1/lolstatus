import { StyleSheet } from 'react-native';

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
      marginTop: 50,
      alignItems: "center",
      justifyContent: "center"
    },
    profile1: {
      flexDirection: "row"
    },
    nickname: {
      marginLeft: 20,
      marginBottom: 10,
      fontSize: 22,
      fontWeight: 600
    }
  });

export default styles;