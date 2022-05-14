import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppHeader from '../Custom/AppHeaders';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import axios from 'axios';
function SignUp(props) {
  const [std_id, setStd_Id] = useState('');
  const [std_name, setStd_Name] = useState('');
  const [password, setPassword] = useState('');
  const [ph_num, setPh_Num] = useState('');
  const [room_num, setRoom_Num] = useState('');
  const [e_mail, setE_Mail] = useState('');
  var re = /^[0-9a-zA-Z]*@g\.yju\.ac\.kr/;
  const SignIn = () => {
    console.log(std_id, std_name, password, ph_num.length, room_num, e_mail);
    if (
      std_id === undefined ||
      std_id.length != 7 ||
      std_name === undefined ||
      password === undefined ||
      ph_num === undefined ||
      ph_num.length != 11 ||
      !re.test(e_mail) ||
      room_num.length < 3 ||
      room_num.length > 4 ||
      room_num === undefined
    ) {
      if (!re.test(e_mail)) {
        alert('이메일 입력 포맷을 준수해 주세요.( ex) example1@g.yju.ac.kr)');
      } else if (ph_num != 11) {
        alert('올바른 핸드폰 번호를 입력해주세요');
      } else if (std_id.length != 7) {
        alert('학번의 길이가 맞지 않습니다.');
      } else if (room_num.length < 3 || room_num.length > 4) {
        alert('실제 호실이 아닙니다.');
      } else {
        alert('어딘가 유효하지 않은 값이 있습니다!');
      }
    } else {
      axios
        .post(process.env.SERVER_URL + '/user/signup', {
          std_id,
          std_name,
          password,
          ph_num,
          room_num,
          e_mail,
        })
        .then((res) => {
          console.log(res);
          props.navigation.goBack();
        })
        .catch((err) => alert('자신의 정보를 입력해주세요.'));
    }
  };

  const inputStyle = {
    width: '90%',
    height: '60%',
    borderWidth: 2,
    borderRadius: 3,
    borderStyle: 'solid',
    elevation: 5,
    padding: '2%',
    margin: 0,
  };
  return (
    <>
      <AppHeader
        navigation={props.navigation}
        title={'회원가입'}
        isLeft={true}
      ></AppHeader>
      <KeyboardAwareScrollView>
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              marginBottom: '3%',
            }}
          >
            <Text style={{ marginTop: '3%' }}>이름</Text>
            <TextInput
              style={inputStyle}
              value={std_name}
              onChangeText={(text) => setStd_Name(text)}
            ></TextInput>
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              marginBottom: '3%',
            }}
          >
            <Text style={{ marginTop: '3%' }}>학번</Text>
            <TextInput
              style={inputStyle}
              value={std_id}
              onChangeText={(text) => {
                text = text.replace(/[^0-9]/g, '');
                console.log(text);
                setStd_Id(text);
              }}
            ></TextInput>
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              marginBottom: '3%',
            }}
          >
            <Text style={{ marginTop: '3%' }}>이메일</Text>
            <TextInput
              style={inputStyle}
              value={e_mail}
              onEndEditing={() => {
                re.test(e_mail)
                  ? alert('굿')
                  : (() => {
                      inputStyle.borderColor = 'blue';
                      console.log(inputStyle);
                    })();
              }}
              onChangeText={(text) => setE_Mail(text)}
            ></TextInput>
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              marginBottom: '3%',
            }}
          >
            <Text style={{ marginTop: '3%' }}>비밀번호</Text>
            <TextInput
              style={inputStyle}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
            ></TextInput>
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              marginBottom: '3%',
            }}
          >
            <Text style={{ marginTop: '3%' }}>호실</Text>
            <TextInput
              style={inputStyle}
              value={room_num}
              keyboardType='number-pad'
              onChangeText={(text) => {
                text = text.replace(/[^0-9]/g, '');
                setRoom_Num(text);
              }}
            ></TextInput>
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              marginBottom: '3%',
            }}
          >
            <Text style={{ marginTop: '3%' }}>전화번호</Text>
            <TextInput
              style={inputStyle}
              value={ph_num}
              keyboardType='numeric'
              onChangeText={(text) => {
                text = text.replace(/[^0-9]/g, '');
                setPh_Num(text);
              }}
            ></TextInput>
          </View>
        </View>
        <View
          style={{
            height: hp('10%'),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              SignIn();
            }}
            style={{
              height: '100%',
              width: '90%',
              backgroundColor: 'navy',
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>
              회원 가입 신청
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
export default SignUp;
