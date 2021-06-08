import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { fb } from "common/firebase";

function App() {
    const [init, setInit] = useState(false);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        fb.auth().onAuthStateChanged((user) => {
            if (user) {
                setUserData(user);
            }
            setInit(true);
        });
    }, []);

    return (
        <>
            {init ? <AppRouter isLoggedIn={Boolean(userData)} userData={userData} /> : "Initializing..."}
            <footer>&copy; Cowitter {new Date().getFullYear()}</footer>
        </>
    );
}

export default App;
