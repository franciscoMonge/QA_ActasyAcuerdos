
import React, { Fragment, useState, useEffect } from 'react';
import logo from '../assets/LogoTEC.png'
import "../Styles/VerActa.css"
      }

      // Llama a la función de API para obtener última modificación
      try {
        const response = await axios.post('http://localhost:3001/obtener_ultima_bitacora', { id_acta });
        console.log(response.data);
        setUltimaModif(response.data);
        alert('Se obtuvo última modificación.');
      } catch (err) {
        alert('Error al obtener última modificación: ' + err);
      }
    };

    fetchData();
  }, [id_acta, titulo, palabras_clave, agenda, fecha]);

  return (
    <div className='page'>
        <div className="navbar">
            <img src={logo} className="logo" alt="Logo"/>
            <div className="navbar-back">
                <ul>
                    <li><a href="#">Salir</a></li>
                </ul>
            </div>
        </div>

        <div className='volver'>
            <button className="btnRegresar" onClick={handleVolver}>
                <span className="btnRegresar-icon">◄</span>
                <span className="btnRegresar-txt"> Volver al Índice de Actas y Acuerdos</span>
            </button>
        </div>

        <div className="container">
            <div className='header'>
                <p className='lblConsecutivo'>Entrada #{id_acta}</p>
                <h1 className="lblTitulo">{titulo}</h1>
                <p className='lblFecha'>Fecha: {fecha}</p>
            </div>

            <p>Palabras claves:</p>
            <p className='lblPalabrasClaves'>{palabras_clave}</p>

            <p className='lblUltimaModif'>Última modificación por: {ultimaModif}</p>
        
            <div className='botones'>
                <button className="btnModificar" onClick={handleModificar}>
                    <img className='btnModificar-icon' width="48" height="48" src="https://img.icons8.com/color/48/signing-a-document.png" alt="signing-a-document"/>
                    <span className="btnModificar-txt">Modificar acta</span>
                </button>

                <button className="btnDescargar" onClick={handleDescargarArchivo}>
                    <img className='btnDescargar-icon' width="48" height="48" src="https://img.icons8.com/color/48/open-document.png" alt="signing-a-document"/>
                    <span className="btnDescargar-txt">Descargar acta</span>
                </button>
            </div>

            
            <div className="historial">
                <p>Historial de modificaciones</p>
                <div className='filaHistorial' id='0'>
                    <span className="filaUsuario">Usuario</span>
                    <span className="filaRegistro">Regsitro</span>
                    <span className="filaFecha">Fecha</span>
                </div>
                <div className='filaHistorial' id='1'>
                    <span className="filaUsuario">Usuario</span>
                    <span className="filaRegistro">Regsitro</span>
                    <span className="filaFecha">Fecha</span>
                </div>
            </div>

            <div className="agendas">
                <p>Agendas del acta</p>
                <div className='filaAgenda' id='0'>
                    <span className="filaUsuarioA">Usuario</span>
                    <span className="filaRegistroA">Regsitro</span>
                    <span className="filaFechaA">Fecha</span>
                </div>
                <div className='filaAgenda' id='1'>
                    <span className="filaUsuarioA">Usuario</span>
                    <span className="filaRegistroA">Regsitro</span>
                    <span className="filaFechaA">Fecha</span>
                </div>
            </div>

        </div>
    </div>
    );
}

export default VerActaPage;
