import { fb } from "common/firebase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const Cowit = ({ cowitData, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newCowit, setNewCowit] = useState(cowitData.text);

    const onDeleteClick = async () => {
        const deleteAgree = window.confirm("Are you sure?");

        if (deleteAgree) {
            // delete cowit
            await fb.firestore().doc(`cowits/${cowitData.id}`).delete();

            if (cowitData.attachment) {
                await fb.storage().refFromURL(cowitData.attachment).delete();
            }
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    const onSubmit = async (event) => {
        event.preventDefault();
        await fb.firestore().doc(`cowits/${cowitData.id}`).update({
            text: newCowit
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setNewCowit(value);
    };
    return (
        <div className="cowit">
            {editing ? (
                <>
                    {isOwner && (
                        <>
                            <form onSubmit={onSubmit} className="container cowitEdit">
                                <input
                                    type="text"
                                    placeholder="Edit your cowit"
                                    value={newCowit}
                                    required={true}
                                    autoFocus
                                    onChange={onChange}
                                    className="formInput"
                                />
                                <input type="submit" value="Update Cowit" className="formBtn" />
                            </form>
                            <span onClick={toggleEditing} className="formBtn cancelBtn">
                                Cancel
                            </span>
                        </>
                    )}
                </>
            ) : (
                <>
                    <h4>{cowitData.text}</h4>
                    {cowitData.attachment && <img src={cowitData.attachment} alt={cowitData.attachment} />}
                    {isOwner && (
                        <div className="cowit__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Cowit;
