import React, { useState, useContext } from 'react';
import 'bulma/css/bulma.min.css';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const SignUpPage = () => {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const validatePassword = (password) => password.length >= 6;

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
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Prenom: prenom,
          Nom: nom,
          Email: email,
          password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Signup failed. Try again.');
        setLoading(false);
        return;
      }

      // Store pending info to verify
      localStorage.setItem("pendingEmail", email);
      localStorage.setItem("pendingToken", data.otpToken); // used for verifying

      navigate('/verify-email');
    } catch (err) {
      setError('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  return (
    <section className="section" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, sans-serif", padding: '0 40px' }}>
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-8" style={{ textAlign: 'center', margin: '0 auto' }}>
            <h1 style={{ fontSize: '30px', fontWeight: '400', color: 'black', marginBottom: '20px' }}>
              Sign up for an account
            </h1>

            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              border: "1px solid #ccc",
              maxWidth: '400px',
              margin: '0 auto',
              textAlign: 'left'
            }}>
              <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'black', marginBottom: '5px' }}>Sign Up</h2>
              <p style={{ fontSize: '14px', color: '#6a6a6a', marginBottom: '20px' }}>
                Fill in your credentials to sign up.
              </p>

              {error && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>{error}</p>}

              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter your first name"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter your last name"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control" style={{ position: 'relative' }}>
                  <input
                    className="input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: '40px' }}
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
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  </span>
                </div>
              </div>

              <div className="field" style={{ marginBottom: '15px' }}>
                <label className="checkbox" style={{ fontSize: "14px", color: "#6a6a6a" }}>
                  <input
                    type="checkbox"
                    checked={keepSignedIn}
                    onChange={() => setKeepSignedIn(!keepSignedIn)}
                    style={{ marginRight: "10px" }}
                  />
                  Keep me signed in
                </label>
              </div>

              <button
                className="button"
                style={{
                  backgroundColor: '#e04c2c',
                  color: 'white',
                  width: '100%',
                  padding: '10px',
                  fontSize: '14px',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#c83b15'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#e04c2c'; }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Accept and Sign Up'}
              </button>

              <p style={{ fontSize: "14px", color: "black", textAlign: "center", marginTop: "10px" }}>
                Already have an account?{" "}
                <a href="/signin" style={{ color: "#e04c2c", fontWeight: "600" }}>
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
