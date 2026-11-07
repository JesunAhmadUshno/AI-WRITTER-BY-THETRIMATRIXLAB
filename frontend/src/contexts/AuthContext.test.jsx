import React from 'react';
import { render, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

let auth;
const Grab = () => { auth = useAuth(); return null; };

beforeEach(() => localStorage.clear());

// ProtectedRoute (components/auth/ProtectedRoute.jsx) only lets a user with verified === true reach /dashboard.
test('email/password sign-in yields a user ProtectedRoute admits', async () => {
  render(<AuthProvider><Grab /></AuthProvider>);
  let result;
  await act(async () => { result = await auth.signIn('a@b.com', 'pw'); });
  expect(result.success).toBe(true);
  expect(auth.user.verified).toBe(true);
  expect(JSON.parse(localStorage.getItem('user')).verified).toBe(true);
});
