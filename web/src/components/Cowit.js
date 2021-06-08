import { fb } from "common/firebase";
import React, { useState } from "react";

const Cowit = ({ cowitData, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newCowit, setNewCowit] = useState(cowitData.text);

    const onDeleteClick = async () => {
        const deleteAgree = window.confirm("Are you sure?");

        if (deleteAgree) {
            // delete cowit
            await fb.firestore().doc(`cowits/${cowitData.id}`).delete();
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
        <div>
            {editing ? (
                <>
                    {isOwner && (
                        <>
                            <form onSubmit={onSubmit}>
                                <input type="text" placeholder="Edit your cowit" value={newCowit} required={true} onChange={onChange} />
                                <input type="submit" value="Update Cowit"></input>
                            </form>
                            <button onClick={toggleEditing}>Cancel</button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <h4>{cowitData.text}</h4>
                    {isOwner && (
                        <>
                            <button onClick={toggleEditing}>Edit Cowit</button>
                            <button onClick={onDeleteClick}>Delete Cowit</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Cowit;
