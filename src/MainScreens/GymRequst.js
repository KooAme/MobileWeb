import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Calendar } from "react-native-calendars";
import { Picker } from "@react-native-picker/picker";
import AppHeader from "../Custom/AppHeaders";
import I18n from "../../i18n";

function GymRequest(props) {
  /* */
  const [selectedDate, setSelectedDate] = useState("");
  const getDATE = new Date();
  const NOW =
    getDATE.getMonth() < 10 || getDATE.getDate() < 10
      ? getDATE.getFullYear() +
        "-0" +
        (getDATE.getMonth() + 1) +
        "-0" +
        getDATE.getDate()
      : getDATE.getFullYear() +
        "-" +
        (getDATE.getMonth() + 1) +
        "-" +
        getDATE.getDate();
  const week = new Array(
    I18n.t("Sunday"),
    I18n.t("Monday"),
    I18n.t("Tuesday"),
    I18n.t("Wednesday"),
    I18n.t("Thursday"),
    I18n.t("Friday"),
    I18n.t("Saturday")
  );
  const getDay = new Date(selectedDate).getDay();
  const Day = week[getDay] || "";
  return (
    <>
      <AppHeader
        navigation={props.navigation}
        title={I18n.t("GymRequest")}
        isLeft={true}
      ></AppHeader>
      <View style={{ flex: 1 }}>
        <Calendar
          current={NOW}
          minDate={NOW}
          onDayPress={(day) => {
            console.log("selected day", day);
            setSelectedDate(day.dateString);
          }}
          onDayLongPress={(day) => {
            console.log("selected day", day);
          }}
          monthFormat={"yyyy MM"}
          markedDates={{
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: "blue",
            },
          }}
        />
        <View style={{ marginTop: "10%", height: "10%" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
              {I18n.t("Date")}{" "}
            </Text>
            <TextInput
              style={{
                color: "black",
                width: "80%",
                borderColor: "black",
                borderWidth: 2,
                padding: "1%",
              }}
              value={selectedDate + " " + Day}
              editable={false}
            ></TextInput>
          </View>
        </View>
        <View style={{ height: "10%" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
              {I18n.t("Time")}
            </Text>
            <Picker
              style={{
                color: "black",
                width: "80%",
                borderColor: "black",
                borderWidth: 2,
              }}
            >
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: "center", marginTop: "10%" }}>
          <View style={{ width: "90%" }}>
            <Button color="navy" title={I18n.t("Request")}></Button>
          </View>
        </View>
      </View>
    </>
  );
}

export default GymRequest;
