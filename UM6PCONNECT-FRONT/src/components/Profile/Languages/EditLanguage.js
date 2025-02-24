import React, { useState, useEffect } from "react";

const EditLanguage = ({ data, onClose, fetchLanguages }) => {
  const [name, setName] = useState("");
  const [proficiency, setProficiency] = useState("");

  useEffect(() => {
    if (data) {
      setName(data.name);
      setProficiency(data.proficiency);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/languages/${data._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, proficiency }),
      });
      fetchLanguages();
      onClose();
    } catch (error) {
      console.error("Error updating language:", error);
    }
  };

  return data ? (
    <div>
      <h3>Edit Language</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" value={proficiency} onChange={(e) => setProficiency(e.target.value)} required />
        <button type="submit">Update</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  ) : null;
};

export default EditLanguage;
