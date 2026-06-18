


function GuessHistory( {history} ) {
  
    return (
        <>
            {history.map((element) => (
                <div>{element.guess} {element.proximity}</div>
            ))}  
        </>
    )
}

export default GuessHistory