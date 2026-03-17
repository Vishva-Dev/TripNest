import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, SPACING, SIZES } from '../theme';
import { Card, Button } from '../components/Common';
import { ChevronLeft, Plus, DollarSign, PieChart, TrendingUp } from 'lucide-react-native';

const BudgetScreen = ({ navigation }) => {
  const [totalBudget, setTotalBudget] = useState(50000);
  const [spent, setSpent] = useState(16500);

  const expenses = [
    { id: '1', category: 'Flights', amount: 10000, date: '2026-07-01' },
    { id: '2', category: 'Hotel', amount: 4500, date: '2026-07-02' },
    { id: '3', category: 'Food', amount: 2000, date: '2026-07-02' },
  ];

  const remaining = totalBudget - spent;
  const spentPercentage = (spent / totalBudget) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={COLORS.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Budget Tracker</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <View>
              <Text style={styles.summaryLabel}>Total Remaining</Text>
              <Text style={styles.remainingAmount}>₹{remaining.toLocaleString()}</Text>
            </View>
            <View style={styles.iconCircle}>
              <TrendingUp color={COLORS.white} size={24} />
            </View>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${spentPercentage}%` }]} />
          </View>

          <View style={styles.summaryFooter}>
            <View>
              <Text style={styles.footerLabel}>Spent</Text>
              <Text style={[styles.footerValue, { color: COLORS.error }]}>₹{spent.toLocaleString()}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.footerLabel}>Budget</Text>
              <Text style={styles.footerValue}>₹{totalBudget.toLocaleString()}</Text>
            </View>
          </View>
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Expenses</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {expenses.map((expense) => (
          <Card key={expense.id} style={styles.expenseCard}>
            <View style={styles.expenseInfo}>
              <View style={styles.categoryIcon}>
                <DollarSign size={20} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.expenseCategory}>{expense.category}</Text>
                <Text style={styles.expenseDate}>{expense.date}</Text>
              </View>
            </View>
            <Text style={styles.expenseAmount}>- ₹{expense.amount.toLocaleString()}</Text>
          </Card>
        ))}

        <Button 
          title="Add New Expense" 
          onPress={() => {}} 
          style={styles.addButton}
          variant="outline"
        />
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
  summaryCard: {
    backgroundColor: COLORS.primary,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.xl,
  },
  summaryLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: SIZES.fontSm,
  },
  remainingAmount: {
    color: COLORS.white,
    fontSize: SIZES.font2Xl,
    fontWeight: '900',
    marginTop: 4,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    marginBottom: SPACING.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.accent,
    borderRadius: 4,
  },
  summaryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: SIZES.fontSm - 2,
    marginBottom: 2,
  },
  footerValue: {
    color: COLORS.white,
    fontSize: SIZES.fontMd,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: SIZES.fontLg,
    fontWeight: '700',
    color: COLORS.text,
  },
  seeAll: {
    fontSize: SIZES.fontSm,
    color: COLORS.primary,
    fontWeight: '600',
  },
  expenseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    paddingVertical: SPACING.md,
  },
  expenseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  expenseCategory: {
    fontSize: SIZES.fontMd,
    fontWeight: '700',
    color: COLORS.text,
  },
  expenseDate: {
    fontSize: SIZES.fontSm - 2,
    color: COLORS.textLight,
  },
  expenseAmount: {
    fontSize: SIZES.fontMd,
    fontWeight: '700',
    color: COLORS.text,
  },
  addButton: {
    marginTop: SPACING.lg,
  },
});

export default BudgetScreen;
