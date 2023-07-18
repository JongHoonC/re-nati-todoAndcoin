import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Animated,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
const TodoList = () => {
  const [animValue] = useState(new Animated.Value(0));
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const listID = useRef(0);
  const [items, setItems] = useState([]);
  const [textValue, setTextValue] = useState('');
  const [dateValue, setDateValue] = useState('');

  const [replaceData, setReplaceData] = useState(null);

  const [editTextValue, setEditTextValue] = useState(
    items.map(item => {
      item.textValue;
    }),
  );

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    setDateValue(moment(date).format('YYYY-MM-DD'));
  };
  const replaceBtn = id => {
    setReplaceData(id);
    const selectedItem = items.find(item => item.id === id);
    setEditTextValue(selectedItem.textValue);
  };

  const confirmBtn = id => {
    setReplaceData(id);
    const newTodoList = items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          textValue: editTextValue,
        };
      }
      return item;
    });
    setItems(newTodoList);
    setReplaceData(null);
    setEditTextValue('');
  };
  useEffect(() => console.log(items), [items]);
  const removeBtn = id => {
    setItems(items.filter(item => item.id !== id));
  };
  const handleImagePress = () => {
    if (textValue !== '') {
      const textValues = {
        id: listID.current,
        dateValue: dateValue,
        textValue: textValue,
      };
      setItems(items.concat(textValues));
      setTextValue('');
      setDateValue('');
      listID.current += 1;
    } else {
      alert('다시 입력해주세요');
    }
    if (isExpanded) {
      Animated.timing(animValue, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animValue, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }).start();
    }
    setIsExpanded(!isExpanded);
  };
  const imageStyle = {
    transform: [
      {
        translateY: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 45],
        }),
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.imageContainer}>
          <TouchableWithoutFeedback onPress={handleImagePress}>
            <Animated.View style={[styles.imageWrapper, imageStyle]}>
              <Image
                style={styles.imgStyle}
                source={require('./mantang.png')}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
        {/* </View> */}
        <View style={styles.wrapInput}>
          <TouchableOpacity onPress={showDatePicker}>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              onHide={hideDatePicker}
              editable={false}
            />
            <TextInput
              pointerEvents="none"
              style={styles.textInput1}
              placeholderTextColor="#ffffff"
              underlineColorAndroid="transparent"
              editable={false}
              value={dateValue}
              placeholder="날짜를 입력해주세요"
            />
          </TouchableOpacity>
          <View style={styles.dof}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="입력해주세요"
              name="text"
              placeholderTextColor="white"
              style={styles.textInput}
              onChangeText={setTextValue}
              value={textValue}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardAwareScrollView>
        <FlatList
          data={items}
          renderItem={({item}) => (
            <View style={styles.flatListStyle}>
              {replaceData === item.id ? (
                <View style={styles.inputStyle}>
                  <Text style={styles.molohajiDate}>{item.dateValue}</Text>
                  <TextInput
                    style={{...styles.mohaji, ...styles.centerText}}
                    defaultValue={item.textValue}
                    onChangeText={text => setEditTextValue(text)}
                  />
                </View>
              ) : (
                <View style={styles.inputStyle}>
                  <Text style={styles.molohajiDate}>{item.dateValue}</Text>
                  <Text style={styles.molohaji}>{item.textValue}</Text>
                </View>
              )}
              {replaceData === item.id ? (
                <View>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => confirmBtn(item.id)}>
                    <Text>⭕</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.btnWrap}>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => removeBtn(item.id)}>
                    <Text style={styles.BTStnle}>❌</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => replaceBtn(item.id)}>
                    <Text style={styles.BTStnle}>🖋</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#81c147',
  },
  content: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
  },
  imageWrapper: {
    width: 400,
    height: 300,
    marginTop: 30,
    marginBottom: 30,
  },
  imgStyle: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  textInput: {
    paddingLeft: 22,
    backgroundColor: 'darkgoldenrod',
    color: 'white',
    flex: 1,
  },
  textInput1: {
    paddingHorizontal: 20,
    backgroundColor: 'gray',
    color: 'white',
  },
  buttonStyle: {
    width: 30,
    backgroundColor: 'darkgoldenrod',
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  BTStnle: {
    textAlign: 'center',
    color: 'white',
  },
  inputStyle: {
    paddingLeft: 10,
    flex: 1,
    textAlign: 'center',
    color: 'black',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  flatListStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'blue',
    borderRadius: 10,
    margin: 10,
    height: 40,
  },
  molohaji: {
    color: '#800080',
    fontWeight: 'bold',
    // borderWidth: 1,
    flex: 1,
    textAlign: 'center',
  },
  molohajiDate: {
    color: '#800080',
    fontWeight: 'bold',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapInput: {
    flexDirection: 'row',
    // height: 100,
    // borderWidth: 3,
  },
  mohaji: {
    height: 40,
  },
  btnWrap: {
    flexDirection: 'row',
  },
  dof: {
    flex: 1,
  },
});

export default TodoList;
