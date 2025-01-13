import { Text , View, ScrollView, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/colors";


function ChooseSearch() {
    const navigation = useNavigation()
    return ( 
        <>
         <TouchableOpacity
        onPress={()=>{ }}
        style={[tw` p-2 m-2 border-2 rounded-lg text-right`, { borderColor: colors.primary, backgroundColor:colors.white }]}>
            <Text style={[tw`text-center text-xl font-bold  `, {color: colors.black}]}>Scan Qr </Text>
        </TouchableOpacity> 
        <TouchableOpacity
            onPress={()=>{ 
                navigation.navigate()
            }}
            style={[tw` p-2 m-2 border-2 rounded-lg text-right`, { borderColor: colors.primary, backgroundColor:colors.white }]}>
                <Text style={[tw`text-center text-xl font-bold  `, {color: colors.black}]}>Nearby Drivers </Text>
        </TouchableOpacity> 
        </>
     );
}

export default ChooseSearch;