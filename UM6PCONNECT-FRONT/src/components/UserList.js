import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => {
        const activeUsers = data.filter(user => user.Status === "Active");
        setUsers(activeUsers);
      })
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  return (
    <div className="container">
      <h2 className="title">Active Users</h2>
      <div className="users-list">
        {users.map((user) => (
          <div key={user._id} className="box user-card">
            <Link to={`/profile/${user._id}`} className="user-link">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-96x96">
                    <img src={user.profilePicture || "/assets/images/default-profile.png"} alt={user.Nom} className="is-rounded"/>
                  </figure>
                </div>
                <div className="media-content">
                  <h3 className="title is-5">{user.Prenom} {user.Nom}</h3>
                  <p className="subtitle is-6">{user.Departement}</p>
                </div>
                <div className="media-right">
                  <button className="button is-light">Follow</button>

                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
