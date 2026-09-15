import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StatusBar,
  StyleSheet,
  Image
} from 'react-native';
import { styles } from '../styles/homestyles';
import UserList from '../components/userList';
import { useAppNavigation } from '../navigation/hooks';
import { Search, Inbox, User, Plus, MessageCircle, Scale } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BANANA_LOGO = require('../assets/images/bananaLogo.png');

export default function HomeScreen() {
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar hidden={false} barStyle="light-content"/>
      <View style={[styles.container,{
        paddingBottom: Math.max(insets.bottom, 12),
      }]}>
        <View style={styles.header}>
          <Image
              source={BANANA_LOGO}
              style={styles.logo}
              resizeMode='contain'
          />
          <View style={styles.headerIcons}>
            {/* <Pressable
              style={styles.iconButton}
              onPress={() => navigation.navigate('LocalSearch')}
            >
              <Text><Search size={32} color={"white"}/></Text>
            </Pressable> */}
            <Pressable
              style={styles.iconButton}
              onPress={() => navigation.navigate('Requests')}
            >
              <Text><Inbox size={32} color={"white"} /></Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.listContainer}>
          <UserList />
        </View>

        <View style={styles.bottomBar}>
          <Pressable style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.tabIcon}><MessageCircle size={32} color={"white"}/></Text>
            <Text style={styles.tabLabel}>Chats</Text>
          </Pressable>

          <Pressable style={styles.tabItem} onPress={() => navigation.navigate('AddFriends')}>
            <Text style={styles.tabIcon}><Plus size={32} color={"white"}/></Text>
            <Text style={styles.tabLabel}>Add Friend</Text>
          </Pressable>

          <Pressable style={styles.tabItem} onPress={() => navigation.navigate('MyProfile')}>
            <Text style={styles.tabIcon}><User size={32} color={"white"}/></Text>
            <Text style={styles.tabLabel}>Profile</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

