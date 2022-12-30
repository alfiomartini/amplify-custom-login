import { useState } from "react";
import { Amplify, Auth } from "aws-amplify";
import awsConfig from "./aws-exports";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { Navbar } from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import "./App.css";

Amplify.configure(awsConfig);

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

function App() {
  const [user, setUser] = useState(null);

  const doSignOut = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <div>
      <Navbar user={user} doSignOut={doSignOut} />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <SignIn setUser={setUser} />
          </Route>
          <Route path="/signIn">
            <SignIn setUser={setUser} />
          </Route>
          <Route path="/signUp">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
