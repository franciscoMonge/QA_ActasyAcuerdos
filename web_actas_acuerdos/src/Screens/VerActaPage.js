import React, { Fragment } from 'react';
import logo from '../assets/LogoTEC.png'
import "../Styles/VerActa.css"

export function VerActaPage(id_acta){
    // Acá se ponen las variables de esa ventana
    const [titulo, setTitulo] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [palabrasClave, setpalabrasClave] = useState('');
    const [ultimaModif, setultimaModif] = useState('');
    const [agenda, setAgenda] = useState('');
    const [modificaciones, setModificaciones] = useState('');//valorar text area o n registros
    const [archivo, setArchivo] = useState('');

    //Funcion para obtener datos de la Base de Datos
    useEffect(() => {
        // Verifica si tienes el ID del acta antes de realizar la solicitud a la API.
        if (id_acta) {
          fetch(`/api/obtener_info_acta/${id_acta}`) //Cambiar por la dirección adecuada
            .then((response) => {
              if (!response.ok) {
                throw new Error('No se puede encontrar información.');
              }
              return response.json();
            })
            .then((actaData) => {
                // Accede a los campos del objeto "data"
                const titulo = actaData.titulo;
                const fechaDesde = actaData.fecha;
                const palabrasClave = actaData.palabras_clave;
                const archivo = actaData.url_archivo;
                const agenda = actaData.agenda;
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }, [id_acta]);   
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
            <button className="btnRegresar">
                <span className="btnRegresar-icon">◄</span>
                <span className="btnRegresar-txt"> Volver al Índice de Actas y Acuerdos</span>
            </button>
        </div>

        <div className="container">
            <div className='header'>
                <p className='lblConsecutivo'>Entrada #X</p>
                <h1 className='lblTitulo'>Título del acta - Fecha o fechas</h1>
            </div>

            <p>Palabras claves:</p>
            <p className='lblPalabrasClaves'>
                Lorem, ipsum, dolor, sit, amet, consectetur, adipiscing, elit, sed, eiusmod
            </p>

            <p className='lblUltimaModif'>Última modificación por: Usuario</p>
        
            <div className='botones'>
                <button className="btnModificar">
                    <img className='btnModificar-icon' width="48" height="48" src="https://img.icons8.com/color/48/signing-a-document.png" alt="signing-a-document"/>
                    <span className="btnModificar-txt">Modificar acta</span>
                </button>

                <button className="btnDescargar">
                    <img className='btnDescargar-icon' width="48" height="48" src="https://img.icons8.com/color/48/open-document.png" alt="signing-a-document"/>
                    <span className="btnDescargar-txt">Modificar acta</span>
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

        </div>
    </div>
    )
}

export default VerActaPage