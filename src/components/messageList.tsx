import { useState } from 'react';
import { View, FlatList, Text } from 'react-native';


export default function MessageList({ messages }) {
  return (
    <View>
        <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item}) => (
            <Text>{item.content}</Text>
        )}
        />
    </View>
  );
}