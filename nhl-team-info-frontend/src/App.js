import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Teams from "./components/teams/teams";
import TeamDetails from "./components/TeamDetails/TeamDetails";
import StanleyCupSim from "./components/StanleyCupSim/StanleyCupSim";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

function App() {
  return (
    <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Teams/>} />
          <Route path="/app/teams/" element={<Teams/>} />
          <Route path="/app/teams/:teamId" element={<TeamDetails/>} />
          <Route path="/app/stanley-cup-sim" element={<StanleyCupSim/>} />
        </Routes>
      </PersistGate>
    </Provider>
    </>
  );
}

export default App;
