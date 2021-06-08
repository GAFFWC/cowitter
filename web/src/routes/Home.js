import { fb } from "common/firebase";
import Cowit from "components/Cowit";
import moment from "moment";
import React, { useEffect, useState } from "react";

const Home = ({ userData }) => {
    const [cowit, setCowit] = useState("");
    const [cowits, setCowits] = useState([]);

    const getCowits = async () => {
        (await fb.firestore().collection("cowits").get()).forEach((doc) => {
            setCowits((prev) => [{ ...doc.data(), id: doc.id }, ...prev]);
        });
    };

    useEffect(() => {
        setCowits([]);
        getCowits();
        // console.log(cowits);

        fb.firestore()
            .collection("cowits")
            .onSnapshot((snapshot) => {
                setCowits(
                    snapshot.docs
                        .map((doc) => ({ ...doc.data(), id: doc.id }))
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                );
            });
    }, []);

    const onCowitSubmit = async (event) => {
        event.preventDefault();
        await fb
            .firestore()
            .collection("cowits")
            .add({
                userUid: userData.uid,
                text: cowit,
                createdAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").toString()
            });
        setCowit("");
    };

    const onChange = (event) => {
        const {
            target: { value }
        } = event;

        setCowit(value);
    };

    return (
        <div>
            <form onSubmit={onCowitSubmit}>
                <input value={cowit} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Cowit" onSubmit={onCowitSubmit} />
            </form>
            <div>
                {cowits.map((cowit) => (
                    <Cowit key={cowit.id} cowitData={cowit} isOwner={cowit.userUid === userData.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;
