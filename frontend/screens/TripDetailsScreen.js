import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, SPACING, SIZES } from '../theme';
import { ChevronLeft, Calendar, DollarSign, Map as MapIcon, Share2 } from 'lucide-react-native';

const TripDetailsScreen = ({ navigation, route }) => {
  const { trip } = route.params || {};
  
  if (!trip) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft color={COLORS.text} size={24} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Trip not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const startDate = new Date(trip.start_date);
  const endDate = new Date(trip.end_date);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  const menuItems = [
    { id: 'itinerary', title: 'Day Planner', description: 'Schedule your activities', icon: Calendar, color: COLORS.primary, screen: 'Itinerary' },
    { id: 'budget', title: 'Budget Tracker', description: 'Track your expenses', icon: DollarSign, color: COLORS.accent, screen: 'Budget' },
    { id: 'map', title: 'Map View', description: 'See places on map', icon: MapIcon, color: COLORS.secondary, screen: 'Map' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={COLORS.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Trip Overview</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Share2 color={COLORS.primary} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            <Text style={styles.heroDest}>{trip.destination}</Text>
            <Text style={styles.heroDate}>
              {startDate.toLocaleDateString()} – {endDate.toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuCard}
              onPress={() => navigation.navigate(item.screen, { tripId: trip.id })}
            >
              <View style={[styles.iconBox, { backgroundColor: item.color + '20' }]}>
                {React.createElement(item.icon, { size: 24, color: item.color })}
              </View>
              <View>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDesc}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )) }
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Quick Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>{diffDays}</Text>
              <Text style={styles.statLabel}>Days</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>0</Text>
              <Text style={styles.statLabel}>Places</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>₹{parseFloat(trip.budget) >= 1000 ? (parseFloat(trip.budget)/1000).toFixed(1) + 'K' : trip.budget}</Text>
              <Text style={styles.statLabel}>Budget</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: SIZES.fontLg,
    fontWeight: '800',
    color: COLORS.text,
  },
  shareButton: {
    padding: 4,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  heroCard: {
    height: 150,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusLg,
    marginBottom: SPACING.xl,
    justifyContent: 'flex-end',
    padding: SPACING.lg,
    overflow: 'hidden',
  },
  heroDest: {
    color: COLORS.white,
    fontSize: SIZES.fontXl,
    fontWeight: '900',
  },
  heroDate: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: SIZES.fontMd,
  },
  menuGrid: {
    gap: SPACING.md,
  },
  menuCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: SIZES.radiusLg,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: SIZES.radiusMd,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.lg,
  },
  menuTitle: {
    fontSize: SIZES.fontMd,
    fontWeight: '800',
    color: COLORS.text,
  },
  menuDesc: {
    fontSize: SIZES.fontSm,
    color: COLORS.textLight,
  },
  statsSection: {
    marginTop: SPACING.xl,
  },
  sectionTitle: {
    fontSize: SIZES.fontLg,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: SIZES.radiusMd,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statVal: {
    fontSize: SIZES.fontLg,
    fontWeight: '900',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: SIZES.fontSm - 2,
    color: COLORS.textLight,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});

export default TripDetailsScreen;
