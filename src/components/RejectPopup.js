import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import { Modal } from 'react-native';
import SelectReasonPopup from "./SelectReasonPopup";

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = 180;

const RejectPopup = ({ isVisible, onClose,selectedItem, onSubmit }) => {

    const [isReasonPopupVisible, setReasonPopupVisible] = useState(false);

    const toggleReasonPopup = () => {
        setReasonPopupVisible(!isReasonPopupVisible);
      };

    return(
        <Modal
            transparent={true}
            animationType="fade"
            visible={isVisible}
            onRequestClose={onClose}
        >

            <View style={styles.container}>
                <View style={styles.CardStyle}>
                    <Text style={{fontSize: 16, color:"#132939"}}>This will reject that special request. 
                        <Text style={{fontWeight:"bold"}}>{selectedItem.name}</Text>
                    </Text>
                    <View style={{flexDirection:"row", marginTop:"10%", columnGap:15}}>
                        <TouchableOpacity style={[styles.Btn]} onPress={ onClose }>
                            <Text style={styles.text}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={[styles.Btn]} onPress={toggleReasonPopup}>
                            <Text style={styles.text}>OK</Text>
                        </TouchableOpacity>
                        <SelectReasonPopup isVisible={isReasonPopupVisible} onClose={toggleReasonPopup} onPress={onSubmit}/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems:"center",
        justifyContent:"center"
    },
    
    CardStyle:{
        height: HEIGHT_MODAL,
        width: WIDTH - 70,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: "5%",
        paddingVertical:"10%",
        marginVertical: "5%",
        shadowColor: 'black',
        alignItems:"center",
        borderColor:'black',
        borderWidth:1
    },
    Btn:{
        borderColor: '#004344',
        borderWidth: 1,
        borderRadius: 20,
        width:80,
        alignItems:"center",
        paddingTop:"1%",
        paddingBottom:"1%",
        verticalAlign:"middle"
    },
    text:{
        fontWeight:"bold",
        fontSize:12,
        color:"#132939",
    }
})

export default RejectPopup;


