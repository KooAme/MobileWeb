import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import AppHeader from '../Custom/AppHeaders';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import I18n from '../../i18n';

function SettingMain(props) {
  const [isVisiable, setIsVisiable] = useState(false);
  const [selectedLangauge, setSelected] = useState(I18n.locale);
  const [parentHeight, setParentHeight] = useState(0);
  const [parentWidth, setParentWidth] = useState(0);
  const onChagneLanguage = async () => {
    await AsyncStorage.setItem('Language', selectedLangauge);
    I18n.locale = selectedLangauge;
    props.navigation.reset({ routes: [{ name: 'home' }] });
  };
  const logout = () => {
    axios
      .post('http://192.168.0.86:3001/user/logout')
      .then((res) => console.log(res));
  };
  const onLayout = (event) => {
    const { height, width } = event.nativeEvent.layout;
    setParentHeight(height);
    setParentWidth(width);
  };
  return (
    <>
      <AppHeader title={'Setting'} navigation={props.navigation}></AppHeader>
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <View
          style={{
            height: '30%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar.Image
            source={require('../public/annonymous.png')}
            size={100}
          ></Avatar.Image>
          <Text style={{ color: 'black' }}>
            {props.userInfo ? props.userInfo.std_name : '로그인 해주세요'}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            height: '10%',
            borderWidth: 1,
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'black', marginLeft: '10%' }}>
            {I18n.t('DarkMode')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsVisiable(true)}
          style={{
            height: '10%',
            borderWidth: 1,
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'black', marginLeft: '10%' }}>
            {I18n.t('LanguagueSetting')}
          </Text>
        </TouchableOpacity>
        <Modal animationType={'fade'} visible={isVisiable} transparent={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(1,1,1,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }} //모달 백그라운드
          >
            {
              //모달 안쪽
            }
            <View
              style={{
                height: '40%',
                width: '80%',
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  padding: 10,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  backgroundColor: '#0064ff',
                }}
              >
                <Text
                  style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
                >
                  언어 설정
                </Text>
              </View>
              {/* <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingLeft: '5%',
                  backgroundColor: 'white',
                }}
              >
                <Text>
                  {'\n'}현재 UI에서 사용 할 언어를 선택해주세요.{'\n'}
                </Text>
              </View> */}
              <View
                style={{
                  flex: 5,
                  flexDirection: 'row',
                  backgroundColor: 'white',
                }}
              >
                <View
                  style={{
                    flex: 1,
                    margin: '2%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onLayout={onLayout}
                >
                  <TouchableOpacity
                    style={{
                      height:
                        parentHeight > parentWidth ? parentWidth : parentHeight,
                      width:
                        parentHeight > parentWidth ? parentWidth : parentHeight,
                      borderRadius: '50%',
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        selectedLangauge === 'ko' ? '#0064ff' : 'white',
                    }}
                    onPress={() => setSelected('ko')}
                  >
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: selectedLangauge === 'ko' ? 'white' : 'black',
                      }}
                    >
                      한국어
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    margin: '2%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height:
                        parentHeight > parentWidth ? parentWidth : parentHeight,
                      width:
                        parentHeight > parentWidth ? parentWidth : parentHeight,
                      borderRadius: '50%',
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        selectedLangauge === 'ch' ? '#0064ff' : 'white',
                    }}
                    onPress={() => setSelected('ch')}
                  >
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: selectedLangauge === 'ch' ? 'white' : 'black',
                      }}
                    >
                      中国語
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    margin: '2%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height:
                        parentHeight > parentWidth ? parentWidth : parentHeight,
                      width:
                        parentHeight > parentWidth ? parentWidth : parentHeight,
                      borderRadius: '50%',
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        selectedLangauge === 'en' ? '#0064ff' : 'white',
                    }}
                    onPress={() => setSelected('en')}
                  >
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: selectedLangauge === 'en' ? 'white' : 'black',
                      }}
                    >
                      ENGLISH
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row-reverse',
                  paddingRight: '5%',
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  style={{
                    height: '60%',
                    width: '20%',
                    borderRadius: 15,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => setIsVisiable(false)}
                >
                  <Text style={{ color: '#0064ff', fontWeight: '600' }}>
                    취소
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: '60%',
                    width: '20%',
                    borderRadius: 15,

                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '5%',
                  }}
                  onPress={onChagneLanguage}
                >
                  <Text style={{ color: '#0064ff', fontWeight: '600' }}>
                    제출
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity></TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={{
            height: '10%',
            justifyContent: 'center',
            borderWidth: 1,
          }}
          onPress={() => alert('v.0.0.1')}
        >
          <Text style={{ color: 'black', marginLeft: '10%' }}>Version</Text>
        </TouchableOpacity>
        {props.isLogined ? (
          <TouchableOpacity
            style={{
              height: '10%',
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={async () => {
              logout();
              await AsyncStorage.removeItem('user_info');
              props.setUserInfo('');
              props.navigation.reset({ routes: [{ name: 'home' }] });
            }}
          >
            <Icon
              name='log-out'
              size={30}
              style={{ marginLeft: '10%', marginRight: '2%', color: 'black' }}
            ></Icon>
            <Text style={{ color: 'black', fontWeight: '700' }}>LOGOUT</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </>
  );
}
export default SettingMain;
