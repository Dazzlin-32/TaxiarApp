import { View, Image, Text, SafeAreaView, TouchableOpacity  } from "react-native";
import tw from 'tailwind-react-native-classnames';
import {colors} from '../constants/colors'
import { RightOutlined, RightCircleOutlined  } from "@ant-design/icons";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Button } from "@rneui/themed";



const GetStarted = () => {
    const navigation = useNavigation()
    
    return ( 
        
        <View style={tw`flex-1 p-2 justify-start items-center bg-black dark:bg-black `}>
           
            <Image
            style={
                {
                    width: 350,
                    height: 500,
                    resizeMode: "contain",
                    borderWidth: 1,
                }
            }
            source={require("../assets/landing3.png")}></Image>
            
            <Text
            style={[tw`text-white text-left` ,{fontSize: 28}]}>
               Get Started! </Text>
            <Button 
             title="Register"
             buttonStyle={{
               backgroundColor: colors.white,
               borderWidth: 2,
               borderColor: 'white',
               borderRadius: 30,
             }}
             containerStyle={{
               width: 250,
               marginHorizontal: 50,
               marginVertical: 10,
             }}
             titleStyle={{ fontWeight: 'bold', color: colors.black }}
             onPress={ ()=>{navigation.navigate("Sign Up")}}/>
           
            <Button 
             title="Sign In"
             buttonStyle={{
               backgroundColor: 'black',
               borderWidth: 2,
               borderColor: 'white',
               borderRadius: 30,
             }}
             containerStyle={{
               width: 250,
               marginHorizontal: 50,
               marginVertical: 10,
             }}
             titleStyle={{ fontWeight: 'bold', color: colors.primary }}
             onPress={ ()=>{navigation.navigate("Sign In")}}/>
           
        </View>
     );
}

export default GetStarted;