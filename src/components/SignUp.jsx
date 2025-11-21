import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config.js';
import { useState } from "react";

export default function SignUp(){
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: formData.name });
      window.location.href = '/HomeUi';
      console.log('User created:', userCredential.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google sign-in successful:', result.user);
      window.location.href = '/HomeUi';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 col-xl-6">
          
          <div className="text-center mb-5 mt-4">
            <h1 className="display-5 fw-bold mb-5">Find Research in Your Area Easier. Faster. Smarter.</h1>
            <p className="lead text-muted">Discover the latest research and connect with experts near you</p>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h3 className="mb-4 text-center">Sign Up</h3>
            
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  onChange={handleChange}
                  value={formData.name}
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  onChange={handleChange}
                  value={formData.email}
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  onChange={handleChange}
                  value={formData.password}
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Create a password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-dark w-100 py-2 mb-2" disabled={loading}>
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
              
              <button type="button" onClick={handleGoogleSignIn} className="btn btn-outline-dark w-100 py-2" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign Up with Google'}
              </button>

              <p className="text-center text-muted small mt-3 mb-0">
                Already have an account? <a href="/login" className="text-dark">Log in</a>
              </p>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}