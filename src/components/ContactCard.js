import React from 'react';
import { StyleSheet,Text, View} from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const ContactCard= () =>{
    return(
        <View>
            <View style={styles.contactItems}>
                <Ionicons name="call" size={24} color="#004344" />
                <Text style={{fontSize:16, color:"#004344"}}>Voice call</Text>
            </View>
            <View style={styles.contactItems}>
                <Entypo name="message" size={24} color="#004344" />
                <Text style={{fontSize:16, color:"#004344"}}>Message</Text>
            </View>  
        </View>
    )
}

const styles = StyleSheet.create({
    contactItems:{
        flexDirection:'row',
        columnGap:10,
        marginBottom:'2%',
    }
});

export default ContactCard;
