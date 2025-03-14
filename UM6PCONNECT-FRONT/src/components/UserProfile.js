import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams(); // Récupérer l'ID de l'utilisateur depuis l'URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Failed to fetch user:", err));
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <img src={user.profilePic || "/assets/images/default-profile.png"} alt={user.Nom} />
      <h2>{user.Prenom} {user.Nom}</h2>
      <p>{user.Departement}</p>
      <p>{user.Email}</p>
      <p>{user.phone}</p>
      <p>{user.website}</p>
    </div>
  );
};

export default UserProfile;
