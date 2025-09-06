import React, { useEffect, useState } from 'react';
import { useNotification } from './NotificationProvider';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
const Workouts = () => {
  const { showNotification } = useNotification();
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  const fetchWorkouts = React.useCallback(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setWorkouts(data.results || data);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const handleAddWorkout = (e) => {
    e.preventDefault();
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: newName })
    })
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors de l'ajout");
        setNewName("");
        setShowForm(false);
        fetchWorkouts();
        showNotification("Entraînement ajouté avec succès !", "success");
      })
      .catch(err => showNotification("Erreur: " + err.message, "danger"));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 style={{ fontSize: "1.5rem", wordBreak: "break-word" }}>Entraînements</h2>
        <button className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: 44, height: 44, fontSize: "1.5rem" }} onClick={() => setShowForm(true)} title="Ajouter">
          <FaPlus />
        </button>
      </div>
      {showForm && (
        <form className="mb-3" onSubmit={handleAddWorkout}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nom de l'entraînement"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">Ajouter</button>
            <button type="button" className="btn btn-outline-secondary ms-2" onClick={() => { setShowForm(false); setNewName(""); }}>Annuler</button>
          </div>
        </form>
      )}
      <div className="table-responsive" style={{ overflowX: "auto" }}>
        <table className="table table-striped" style={{ minWidth: 260 }}>
          <thead>
            <tr>
              <th style={{ minWidth: 120 }}>Nom</th>
              <th style={{ minWidth: 90 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map(workout => (
              <tr key={workout.id} style={{ fontSize: "0.95rem" }}>
                <td style={{ wordBreak: "break-word" }}>{editId === workout.id ? (
                  <form onSubmit={e => {
                    e.preventDefault();
                    fetch(endpoint + workout.id + '/', {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ name: editName })
                    })
                      .then(res => {
                        if (!res.ok) throw new Error('Erreur lors de la modification');
                        setEditId(null);
                        setEditName("");
                        fetchWorkouts();
                        showNotification("Entraînement modifié avec succès !", "success");
                      })
                      .catch(err => showNotification('Erreur: ' + err.message, "danger"));
                  }} className="d-inline-flex align-items-center">
                    <input
                      type="text"
                      className="form-control form-control-sm d-inline w-auto"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      required
                    />
                    <button type="submit" className="btn btn-primary btn-sm ms-2">Valider</button>
                    <button type="button" className="btn btn-outline-secondary btn-sm ms-1" onClick={() => { setEditId(null); setEditName(""); }}>Annuler</button>
                  </form>
                ) : workout.name}
                </td>
                <td>
                  {editId === workout.id ? null : (
                    <>
                      <button className="btn btn-outline-secondary btn-sm rounded-circle me-2" style={{ minWidth: 36, minHeight: 36, padding: 6 }} onClick={() => { setEditId(workout.id); setEditName(workout.name); }}>
                        <FaEdit />
                      </button>
                      <button className="btn btn-outline-danger btn-sm rounded-circle" style={{ minWidth: 36, minHeight: 36, padding: 6 }} onClick={() => { setDeleteId(workout.id); setShowDeleteModal(true); }}>
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
                <p>Voulez-vous vraiment supprimer cet entraînement ?</p>
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
                      fetchWorkouts();
                      showNotification("Entraînement supprimé avec succès !", "success");
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

export default Workouts;
