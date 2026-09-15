import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getUsers } from "../api/getUsers";
import { useAppNavigation } from "../navigation/hooks";
import { P } from "./typography";
import UserListItem from "./userListItem";

const PURPLE = "#7B5FD9";

export default function UserList() {
    const navigation = useAppNavigation();

    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await getUsers();

                console.log("Fetched friends:", response);

                setFriends(response.friends ?? []);
            } catch (error) {
                console.error("Error fetching friends:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, []);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={PURPLE} />
            </View>
        );
    }

    if (friends.length === 0) {
        return (
            <View style={styles.centered}>
                <P style={{ color: "black", fontSize: 16 }}>
                    Ohh God! please give this person some friends.
                </P>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={friends}
                keyExtractor={(item) => item.relationshipId}
                renderItem={({ item }) => {
                    const user = item.user;

                    return (
                        <UserListItem
                            name={user.username}
                            displayname ={user.displayname}
                            avatarUri={user.avatar}
                            streak={user.streak ?? 0}
                            statusLabel={item.relationType ?? "Friends"}
                            onPress={() =>
                                navigation.navigate("Chat", {
                                    userId: user._id,
                                    username: user.username,
                                })
                            }
                        />
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
});