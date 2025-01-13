import { SafeAreaView, StyleSheet, View, Image,Text, ScrollView, Modal, TouchableOpacity } from 'react-native'
import React , {useState, useEffect}from 'react'
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values'
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination, setDistance, setDuration, setStart } from '../slices/navSlice';
import Map from '../components/Map';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin,  } from '../slices/navSlice';
import Overlay from '../components/Overlay';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSequence,
    withSpring,
    withRepeat,
    withDelay
  } from 'react-native-reanimated';
import { colors } from '../constants/colors';


  
  


const HomeScreen = () => {
    const dispatch = useDispatch();

    const [locations, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const [mapHeight, setMapHeight] = useState(540)

    //variable for bttomSheet
    const [isVisible, setIsVisible] = useState(false)
    //For Bouncing of image
    const translateY = useSharedValue(0);
    const translateX = useSharedValue(0);

    // Animated styles
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }, {translateX: translateX.value}],
      };
    });
    
    useEffect(() => {
        // Create bouncing animation sequence
        const startBouncing = () => {
          translateY.value = withRepeat(
            withDelay(
              3000, // Delay of 10 seconds between bounces
              withSequence(
                // Move up
                withSpring(-10, { damping: 2 }),
                // Move back down
                withSpring(0, { damping: 1 })
              )
            ),
            -1, // Infinite repetition
            true // Reverse animation
          );
         
          
        };
        const startSliding = () => {
            translateX.value = withRepeat(
                withDelay(
                  3000, // Delay of 10 seconds between bounces
                  withSequence(
                    // Move right
                    withSpring(50, { damping: 4 }),
                    // Move left
                    withSpring(0, { damping: 2 })
                  )
                ),
                -1, // Infinite repetition
                 // Reverse animation
              );
        }

    
        //startBouncing();
        startSliding();
      }, []);


  useEffect(() => {
    console.log(isVisible)
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
      console.log("Origin from HomeScreen", locations)


      dispatch(setOrigin({
          lat: locations.coords.latidude,
          lng:  locations.coords.longitude
      }))
      console.log("Origin from HomeScreen",destination)
    }
    
    getCurrentLocation();
  }, []);

  

  useEffect ( ()=> {
    dispatch(setOrigin(null))
    dispatch(setDestination(null))
    dispatch(setDuration(null))
    dispatch(setDistance(null))
  }, [])

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
           

                <Animated.View style={[tw`p-5`, ]}>
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
                </Animated.View>
                <View style={[tw`m-2 p-1 h-full border`, { borderWidth: 0, borderColor: colors.black}]}>
                        <Map >
                             
                        </Map>
                </View>
                
                
                 
                
                  
                
             
                
           
        </SafeAreaView >
    )
}

export default HomeScreen;

const styles = StyleSheet.create({});