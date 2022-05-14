import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import AppHeader from '../Custom/AppHeaders';
import MealSwiper from '../Custom/MealSwiper';
import I18n from '../../i18n';
import { Avatar } from 'react-native-paper';

function Main(props) {
  const grid = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '10%',
    },
    element: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      margin: '3%',
    },
  });
  return (
    <View style={{ height: '100%', backgroundColor: 'white' }}>
      <AppHeader
        navigation={props.navigation}
        title={'Global Campus'}
        isLeft={false}
      ></AppHeader>
      {/*HEADER*/}
      <MealSwiper></MealSwiper>
      {/*식사SWIPER*/}
      <View style={grid.container}>
        {/*<View>
          <TouchableOpacity
            style={{ borderWidth: 0 }}
            onPress={() => {
              props.navigation.navigate("BusInquery");
            }}
          >
            <View style={grid.element}>
              <Text
                style={{
                  color: "#0067A3",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {I18n.t("Bus")}
              </Text>
              <Avatar.Image
                source={require("../public/shuttleBus.png")}
                style={{ backgroundColor: "white" }}
                size={120}
              ></Avatar.Image>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ borderWidth: 0 }}
            onPress={() => {
              props.navigation.navigate("OutInquery");
            }}
          >
            <View style={grid.element}>
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {I18n.t("Out")}
              </Text>
              <Avatar.Image
                source={require("../public/sotobaku.png")}
                style={{ backgroundColor: "white" }}
                size={120}
              ></Avatar.Image>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{ borderWidth: 0 }}
            onPress={() => {
              props.navigation.navigate("GymInquery");
            }}
          >
            <View style={grid.element}>
              <Text
                style={{
                  color: "orange",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {I18n.t("Gym")}
              </Text>
              <Avatar.Image
                source={require("../public/health.png")}
                style={{ backgroundColor: "white" }}
                size={120}
              ></Avatar.Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ borderWidth: 0 }}
            onPress={() => {
              props.navigation.navigate("ASInquery");
            }}
          >
            <View style={grid.element}>
              <Text
                style={{
                  color: "navy",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {I18n.t("AS")}
              </Text>
              <Avatar.Image
                source={require("../public/AS.png")}
                style={{ backgroundColor: "white" }}
                size={120}
              ></Avatar.Image>
            </View>
          </TouchableOpacity>
        </View>*/}
      </View>
    </View>
  );
}
export default Main;
