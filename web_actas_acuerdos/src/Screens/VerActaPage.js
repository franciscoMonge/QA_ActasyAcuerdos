
import React, { Fragment, useState, useEffect } from 'react';
import logo from '../assets/LogoTEC.png'
import "../Styles/VerActa.css"
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Asegúrate de importar axios si no lo has hecho

function VerActaPage() {
  const [bitacoras, setBitacoras] = useState(''); //Hay que buscarlas
  const [ultimaModif, setUltimaModif] = useState(''); //Hay que buscarlas
  const navigate = useNavigate();
  const location = useLocation();

  // Datos enviados del mainpage
  const id_acta = location?.state?.id;
  const titulo = location?.state?.titulo;
  const fecha = location?.state?.fecha;
  const consecutivo = location?.state?.consecutivo;
  const palabras_clave = location?.state?.palabras_clave;
  const url_archivo = location?.state?.url_archivo;
  const agenda = location?.state?.agenda;

  console.log('Acta Data', id_acta,titulo,fecha,consecutivo,palabras_clave,url_archivo,agenda);

  const handleDescargarArchivo = () => {
    // Codigo para que descargue el archivo
   // Luego, crea un elemento a para el enlace de descarga
   const link = document.createElement('a');
   link.href = url_archivo;
 
   // Establece el nombre del archivo
   if (url_archivo) {
     link.setAttribute('download',url_archivo);
   }
 
   document.body.appendChild(link);
   link.click();
 
   // Limpia el enlace después de la descarga
   document.body.removeChild(link);  
  };
  
  const handleModificar = (id_acta,titulo,fecha,consecutivo,palabras_clave,url_archivo,agenda) =>{
    navigate('/ModificarActa',{state:{id:id_acta, titulo: titulo, fecha: fecha, consecutivo: consecutivo, palabras_clave: palabras_clave,
                                    url_archivo: url_archivo, agenda: agenda}});
};

  const handleVolver = () => {
    // Redirigir a la página de Ver todos los datos(main)
    navigate(`/MainPage`);
  };
 
  useEffect(() => {
    // Llama a la función de API para todas las modificaciones
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/obtener_bitacoras_id', { id_acta });
        console.log(response.data);
        setBitacoras(response.data);
        alert('Se obtuvieron las bitácoras.');
      } catch (err) {
        alert('Error al obtener las bitácoras: ' + err);
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
