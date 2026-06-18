import { useState } from "react";

function GuessInput({ onSubmit }) {
    const [guess, setGuess] = useState("");

    const handleSubmit= () => {
        onSubmit(guess);
        setGuess("")
    }

    return (
        <div>
            <input
            type="text"
            value={guess}
            onChange={(word) => setGuess(word.target.value)}
            placeholder="enter your guess"
            />

            <button onClick={handleSubmit}>Ok</button>
        </div>
    )

}

export default GuessInput