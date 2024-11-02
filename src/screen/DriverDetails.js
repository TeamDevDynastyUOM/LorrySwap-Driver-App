import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../styles/GlobalStyles';
import { Feather} from '@expo/vector-icons';
import { useRideContext } from '../context/RideContext';
import { BASE_URL } from '../../config';

const DriverDetails = ({ route }) => {

    const { id, token} = useRideContext();

    const { item } = route.params;
    const userId = item.id;

    const navigation = useNavigation();
    const [driver, setDriver] = useState(null); // State to store the fetched driver details

    useEffect(() => {
        console.log("Fetching driver data...");
        fetch(`${BASE_URL}/owner/get_driver_by_userId/${userId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then(response => {
                console.log('Response status:', response.status); // Log response status
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched driver data:", data); // Log the fetched data
                if (data && data.Result) {
                    setDriver(data.Result); // Set the driver state with the nested Result object
                } else {
                    console.error('Unexpected response format:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    console.log(driver)

    useEffect(() => {
        console.log("Driver state updated:", driver); // Log the driver state whenever it changes
    }, [driver]);

    if (!driver) {
        return (
            <SafeAreaView style={GlobalStyles.wrapper}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }
    

    const handlePress = async () => {

    const requestBody = {
        organization_id: id
    };

    console.log('Sending request with body:', JSON.stringify(requestBody));

    try {
        const response = await fetch(`${BASE_URL}/owner/add_driver/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(requestBody),
        });

        console.log('Response status:', response.status); // Log response status for debugging

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Response error body:', errorData); // Log the response error body
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data);

        Alert.alert(
            "Success",
            "Driver added successfully!",
            [
                { text: "OK", onPress: () => navigation.navigate("DriverList") }
            ]
        );

    } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data'); // Assuming you have setError defined in your state
    }
};




  return (
    <ScrollView>
        <SafeAreaView style={GlobalStyles.wrapper}>
            <View style={GlobalStyles.header}>
                <TouchableOpacity onPress={() => navigation.goBack() }> 
                    <Feather style={GlobalStyles.iconHeader} name="arrow-left" size={20} color="white"/>
                </TouchableOpacity>
            </View>
            <View style={styles.whiteContainer}>
            <View style={{ flex: 1 }}>
            <View style={styles.container}>
            <View style={{alignItems:"center"}}>
                <View style={styles.ProfileImage}>
                    <Image source={{ uri: driver.photo }} style={styles.image}></Image> 
                </View>
                <Text style={styles.NameText}>{driver.first_name} {driver.last_name}</Text>
            </View>
            <View>
                <Text style={[styles.title]}>Driver Details</Text>
            </View>
                <View elevation={10} style={styles.CardStyle}>
                    <View style={styles.subText}>
                        <View style={{flexDirection:"row",}}>
                            <Text  style={styles.txt1}>NIC </Text>
                            <Text  style={styles.txt2}>{driver.nic}</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <Text  style={styles.txt1}>Phone No  </Text>
                            <Text  style={styles.txt2}>{driver.phone}</Text>
                        </View>
                        {/* <View style={{flexDirection:"row"}}>
                            <Text  style={styles.txt1}>Email </Text>
                            <Text  style={styles.txt2}>{driver.email} </Text>
                        </View> */}
                        <View style={{flexDirection:"row"}}>
                            <Text  style={styles.txt1}>Residence</Text>
                            <Text  style={[styles.txt2]}>{driver.residence}  </Text>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <Text  style={styles.txt1}>Age  </Text>
                            <Text  style={styles.txt2}>{driver.age}</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <Text  style={styles.txt1}>Gender </Text>
                            <Text  style={styles.txt2}>{driver.gender}</Text>
                        </View>
                    </View>
                    <View style={styles.acceptbtn}>
                        <TouchableOpacity style={styles.btn} onPress={handlePress}>
                            <Text style={[GlobalStyles.confirmButton,{fontSize:15}]}>Add Driver</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack() }>
                            <Text style={[GlobalStyles.confirmButton,{fontSize:15}]}>  Cancel  </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </View>
            </View>
        </SafeAreaView>
        </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginVertical:"-30%",
              
    },
    whiteContainer:{
        marginTop: 175,
        backgroundColor:'#ffffff',
        padding: 30,
        borderRadius:25,
        width: '100%',
        height: '100%',
    },
    ProfileImage: {
            width: 150,
            height: 150,
            borderRadius: 100,
            overflow: "hidden",
            marginBottom:5,
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
    },
    NameText:{
        fontSize:20,
        color: '#004344',
        fontWeight:"bold",
    },
    title:{
        color:"#004344",
        fontSize: 17,
        fontWeight: "bold",
        marginTop:"10%",
        marginBottom:"3%",
    },
    CardStyle:{
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 25,
        width: '100%',
        marginVertical: "5%",
        shadowColor: 'black',
        paddingBottom:"7%",
        marginBottom:"25%",
    },
    btn:{
        paddingVertical:"1%",
        paddingHorizontal:"5%",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginTop:"5%",
        marginBottom: 20,
        backgroundColor: '#132939',
        borderRadius: 8,
        paddingBottom:"3%"
    },
    subText:{
        marginTop:"5%",
        rowGap:10
    },
    txt1:{
        color:"#004344",
        fontSize:15
    },
    txt2:{
        color:"#004344",
        fontSize:15, 
        marginLeft:"50%", 
        position:"absolute"
    },
    acceptbtn:{
        flexDirection:"row", 
        columnGap:10, 
        marginLeft:"40%", 
        marginTop:"7%",
    }
})

export default DriverDetails

