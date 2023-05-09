import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './DonorScreenStyles';

const DonorScreen = () => {
  const [token, setToken] = useState('');
  const [donorInfo, setDonorInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        callDonorInfoAPI(storedToken);
      }
    };

    checkLoginStatus();
  }, []);

  const callDonorInfoAPI = (token) => {
    fetch('https://note-app-kawsar19.vercel.app/api/all-donors', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response data
        setDonorInfo(data);
      })
      .catch((error) => {
        // Handle any errors that occur during the API call
        console.error(error);
      });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredDonors = donorInfo.filter((donor) =>
    donor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by donor name"
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <ScrollView style={styles.donorList}>
        {donorInfo.length > 0 ? (
          filteredDonors.length > 0 ? (
            filteredDonors.map((donor, index) => (
              <View style={styles.donorCard} key={index}>
                <Text style={styles.donorInfo}>
                  <Text style={styles.infoLabel}>Donor Name:</Text> {donor.name}
                </Text>
                <Text style={styles.donorInfo}>
                  <Text style={styles.infoLabel}>Phone:</Text> {donor.phone}
                </Text>
                <Text style={styles.donorInfo}>
                  <Text style={styles.infoLabel}>Address:</Text> {donor.address}
                </Text>
                <Text style={styles.donorInfo}>
                  <Text style={styles.infoLabel}>Blood Group:</Text> {donor.bloodGroup}
                </Text>
                <Text style={styles.donorInfo}>
                  <Text style={styles.infoLabel}>Last Donation Date:</Text> {donor.lastDonationDate}
                </Text>
                <Text style={styles.donorInfo}>
                  <Text style={styles.infoLabel}>Total Donation:</Text> {donor.totalDonation}
                </Text>
                <Text style={styles.donorInfo}>
                  <Text style={styles.infoLabel}>Days After Last Donation:</Text> {donor.daysAfterDonation}
                </Text>
                {/* Add more donor information properties here */}
              </View>
            ))
          ) : (
            <Text style={styles.noDonorText}>No matching donors found</Text>
          )
        ) : (
          <Text style={styles.loadingText}>Loading donor info...</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default DonorScreen;
