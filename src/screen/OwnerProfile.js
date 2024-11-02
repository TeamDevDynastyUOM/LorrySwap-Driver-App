import React,{useEffect, useState, useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import { Feather } from '@expo/vector-icons';
import GlobalStyles from '../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { BASE_URL } from '../../config';
import { useRideContext } from '../context/RideContext';

const OwnerProfile= () =>{

    const navigation = useNavigation();

    const { id, token} = useRideContext();

    const [owner, setOwner] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
          const fetchData = async () => {
            try {
              const response = await fetch(`${BASE_URL}/owner/get_owner_by_userId/${id}`, {
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": `Bearer ${token}`
                },
              });
    
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
    
              const data = await response.json();
              if (data && data.Result) {
                setOwner(data.Result); // Set the owner state with the nested Result object
              } else {
                console.error('Unexpected response format:', data);
              }
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
    
          fetchData();
        }, [id, token])
      );
    
    
    const [data, setData] = useState({
        totalDriversCount: 0,
        totalVehiclesCount: 0,
      });
    
      const fetchData = useCallback(async () => {
        try {
          const response = await fetch(`${BASE_URL}/owner/get_total_count/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result = await response.json();
    
          if (
            typeof result.total_drivers_count === 'number' &&
            typeof result.total_vehicles_count === 'number'
          ) {
            setData({
              totalDriversCount: result.total_drivers_count,
              totalVehiclesCount: result.total_vehicles_count,
            });
          } else {
            throw new Error('Unexpected response format');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          Alert.alert('Error', 'Failed to fetch data');
        }
      }, [id]);
    
      useEffect(() => {
        fetchData();
      }, [fetchData]);
 

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
                    <Image source={{ uri: owner.photo }} style={styles.image}></Image> 
                </View>
                <Text style={styles.NameText}>{owner.first_name} {owner.last_name}</Text>
            </View>

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
            
            <View style={{flexDirection:"row", justifyContent:"center"}}>

            <View style={styles.shape}>
                <View style={styles.square}>
                    <Text style={styles.number}>{data.totalDriversCount}</Text>
                </View>
                <Text style={styles.txt2}>Total Drivers</Text>
            </View>

            <View style={styles.shape}>
                <View style={styles.square}>
                    <Text style={styles.number}>{data.totalVehiclesCount}</Text>
                </View>
                <Text style={styles.txt2}>Total Trucks</Text>
            </View>
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
        fontSize:19,
        color: '#004344',
        paddingLeft:'5%',
    },
    details:{
        marginTop:"10%",
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
        color: '#004344'
    }
});

export default OwnerProfile;
