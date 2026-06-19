import { useState } from "react";

function GuessInput({ onSubmit }) {
    const [guess, setGuess] = useState("");

    const handleSubmit= (event) => {
        event.preventDefault();
        onSubmit(guess);
        setGuess("");
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={guess}
                onChange={(word) => setGuess(word.target.value)}
                placeholder="enter your guess"
                />
                <button type="submit">Ok</button>
            </form>
        </div>
    )

}

export default GuessInput