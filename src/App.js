import React from "react";
import HomePage from "./components/home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import RouteAuthPage from "./components/authPages/route.auth.page";

function App() {
  return (
    <div className="bg">
      <BrowserRouter>
        <Switch>
          <Route path="/home">
            <RouteAuthPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
