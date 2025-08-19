import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data on app start
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    try {
      // Mock authentication - replace with real API call
      if (email && password) {
        const userData = {
          id: '1',
          email: email,
          name: email.split('@')[0],
          plan: 'free',
          wordsUsed: 150,
          wordsLimit: 500,
          joinedDate: new Date().toISOString()
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signUp = async (email, password, name) => {
    try {
      // Mock registration - replace with real API call
      const userData = {
        id: Date.now().toString(),
        email: email,
        name: name,
        plan: 'free',
        wordsUsed: 0,
        wordsLimit: 500,
        joinedDate: new Date().toISOString(),
        verified: false
      };
      
      // Store temporary user data for verification
      localStorage.setItem('pendingUser', JSON.stringify(userData));
      return { success: true, needsVerification: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const verifyEmail = async (code) => {
    try {
      // Mock verification - replace with real API call
      if (code === '123456') {
        const pendingUser = JSON.parse(localStorage.getItem('pendingUser'));
        const verifiedUser = { ...pendingUser, verified: true };
        
        setUser(verifiedUser);
        localStorage.setItem('user', JSON.stringify(verifiedUser));
        localStorage.removeItem('pendingUser');
        return { success: true };
      }
      throw new Error('Invalid verification code');
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Mock Google OAuth - replace with real implementation
      const userData = {
        id: 'google_' + Date.now(),
        email: 'user@gmail.com',
        name: 'Google User',
        plan: 'free',
        wordsUsed: 0,
        wordsLimit: 500,
        joinedDate: new Date().toISOString(),
        verified: true,
        provider: 'google'
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signInWithTwitter = async () => {
    try {
      // Mock Twitter OAuth - replace with real implementation
      const userData = {
        id: 'twitter_' + Date.now(),
        email: 'user@twitter.com',
        name: 'Twitter User',
        plan: 'free',
        wordsUsed: 0,
        wordsLimit: 500,
        joinedDate: new Date().toISOString(),
        verified: true,
        provider: 'twitter'
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('pendingUser');
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    verifyEmail,
    signInWithGoogle,
    signInWithTwitter,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};