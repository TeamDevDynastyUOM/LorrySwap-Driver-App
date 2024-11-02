import { StyleSheet, Text, View, TouchableOpacity ,FlatList, Alert, TouchableWithoutFeedback, Image} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useRideContext } from '../context/RideContext';
import { BASE_URL } from '../../config';

const OwnerDashboard = () => {


  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const { id, token} = useRideContext();
 
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/owner/get_organization_details/${id}`,{
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data && data.Results) {
        const fetchedResults = data.Results.map(list => ({
          id: list.id,
          fname: list.first_name.toString(),
          lname: list.last_name.toString(),
          phone: list.phone.toString(),
          vehicleno: list.vehicle_number.toString(),
        }));
        setResults(fetchedResults);

        // Check if results are empty and navigate to 'OwnerDashboardNodata'
        // if (fetchedResults.length === 0) {
        //   navigation.navigate('OwnerDashboardNodata'); // Replace 'NextScreen' with your actual screen name
        // }
      } else {
        console.error('Unexpected response format:', data);
        Alert.alert('Error', 'Unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [id, navigation])
  );


  const handlePress = (item) => {
    setSelectedItem(item === selectedItem ? null : item); // Toggle selected item
  };  

  const handleCloseOptions = () => {
    setSelectedItem(null); // Close options (e.g., Delete)
  };

  const handleEdit = (data) => {
    navigation.navigate("OwnerEdit", { data });
    console.log(data);
  };

  if (!results.length){
    return(
      <View style={styles.wrapper}>
      <StatusBar barStyle={'light-content'}/>
      <View style={styles.header}>    
        <TouchableOpacity onPress={() => navigation.navigate("OwnerHome")}> 
          <Icon style={styles.arrowleft} name="arrow-left" size={20} color="white"/>
        </TouchableOpacity>
        <Text style={styles.title}>Prasanna Travels</Text>
      </View>

        <View style={styles.Container}>

            <View style={styles.imageView}>
                <Image source={require('../assests/images/Add.jpg')} style={styles.image}></Image>
            </View>

            <View style={styles.txtView}>
                <Text style={styles.txt}>Please Assign Driver</Text>
            </View>

            <TouchableOpacity style={styles.Btn1} onPress={() => navigation.navigate("Assign")}>
                <Text style={styles.BtnTxt1}>Assign Driver</Text>
            </TouchableOpacity>
        </View>
        </View>
    )
}

  return (
    <TouchableWithoutFeedback onPress={handleCloseOptions}>
    <View style={styles.wrapper}>
      <StatusBar barStyle={'light-content'}/>
      <View style={styles.header}>    
        <TouchableOpacity onPress={() => navigation.navigate("OwnerHome")}> 
          <Icon style={styles.arrowleft} name="arrow-left" size={20} color="white"/>
        </TouchableOpacity>
        <Text style={styles.title}>Prasanna Travels</Text>
        <TouchableOpacity style={styles.Btn} onPress={() => navigation.navigate("Assign")}>
        <Ionicons name="add-circle" size={34} color="white" />
        </TouchableOpacity>
      </View>
        <View style={styles.Container}>
        <View>
        <FlatList
            data={results}
            keyExtractor={(list,index) => index.toString()}
            renderItem={( {item} ) => {
                return (
                    <View>
                        <View style={styles.listItem}>
                            <View style={styles.info}>
                                <View>
                                    <Text style={styles.Nametxt}>{item.fname} {item.lname} </Text>
                                </View>
                                    <Text style={styles.contactNO}>{item.phone}</Text>
                            </View>
                            <View style={styles.VehNo}>
                            <View style={{right:'-20%'}}>
                                <Text style={{fontSize:18, fontWeight:"bold", color:"#004344"}}>{item.vehicleno}</Text>
                            </View>
                                <TouchableOpacity style={styles.option} onPress={() => handlePress(item)}>
                                {selectedItem === item && (
                                  <TouchableOpacity elevation={10} style={styles.edit} onPress={() => handleEdit(item)}>
                                    <Text style={{fontSize:16}}>Edit</Text>
                                  </TouchableOpacity>
                                )}
                                <Feather name="more-vertical" size={24} color="black" style={{marginLeft:"25%"}}/>
                            </TouchableOpacity>
                            </View>
                            
                        </View>
                        <View style={styles.hrLine}>
                        </View>
                    </View>
                );
            }}
        />
        </View>

        </View>
    </View>
    </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#132939',
        paddingHorizontal: 5,
      },
      header:{
        flexDirection: 'row',
        margin: 10,
        marginTop: '10 %',
        // paddingLeft: 10,
        paddingRight: 10,
        alignItems:"center",
        paddingTop:'5%',
      },
      title: {
        color: '#fff',
        // fontfamily:'Source Sans Pro',
        fontSize: 20,
        fontWeight: '700',
        paddingLeft: 10,
        paddingRight: 10,
      },
      Container: {
        marginTop: 20,
        backgroundColor:'#ffffff',
        padding: 20,
        borderRadius:25,
        width: '100%',
        height: '100%',
      },
    listItem:{
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent:'space-between',
    },
    info:{
        paddingLeft: 5,
        marginVertical: 3,
    },   
    VehNo:{
       paddingTop:'1%',
       right:"-30%"
    },
    hrLine:{
        height: 1,
        backgroundColor: '#004344',
    },
    Nametxt:{
        fontSize:18,
        fontWeight: 'bold',
        color: '#004344',
        marginRight: 8,
    },
    contactNO:{
        fontSize:14,
        color: '#132939',
        marginRight: 5,
        paddingTop:"2%"
    },
    Btn:{
        right:"-300%",
      },
      BtnTxt:{
        marginHorizontal: 2,
        fontSize: 16,
        color: '#004344',
        fontWeight:"900",
      },
      edit:{
        backgroundColor: '#E5E4E2',
        shadowColor: 'black',
        position:"absolute",
        paddingLeft:"7%",
        paddingVertical:"4%",
        paddingRight:"35%",
        marginRight:"15%"
    },
    option:{
        flex: 1,
        flexDirection: 'row',
        justifyContent:"flex-end",
    },
      imageView:{
        justifyContent:"center",
        alignItems:'center',
      },
      image:{
        width:"40%",
        height:"40%",
      },
      Btn1:{
        paddingHorizontal:"5%",
        marginTop: "10%",
        marginHorizontal: "25%",
        flexDirection: 'row',
        justifyContent:"center",
        alignItems: 'center',
        borderColor: '#004344',
        padding: "3%",
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor:"#132939"
      },
      BtnTxt1:{
        marginHorizontal: 2,
        fontSize: 17,
        color: '#ffffff',
      },
      txtView:{
        alignItems:"center"
      },
      txt:{
        fontSize: 18,
        color: '#004344',
        fontWeight:'bold'
      },

})

export default OwnerDashboard;