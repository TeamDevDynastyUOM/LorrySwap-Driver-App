import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const OwnerPopup = ({ isVisible, onClose, selectedItem }) => {

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

          <View elevation={10} style={styles.CardStyle}>

            <View style={styles.subText}>
                <View style={{flexDirection:"row",}}>
                  <Text  style={styles.txt1}>NIC </Text>
                  <Text  style={styles.txt2}></Text>
            </View>
            <View style={{flexDirection:"row"}}>
                    <Text  style={styles.txt1}>Phone No  </Text>
                    <Text  style={styles.txt2}></Text>
            </View>
            <View style={{flexDirection:"row"}}>
              <Text  style={styles.txt1}>Email </Text>
              <Text  style={styles.txt2}></Text>
            </View>
            <View style={{flexDirection:"row"}}>
              <Text  style={styles.txt1}>Residence</Text>
              <Text  style={styles.txt2}> </Text>
            </View>
            <View style={{flexDirection:"row"}}>
              <Text  style={styles.txt1}>Age  </Text>
              <Text  style={styles.txt2}></Text>
            </View>
            <View style={{flexDirection:"row"}}>
              <Text  style={styles.txt1}>Gender </Text>
              <Text  style={styles.txt2}></Text>
            </View>
            </View>
              <View style={styles.acceptbtn}>
                <TouchableOpacity style={styles.btn} onPress={handlePress}>
                  <Text style={[GlobalStyles.confirmButton,{fontSize:15}]}>Add Driver</Text>
                 </TouchableOpacity>
              </View>
             </View>
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
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: "10%",
    paddingLeft: "10%",
  },
  Btn: {
    borderColor: "#004344",
    borderWidth: 1,
    borderRadius: 8,
    width: "30%",
    alignItems: "center",
    paddingTop: "1%",
    paddingBottom: "1%",
    verticalAlign: "middle",
    backgroundColor: "#132939",
    marginTop: "5%",
    alignSelf: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 12,
    color: "white",
  },
});

export default OwnerPopup;
