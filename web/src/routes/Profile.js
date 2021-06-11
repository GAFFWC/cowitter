import { fb } from "common/firebase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userData, refreshUser }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userData.displayName);
    const onLogOutClick = () => {
        fb.auth().signOut();
        history.push("/");
    };

    const onChangeNewDisplayName = (event) => {
        const {
            target: { value }
        } = event;

        setNewDisplayName(value);
    };

    const onSubmitNewDisplayName = async (event) => {
        event.preventDefault();

        if (userData.displayName !== newDisplayName) {
            await userData.updateProfile({ displayName: newDisplayName });
            refreshUser();
        }
    };

    const getMyCowits = async () => {
        const myCowits = await fb.firestore().collection("cowits").where("userUid", "==", userData.uid).orderBy("createdAt", "desc").get();

        console.log(myCowits.docs.map((doc) => doc.data()));
    };
    useEffect(() => {
        getMyCowits();
    });

    return (
        <>
            <form onSubmit={onSubmitNewDisplayName}>
                <input onChange={onChangeNewDisplayName} type="text" placeholder="Display name" value={newDisplayName} />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;
