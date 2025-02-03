import Card from "./Card";
import ImagePopup from "./ImagePopup";
import React, {useEffect} from "react";
import api from "../utils/api";
import '../index.css'

export default function CardList({currentUser}) {
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState(null);

    useEffect(function () {
        addEventListener("popup-closed", closePopup);
        addEventListener("card-added", (card) => setCards([...cards, card]));
        if (cards.length === 0) {
            api
                .getCardList()
                .then((cardData) => {
                    setCards(cardData);
                })
                .catch((err) => console.log(err));
        }
    }, []);

    function handleCardDelete(card) {
        api
            .removeCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => console.log(err));
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((cards) =>
                    cards.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => console.log(err));
    }

    function sendClosedEvent() {
        dispatchEvent(new CustomEvent("popup-closed", {
            detail: true
        }));
    }

    function closePopup() {
        setSelectedCard(null);
    }

    return <>
        <section className="places page__section">
            <ul className="places__list">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        currentUser={currentUser}
                        onCardClick={(card) => setSelectedCard(card)}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                ))}
            </ul>
        </section>
        <ImagePopup card={selectedCard} onClose={sendClosedEvent}/>
    </>
}