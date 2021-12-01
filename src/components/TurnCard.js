import "../App.css";

const TurnCard = ({ turn, func, place }) => {
  const authUser = isAuth();

  function isAuth() {
    const obj = localStorage.getItem("jwtWaitList");
    return obj;
  }

  return (
    <div
      className="turn my-4"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h5>
        <span
          style={{
            fontWeight: "bold",
            border: "solid 1px gray",
            borderRadius: "15px",
            padding: "2px 8px",
          }}
        >
          {place + 1}{" "}
        </span>
        <br />
        <br />
        {turn.name}
      </h5>
      <p>{turn.note}</p>
      {authUser && (
        <button
            style={{ textAlign: "right", alignSelf: "flex-end" }}
            className="btn btn-outline-danger"
            onClick={() => func(turn._id)}
        >
            Delete
        </button>
      )}
    </div>
  );
};

export default TurnCard;
