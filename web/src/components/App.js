import React, { useState } from "react";
import AppRouter from "./Router";
import * as firebase from "common/firebase";

function App() {
    console.log(firebase.auth.currentUser);

    const [isLoggedIn, setIsLoggedIn] = useState(firebase.auth.currentUser);
    return (
        <>
            <AppRouter isLoggedIn={isLoggedIn} />;
            <footer>&copy; Cowitter {new Date().getFullYear()}</footer>
        </>
    );
}

export default App;
