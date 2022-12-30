import React from "react";
import { Button } from "../Button";
import { useState } from "react";
import { Auth } from "aws-amplify";
import passwordValidator from "password-validator";

const schema = new passwordValidator();

schema.is().min(8).has().letters().has().digits();

async function signIn(email, password) {
  let user = null;
  try {
    user = await Auth.signIn(email, password);
  } catch (error) {
    console.log("error signing in", error);
    user = null;
  }
  return user;
}

export const SignIn = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clear = () => {
    setEmail("");
    setPassword("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validate = schema.validate(password);
    if (!validate) {
      alert("Password must contain letter and digits. Minimum length: 8");
    } else {
      const user = await signIn(email, password);
      console.log("user", user);
      setUser(user);
    }
    clear();
  };

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="email"
          name="username"
          id="username"
          value={email}
          onChange={handleEmail}
        />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <div className="password-block">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={handlePassword}
          />
        </div>
      </div>
      <Button width="90%" type={"submit"}>
        Sign In
      </Button>
      <div className="toSignUp" onClick={() => {}}>
        Don't you have an account?
      </div>
    </form>
  );
};
