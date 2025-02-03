import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/api";
import React, {useEffect, useState} from "react";

import '../index.css'


export default function ProfilePanel({children}) {
    const [user, setUser] = useState(null);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
        React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
        React.useState(false);

    useEffect(() => {
        addEventListener("popup-closed", closePopups);
        if (user === null) {
            api.getUserInfo()
                .then((res) => {
                    setUser(res);
                    dispatchEvent(new CustomEvent("user-changed", {detail: res}));
                })
                .catch((err) => console.log(err));

        }

        return () => removeEventListener("popup-closed", closePopups);
    }, []);

    function closePopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleUpdateUser(userUpdate) {
        api
            .setUserInfo(userUpdate)
            .then((newUserData) => {
                setUser(newUserData);
                dispatchEvent(new CustomEvent("user-changed", {
                    detail: newUserData
                }));
                dispatchEvent(new CustomEvent("popup-closed", {
                    detail: true
                }));
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(avatarUpdate) {
        api
            .setUserAvatar(avatarUpdate)
            .then((newUserData) => {
                setUser(newUserData);
                dispatchEvent(new CustomEvent("user-changed", {
                    detail: newUserData
                }));
                sendClosedEvent();
            })
            .catch((err) => console.log(err));
    }

    function sendClosedEvent() {
        dispatchEvent(new CustomEvent("popup-closed", {
            detail: true
        }));
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return <>
        <section className="profile page__section">
            <div className="profile__image" onClick={handleEditAvatarClick} style={{backgroundImage: `url(${user.avatar})`}}></div>
            <div className="profile__info">
                <h1 className="profile__title">{user.name}</h1>
                <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
                <p className="profile__description">{user.about}</p>
            </div>
            {children}
        </section>
        <EditProfilePopup currentUser={user} isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} onClose={sendClosedEvent}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} onClose={sendClosedEvent}/>
    </>
}