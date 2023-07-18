import * as React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  // ImageBackground,
} from 'react-native';
function HomeScreen({navigation}) {
  return (
    // <ImageBackground
    // source={require('./channels4_profile.jpg')}
    // style={styles.backgroundImage}>
    <SafeAreaView style={styles.homeContainer}>
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => navigation.navigate('TodoList')}>
        <Text style={styles.btnTextStyle}>Todo List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => navigation.navigate('CoinMarketCap')}>
        <Text style={styles.btnTextStyle}>coinMarket Cap</Text>
      </TouchableOpacity>
    </SafeAreaView>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    width: 200,
    height: 80,
    backgroundColor: 'blue',
    padding: 10,
    margin: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextStyle: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  // backgroundImage: {
  //   flex: 1,
  //   resizeMode: 'cover',
  // },
});

export default HomeScreen;
