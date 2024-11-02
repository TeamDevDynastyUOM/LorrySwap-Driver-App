import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

// const startLatitude = 6.7055742
// const startLongitude = 80.3847345

// const endLatitude = 6.9270786
// const endLongitude = 79.861243

const DirectionMap = ({route}) => {

    const { startLat, startLon, endLat, endLon } = route.params;

    const startLatitude = parseFloat(startLat);
    const startLongitude = parseFloat(startLon);
    
    const endLatitude = parseFloat(endLat);
    const endLongitude = parseFloat(endLon);

    

    const [region, setRegion] = useState({
    latitude: startLatitude,
    longitude: startLongitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    });

    const origin={
        latitude: startLatitude,
        longitude: startLongitude,
    }
    const destination = {
        latitude: endLatitude,
        longitude: endLongitude,
    };

    useEffect(() => {
        // You can set the region based on the start and destination coordinates
        setRegion({
            latitude: (startLatitude + endLatitude) / 2,
            longitude: (startLongitude + endLongitude) / 2,
            latitudeDelta: Math.abs(startLatitude - endLatitude) * 1.5,
            longitudeDelta: Math.abs(startLongitude - endLongitude) * 1.5,
        });
    }, []);

    return (
    <MapView
        style={{ flex: 1 }}
        region={region}
        showsUserLocation
        loadingEnabled
    >
        <Marker
        coordinate={{
            latitude: startLatitude,
            longitude: startLongitude,
        }}
        title="Start"
        />
        <Marker
        coordinate={destination}
        title="Destination"
        />
        <MapViewDirections
        origin={origin}
        destination={destination}
        apikey="AIzaSyAS6BQVMy0Px9XEj_XRibBHjfOSZRKQUVE"
        strokeWidth={6}
        strokeColor="blue"
        />
    </MapView>
    );
    };

export default DirectionMap;
