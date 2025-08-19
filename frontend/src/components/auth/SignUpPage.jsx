import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Check } from 'lucide-react';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const { signUp, signInWithGoogle, signInWithTwitter } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!agreeToTerms) {
      setError('Please agree to the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);
    const result = await signUp(formData.email, formData.password, formData.name);
    
    if (result.success && result.needsVerification) {
      navigate('/verify');
    } else if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    const result = await signInWithGoogle();
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleTwitterSignUp = async () => {
    setLoading(true);
    const result = await signInWithTwitter();
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    let strength = 0;
    
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
  };

  const getPasswordStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength <= 1) return '#EF4444';
    if (strength <= 2) return '#F59E0B';
    if (strength <= 3) return '#10B981';
    return '#059669';
  };

  const getPasswordStrengthText = () => {
    const strength = getPasswordStrength();
    if (strength <= 1) return 'Weak';
    if (strength <= 2) return 'Fair';
    if (strength <= 3) return 'Good';
    return 'Strong';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Back to home */}
        <Link 
          to="/" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: 'var(--text-muted)', 
            textDecoration: 'none', 
            marginBottom: '2rem',
            transition: 'color 0.2s ease'
          }}
          className="body-medium"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="voice-card" style={{ padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 className="heading-1" style={{ marginBottom: '0.5rem' }}>Create Account</h1>
            <p className="body-medium" style={{ color: 'var(--text-muted)' }}>
              Join TheTrimatrixLab and start writing with AI
            </p>
          </div>

          {/* Social Sign Up */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <button 
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="btn-secondary" 
              style={{ 
                width: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.75rem',
                padding: '0.875rem'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>

            <button 
              onClick={handleTwitterSignUp}
              disabled={loading}
              className="btn-secondary" 
              style={{ 
                width: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.75rem',
                padding: '0.875rem'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1DA1F2">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Sign up with X
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }}></div>
            <span className="body-small" style={{ color: 'var(--text-muted)' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }}></div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label className="body-medium" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem 0.875rem 3rem',
                    border: '1px solid var(--border-input)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    background: 'var(--bg-card)',
                    transition: 'border-color 0.2s ease'
                  }}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="body-medium" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem 0.875rem 3rem',
                    border: '1px solid var(--border-input)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    background: 'var(--bg-card)',
                    transition: 'border-color 0.2s ease'
                  }}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="body-medium" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.875rem 3rem 0.875rem 3rem',
                    border: '1px solid var(--border-input)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    background: 'var(--bg-card)',
                    transition: 'border-color 0.2s ease'
                  }}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ 
                    position: 'absolute', 
                    right: '1rem', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    background: 'none', 
                    border: 'none', 
                    color: 'var(--text-muted)', 
                    cursor: 'pointer' 
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.password && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span className="caption">Password strength:</span>
                    <span className="caption" style={{ color: getPasswordStrengthColor(), fontWeight: 500 }}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div style={{ height: '4px', background: 'var(--border-light)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        background: getPasswordStrengthColor(), 
                        width: `${(getPasswordStrength() / 4) * 100}%`,
                        transition: 'width 0.2s ease'
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="body-medium" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.875rem 3rem 0.875rem 3rem',
                    border: '1px solid var(--border-input)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    background: 'var(--bg-card)',
                    transition: 'border-color 0.2s ease'
                  }}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ 
                    position: 'absolute', 
                    right: '1rem', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    background: 'none', 
                    border: 'none', 
                    color: 'var(--text-muted)', 
                    cursor: 'pointer' 
                  }}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setAgreeToTerms(!agreeToTerms)}
                style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid var(--border-input)',
                  borderRadius: '4px',
                  background: agreeToTerms ? 'var(--text-primary)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  marginTop: '2px'
                }}
              >
                {agreeToTerms && <Check size={12} color="white" />}
              </button>
              <p className="body-small" style={{ margin: 0, lineHeight: 1.4 }}>
                I agree to the{' '}
                <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Terms of Service</a>
                {' '}and{' '}
                <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Privacy Policy</a>
              </p>
            </div>

            {error && (
              <div style={{ 
                padding: '0.75rem', 
                background: '#FEF2F2', 
                border: '1px solid #FECACA', 
                borderRadius: '0.5rem',
                color: '#DC2626'
              }}>
                <p className="body-small" style={{ margin: 0 }}>{error}</p>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary" 
              style={{ 
                width: '100%',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p className="body-small" style={{ color: 'var(--text-muted)' }}>
              Already have an account?{' '}
              <Link to="/signin" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;