import React, { useState, useEffect } from "react";
import { getConnections } from "../../../API/FirestoreAPI";
import usericon from "../../../assets/dummy-image.png";
import { useNavigate } from "react-router-dom";

export default function MessagingUser({ user, getCurrentUser, currentUser }) {
    const [isConnected, setIsConnected] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getConnections(currentUser.userid, user.id, setIsConnected);
    }, [currentUser.userid, user.id]);

    const handleClick = () => {
        navigate("/messages", {
            state: { messengerId: user.id, messengerEmail: user.email },
        });
    };

    return isConnected ? (
        <div className='messaging-user' onClick={handleClick}>
            <img
                src={user.imageLink || usericon}
                alt={user.name}
                style={{ color: "black" }}
            />
            <div className='user-details'>
                <p className='name'>{user.name}</p>
            </div>
        </div>
    ) : null;
}
