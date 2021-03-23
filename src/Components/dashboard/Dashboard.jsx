import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Card from '../card/Card';
// import Card from './card/Card';
export default function Dashboard() {

  const [trending, setTrending] = useState([]);
  const [playerdb, setPlayerdb] = useState([]);
  // const Api=b909d678e82f454a84d8487e1da59893;
  useEffect(() => {
    // console.log('Inside the useEffect')
    axios.get('http://localhost:5000/dashPlayers/')
      .then((res) => {
        // console.log("Hell")
        // console.log(res.data)
        setTrending(res.data);
      })
      .catch(err => {
        // console.log(err)
      })
  }, []);


  const savePlayer = (playerCard) => {
    // console.log("I am in the dashboard");
    axios
      .post('http://localhost:3100/news', playerCard, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        if (response.status === 201) {
          // [...contact, response.data]
          setPlayerdb([...playerdb, response.data]);
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  return (
    
    <div className="dashboard-container">
      <h1>Recommended Players</h1>
      <div className="displayContainer">
        {trending.map((player) =>
          <Card
            key={player.pid}
            pid={player.pid}
            name={player.name}
            readLater={savePlayer}
          />
        )}
      </div>
    </div>
  )
}
