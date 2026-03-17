import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image, useWindowDimensions } from 'react-native';
import { COLORS, SPACING, SIZES } from '../theme';
import { Input, Button } from '../components/Common';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        navigation.replace('Dashboard');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={[styles.layout, isLargeScreen ? styles.layoutLarge : styles.layoutSmall]}>
        
        <View style={[styles.imageSection, isLargeScreen ? styles.imageSectionLarge : styles.imageSectionSmall]}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop' }} 
            style={styles.heroImage} 
          />
          <View style={[styles.imageOverlay, !isLargeScreen && styles.imageOverlaySmall]}>
            <View style={[styles.branding, !isLargeScreen && styles.brandingSmall]}>
              <View style={styles.logoRow}>
                <View style={styles.whiteLogoPlaceholder}><Text style={styles.whiteLogoText}>TN</Text></View>
                <Text style={isLargeScreen ? styles.brandTitle : styles.brandTitleSmall}>TripNest</Text>
              </View>
              {isLargeScreen && (
                <Text style={styles.brandSubtitle}>Turn your travel dreams into perfectly organized itineraries. Your next great memory starts here.</Text>
              )}
            </View>
          </View>
        </View>
        
        <View style={[styles.formSection, isLargeScreen ? styles.formSectionLarge : styles.formSectionSmall]}>
          <ScrollView contentContainerStyle={[styles.scrollContent, !isLargeScreen && styles.scrollContentSmall]} showsVerticalScrollIndicator={false}>
            <View style={styles.formWrapper}>

              <View style={styles.header}>
                <Text style={styles.title}>Create an account</Text>
                <Text style={styles.subtitle}>Start planning your trips for free.</Text>
              </View>

              <View style={styles.inputGroup}>
                <Input 
                  placeholder="Full Name" 
                  value={name} 
                  onChangeText={setName}
                  autoCapitalize="words"
                />
                <Input 
                  placeholder="Email Address" 
                  value={email} 
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Input 
                  placeholder="Password" 
                  value={password} 
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              
              <Button 
                title={loading ? "Creating Account..." : "Create Account"} 
                onPress={handleSignup}
                style={styles.submitButton}
              />

              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.linkText}>Log in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  layout: { flex: 1 },
  layoutLarge: { flexDirection: 'row-reverse' }, // Image on the right for signup
  layoutSmall: { flexDirection: 'column' },
  
  imageSection: { position: 'relative', backgroundColor: COLORS.primaryDark },
  imageSectionLarge: { flex: 1.2 },
  imageSectionSmall: { width: '100%', height: 320 },
  
  heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'flex-end',
    padding: 60,
  },
  imageOverlaySmall: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  
  branding: { maxWidth: 500 },
  brandingSmall: { alignItems: 'center' },
  logoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  whiteLogoPlaceholder: { width: 48, height: 48, borderRadius: 12, backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  whiteLogoText: { color: COLORS.primary, fontSize: 20, fontWeight: '900' },
  brandTitle: { color: COLORS.white, fontSize: 48, fontWeight: '800', textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 10 },
  brandTitleSmall: { color: COLORS.white, fontSize: 36, fontWeight: '800', textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 10 },
  brandSubtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 20, lineHeight: 30, fontWeight: '500', textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 5 },
  
  formSection: { backgroundColor: COLORS.white },
  formSectionLarge: { flex: 1 },
  formSectionSmall: { flex: 1, marginTop: -40, borderTopLeftRadius: 40, borderTopRightRadius: 40, overflow: 'hidden', elevation: 15, shadowColor: '#000', shadowOffset: { width: 0, height: -5 }, shadowOpacity: 0.1, shadowRadius: 10 },
  
  scrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.xl },
  scrollContentSmall: { justifyContent: 'flex-start', paddingTop: SPACING.xl * 1.5 },
  
  formWrapper: { width: '100%', maxWidth: 400 },
  
  header: { marginBottom: 32 },
  title: { fontSize: 32, fontWeight: '800', color: COLORS.text, marginBottom: 8, letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: COLORS.textLight, fontWeight: '500' },
  inputGroup: { marginBottom: 24 },
  submitButton: { paddingVertical: 16, borderRadius: 12 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 32 },
  footerText: { color: COLORS.textLight, fontSize: 15 },
  linkText: { color: COLORS.primary, fontSize: 15, fontWeight: '700' },
});

export default SignupScreen;
