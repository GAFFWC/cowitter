import React, { useState } from "react";
import { fb } from "common/firebase";

const Auth = () => {
    console.log(fb.app());
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {
            target: { name, value }
        } = event;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        // 기본 새로고침 x
        event.preventDefault();
        try {
            let data;

            if (newAccount) {
                // create account
                data = await fb.auth().createUserWithEmailAndPassword(email, password);
            } else {
                // log in
                data = await fb.auth().signInWithEmailAndPassword(email, password);
            }

            console.log(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialLoginClick = async (event) => {
        const {
            target: { name }
        } = event;

        try {
            let provider;
            if (name === "google") {
                // google log in
                provider = new fb.auth.GoogleAuthProvider();
            } else if (name === "github") {
                // github log in
                provider = new fb.auth.GithubAuthProvider();
            }

            const data = await fb.auth().signInWithPopup(provider);

            console.log(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error ? `Error : ${error}` : ""}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
            <div>
                <button name="google" onClick={onSocialLoginClick}>
                    Continue with Google
                </button>
                <button name="github" onClick={onSocialLoginClick}>
                    Continue with Github
                </button>
            </div>
        </div>
    );
};
export default Auth;
