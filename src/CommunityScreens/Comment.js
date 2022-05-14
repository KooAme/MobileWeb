import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import I18n from "../../i18n";
import { SERVER_URL } from "@env";

const Comment = () => {
  return (
    <View style={{ borderWidth: 1, padding: 5, backgroundColor: "white" }}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}>작성자 : </Text>
        <Text style={styles.content}>익명</Text>
        <Text style={styles.title}>작성일 : </Text>
        <Text style={styles.content}>2022-05-05</Text>
        <Text style={styles.title}>ID : </Text>
        <Text style={styles.content}>1F5X3XC6A8</Text>
      </View>
      <View style={{ flexDirection: "row-reverse", marginLeft: 10 }}>
        <TouchableOpacity>
          <Text>{I18n.t("Delete")}</Text>
        </TouchableOpacity>
      </View>
      <Text>
        Imagine you have a very long list of items you want to display, maybe
        several screens worth of content. Creating JS components and native
        views for everything all at once, much of which may not even be shown,
        will contribute to slow rendering and increased memory usage.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "black",
  },
  content: {
    marginRight: "1%",
  },
});
export default Comment;
