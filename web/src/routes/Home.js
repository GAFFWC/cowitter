import { fb } from "common/firebase";
import Cowit from "components/Cowit";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const Home = ({ userData }) => {
    const [cowit, setCowit] = useState("");
    const [cowits, setCowits] = useState([]);
    const [attachment, setAttachment] = useState();

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
                setCowits(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })).sort((a, b) => b.createdAt - a.createdAt));
            });
    }, []);

    const onCowitSubmit = async (event) => {
        event.preventDefault();

        const newCowit = {
            text: cowit,
            createdAt: Date.now(),
            userUid: userData.uid
        };

        if (attachment) {
            const attachmentRef = fb.storage().ref().child(`${userData.uid}/${uuidv4()}`);

            const attachmentUrl = await attachmentRef.putString(attachment, "data_url").then(async (r) => {
                return await r.ref.getDownloadURL();
            });

            newCowit.attachment = attachmentUrl;
        }

        await fb.firestore().collection("cowits").add(newCowit);
        setCowit("");
        setAttachment(null);
    };

    const onChange = (event) => {
        const {
            target: { value }
        } = event;

        setCowit(value);
    };

    const onFileChange = (event) => {
        const {
            target: { files }
        } = event;

        const file = files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = (finished) => {
            const {
                currentTarget: { result }
            } = finished;
            setAttachment(result);
        };
    };

    const onClearAttachmentClick = () => {
        setAttachment(null);
    };
    return (
        <div>
            <form onSubmit={onCowitSubmit}>
                <input value={cowit} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Cowit" onSubmit={onCowitSubmit} />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachmentClick}>Clear</button>
                    </div>
                )}
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
