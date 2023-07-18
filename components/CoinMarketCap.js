import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';
import Animation from './animation_lk7yj226.json';
function CoinMarketCap({navigation}) {
  const [coinData, setCoinData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getCoinData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        {
          headers: {
            'X-CMC_PRO_API_KEY': '4f4648a7-9f7a-47f7-999c-dc39544a0480',
          },
        },
      );

      if (response) {
        setCoinData(response.data.data);
        // console.log(response.data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoinData();
  }, []);

  // const fixedPrice = price.toFixed(3);
  // const localPrice = fixedPrice.toLocaleString();
  return (
    <SafeAreaView style={{flex: 1}}>
      <HeadTexts>
        <HeadText>#</HeadText>
        <HeadText>Name</HeadText>
        <HeadText>Price</HeadText>
        <HeadText>24h%</HeadText>
        <HeadText>Market Cap</HeadText>
      </HeadTexts>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            source={Animation}
            style={{width: 200, height: 200}}
            autoPlay={true}
            loop={true}
          />
        </View>
      ) : (
        <FlatList
          data={coinData}
          renderItem={({item}) => {
            const price = item.quote.USD.price.toFixed(3);
            const localPrice = price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            const Hour24 = item.quote.USD.percent_change_24h.toFixed(2);
            const marketCap = item.quote.USD.market_cap;
            const fixedMarket = Math.floor(marketCap);
            const localMarket = fixedMarket
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            const isMinus = () => {
              if (Hour24 < 0) {
                return false;
              } else {
                return true;
              }
            };

            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CoinDetail', {
                    rank: item.cmc_rank,
                    name: item.name,
                    symbol: item.symbol,
                    price: localPrice,
                    marketCap: localMarket,
                    id: item.id,
                    Hour24: Hour24,
                  })
                }>
                <ListWrap>
                  <View>
                    <PriceText>{item.cmc_rank}</PriceText>
                  </View>
                  <NameAreaView>
                    <Image
                      style={{width: 15, height: 15}}
                      source={{
                        uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`,
                      }}
                    />
                    <NameAreaTextWrap>
                      <NameAreaText fontWeight={0}>{item.name}</NameAreaText>
                      <NameAreaText fontWeight={1}>{item.symbol}</NameAreaText>
                    </NameAreaTextWrap>
                  </NameAreaView>
                  <PriceArea>
                    <PriceText>${localPrice}</PriceText>
                  </PriceArea>

                  <HourArea>
                    <HourText isMinus={isMinus()}>{Hour24}</HourText>
                  </HourArea>
                  <HourArea>
                    <Text
                      style={{
                        fontSize: 9,
                        fontWeight: 'bold',
                        color: '#000000',
                      }}>
                      ${localMarket}
                    </Text>
                  </HourArea>
                </ListWrap>
              </TouchableOpacity>
            );
          }}
          keyExtractor={coin => coin.id.toString()}
        />
      )}
    </SafeAreaView>
  );
}

const HeadTexts = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #d9d9d9;
  padding: 2% 5% 2% 2%;
`;
const HeadText = styled.Text`
  font-size: 8px;
  font-weight: bold;
  /* border: 1px solid #000000; */
`;
const ListWrap = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 2% 2%;
  border: 1px solid #d9d9d9;
`;

const NameAreaView = styled.View`
  flex-direction: row;
  align-items: center;
  /* border: 1px solid #000000; */
`;
const NameAreaText = styled.Text`
  font-weight: ${props => (props.fontWeight === 0 ? 'bold' : '500')};
  font-size: ${props => (props.fontWeight === 0 ? '8px' : '7px')};
  color: ${props => (props.fontWeight === 0 ? '#222531' : '#808A9D')};
`;

const NameAreaTextWrap = styled.View`
  margin-left: 5px;
`;

const PriceArea = styled.View``;
const PriceText = styled.Text`
  font-size: 9px;
  font-weight: bold;
  color: #000000;
`;

const HourArea = styled.View``;
const HourText = styled.Text`
  font-size: 9px;
  font-weight: bold;
  color: ${props => (props.isMinus === false ? '#ea3943' : '#16C784')};
`;

export default CoinMarketCap;
