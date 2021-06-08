import { fb } from "common/firebase";
import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const history = useHistory();
    const onLogOutClick = () => {
        fb.auth().signOut();
        history.push("/");
    };
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;
