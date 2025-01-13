import { SafeAreaView, StyleSheet, View, Image,Text, ScrollView, Modal, TouchableOpacity } from 'react-native'
import React , {useState, useEffect}from 'react'
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import 'react-native-get-random-values'
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination,  } from '../slices/navSlice';
import Map from '../components/Map';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../slices/navSlice';

import { useNavigation } from '@react-navigation/native';


  
  


const HomeScreen = () => {
    const dispatch = useDispatch();
    const [locations, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const origin = useSelector(selectOrigin);
    const [mapHeight, setMapHeight] = useState(640);

    

   


//Get Location
  useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.log("Permission Denied!")
        return;
      }

      if (status === 'granted') {
       
        console.log("Permission Not  Denied!")
        return;
      }
      let location = await Location.getCurrentPositionAsync({});      
      setLocation(location);
      console.log("Current location from HomeScreen", locations)


      dispatch(setOrigin({
          lat: locations.coords.latidude,
          lng:  locations.coords.longitude
      }))
      console.log("Origin from HomeScreen",origin)
    }
    
    getCurrentLocation();
  }, []);



 

  


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
                <View style={[ { height:mapHeight}]}>
                        <Map  />
                          
                       
                </View>


              

            
        </SafeAreaView >
    )
}

export default HomeScreen;

const styles = StyleSheet.create({});