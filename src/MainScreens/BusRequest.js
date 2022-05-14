import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import AppHeader from '../Custom/AppHeaders';
import Icon from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomButton from '../Custom/CustomButton';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import I18n from '../../i18n';
import 'moment/locale/ko';

moment.locale('ko');
const font = StyleSheet.create({
  title: {
    height: '100%',
    color: 'black',
    fontWeight: '900',
  },
});
const box = StyleSheet.create({
  containers: {
    height: '15%',
    width: '100%',
    marginTop: '5%',
    flexDirection: 'column',
  },
  place: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
function BusRequest(props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  const [direction, setDirection] = useState('복현 캠퍼스');
  const [busStop, setBusStop] = useState('');

  const showDatePicker = () => {
    console.log(date);
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    if (moment(date).isAfter(new Date())) {
      setDate(moment(date).format('YYYY' + I18n.t('year') + ' MMMM Do dddd'));
      hideDatePicker();
    } else {
      if (I18n.locale === 'ko') {
        alert('입력하신 시간이 보다 전 입니다. 다시 입력해주세요.');
      } else if (I18n.locale === 'ch') {
        alert('"在您输入的时间之前。 请重新输入。');
      }
      hideDatePicker();
    }
  };
  return (
    <>
      <AppHeader
        navigation={props.navigation}
        title={I18n.t('BusRequest')}
        isLeft={true}></AppHeader>
      <View
        style={{
          height: '90%',
          alignItems: 'center',
        }}>
        <View style={box.containers}>
          <View style={box.place}>
            <Text style={font.title}>{I18n.t('Direction')}</Text>
          </View>
          <View style={{borderWidth: 1}}>
            <Picker
              selectedValue={direction}
              onValueChange={itemValue => {
                setDirection(itemValue);
              }}>
              <Picker.Item label="복현 캠퍼스" value="복현 캠퍼스" />
              <Picker.Item label="글로벌 캠퍼스" value="글로벌 캠퍼스" />
            </Picker>
          </View>
        </View>
        <View style={box.containers}>
          <View style={box.place}>
            <Text style={font.title}>{I18n.t('BusStop')}</Text>
          </View>
          <View style={{borderWidth: 1}}>
            {direction == '복현 캠퍼스' ? (
              <Picker>
                <Picker.Item label="영어마을" value="영어마을" />
                <Picker.Item label="글로벌 생활관" value="글로벌 생활관" />
                <Picker.Item label="글로벌 캠퍼스" value="글로벌 캠퍼스" />
                <Picker.Item label="태전역" value="태전역" />
                <Picker.Item label="운암역" value="운암역" />
              </Picker>
            ) : (
              <Picker>
                <Picker.Item label="본교 서문" value="본교 서문" />
                <Picker.Item label="SK 빌딩" value="SK 빌딩" />
                <Picker.Item label="태전역" value="태전역" />
              </Picker>
            )}
          </View>
        </View>
        <View style={box.containers}>
          <View style={box.place}>
            <Text style={font.title}>{I18n.t('StartDate')}</Text>
          </View>
          <View style={box.time}>
            <Text>
              {date
                ? date
                : '      ' +
                  I18n.t('year') +
                  '      ' +
                  I18n.t('month') +
                  '       ' +
                  I18n.t('day')}
            </Text>
          </View>
          <TouchableOpacity onPress={showDatePicker}>
            <View style={{alignItems: 'center', borderWidth: 1}}>
              <Icon name="chevron-thin-down" size={20}></Icon>
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            locale="ko_KR"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <View style={box.containers}>
          <View style={box.place}>
            <Text style={font.title}>{I18n.t('StartTime')}</Text>
          </View>
          <View style={box.time}>
            <Text>06 : 00</Text>
            {/*이거 나중에 state 로 관리
              출발시간과 가는 시간을 비교. => 거리마다 걸리는 시간을 객체로 나타내 정리
            */}
          </View>
        </View>
        <View style={{width: '90%', height: '8%', marginTop: '10%'}}>
          <CustomButton title={I18n.t('Request')}></CustomButton>
        </View>
      </View>
    </>
  );
}

export default BusRequest;
