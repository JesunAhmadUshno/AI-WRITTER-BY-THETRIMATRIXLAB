import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeft, Mail, RotateCw } from 'lucide-react';

const VerificationPage = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [email, setEmail] = useState('');
  
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    // Get email from pending user data
    const pendingUser = localStorage.getItem('pendingUser');
    if (pendingUser) {
      const userData = JSON.parse(pendingUser);
      setEmail(userData.email);
    } else {
      // Redirect to signup if no pending user
      navigate('/signup');
    }
  }, [navigate]);

  useEffect(() => {
    // Countdown timer for resend button
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Auto-submit when all fields are filled
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      handleVerify(newCode.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const pastedArray = pastedData.split('');
    
    const newCode = [...code];
    pastedArray.forEach((char, index) => {
      if (index < 6) {
        newCode[index] = char;
      }
    });
    
    setCode(newCode);
    
    // Focus the next empty field or the last field
    const nextEmptyIndex = newCode.findIndex(digit => digit === '');
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 5;
    inputRefs.current[focusIndex].focus();
  };

  const handleVerify = async (verificationCode = code.join('')) => {
    if (verificationCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    const result = await verifyEmail(verificationCode);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    setError('');
    
    // Mock resend functionality
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setResendLoading(false);
    setResendCooldown(60); // 60 second cooldown
    
    // Clear current code
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0].focus();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Back to signup */}
        <Link 
          to="/signup" 
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
          Back to Sign Up
        </Link>

        <div className="voice-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              background: 'var(--accent-purple-200)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 1.5rem' 
            }}>
              <Mail size={28} style={{ color: 'var(--accent-purple-400)' }} />
            </div>
            
            <h1 className="heading-1" style={{ marginBottom: '0.5rem' }}>Check Your Email</h1>
            <p className="body-medium" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              We've sent a 6-digit verification code to
            </p>
            <p className="body-medium" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              {email}
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label className="body-medium" style={{ display: 'block', marginBottom: '1rem', fontWeight: 500 }}>
              Enter Verification Code
            </label>
            
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  style={{
                    width: '48px',
                    height: '48px',
                    border: '2px solid var(--border-input)',
                    borderRadius: '0.5rem',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    textAlign: 'center',
                    background: 'var(--bg-card)',
                    transition: 'border-color 0.2s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--border-input-focus)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-input)';
                  }}
                />
              ))}
            </div>
          </div>

          {error && (
            <div style={{ 
              padding: '0.75rem', 
              background: '#FEF2F2', 
              border: '1px solid #FECACA', 
              borderRadius: '0.5rem',
              color: '#DC2626',
              marginBottom: '1.5rem'
            }}>
              <p className="body-small" style={{ margin: 0 }}>{error}</p>
            </div>
          )}

          <button 
            onClick={() => handleVerify()}
            disabled={loading || code.some(digit => digit === '')}
            className="btn-primary" 
            style={{ 
              width: '100%',
              marginBottom: '1.5rem',
              opacity: (loading || code.some(digit => digit === '')) ? 0.7 : 1,
              cursor: (loading || code.some(digit => digit === '')) ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <p className="body-small" style={{ color: 'var(--text-muted)', margin: 0 }}>
              Didn't receive the code?
            </p>
            
            <button
              onClick={handleResendCode}
              disabled={resendLoading || resendCooldown > 0}
              className="btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: (resendLoading || resendCooldown > 0) ? 0.7 : 1,
                cursor: (resendLoading || resendCooldown > 0) ? 'not-allowed' : 'pointer'
              }}
            >
              <RotateCw size={16} style={{ animation: resendLoading ? 'spin 1s linear infinite' : 'none' }} />
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : resendLoading ? 'Sending...' : 'Resend Code'}
            </button>
          </div>

          <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--accent-blue-200)', borderRadius: '0.5rem' }}>
            <p className="caption" style={{ margin: 0, color: 'var(--text-primary)' }}>
              💡 Demo: Use code <strong>123456</strong> to verify your account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;