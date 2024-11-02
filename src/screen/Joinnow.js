import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonText from "../components/ButtonText";

export default function Joinnow (){

    const navigation = useNavigation();

    const gotoForm = () => {
        navigation.navigate("Signup");
    }

    const gotoSignin = () => {
        navigation.navigate("Signin");
    }

    return(
        <View style={styles.container}>
            <View style={styles.imgcontainer}>
                <Image source={require('../assests/images/SignupTD.png')} style={styles.image}/>
            </View>
            <View style={styles.textcontainer}>
                <Text style={styles.text1}>Let's</Text>
                <Text style={styles.text1}>Get Started</Text>
                <Text style={styles.text2}>Let's begin your seamless journey to connect nad transport.</Text>
                <View style={styles.bottom}>
                    <TouchableOpacity onPress={gotoForm} style={styles.joinButton}>
                        <Text style={styles.buttonText}>Join Now</Text>
                    </TouchableOpacity>                

                    <View style={styles.bottomTextContainer}>
                        <Text style={styles.text3}>Already on LorrySwap? </Text>
                        <ButtonText buttonName="Login" onPress={gotoSignin} size='xs'/>
                    </View>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#132939',
    },
    imgcontainer: {
        flex: 2,
        marginLeft: '10%',
        marginRight: '10%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    image:{
        width: '100%',
        height: '80%',
    },
    textcontainer: {
        flex: 2,
        marginLeft: '10%',
        marginRight: '10%',
    },
    text1: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 49,
    },
    text2: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    bottom: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    joinButton:{
        margin: 10,
        marginTop: 50,
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 15,
        width: 200,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#132939',
        fontSize: 18,
        fontWeight: 'bold',
    },
    bottomTextContainer: {
        flexDirection: 'row',
        alignItems :  'center',
    },
    text3: {
        color: '#fff',
        fontSize: 12,
    },
    text4: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    bottomText:{
        
    },

})