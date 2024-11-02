import React, { useState, useEffect } from 'react';
import { View, Text,TextInput, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ButtonText from '../components/ButtonText';
import ButtonContained from '../components/ButtonContained';
import { BASE_URL } from '../../config';
import { useRideContext } from '../context/RideContext';
import ActivityIndicatorCustom from '../components/ActivityIndicatorCustom';
import PlaceReviewPopUp from './PlaceReviewPopUp';
import { useNavigation } from '@react-navigation/native';

const PackageDropPopUp = ({ currentPopupIndex, popupQueue,
   setCurrentPopupIndex , setPopupQueue}) => {
    
    const [rideId, setRideId] = useState();
    const [loading, setLoading] = useState();
    const [loading1, setLoading1] = useState();
    const [data, setData] = useState({});
    const [driverRideData, setDriverRideData] = useState({});
    const [reviewDataPopUp, setReviewDataPopUp] = useState(false)
    const [finishedQueue, setFinishedQueue] = useState([]);

    const navigation = useNavigation();

    const {id, token} = useRideContext();
    
    const handleStartPress = () => {
        started()
    };    
    
    const handleFinishedRidePress = () => {
        finished_driver_ride()
    };
    const handlePickupPress = () => {
        pickedUp()
    };
    const handleDropPress = () => {
        finished()
    };

    const handleNextPress = () => {
        setCurrentPopupIndex(prevIndex => (prevIndex + 1) % popupQueue.length);
    };

    const handleBackPress = () => {
        setCurrentPopupIndex(prevIndex => (prevIndex - 1 + popupQueue.length) % popupQueue.length);
    };

    const currentPopup = popupQueue[currentPopupIndex];

    useEffect(() => {
       if (currentPopup && currentPopup.id) {
            fetchData(currentPopup.id)
            fetchDriverRideData()
       }
    },[currentPopup])

    const fetchData = async (id) => {
        setLoading(true)
        try{
            const response = await fetch(`${BASE_URL}/package/pickup_drop_details/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if(!response.ok){
                throw new Error('Failed to fetch data');
            }else{
                const data = await response.json();
                setData(data)
                console.log(data[0].finished + currentPopup.type);
                setLoading(false)
            }
        }catch(error){
            console.error('Error fetching data:', error);
        }
    }

    const fetchDriverRideData = async () => {
        setLoading(true)
        try{
            const response = await fetch(`${BASE_URL}/driver/current_ride/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            if (!response.ok) {
                throw new Error('Failed to fetch data from current_ride');
            }
            const rideData = await response.json();
            console.log('Current Rides ', rideData)
            setDriverRideData(rideData); 
        }catch(error){
            console.error('Error fetching data:', error);
        }
    }

    const finished = async () => {
        setLoading1(true)
        try {
            const response = await fetch(`${BASE_URL}/cf/update_finished/${currentPopup.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            console.log(response)
            if(!response.ok){
                throw new Error('Failed to update backend');
            } else {
                setReviewDataPopUp(true);
                setPopupQueue(prevQueue => prevQueue.filter(item => item.id !== currentPopup.id));
                setCurrentPopupIndex(0);
            }
        }catch(error){
            console.error('Error updating backend:', error);
        }finally{
            setLoading1(false);
        }
    }

    const pickedUp = async () => {
        setLoading1(true)
        try {
            const response = await fetch(`${BASE_URL}/cf/update_pickup/${currentPopup.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            console.log(response)
            if(!response.ok){
                throw new Error('Failed to update backend');
            } else {
                setPopupQueue(prevQueue => prevQueue.filter(item => item.id !== currentPopup.id));
                setCurrentPopupIndex(0);
            }
        }catch(error){
            console.error('Error updating backend:', error);
        }finally{
            setLoading1(false);
        }
    }

    const started = async () => {
        setLoading1(true)
        try {
            const response = await fetch(`${BASE_URL}/driver/started_ride/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            console.log(response)
            if(!response.ok){
                throw new Error('Failed to update backend');
            } else {
                setPopupQueue(prevQueue => prevQueue.filter(item => item.id !== currentPopup.id));
                setCurrentPopupIndex(0);
            }
        }catch(error){
            console.error('Error updating backend:', error);
        }finally{
            setLoading1(false);
        }
    }

    const finished_driver_ride = async () => {
        setLoading1(true)
        try {
            const response = await fetch(`${BASE_URL}/driver/finished_ride/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            console.log(response)
            if(!response.ok){
                throw new Error('Failed to update backend');
            } else {
                navigation.navigate('Home');
            }
        }catch(error){
            console.error('Error updating backend:', error);
        }finally{
            setLoading1(false);
        }
    }

    return (
        <View style={styles.container}>
            {currentPopup && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={!!currentPopup}
                >
                    <View style={styles.modalContainer}>
                        {loading ? (
                            <View style={styles.modalContent} >
                                <View style={styles.activityIndicatorContain}>
                                    <ActivityIndicatorCustom indicatorName="Loading" color="#004344"/>
                                </View>
                            </View>
                        ):(
                            currentPopup.id == "" ? (
                                <View style={styles.modalContent}>
                                    <View style={styles.subContent1}>
                                        <Text style={{ fontSize: 20, color: '#004344', }}>
                                        </Text>
                                        <Text style={styles.locationText}>
                                            {data.length > 0 && (currentPopup.type === "start" ? driverRideData.location : driverRideData.destination)}
                                        </Text>
                                    </View>

                                    <View style={styles.bottomButtonSet}> 
                                        {currentPopupIndex > 0 ? (
                                            <ButtonText buttonName="Back" onPress={handleBackPress} alignIcon="left"/>
                                        ):( <View style={{width: 100}} />)}
                                        
                                        {currentPopup.type === "start" ?(
                                            <ButtonContained buttonName="Start" 
                                                onPress={handleStartPress} iconName="check-square" 
                                                alignIcon="left" loading={loading1}
                                            />
                                        ):currentPopup.type === "destination" ?(
                                            <ButtonContained buttonName="Finish Ride" 
                                                onPress={handleFinishedRidePress} iconName="check-square" 
                                                alignIcon="left" loading={loading1}
                                            />
                                        ):(null)}

                                        {currentPopupIndex < popupQueue.length - 2 ? (
                                            <ButtonText buttonName="Next" onPress={handleNextPress} alignIcon="right"/>
                                        ):( <View style={{width: 98}} />)}
                                    </View>
                                </View>
                            ):(
                                <View style={styles.modalContent}>
                                    <View style={styles.subContent1}>
                                        {/* <Text style={{ fontSize: 10, color: '#004344', }}>
                                            Order ID: {currentPopup.id}
                                        </Text> */}
                                        <Text style={{ fontSize: 20, color: '#004344', }}>
                                            {currentPopup.type === "pickup"?
                                                "Pickup the Package" 
                                                : currentPopup.type === "drop"?
                                                "Deliver the Package"
                                                : ""
                                            }
                                        </Text>
                                        <Text style={styles.locationText}>
                                            {data.length > 0 && (currentPopup.type === "pickup" ? data[0].location : data[0].destination)}
                                        </Text>
                                        <View style={{alignItems:'center',  marginTop: 10}}>
                                            <Text style={styles.ownerName}>Owner- {data.length > 0 && `${data[0].fname} ${data[0].lname}`}</Text>
                                            <View style={styles.row}>
                                                <Feather name="phone-call" size={18} color="#bf343b" />
                                                <Text style={styles.ownerPhone}>Owner Phone - {data.length > 0 && data[0].phone}</Text>
                                            </View>
                                            {currentPopup.type === "drop" ? (
                                                <View style={styles.row}>
                                                    <Feather name="phone-call" size={18} color="#bf343b" />
                                                    <Text style={styles.ownerPhone}>Recipient Phone - {data.length > 0 && data[0].contact_recipient}</Text>
                                                </View>
                                            ) : (null)}
                                        </View>
                                    </View>
                                    <View style={styles.inputFieldContainer}>
                                        <Feather name="package" size={30} color="#004344" 
                                            style={styles.locationIcon}/>
                                        <Text style={{ fontSize: 20, color: '#004344', fontWeight: 'bold' }}>LS0</Text>
                                        <TextInput
                                            placeholder="Enter Ride Id"
                                            style={styles.inputField}
                                            onChangeText={(id) => setRideId(id)}
                                        />
                                    </View>
                                    <View style={styles.bottomButtonSet}> 
                                        {currentPopupIndex > 0 ? (
                                            <ButtonText buttonName="Back" onPress={handleBackPress} alignIcon="left"/>
                                        ):( <View style={{width: 100}} />)}
                                        
                                        {currentPopup.type === "pickup" ?  (
                                            <ButtonContained buttonName="Picked Up" 
                                                onPress={handlePickupPress} iconName="plus-circle" 
                                                alignIcon="left" loading={loading1}
                                            />
                                        ): currentPopup.type === "drop" ?(
                                            <ButtonContained buttonName="Delivered" 
                                                onPress={handleDropPress} iconName="check-square" 
                                                alignIcon="left" loading={loading1}
                                            />
                                        ):(null)}

                                        {currentPopupIndex < popupQueue.length - 2 ? (
                                            <ButtonText buttonName="Next" onPress={handleNextPress} alignIcon="right"/>
                                        ):( <View style={{width: 98}} />)}
                                    </View>
                                </View>
                            )
                        )}
                    </View>
                </Modal>
            )}
            {/* {reviewDataPopUp && (
                <PlaceReviewPopUp setReviewDataPopUp={setReviewDataPopUp}
                reviewDataPopUp={reviewDataPopUp}  currentPopup={currentPopup} data={data}/>
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "100%",
        maxHeight: 450,
        backgroundColor: "white",
        padding: 20,
        paddingTop: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        elevation: 5,
    },

    subContent1: {
        alignItems: "center",
    },
    activityIndicatorContain:{
        minHeight: 300,
    },
    locationText:{
        fontSize: 25, 
        fontWeight: "bold", 
        color: '#004344'
    },  
    ownerName:{
        fontSize: 20, 
        color: '#004344',
        fontWeight: "bold", 
        marginBottom: 10,
    },  
    ownerPhone:{
        fontSize: 15, 
        color: '#004344',
    },
    row:{
        marginBottom: 2,
        flexDirection: 'row',
        gap: 10,
    },
    locationIcon: {
    },
    inputFieldContainer:{
        flexDirection: "row",
        marginTop: 15,
        paddingHorizontal: 15,
        alignItems: "center",
        gap: 10
    },  
    inputField: {
        flex:1,
        height: 35,
        borderBottomWidth: 1.5,
        borderColor: "#004344",
        fontSize: 16,
        justifyContent: "flex-start",
        paddingLeft: 5,
    },
    bottomButtonSet:{
        marginTop: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

});

export default PackageDropPopUp;
