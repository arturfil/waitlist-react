import { useState, useEffect } from "react";
import axios from "axios";
import TurnCard from '../components/TurnCard'

const HomeView = () => {
  const [turns, setTurns] = useState([]);
  const [turn, setTurn] = useState({
    name: "",
    note: "",
  });
  const authUser = isAuth();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getAllTurns();
  }, []);

  function isAuth() {
      const obj = localStorage.getItem('jwtWaitList');
      return obj;
  }

  async function getAllTurns() {
    const response = await axios.get(`${apiUrl}/turns`);
    setTurns(response.data);
  }

  function handleChange(event) {
    setTurn({
      ...turn,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await axios.post(`${apiUrl}/turns/turn`, turn);
    setTurn({
      name: "",
      note: "",
    });
    getAllTurns();
  }

  async function handleDelete(id) {
    const response = await axios.delete(`${apiUrl}/turns/turn/${id}`);
    const filtered = turns.filter((turn) => {
      return turn._id != id;
    });
    setTurns(filtered);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 col-lg-6 col-sm-12 my-5">
          <form>
            <h2 style={{ fontWeight: "bold" }}>Add Your Turn</h2>
            <input
              className="form-control my-4"
              onChange={handleChange}
              value={turn.name}
              name="name"
              type="text"
              placeholder="name"
            />
            <textarea
              className="form-control"
              onChange={handleChange}
              value={turn.note}
              name="note"
              type="text"
              placeholder="note"
            />
            <button
              onClick={handleSubmit}
              className="btn btn-outline-dark form-control mt-4"
            >
              Submit Turn
            </button>
          </form>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12 my-5">
          <h2 style={{ fontWeight: "bold" }}>Wait List</h2>
          {turns.length === 0 && <h4>Currently there is no queue</h4>}
          {turns &&
            turns.map((turn, i) => (
              <TurnCard
                place={i}
                callback={() => handleDelete(turn._id)}
                key={turn._id}
                turn={turn}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
