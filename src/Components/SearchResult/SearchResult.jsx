import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import Card from '../card/Card';
import Loader from 'react-loader-spinner';
import Loading from '../Loading/Loading';

export default function SearchResult(props) {
	const { playername } = useParams('playername');
	const [searchResult, setSearchResult] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [newPlayerName, setNewPlayerName] = useState('');
	const history = useHistory();
	useEffect(() => {
		axios.get('https://cricapi.com/api/playerFinder', {
			params: {
				"apikey": "SjE3SkJNzXROpeD1xvDfIyrVbiz1",
				"name": `${playername}`
			}
		}).then((res) => {
			// console.log(res.data.data);
			setSearchResult(res.data.data);
		}).catch((err) => {
			// console.error(err);
		}).finally(res => {
			setIsLoading(false);
		})
	}, [props.location]);

	const savePlayer = (playerCard) => {
		// console.log("I am in the Search Result");
		axios
			.post('http://localhost:3100/news', playerCard, {
				headers: { 'Content-Type': 'application/json' },
			})
			.then(function (response) {
				if (response.status === 201) {
					// [...contact, response.data]
					// console.log("Player Added to fav")
					//setPlayerdb([...playerdb, response.data]);
				}
			})
			.catch(function (error) {
				// console.log(error);
			});
	};

	if (isLoading) {
		return (<Loading
			type="Circles" color="#007bff" height={200} width={200} />);
	}
	return (
		<div className="search-page-container">
			<div className="search-box-container">
				<form onSubmit={(e) =>
					history.replace(`/search/${newPlayerName}`)}>
					<div className="input-group">
						<input type="search" className="form-control rounded" placeholder="Search Players" aria-label="Search"
							aria-describedby="search-addon"
							onChange={(e) => setNewPlayerName(e.target.value)} />
						<button type="submit" className="btn btn-outline-primary">Search Players</button>
					</div>
				</form>
			</div>
			{searchResult.length > 0 &&
				<div className="displayContainer">
					{searchResult.map((player) =>
						<Card
							key={player.pid}
							pid={player.pid}
							name={player.name}
							readLater={savePlayer}
						/>
					)}
				</div>}

			{searchResult.length === 0 &&
				<h5>No Result Found</h5>}
		</div>
	)
}
