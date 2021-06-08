import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { fb } from "common/firebase";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        fb.auth().onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserData(user);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn} userData={userData} /> : "Initializing..."}
            <footer>&copy; Cowitter {new Date().getFullYear()}</footer>
        </>
    );
}

export default App;
