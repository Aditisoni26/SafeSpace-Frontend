import React, { useState, useEffect ,useContext} from 'react';
import axios from 'axios';
import { AlertContext } from '../context/AlertContext'; 
const AddTrustedContact = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const token = localStorage.getItem("token");
const { showAlert } = useContext(AlertContext);// ✅

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/emergency/trusted-contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(res.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      showAlert("Failed to load contacts");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/emergency/trusted-contacts", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showAlert(res.data.message);
      setFormData({ name: '', phone: '', email: '' });
      fetchContacts();
    } catch (err) {
      console.error("Error adding contact:", err);
      showAlert("Failed to add contact");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/emergency/trusted-contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showAlert(res.data.message);
      fetchContacts();
    } catch (err) {
      console.error("Error deleting contact:", err);
      showAlert("Failed to delete contact");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">👥 Trusted Contacts</h2>

      <form className="card p-4 mb-4" onSubmit={handleAdd}>
        <h5>Add New Trusted Contact</h5>
        <input type="text" name="name" placeholder="Name" className="form-control my-2" required onChange={handleChange} value={formData.name} />
        <input type="tel" name="phone" placeholder="Phone Number" className="form-control my-2" required onChange={handleChange} value={formData.phone} />
        <input type="email" name="email" placeholder="Email (optional)" className="form-control my-2" onChange={handleChange} value={formData.email} />
        <button className="btn btn-primary" type="submit">Add Contact</button>
      </form>

      <h5>Saved Trusted Contacts</h5>
      {contacts.length === 0 ? (
        <p>No contacts added yet.</p>
      ) : (
        <ul className="list-group">
          {contacts.map((c, i) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
              <span>
                <strong>{c.name}</strong> - 📞 {c.phone} {c.email && `- 📧 ${c.email}`}
              </span>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddTrustedContact;
