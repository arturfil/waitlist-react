import { useState, useEffect } from "react";
import axios from "axios";
import TurnCard from "../components/TurnCard";
import { Spinner } from 'react-bootstrap';

const HomeView = () => {
  const [turns, setTurns] = useState([]);
  const [loading, setLoading] = useState(false);

  const [turn, setTurn] = useState({
    name: "",
    note: "",
  });

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getAllTurns();
  }, []);

  async function getAllTurns() {
    setLoading(true);
    const response = await axios.get(`${apiUrl}/turns`);
    setTurns(response.data);
    setLoading(false);
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

  const handleDelete = async (id) => {
    // alert("HERE", event.target.key);
    const filtered = turns.filter((turn) => {
      return id !== turn._id;
    });
    await axios.delete(`${apiUrl}/turns/turn/${id}`);
    setTurns(filtered);
  };

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
          {loading && (
            <div  className="container" >
              <Spinner style={{margin: '0 auto', display: 'flex', height: 50, width: 50}} animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <h2 style={{display: 'flex', margin: "20px auto", justifyContent: 'center'}}>Loading</h2>
            </div>
          )}
          {turns.length === 0 && !loading && (
            <h4>Currently there is no queue</h4>
          )}
          {turns &&
            turns.map((t, i) => (
              <TurnCard
                key={t._id}
                place={i}
                func={() => handleDelete(t._id)}
                turn={t}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
