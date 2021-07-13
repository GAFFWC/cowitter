import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { setLogin, setUserData } from "../modules/user";

const LoginWithGoogle = ({ login, userData, onLogin, onUserData }) => {
    const onGoogleLoginFailure = (err) => {
        console.error(err);
    };

    const onGoogleLoginSuccess = (response) => {
        const {
            profileObj: { name, imageUrl, email, googleId }
        } = response;

        console.log(response.profileObj);

        axios
            .post("http://localhost/auth/google", { name, imageUrl, email, userId: googleId })
            .then((r) => {
                // console.log(r);
                onUserData(r.data);
                onLogin(true);
            })
            .catch((err) => console.error(err));
    };

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onSuccess={onGoogleLoginSuccess}
            onFailure={onGoogleLoginFailure}
            cookiePolicy={"single_host_origin"}
        ></GoogleLogin>
    );
};

export default LoginWithGoogle;
