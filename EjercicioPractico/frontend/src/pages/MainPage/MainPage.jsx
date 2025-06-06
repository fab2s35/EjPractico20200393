import React from 'react';
import './MainPage.css'; 
import Title from "../../components/Title";

function MainPage() {
    return (
      <>  

<div className="banner-main">
          <div className="banner-gradient" aria-hidden="true"></div>
          <div className="banner-content">
            <div className="announcement">
              <span className="announcement-text">
              Andrea's  <a href="/" className="announcement-link"> Online Courses </a>
              </span>
            </div>
            <div className="text-center">
              <Title title="Andrea's Online Courses" />
              <p className="banner-description">
              Página de gestión del manejo de los cursos dentro del programa de cursos, diseñado para poder vizualizar los cursos, agregarlos, editarlos y eliminiarlos. Permitiendo llevar la mejor gestión posible.
              </p>
              <div className="banner-buttons">
                <a href="/CursosPage" className="btn-primary">Seguir</a>
              </div>
            </div>
          </div>
          <div className="banner-gradient-bottom" aria-hidden="true"></div>
        </div>

      </> 
  );
}

export default MainPage;
