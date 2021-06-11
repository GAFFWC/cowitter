import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, userData, refreshUser }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userData={userData} />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home userData={userData} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile refreshUser={refreshUser} userData={userData} />
                        </Route>
                    </>
                ) : (
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                    </>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter;
