import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';

const RideContext = createContext();

export const RideProvider = ({ children }) => {

  const item = [
    { id: '21',type:'S', fname: "Pawan SR", phone: "0757879741", contactRecipient: "075000741", location: "Ratnapura", destination: "Colombo", date: "oct 12", type:"Fragile", weight:"100", dimension:"100", photo:require('../assests/images/ProfilePic.jpg'), actor:"CF", confirm:1, plat:6.7055742, plon:80.3847345, dlat:6.9270786, dlon:79.861243},
    { id: '22',type:'S', fname: "Nimal SR", phone: "0789625596", contactRecipient: "076823641", location: "Ratmalana", destination: "Jaffna", date: "oct 14", type:"Hazardous", weight:"200", dimension:"200",photo:require('../assests/images/ProfilePic3.jpg'), actor:"CF", confirm:0, plat:6.8195, plon:79.8801, dlat:9.6615, dlon:80.0255},
    { id: '23',type:'S', fname: "Sumudu SR", phone: "0778952362", contactRecipient: "073240741", location: "Dambulla", destination: "Colombo",  date: "oct 09", type:"Flammable", weight:"150", dimension:"100",photo:require('../assests/images/ProfilePic2.jpg'), actor:"MS", confirm:1, plat:7.8742, plon:80.6511, dlat:6.9270786, dlon:79.861243},
    { id: '24',type:'S', fname: "Anil SR", phone: "0757879741", contactRecipient: "075000741", location: "Bandarawela", destination: "Colombo", date: "oct 12", type:"Flammable", weight:"750", dimension:"630", photo:require('../assests/images/ProfilePic.jpg'), actor:"MS", confirm:0,plat:6.8259, plon:80.9982, dlat:6.9270786, dlon:79.861243},
    { id: '25',type:'S', fname: "Kasun SR", phone: "0789625596", contactRecipient: "076823641", location: "Ratmalana", destination: "Jaffna", date: "oct 14", type:"Fragile", weight:"100", dimension:"100", photo:require('../assests/images/ProfilePic.jpg'), actor:"CF", confirm:0, plat:6.8195, plon:79.8801, dlat:9.6615, dlon:80.0255},
    { id: '26',type:'S', fname: "Savindu SR", phone: "0778952362", contactRecipient: "073240741", location: "Nuwara Eliya", destination: "Colombo",  date: "oct 09", type:"Hazardous", weight:"200", dimension:"50",photo:require('../assests/images/ProfilePic3.jpg'), actor:"MS", confirm:0, plat:6.9497, plon:80.7891, dlat:6.9270786, dlon:79.861243},
    { id: '27',type:'S', fname: "Malith SR", phone: "0757879741", contactRecipient: "075000741", location: "Dambulla", destination: "Colombo", date: "oct 12", type:"Flammable", weight:"750", dimension:"60", photo:require('../assests/images/ProfilePic.jpg'), actor:"MS", confirm:0, plat:7.8742, plon:80.6511, dlat:6.9270786, dlon:79.861243},
    { id: '28',type:'S', fname: "Kamal SR", phone: "0789625596", contactRecipient: "076823641", location: "Ratmalana", destination: "Jaffna", date: "oct 14",  type:"Hazardous", weight:"200", dimension:"200",photo:require('../assests/images/ProfilePic3.jpg'), actor:"CF", confirm:0, plat:6.8195, plon:79.8801, dlat:9.6615, dlon:80.0255},
    { id: '29',type:'S', fname: "Amal SR", phone: "0778952362", contactRecipient: "073240741", location: "Ratnapura", destination: "Colombo",  date: "oct 09", type:"Fragile", weight:"100", dimension:"100", photo:require('../assests/images/ProfilePic.jpg'), actor:"CF", confirm:0, plat:6.7055742, plon:80.3847345, dlat:6.9270786, dlon:79.861243},
];



  const [selectedItems, setSelectedItems] = useState([]);
  const [newSelectedItems, setNewSelectedItems] = useState(selectedItems);
  const [items, setItems] = useState(item);
  const [inputData, setInputData] = useState({});
  const [confirmItems, setConfirmItems] = useState([]);
  const [id, setId] = useState();
  const [token, setToken ] = useState();
  const [verify, setVerify ] = useState(false);
  const [vehicle, setVehicle ] = useState({})
  const [totalWeight, setTotalWeight] = useState(0);

  const addSelectedItem = (item) => {
    console.log("Total Weight is", totalWeight)
    console.log("Item Weight is", item.weight)
    console.log("Vehicle tonnage is", vehicle.tonnage)

    if (totalWeight + item.weight < vehicle.tonnage){
      setSelectedItems((prevItems) => [...prevItems, item]);
      setNewSelectedItems((prevItems) => [...prevItems, item]);
      setTotalWeight(totalWeight+item.weight);
    }else{
      const remainingWeight = vehicle.tonnage - totalWeight;
      Alert.alert('Weight limit exceeded',
        `You can only add ${remainingWeight}kg more weight units.`,
        [{ text: 'OK' },])
    }
    console.log("New Total Weight is", totalWeight)
  };

  const clearSelectedItems = () => {
    setSelectedItems([]);
    setNewSelectedItems([]);
  };

  return (
    <RideContext.Provider
      value={{
        selectedItems,
        addSelectedItem,
        clearSelectedItems,
        setSelectedItems,
        newSelectedItems,
        setNewSelectedItems,
        items,
        setItems,
        inputData,
        setInputData,
        confirmItems,
        setConfirmItems,
        id, 
        setId,
        token,
        setToken,
        verify, 
        setVerify,
        vehicle,
        setVehicle,
        totalWeight,
        setTotalWeight
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

export const useRideContext = () => {
  const context = useContext(RideContext);
  if (!context) {
    throw new Error('useRideContext must be used within a RideProvider');
  }
  return context;
};
