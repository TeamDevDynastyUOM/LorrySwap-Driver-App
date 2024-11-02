import React, {useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native'; 
import ContactCard from '../components/ContactCard';
import PackageDetailsCF from '../components/PackageDetailsCF';
import PackageDetailsMS from '../components/PackageDetailsMS';
import { useRideContext } from '../context/RideContext';
import Header from '../components/Header';
import { BASE_URL } from '../../config';

const AcceptRequest= ({route}) =>{

    const navigation = useNavigation();
    const selectedItem = route.params.selectedItem;
    const display = route.params.display
    const { setSelectedItems,addSelectedItem,items, id, vehicle, totalWeight, token} = useRideContext();


    const onAddItem = (item) => {
        addSelectedItem(item);
        navigation.pop()
    };

    const [isPopupVisible, setPopupVisible] = useState(false);

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };
    
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [intermediateCities, setIntermediateCities] = useState([]);

    const goBack = () => {
        navigation.goBack()
    }


    useEffect(() => {
        const fetchDistanceMatrix = async () => {
            try {
                const apiKey = "AIzaSyAS6BQVMy0Px9XEj_XRibBHjfOSZRKQUVE";
                const originLat = selectedItem.plat; 
                const originLng = selectedItem.plon; 
                const destinationLat = selectedItem.dlat; 
                const destinationLng = selectedItem.dlon;
                const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLat},${originLng}&destinations=${destinationLat},${destinationLng}&key=${apiKey}`;
                
                const response = await fetch(url);
                const data = await response.json();
        
                // Extract distance and duration from the response
                const { distance, duration } = data.rows[0].elements[0];
                
                console.log(data)

                setDistance(distance.text);

            } catch (error) {
                console.error('Error fetching distance matrix:', error);
            }
        };
        fetchDistanceMatrix();
    }, []);

    const onAccept = async (item) => {
        Alert.alert('Are you sure?', 'If you accepted, you cannot reject it.',[ 
            { text: 'No'},
            { text: 'Yes', onPress: () => acceptRequest(item) }
        ]) 
    }
    const acceptRequest = async (item) => {
        try {
            const arrayItem = [item]
            const response = await fetch(`${BASE_URL}/driver/confirm/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(arrayItem),
            });
            console.log(response)
            if (response.ok) {
                Alert.alert('Accepted!', 'Special Request successfully accepted. You can see it in Confirm Ride Page.',[ 
                    { text: 'Ok'}
                ])
                console.log('Successfully backend up to date');
                navigation.navigate("SpecialRequest")
            }else if (response.status == 401){
                Alert.alert('Unauthorized!', '',[ 
                    { text: 'Ok'}
                ])
                console.log('Unauthorized');
            }else{
                Alert.alert('Error!', 'Something went wrong, Please try again.',[ 
                    { text: 'Ok'}
                ])
                console.log('Failed to update backend');
            }
        }catch (error) {
            console.error('Error updating backend:', error);
        }
    }
    const onReject = async (item) => {
        Alert.alert('Are you sure?','Do you want to reject this ride?',[ 
            { text: 'No'},
            { text: 'Yes', onPress: () => rejectRequest(item) }
        ])
    }
    const rejectRequest = async (item) => {
        try {
            const arrayItem = [item]
            const response = await fetch(`${BASE_URL}/driver/reject/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arrayItem),
            });
            if (response.ok) {
                Alert.alert('Rejected!', 'Special Request successfully rejected.',[ 
                    { text: 'Ok'}
                ])
                console.log('Successfully backend up to date');
                navigation.navigate("SpecialRequest")
            }else{
                Alert.alert('Error!', 'Something went wrong. Your action is not placed well. Try again!',[ 
                    { text: 'Ok'}
                ])
                console.error('Failed to update backend');
            }
        }catch (error) {
            console.error('Error updating backend:', error);
        }
    }

    return (
        
        <ScrollView style={GlobalStyles.wrapper}>
            <Header title="" goBack={goBack}/>  
            <View style={GlobalStyles.whiteContainerProfile}>
                <ScrollView style={styles.container}>
                    <View style={{alignItems:"center"}}>
                        <View style={styles.ProfileImage}>
                            <Image source={require('../assests/images/ProfilePic.jpg')} style={styles.image} onError={(error) => console.log('Image error:', error)}></Image>
                        </View>
                        <Text style={styles.NameText}>{selectedItem.fname} {selectedItem.lname}</Text>
                    </View>
                    <View style={{flexDirection:"row-reverse", alignItems:"flex-end", marginTop:"2%", justifyContent:"space-between"}}>
                        <ContactCard/>
                        <Text style={[styles.title,]}>Package Details</Text>
                    </View>
                    <View elevation={10} style={styles.CardStyle}>
                        { selectedItem.actor === 'CargoFinder' ? (
                            <PackageDetailsCF selectedItem={selectedItem} distance={distance}/>
                        ) : (
                            <PackageDetailsMS selectedItem={selectedItem} distance={distance}/>
                        )}
                    </View>

                    { totalWeight + selectedItem.weight > vehicle.tonnage ? (
                        display == 0?(
                            <View style={{flexDirection:"row", columnGap:10, alignSelf: 'flex-end'}}>
                                <Text style={{fontSize:15, fontWeight:"bold", color:"#EE0707"}}>Weight limit exceeded</Text>
                                <View style={{...styles.btn, backgroundColor:"#ccc"}}>
                                    <Text style={[GlobalStyles.confirmButton,{fontSize:16}]}>Add</Text>
                                </View>
                            </View>
                        ):display == 2?(
                            <View style={{flexDirection:"row", columnGap:10, alignSelf: 'flex-end'}}>
                                <TouchableOpacity style={styles.btn} onPress={() => onReject(selectedItem)} >
                                    <Text style={[GlobalStyles.confirmButton,{fontSize:16}]}>Reject</Text>
                                </TouchableOpacity>
                            
                                <View style={{...styles.btn, backgroundColor:"#ccc"}}>
                                    <Text style={[GlobalStyles.confirmButton,{fontSize:16}]}>Accept</Text>
                                </View>
                            </View>
                        ):(null)
                    ) : (   
                        display == 0?(
                            <View style={{flexDirection:"row", columnGap:10, alignSelf: 'flex-end'}}>
                                <TouchableOpacity style={styles.btn} onPress={() => onAddItem(selectedItem)}>
                                    <Text style={[GlobalStyles.confirmButton,{fontSize:16}]}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        ):display == 2?(
                            <View style={{flexDirection:"row", columnGap:10, alignSelf: 'flex-end'}}>
                                <TouchableOpacity style={styles.btn} onPress={() => onReject(selectedItem)} >
                                    <Text style={[GlobalStyles.confirmButton,{fontSize:16}]}>Reject</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={() => onAccept(selectedItem)}>
                                    <Text style={[GlobalStyles.confirmButton,{fontSize:16}]}>Accept</Text>
                                </TouchableOpacity>
                            </View>
                        ):(null)
                    )}
                </ScrollView>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -60,
    },
    ProfileImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: "hidden",
        marginBottom:5,
        backgroundColor: '#004344'
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
    },
    NameText:{
        fontSize:18,
        color: '#004344',
    },
    title:{
        color:"#004344",
        fontSize: 17,
        fontWeight: "bold",
    },
    CardStyle:{
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 25,
        width: '100%',
        marginVertical: 15,
        shadowColor: 'black',
        paddingBottom: 30,
    },
    btn:{
        paddingVertical: 5,
        paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: '#132939',
        borderRadius: 8,
    },

});

export default AcceptRequest;
