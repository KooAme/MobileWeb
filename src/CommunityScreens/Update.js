import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AppHeader from '../Custom/AppHeaders';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import I18n from '../../i18n';
import { SERVER_URL } from '@env';
function Update(props) {
  const [title, setTitle] = useState(props.route.params.item.title);
  const [content, setContent] = useState(props.route.params.item.content);
  const updatePost = () => {
    axios
      .post('http://192.168.0.15:3001/community/update_process', {
        title,
        content,
        id: props.route.params.item.bulletin_id,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <ScrollView style={{ height: '90%' }}>
        <AppHeader
          title={I18n.t('CreateDetail')}
          isLeft={true}
          navigation={props.navigation}
        ></AppHeader>

        {
          //header 제목과 제출이 있을 예정
        }

        <View style={{ height: hp('90%'), backgroundColor: 'white' }}>
          <View style={{ height: '15%' }}>
            <View
              style={{
                height: '50%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'black', fontSize: 20, marginLeft: 10 }}>
                {I18n.t('Title')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  updatePost();
                  props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'CommunityMain' }],
                  });
                }}
                style={{
                  marginRight: 10,
                  borderWidth: 1,
                  height: '80%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                  width: '12%',
                }}
              >
                <Text style={{ fontSize: 20 }}>{I18n.t('CreateDetail')}</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TextInput
                style={{
                  borderWidth: 1,
                }}
                value={title}
                onChangeText={(text) => setTitle(text)}
              ></TextInput>
            </View>
          </View>
          {
            //content 내용이 있을 예정
          }
          <View style={{ height: '75%' }}>
            <View style={{ height: '10%' }}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  marginLeft: 10,
                  justifyContent: 'center',
                  marginTop: '3%',
                }}
              >
                {I18n.t('Content')}
              </Text>
            </View>
            <View style={{ height: '90%' }}>
              <TextInput
                style={{
                  height: '100%',
                  borderWidth: 1,
                  textAlignVertical: 'top',
                }}
                value={content}
                onChangeText={(text) => {
                  setContent(text);
                }}
                multiline={true}
              ></TextInput>
            </View>
          </View>
          {
            //tail 잡다한 기능 추가 예정 ex)사진 올리기 이모티콘 등등
          }
          <View
            style={{
              height: '10%',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity>
              <Icon name='picture' size={40}></Icon>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
export default Update;
