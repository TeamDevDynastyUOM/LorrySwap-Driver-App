import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';
import GlobalStyles from '../styles/GlobalStyles';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useRideContext } from '../context/RideContext';
import { BASE_URL } from '../../config';
import SearchCom from '../components/SearchCom';


const ChatSearch = () => {

  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);

  const {id, token} = useRideContext();

  useFocusEffect(
    React.useCallback(() => {
      console.log("Fetching driver data...");
      fetch(`${BASE_URL}/owner/get_all_drivers`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
          
        })
        .then(data => {
          // Check if the data.Results exists before processing
          if (data && data.Results) {
            // Extract the required data from the fetched data and store it in results array
            const fetchedResults = data.Results.map(item => ({
              id: item.id.toString(),
              fname: item.first_name.toString(),
              lname: item.last_name.toString(),
              photo: item.photo,
              user_type: "Driver",
              driverName: `${item.first_name} ${item.last_name}`,
            }));
            setResults(fetchedResults);
            setData(fetchedResults); // Initially set data to show all results
            // For example, you can log the results to console
            console.log(fetchedResults);
          } else {
            console.error('Unexpected response format:', data);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, [])
  );

  const searchTerm = (text) => {
    if (text) {
      const filterList = results.filter((item) => item.driverName.toLowerCase().includes(text.toLowerCase()));
      setData(filterList);
    } else {
      setData(results);
    }
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={GlobalStyles.wrapper}>
        <View style={GlobalStyles.header}>
          <TouchableOpacity onPress={() => navigation.goBack() }>
            <Feather style={GlobalStyles.iconHeader} name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text style={GlobalStyles.pageTitle}>Chat</Text>
        </View>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBtnStyle}
            placeholder="Search"
            onChangeText={(text) => searchTerm(text)}
            onFocus={() => {}}
          />
          <FontAwesome name="search" size={18} color="black" style={styles.searchicon} />
        </View>
        <View style={GlobalStyles.whiteContainerWithSearchBar}>
          <SearchCom data={data}/>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    marginHorizontal: 15,
    marginTop: 5,
  },
  searchBtnStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#dedede",
    paddingLeft: 40,
  },
  searchicon: {
    position: 'absolute',
    marginTop: 12,
    marginLeft: 10,
  },
});

export default ChatSearch;
