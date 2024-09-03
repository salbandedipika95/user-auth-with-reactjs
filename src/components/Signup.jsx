import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [step, setStep] = useState(1);
  const [phoneError, setPhoneError] = useState("");
  const [passError, setPassError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault(); // Prevent form submission

    // Validate phone number before generating OTP
    if (phone.length !== 10 || isNaN(phone)) {
      setPhoneError("Phone number must be 10 digits");
      return;
    }

    // Clear phone error if valid
    setPhoneError("");
    // Validate phone number before generating OTP
    if (pass.length !== 8) {
      setPassError("Phone number must be 8 digits");
      return;
    }

    // Clear phone error if valid
    setPassError("");

    // Simulate OTP generation
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);

    // Store user details and OTP in local storage
    localStorage.setItem("user", JSON.stringify({ name, email, phone, pass }));
    localStorage.setItem("otp", otpCode);
    setStep(2); // Move to OTP verification step
  };

  const handleVerifyOtp = () => {
    const storedOtp = localStorage.getItem("otp");
    if (otp === storedOtp) {
      alert("Signup successful!");
      localStorage.removeItem("otp"); // Clear OTP after successful verification
      navigate("/login");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          {step === 1 ? (
            <form onSubmit={handleSignup}>
              <h2>Signup</h2>
              <input
                type="text"
                required
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Ex. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <input
                type="email"
                required
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                required
                type="text" // Use type="text" for better validation control
                placeholder="Phone Number"
                className="form-control"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value;
                  setPhone(value);

                  // Validate phone number
                  if (value.length > 10 || isNaN(value)) {
                    setPhoneError("Phone number must be 10 digits");
                  } else if (value.length === 10 && !isNaN(value)) {
                    setPhoneError("");
                  } else {
                    setPhoneError("");
                  }
                }}
              />
              {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
              <br />
              <input
                required
                type="password"
                placeholder="Create Password"
                className="form-control"
                value={pass}
                onChange={(e) => {
                  const value = e.target.value;
                  setPass(value);

                  // Validate phone number
                  if (value.length > 8) {
                    setPassError("Phone number must be 8 digits");
                  } else if (value.length === 8) {
                    setPassError("");
                  } else {
                    setPassError("");
                  }
                }}
              />
              {passError && <p style={{ color: "red" }}>{passError}</p>}
              <br />
              <button type="submit" className="btn btn-dark">
                Send OTP
              </button>
            </form>
          ) : (
            <div>
              <h2>Verify OTP</h2>
              <input
                required
                type="text"
                placeholder="Enter OTP"
                className="form-control"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <br />
              <button
                onClick={handleVerifyOtp}
                type="button"
                className="btn btn-dark"
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Signup;
