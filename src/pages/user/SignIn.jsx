import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase Authentication
import { auth } from "../../config/firebaseConfig"; // Import konfigurasi Firebase
import { Link } from "react-router-dom"; // Import Link untuk navigasi
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

      alert(`Welcome back, ${user.email}!`);
      
      // Simpan session berdasarkan opsi Remember Me
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("user", JSON.stringify(user));

      setIsLoading(false);
      navigate("/landingpage");
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
      {/* Background Overlay */}
      <div className="background-overlay"></div>

      {/* Left Section */}
      <div className="left-section">
        <h1 className="welcome-text">Selamat Datang!</h1>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <form className="signin-form" onSubmit={handleSignIn}>
          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Remember Me and Forgot Password */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className={`submit-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Sign In"}
          </button>

          {/* Sign Up Link */}
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
