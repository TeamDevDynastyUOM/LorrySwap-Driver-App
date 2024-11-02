import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import MapScreen from '../components/MapScreen';
import GlobalStyles from '../styles/GlobalStyles';
import { useRideContext } from '../context/RideContext';
import ActivityIndicatorCustom from '../components/ActivityIndicatorCustom';
import { BASE_URL } from '../../config';
import DirectionWaypoints from './DirectionWaypoints';

const Start= () => {

    const [loading, setLoading] = useState(true);
    const {confirmItems, inputData, id, token} = useRideContext();

    const [origin_lat, setOrigin_lat] = useState();
    const [origin_lon, setOrigin_lon] = useState();
    const [destination_lat, setDestination_lat] = useState();
    const [destination_lon, setDestination_lon] = useState();
    const [waypoints, setWaypoints] = useState({});
    const [optimalPath, setOptimalPath] = useState({});
    const [totalDistance, setTotalDistance ] = useState('')

    const getWaypoints = (confirmItems) => {
        return confirmItems.reduce((acc, item) => {
            console.log("confirmItems waypoints", acc);
            const { id, plat, plon, dlat, dlon } = item;
            acc[`${id}`] = {
                pickup: `${plat},${plon}`,
                drop: `${dlat},${dlon}`
            };
            return acc;
        }, {});
    }

    useEffect(() => {
        const initializeData = () => {
            setOrigin_lat(inputData.location_lat);
            setOrigin_lon(inputData.location_lon);
            setDestination_lat(inputData.destination_lat);
            setDestination_lon(inputData.destination_lon);
            setWaypoints(getWaypoints(confirmItems));
        };

        initializeData();
    }, [confirmItems, inputData]);


    useEffect(() => {
        console.log("confimitems",confirmItems);
        const fetchOptimalPath = async () => {
            if (origin_lat && origin_lon && destination_lat && destination_lon && waypoints) {
                const data = {
                    origin: `${origin_lat},${origin_lon}`,
                    destination: `${destination_lat},${destination_lon}`,
                    waypoints: waypoints
                };
                console.log("data",data);
                await findOptimalPath(data);
            }
        };
        fetchOptimalPath();
    }, [origin_lat, origin_lon, destination_lat, destination_lon, waypoints]);


    const findOptimalPath = async (data) => {
        try{
            console.log("findOptimalPath data is", data);
            const response = await fetch(`${BASE_URL}/driver/findOptimalPath`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });
            console.log(response)

            if(response.ok){
                const responseData = await response.json();
                console.log("Optimal Path Found")
                setOptimalPath(responseData)
                setTotalDistance(responseData.total_distance)
                setLoading(false)
            }
        }catch (error) {
            console.error("Error submitting data:", error);
            Alert.alert("Error", "Failed to submit data. Please try again later.");
        }finally{
            setLoading(false);
        }
    }

    console.log(origin_lat, origin_lon, destination_lat, destination_lon, optimalPath);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicatorCustom indicatorName="Finding optimal path" color="#004344"/>
            ): (
            <View style={styles.container}>
                <View  style={{ width: '100%', height: '100%'}}>
                    <DirectionWaypoints
                        origin_lat={origin_lat} 
                        origin_lon={origin_lon}
                        destination_lat={destination_lat}
                        destination_lon={destination_lon}
                        optimalPath={optimalPath}
                    />
                </View>
                {/* <View style={GlobalStyles.bottomBg}>
                    <TouchableOpacity style={GlobalStyles.goButton1}>
                            <View style={GlobalStyles.goButton}>
                                <Text style={styles.start}>Start</Text>
                            </View>
                    </TouchableOpacity>
                </View> */}
                {totalDistance ? (
                    <View style={styles.totalDistanceContainer}>
                        <Text style={styles.totalDistanceText}>Total Distance: {totalDistance}</Text>
                    </View>
                ) : null}
            </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    start:{
        color: '#fff',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 27,
    },    
    totalDistanceContainer: {
        marginTop: -50,
        alignSelf: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 5,
    },
    totalDistanceText: {
        fontSize: 16,
        padding: 10,
        fontWeight: 'bold',
    },


});

export default Start;
