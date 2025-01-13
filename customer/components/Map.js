import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import tw from 'tailwind-react-native-classnames';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin, selectDistance, selectDuration } from '../slices/navSlice';
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination, setTravelTimeInformation, setDistance, setDuration } from '../slices/navSlice';
import { colors } from '../constants/colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { BottomSheet } from '@rneui/themed';
import ChooseSearch from '../components/ChooseSearch';


const Map = () => {
    const mapRef = useRef(null);
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    console.log("Origin from maps:", origin)
    const duration = useSelector(selectDuration);
    const distance = useSelector(selectDistance);
    console.log("Destination from maps:", destination)
    const dispatch = useDispatch()

    const focusMap = () =>{ 
        mapRef.current.animateToRegion({ center: initial, zoom:12})
      }
   
        
    const [initial, setInitial] = useState({

        latitude: origin?.lat || 9.0367,
        longitude:origin?.lng || 38.7510,
        latitudeDelta:0.0922,
        longitudeDelta : 0.0421
    })
   
    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType="standard"
            showsUserLocation ={true}
            followsUserLocation = {true}
            tintColor = {colors.primary}
            // initialRegion={{
            //     latitude: origin?.lat || 9.0367,
            //     longitude:origin?.lng || 38.7510,
            //     latitudeDelta:0.0922,
            //     longitudeDelta : 0.0421
            // }}
            initialCamera={{
                center: {  
                latitude: origin?.lat || 9.0367,
                longitude:origin?.lng || 38.7510,},
                zoom: 12,
                pitch: 0,
                heading: 0,
                altitude: 0
            }}
            
        >
          <View>

             <GooglePlacesAutocomplete
                                  styles={{
                                    container: {
                                        marginTop: 80, // Adjust spacing using margin instead of top.
                                        marginHorizontal: 10, // Adds consistent left and right spacing.
                                        borderRadius: 30, // Rounds the edges of the container.
                                        borderWidth: 1, // More noticeable border width.
                                        borderColor: colors.primary || 'blue', // Ensure a valid color is provided.
                                        backgroundColor: 'white', // Ensures a clean background.
                                      },
                                      textInputContainer: {
                                        borderWidth: 1, // Borders around the text input field.
                                        borderRadius: 20, // Rounded edges for text input.
                                        borderColor: colors.primary || 'blue',
                                        padding: 5, // Adjusts the spacing inside the container.
                                        backgroundColor: '#f9f9f9', // Subtle background color for input.
                                      },
                                      textInput: {
                                        fontSize: 18, // Adjusts text size for readability.
                                        color: '#333', // Darker text for better visibility.
                                        paddingVertical: 10, // Adjusts vertical spacing inside the input.
                                        paddingHorizontal: 15, // Adjusts horizontal spacing inside the input.
                                      },
                                      listView: {
                                        marginHorizontal: 10, // Aligns suggestions list with the container.
                                        borderRadius: 10, // Adds rounded edges to the dropdown.
                                        backgroundColor: '#fff', // Ensures a clean background for suggestions.
                                      },
                                      row: {
                                        padding: 13, // Adjusts padding inside each suggestion row.
                                        height: 44, // Consistent row height.
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                      },
                                      separator: {
                                        height: 0.5,
                                        backgroundColor: '#c8c7cc', // Subtle color for row separators.
                                      },
                                  }}
                                  minLength={2}
                                  enablePoweredByContainer={false}
                                  onPress={(data, details = null) => {
                                      dispatch(setOrigin({
                                          location: details.geometry.location,
                                          description: data.description,
                                      }));
                                      //modalVisibility()
                                      console.log("Origin Auto", origin)
                                    
                                      
                                  }}
                                  fetchDetails={true}
                                  placeholder='Enter pick-up point'
                                  query={{
                                      key: 'AIzaSyADC8vNOrfbGctE3a_xcwfHUBdjzg-_8vA',
                                      language: "en",
                                  }}
                                  nearbyPlacesAPI='GooglePlacesSearch'
                                  debounce={400}
                              />
                              
              <GooglePlacesAutocomplete
                  styles={{
                    container: {
                        marginTop: 80, // Adjust spacing using margin instead of top.
                        marginHorizontal: 10, // Adds consistent left and right spacing.
                        borderRadius: 30, // Rounds the edges of the container.
                        borderWidth: 1, // More noticeable border width.
                        borderColor: colors.primary || 'blue', // Ensure a valid color is provided.
                        backgroundColor: 'white', // Ensures a clean background.
                      },
                      textInputContainer: {
                        borderWidth: 1, // Borders around the text input field.
                        borderRadius: 20, // Rounded edges for text input.
                        borderColor: colors.primary || 'blue',
                        padding: 5, // Adjusts the spacing inside the container.
                        backgroundColor: '#f9f9f9', // Subtle background color for input.
                      },
                      textInput: {
                        fontSize: 18, // Adjusts text size for readability.
                        color: '#333', // Darker text for better visibility.
                        paddingVertical: 10, // Adjusts vertical spacing inside the input.
                        paddingHorizontal: 15, // Adjusts horizontal spacing inside the input.
                      },
                      listView: {
                        marginHorizontal: 10, // Aligns suggestions list with the container.
                        borderRadius: 10, // Adds rounded edges to the dropdown.
                        backgroundColor: '#fff', // Ensures a clean background for suggestions.
                      },
                      row: {
                        padding: 13, // Adjusts padding inside each suggestion row.
                        height: 44, // Consistent row height.
                        flexDirection: 'row',
                        alignItems: 'center',
                      },
                      separator: {
                        height: 0.5,
                        backgroundColor: '#c8c7cc', // Subtle color for row separators.
                      },
                  }}
                  minLength={2}
                  enablePoweredByContainer={false}
                  onPress={(data, details = null) => {
                      console.log("Data", data.description)
                      console.log("Details", details.geometry.location)
                      dispatch(setDestination({
                          location: details.geometry.location,
                          description: data.description,
                      }));
                      //modalVisibility()
                      console.log("From google autocomplere" , destination)
                  }}
                  fetchDetails={true}
                  placeholder='Enter destination point'
                  query={{
                      key: 'AIzaSyADC8vNOrfbGctE3a_xcwfHUBdjzg-_8vA',
                      language: "en",
                  }}
                  nearbyPlacesAPI='GoogleReverseGeocoding'
                  debounce={400}
              />
          </View>
           
             {
                //Origin Marker
                origin?.location && 

            <Marker
                coordinate={{
                    latitude:origin.location.lat,
                    longitude: origin.location.lng,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,}}
            />
            }
            {
                //Destination Marker
                 destination?.location && 

               <Marker
               coordinate={{
                latitude:destination.location.lat,
                longitude: destination.location.lng,
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
                origin={{latitude: origin.location.lat, longitude:  origin.location.lng}}
                destination={{latitude: destination.location.lat, longitude:  destination.location.lng}}
                apikey='AIzaSyADC8vNOrfbGctE3a_xcwfHUBdjzg-_8vA'
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

                
                {
                //Searvh Drivers Button and Modals
                  origin &&
                  destination &&
                  <>
                  <TouchableOpacity 
                  style={{backgroundColor: colors.primary, height: 50, width: 160, borderWidth: 1, borderColor: colors.white, borderRadius: 10 , padding:9, marginHorizontal: 90}}
                  onPress={()=>{
                   setIsVisible(true)
                  }} >
                      <Text style={tw`text-white font-bold text-lg`}>Search for Drivers</Text>
                  </TouchableOpacity>
                  <BottomSheet
                    isVisible={isVisible}
                    containerStyle={{height: 600}}
                    backdropStyle={{opacity: 0.5}}
                   >
                       <ChooseSearch />
                    
                    <TouchableOpacity
                    style={{backgroundColor: colors.primary, height: 50, width: 560, borderWidth: 1, borderColor: colors.white, borderRadius: 10 , padding:9, alignItems: "center"}}
                    onPress={()=>{
                      setIsVisible(false)
                    }}>
                   
                      <Text style={tw`text-white font-bold text-lg `}> Cancel</Text>
                      
                    </TouchableOpacity>
                  </BottomSheet>
                  </>

                  }
          
            
                 
         


        </MapView>
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