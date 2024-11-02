import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import PackageDropPopUp from './PackageDropPopUp';
import { useRideContext } from '../context/RideContext';
import { BASE_URL } from '../../config';

const DirectionWaypoints = ({ origin_lat, origin_lon,
    destination_lat, destination_lon, optimalPath }) => {

    const { id, token} = useRideContext();
    

    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [popupQueue, setPopupQueue] = useState([]);
    const [currentPopupIndex, setCurrentPopupIndex] = useState(0);

    const startLatitude = parseFloat(origin_lat);
    const startLongitude = parseFloat(origin_lon);
    const endLatitude = parseFloat(destination_lat);
    const endLongitude = parseFloat(destination_lon);

    const [region, setRegion] = useState({
        latitude: startLatitude,
        longitude: startLongitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const origin = {
        latitude: startLatitude,
        longitude: startLongitude,
    };

    const destination = {
        latitude: endLatitude,
        longitude: endLongitude,
    };

    const waypoints = optimalPath.optimal_path.slice(1, -1).map(point => ({
        latitude: parseFloat(point.location.split(',')[0]),
        longitude: parseFloat(point.location.split(',')[1]),
    }));        


    console.log('waypoints' ,waypoints)

    useEffect(() => {
        setRegion({
            latitude: (startLatitude + endLatitude) / 2,
            longitude: (startLongitude + endLongitude) / 2,
            latitudeDelta: Math.abs(startLatitude - endLatitude) * 1.5,
            longitudeDelta: Math.abs(startLongitude - endLongitude) * 1.5,
        });
    }, []);

    useEffect(() => {
        const getLocationPermission = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Permission to access location was denied');
                console.error('Permission to access location was denied');
            } else {
                const location = await Location.getCurrentPositionAsync({});
                setLocation(location.coords);
            }
        };
        getLocationPermission();
    }, []);

    useEffect(()  => {
        if(location){
            console.log('my latitude is' + location.latitude)
            console.log('my longitude is' + location.longitude)
            console.log('my location is' + location)
            updateLocation();
        }
    },[location]);

    updateLocation = async () => {
        try{
            data = {
                "driver_id": id,
                "latitude": location.latitude,
                "longitude": location.longitude
            }
            const response = await fetch(`${BASE_URL}/driver/updateLocation`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data from updateLocation');
            }

        } catch (error) {
            console.error('Error fetching data:', error);        
            Alert.alert('Error fetching data', '', [
                { text: 'OK'},
            ]);
        }
    }

    useEffect(() => {
        if (location) {
            optimalPath.optimal_path.forEach(point => {
                const [lat, lon] = point.location.split(',').map(Number);
                if (Math.abs(location.latitude - lat) < 0.0001 && Math.abs(location.longitude - lon) < 0.0001) {
                    console.log(`Reached location: ${point.location}, Order IDs: ${point.order_ids}`);
                    const orderIds = point.order_ids.split(',');
                    const types = point.types.split(',');
                    const ordersWithTypes = orderIds.map((id, index) => ({ id, type: types[index] }));
                    setPopupQueue(prevQueue => [...prevQueue, ...ordersWithTypes]);
                }
            });
        }
    }, [location, optimalPath]);

    const currentPopup = popupQueue[currentPopupIndex];

    return (
        <View style={{ flex: 1 }}>
            {error && <Text>{error}</Text>}
            <MapView
                style={{ flex: 1 }}
                region={region}
                showsUserLocation
                loadingEnabled
            >
                <Marker coordinate={origin} title="Start" />
                <Marker coordinate={destination} title="Destination" />
                {optimalPath.optimal_path.map((point, index) => {
                    const [latitude, longitude] = point.location.split(',').map(Number);
                    return (
                        <Marker
                            key={index}
                            coordinate={{ latitude, longitude }}
                            title={point.types}
                            description={`Order IDs: ${point.order_ids}`}
                            // pinColor="#004344"
                        />
                    );
                })}
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    waypoints={waypoints}
                    apikey="AIzaSyAS6BQVMy0Px9XEj_XRibBHjfOSZRKQUVE"
                    strokeWidth={6}
                    strokeColor="blue"
                />
            </MapView>
            {currentPopup &&(
                <PackageDropPopUp currentPopupIndex={currentPopupIndex} setCurrentPopupIndex={setCurrentPopupIndex}
                popupQueue={popupQueue} setPopupQueue={setPopupQueue} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    
});

export default DirectionWaypoints;
