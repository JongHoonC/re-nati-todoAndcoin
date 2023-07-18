import React from 'react';
import {SafeAreaView, Text, Image, View} from 'react-native';
import styled from 'styled-components';
import {NormalText} from './Element';

const CoinDetail = ({route}) => {
  const {rank, name, symbol, price, id, Hour24} = route.params;

  // isMinus함수는 Hour24 가 0보다 작을 때 false를 반환하고 0보다 클 때 true를 반환한다.
  const isMinus = () => {
    if (Hour24 < 0) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1, padding: 15}}>
      <NameStation>
        <Image
          style={{width: 17, height: 17}}
          source={{
            uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`,
          }}
        />
        <NameStationHeaderBtns>
          <NameStationHeaderBtn>
            <BtnText>🔔</BtnText>
          </NameStationHeaderBtn>
          <NameStationHeaderBtn>
            <BtnText>⭐</BtnText>
          </NameStationHeaderBtn>
          <NameStationHeaderBtn>
            <BtnText>💥</BtnText>
          </NameStationHeaderBtn>
          <NameStationHeaderBtn Follow={0}>
            <BtnText Follow={0}>+ Follow</BtnText>
          </NameStationHeaderBtn>
        </NameStationHeaderBtns>
      </NameStation>
      <RankStation>
        <RankText color={'dark'}>Rank #{rank}</RankText>
        <RankText>Token</RankText>
      </RankStation>
      <Text
        style={{
          fontSize: 8,
          paddingBottom: 10,
          color: '#58667E',
          fontWeight: 'bold',
        }}>
        {name} Price ({symbol})
      </Text>
      <PriceStation>
        <NormalText content={`$${price}`} size={28} fontWeight={'bold'} />
        <View
          style={{
            justifyContent: 'center',
          }}>
          <PriceText color={'black'} isMinus={isMinus()}>
            {Hour24}%
          </PriceText>
        </View>
      </PriceStation>
    </SafeAreaView>
  );
};

const NameStation = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const NameStationHeaderBtns = styled.View`
  flex-direction: row;
`;
const NameStationHeaderBtn = styled.TouchableOpacity`
  border: 1px solid #d9d9d9;
  flex-direction: row;
  padding: 4px;
  margin-left: 5px;
  border-radius: 7px;
  background-color: ${props => (props.Follow === 0 ? 'blue' : 'white')};
`;

const BtnText = styled.Text`
  font-size: 9px;
  font-weight: bold;
  color: #ffffff;
`;
const RankStation = styled.View`
  flex-direction: row;
  padding: 15px 0;
  align-items: center;
`;

const RankText = styled.Text`
  padding: 2px 5px;
  background-color: ${props =>
    props.color === 'dark' ? '#808a9d' : '#EFF2F5'};
  color: ${props => (props.color === 'dark' ? '#ffffff' : '#58667e')};
  font-size: 9px;
  margin-right: 10px;
  border-radius: 5px;
  font-weight: bold;
`;
const PriceStation = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const PriceText = styled.Text`
  font-weight: bold;
  padding: ${props => (props.price === 'true' ? '0' : '3px 7px')};
  border-radius: 5px;
  color: #ffffff;
  /* isMins가 false 일 때  #ea3943 true 일 때 #16C784*/

  background-color: ${props =>
    props.isMinus === false ? '#ea3943' : '#16C784'};
  font-size: 10px;
`;
export default CoinDetail;
