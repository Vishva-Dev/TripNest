import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS, SPACING, SIZES } from '../theme';
import { Card, Button } from '../components/Common';
import { Calendar, MapPin, Plus } from 'lucide-react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api';

const DashboardScreen = ({ navigation }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${API_URL}/trips`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrips(response.data);
    } catch (error) {
      console.error('Fetch trips error:', error);
      // alert('Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  };

  const renderTripCard = ({ item }) => (
    <Card style={styles.tripCard}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('TripDetails', { trip: item })}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.destination}>{item.destination}</Text>
          <View style={styles.travelerBadge}>
            <Text style={styles.travelerText}>{item.travelers} People</Text>
          </View>
        </View>
        
        <View style={styles.cardInfo}>
          <View style={styles.infoRow}>
            <Calendar size={16} color={COLORS.textLight} />
            <Text style={styles.infoText}>
              {new Date(item.start_date).toLocaleDateString()} – {new Date(item.end_date).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MapPin size={16} color={COLORS.textLight} />
            <Text style={styles.infoText}>{item.origin || 'Flexible'} → {item.destination}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.budgetText}>Budget: <Text style={styles.budgetAmount}>₹{parseFloat(item.budget).toLocaleString()}</Text></Text>
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => navigation.navigate('TripDetails', { trip: item })}
          >
            <Text style={styles.viewButtonText}>View Plan</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hey Traveller! ✈️</Text>
          <Text style={styles.title}>Your Trips</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileInitial}>
            <Text style={styles.initialText}>V</Text>
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={trips}
        renderItem={renderTripCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No trips planned yet.</Text>
            <Button 
                title="Create Your First Trip" 
                onPress={() => navigation.navigate('CreateTrip')}
                style={styles.emptyButton}
            />
          </View>
        }
      />

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('CreateTrip')}
      >
        <Plus color={COLORS.white} size={30} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  greeting: {
    fontSize: SIZES.fontMd,
    color: COLORS.textLight,
  },
  title: {
    fontSize: SIZES.fontXl,
    fontWeight: '800',
    color: COLORS.text,
  },
  profileInitial: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  initialText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.fontMd,
  },
  listContent: {
    padding: SPACING.lg,
    paddingBottom: 100, // Space for FAB
  },
  tripCard: {
    marginBottom: SPACING.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  destination: {
    fontSize: SIZES.fontLg,
    fontWeight: '700',
    color: COLORS.text,
  },
  travelerBadge: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: SIZES.radiusSm,
  },
  travelerText: {
    fontSize: SIZES.fontSm - 2,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  cardInfo: {
    marginBottom: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: SIZES.fontSm,
    color: COLORS.textLight,
    marginLeft: SPACING.xs,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  budgetText: {
    fontSize: SIZES.fontSm,
    color: COLORS.textLight,
  },
  budgetAmount: {
    color: COLORS.accent,
    fontWeight: '700',
  },
  viewButtonText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: SIZES.fontSm,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: COLORS.textLight,
    fontSize: SIZES.fontMd,
    marginBottom: SPACING.lg,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
});

export default DashboardScreen;
