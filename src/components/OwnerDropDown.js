import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";

const OwnerDropDown = ({ value, isFocus, setIsFocus, setValue }) => {
    const [Vehicles, setVehicles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownClicked, setDropdownClicked] = useState(false);
  
    const fetchVehicles = () => {
      setIsLoading(true);
      // Fetch economic centers data from the backend API
      axios
        .get("https://789f-112-134-170-253.ngrok-free.app/economicCenter")
        .then((response) => {
          setVehicles(response.data);
        })
        .catch((error) => {
          console.error("Error fetching economic centers:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
  
    useEffect(() => {
      // Initialize value state to null when the component mounts
      setValue(null);
    }, []); // Empty dependency array ensures this effect runs only once
    
  const sendSelectedVehicleIdToBackend = (value) => {
    console.log("Selected Vehicle ID:", value);
  };
  
    return (
      <View style={styles.container}>
        <Dropdown
          style={styles.dropdown}
          data={Vehicles}
          maxHeight={300}
          labelField="name"
          valueField="_index"
          placeholder={
            isFocus || dropdownClicked ? "..." : "Select Vehicle"
          }
          value={value}
          onFocus={() => {
            setIsFocus(true);
            setDropdownClicked(true);
            if (!Vehicles.length) {
              fetchVehicles();
            }
          }}
          onBlur={() => {
            setIsFocus(true);
            setDropdownClicked(true);
          }}
          onChange={(item) => {
            setValue(item._index);
            sendSelectedVehicleIdToBackend(item._index+1);
            setIsFocus(true);
            setDropdownClicked(true);
          }}
        />
  
        {isLoading && <Text>Loading...</Text>}
      </View>
    );
  };
  

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "2%",
        position: "relative",
      },
      dropdown: {
        flex: 1,
        height: 35,
        backgroundColor: "#F1F3F6",
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 7,
        paddingLeft: "5%",
        paddingRight: "3%",
        marginRight: 10,
      },
      iconContainer: {
        position: 'absolute',
        right: 10,
        zIndex: 1,
      },
})

export default OwnerDropDown