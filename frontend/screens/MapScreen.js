import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, SIZES } from '../theme';
import { ChevronLeft, MapPin, Navigation } from 'lucide-react-native';

const MapScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={COLORS.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Trip Map</Text>
      </View>

      <View style={styles.mapPlaceholder}>
        <MapPin size={48} color={COLORS.primary} />
        <Text style={styles.placeholderText}>Map View will integrate Google Maps API</Text>
        <Text style={styles.placeholderSubtext}>Visualise all your planned spots here</Text>
      </View>

      <View style={styles.floatingCard}>
        <View style={styles.locationInfo}>
          <Text style={styles.locationName}>Ubud, Bali</Text>
          <Text style={styles.locationDetail}>Currently viewing 5 attractions</Text>
        </View>
        <TouchableOpacity style={styles.navButton}>
          <Navigation size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.white,
    zIndex: 10,
  },
  backButton: {
    marginRight: SPACING.md,
  },
  title: {
    fontSize: SIZES.fontXl,
    fontWeight: '800',
    color: COLORS.text,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  placeholderText: {
    fontSize: SIZES.fontMd,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  placeholderSubtext: {
    fontSize: SIZES.fontSm,
    color: COLORS.textLight,
    marginTop: 4,
  },
  floatingCard: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: SIZES.radiusLg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  locationName: {
    fontSize: SIZES.fontLg,
    fontWeight: '800',
    color: COLORS.text,
  },
  locationDetail: {
    fontSize: SIZES.fontSm,
    color: COLORS.textLight,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MapScreen;
