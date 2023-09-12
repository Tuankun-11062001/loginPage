import React, { useState } from "react";
import faceSvg from "../../assets/face.svg";
import googleSvg from "../../assets/google.svg";
import twitterSvg from "../../assets/twitter.svg";
import pintestSvg from "../../assets/pintest.svg";
import Input from "../components/input";
import Button from "../components/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { handleChangeInput } from "../util/handleInput";
import { user } from "../data";
import Notification from "./notification";

const Card = ({ type }) => {
  return (
    <>
      {type === "login" ? (
        <CardLogin title="Login." />
      ) : type === "signup" ? (
        <CardSignup title="Signup." />
      ) : (
        <CardUser />
      )}
    </>
  );
};

const CardLogin = ({ title }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async () => {
    const find = user.find(
      (user) =>
        user.username === data.username && user.password === data.password
    );

    if (!find) {
      return setError("Username or password is incorrect");
    }

    await setNotification("Login successful. To the home page after 5 seconds");
    await document.querySelector(".notification").classList.add("active");
    setTimeout(() => {
      document.querySelector(".notification").classList.remove("active");
      navigate("/user", { state: data });
    }, 2000);
  };

  return (
    <>
      {notification && <Notification title={notification} />}
      <div className="card">
        <h1>{title}</h1>

        <Input
          title="User name"
          typeInput="text"
          placeholder="Your user name"
          name="username"
          value={data.username}
          func={(e) => handleChangeInput(e, setData, data, setError)}
        />

        <Input
          title="Password"
          typeInput="password"
          placeholder="Your password"
          name="password"
          value={data.password}
          func={(e) => handleChangeInput(e, setData, data, setError)}
        />
        {error && <span className="card_error">{error}</span>}

        <Button title="Login" func={handleSubmit} />
        <div className="card_bottom">
          <p>
            If you haven't account, please <Link to="/signup">Sign up</Link>
          </p>
          <p>OR</p>
          <p>
            Fast way:
            <div className="card_socials">
              <img src={faceSvg} />
              <img src={googleSvg} />
              <img src={pintestSvg} />
              <img src={twitterSvg} />
            </div>
          </p>
        </div>
      </div>
    </>
  );
};

const CardSignup = ({ title }) => {
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const handleSubmit = async () => {
    if (
      data.username === "" ||
      data.email === "" ||
      data.password === "" ||
      data.rePassword === ""
    ) {
      return setError("Please fill all the fields");
    }
    if (data.password !== data.rePassword) {
      return setError("Both fields password not correct");
    }
    if (data.email.includes("@gmail.com") === false) {
      return setError("Email is not valid");
    }

    const sameUser = user.find((user) => user.username === data.username);

    if (sameUser) {
      return setError("Username is already taken");
    }

    await user.push(data);
    await setNotification("Signup Successful");

    await document.querySelector(".notification").classList.add("active");

    setTimeout(() => {
      document.querySelector(".notification").classList.remove("active");
    }, 2000);
  };

  return (
    <>
      <Notification title={notification} />
      <div className="card">
        <h1>{title}</h1>

        <Input
          title="User name"
          typeInput="text"
          placeholder="Your user name"
          name="username"
          value={data.username}
          func={(e) => handleChangeInput(e, setData, data, setError)}
        />

        <Input
          title="Email"
          typeInput="email"
          placeholder="Your email"
          name="email"
          value={data.email}
          func={(e) => handleChangeInput(e, setData, data, setError)}
        />
        <Input
          title="Password"
          typeInput="password"
          placeholder="Your password"
          name="password"
          value={data.password}
          func={(e) => handleChangeInput(e, setData, data, setError)}
        />
        <Input
          title="Re-password"
          typeInput="password"
          placeholder="Your password again"
          name="rePassword"
          value={data.rePassword}
          func={(e) => handleChangeInput(e, setData, data, setError)}
        />
        {error && <span className="card_error">{error}</span>}
        <Button title="Sign up" func={handleSubmit} />

        <div className="card_bottom">
          <p>
            If you have account, please <Link to="/">Sign in</Link>
          </p>
          <p>OR</p>
          <p>
            Fast way:
            <div className="card_socials">
              <img src={faceSvg} />
              <img src={googleSvg} />
              <img src={pintestSvg} />
              <img src={twitterSvg} />
            </div>
          </p>
        </div>
      </div>
    </>
  );
};

const CardUser = () => {
  const location = useLocation();
  const random = Math.random();
  const navigate = useNavigate();
  const listImage = [
    "https://i.ex-cdn.com/tieudung.giadinhonline.vn/files/content/2022/04/12/2-1941.jpg",
    "https://media.ngoisao.vn/resize_580/news/2016/04/08/dong-vat-cuoi-8-ngoisao.vn.jpg",
    "https://phunugioi.com/wp-content/uploads/2020/10/anh-hai-huoc-ve-con-khi.jpg",
  ];
  const randomImage = Math.floor(Math.random() * listImage.length);

  return (
    <div className="card">
      <h1>Hi {location.state.username}!</h1>
      <img className="card_image" src={listImage[randomImage]} />
      <p className="card_user_id">Your ID : @{random}</p>
      <Button title="Let's explore" func={() => navigate("/")} />
    </div>
  );
};

export default Card;
