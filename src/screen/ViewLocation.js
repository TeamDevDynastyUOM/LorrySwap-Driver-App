import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';

const ViewLocation = ({ route }) => {
  const { startLocation, destinationLocation } = route.params;

  const apiKey = 'AIzaSyAS6BQVMy0Px9XEj_XRibBHjfOSZRKQUVE';

  useEffect(() => {
    getDirections(startLocation, destinationLocation);
    console.log(startLocation);
  }, [startLocation, destinationLocation]);


  const getDirections = async (startCity, destinationCity) => {
    // Use a geocoding service to get coordinates for cities
    const startCoordinates = await getCoordinatesForCity(startCity);
    const destinationCoordinates = await getCoordinatesForCity(destinationCity);
    const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${startCoordinates.latitude},${startCoordinates.longitude}&destination=${destinationCoordinates.latitude},${destinationCoordinates.longitude}&key=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      const routes = response.data.routes;
      console.log(routes);
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  const getCoordinatesForCity = async (city) => {
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`;

    try {
      const response = await axios.get(geocodingUrl);
      const coordinates = response.data.results[0].geometry.location;
      return coordinates;
    } catch (error) {
      console.error('Error fetching coordinates for city:', error);
      return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: '100%', height: '100%' }}>
        <MapView
          style={{ width: '100%', height: '100%' }}
          initialRegion={{
            latitude: startLocation.latitude || 0,
            longitude: startLocation.longitude || 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: startLocation.latitude || 0,
              longitude: startLocation.longitude || 0,
            }}
            title='Start Location'
          />
          <Marker
            coordinate={{
              latitude: destinationLocation.latitude || 0,
              longitude: destinationLocation.longitude || 0,
            }}
            title='Destination'
          />
          {/* Use MapViewDirections to render directions on the map */}
          <MapViewDirections
            origin={{
              latitude: startLocation.latitude || 0,
              longitude: startLocation.longitude || 0,
            }}
            destination={{
              latitude: destinationLocation.latitude || 0,
              longitude: destinationLocation.longitude || 0,
            }}
            apiKey={apiKey}
            strokeWidth={3}
            strokeColor="blue"
          />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default ViewLocation;
