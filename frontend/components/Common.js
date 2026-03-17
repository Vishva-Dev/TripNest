import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';
import { COLORS, SPACING, SIZES } from '../theme';

export const Button = ({ title, onPress, variant = 'primary', style, textStyle }) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return { backgroundColor: COLORS.secondary };
      case 'outline':
        return { backgroundColor: 'transparent', borderWidth: 1, borderColor: COLORS.primary };
      default:
        return { backgroundColor: COLORS.primary };
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return { color: COLORS.primary };
      default:
        return { color: COLORS.white };
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.button, getButtonStyle(), style]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

import { useState } from 'react';

export const Input = ({ placeholder, value, onChangeText, secureTextEntry, style, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{placeholder}</Text>
      <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
        <TextInput 
          style={[styles.input, Platform.OS === 'web' ? { outlineStyle: 'none' } : {}]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={COLORS.textLight}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: SIZES.radiusMd,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: SIZES.fontMd,
    fontWeight: '700',
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
  inputContainer: {
    marginBottom: SPACING.md,
    width: '100%',
  },
  label: {
    fontSize: SIZES.fontSm,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
    marginLeft: SPACING.xs,
  },
  inputWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  inputWrapperFocused: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    fontSize: SIZES.fontMd,
    color: COLORS.text,
    borderWidth: 0,
    width: '100%',
    backgroundColor: 'transparent',
  },
});
