// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Dashboard from './DashBoard';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import UserManagement from './UserManagement';
import SignIn from './SignIn';
import Login from './Login';
import Logout from './Logout';
import './App.css';
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from './LocalStorageHelper';

function App() {
  const [user, setUser] = useState(getFromLocalStorage('currentUser'));
  const [isSignUp, setIsSignUp] = useState(false);

  // Check for current user in local storage on initial load
  useEffect(() => {
    const currentUser = getFromLocalStorage('currentUser');
    setUser(currentUser);
  }, []);

  const handleSignIn = () => {
    setIsSignUp(false); // Switch to Login after signing up
  };

  const handleLogin = (loggedInUser) => {
    saveToLocalStorage('currentUser', loggedInUser);
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    removeFromLocalStorage('currentUser');
  };

  const goToSignUp = () => {
    setIsSignUp(true);
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Streamline The Wings Stock Inventory System</h1>
        </header>

        {!user ? (
          <div>
            {isSignUp ? (
              <SignIn onSignIn={handleSignIn} />
            ) : (
              <Login onLogin={handleLogin} goToSignUp={goToSignUp} />
            )}
          </div>
        ) : (
          <div>
            <Logout onLogout={handleLogout} />
            <nav>
              <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/product-form">Add Product</Link></li>
                <li><Link to="/product-list">Product List</Link></li>
                <li><Link to="/user-management">User Management</Link></li>
              </ul>
            </nav>

            <div className="main-content">
              <Routes>
                <Route path="/" element={user ? <Dashboard /> : <Navigate to="/" />} />
                <Route path="/product-form" element={user ? <ProductForm /> : <Navigate to="/" />} />
                <Route path="/product-list" element={user ? <ProductList /> : <Navigate to="/" />} />
                <Route path="/user-management" element={user ? <UserManagement /> : <Navigate to="/" />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
