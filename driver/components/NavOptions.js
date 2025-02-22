import { FlatList, StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import { selectOrigin } from '../slices/navSlice';
const data = [
    {
        id: "123",
        title: "Get a ride",
        image: require("../assets/landing2.png"),
        screen: "MapScreen",
    },
   
];
const NavOptions = () => {
    const navigation = useNavigation();
    // const origin = useSelector(selectOrigin);
    return (
        <FlatList
            data={data}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    // disabled={!origin}
                    onPress={() => navigation.navigate(item.screen)}
                    style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}>
                    <View>
                        <Image
                            source={item.image}
                            style={{ width: 120, height: 120, resizeMode: "contain" }}
                        />
                        <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                        <Icon
                            style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                            name="arrowright"
                            color="white"
                            type="antdesign" />
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

export default NavOptions;

const styles = StyleSheet.create({})