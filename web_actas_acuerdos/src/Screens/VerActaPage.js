
import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/LogoTEC.png'
import "../Styles/VerActa.css"
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

  // Divide la cadena en palabras individuales utilizando un separador (por ejemplo, una coma)
  const palabras_clave_array = palabras_clave.split(',');

  const fecha_new_format = formatearFecha(new Date(fecha));
  const formatearFecha = (fecha) => {
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const día = fecha.getDate().toString().padStart(2, '0');
    return `${año}-${mes}-${día}`;
  }
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
  
  const handleModificarActa = (id_acta,titulo,fecha,consecutivo,palabras_clave,url_archivo,agenda) =>{
    navigate('/ModificarActa',{state:{id:id_acta, titulo: titulo, fecha: fecha, consecutivo: consecutivo, palabras_clave: palabras_clave,
                                    url_archivo: url_archivo, agenda: agenda}});
};

  const handleVolver = () => {
    // Redirigir a la página de Ver todos los datos(main)
    navigate(`/MainPage`,{});
  };
 
  useEffect(() => {
    // Llama a la función de API para todas las modificaciones
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/obtener_bitacoras_id', { id_acta });
        console.log(response.data);
        setBitacoras(response.data);;
      } catch (err) {
        alert('Error al obtener las bitácoras: ' + err);
      }

      // Llama a la función de API para obtener última modificación
      try {
        const response = await axios.post('http://localhost:3001/obtener_ultima_bitacora', { id_acta });
        console.log(response.data);
        setUltimaModif(response.data);
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
                <p className='lblFecha'>Fecha: {fecha_new_format}</p>
            </div>

            <p>Palabras claves:</p>
            {palabras_clave_array.map((palabra, index) => (
             <p className='lblPalabrasClaves' key={index}>{palabra.trim()}</p>
             ))}

            <p className='lblUltimaModif'>Última modificación por: {ultimaModif}</p>
        
            <div className='botones'>
                <button className="btnModificar" onClick={() => handleModificarActa(id_acta,titulo,fecha,consecutivo,palabras_clave, url_archivo,agenda)}>
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
                {Array.isArray(bitacoras) && bitacoras.map((bitacora, index) => (
                <div className='filaHistorial' key={index}>
                <span className="filaUsuario">{bitacora.updated_by}</span>
                <span className="filaRegistro">{bitacora.tchecksum}</span>
                <span className="filaFecha">{bitacora.fecha}</span>
                </div>
            ))}
            </div>


            <div className="agendas">
                <p>Agendas del acta</p>
                <div>{agenda}</div>
                </div>
            </div>
        </div>
    );
}

export default VerActaPage;
