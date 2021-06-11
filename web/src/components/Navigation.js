import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userData }) => (
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">{userData.displayName}의 My Profile</Link>
            </li>
        </ul>
    </nav>
);

export default Navigation;
