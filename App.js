import * as React from 'react';
// import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import TodoList from './components/TodoList';
import CoinMarketCap from './components/CoinMarketCap';
import CoinDetail from './components/CoinDetail';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="HOME" component={HomeScreen} />
        <Stack.Screen name="TodoList" component={TodoList} />
        <Stack.Screen name="CoinMarketCap" component={CoinMarketCap} />
        <Stack.Screen name="CoinDetail" component={CoinDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
