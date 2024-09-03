import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.pass === password
    ) {
      alert("Login successful!");
    } else {
      alert("Invalid email or user not found");
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="card">
          <div className="card-body">
            <h2>Login</h2>
            <input
              type="email"
              required
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              required
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit" className="btn btn-dark">
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
