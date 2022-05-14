import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import SettingMain from '../src/SettingScreens/Main.js';
import CommunityMain from '../src/CommunityScreens/Main';
import Main from '../src/MainScreens/Main';
import CommunityStackNav from './CommunityStackNav.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import I18n from '../i18n/index.js';

const Tab = createBottomTabNavigator();

const BottomTabNav = (props) => {
  const [clickIcon, setClickIcon] = useState('Home');

  return (
    //BOTTOM TAB NAVIGATION
    <Tab.Navigator screenOptions={{ headerShown: false, unmountOnBlur: true }}>
      <Tab.Screen
        listeners={{
          tabPress: (e) => {
            setClickIcon('Home');
          },
        }}
        name={I18n.t('Home')}
        component={Main}
        options={{
          tabBarIcon: () => (
            <Icon
              name='home'
              size={30}
              color={clickIcon === 'Home' ? '#0064ff' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        listeners={{
          tabPress: (e) => {
            setClickIcon('Community');
          },
        }}
        name={I18n.t('Community')}
        component={CommunityStackNav}
        options={{
          tabBarIcon: () => (
            <Icon
              name='blackboard'
              size={30}
              color={clickIcon === 'Community' ? '#0064ff' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        listeners={{
          tabPress: (e) => {
            setClickIcon('Setting');
          },
        }}
        name={I18n.t('Setting')}
        options={{
          tabBarIcon: () => (
            <Icon
              name='grid'
              size={30}
              color={clickIcon === 'Setting' ? '#0064ff' : 'gray'}
            />
          ),
        }}
        children={() => (
          <SettingMain
            navigation={props.navigation}
            isLogined={props.isLogined}
            setUserInfo={props.setUserInfo}
            userInfo={props.userInfo}
          ></SettingMain>
        )}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNav;
