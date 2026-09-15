import { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { useAppNavigation } from '../navigation/hooks';
import { getNotifications } from '../api/services';
import { acceptRequest } from '../api/friendRequests';
import { ChevronLeft } from 'lucide-react-native';
import { H2SB, H1SB } from '../components/typography';

type FriendRequest = {
    _id: string;
    userA: string;
    userB: string;
    requestedBy: {
        _id: string;
        username: string;
        avatar: string;
    };
    requestedTo: string;
    connectionStatus: 'pending' | 'accepted' | 'declined';
    relationType: string;
    createdAt: string;
    updatedAt: string;
};

function timeAgo(dateString: string): string {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
}

export default function FriendRequestsScreen() {
    const navigation = useAppNavigation();
    const [requests, setRequests] = useState<FriendRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [acceptingIds, setAcceptingIds] = useState<string[]>([]);

    const fetchRequests = useCallback(async () => {
        try {
            const response = await getNotifications();
            setRequests(response);
        } catch (error) {
            console.error('Error fetching friend requests:', error);
            setRequests([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const handleAccept = async (relationshipId: string) => {
        setAcceptingIds((prev) => [...prev, relationshipId]);
        try {
            await acceptRequest(relationshipId);
            setRequests((prev) => prev.filter((r) => r._id !== relationshipId));
        } catch (error) {
            console.error('Error accepting friend request:', error);
        } finally {
            setAcceptingIds((prev) => prev.filter((id) => id !== relationshipId));
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backIcon}><ChevronLeft size={32}/></Text>
                </Pressable>
                <H2SB style={styles.headerTitle}>Requests</H2SB>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#845DCC" style={{ marginTop: 50 }} />
            ) : requests.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No pending requests right now.</Text>
                </View>
            ) : (
                <FlatList
                    data={requests}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <Image
                                source={
                                    item.requestedBy.avatar
                                        ? { uri: item.requestedBy.avatar }
                                        : require('../assets/images/profilePictures/DP_DEFAULT.jpg')
                                }
                                style={styles.avatar}
                            />
                            <View style={styles.info}>
                                <Text style={styles.username}>{item.requestedBy.username}</Text>
                                <Text style={styles.subtext}>
                                    Sent you friend request  {timeAgo(item.createdAt)}
                                </Text>
                            </View>
                            <Pressable
                                style={styles.acceptButton}
                                onPress={() => handleAccept(item._id)}
                                disabled={acceptingIds.includes(item._id)}
                            >
                                {acceptingIds.includes(item._id) ? (
                                    <ActivityIndicator size="small" color="#ffffff" />
                                ) : (
                                    <Text style={styles.acceptButtonText}>Accept</Text>
                                )}
                            </Pressable>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: '20%',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(132, 93, 204, 0.5)',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        paddingHorizontal: 25,
        paddingBottom: 10,
        marginBottom: 24,
    },
    backButton: {
        marginBottom: 10
    },
    backIcon: {
        fontSize: 28,
        color: '#1a1a1a',
    },
    headerTitle: {
        marginLeft: 'auto',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e0e0e0',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#f2c9c9',
    },
    info: {
        flex: 1,
        marginLeft: 14,
    },
    username: {
        fontSize: 17,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    subtext: {
        fontSize: 13,
        color: '#8a8a8a',
        marginTop: 2,
    },
    acceptButton: {
        backgroundColor: '#1a1a1a',
        paddingHorizontal: 18,
        paddingVertical: 9,
        borderRadius: 10,
    },
    acceptButtonText: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '700',
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 15,
        color: '#8a8a8a',
    },
});