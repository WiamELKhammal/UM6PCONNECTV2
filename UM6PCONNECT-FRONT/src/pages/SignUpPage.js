import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.min.css';
import { EyeOutlined, EyeInvisibleOutlined, } from '@ant-design/icons';
import { auth } from '../firebase'; // Import auth from firebase.js
import {onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';  // Correct import of useNavigate
import { useContext } from 'react';
import { UserContext } from '../context/UserContext'; // Ajuste le chemin si nécessaire

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [fullname, setfullname] = useState('');

  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const navigate = useNavigate();  // Initialize useNavigate
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set logged-in user
        navigate('/LandingPage2');  // Redirect to dashboard if logged in

      } else {
        setUser(null);  // Set to null if no user is logged in
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [navigate]);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlefullnameChange = (e) => setfullname(e.target.value);


  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRememberMeChange = () => setRememberMe(!rememberMe);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleKeepSignedIn = () => setKeepSignedIn(!keepSignedIn);

  const validatePassword = (password) => {
    return password.length >= 6; // Minimum 6 characters
  };



  const handleError = (error) => {
    let errorMessage = '';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'This email is already in use.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password is too weak. Please use at least 6 characters.';
    } else {
      errorMessage = error.message;
    }
    return errorMessage;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }



    try {
      // Create user in Firebase and MongoDB (backend already handles Firebase creation)
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, email, password })
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      // Do not create the user in Firebase again, as it's already handled by backend


      console.log('User signed up and data saved:', data);
      setUser(data.user); // Met à jour le contexte avec les infos de l'utilisateur
      navigate('/dashboard');  // Redirige vers le dashboard

    } catch (err) {
      setError('Error: ' + err.message);
    }

    setLoading(false);
  };


  return (
    <section className="section" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, sans-serif", paddingLeft: '40px', paddingRight: '40px' }}>
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-8" style={{ textAlign: 'center', margin: '0 auto' }}>
            <h1 style={{ fontSize: '30px', fontWeight: '400', color: 'black', marginBottom: '20px' }}>
              Sign up for an account
            </h1>

            {/* White Box - Form Container */}
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: "1px solid #ccc", textAlign: 'left', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
              {/* Sign Up Title Inside Box */}
              <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'black', marginBottom: '5px' }}>Sign Up</h2>
              <p style={{ fontSize: '14px', color: '#6a6a6a', marginBottom: '20px' }}>Fill in your credentials to sign up.</p>

              {/* Email Field */}
              <div className="field">
                <label className="label" style={{ fontWeight: '500', fontSize: '14px' }}>Full Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="fullname"
                    placeholder="Enter your full name"
                    value={fullname}
                    onChange={handlefullnameChange}
                    style={{ fontSize: '14px', padding: '8px' }}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" style={{ fontWeight: '500', fontSize: '14px' }}>Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    style={{ fontSize: '14px', padding: '8px' }}
                  />
                </div>
              </div>

              {/* Telephone Field */}


              {/* Password Field with Show/Hide Toggle */}
              <div className="field">
                <label className="label" style={{ fontWeight: '500', fontSize: '14px' }}>Password</label>
                <div className="control" style={{ position: 'relative' }}>
                  <input
                    className="input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    style={{ fontSize: '14px', padding: '8px', paddingRight: '40px' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: '#6a6a6a',
                    }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  </span>
                </div>
              </div>

              {/* Keep me signed in */}
              <div className="field" style={{ marginBottom: "20px" }}>
                <div className="control">
                  <label className="checkbox" style={{ fontSize: "14px", color: "#6a6a6a" }}>
                    <input
                      type="checkbox"
                      checked={keepSignedIn}
                      onChange={toggleKeepSignedIn}
                      style={{ marginRight: "10px" }}
                    />
                    Keep me signed in
                  </label>
                </div>
              </div>

              {/* Error Message */}
              {error && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>{error}</p>}
              <p style={{ color: "#6a6a6a", fontSize: "12px", marginBottom: "15px", textAlign: "center" }}>
                By clicking accept, you agree to our{" "}
                <span style={{ color: "#d84b2b" }}>Terms of Use</span>,{" "}
                <span style={{ color: "#d84b2b" }}>Privacy Policy</span>, and{" "}
                <span style={{ color: "#d84b2b" }}>Cookie Policy</span>.
              </p>
              {/* Sign Up Button */}
              <button
                className="button"
                style={{
                  backgroundColor: '#d84b2b',
                  color: 'white',
                  width: '100%',
                  borderRadius: '30px',
                  padding: '10px',
                  fontSize: '14px',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#c83b15'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#d84b2b'; }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Accept and Sign Up'}
              </button>





              <p style={{ fontSize: "14px", color: "black", textAlign: "center", marginTop: "10px" }}>
                Already have an account?{" "}
                <a href="/signin" style={{ color: "#d84b2b", fontWeight: "600" }}>
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default SignUpPage;
