import "./App.css";
import { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";
import Modal from "./components/UI/Modal";

const cardImages = [
    { src: "/img/helmet-1.png", matched: false },
    { src: "/img/potion-1.png", matched: false },
    { src: "/img/ring-1.png", matched: false },
    { src: "/img/scroll-1.png", matched: false },
    { src: "/img/shield-1.png", matched: false },
    { src: "/img/sword-1.png", matched: false },
];

function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);

    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);

    const [disabled, setDisabled] = useState(false);

    const [limit, setLimit] = useState(8);
    const [win, setWin] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [stopGaming, setStopGaming] = useState(false);

    // shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));

        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setTurns(0);
        setShowModal(false);
        setLimit(8);
        setWin(false);
        setStopGaming(false);
    };

    // Handle a Choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    // reset choice & increase turn
    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prevTurns) => prevTurns + 1);
        setDisabled(false);
    };

    // Compare 2 selected cards
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000);
                setLimit((prevsLimit) => prevsLimit - 1);
            }
        }
    }, [choiceOne, choiceTwo]);

    // start a new game automagically
    useEffect(() => {
        shuffleCards();
    }, []);

    useEffect(() => {
        if (limit === 0) {
            setShowModal(true);
            setStopGaming(true);
        }
    }, [limit]);

    useEffect(() => {
        const notMatched = cards.filter((val) => {
            return val.matched === false;
        });
        if (notMatched.length === 0 && cards.length > 0) {
            setWin(true);
            setShowModal(true);
        }
    }, [cards]);

    const hideFuncModal = () => {
        setShowModal(false);
    };

    return (
        <div className="App">
            {limit === 0 && showModal && (
                <Modal
                    heading="Game over"
                    info={`your limit is ${limit} and your turns is ${turns}`}
                    hideFunc={hideFuncModal}
                    btnFunc={shuffleCards}
                    btnContent="New Game!"
                />
            )}

            {win && showModal && (
                <Modal
                    heading="Your Win"
                    info={`your done in ${turns} turns`}
                    hideFunc={hideFuncModal}
                    btnFunc={shuffleCards}
                    btnContent="New Game!"
                />
            )}

            <h1>Magic Match</h1>
            <button onClick={shuffleCards}>New Game</button>
            <div className="card-grid">
                {cards.map((card) => {
                    return (
                        <SingleCard
                            key={card.id}
                            card={card}
                            handleChoice={handleChoice}
                            flipped={
                                card === choiceOne ||
                                card === choiceTwo ||
                                card.matched
                            }
                            disabled={disabled || stopGaming}
                        />
                    );
                })}
            </div>
            <p>Turns: {turns}</p>
            <p>Limit: {limit}</p>
        </div>
    );
}

export default App;
