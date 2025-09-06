import React, { useEffect, useState } from 'react';
import { useNotification } from './NotificationProvider';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
const Users = () => {
  const { showNotification } = useNotification();
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  const fetchUsers = React.useCallback(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setUsers(data.results || data);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [endpoint]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = (e) => {
    e.preventDefault();
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: newName, email: newEmail })
    })
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors de l'ajout");
        setNewName("");
        setNewEmail("");
        setShowForm(false);
        fetchUsers();
        showNotification("Utilisateur ajouté avec succès !", "success");
      })
      .catch(err => showNotification("Erreur: " + err.message, "danger"));
  };

  // Ajoute les handlers manquants
  const handleEdit = (user) => {
    setEditId(user.id);
    setEditName(user.name);
  };

  const handleShowDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 style={{ fontSize: "1.5rem", wordBreak: "break-word" }}>Utilisateurs</h2>
        <button className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: 44, height: 44, fontSize: "1.5rem" }} onClick={() => setShowForm(true)} title="Ajouter">
          <FaPlus />
        </button>
      </div>
      {showForm && (
        <form className="mb-3" onSubmit={handleAddUser}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nom de l'utilisateur"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              required
            />
            <input
              type="email"
              className="form-control ms-2"
              placeholder="Email de l'utilisateur"
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary ms-2">Ajouter</button>
            <button type="button" className="btn btn-outline-secondary ms-2" onClick={() => { setShowForm(false); setNewName(""); setNewEmail(""); }}>Annuler</button>
          </div>
        </form>
      )}
      <div className="table-responsive" style={{ overflowX: "auto" }}>
        <table className="table table-striped" style={{ minWidth: 320 }}>
          <thead>
            <tr>
              <th style={{ minWidth: 100 }}>Nom</th>
              <th style={{ minWidth: 120 }}>Email</th>
              <th style={{ minWidth: 90 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ fontSize: "0.95rem" }}>
                <td style={{ wordBreak: "break-word" }}>{editId === user.id ? (
                  <form onSubmit={e => {
                    e.preventDefault();
                    fetch(endpoint + user.id + '/', {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ name: editName })
                    })
                      .then(res => {
                        if (!res.ok) throw new Error('Erreur lors de la modification');
                        setEditId(null);
                        setEditName("");
                        fetchUsers();
                        showNotification("Utilisateur modifié avec succès !", "success");
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
                ) : user.name}
                </td>
                <td style={{ wordBreak: "break-word" }}>{user.email}</td>
                <td>
                  {editId === user.id ? null : (
                    <>
                      <button className="btn btn-outline-secondary btn-sm rounded-circle me-2" style={{ minWidth: 36, minHeight: 36, padding: 6 }} onClick={() => handleEdit(user)}>
                        <FaEdit />
                      </button>
                      <button className="btn btn-outline-danger btn-sm rounded-circle" style={{ minWidth: 36, minHeight: 36, padding: 6 }} onClick={() => handleShowDeleteModal(user.id)}>
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
                <p>Voulez-vous vraiment supprimer cet utilisateur ?</p>
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
                      fetchUsers();
                      showNotification("Utilisateur supprimé avec succès !", "success");
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

export default Users;
