import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import './SignIn.css';

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();  // Inisialisasi useNavigate

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi login
    setTimeout(() => {
      alert("Login simulation successful!");
      setIsLoading(false);
      navigate("/landingpage");  // Arahkan ke halaman home setelah login berhasil
    }, 2000);
  };

  const handleForgotPassword = () => {
    if (!email) {
      alert("Please enter your email before resetting your password.");
    } else {
      alert(`Password reset email sent to ${email} (simulation).`);
    }
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
            <a href="/auth/sign-up" className="signup">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
