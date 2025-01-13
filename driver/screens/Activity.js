import { View, Image, Text, SafeAreaView, TouchableOpacity, ScrollView  } from "react-native";
import tw from 'tailwind-react-native-classnames';
import {colors} from '../constants/colors'
import { RightOutlined, RightCircleOutlined  } from "@ant-design/icons";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Card, Input } from '@rneui/themed';
import { Button } from '@rneui/themed';
import data from '../constants/activities.json'


const Activity = () => {
    const navigation = useNavigation()


    return ( 
        <SafeAreaView style={tw`flex-1 p-2 justify-center items-left bg-transparent`}>
            <ScrollView >
                {
                    data.map( 
                        (x, i) => (
                            <Card 
                     containerStyle={{borderRadius:20}}>
                    <View style={{flexDirection: 'row',  alignItems: "center", justifyContent: 'space-between'}}>

                     <Ionicons name="car-sport-sharp" size={50} color={colors.black} />
                    <View  style={{flexDirection: 'column'}}>
                         <Text style={tw`mx-2 font-bold text-base`}>{x.destination}</Text>
                        <Card.Divider/>
                        <Text style={tw`font-bold`}>{x.driverName}          {x.rating}
                            <Ionicons name="star-sharp" size={15} color={colors.primary} />
                        </Text>
                        <Text   style={tw``}>{x.date}</Text>
                        <Text style={tw`my-1`}>{x.price}</Text>
                    </View>
                    <TouchableOpacity  
                    onPress={ ()=>{
                        
                    }}>
                        <Ionicons name="reload-circle-sharp" color={colors.primary} size={20} />
                        <Text>Rebook</Text>
                    </TouchableOpacity>
                    </View>
                
                    
                </Card> 
                            )
                    )
                }
                
            </ScrollView>
        </SafeAreaView>
     );
}

export default Activity;