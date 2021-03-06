import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { fb } from "common/firebase";

function App() {
    const [init, setInit] = useState(false);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        fb.auth().onAuthStateChanged((user) => {
            if (user) {
                setUserData({
                    displayName: user.displayName,
                    uid: user.uid,
                    updateProfile: (args) => user.updateProfile(args)
                });
            } else {
                setUserData(null);
            }
            setInit(true);
        });
    }, []);

    const refreshUser = () => {
        const user = fb.auth().currentUser;
        setUserData({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args)
        });
    };

    return (
        <>
            {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userData)} userData={userData} /> : "Initializing..."}
            <center>&copy; Cowitter {new Date().getFullYear()}</center>
        </>
    );
}

export default App;
