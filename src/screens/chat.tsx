import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/authContext';
import { useAppNavigation, useAppRoute } from '../navigation/hooks';
import { getConversation } from '../api/getConversation';
import { getSocket } from '../socket/socket';
import { ChevronLeft, Images, PlayingCards } from 'lucide-react-native';
import { Cap, H3M } from '../components/typography';

const PURPLE = '#543888';
const LIGHT_PURPLE = 'rgba(132, 93, 204, 0.25)';

type Message = {
  _id: string;
  conversationId: string;
  senderId: { _id: string; username: string };
  content: string;
  type: 'text' | 'image';
  createdAt: string;
};

type Participant = {
  _id: string;
  username: string;
  avatar: string;
  status: 'online' | 'offline';
};

export default function ChatScreen() {
  const navigation = useAppNavigation();
  const route = useAppRoute<'Chat'>();
  const { userId, username } = route.params;
  const { user } = useAuth();
  const myId = user._id;
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation, setConversation] = useState<any>(null);
  const [draft, setDraft] = useState('');
  const listRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();

  const otherParticipant: Participant | undefined = conversation?.participants.find(
    (p: Participant) => p._id === userId
  );

  // Fetch conversation + messages
  useEffect(() => {
    const loadConversation = async () => {
      try {
        const data = await getConversation(userId);
        setMessages(data.messages || []);
        setConversation(data.conversation);
      } catch (error) {
        console.error('Error fetching conversation:', error);
      }
    };

    loadConversation();
  }, [userId]);

  // Join conversation room + listen for incoming messages
  useEffect(() => {
    if (!conversation?._id) return;

    const socket = getSocket();
    if (!socket) {
      console.error('Socket is not connected');
      return;
    }

    socket.emit('join_conversation', { conversationId: conversation._id });
    console.log("after join convo", conversation._id);


    const handleIncoming = (message: Message) => {
      if (message.conversationId !== conversation._id) {
        return;
      }

      setMessages((prev) => {
        // Safety check in case the same server message
        // somehow arrives more than once.
        if (prev.some((item) => item._id === message._id)) {
          return prev;
        }

        return [...prev, message];
      });
    };

    socket.on('receive_message', handleIncoming);

    return () => {
      socket.emit('leave_conversation', { conversationId: conversation._id });
      socket.off('receive_message', handleIncoming);
    };
  }, [conversation?._id]);

  const handleSend = () => {
    const text = draft.trim();

    if (!text || !conversation?._id) return;

    const socket = getSocket();

    if (!socket) {
      console.error('Socket is not connected');
      return;
    }

    socket.emit('send_message', {
      conversationId: conversation._id,
      content: text,
      type: 'text',
    });

    // Clear input immediately.
    // The actual message will be added when the server
    // sends "receive_message".
    setDraft('');
  };

  const formatTime = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const isMe = item.senderId._id === myId;
    const nextMessage = messages[index + 1];
    const isLastInGroup = !nextMessage || nextMessage.senderId._id !== item.senderId._id;

    if (item.type === 'image') {
      return (
        <View style={[styles.messageRow, isMe ? styles.rowRight : styles.rowLeft]}>
          <Image source={{ uri: item.content }} style={styles.imageMessage} />
          {isLastInGroup && (
            <Text style={[styles.timeText, isMe ? styles.timeRight : styles.timeLeft]}>
              {formatTime(item.createdAt)}
            </Text>
          )}
        </View>
      );
    }

    return (
      <View style={[styles.messageRow, isMe ? styles.rowRight : styles.rowLeft]}>
        <View style={[styles.bubble, isMe ? styles.bubbleRight : styles.bubbleLeft]}>
          <Text style={[styles.bubbleText, isMe ? styles.bubbleTextRight : styles.bubbleTextLeft]}>
            {item.content}
          </Text>
        </View>
        {isLastInGroup && (
          <Text style={[styles.timeText, isMe ? styles.timeRight : styles.timeLeft]}>
            {formatTime(item.createdAt)}
          </Text>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeft size={32} />
        </Pressable>

        <View style={styles.headerCenter}>
          <H3M style={styles.headerName}>{username}</H3M>

          {otherParticipant?.status === 'online' && (
            <Cap style={styles.activeText}>
              Active Now
            </Cap>
          )}
        </View>

        <Image
          source={
            otherParticipant?.avatar
              ? { uri: otherParticipant.avatar }
              : require('../assets/images/profilePictures/DP_DEFAULT.jpg')
          }
          style={styles.headerAvatar}
        />
      </View>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() =>
          listRef.current?.scrollToEnd({ animated: true })
        }
      />

      <View style={[
        styles.inputBar,
        {
          paddingBottom: Math.max(insets.bottom, 15) + 20,
        },
      ]}>
        <Pressable style={styles.inputIcon}>
          <PlayingCards size={24} />
        </Pressable>

        <TextInput
          style={styles.textInput}
          placeholder="type a message..."
          placeholderTextColor="#8a8a8a"
          value={draft}
          onChangeText={setDraft}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />

        <Pressable style={styles.inputIcon}>
          <Images size={24} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: LIGHT_PURPLE,
    paddingHorizontal: 25,
    height: '15%',
    paddingBottom: 16,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  backButton: {
  },
  backIcon: {
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerName: {
  },
  activeText: {
    color: '#4CAF50',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#1a1a1a',
    backgroundColor: '#f2c9c9',
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    flexGrow: 1,
  },
  messageRow: {
    marginBottom: 14,
    maxWidth: '75%',
  },
  rowLeft: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  rowRight: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 15,
  },
  bubbleLeft: {
    backgroundColor: PURPLE,
    borderBottomLeftRadius: 4,
  },
  bubbleRight: {
    backgroundColor: PURPLE,
    borderBottomRightRadius: 4,
  },
  bubbleText: {
    fontSize: 15,
  },
  bubbleTextLeft: {
    color: '#ffffff',
  },
  bubbleTextRight: {
    color: '#ffffff',
  },
  imageMessage: {
    width: 160,
    height: 160,
    borderRadius: 16,
  },
  timeText: {
    fontSize: 11,
    color: '#9a9a9a',
    marginTop: 4,
  },
  timeLeft: {
    marginLeft: 4,
  },
  timeRight: {
    marginRight: 4,
  },
  inputBar: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LIGHT_PURPLE,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  inputIcon: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
  inputIconText: {
    fontSize: 20,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    marginHorizontal: 8,
  },
});