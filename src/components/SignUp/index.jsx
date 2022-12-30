import React from "react";
import { Button } from "../Button";
import { useState } from "react";
import passwordValidator from "password-validator";
import { Token } from "../Token";

const schema = new passwordValidator();

schema.is().min(8).has().letters().has().digits();

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showToken, setShowToken] = useState(false);

  const clear = () => {
    setEmail("");
    setPassword("");
    setConfirmPwd("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPwd = (e) => {
    setConfirmPwd(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPwd) {
      alert("Password confirmation failed");
      clear();
      return;
    }

    const validate = schema.validate(password);
    if (!validate) {
      alert("Password must contain letter and digits. Minimum length: 8");
    }
  };

  return (
    <>
      <form className="form-group" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="email"
            name="email"
            id="email"
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
        <div className="form-control">
          <label htmlFor="confirmPwd">Confirm Password</label>
          <input
            type="password"
            name="confirmPwd"
            id="confirmPwd"
            placeholder="confirm password"
            value={confirmPwd}
            onChange={handleConfirmPwd}
          />
        </div>
        <Button width="90%" type={"submit"}>
          Sign Up
        </Button>
      </form>
      <Button
        width="140px"
        handleClick={() => {
          setShowToken(!showToken);
        }}
      >
        Confirm Token
      </Button>
      {showToken && <Token />}
    </>
  );
};
