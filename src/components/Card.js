import React from "react";
import { View, Text, StyleSheet} from "react-native";

const Card = (props) => {

    const isLogoutTitle = props.title === 'Log Out';

    return(
            <View style={styles.listItem}>
                <Text> {props.icon} </Text>
                <View>
                    <Text style={[styles.text,isLogoutTitle && styles.customStyle]}> {props.title} </Text>
                </View>
            </View>
    
    );
};

const styles = StyleSheet.create({
    
    listItem:{
        marginBottom: 15,
        paddingLeft:30,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#dedede",
        flexDirection: "row",
        columnGap: 10,
        width: '100%',
    },
    
    text:{
        fontSize:17,
        fontWeight: 'bold',
        color: '#004344',
    },

    customStyle:{
        paddingLeft:'30%'
    }

});

export default Card;