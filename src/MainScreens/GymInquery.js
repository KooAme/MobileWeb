import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AppHeader from "../Custom/AppHeaders";
import CustomButton from "../Custom/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import I18n from "../../i18n";
function GymInquery(props) {
  /*@params isStartDatePickerVisible  : 언제부터 조회할 지 확인해주는 달력의 화면 출력을 명시
    @parmas isEndDatePickerVisible : 언제까지 조회할 지 확인해주는 달력의 화면 출력을 명시
    @params startDate  : 시작 날짜의 value
    @params endDate    : 끝 날짜의 value
    warning ! moment로 날짜를 문자형식으로 formatting 한후 가 아니면 error발생 Type Error
  */
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const titles = StyleSheet.create({
    container: {
      alignItems: "center",
    },
  });
  const details = StyleSheet.create({
    innerbox: {
      flex: 1,
      height: "100%",
      flexDirection: "column",
      alignItems: "center",
    },
    font: {
      fontWeight: "bold",
      color: "black",
    },
  });
  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };
  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };
  const handleStartConfirm = (date) => {
    setStartDate(
      moment(date).format(
        "YYYY" +
          I18n.t("year") +
          "          MM" +
          I18n.t("Month") +
          "          DD" +
          I18n.t("day")
      )
    );
    hideStartDatePicker();
  };
  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };
  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };
  const handleEndConfirm = (date) => {
    setEndDate(
      moment(date).format(
        "YYYY" +
          I18n.t("year") +
          "          MM" +
          I18n.t("Month") +
          "          DD" +
          I18n.t("day")
      )
    );
    hideDatePicker();
  };
  return (
    <>
      <AppHeader
        isLeft={true}
        title={I18n.t("ASInquery")}
        navigation={props.navigation}
      ></AppHeader>
      <View
        style={{
          height: "90%",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            height: "10%",
            borderWidth: 1,
            marginTop: "5%",
            borderRadius: 15,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "80%",
              flexDirection: "column",
            }}
          >
            <View style={titles.container}>
              <TouchableOpacity onPress={showStartDatePicker}>
                <View
                  style={{
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      width: "100%",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {startDate
                      ? startDate
                      : "          " +
                        I18n.t("year") +
                        "          " +
                        I18n.t("month") +
                        "          " +
                        I18n.t("day")}
                  </Text>
                </View>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isStartDatePickerVisible}
                mode="date"
                locale="ko_KR"
                onConfirm={handleStartConfirm}
                onCancel={hideStartDatePicker}
              />
            </View>
            <View style={titles.container}>
              <Text>~</Text>
            </View>
            <View style={titles.container}>
              <TouchableOpacity
                style={titles.container}
                onPress={showEndDatePicker}
              >
                <View
                  style={{
                    width: "100%",
                  }}
                >
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    {endDate
                      ? endDate
                      : "          " +
                        I18n.t("year") +
                        "          " +
                        I18n.t("month") +
                        "          " +
                        I18n.t("day")}
                  </Text>
                </View>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isEndDatePickerVisible}
                mode="date"
                locale="ko_KR"
                onConfirm={handleEndConfirm}
                onCancel={hideEndDatePicker}
              />
            </View>
          </View>
          <View style={{ width: "20%" }}>
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0)",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{ color: "black", fontWeight: "bold", fontSize: 20 }}
              >
                {I18n.t("Inquery")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: "90%",
            height: "80%",
            borderWidth: 1,
            marginTop: "1%",
            borderRadius: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: "5%",
              marginBottom: "5%",
            }}
          >
            <View style={details.innerbox}>
              <Text style={details.font}>{I18n.t("Date")}</Text>
            </View>
            <View style={details.innerbox}>
              <Text style={details.font}>{I18n.t("Time")}</Text>
            </View>
            <View style={details.innerbox}>
              <Text style={details.font}>{I18n.t("Condition")}</Text>
            </View>
            <View style={details.innerbox}>
              <Text style={details.font}></Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
export default GymInquery;
