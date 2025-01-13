import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Map from "../components/Map";
import tw from "tailwind-react-native-classnames";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectDistance, selectDuration } from '../slices/navSlice';
import { useSelector } from 'react-redux';
import { colors } from "../constants/colors";
import data  from '../constants/taxiTypes.json';
import drivers from '../constants/taxiDrivers.json'
import { Fontisto } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Input } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import { setStart } from '../slices/navSlice';



function DriversSearch( { route }) {
    const dispatch = useDispatch()
    const duration = useSelector(selectDuration);
    const distance = useSelector(selectDistance);
    const [visible, setVisible] = useState();
    const [isRiding, setIsRiding] = useState(false)
    const [ispayment, setIsPayement] = useState(false)
    const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Cash', value: 'cash'},
    {label: 'Bank', value: 'bank'},
    {label: 'Card', value: 'card'}
  ]);



    //For Drivers timeout
    useEffect(() => {
        const timer = setTimeout(() => {
          setVisible(false);
        }, 9000);  // 9-second timeout
    
        return () => clearTimeout(timer);  // Cleanup on unmount
      }, []);

    const{id} = route.params;
    console.log("Search,: params: " , id)
    const  taxiData = data.taxis.filter( x=> x.id === id)
    console.log("Search,: data:" , drivers)
    console.log(visible)
    return ( 
        <View style={tw` p-2 m-2 `}>
                <View style={tw`h-1/4`}>
                    <Map >
                        </Map>
                </View>
           
                <View   
                
                style={[tw` p-2 m-2 border-2 rounded-lg text-right`, { borderColor: colors.primary, backgroundColor:colors.white }]}>
                {
                    
                   visible ?
                   
                    <View  
                    style={[tw` p-2 m-2 border-2 rounded-lg text-right`, { borderColor: colors.primary, backgroundColor:colors.white }]}>
                        <Text  style={tw`text-xl font-extrabold text-center`} >Searching for Drivers Nearby </Text>
                        <Text style={tw`p-2 m-2 text-center  text-base font-bold`}>{taxiData[0].taxiType}</Text>
                        <Text style={[tw` text-center text-base  `,  {color: colors.primary} ]}>{distance} kms in {Math.floor(duration)} mins</Text>
                        <Text style={[tw` text-center text-base  `,  {color: colors.primary} ]}>Average Cost : {(  taxiData[0].rate * distance + 100).toFixed(2)} Birr</Text>
                    </View> 
                    :
                        !isRiding && 
                    <View  style={[tw` p-2 m-2 border-2 rounded-lg text-right `, { borderColor: colors.primary, backgroundColor:colors.primary }]}>
                        <Text style={tw`p-2  text-center text-xl font-bold text-white`} >Driver Found</Text>
                        <Text style={tw`p-2  text-xl font-bold text-white` } >
                             <Fontisto size={30} color={colors.white} name="person" />
                              {drivers[0].name}</Text>
                        <Text style={tw`p-2 text-xl font-bold text-white`}>
                        <Fontisto size={30} color={colors.white} name="car" />
                            {drivers[0].plate} {drivers[0].taxiType}</Text>
                        <Text style={tw`p-2  text-xl font-bold text-white`}>500m away</Text>
                    </View>

                }

                    <Text 
                     style={tw`text-xl font-extrabold text-center`}
                     onPress={()=>{
                        setIsRiding(true)
                        }}>Start Ride</Text>
                </View>
                {
                    isRiding && !ispayment &&
                    <View  
                    style={[tw` p-2 m-2 border-2 rounded-lg text-right`, { borderColor: colors.primary, backgroundColor:colors.white }]}>
                        <Text  style={tw`text-xl font-extrabold text-center`} >Route Started </Text>
                        <Text  style={tw`text-xl font-extrabold text-center`}
                        onPress={()=>{setIsPayement(true)}}
                         > Finish Ride</Text>
                     </View> 
                }
                {
                    ispayment &&
                    <ScrollView  
                    style={[tw` p-2 m-2 border-2 rounded-lg text-right`, { borderColor: colors.primary, backgroundColor:colors.white }]}>
                        <Text  style={tw`text-xl font-extrabold text-center m-2`} >Choose Payment Method</Text>
                        <DropDownPicker
                            tickIconStyle={{
                                width: 20,
                                height: 20,
                                color: colors.primary
                            }}
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            style= {[{borderColor: colors.primary}, tw``]}
                            />
                            {
                                value && 
                                value === 'cash'?
                                <CashPayment />
                                : value === 'bank' ?
                                <BankPayment />
                                : value ==='card' ?
                                <CardPayment />
                                :
                                <Text style={[tw`border-1 rounded-lg m-2 p-1`, {borderColor: colors.primary}]}>Payment not chosen</Text>
                            }
                       
                     </ScrollView> 
                }
            

        </View>
     );
}

export function CashPayment() {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    
    return ( 
        <View style={[tw`border-2 rounded-lg m-2 p-1`, {borderColor: colors.primary}]}>
            <Text style={[tw`rounded-lg m-2 p-1`, {borderColor: colors.primary}]} >Cash Payment</Text>
            <Text style={[tw`rounded-lg m-2 p-1`, {borderColor: colors.primary}]} >Thank you choosing us!</Text>
            <Text style={[tw`rounded-lg m-2 p-1`, {borderColor: colors.primary}]} >Don't Forget to tip your ride 😊</Text>
            <TouchableOpacity 
            onPress={()=>{
                dispatch(setStart(true))
                navigation.navigate('HomeScreen')}}
            style={[tw`rounded-lg m-2 p-2`, {backgroundColor: colors.primary}]} > <Text style={tw`text-white text-center`}>Finish</Text></TouchableOpacity>
        </View>
     );
}

export function BankPayment() {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    return ( 
        <View style={[tw`border-2 rounded-lg m-2 p-1`, {borderColor: colors.primary}]}>
        <Text style={[tw`rounded-lg m-2 p-1`, {borderColor: colors.primary}]} >Bank Payment</Text>
        <Text style={[tw`rounded-lg m-2 p-1`, {borderColor: colors.primary}]} >Thank you choosing us!</Text>
        <Text style={[tw`rounded-lg m-2 p-1`, {borderColor: colors.primary}]} >Don't Forget to tip your ride 😊</Text>
        <TouchableOpacity 
        onPress={()=>{
            dispatch(setStart(true))
            navigation.navigate('HomeScreen')}}
        style={[tw`rounded-lg m-2 p-2`, {backgroundColor: colors.primary}]} > <Text style={tw`text-white text-center`}>Finish</Text></TouchableOpacity>
    </View>
     );
}

export function CardPayment() {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    return ( 
        <View style={[tw`border-2 rounded-lg m-2 p-1`, {borderColor: colors.primary}]}>
            <Text style={[tw`rounded-lg m-2 p-1`, {borderColor: colors.primary}]} >Cash Payment</Text>
            <Input 
             placeholder='Card Number'
             leftIcon={{ type: 'font-awesome', name: 'cc-mastercard' }}
            />
            <Input 
             placeholder='Full Name'
             
            />
            <Input 
             placeholder='Expiry Date'
             
            />
             <Input 
             placeholder='***'
             

            />
             <TouchableOpacity 
        onPress={()=>{
            dispatch(setStart(true))
            navigation.navigate('HomeScreen')}}
        style={[tw`rounded-lg m-2 p-2`, {backgroundColor: colors.primary}]} > <Text style={tw`text-white text-center`}>Pay and Finish</Text></TouchableOpacity>
        </View>
     );
}


export default DriversSearch;