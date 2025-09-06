import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App bg-light min-vh-100">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={require('./octofitapp-small.png')} alt="logo" width="40" height="40" className="d-inline-block align-top me-2" />
              Octofit Tracker
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><Link className="nav-link" to="/activities">Activités</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/leaderboard">Classement</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/teams">Équipes</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/users">Utilisateurs</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/workouts">Entraînements</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <main className="container">
          <Routes>
            <Route path="/activities" element={<><h2 className="mb-3 text-primary">Activités</h2><Activities /></>} />
            <Route path="/leaderboard" element={<><h2 className="mb-3 text-success">Classement</h2><Leaderboard /></>} />
            <Route path="/teams" element={<><h2 className="mb-3 text-info">Équipes</h2><Teams /></>} />
            <Route path="/users" element={<><h2 className="mb-3 text-warning">Utilisateurs</h2><Users /></>} />
            <Route path="/workouts" element={<><h2 className="mb-3 text-danger">Entraînements</h2><Workouts /></>} />
            <Route path="/" element={<div className="text-center py-5"><h1>Bienvenue sur Octofit Tracker</h1><p>Sélectionnez une section dans le menu pour commencer.</p></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
