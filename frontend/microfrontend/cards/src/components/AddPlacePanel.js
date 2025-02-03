import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api";
import React, {useEffect} from "react";
import '../index.css'

export default function AddPlacePanel() {
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    useEffect(() => {
        addEventListener("popup-closed", closePopup);
        return () => removeEventListener("popup-closed", closePopup);
    }, []);

    function closePopup() {
        setIsAddPlacePopupOpen(false);
    }

    function sendClosedEvent() {
        dispatchEvent(new CustomEvent("popup-closed", {
            detail: true
        }));
    }

    function sendCardAddedEvent(card) {
        dispatchEvent(new CustomEvent("card-added", {
            detail: card
        }));
    }

    function handleAddPlaceSubmit(newCard) {
        api
            .addCard(newCard)
            .then((newCardFull) => {
                sendCardAddedEvent(newCardFull);
                sendClosedEvent();
            })
            .catch((err) => console.log(err));
    }

    return <>
        <button className="card__add-button" type="button" onClick={() => setIsAddPlacePopupOpen(true)}></button>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit} onClose={sendClosedEvent}/>
    </>
}