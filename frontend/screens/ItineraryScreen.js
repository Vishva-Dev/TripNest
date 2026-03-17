import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS, SPACING, SIZES } from '../theme';
import { Card } from '../components/Common';
import { ChevronLeft, Plus, Clock, MapPin, MoreVertical } from 'lucide-react-native';

const ItineraryScreen = ({ navigation, route }) => {
  const [selectedDay, setSelectedDay] = useState(1);
  const days = [1, 2, 3, 4, 5];

  // Demo data for activities
  const activities = {
    1: [
      { id: '1', time: '10:00 AM', title: 'Airport Arrival', location: 'Denpasar Airport', cost: '₹0' },
      { id: '2', time: '12:30 PM', title: 'Hotel Check-in', location: 'Ubud Resort', cost: '₹0' },
      { id: '3', time: '04:00 PM', title: 'Local Market Visit', location: 'Ubud Center', cost: '₹500' },
    ],
    2: [
      { id: '4', time: '09:00 AM', title: 'Beach Visit', location: 'Seminyak Beach', cost: '₹0' },
      { id: '5', time: '01:00 PM', title: 'Scuba Diving', location: 'Blue Lagoon', cost: '₹5000' },
    ]
  };

  const currentActivities = activities[selectedDay] || [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={COLORS.text} size={24} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Bali Trip</Text>
          <Text style={styles.subtitle}>Itinerary Planner</Text>
        </View>
      </View>

      <View style={styles.daySelectorContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daySelector}>
          {days.map((day) => (
            <TouchableOpacity 
              key={day} 
              style={[styles.dayTab, selectedDay === day && styles.activeDayTab]}
              onPress={() => setSelectedDay(day)}
            >
              <Text style={[styles.dayTabText, selectedDay === day && styles.activeDayTabText]}>Day {day}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {currentActivities.length > 0 ? (
          currentActivities.map((activity) => (
            <View key={activity.id} style={styles.activityRow}>
              <View style={styles.timeColumn}>
                <Text style={styles.timeText}>{activity.time}</Text>
                <View style={styles.timelinePoint} />
                <View style={styles.timelineLine} />
              </View>
              
              <Card style={styles.activityCard}>
                <View style={styles.activityHeader}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <TouchableOpacity>
                    <MoreVertical size={18} color={COLORS.textLight} />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.activityDetails}>
                  <View style={styles.detailItem}>
                    <MapPin size={14} color={COLORS.textLight} />
                    <Text style={styles.detailText}>{activity.location}</Text>
                  </View>
                  <Text style={styles.costText}>{activity.cost}</Text>
                </View>
              </Card>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No activities planned for Day {selectedDay}</Text>
            <TouchableOpacity style={styles.addActivityButton}>
              <Plus color={COLORS.primary} size={20} />
              <Text style={styles.addActivityText}>Add Activity</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Plus color={COLORS.white} size={28} />
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
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  backButton: {
    marginRight: SPACING.md,
  },
  title: {
    fontSize: SIZES.fontLg,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: SIZES.fontSm,
    color: COLORS.textLight,
  },
  daySelectorContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  daySelector: {
    paddingHorizontal: SPACING.lg,
  },
  dayTab: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    borderRadius: SIZES.radiusSm,
    backgroundColor: COLORS.background,
  },
  activeDayTab: {
    backgroundColor: COLORS.primary,
  },
  dayTabText: {
    fontSize: SIZES.fontSm,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  activeDayTabText: {
    color: COLORS.white,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: 100,
  },
  activityRow: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  timeColumn: {
    width: 70,
    alignItems: 'center',
    paddingTop: SPACING.sm,
  },
  timeText: {
    fontSize: SIZES.fontSm - 2,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  timelinePoint: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    zIndex: 1,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.border,
    marginTop: -2,
  },
  activityCard: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  activityTitle: {
    fontSize: SIZES.fontMd,
    fontWeight: '700',
    color: COLORS.text,
  },
  activityDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: SIZES.fontSm,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  costText: {
    fontSize: SIZES.fontSm,
    fontWeight: '700',
    color: COLORS.accent,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: COLORS.textLight,
    fontSize: SIZES.fontMd,
    marginBottom: SPACING.md,
  },
  addActivityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
  },
  addActivityText: {
    color: COLORS.primary,
    fontWeight: '700',
    marginLeft: SPACING.xs,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
});

export default ItineraryScreen;
