import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setUserData } from "../modules/user";
import LoginWithGoogle from "./Google";
import LoginWithKakao from "./Kakao";
export const Auth = ({ login, userData }) => {
    const dispatch = useDispatch();

    const onLogin = (login) => dispatch(setLogin(login));
    const onUserData = (userData) => dispatch(setUserData(userData));
    return (
        <div>
            <LoginWithGoogle login={login} userData={userData} onLogin={onLogin} onUserData={onUserData} />
            <LoginWithKakao login={login} userData={userData} onLogin={onLogin} onUserData={onUserData} />
        </div>
    );
};

export default Auth;
