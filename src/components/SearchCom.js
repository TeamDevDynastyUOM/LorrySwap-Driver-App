import React, {useState} from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRideContext } from '../context/RideContext'
import { useFocusEffect } from '@react-navigation/native';
import { BASE_URL } from '../../config';

const SearchCom = ({data}) => {

    const navigation = useNavigation();
    const { id, token } = useRideContext();

    const [owner, setOwner] = useState([]);

    function hashCode(a, b) {
        const sortedValues = [a, b].sort((x, y) => x - y);
        const sortedString = sortedValues.join('-');
        return sortedString.split('').reduce((hash, char) => {
            hash = ((hash << 5) - hash) + char.charCodeAt(0);
            return hash & hash;
        }, 0);
    }


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


    const handleOnPress = (item, owner) => {
        const username = `${owner.first_name} ${owner.last_name}`;
        const room = hashCode(id,item.id);
        navigation.navigate('ChatScreen', { item, username, room });
        console.log("heloooooooooooooooooo", username)
    };
    

    return( 
    <View style={styles.container}>
        <FlatList
            data={data}
            keyExtractor={(data)=> data.id}
            showsVerticalScrollIndicator={false}
            renderItem={( {item} ) => {
                return (
                    <View>
                        <TouchableOpacity style={styles.listItem} onPress={() => handleOnPress(item, owner)} >
                            <Image style={styles.dp} source={{ uri: item.photo }} />
                            <View style={styles.info}>
                                <View>
                                    <Text style={styles.text04}>{item.driverName}</Text>
                                    <Text style={styles.text05}>{item.user_type}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.hrLine}>
                        </View>
                    </View>
                );
            }}
        />
    </View>
    );

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // marginTop: -20,
        marginBottom: 120,
    },
    listItem:{
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
    },
    dp:{
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    info:{
        paddingLeft: "5%",
        marginVertical: "3%",
    },   
    hrLine:{
        height: 1,
        backgroundColor: '#004344'
    },
    text04:{
        fontSize:18,
        fontWeight: 'bold',
        color: '#004344',
        marginRight: 8,
    },
    text05:{
        fontSize:16,
        color: '#004344',
        marginRight: 8,
    },
});

export default SearchCom;
