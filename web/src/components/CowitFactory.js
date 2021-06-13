import { fb } from "common/firebase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const CowitFactory = ({ userData }) => {
    const [cowit, setCowit] = useState("");
    const [attachment, setAttachment] = useState();

    const onCowitSubmit = async (event) => {
        if (!cowit) {
            return;
        }

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
        setAttachment("");
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
        setAttachment("");
    };

    return (
        <form onSubmit={onCowitSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    value={cowit}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label for="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                    opacity: 0
                }}
            />
            {attachment && (
                <div className="factoryForm__attachment">
                    <img
                        src={attachment}
                        style={{
                            backgroundImage: attachment
                        }}
                        alt={attachment}
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachmentClick}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    );
};

export default CowitFactory;
