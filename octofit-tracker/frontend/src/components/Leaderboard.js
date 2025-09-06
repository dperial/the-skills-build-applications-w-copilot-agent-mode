import React, { useEffect, useState } from 'react';
import { useNotification } from './NotificationProvider';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
const Leaderboard = () => {
  const { showNotification } = useNotification();
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // Hooks pour édition
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  // Hooks pour ajout
  const [newScore, setNewScore] = useState("");

  // Handler pour ajout d'entrée
  const handleAddEntry = (e) => {
    e.preventDefault();
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, score: newScore })
    })
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors de l\'ajout');
        setNewName("");
        setNewScore("");
        setShowForm(false);
        fetchLeaderboard();
        showNotification("Entrée ajoutée au leaderboard !", "success");
      })
      .catch(err => showNotification('Erreur: ' + err.message, "danger"));
  };
  const [leaderboard, setLeaderboard] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  const fetchLeaderboard = React.useCallback(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setLeaderboard(data.results || data);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return (
    <div className="container mt-4">
         <div className="d-flex align-items-center justify-content-between mb-3">
           <h2 style={{ fontSize: "1.5rem", wordBreak: "break-word" }}>Leaderboard</h2>
           <button className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: 44, height: 44, fontSize: "1.5rem" }} onClick={() => setShowForm(true)} title="Ajouter">
             <FaPlus />
           </button>
         </div>
      <div className="table-responsive" style={{ overflowX: "auto" }}>
        <table className="table table-striped" style={{ minWidth: 320 }}>
          <thead>
            <tr>
              <th style={{ minWidth: 100 }}>Nom</th>
              <th style={{ minWidth: 80 }}>Score</th>
              <th style={{ minWidth: 90 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(entry => (
              <tr key={entry.id} style={{ fontSize: "0.95rem" }}>
                <td style={{ wordBreak: "break-word" }}>{entry.name}</td>
                <td style={{ wordBreak: "break-word" }}>{entry.score}</td>
                <td>
                  <button className="btn btn-outline-secondary btn-sm rounded-circle me-2" style={{ minWidth: 36, minHeight: 36, padding: 6 }} onClick={() => { setEditId(entry.id); setEditName(entry.name); }}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-outline-danger btn-sm rounded-circle" style={{ minWidth: 36, minHeight: 36, padding: 6 }} onClick={() => { setDeleteId(entry.id); setShowDeleteModal(true); }}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
         {showForm && (
          <form className="mb-3" onSubmit={handleAddEntry}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nom de l'entrée"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                required
              />
              <input
                type="number"
                className="form-control ms-2"
                placeholder="Score"
                value={newScore}
                onChange={e => setNewScore(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary ms-2">Ajouter</button>
              <button type="button" className="btn btn-outline-secondary ms-2" onClick={() => { setShowForm(false); setNewName(""); setNewScore(""); }}>Annuler</button>
            </div>
          </form>
        )}
      {/* Modal de confirmation de suppression */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmer la suppression</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Voulez-vous vraiment supprimer cette entrée du leaderboard ?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Annuler</button>
                <button type="button" className="btn btn-danger" onClick={() => {
                  fetch(endpoint + deleteId + '/', {
                    method: 'DELETE'
                  })
                    .then(res => {
                      if (!res.ok) throw new Error('Erreur lors de la suppression');
                      setShowDeleteModal(false);
                      setDeleteId(null);
                      fetchLeaderboard();
                      showNotification("Entrée supprimée du leaderboard !", "success");
                    })
                    .catch(err => showNotification('Erreur: ' + err.message, "danger"));
                }}>Confirmer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
