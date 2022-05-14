import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  Image,
} from 'react-native';
import AppHeader from '../Custom/AppHeaders';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import I18n from '../../i18n';
import * as ImagePicker from 'expo-image-picker';

function Write(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [std_id, setStd_id] = useState();
  const [parentHeight, setParentHeight] = useState(0);
  const [parentWidth, setParentWidth] = useState(0);
  const [imgArr, setImgArr] = useState([]);
  const [count, setCount] = useState(0);

  const uploadImg = (data) => {
    let prevArr = imgArr;
    prevArr.push(data);
    setImgArr(prevArr);
  };

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }
    uploadImg({ localUri: pickerResult.uri });
    setCount(count + 1);
  };
  const Images = () => {
    const imgs = imgArr.map((el, index = 1) => {
      return (
        <View key={index}>
          <Image
            source={{ uri: el.localUri }}
            style={{ width: 50, height: 50 }}
          />
        </View>
      );
    });
    return imgs;
  };

  // React.useEffect(() => {
  //   props.navigation.addListener('beforeRemove', (e) => {
  //     e.preventDefault();
  //     alert('ddd');
  //   });
  //   props.navigation.getParent().addListener('beforeRemove', (e) => {
  //     e.preventDefault();
  //   });
  // }, []);
  const onSubmit = async () => {
    await AsyncStorage.getItem('user_info', (err, result) => {
      if (result) {
        setStd_id(JSON.parse(result).std_id);
      }
      return;
    });
    axios
      .post(
        'http://192.168.0.15:3001/community/create_process',
        { std_id, title, content },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        props.navigation.reset({ routes: [{ name: 'CommunityMain' }] });
      })
      .catch((err) => {
        console.error(err);
      });

    // axios.요청방식(url, {key:value},).then((res)=>console.log(data))
    //url : http://192.168.0.15/community/create_process
  };
  const onLayout = (event) => {
    const { height, width } = event.nativeEvent.layout;
    setParentHeight(height);
    setParentWidth(width);
  };
  return (
    <>
      <AppHeader
        isLeft={true}
        title={'작성'}
        navigation={props.navigation}
      ></AppHeader>
      {imgArr ? <Images></Images> : <></>}
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <TextInput
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
            // onFocus={}
            style={{
              height: '100%',
              paddingLeft: 10,
              fontSize: 20,
            }}
            placeholder={'제목'}
          ></TextInput>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#e9e9e9',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <TouchableOpacity
            style={{
              height: '60%',
              width: '10%',
            }}
            onLayout={onLayout}
            onPress={openImagePickerAsync}
          >
            <Image
              source={require('../public/image.png')}
              style={{
                height: parentHeight > parentWidth ? parentWidth : parentHeight,
                width: parentHeight > parentWidth ? parentWidth : parentHeight,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: '70%',
              width: '10%',
            }}
          >
            <Image
              source={require('../public/video.png')}
              style={{
                height: parentHeight > parentWidth ? parentWidth : parentHeight,
                width: parentHeight > parentWidth ? parentWidth : parentHeight,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: '70%',
              width: '10%',
            }}
          >
            <Image
              source={require('../public/font.png')}
              style={{
                height: parentHeight > parentWidth ? parentWidth : parentHeight,
                width: parentHeight > parentWidth ? parentWidth : parentHeight,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 5, backgroundColor: 'white' }}>
          <TextInput
            style={{
              height: '100%',
              textAlignVertical: 'top',
              padding: 10,
              fontSize: 20,
            }}
            value={content}
            onChangeText={(text) => {
              setContent(text);
            }}
            placeholder={'텍스트를 입력 해 주세요.'}
            multiline={true}
          ></TextInput>
        </View>
        <View
          style={{
            // borderTopWidth: 1,
            // borderColor: '#e9e9e9',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#e9e9e9',
              borderRadius: 10,

              height: '40%',
              width: '30%',
            }}
          >
            <Text>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSubmit}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#e9e9e9',

              borderRadius: 10,
              height: '40%',
              width: '30%',
            }}
          >
            <Text>등록</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default Write;
