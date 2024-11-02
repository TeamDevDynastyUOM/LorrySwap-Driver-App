import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground,Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import ButtonSet from './ButtonSet';
import ActivityIndicatorCustom from '../components/ActivityIndicatorCustom';

const MapScreen = () => {

    // State to store the user's current location
    const [location, setLocation] = useState(null);

    // request location permission and get the user's current location
    useEffect(() => {
        const getLocationPermission = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                // Requesting permission to access the device's location
                console.error('Permission to access location was denied');
            }else{
                // Getting the user's current location
                const location = await Location.getCurrentPositionAsync({});
                setLocation(location);
            }
        };
        getLocationPermission();
    }, [] );

    return (
        <View style={{ flex:1 }}>
            {location ? (
                <View  style={{ width: '100%', height: '100%'}}>
                    <MapView
                        style={{ width: '100%', height: '100%'}}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            title='You are Here!'
                            image={require('../assests/images/Truck.png')}
                        />
                    </MapView>            
                    <ButtonSet/>
            </View>
            ) : (
                <ActivityIndicatorCustom indicatorName="Map is Loading" color="#004344"/>
            )}

        </View>
    );
};
const styles = StyleSheet.create({

    viewText:{  
        flex: 1,
        height: '100%',    
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
    },    
    buttonSet:{
        position: 'absolute',
        paddingTop: 30,
        paddingHorizontal: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    circleButton: {
        width:  55,
        height: 55,
        borderRadius: 50,
        marginBottom: 10,
        backgroundColor: 'rgba(197, 197, 197, 0.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageBackground:{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default MapScreen;