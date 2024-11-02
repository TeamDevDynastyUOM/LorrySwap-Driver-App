import React,{useEffect, useState, useCallback} from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import { Feather } from '@expo/vector-icons';
import GlobalStyles from '../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { BASE_URL } from '../../config';
import { useRideContext } from '../context/RideContext';

const Profile= () =>{

    const navigation = useNavigation();

    const { id, token} = useRideContext();
    const [owner, setOwner] = useState([]);

    useEffect(() => {
        console.log("Fetching driver data...");
        fetch(`${BASE_URL}/owner/get_driver_by_userId/${id}`,{
            headers: {
            'Content-Type': 'application/json',
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
                    setOwner(data.Result); // Set the driver state with the nested Result object
                } else {
                    console.error('Unexpected response format:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [owner.first_name, owner.last_name, owner.phone, owner.mail]);
    console.log(owner)
 

    return(
        <SafeAreaView style={GlobalStyles.wrapper}>
            <View style={GlobalStyles.header}>
                <TouchableOpacity onPress={() => navigation.goBack() }> 
                    <Feather style={GlobalStyles.iconHeader} name="arrow-left" size={20} color="white"/>
                </TouchableOpacity>
                <View style={styles.edit}>
                <TouchableOpacity onPress={() => navigation.navigate('OwnerEditProfile', {item: owner} )}>
                    <Text style={styles.editTxt}>Edit Profile</Text>
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.whiteContainer}>
            <View style={{ flex: 1 }}>
            <View style={styles.container}>
            <View style={{alignItems:"center"}}>
                <View style={styles.ProfileImage}>
                    <Image source={require('../assests/images/ProfilePic.jpg')} style={styles.image}></Image> 
                </View>
                <Text style={styles.NameText}>{owner.first_name} {owner.last_name}</Text>
            </View>

            <View style={styles.details}>
                <MaterialCommunityIcons name="truck-outline" size={30} color="#004344" />
                <Text style={styles.txt}>{owner.Vehicleno || 'Not assigned yet'}</Text>
            </View>
            <View style={styles.hrLine}></View> 

            <View style={styles.details}>
                <MaterialIcons name="phone-android" size={32} color='#004344'/>
                <Text style={styles.txt}>{owner.phone}</Text>
            </View>
            <View style={styles.hrLine}></View>

            <View style={styles.details}>
                <Feather name="mail" size={28} color="#004344" />
                <Text style={styles.txt}>{owner.email}</Text>
            </View>
            <View style={styles.hrLine}></View>

            <View style={styles.details}>
                <AntDesign name="home" size={30} color="#004344" />
                <Text style={styles.txt}>{owner.residence}</Text>
            </View>
            <View style={styles.hrLine}></View>
            
            <View style={{flexDirection:"row", justifyContent:"center"}}>

            
            </View>

            </View>
            </View>
            </View>
        </SafeAreaView>
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
        paddingBottom:"5%"
    },
    edit:{
        marginTop:"2%",
        marginLeft:"70%"
    },
    editTxt:{
        fontSize:17,
        color: "white",
        fontWeight:"bold"
    },
    txt:{
        fontSize:17,
        color: '#004344',
        paddingLeft:'5%',
    },
    details:{
        marginTop:"5%",
        marginLeft:"5%",
        marginBottom:"5%",
        flexDirection:"row",
    },
    hrLine:{
        height: 1,
        backgroundColor: '#004344',
    },
    square:{
        width: 70*2,
        height: 80,
        borderRadius: 50 / 2,
        borderWidth: 3, // Adjust this to change the thickness of the ring
        borderColor: "#132939", // Color of the ring
        backgroundColor: "transparent",
        alignItems:"center",
        padding:"1%",
        
    },
    shape:{
        marginTop:"10%",
        marginLeft:"3%",
        marginRight:"3%",
        alignItems:"center",
    },
    number:{
        fontSize:40,
        fontWeight:"bold",
        textAlign:"center",
        color: '#004344'
    },
    txt2:{
        fontSize:18,
        fontWeight:"bold",
        paddingTop:"3%",
        color: '#004344',
    }
});

export default Profile;
