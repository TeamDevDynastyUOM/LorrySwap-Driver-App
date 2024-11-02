import React, { useState, useEffect, useRef } from "react";
import {StyleSheet,Text, View, Modal, Button, TextInput,TouchableOpacity } from "react-native";
import StarRating from "../components/StarRating";
import { BASE_URL } from "../../config";
import ButtonText from '../components/ButtonText';
import ButtonContained from '../components/ButtonContained';
import { useRideContext } from '../context/RideContext';
  
const PlaceReviewPopUp = ({setReviewDataPopUp, reviewDataPopUp, data}) => {

const prevRatingRef = useRef(null);
const {id} = useRideContext();

const [rating, setRating] = useState(0);
const [title, setTitle] =useState('')
const [comment, setComment] = useState('')
const [loading, setLoading] = useState();

useEffect(() => {
    prevRatingRef.current = rating;
    console.log("Previous rating:", prevRatingRef.current);
}, [rating]);

const handleRatingChange = (newRating) => {
    setRating(newRating);
};

const [isPressed, setIsPressed] = useState(false);

const SkipButtonPress = () => {
    setReviewDataPopUp(false)
};


const ContinueButtonPress = () => {
    setLoading(true);
    handleContinueButtonPress();
};

const PlaceReviewData = {
    rating,
    title,
    comment,
    ride_id : data[0].id,
    sender : id,
    receiver : data[0].user_id,
}

const handleContinueButtonPress = async () => {
    await fetch(`${BASE_URL}/review`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(PlaceReviewData),
    })
    .then((response) => {
        console.log("Item added successfully:", PlaceReviewData);
        setReviewDataPopUp(false)
    })
    .catch((error) => {
        console.error("Error adding item:", error);
    })
    .finally(() => {
        setLoading(false);
    });
};


return (
    <View style={styles.container}>
    <Modal
        animationType="slide"
        transparent={true}
        visible={reviewDataPopUp}
        onRequestClose={() => {
            setModalVisible(false);
        }}
    >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <View style={styles.subContent1}>
                    <Text style={styles.locationText}>
                        Review for {data[0].fname} {data[0].lname}
                    </Text>
                    <StarRating
                        rating={rating}
                        onRatingChange={handleRatingChange}
                        size={30}
                    />
                    <Text>
                    {rating === 1
                        ? <Text style={{...styles.ratingStatus, color:'red'}}>Poor</Text>
                        : rating === 2
                        ? <Text style={{...styles.ratingStatus, color:'orange'}}>Fair</Text>
                        : rating === 3
                        ? <Text style={{...styles.ratingStatus, color:'yellow'}}>Average</Text>
                        : rating === 4
                        ? <Text style={{...styles.ratingStatus,color:'green'}}>Good</Text>
                        : rating === 5
                        ? <Text style={{...styles.ratingStatus, color:'#f507e1'}}>Excellent</Text>
                        : " "
                    }
                    </Text>
                    <TextInput
                        placeholder="Enter Title"
                        style={styles.textInput1}
                        textAlign="center"
                        keyboardType="ascii-capable"
                        onChangeText={(title) => setTitle(title)}
                        maxLength={49}
                    />
                    <TextInput
                        placeholder="Share your Own Expierience"
                        style={styles.textInput}
                        textAlign="center"
                        keyboardType="ascii-capable"
                        onChangeText={(comment) => setComment(comment)}
                        maxLength={200}
                        multiline={true}
                    />
                    <Text style={styles.charCount}>{comment.length}/200</Text>
                </View>

                <View style={styles.bottomButtonSet}> 
                    <ButtonText buttonName="Skip" onPress={SkipButtonPress} />
                    <ButtonContained buttonName="Submit" 
                        onPress={ContinueButtonPress} loading={loading}
                    />
                    
                </View>
            </View>
        </View>
    </Modal>
    </View>
);
};

export default PlaceReviewPopUp;

const styles = StyleSheet.create({
container: {
    justifyContent: "center",
    alignItems: "center",
},
modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
},
modalContent: {
    width: "100%",
    maxHeight: 450,
    backgroundColor: "white",
    padding: 20,
    paddingTop: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 5,
},
modalText: {
    fontSize: 18,
    marginBottom: 10,
},
subContent1: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxHeight: 450,
},
activityIndicatorContain:{
    minHeight: 300,
},
locationText:{
    fontSize: 25, 
    fontWeight: "bold", 
    color: '#004344'
},  
ratingStatus:{
    fontSize:20,
    fontWeight:'bold'
},
textInput1: {
    width: "auto",
    height: 40,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 16,
    width: '100%'
},
textInput: {
    marginTop: 15,
    height: 100,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
},
charCount: {
    textAlign: 'right',
    marginTop: 1,
    color: '#888',
},
bottomButtonSet:{
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
},

buttonPressed: {
    backgroundColor: "#edebeb",
},


});
