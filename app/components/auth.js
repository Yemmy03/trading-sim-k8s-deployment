// auth.js
import { auth, db } from './firebase.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

// Sign up new user
export const signUp = async (email, password, displayName) => {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile with display name
    await updateProfile(user, {
      displayName: displayName
    });
    
    // Save user data to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      createdAt: new Date(),
      lastLogin: new Date(),
      preferences: {
        theme: 'light',
        notifications: true,
        tradingExperience: 'beginner'
      },
      profile: {
        firstName: '',
        lastName: '',
        phone: '',
        country: 'Nigeria'
      },
      tradingStats: {
        totalTrades: 0,
        winRate: 0,
        balance: 10000, // Starting balance for simulator
        profit: 0
      }
    });
    
    console.log('User created successfully:', user.uid);
    return { success: true, user };
    
  } catch (error) {
    console.error('Error signing up:', error);
    return { success: false, error: error.message };
  }
};

// Sign in existing user
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update last login time
    await updateDoc(doc(db, 'users', user.uid), {
      lastLogin: new Date()
    });
    
    console.log('User signed in successfully:', user.uid);
    return { success: true, user };
    
  } catch (error) {
    console.error('Error signing in:', error);
    return { success: false, error: error.message };
  }
};

// Sign out user
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error: error.message };
  }
};

// Get current user data from Firestore
export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() };
    } else {
      return { success: false, error: 'User data not found' };
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    return { success: false, error: error.message };
  }
};

// Update user profile
export const updateUserProfile = async (uid, updates) => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      ...updates,
      updatedAt: new Date()
    });
    console.log('User profile updated successfully');
    return { success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false, error: error.message };
  }
};

// Listen for authentication state changes
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Get current authenticated user
export const getCurrentUser = () => {
  return auth.currentUser;
};