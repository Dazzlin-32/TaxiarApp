import { View, Image, Text, SafeAreaView, TouchableOpacity  } from "react-native";
import tw from 'tailwind-react-native-classnames';
import {colors} from '../constants/colors'
import { RightOutlined, RightCircleOutlined  } from "@ant-design/icons";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Card, Input } from '@rneui/themed';
import { Button } from '@rneui/themed';



const SignUp = () => {
    const navigation = useNavigation()
    
    return ( 
        <SafeAreaView style={tw`flex-1 p-2 my-4 justify-center items-center bg-transparent`}>
            <View style={tw`flex-1 p-2 justify-center items-center bg-transparent`}>
                <Card 
                containerStyle={{borderRadius:20}}>
                    <Card.Title>Register</Card.Title>
                    <Card.Divider />
                    <Input
                     placeholder='Full Name'
                     label="Full Name"
                    required
                    />
                    <Input
                     placeholder='********'
                     label="Fayda ID"
                     required
                    />
                    <Input
                    label="Phone Number"
                     placeholder='+2519'
                     required
                     
                    />
                      <Input 
                      label="Plate Number"
                      placeholder="Plate Number"
                       secureTextEntry={true}
                       required />
                        <Input 
                      label="Licensce"
                      placeholder="Licence Number"
                       secureTextEntry={true}
                       required />
                        <Input 
                      label="Create Password"
                      placeholder="Password"
                       secureTextEntry={true}
                       required />
                     <Input 
                      label="Enter password again"
                      placeholder="Password"
                       secureTextEntry={true}
                       required />
                       <Button 
                        title="SIGN UP"
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
                        onPress={()=>{navigation.navigate("Sign In")}}
                       />
                </Card> 
            </View>
        </SafeAreaView>
     );
}

export default SignUp;