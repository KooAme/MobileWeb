import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomDrawer from "./src/Custom/CustomDrawer";
import SignIn from "./src/MainScreens/SignIn";
import SignUp from "./src/MainScreens/SignUp";
import GymRequest from "./src/MainScreens/GymRequst";
import OutRequest from "./src/MainScreens/OutRequest";
import BusRequest from "./src/MainScreens/BusRequest";
import ASRequest from "./src/MainScreens/ASRequest";
import ASInquery from "./src/MainScreens/ASInquery";
import OutInquery from "./src/MainScreens/OutInquery";
import GymInquery from "./src/MainScreens/GymInquery";
import BusInquery from "./src/MainScreens/BusInquery";
import BottomTabNav from "./navigation/BottomTabNav";
import { SafeAreaView } from "react-native";
import I18n from "./i18n";

const Drawer = createDrawerNavigator();

const App = () => {
  /**
   * @params isLogined : Login확인용 임시변수
   * @params stdNum     : 학번 인식 변수 겸 useEffect에서 2번째 인자로 사용할 변수
   * @params getData    : AsyncStorage에서 value 값을 꺼내올 변수
   */
  const [isLogined, setIsLogined] = useState(false);
  const [userInfo, setUserInfo] = useState();
  I18n.locale = "ko";
  useEffect(() => {
    AsyncStorage.getItem("user_info", (err, result) => {
      console.log(result);
      if (result) {
        setUserInfo(JSON.parse(result));
        setIsLogined(true);
      } else {
        setUserInfo();
        setIsLogined(false);
      }
    });
  }, [isLogined]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>
      <NavigationContainer>
        <Drawer.Navigator
          backBehavior="history"
          screenOptions={{
            drawerPosition: "right",
            headerShown: false,
          }}
          drawerContent={(props) => (
            <CustomDrawer
              {...props}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              isLogined={isLogined}
              setIsLogined={setIsLogined}
            />
          )}
        >
          {
            // 모든 화면이 메인화면에 연동되어 있어서 보이지 않더라도 이동을 위해 남겨둠
          }
          <Drawer.Screen
            name="home"
            options={{ unmountOnBlur: true }}
            children={({ navigation }) => {
              return (
                <BottomTabNav
                  navigation={navigation}
                  userInfo={userInfo}
                  isLogined={isLogined}
                  setUserInfo={setUserInfo}
                ></BottomTabNav>
              );
            }}
          ></Drawer.Screen>
          <Drawer.Screen
            options={{
              drawerItemStyle: { display: "none", unmountOnBlur: true },
            }}
            name="ASRequest"
            component={ASRequest}
          ></Drawer.Screen>
          <Drawer.Screen
            options={{
              drawerItemStyle: { display: "none", unmountOnBlur: true },
            }}
            name="ASInquery"
            component={ASInquery}
          ></Drawer.Screen>
          <Drawer.Screen
            options={{
              drawerItemStyle: { display: "none", unmountOnBlur: true },
            }}
            name="OutRequest"
            component={OutRequest}
          ></Drawer.Screen>
          <Drawer.Screen
            options={{
              drawerItemStyle: { display: "none", unmountOnBlur: true },
            }}
            name="OutInquery"
            component={OutInquery}
          ></Drawer.Screen>
          <Drawer.Screen
            options={{
              drawerItemStyle: { display: "none", unmountOnBlur: true },
            }}
            name="GymRequest"
            component={GymRequest}
          ></Drawer.Screen>
          <Drawer.Screen
            options={{
              drawerItemStyle: { display: "none", unmountOnBlur: true },
            }}
            name="GymInquery"
            component={GymInquery}
          ></Drawer.Screen>
          <Drawer.Screen
            options={{
              drawerItemStyle: { display: "none", unmountOnBlur: true },
            }}
            name="BusRequest"
            component={BusRequest}
          ></Drawer.Screen>
          <Drawer.Screen
            options={{
              drawerItemStyle: { display: "none", unmountOnBlur: true },
            }}
            name="BusInquery"
            component={BusInquery}
          ></Drawer.Screen>
          <Drawer.Screen
            options={{
              drawerItemStyle: { display: "none", unmountOnBlur: true },
            }}
            name="LogOut"
            component={BottomTabNav}
          ></Drawer.Screen>
          <Drawer.Screen
            options={{
              drawerItemStyle: { display: "none", unmountOnBlur: true },
            }}
            name="SignUp"
            component={SignUp}
          ></Drawer.Screen>
          {
            // 로그인시 성공시 학번이 입력받아와져 useEffect가 작동해야 되기 때문에 Sign에 props 로 setStdNum으로 값을 넘겨줌
            // warning! props안에 navigation도 같이 전닳해주지 않으면 전달안될 위험있음!
          }
          <Drawer.Screen
            options={{
              drawerItemStyle: { display: "none", unmountOnBlur: true },
            }}
            name="SignIn"
            children={({ navigation }) => (
              <SignIn
                navigation={navigation}
                setUserInfo={setUserInfo}
                setIsLogined={setIsLogined}
              ></SignIn>
            )}
          ></Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};
export default App;
