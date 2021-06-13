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
        <div className="container">
            <form onSubmit={onSubmitNewDisplayName} className="profileForm">
                <input
                    onChange={onChangeNewDisplayName}
                    type="text"
                    autoFocus
                    placeholder="Display name"
                    value={newDisplayName}
                    className="formInput"
                />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10
                    }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
};

export default Profile;
