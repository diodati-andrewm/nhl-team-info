import React, { useEffect} from 'react';
import './teams.css';
import { useNavigate } from 'react-router-dom';
import {urlConfig} from '../../config';
import { useSelector, useDispatch } from 'react-redux';
import { setTeams, setLoading } from '../../teamsSlice';

function Teams() {
    const navigate = useNavigate();
    const { teams, loading } = useSelector((state) => state);
    const dispatch = useDispatch();
    

    useEffect(() => {
      // fetch all teams
      const fetchTeams = async () => {
          try {
              let url = `${urlConfig.backendUrl}/api/teams`;
              const response = await fetch(url);
              if (!response.ok) {
                  throw new Error(`HTTP error; ${response.status}`)
              }
              const data = await response.json();
              if(data) {
                dispatch(setTeams(data));
              }
          } catch (error) {
              console.log('Fetch error: ' + error.message);
          } finally {
            dispatch(setLoading(false));
          }
      };

      fetchTeams();
  }, [dispatch]);

  const goToDetailsPage = (teamId) => {
    navigate(`/app/teams/${teamId}`); 
  }; 
  

  if (loading) {
      return <h1>Loading...</h1>;
  } else {
      let metro = [], atlantic = [], central = [], pacific = [];
      // TODO: more elegant implementation than a series of if statements
      for(var i=0; i<teams.length; i++) {
        if(teams[i].divisionName === "Metropolitan") {
          metro.push(teams[i]);
        }
        else if(teams[i].divisionName === "Atlantic") {
          atlantic.push(teams[i]);
        }
        else if(teams[i].divisionName === "Central") {
          central.push(teams[i]);
        }
        else if(teams[i].divisionName === "Pacific") {
          pacific.push(teams[i]);
        }
        else {
          console.error("Unknown division: " + teams[i].divisionName);
        }
      }
      return (
        <>
          <h1>NHL Teams</h1>
          <div class="conferences">
            <div class="eastern">
              <h2>Eastern Conference</h2>
              <h3>Metropolitan Division</h3>
              <ul>
                {metro.map(team => (
                    <li key={team.teamAbbrev.default} class="team" onClick={() => goToDetailsPage(team.teamAbbrev.default)}><img class="team-icon" src={team.teamLogo} alt="team logo"></img>{team.teamName.default} ({team.teamAbbrev.default})<span class="arrow"> ↗</span></li>
                ))}
              </ul>
              <h3>Atlantic Divison</h3>
              <ul>
                {atlantic.map(team => (
                    <li key={team.teamAbbrev.default} class="team" onClick={() => goToDetailsPage(team.teamAbbrev.default)}><img class="team-icon" src={team.teamLogo} alt="team logo"></img>{team.teamName.default} ({team.teamAbbrev.default})<span class="arrow"> ↗</span></li>
                ))}
              </ul>
            </div>
            <div class="western">
              <h2>Western Conference</h2>
                <h3>Central Division</h3>
                <ul>
                  {central.map(team => (
                    <li key={team.teamAbbrev.default} class="team" onClick={() => goToDetailsPage(team.teamAbbrev.default)}><img class="team-icon" src={team.teamLogo} alt="team logo"></img>{team.teamName.default} ({team.teamAbbrev.default})<span class="arrow"> ↗</span></li>
                  ))}
                </ul>
                
                <h3>Pacific Division</h3>
                <ul>
                {pacific.map(team => (
                  <li key={team.teamAbbrev.default} class="team" onClick={() => goToDetailsPage(team.teamAbbrev.default)}><img class="team-icon" src={team.teamLogo} alt="team logo"></img>{team.teamName.default} ({team.teamAbbrev.default})<span class="arrow"> ↗</span></li>
                ))}
                </ul>
            </div>
          </div>
        </>
      );
  }
}

export default Teams;