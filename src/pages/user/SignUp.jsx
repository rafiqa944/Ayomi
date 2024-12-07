import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./SignUp.css";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Register user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        username,
        email,
        phone,
        address,
        role: "user", // Save the user's role as "user"
      });

      alert("Pendaftaran berhasil!");
      setIsLoading(false);
      navigate("/landingpage");
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Terjadi kesalahan saat pendaftaran.");
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="background-overlay"></div>
      <div className="left-section">
        <h1 className="welcome-text">Buat akun mu!</h1>
      </div>
      <div className="right-section">
        <form className="signup-form" onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Nama Lengkap</label>
            <input
              type="text"
              id="fullName"
              placeholder="Masukkan Nama Lengkap"
              className="form-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Masukkan Username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Masukkan Email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Nomor Telepon</label>
            <input
              type="tel"
              id="phone"
              placeholder="Masukkan Nomor Telepon"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="form-label">Alamat</label>
            <input
              type="text"
              id="address"
              placeholder="Masukkan Alamat"
              className="form-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group relative">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Masukkan Password"
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
          <button
            type="submit"
            className={`submit-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Sign Up"}
          </button>
          <div className="signin-link">
            Sudah punya akun?{" "}
            <a
              href="/auth/sign-in"
              className="signin"
              onClick={(e) => {
                e.preventDefault();
                navigate("/auth/sign-in");
              }}
            >
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
