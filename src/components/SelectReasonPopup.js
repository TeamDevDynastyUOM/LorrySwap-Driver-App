import React, {useState} from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

const SelectReasonPopup = ({ isVisible, onClose, onPress}) => {  

  const [selectedValue, setSelectedValue] = useState('season1'); 

  const navigation = useNavigation();

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <Text style={{fontSize: 14, color:"#132939", marginBottom:"5%" }}>Select a reason to briefly explain your situation</Text>

        <View style={styles.radioButton}> 
            <RadioButton
                value="reason1"
                status={selectedValue === 'reason1' ?  
                    'checked' : 'unchecked'} 
                onPress={() => setSelectedValue('reason1')} 
                color="#007BFF"
            /> 
            <Text style={styles.radioLabel}>Doesn't match my needs</Text> 
        </View> 
  
        <View style={styles.radioButton}> 
            <RadioButton
                value="reason2"
                status={selectedValue === 'reason2' ?  
                    'checked' : 'unchecked'} 
                onPress={() => setSelectedValue('reason2')} 
                color="#007BFF"
                /> 
            <Text style={styles.radioLabel}>Other</Text> 
        </View> 

            <TouchableOpacity  style={[styles.Btn]} onPress={onPress}>
                <Text style={styles.text}>OK</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical:"10%",
    paddingLeft:'10%'
  },
  radioLabel:{
    fontSize: 12,
    color:"#132939"
  },
  radioButton:{
    flexDirection:"row", 
    alignItems:"center"
},
Btn:{
    borderColor: '#004344',
    borderWidth: 1,
    borderRadius: 8,
    width:"30%",
    alignItems:"center",
    paddingTop:"1%",
    paddingBottom:"1%",
    verticalAlign:"middle",
    backgroundColor:"#132939",
    marginTop:"5%",
    alignSelf:'center'
},
text:{
    fontWeight:"bold",
    fontSize:12,
    color:"white",
}
});

export default SelectReasonPopup;
