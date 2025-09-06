import React, { useEffect, useState } from 'react';
import { useNotification } from './NotificationProvider';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
const Activities = () => {
  // Handlers manquants
  const handleEdit = (activity) => {
    setEditId(activity.id);
    setEditName(activity.name);
  };

  const handleShowDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };
  const { showNotification } = useNotification();
  // Suppression déjà implémentée précédemment
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  const fetchActivities = React.useCallback(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setActivities(data.results || data);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handleAddActivity = (e) => {
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
        fetchActivities();
        showNotification("Activité ajoutée avec succès !", "success");
      })
      .catch(err => showNotification("Erreur: " + err.message, "danger"));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 style={{ fontSize: "1.5rem", wordBreak: "break-word" }}>Activités</h2>
        <button className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: 44, height: 44, fontSize: "1.5rem" }} onClick={() => setShowForm(true)} title="Ajouter">
          <FaPlus />
        </button>
      </div>
      {showForm && (
        <form className="mb-3" onSubmit={handleAddActivity}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nom de l'activité"
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
            {activities.map(activity => (
              <tr key={activity.id} style={{ fontSize: "0.95rem" }}>
                <td style={{ wordBreak: "break-word" }}>{editId === activity.id ? (
                  <form onSubmit={e => {
                    e.preventDefault();
                    fetch(endpoint + activity.id + '/', {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ name: editName })
                    })
                      .then(res => {
                        if (!res.ok) throw new Error('Erreur lors de la modification');
                        setEditId(null);
                        setEditName("");
                        fetchActivities();
                        showNotification("Activité modifiée avec succès !", "success");
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
                ) : activity.name}
                </td>
                <td>
                  {editId === activity.id ? null : (
                    <>
                      <button className="btn btn-outline-secondary btn-sm rounded-circle me-2" style={{ minWidth: 36, minHeight: 36, padding: 6 }} onClick={() => handleEdit(activity)}>
                        <FaEdit />
                      </button>
                      <button className="btn btn-outline-danger btn-sm rounded-circle" style={{ minWidth: 36, minHeight: 36, padding: 6 }} onClick={() => handleShowDeleteModal(activity.id)}>
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
                <p>Voulez-vous vraiment supprimer cette activité ?</p>
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
                      fetchActivities();
                      showNotification("Activité supprimée avec succès !", "success");
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

export default Activities;
