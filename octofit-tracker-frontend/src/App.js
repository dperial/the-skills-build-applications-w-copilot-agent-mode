import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import logoOctofit from './octofitapp-small.png';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4 rounded">
        <Link className="navbar-brand text-white d-flex align-items-center" to="/">
          <img src={logoOctofit} alt="Octofit Logo" className="logo-octofit" />
          Octofit Tracker
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><Link className="nav-link text-white" to="/activities">Activities</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/leaderboard">Leaderboard</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/teams">Teams</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/users">Users</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/workouts">Workouts</Link></li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/" element={
          <div className="card text-center">
            <div className="card-body">
              <h1 className="card-title">Bienvenue sur Octofit Tracker !</h1>
              <p className="card-text">Suivez vos activités, vos équipes et vos progrès.</p>
              <Link className="btn btn-success" to="/activities">Voir les activités</Link>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;