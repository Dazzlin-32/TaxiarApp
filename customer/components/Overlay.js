import { Text , View, ScrollView, TouchableOpacity } from "react-native";
import { selectDistance, selectDuration } from '../slices/navSlice';
import { useSelector } from 'react-redux';
import tw from "tailwind-react-native-classnames";
import data from '../constants/taxiTypes.json'
import { useNavigation } from "@react-navigation/native";
import { BottomSheet } from "@rneui/themed";
import { colors } from "../constants/colors";


function Overlay() {
    const duration = useSelector(selectDuration);
    const distance = useSelector(selectDistance)
    console.log(`Distance is ${distance} kms Time is ${duration} ms from Overlay`)
    console.log("Overlay : , ", data.taxis)
    const navigation = useNavigation()
    return ( 
        <>
        {
            distance && duration &&


            <ScrollView style={tw`h-1/2 p-1 m-2`}>
               
                <Text style={tw`text-xl font-extrabold text-center`}>Choose a trip</Text>
                {
                    data.taxis.map(
                        (x)=>(
                           <>
                           
                           
                             <TouchableOpacity
                           onPress={()=>{
                            navigation.navigate('Search', {
                                "id": x.id,
                              })
                           }}
                            style={[tw` p-2 m-2 border-2 rounded-lg text-right`, { borderColor: colors.primary, backgroundColor:colors.white }]} key={x.id}>
                                <Text style={[tw`text-center text-xl font-bold  `, {color: colors.black}]}>{x.taxiType}    </Text>
                                <Text style={tw` text-center text-sm`}>{distance} kms in {Math.floor(duration)} mins</Text>
                                <Text style={[tw` text-center text-base  `,  {color: colors.primary} ]}>Average Cost : {(x.rate * distance + 100).toFixed(2)} Birr</Text>
                                <Text style={[tw` text-center text-xl font-extrabold `,  {color: colors.primary} ]}>Search Driver</Text>
                                <Text style={[tw` text-center text-xl font-extrabold `,  {color: colors.primary} ]}>Scan Qr</Text>
                             </TouchableOpacity> 

                          </>
                        )
                    )
                }
            </ScrollView>
        }
        </>
     );
}

export default Overlay;