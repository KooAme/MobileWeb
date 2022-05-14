import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import AppHeader from '../Custom/AppHeaders';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import I18n from '../../i18n';
import axios from 'axios';
import { SERVER_URL } from '@env';
import SetAsInquery from '../utils/SetAsInquery';

function ASInquery(props) {
  /*
    warning ! moment로 날짜를 문자형식으로 formatting 한후 가 아니면 error발생 Type Error
  */

  const [data, setData] = useState();
  const [id, setId] = useState();
  const renderItem = ({ item }) => (
    <SetAsInquery item={item} navigation={props.navigation} />
  );
  React.useEffect(() => {
    if (id === undefined) {
      AsyncStorage.getItem('user_info', (err, result) => {
        if (result) {
          setId(JSON.parse(result).std_id);
        } else {
          setId();
        }
      });
    } else {
      axios
        .post('http://192.168.0.15:3001/as/inquery/' + id)
        .then((res) => setData(res.data))
        .catch((err) => {
          console.log(err);
          console.log('서버와 통신 불가');
        });
    }
  }, [id]);
  const titles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  const details = StyleSheet.create({
    innerbox: {
      flex: 1,
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
    },
    font: {
      fontWeight: 'bold',
      color: 'black',
    },
  });
  return (
    <>
      <AppHeader
        isLeft={true}
        title={I18n.t('ASInquery')}
        navigation={props.navigation}
      ></AppHeader>
      <View
        style={{
          height: '90%',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '90%',
            height: '10%',
            borderWidth: 1,
            marginTop: '5%',
            borderRadius: 15,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              width: '80%',
              flexDirection: 'column',
            }}
          >
            <View style={titles.container}>
              <TouchableOpacity style={titles.container}>
                <View style={{ width: '100%' }}>
                  <Text style={{ color: 'black', fontWeight: 'bold' }}>
                    {'          ' +
                      I18n.t('year') +
                      '          ' +
                      I18n.t('month') +
                      '          ' +
                      I18n.t('day')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text>~</Text>
            </View>
            <View style={titles.container}>
              <TouchableOpacity style={titles.container}>
                <View style={{ width: '100%' }}>
                  <Text style={{ color: 'black', fontWeight: 'bold' }}>
                    {'          ' +
                      I18n.t('year') +
                      '          ' +
                      I18n.t('month') +
                      '          ' +
                      I18n.t('day')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: '20%' }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <Text
                style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}
              >
                {I18n.t('Inquery')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: '90%',
            height: '80%',
            borderWidth: 1,
            marginTop: '1%',
            borderRadius: 15,
            marginLeft: 20,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              marginTop: '2%',
              marginBottom: '2%',
            }}
          >
            <View style={details.innerbox}>
              <Text style={details.font}>{I18n.t('Date')}</Text>
            </View>
            <View style={details.innerbox}>
              <Text style={details.font}>{I18n.t('Time')}</Text>
            </View>
            <View style={details.innerbox}>
              <Text style={details.font}>{I18n.t('Condition')}</Text>
            </View>
            <View style={details.innerbox}>
              <Text style={details.font}></Text>
            </View>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.as_id}
          ></FlatList>
        </View>
      </View>
    </>
  );
}
export default ASInquery;
