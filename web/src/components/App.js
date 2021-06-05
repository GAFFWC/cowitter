import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import * as firebase from "common/firebase";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
            <footer>&copy; Cowitter {new Date().getFullYear()}</footer>
        </>
    );
}

export default App;
