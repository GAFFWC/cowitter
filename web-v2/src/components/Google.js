import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";

const LoginWithGoogle = () => {
    const onGoogleLoginFailure = (err) => {
        console.error(err);
    };

    const onGoogleLoginSuccess = (response) => {
        const {
            profileObj: { name, imageUrl, email }
        } = response;
        axios
            .post("http://localhost/auth/google", { name, imageUrl, email })
            .then((r) => {
                console.log(r);
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
