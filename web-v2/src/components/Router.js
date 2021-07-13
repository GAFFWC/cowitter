import React from "react";
import { useSelector } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./Auth";
import Home from "./Home";
const AppRouter = () => {
    const { login, userData } = useSelector((state) => ({
        login: state.user.login,
        userData: state.user.userData
    }));

    console.log(login);
    console.log(userData);

    return (
        <Router>
            {/* for Navigation */}
            <Switch>
                {login ? (
                    <Home />
                ) : (
                    // for home, ...
                    <>
                        <Route>
                            <Auth login={login} userData={userData} />
                        </Route>
                    </>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter;
