import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image, useWindowDimensions } from 'react-native';
import { COLORS, SPACING, SIZES } from '../theme';
import { Input, Button } from '../components/Common';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        navigation.replace('Dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={[styles.layout, isLargeScreen ? styles.layoutLarge : styles.layoutSmall]}>
        
        <View style={[styles.imageSection, isLargeScreen ? styles.imageSectionLarge : styles.imageSectionSmall]}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop' }} 
            style={styles.heroImage} 
          />
          <View style={[styles.imageOverlay, !isLargeScreen && styles.imageOverlaySmall]}>
            <View style={[styles.branding, !isLargeScreen && styles.brandingSmall]}>
              <View style={styles.logoRow}>
                <View style={styles.whiteLogoPlaceholder}><Text style={styles.whiteLogoText}>TN</Text></View>
                <Text style={isLargeScreen ? styles.brandTitle : styles.brandTitleSmall}>TripNest</Text>
              </View>
              {isLargeScreen && (
                <Text style={styles.brandSubtitle}>Plan less. Experience more. Discover your next extraordinary adventure with our smart itinerary maker.</Text>
              )}
            </View>
          </View>
        </View>
        
        <View style={[styles.formSection, isLargeScreen ? styles.formSectionLarge : styles.formSectionSmall]}>
          <ScrollView contentContainerStyle={[styles.scrollContent, !isLargeScreen && styles.scrollContentSmall]} showsVerticalScrollIndicator={false}>
            <View style={[styles.formWrapper, !isLargeScreen && styles.floatingModal]}>
              
              <View style={styles.header}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Please enter your details to sign in.</Text>
              </View>

              <View style={styles.inputGroup}>
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
              
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              <Button 
                title={loading ? "Signing in..." : "Sign In"} 
                onPress={handleLogin}
                style={styles.submitButton}
              />

              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text style={styles.linkText}>Sign up for free</Text>
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
  container: { flex: 1, backgroundColor: '#f8fafc' },
  layout: { flex: 1 },
  layoutLarge: { flexDirection: 'row' },
  layoutSmall: { flexDirection: 'column' },
  
  imageSection: { position: 'relative', backgroundColor: COLORS.primaryDark },
  imageSectionLarge: { flex: 1.2 },
  imageSectionSmall: { width: '100%', height: 280 },
  
  heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30, 64, 175, 0.4)',
    justifyContent: 'flex-end',
    padding: 60,
  },
  imageOverlaySmall: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  brandingFixed: { alignItems: 'center' },
  branding: { maxWidth: 500 },
  brandingSmall: { alignItems: 'center', marginTop: -20 },
  logoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  whiteLogoPlaceholder: { width: 44, height: 44, borderRadius: 12, backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center', marginRight: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  whiteLogoText: { color: COLORS.primary, fontSize: 18, fontWeight: '900' },
  brandTitle: { color: COLORS.white, fontSize: 44, fontWeight: '800', textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 },
  brandTitleSmall: { color: COLORS.white, fontSize: 32, fontWeight: '800', textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 10 },
  brandSubtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 18, lineHeight: 28, fontWeight: '500', textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 5 },
  
  formSection: { flex: 1 },
  formSectionLarge: { backgroundColor: COLORS.white },
  formSectionSmall: { backgroundColor: 'transparent', marginTop: -60 },
  
  scrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.lg },
  scrollContentSmall: { justifyContent: 'flex-start' },
  
  formWrapper: { width: '100%', maxWidth: 400 },
  floatingModal: {
    backgroundColor: COLORS.white,
    padding: 32,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  
  header: { marginBottom: 32 },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.text, marginBottom: 8, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: COLORS.textLight, fontWeight: '500' },
  inputGroup: { marginBottom: 10 },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: 32 },
  forgotText: { color: COLORS.primary, fontSize: 14, fontWeight: '600' },
  submitButton: { paddingVertical: 16, borderRadius: 12 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 32 },
  footerText: { color: COLORS.textLight, fontSize: 14 },
  linkText: { color: COLORS.primary, fontSize: 14, fontWeight: '700' },
});

export default LoginScreen;
