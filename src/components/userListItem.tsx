import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { CapB, H3B, H3SB, PB } from './typography';

type UserListItemProps = {
  name: string;
  displayname?: string;
  avatarUri?: string;
  streak: number | string;
  statusLabel: string; // e.g. "Best Friends", "Love", "unbreakable"
  onPress?: () => void;
};

export default function UserListItem({ name, displayname, avatarUri, streak, statusLabel, onPress }: UserListItemProps) {
  const [subtext, setSubtext] = useState(null);

  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Image
        source={avatarUri ? { uri: avatarUri } : require('../assets/images/profilePictures/DP_DEFAULT.jpg')}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <H3SB style={styles.name}>{displayname || name}</H3SB>
        {subtext && <Text style={styles.subtext}>{subtext}</Text>}
      </View>
      <View style={styles.streakBlock}>
        <PB style={styles.streakNumber}>{streak > 0 ? `🔥 ${streak}` : "🤝"}</PB>
        <CapB style={styles.streakLabel}>{statusLabel}</CapB>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderColor: '#271F30',
    borderWidth: 1
  },
  info: {
    flex: 1,
    marginLeft: 20,
  },
  name: {
  },
  subtext: { 

   },
  streakBlock: {
    alignItems: 'flex-end',
  },
  streakNumber: {
  },
  streakLabel: {
  },
});