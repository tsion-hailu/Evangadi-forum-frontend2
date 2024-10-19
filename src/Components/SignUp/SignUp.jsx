import React, { useState } from "react";
import classes from "./SignUp.module.css";
import { BiHide, BiShow } from "react-icons/bi";
import axios from "../../API/axiosConfig";
import { useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";

const SignUp = ({ onToggleForm }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState("");
  const [isUserExists, setIsUserExists] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { data } = await axios.post("/user/register", {
        username: formData.username,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
      });
      console.log(data);
      onToggleForm();
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 409) {
        setIsUserExists("User Already exists");
      }
      if (error.response.status === 400) {
        setIsPasswordValid("Password must be at least 8 characters long");
      }
      setIsLoading(false);
    }
    if (!isAgreed) {
      alert("Please agree to the terms and conditions");
      return;
    }
  };
  return (
    <div className={classes.signup_container}>
      <h3>Join the network</h3>
      <p>
        Already have an account?{" "}
        <a style={{ color: "#FF8C00" }} onClick={onToggleForm}>
          Sign in
        </a>
      </p>
      <form onSubmit={handleSubmit}>
        <div className={classes.input_group}>
          <input
            placeholder="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className={classes.input_group}>
          <div className={classes.name_group}>
            <input
              placeholder="First name"
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <input
              placeholder="Last name"
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <input
            placeholder="Email address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className={classes.password_group}>
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className={classes.password_toggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <VisibilityOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )}
            </span>
          </div>

          {isUserExists && <Error message={isUserExists} />}
          {isPasswordValid && <Error message={isPasswordValid} />}
        </div>
        <div className={classes.checkbox_group}>
          <input
            type="checkbox"
            name="agree"
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
            required
          />
          <label>
            I agree to the <a href="/privacy-policy">privacy policy</a> and
            <a href="/terms-of-service"> terms of service</a>.
          </label>
        </div>

        <div className={classes.actions}>
          <button type="submit" disabled={!isAgreed}>
            {isLoading ? <Loader /> : "Agree and Join"}
          </button>
        </div>
      </form>

      <p>
        <a onClick={onToggleForm}>Already have an account?</a>
      </p>
    </div>
  );
};
export default SignUp;
