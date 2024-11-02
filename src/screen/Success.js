import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Signup from './Signup';


export default function Success() {

    const navigation = useNavigation();

    const gotoHome = () => {
        navigation.push('Signin')
    }

    return (
    <View style={styles.container}>
            <View style={styles.top}>
                <Image source={require('../assests/images/Right.png')} style={styles.image} />
                <Text style={styles.textSuccess}>SUCCESS</Text>
                <View style={styles.bottom}>
                    <Text style={styles.text1}>Congratulations!</Text>
                    <Text style={styles.text2}>Your account has been</Text>
                    <Text style={styles.text2}>successfully created.</Text>                 

                    <TouchableOpacity onPress={gotoHome}>
                        <View style={styles.successButton}>
                            <Text style={styles.buttonText}>Continue</Text>
                            <Ionicons name="arrow-forward" size={32} color="#fff" />
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
    </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 100,
        height: 100,
        alignItems: 'center',
        marginTop: '30%',
    },
    top: {
        alignItems: 'center',
        backgroundColor: '#132939',
        height: '100%',
        width: '100%',
    },
    textSuccess:{
        marginTop: 10,
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
    },
    bottom: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        width: '100%',
        height: '80%',
        alignItems: 'center',
    },
    text1: {
        fontSize: 32,
        marginTop: 30,
        marginBottom: 25,
        paddingTop: 10,
        color: '#132939',
    },
    text2: {
        marginTop: -6,
        fontSize: 15,
        color: '#000',
    },
    successButton: {
        margin: 5,
        marginTop: 40,
        backgroundColor: '#132939',
        padding: 5,
        borderRadius: 50,
        width: 200,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        paddingLeft: 12,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
