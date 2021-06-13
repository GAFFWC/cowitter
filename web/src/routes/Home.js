import { fb } from "common/firebase";
import Cowit from "components/Cowit";
import CowitFactory from "components/CowitFactory";
import React, { useEffect, useState } from "react";
const Home = ({ userData }) => {
    const [cowits, setCowits] = useState([]);

    const getCowits = async () => {
        (await fb.firestore().collection("cowits").get()).forEach((doc) => {
            setCowits((prev) => [{ ...doc.data(), id: doc.id }, ...prev]);
        });
    };

    useEffect(() => {
        setCowits([]);
        getCowits();

        fb.firestore()
            .collection("cowits")
            .onSnapshot((snapshot) => {
                setCowits(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })).sort((a, b) => b.createdAt - a.createdAt));
            });
    }, []);

    return (
        <div className="container">
            <CowitFactory userData={userData} />
            <div style={{ marginTop: 30 }}>
                {cowits.map((cowit) => (
                    <Cowit key={cowit.id} cowitData={cowit} isOwner={cowit.userUid === userData.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;
