import { LogOut } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useAuth } from "../contexts/authContext";
import { H3SB } from "../components/typography";

export default function MyProfile (){
    const {logout} = useAuth();

    return(
        <View style={{flex: 1, backgroundColor: 'black'}}>
            <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                <H3SB style={{color: 'white'}}>Profile thodi crrrawzy bana raha hun, coming soon!</H3SB>
            </View>
        <Pressable
        onPress={logout}
        style={
            {
                backgroundColor: 'red',
                flexDirection: 'row',
                marginTop: 'auto',
                marginBottom: 50,
                padding: '10',
                borderRadius: 15,
                alignSelf: 'center'
            }
        }>
            <Text style={{fontSize: 24, color: 'white'}}>Logout</Text>
            <LogOut style={{marginLeft: 10}} size={32} color={'white'}/>
        </Pressable>
        </View>
    )
};