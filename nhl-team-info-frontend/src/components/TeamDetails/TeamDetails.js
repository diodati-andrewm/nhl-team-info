import { useParams, useNavigate } from 'react-router-dom';
import './TeamDetails.css';
import { useSelector } from 'react-redux';

function TeamDetails() {
    const navigate = useNavigate();
    const { teamId } = useParams();
    const teams = useSelector((state) => state.teams);
    const team = teams.find((team) => team.teamAbbrev.default === teamId);

    const handleBackClick = () => {
        navigate(-1);
    };

    if (!team) return <><button class="back-button" onClick={handleBackClick}>Back to All Teams</button><h1 class="content">Team not found</h1></>;

    return (
        <>
            <button class="back-button" onClick={handleBackClick}>Back to All Teams</button>
            <div class="content">
                <h1>{team.teamName.default}</h1>
                <div class="team-info">
                    <div class="details">
                        <h2>Team Statistics</h2>
                        <h3>Team Overview</h3>
                        <ul>
                            <li>English Team Name: {team.teamName.default}</li>
                            <li>French Team Name: {team.teamName.fr}</li>
                            <li>Conference: {team.conferenceName}</li>
                            <li>Division: {team.divisionName}</li>
                        </ul>
                        <h3>Game Statistics</h3>
                        <ul>
                            <li>Games Played: {team.gamesPlayed}</li>
                            <li>Wins: {team.wins}</li>
                            <li>Losses: {team.losses + team.otLosses}</li>
                            <li>Ties: {team.ties}</li>
                            <li>Home Games: {team.homeGamesPlayed}</li>
                        </ul>
                        <h3>Goal Statistics</h3>
                        <ul>
                            <li>Goals For: {team.goalFor}</li>
                            <li>Goals Against: {team.goalAgainst}</li>
                            <li>Goal Differential: {team.goalDifferential}</li>
                        </ul>
                    </div>
                    <div class="img-area">
                        <img class="team-logo" src={team.teamLogo} alt="team logo"></img>
                    </div>
                </div>
            </div>
        </>
      );
}

export default TeamDetails;