import React from 'react';

function MyProfile() {
  return (
    <div className="is-flex is-justify-content-center" style={{ height: '100vh', backgroundColor: '#f0f0f0' }}>
      <div 
        className="box" 
        style={{
          width: '85%', 
          maxWidth: 'full', 
          height: 'full', 
          boxShadow: 'none', 
          border: '1px solid #d3d3d3', 
          backgroundColor: 'white', // Fond blanc pour la boîte
          marginTop: '20px', // Espace en haut
          position: 'relative'
        }}
      >
        <div
          style={{
            height: '40%', // Prend 40% de la hauteur de la boîte
            backgroundColor: 'transparent', // Fond transparent
            borderBottom: '1px solid #d3d3d3', // Optionnel, pour une bordure entre l'image et le reste de la boîte
            position: 'relative'
          }}
        >
          {/* Icone d'édition en haut à droite */}
          <i 
            className="fas fa-edit" 
            style={{
              position: 'absolute', 
              top: '10px', 
              right: '10px', 
              color: 'red', 
              fontSize: '24px', 
              cursor: 'pointer'
            }}
          ></i>
        </div>
        <div style={{ padding: '20px' }}>
          {/* Tu peux ajouter du contenu ici */}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
