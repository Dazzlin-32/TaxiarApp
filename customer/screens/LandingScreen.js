import { View, Image, Text, SafeAreaView, TouchableOpacity  } from "react-native";
import tw from 'tailwind-react-native-classnames';
import {colors} from '../constants/colors'
import { RightOutlined, RightCircleOutlined  } from "@ant-design/icons";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import CarRotation from "../components/CarRotation";



const LandingScreen = () => {
    const navigation = useNavigation()
    
    return ( 
        
        <View style={tw`flex-1 p-2 justify-start items-center bg-black dark:bg-black `}>
{/*            
            <Image
            style={
                {
                    width: 350,
                    height: 500,
                    resizeMode: "contain",
                    borderWidth: 1,
                }
            }
            source={require("../assets/landing4.png")}></Image>
            
            <Text
            style={[tw`text-white text-left` ,{fontSize: 28}]}>
                Start planning your trips and save time on the road!</Text>
            <TouchableOpacity style={{
                width:300,
                height: 100, 
                alignItems:"flex-end"                
            }}
            onPress={() => navigation.navigate("Get Started")} 
            >
                <AntDesign name="rightcircleo" size={60} color={colors.primary} />
            </TouchableOpacity> */}
            <CarRotation />
    
           
        </View>
     );
}

export default LandingScreen;