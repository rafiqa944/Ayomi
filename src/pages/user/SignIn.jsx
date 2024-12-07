import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
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

      // Fetch user data from Firestore to check role
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists() && userDoc.data().role === "user") {
        alert(`Selamat datang kembali, ${user.email}!`);

        // Save session based on Remember Me option
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("user", JSON.stringify(user));

        setIsLoading(false);
        navigate("/landingpage");
      } else {
        alert("Akun ini tidak memiliki akses sebagai user.");
        setIsLoading(false);
        // Sign out user if role is not user
        await signOut(auth);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(`Login gagal: ${error.message}`);
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
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
          </div>

          <button
            type="submit"
            className={`submit-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Sign In"}
          </button>

          <div className="forgot-password-link">
            <a href="#!" onClick={handleForgotPassword}>Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}
