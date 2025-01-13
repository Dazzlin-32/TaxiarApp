import { View, Image, Text, SafeAreaView, TouchableOpacity  } from "react-native";
import tw from 'tailwind-react-native-classnames';
import {colors} from '../constants/colors'
import { RightOutlined, RightCircleOutlined  } from "@ant-design/icons";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Card, Input } from '@rneui/themed';
import { Button } from '@rneui/themed';



const SignIn = () => {
    const navigation = useNavigation()
    
    return ( 
        <SafeAreaView style={tw`flex-1 p-2 justify-center items-center bg-transparent`}>
            <View style={tw`flex-1 p-2 justify-center items-center bg-transparent`}>
            <Card 
                containerStyle={{borderRadius:20}}>
                    <Card.Title>Sign In</Card.Title>
                    <Card.Divider />
                   
                    <Input
                    label="Phone Number"
                     placeholder='+2519'
                     required
                     
                    />
                      <Input 
                      label="Password"
                      placeholder="Password"
                       secureTextEntry={true}
                       required />
                    
                       <Button 
                        title="LOG IN"
                        buttonStyle={{
                          backgroundColor: colors.primary,
                          borderWidth: 2,
                          borderColor: 'white',
                          borderRadius: 30,
                        }}
                        containerStyle={{
                          width: 200,
                          marginHorizontal: 50,
                          marginVertical: 10,
                        }}
                        titleStyle={{ fontWeight: 'bold' }}
                        onPress={()=>{navigation.navigate("HomeScreen")}}
                       />
                </Card>
            </View>
        </SafeAreaView>
     );
}

export default SignIn;