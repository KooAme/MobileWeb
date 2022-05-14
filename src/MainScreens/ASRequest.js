import CheckBox from 'expo-checkbox';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import AppHeader from '../Custom/AppHeaders';
import CustomButton from '../Custom/CustomButton';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import I18n from '../../i18n';

function ASRequest(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [stdId, setStdId] = useState();
  console.log(isSelected);
  React.useEffect(() => {
    AsyncStorage.getItem('user_info', (err, result) => {
      if (!result) {
        console.log('this');
        return;
      } else {
        setStdId(JSON.parse(result).std_id);
      }
    });
  }, []);

  const onASSubmit = () => {
    axios
      .post(
        'http://192.168.0.15:3001/as/create_process',
        { title, content, isSelected, stdId },
        { withCredentials: true }
      )
      .then((res) => {
        props.navigation.navigate('ASInquery');
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <AppHeader
        isLeft={true}
        title={I18n.t('ASRequest')}
        navigation={props.navigation}
      ></AppHeader>
      <View
        style={{
          height: '90%',
          width: '100%',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: 'white',
        }}
      >
        <View
          style={{
            height: '10%',
            width: '90%',
            margin: '5%',
          }}
        >
          <Text style={{ fontWeight: 'bold', color: 'black' }}>
            {I18n.t('Title')}
          </Text>
          <TextInput
            style={{ borderWidth: 1, padding: 0, margin: 0, height: '80%' }}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
            maxLength={50}
          ></TextInput>
        </View>

        <View
          style={{
            height: '60%',
            width: '90%',
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              padding: 0,
              margin: 0,
            }}
          >
            {I18n.t('Content')}
          </Text>
          <TextInput
            style={{ borderWidth: 1, height: '90%' }}
            value={content}
            onChangeText={(text) => {
              setContent(text);
              console.log(content);
            }}
            maxLength={500}
          ></TextInput>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '7%',
          }}
        >
          <CheckBox
            value={isSelected}
            onValueChange={() => setSelection(!isSelected)}
          ></CheckBox>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              color: 'black',
              fontWeight: 'bold',
            }}
          >
            {I18n.t('BuzaeAgree')}
          </Text>
        </View>
        <View
          style={{
            width: '90%',
            height: '10%',
            backgroundColor: 'navy',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              height: '100%',
              width: '100%',

              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              onASSubmit();
            }}
          >
            <Text style={{ color: 'white', fontWeight: '700' }}>
              {I18n.t('Request')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
export default ASRequest;
