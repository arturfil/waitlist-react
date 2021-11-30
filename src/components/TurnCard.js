import '../App.css';

const TurnCard = ({turn, callback}) => {
    return (
        <div className="turn my-4" style={{display: 'flex', flexDirection: 'column'}}>
            <h5>{turn.name}</h5>
            <p>{turn.note}</p>
            <button 
                style={{textAlign: 'right', alignSelf: 'flex-end'}}           
                className="btn btn-outline-danger" 
                onClick={callback}
            >
                Delete
            </button>
        </div>
    )
}

export default TurnCard;