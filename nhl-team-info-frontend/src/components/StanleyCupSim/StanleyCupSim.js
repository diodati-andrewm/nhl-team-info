import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function StanleyCupSim() {
    const teams = useSelector((state) => state.teams);
    const [selectedTeam, setSelectedTeam] = useState("NYR");
    const [gameResults, setGameResults] = useState([]);
    const [wins, setWins] = useState([]);
    const [losses, setLosses] = useState([]);

    const selectTeam = (teamAbbrev) => {
        setSelectedTeam(teamAbbrev);  
      };
    
      // Runs a simulation against all other teams. Win % is based on the difference between both team's win % + 50% base.
    const runSim = (selectedTeam) => {
        const selectedTeamWinPctg = teams.find(team => team.teamAbbrev.default === selectedTeam).winPctg;

        let wins = 0;
        let losses = 0;
        let results = []; 

        teams.forEach(team => {
            if (team.teamAbbrev.default !== selectedTeam) {
                let winProbability = 50 + ((100* selectedTeamWinPctg) - (100 * team.winPctg));
                const randomNum = Math.floor(Math.random() * 101);
                let result;
                if (winProbability > randomNum) {
                    wins++;
                    result = 'win';
                } else {
                    losses++;
                    result = 'loss';
                }

                results.push({
                    opponent: team.teamAbbrev.default,
                    winProbability: winProbability.toFixed(2),
                    result: result
                });
            }
        });
        setWins(wins);
        setLosses(losses);
        setGameResults(results);
    } 

    return (
        <div className="content">
            <h1>Welcome to the <s>Stanley Cup</s> Season Simulator!</h1>
            <div className="team-info">
                <div className="inner">
                    <h2>How It Works</h2>
                    <p>Select a team and click the Run Simulation button. From there, your team will faceoff against each other team one time!</p>
                </div>
            </div>
            <div className="team-info">
                <div className="details">
                    <h2>Choose a Team!</h2>
                    <ul>
                        {teams.map(team => (
                            <li key={team.teamAbbrev.default} className="team" onClick={() => selectTeam(team.teamAbbrev.default)}><img className="team-icon" src={team.teamLogo} alt="team logo"></img>{team.teamName.default} ({team.teamAbbrev.default})<span className="arrow"> ↗</span></li>
                        ))}
                    </ul>
                </div>
                <div className="details">
                    <h2>Selected Team</h2>
                    <p>{selectedTeam}</p>
                    <button onClick={() => runSim(selectedTeam)}>Run Simulation</button> {/* Button to run the simulation */}
                </div>
                <div className="details">
                    <h2>Simulation Results</h2>
                    <ul>
                        <li>Wins: {wins}</li>
                        <li>Losses: {losses}</li>
                        {gameResults.map((result, index) => (
                            <li key={index}>
                                Opponent: {result.opponent}, Win Probability: {result.winProbability}%, Result: {result.result}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default StanleyCupSim;