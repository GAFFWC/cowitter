import axios from "axios";
import React, { useEffect, useState } from "react";

const LoginWithKakao = ({ login, userData, onLogin, onUserData }) => {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        const kakaojs = document.createElement("script");
        kakaojs.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
        kakaojs.async = true;
        document.body.appendChild(kakaojs);

        kakaojs.onload = () => {
            window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
            setScriptLoaded(true);
        };
    }, []);

    const onKakaoLoginClick = () => {
        window.Kakao.Auth.login({
            success: (auth) => {
                axios
                    .post("http://localhost/auth/kakao/login", auth)
                    .then((r) => {
                        onUserData(r.data);
                        console.log(userData);
                        onLogin(true);
                    })
                    .catch((err) => console.error(err));
            },
            fail: (err) => {
                alert("error!", err);
            }
        });
    };
    return (
        <>
            {scriptLoaded ? (
                <button id="#kakao-login-btn" onClick={onKakaoLoginClick}>
                    Kakao Login
                </button>
            ) : (
                <h4>Loading...</h4>
            )}
        </>
    );
};

export default LoginWithKakao;
