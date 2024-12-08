import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase Authentication
import { auth } from "../../config/firebaseConfig";
import { Link } from "react-router-dom"; 
import { getDoc, doc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../../config/firebaseConfig"; // Assuming you have Firestore initialized
import "./SignIn.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userDocRef = doc(db, "users", user.uid); // Assuming your user document is in the 'users' collection
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const userRole = userData.role; // Assuming 'role' field in Firestore

        if (userRole === 'admin') {
          alert("Admins are not allowed to sign in to this platform.");
          signOut(auth); // Optionally, sign out the admin user
          setIsLoading(false);
          return;
        }

        // If user is 'user' role, proceed
        alert(`Welcome back, ${user.email}!`);

        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("user", JSON.stringify(user));

        setIsLoading(false);
        navigate("/landingpage");
      } else {
        alert("No role found for this user.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(`Login failed: ${error.message}`);
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      alert("Please enter your email before resetting your password.");
      return;
    }
    alert(`Password reset email sent to ${email} (simulation).`);
  };

  return (
    <div className="signin-container">
      <div className="background-overlay"></div>
      <div className="left-section">
        <h1 className="welcome-text">Selamat Datang!</h1>
      </div>
      <div className="right-section">
        <form className="signin-form" onSubmit={handleSignIn}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Username</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group relative">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter Your Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Ingat saya</label>
            </div>
            <button
              type="button"
              className="forgot-password"
              onClick={handleForgotPassword}
            >
              Lupa Password
            </button>
          </div>

          <button
            type="submit"
            className={`submit-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Sign In"}
          </button>

          <div className="signup-link">
            Belum punya akun?{" "}
            <Link to="/signup" className="signup">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
