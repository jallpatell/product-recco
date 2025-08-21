// App.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Linking,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AIProductAdvisor from './src/AIProductAdvisor';

const { width } = Dimensions.get('window');
const Stack = createNativeStackNavigator();

// ----------------- Landing Page -----------------
const LandingApp = ({ navigation }) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScrollAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hero animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Logo carousel animation
    const logoAnimation = () => {
      logoScrollAnim.setValue(0);
      Animated.timing(logoScrollAnim, {
        toValue: -width,
        duration: 15000,
        useNativeDriver: true,
      }).start(() => logoAnimation());
    };
    logoAnimation();
  }, []);

  // Navigation Bar
  const Navigation = () => (
    <View style={styles.navigation}>
      <View style={styles.navContainer}>
        <Text style={styles.logo}>Product Recco</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Hero Section
  const HeroSection = () => (
    <Animated.View
      style={[
        styles.heroSection,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}>
      <View style={styles.heroContent}>
        <Text style={styles.heroTitle}>
          <Text style={styles.heroTitleGray}>Find the products{'\n'}</Text>
          <Text style={styles.heroTitleWhite}>Swiftly with LLM-Power</Text>
        </Text>
        <Text style={styles.heroDescription}>
          Experience seamless product hunt with required features & human-like
          analytics.
        </Text>
        <View style={styles.heroButtons}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('AIProductAdvisor')} // Navigate to AIProductAdvisor
          >
            <Text style={styles.primaryButtonText}>Find your Product</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.heroImageContainer}>
        <Image
          source={require('./src/assets/tech_gadgets.jpg')}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>
    </Animated.View>
  );

  // Logo Carousel
  const LogoCarousel = () => (
    <View style={styles.logoCarousel}>
      <Animated.View
        style={[
          styles.logoContainer,
          { transform: [{ translateX: logoScrollAnim }] },
        ]}>
        {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((item, index) => (
          <Image
            key={index}
            source={{
              uri: `https://750e733b-8bd5-471c-8abe-e1df3ebe6f23.lovableproject.com/lovable-uploads/5830bd79-3511-41dc-af6c-8db32d91fc2c.png`,
            }}
            style={styles.logoImage}
            resizeMode="contain"
          />
        ))}
      </Animated.View>
    </View>
  );

  // Footer
  const Footer = () => (
    <View style={styles.footer}>
      <View style={styles.socialLinks}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.linkedin.com/in/jallpatell')
          }
          style={styles.socialIcon}>
          <Image
            source={require('./src/assets/linkedin_logo.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://github.com/jallpatell')}
          style={styles.socialIconGit}>
          <Image
            source={require('./src/assets/github_logo.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0ea5e9" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Navigation />
        <HeroSection />
        <LogoCarousel />
        <Footer />
      </ScrollView>
    </View>
  );
};

// ----------------- Main App with Navigation -----------------
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="Home" component={ LandingApp } />
        <Stack.Screen name="AIProductAdvisor" component={AIProductAdvisor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ----------------- Styles -----------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ebf8ff' }, // Light sky blue background
  scrollView: { flex: 1 },

  // Navigation
  navigation: {
    marginTop: 5,
    marginLeft: 7,
    marginRight: 7,
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#fed7d7', // Light peach
    borderWidth: 1,
    borderColor: '#feb2b2', // Peach border
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: { 
    fontSize: 24, 
    color: '#2a4365', // Dark blue text
    fontWeight: '700',
    fontFamily: 'System',
  },
  menuButton: { padding: 2 },
  menuText: {
    fontSize: 17,
    fontFamily: 'System',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#3182ce', // Sky blue
    color: '#fff',
    fontWeight: '500',
  },

  // Hero Section
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: '#ebf8ff', // Light sky blue
  },
  heroContent: { marginBottom: 40 },
  heroTitle: {
    fontSize: 48,
    fontWeight: '400',
    marginBottom: 24,
    lineHeight: 56,
  },
  heroTitleGray: { 
    color: '#3182ce', // Sky blue
    fontFamily: 'System',
    fontWeight: '300',
  },
  heroTitleWhite: { 
    color: '#2a4365', // Dark blue
    fontWeight: '600', 
    fontFamily: 'System',
  },
  heroDescription: {
    fontSize: 18,
    color: '#4a5568', // Grayish-blue
    lineHeight: 28,
    marginBottom: 32,
    fontFamily: 'System',
    fontWeight: '300',
  },
  heroButtons: { gap: 16 },
  primaryButton: {
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#3182ce', // Sky blue
    padding: 16,
    borderWidth: 1,
    borderColor: '#2b6cb0', // Darker sky blue
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '600',
  },
  heroImageContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#bee3f8', // Light sky blue
    borderWidth: 1,
    borderColor: '#90cdf4', // Medium sky blue
  },
  heroImage: { width: '100%', height: 500 },

  // Logo Carousel
  logoCarousel: {
    height: 80,
    backgroundColor: '#bee3f8', // Light sky blue
    justifyContent: 'center',
    overflow: 'hidden',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#90cdf4', // Medium sky blue
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoImage: { 
    width: 120, 
    height: 32, 
    marginHorizontal: 32, 
    opacity: 0.8,
    tintColor: '#2a4365', // Dark blue tint
  },

  // Footer
  footer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fed7d7', // Light peach
    borderTopWidth: 1,
    borderColor: '#feb2b2', // Peach border
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },

  iconImage: { 
    width: 30, 
    height: 30,
 // White icons
  },
});