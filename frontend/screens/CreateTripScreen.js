import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Platform, Alert } from 'react-native';
import { COLORS, SPACING, SIZES } from '../theme';
import { Input, Button } from '../components/Common';
import { ChevronLeft, Calendar } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api'; // Update with your actual backend URL

const CreateTripScreen = ({ navigation }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [budget, setBudget] = useState('');
  const [travelers, setTravelers] = useState('1');
  
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleCreate = async () => {
    if (!origin || !destination || !budget) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(`${API_URL}/trips`, {
        origin,
        destination,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        budget: parseFloat(budget),
        travelers
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Trip created successfully!');
        navigation.navigate('Dashboard');
      }
    } catch (error) {
      console.error('Create trip error:', error);
      Alert.alert('Error', 'Failed to create trip. Please try again.');
    }
  };

  const onStartChange = (event, selectedDate) => {
    if (Platform.OS !== 'ios') {
      setShowStartPicker(false);
    }
    if (selectedDate) setStartDate(selectedDate);
  };

  const onEndChange = (event, selectedDate) => {
    if (Platform.OS !== 'ios') {
      setShowEndPicker(false);
    }
    if (selectedDate) setEndDate(selectedDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={COLORS.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Create New Trip</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>From place</Text>
          <Input 
            placeholder="Search starting point" 
            value={origin} 
            onChangeText={setOrigin}
          />
          
          <Text style={styles.inputLabel}>Where to?</Text>
          <Input 
            placeholder="Destination city" 
            value={destination} 
            onChangeText={setDestination}
          />
          
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: SPACING.sm }}>
              <Text style={styles.inputLabel}>Start Date</Text>
              {Platform.OS === 'web' ? (
                <View style={[styles.dateSelector, styles.dateSelectorWeb]}>
                  <Calendar color={COLORS.primary} size={20} />
                  <input
                    type="date"
                    value={startDate.toISOString().split('T')[0]}
                    onChange={(e) => setStartDate(new Date(e.target.value))}
                    style={{
                      border: 'none',
                      backgroundColor: 'transparent',
                      marginLeft: 8,
                      fontSize: 16,
                      color: COLORS.text,
                      width: '100%',
                      outline: 'none'
                    }}
                  />
                </View>
              ) : (
                <>
                  <TouchableOpacity 
                    style={styles.dateSelector} 
                    onPress={() => setShowStartPicker(true)}
                  >
                    <Calendar color={COLORS.primary} size={20} />
                    <Text style={styles.dateText}>{formatDate(startDate)}</Text>
                  </TouchableOpacity>
                  {showStartPicker && (
                    <DateTimePicker
                      value={startDate}
                      mode="date"
                      display="default"
                      onChange={onStartChange}
                    />
                  )}
                </>
              )}
            </View>
            <View style={{ flex: 1, marginLeft: SPACING.sm }}>
              <Text style={styles.inputLabel}>End Date</Text>
              {Platform.OS === 'web' ? (
                <View style={[styles.dateSelector, styles.dateSelectorWeb]}>
                  <Calendar color={COLORS.primary} size={20} />
                  <input
                    type="date"
                    value={endDate.toISOString().split('T')[0]}
                    onChange={(e) => setEndDate(new Date(e.target.value))}
                    style={{
                      border: 'none',
                      backgroundColor: 'transparent',
                      marginLeft: 8,
                      fontSize: 16,
                      color: COLORS.text,
                      width: '100%',
                      outline: 'none'
                    }}
                  />
                </View>
              ) : (
                <>
                  <TouchableOpacity 
                    style={styles.dateSelector} 
                    onPress={() => setShowEndPicker(true)}
                  >
                    <Calendar color={COLORS.primary} size={20} />
                    <Text style={styles.dateText}>{formatDate(endDate)}</Text>
                  </TouchableOpacity>
                  {showEndPicker && (
                    <DateTimePicker
                      value={endDate}
                      mode="date"
                      display="default"
                      onChange={onEndChange}
                    />
                  )}
                </>
              )}
            </View>
          </View>

          <Text style={styles.inputLabel}>Total Budget (e.g. ₹50,000)</Text>
          <Input 
            placeholder="Budget amount" 
            value={budget} 
            onChangeText={setBudget}
            keyboardType="numeric"
          />

          <View style={styles.travelerSection}>
            <Text style={styles.label}>Number of Travelers</Text>
            <View style={styles.travelerButtons}>
              {['1', '2', '3', '4', '5+'].map((num) => (
                <TouchableOpacity 
                  key={num}
                  style={[
                    styles.numButton, 
                    travelers === num && styles.activeNumButton
                  ]}
                  onPress={() => setTravelers(num)}
                >
                  <Text style={[
                    styles.numText,
                    travelers === num && styles.activeNumText
                  ]}>{num}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Button 
            title="Generate Itinerary" 
            onPress={handleCreate}
            style={styles.createButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Internal Card to avoid import issues if needed, or just use the one from Common
const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  backButton: {
    marginRight: SPACING.md,
  },
  title: {
    fontSize: SIZES.fontXl,
    fontWeight: '800',
    color: COLORS.text,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  formCard: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLg,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: SIZES.radiusLg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
  },
  inputLabel: {
    fontSize: SIZES.fontSm,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
    marginLeft: SPACING.xs,
    marginTop: SPACING.md,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radiusMd,
    padding: SPACING.md,
    height: 56,
  },
  dateText: {
    marginLeft: SPACING.sm,
    color: COLORS.text,
    fontSize: SIZES.fontMd,
  },
  travelerSection: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: SIZES.fontSm,
    color: COLORS.textLight,
    marginBottom: SPACING.sm,
    marginLeft: SPACING.xs,
  },
  travelerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  activeNumButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  numText: {
    fontSize: SIZES.fontMd,
    color: COLORS.text,
    fontWeight: '600',
  },
  activeNumText: {
    color: COLORS.white,
  },
  dateSelectorWeb: {
    backgroundColor: '#f8f9fa',
    borderColor: COLORS.primary,
  },
  pickerContainerWeb: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 5,
    zIndex: 1000,
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
  },
  createButton: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.accent,
  },
});

export default CreateTripScreen;
