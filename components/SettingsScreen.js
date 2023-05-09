import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';


import styles from './AddDonorStyle';
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SettingsScreen = () => {


  

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [totalDonation, setTotalDonation] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const handleSelect = (selectedItem, index) => {
    setSelectedBloodGroup(selectedItem);
  };

  const handleFormSubmit = () => {
    const donorInformation = {
      name,
      phone,
      address,
      bloodGroup: selectedBloodGroup,
      lastDonationDate,
      totalDonation: parseInt(totalDonation),
    };

    Alert.alert('Form Values', JSON.stringify(donorInformation));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <SelectDropdown
        data={bloodGroups}
        buttonStyle={styles.input}
        onSelect={handleSelect}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Donation Date"
        value={lastDonationDate}
        onChangeText={setLastDonationDate}
      />
    <View>
      <Button title="Show Date Picker" onPress={showDatePicker} />

    </View>
    
      <TextInput
        style={styles.input}
        placeholder="Total Donation"
        value={totalDonation}
        onChangeText={setTotalDonation}
        keyboardType="numeric"
      />
      <Button
        style={styles.button}
        title="Submit"
        onPress={handleFormSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </Button>
    </View>
  );
};

export default SettingsScreen;
