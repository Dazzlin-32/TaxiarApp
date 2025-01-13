import { SafeAreaView, StyleSheet, View, Image,Text, ScrollView, Modal, TouchableOpacity } from 'react-native'
import React , {useState, useEffect}from 'react'
import tw from 'tailwind-react-native-classnames';
import 'react-native-get-random-values'
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination, setDistance, setDuration, setStart } from '../slices/navSlice';
import Map from '../components/Map';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin,  } from '../slices/navSlice';


import { colors } from '../constants/colors';


  
  


const Trip = () => {
    const dispatch = useDispatch();

    const [locations, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const [mapHeight, setMapHeight] = useState(540)

    //variable for bttomSheet
    const [isVisible, setIsVisible] = useState(false)
  

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
           

                <View style={[tw`p-5`, ]}>
                    <Image
                        style={
                            {
                                width: 100,
                                height: 50,
                                resizeMode: "contain",
                                marginTop: 10
                            }
                        }
                        source={require("../assets/taxiblacklogo.png")}
                    />
                </View>
                <View style={[tw`m-2 p-1 h-full border`, { borderWidth: 0, borderColor: colors.black}]}>
                        <Map >
                             
                        </Map>
                </View>

                
                
                 
                
                  
                
             
                
           
        </SafeAreaView >
    )
}

export default Trip;

const styles = StyleSheet.create({});