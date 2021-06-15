import React, { useEffect, useState } from "react";

const KakaoLogin = () => {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        const kakaojs = document.createElement("script");
        kakaojs.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
        kakaojs.async = true;
        document.body.appendChild(kakaojs);

        kakaojs.onload = () => {
            window.Kakao.init("dd831357f9878d55ce253241f2b70bb6");
            setScriptLoaded(true);
        };
    }, []);

    const onKakaoLoginClick = () => {
        window.Kakao.Auth.login({
            success: (auth) => {
                fetch("http://localhost/auth/kakao/login", {
                    method: "post",
                    headers: {
                        auth: JSON.stringify(auth)
                    }
                })
                    .then((r) => {
                        console.log(r);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            },
            fail: (err) => {
                alert("error!");
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

export default KakaoLogin;
