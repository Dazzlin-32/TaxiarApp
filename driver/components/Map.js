import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import tw from 'tailwind-react-native-classnames';
import { useSelector , useDispatch} from 'react-redux';
import { selectDestination, selectOrigin, selectDistance, selectDuration , setDestination, setOrigin} from '../slices/navSlice';
import {  setDistance, setDuration } from '../slices/navSlice';
import { colors } from '../constants/colors';
import { Button, BottomSheet } from '@rneui/themed';
import customer from '../constants/customerData.json'
import { setDriverAvailability, setTripStatus, selecetTripStatus, selectDriverAvailability,  receiveRequest, acceptRequest, startTrip, finishTrip } from '../slices/tripSlice';
import { Entypo } from '@expo/vector-icons';
import CustomDivider from '../components/CustomDivider';
import { FastForwardFilled } from '@ant-design/icons';
import { useNavigation } from '@react-navigation/native';

const Map = ({status}) => {
    console.log("Status",  status)

    const [priceCalc, setPriceCalc] = useState();
    const [timeCalc, setTimeCalc] = useState();
    const [dividedPrice, setDividedPrice] = useState();
    const [dividedTime, setDividedTime] = useState();
    const mapRef = useRef(null);
    const [check, setCheck] = useState(status)
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const tripStatus = useSelector(selecetTripStatus)
    console.log(tripStatus, "check")
    console.log("Origin from maps:", origin)
    const duration = useSelector(selectDuration);
    const distance = useSelector(selectDistance);
    console.log("Destination from maps:", destination)
    const dispatch = useDispatch()
        //variable for bttomSheet
    const [isVisible, setIsVisible] = useState(false)
    const [accepted, setAccepted] = useState(false)
    const [started, setStarted] = useState(false)
    const [finish, setFinish] = useState(false)
    const navigation = useNavigation()



   


      //for modal
    useEffect ( ()=>{
        // Navigate after 5 seconds
        const timer = setTimeout(() => {
        setIsVisible(true)
    }, 3000);

    // Cleanup timeout if component unmounts
    return () => clearTimeout(timer);
    }, [])


     //setorigin and destination of map
        const onAccept = () =>{
            dispatch(setOrigin({
        lat: customer.pickup.coordinates.latitude,
        lng:  customer.pickup.coordinates.longitude
        }))

        dispatch(setDestination({
        lat: customer.dropoff.coordinates.latitude,
        lng:  customer.dropoff.coordinates.longitude
        }))
        dispatch(acceptRequest())
        setIsVisible(false)
        setAccepted(true)

        } 

        const handleStartRide = () => {
          dispatch(startTrip())
          setStarted(true)
          setAccepted(false)
          handleOnTrip()

        };

        const handleOnTrip = () =>{
        // setPriceCalc( dividing(customer.trip.estimated_fare))
        // setTimeCalc( dividing(customer.trip.duration_minutes))

             //Navigate after 5 seconds
        const timer = setTimeout(() => {
            setStarted(false)
            dispatch(finishTrip())
            setFinish(true)
        }, 6000);
    
        // Cleanup timeout if component unmounts
        return () => clearTimeout(timer);
        }
        const handleFinish = () => {
            dispatch(setOrigin(null))
            dispatch(setDestination(null))
            setFinish(false)
            
        }



    //After Accept or Start the ride
    const renderBottomView = () => {
        
            return (
                <View style={{  position: "absolute", bottom: 0, alignItems: "center" }}>
                    <Button
                        title="Start"
                        buttonStyle={{
                            backgroundColor: colors.white,
                            borderWidth: 2,
                            borderColor: 'white',
                            borderRadius: 100,
                            height: 70,
                        }}
                        containerStyle={{ width: 90, margin: 2 }}
                        titleStyle={{ fontWeight: 'bold', color: colors.primary, fontSize: 26 }}
                        onPress={()=>{
                            handleStartRide()
                        }} 
                         />
                                             
                    <Text
                        style={{
                            backgroundColor: colors.primary,
                            borderWidth: 2,
                            height: 70,
                            width: 400,
                            borderColor: 'white',
                            padding: 10,
                            alignItems: "center",
                        }}
                    >
                        <Text style={tw`text-lg font-medium text-white`}>Picking up {customer.rider.name} ...</Text>
                    </Text>
                </View>
               

            );
        
       
    };

    const renderOnTripView = () =>{
       
            return (
                <>
                    <View style={[ tw`w-full p-2`, { zIndex: 1, position: "absolute", top: 0, alignItems: "center", backgroundColor: colors.primary, height: 60 }]}>
                        <Text style={tw`text-lg font-medium text-white`}>Turn Left after 200 m</Text>
                        <Text style={tw`text-base font-light text-white`}>Map Directions</Text>
                    </View>
                    <View style={[tw`w-full p-2`,{ zIndex: 1, position: "absolute", bottom: 0, alignItems: "center", backgroundColor: colors.primary , height:70 }]}>
                        <Text style={tw`text-lg font-medium text-white`}>Trip Details</Text>
                        <Text style={tw`text-base font-light text-white`}>20 mins left ...150 cost</Text>
                    </View>
                </>
            );
        }
    
    const renderOnFinishView = () => {
        return (
            <View  
            style={{alignItems:"center"}}>

                <Text style={tw` text-base font-light m-2`}>Trip Finished</Text>
                <Text style={tw`text-4xl font-bold px-7 py-1 rounded`}>Total Cost: {customer.trip.estimated_fare} Birr</Text>
                <Text  style={tw` text-base font-light`}>{customer.rider.name}    {customer.rider.rating}
                  <Entypo name='star' color={colors.primary} size={20} />
              
                </Text>
                <CustomDivider  color="#000" marginVertical={10} width="100%" />
                
                <Text  style={tw` text-base font-bold`}>
                  <Entypo name='location-pin' color={colors.primary} size={20}/>
                  From  {customer.pickup.address} </Text>
                <Text  style={tw` text-base font-light`}> {customer.trip.distance_km} kms in {customer.trip.duration_minutes} mins</Text>
                <Text  style={tw` text-base font-bold`}>
                <Entypo name='location-pin' color={colors.primary} size={20}/>
                   To {customer.dropoff.address} 
                 </Text>
                  <CustomDivider  color="#000" marginVertical={10} width="100%" />
                  <Button 
                        title="Back to Home"
                        buttonStyle={{
                          backgroundColor: colors.primary,
                          borderWidth: 2,
                          borderColor: 'white',
                          borderRadius: 30,
                        }}
                        containerStyle={{
                          width: 200,
                          marginHorizontal: 50,
                          marginVertical: 2,
                        }}
                        titleStyle={{ fontWeight: 'bold' }}
                        onPress={()=>{
                          handleFinish()
                        }}
                       />
            </View>
        )
    }
 
    return (
        <View  style={[tw`h-full `]}> 
                <MapView
                    ref={mapRef}
                    style={tw`flex-1 z-0`}
                    mapType="standard"
                    showsUserLocation ={true}
                    followsUserLocation = {true}
                    tintColor = {colors.primary}
                    initialRegion={{
                        latitude: origin?.lat || 9.0367,
                        longitude:origin?.lng || 38.7510,
                        latitudeDelta:0.0922,
                        longitudeDelta : 0.0421
                    }}
                >
                    {
                        //Origin Marker
                        origin && 

                    <Marker
                        coordinate={{
                            latitude:origin?.lat,
                            longitude: origin?.lng,
                            latitudeDelta: 0.001,
                            longitudeDelta: 0.001,}}
                    />
                    }
                    {
                        //Destination Marker
                            destination && 

                        <Marker
                        coordinate={{
                        latitude:destination?.lat,
                        longitude: destination?.lng,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,}}
                        title='Destination'
                        description='This is the destination'
                        identifier='destination'
                    />
                    } 
                    {
                    //Direction Path
                    origin && destination && 
                    <MapViewDirections
                        origin={{latitude: origin?.lat, longitude:  origin?.lng}}
                        destination={{latitude: destination?.lat, longitude:  destination?.lng}}
                        apikey='YOUR-API-KEY'
                        strokeWidth={3}
                        strokeColor='red'
                        onError={(errorMessage) => console.warn('Directions Error:', errorMessage)}
                        onReady={result =>{
                            dispatch(setDistance(result.distance))
                            dispatch(setDuration(result.duration))
                            console.log(`Distance: ${result.distance} km`)
                            console.log(`Durartion: ${result.duration} min`)
                            console.log(`Distance: ${distance} km`)
                            console.log(`Durartion: ${duration} min`)
                        }}

                        
                    />}
                </MapView>

                 {/* Modal for incoming Request */}

                 <BottomSheet 
                  containerStyle= {{flex:1 , justifyContent: 'center', maxHeight: 400, margin:10, position:"absolute", top: "30%",left:10, backgroundColor: colors.white,
                    borderRadius: 30, padding:10, alignItems: 'center', borderColor: colors.primary, borderWidth: 1, elevation:1, shadowColor: 'black'
                  }}
                  isVisible={isVisible}>
                    <View  
                    style={{alignItems:"center"}}>

                        <Text style={tw` text-base font-medium m-2`}>Customer Radar</Text>
                        <Text style={tw`text-4xl font-bold px-7 py-1 rounded`}>{customer.trip.estimated_fare} Birr</Text>
                        <Text  style={tw` text-base font-medium`}>{customer.rider.name}    {customer.rider.rating}
                          <Entypo name='star' color={colors.primary} size={20} />
                      
                        </Text>
                        <CustomDivider  color="#000" marginVertical={10} width="100%" />
                        
                        <Text  style={tw` text-base font-bold`}>
                          <Entypo name='location-pin' color={colors.primary} size={20}/>
                          {customer.pickup.address}
                          (3 mins away)     </Text>
                        <Text  style={tw` text-base font-medium`}> {customer.trip.distance_km} kms in {customer.trip.duration_minutes} mins</Text>
                        <Text  style={tw` text-base font-bold`}>
                        <Entypo name='location-pin' color={colors.primary} size={20}/>
                          {customer.dropoff.address}
                          (28 mins)</Text>




                    </View>
                    <CustomDivider  color="#000" marginVertical={10} width="100%" />
                  <Button 
                        title="ACCEPT"
                        buttonStyle={{
                          backgroundColor: colors.primary,
                          borderWidth: 2,
                          borderColor: 'white',
                          borderRadius: 30,
                        }}
                        containerStyle={{
                          width: 200,
                          marginHorizontal: 50,
                          marginVertical: 2,
                        }}
                        titleStyle={{ fontWeight: 'bold' }}
                        onPress={()=>{
                          onAccept()
                        }}
                       />

                  <Button 
                        title="CANCEL"
                        buttonStyle={{
                          backgroundColor: "red",
                          borderWidth: 2,
                          borderColor: 'white',
                          borderRadius: 30,
                        }}
                        containerStyle={{
                          width: 200,
                          marginHorizontal: 50,
                          marginVertical: 2,
                        }}
                        titleStyle={{ fontWeight: 'bold' }}
                        onPress={()=>{
                            setIsVisible(false)
                            dispatch(setOrigin(null))
                            dispatch(setDestination(null))
                        }
                        }
                       />
                </BottomSheet>

                {
                    
                   accepted && renderBottomView()
                }
                {
                    started && renderOnTripView()
                }
                
                {
                    finish && renderOnFinishView()
                }


                        

        </View>
    )
}

export default Map;

const styles = StyleSheet.create({});



 // <MapView
        //     style={tw`flex-1`}
        //     mapType="mutedStandard"
        //     initialRegion={{
        //         latitude: origin.location.lat,
        //         longitude: origin.location.lng,
        //         latitudeDelta: 0.005,
        //         longitudeDelta: 0.005,
        //     }}
        // />
        // This is the correct code but due to not paid api key this is not possible for me to use it.


        // {origin?.location && (
        //     <Marker
        //         coordinate={{
        //             latitude: origin.location.latitude,
        //             longitude:origin.location.lng,
        //         }}
        //     />
        // )}
