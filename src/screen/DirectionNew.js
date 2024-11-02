import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import polyline from '@mapbox/polyline';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Storage library

const DirectionNew = () => {
  const [coordinates, setCoordinates] = useState([]);
  // const [cities, setCities] = useState([]);

  const getDirections = async () => {
    const origin = '6.7055742,80.3847345'; // New York, NY
    const destination = '6.9270786,79.861243'; // Los Angeles, CA
    const apiKey = 'AIzaSyAS6BQVMy0Px9XEj_XRibBHjfOSZRKQUVE'; // Replace with your actual key

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`
      );
      const data = await response.json();
      const encodedPolyline = data.routes[0].overview_polyline.points;
      const decodedCoordinates = polyline.decode(encodedPolyline);
      setCoordinates(decodedCoordinates);
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  useEffect(() => {
    getDirections();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sampled City names along the path:</Text>
      {coordinates.map((coordinates, index) => (
        <Text key={index}>{coordinates}</Text>
      ))}
    </View>
  );
};

export default DirectionNew;
