import { View, Image, Text, SafeAreaView, TouchableOpacity  , useWindowDimensions} from "react-native";
import tw from 'tailwind-react-native-classnames';
import {colors} from '../constants/colors'
import { RightOutlined, RightCircleOutlined  } from "@ant-design/icons";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Card, Input } from '@rneui/themed';
import { Button } from '@rneui/themed';



let info = {
    "driverID": "DR12345",
    "name": "Samuel Gebre",
    "email": "samuel.gebre@example.com",
    "phoneNumber": "+251911223344",
    "address": "Piassa, Addis Ababa, Ethiopia",
    "dateOfBirth": "1990-05-14",
    "accountCreated": "2023-11-01",
    "lastLogin": "2025-01-07",
    "accountStatus": "Active",
    "loyaltyPoints": 1500,
    "preferredPaymentMethod": "Credit Card",
    "paymentDetails": {
      "cardType": "Visa",
      "lastFourDigits": "1234",
      "expiryDate": "2026-07"
    },
    "plate": "56790",
     "taxiType": "Black Taxi",
     "maxNum": 8,
  }

  const handleEdit =() =>{
     console.log("Edit pressed")
  }
  

const Account = () => {
    const navigation = useNavigation()    
    return ( 
        <SafeAreaView style={[tw`flex-1 bg-white`, ]}>
            <View style={[tw`items-center justify-center p-0 m-0 h-full`]}>
                         <View style={[tw`items-center  justify-end flex-col w-full p-3`,{ height:230, backgroundColor:colors.primary, borderBottomEndRadius: 30, borderBottomStartRadius: 30} ]}>
                            <Ionicons name="person-sharp" size={40} color={colors.white} />
                            <Text style={tw`font-bold text-3xl text-white my-3`}> {info.name}</Text>
                            <Text style={tw`text-base text-white border rounded bg-white bg-opacity-50 border-white p-1`}>Customer</Text>
                            <TouchableOpacity
                            onPress={()=>{
                              handleEdit()
                            }}>
                              <Text style={tw` m-2 text-base text-white border rounded bg-white bg-opacity-50  border-white p-1`}>
                                   <AntDesign name="edit" color={colors.primary} size={ 25} />
                              </Text>
                            </TouchableOpacity>
                         </View>
                    <View style={[tw`flex-1 justify-center items-center bg-white w-full rounded-lg`,]}>
                         <Card 
                         containerStyle={{borderRadius:20, borderColor: colors.white, borderWidth: 0}}
                         wrapperStyle={[tw`w-full h-full`,{ borderWidth: 0}]}>
                              <Card.Title>Account Informations</Card.Title>
                              <View style={[tw`justify-start  flex-col w-full items-start`, ]}>

                              <Card.Divider />
                              <View style={[tw`justify-start text-sm flex-row w-full items-center` ]}>
                                   <Ionicons name="mail-outline" size={30} color={colors.primary} />
                                   <Text style={tw`font-bold text-base m-2`}> {info.email}</Text>
                                   
                              </View>
                              <View style={tw`justify-start flex-row w-full items-center`}>
                                   <Ionicons name="id-card-outline"size={30} color={colors.primary} />

                                   <Text style={tw`font-bold text-base m-2`}> {info.driverID}</Text>
                                   
                              </View>
                              <View style={tw`justify-start flex-row w-full items-center`}>
                                   <Ionicons name="car-outline"size={30} color={colors.primary} />
                                   <Text style={tw`font-bold text-base m-2`}>{info.taxiType} {info.plate} Plate number</Text>
               
                              </View>
                              <View style={tw`justify-start flex-row w-full items-center`}>
                                   <Ionicons name="people-outline"size={30} color={colors.primary} />
                                   <Text style={tw`font-bold text-base m-2`}>{info.maxNum} Max</Text>
                                   
                              </View>
                              <View style={tw`justify-start flex-row w-full items-center`}>
                                   <Ionicons name="phone-portrait-outline" size={30} color={colors.primary} />

                                   <Text style={tw`font-bold text-base m-2`}> {info.phoneNumber}</Text>
                                   
                              </View>
                              
                              <View style={tw`justify-start flex-row w-full items-center`}>
                                   <Ionicons name="mail-outline" size={30} color={colors.primary} />

                                   <Text style={tw`font-bold text-base m-2`}> {info.address}</Text>
                                   
                              </View>

                           
                              <View style={tw`justify-start flex-row w-full items-center`} >
                                   <Ionicons name="card-outline" size={30} color={colors.primary} />

                                   <Text style={tw`font-bold text-base m-2`}> {info.preferredPaymentMethod}</Text>
                                   
                              </View>
                        

                              <View style={tw`justify-start flex-col w-full p-5 mx-10 items-center border rounded-lg border-gray-300`  } >
                                   <View style={tw`flex-row`}>

                                   <Ionicons name="star-sharp" size={30} color={colors.primary} />
                                   <Ionicons name="star-sharp" size={30} color={colors.primary} />
                                   <Ionicons name="star-sharp" size={30} color={colors.primary} />
                                   <Ionicons name="star-half-sharp" size={30} color={colors.primary} />
                                   </View>

                                   <Text style={tw`font-bold text-base m-2`}>  {info.loyaltyPoints} Points</Text>
                                   
                              </View>
                              
                         
                              </View>
                         </Card>  
                    </View> 
                       </View>
        </SafeAreaView>
     );
}

export default Account;