import { useState, useCallback, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import { useAppNavigation } from '../navigation/hooks';
import { searchUsers } from '../api/searchUsers';
import { addFriend } from '../api/friendRequests';
import { useAuth } from '../contexts/authContext';
import { H1, H2SB, H3, P, Cap, } from '../components/typography';
import { ChevronLeft, Plus, Search } from 'lucide-react-native';

const PURPLE = '#7B5FD9';

type Relationship = {
    connectionStatus: 'pending' | 'accepted' | 'declined' | null;
    relationType: string | null;
    requestedBy: string | null;
} | null;

type SearchUser = {
    _id: string;
    username: string;
    avatar?: string;
    displayName:string;
    relationship: Relationship;
};

export default function AddFriendsScreen() {
    const user = useAuth();
    const navigation = useAppNavigation();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchUser[]>([]);
    const [loading, setLoading] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const runSearch = useCallback(async (text: string) => {
        if (!text.trim() || text.trim().length < 3) {
            setResults([]);
            return;
        }

        setLoading(true);

        try {
            const response = await searchUsers(text);
            setResults(response.users);
        } catch (error) {
            console.error('Error searching users:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, []);

    console.log(user.user._id);
    

    const handleChangeText = (text: string) => {
        setQuery(text);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            runSearch(text);
        }, 500);
    };

    const handleAdd = async (userId: string) => {
        setResults((prev) =>
            prev.map((u) =>
                u._id === userId
                    ? {
                        ...u,
                        relationship: {
                            connectionStatus: 'pending',
                            relationType: 'friends',
                            requestedBy: user.user._id,
                        },
                    }
                    : u
            )
        );

        try {
            await addFriend(userId);
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };

    const handleAccept = async (userId: string) => {
        setResults((prev) =>
            prev.map((u) =>
                u._id === userId
                    ? {
                        ...u,
                        relationship: {
                            connectionStatus: 'accepted',
                            relationType: u.relationship?.relationType ?? null,
                            requestedBy: u.relationship?.requestedBy ?? null,
                        },
                    }
                    : u
            )
        );

        try {
            await addFriend(userId);
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const renderAction = (item: SearchUser) => {
        const rel = item.relationship;

        if (
            !rel ||
            rel.connectionStatus === null ||
            rel.connectionStatus === 'declined'
        ) {
            return (
                <Pressable
                    style={styles.iconButton}
                    onPress={() => handleAdd(item._id)}
                >
                    <Plus />
                </Pressable>
            );
        }

        if (
            rel.connectionStatus === 'pending' &&
            rel.requestedBy === user.user._id
        ) {
            return <Text style={styles.pendingLabel}>Requested</Text>;
        }

        if (
            rel.connectionStatus === 'pending' &&
            rel.requestedBy !== user.user._id
        ) {
            return (
                <Pressable
                    style={styles.acceptButton}
                    onPress={() => handleAccept(item._id)}
                >
                    <Text style={styles.acceptButtonText}>Accept</Text>
                </Pressable>
            );
        }

        if (rel.connectionStatus === 'accepted') {
            return <Text style={styles.friendsLabel}>{rel.relationType}</Text>;
        }

        return null;
    };

    return (
        <>
            <StatusBar
                hidden={false}
                barStyle="dark-content"
            />

            <View style={styles.container}>
                <View style={styles.header}>
                    <Pressable
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <ChevronLeft size={32}/>
                    </Pressable>

                    <H2SB>Add friends</H2SB>
                </View>
                <View style={styles.searchbar}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search with usernames"
                    placeholderTextColor="#9a9a9a"
                    value={query}
                    onChangeText={handleChangeText}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Search size={24}/>
                </View>

                {query.length > 0 && (
                    <Text style={styles.sectionLabel}>
                        Search results
                    </Text>
                )}

                {loading ? (
                    <ActivityIndicator
                        size="small"
                        color={PURPLE}
                        style={{ marginTop: 20 }}
                    />
                ) : (
                    <FlatList
                        data={results}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.row}>
                                <Image
                                    source={
                                        item.avatar
                                            ? { uri: item.avatar }
                                            : require('../assets/images/profilePictures/DP_DEFAULT.jpg')
                                    }
                                    style={styles.avatar}
                                />
                                <View style={styles.listnames}>
                                    {item.displayName ? (
                                        <>
                                            <P style={styles.listnametop}>{item.displayName}</P>
                                            <Cap style={styles.listnamebottom}>{item.username}</Cap>
                                        </>
                                    ) : (
                                        <P style={styles.listnametop}>{item.username}</P>
                                    )}
                                </View>

                                {renderAction(item)}
                            </View>
                        )}
                    />
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 25
    },
    backButton: {
    },
    backIcon: {
        fontSize: 28,
        color: '#1a1a1a',
    },
    headerTitle: {
    },
    searchbar:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1,
        paddingHorizontal: 20,
        borderColor: '#1a1a1a'
    },
    searchInput: {
        fontSize: 16,
    },
    sectionLabel: {
        fontSize: 14,
        color: '#4a4a4a',
        marginTop: 20,
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e0e0e0',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#f2c9c9',
    },
    listnames:{
        flex: 1,
        marginLeft: 15,
        fontSize: 16,
        fontWeight: '600',
        justifyContent: 'center',
    },
    listnametop: {
        marginLeft: 15,
        fontSize: 24,
        fontWeight: '600',
    },
    listnamebottom:{
        marginLeft: 15,
        fontWeight: '700',
    },
    iconButton: {
        padding: 6,
    },
    plusIcon: {
        fontSize: 24,
        color: '#1a1a1a',
        fontWeight: '400',
    },
    pendingLabel: {
        fontSize: 13,
        color: '#8a8a8a',
        fontStyle: 'italic',
    },
    acceptButton: {
        backgroundColor: '#1a1a1a',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    acceptButtonText: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '700',
    },
    friendsLabel: {
        fontSize: 13,
        color: '#8a8a8a',
    },
});