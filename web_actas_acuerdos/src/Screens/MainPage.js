import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/LogoTEC.png"
import "../Styles/StylesMain.css"
import axios from 'axios';
function MainPage(){

    const navigate = useNavigate();
    const location = useLocation();

    // En esta se almacenan todas las actas en una lista
    const [actas, setActas] = useState([]);

    // En estas se almacenan aquellos datos para filtrar la búsqueda
    const [titulo, setTitulo] = useState("");
    const [keyWords, setKeyWords] = useState("");
    const [fechaDesde, setFechaDesde] = useState("");
    const [fechaHasta, setFechaHasta] = useState("");
    const [codigo, setCodigo] = useState("");


    // Carga todas las actas de la BD en la lista "actas" 
    useEffect(() =>{
        axios.get('http://localhost:3001/actas')
        .then(response =>{
            console.log('nuevo EFFECT');
            setActas(response.data);
        })
        .catch(error => {
            console.log('ERROR: Carga Fallida de Actas', error);
        });
    }, []);

    useEffect(() => {
        // Este se ejecuta cuando actas cambie
        console.log('actas actualizadas:', actas);
        //console.log('keywords: ', actas[0].palabras_clave)
    }, [actas]);


    // Función para eliminar acentos y convertir minusculas para el filtro de titulos
    const normalizeString = (str) => {
        return str
          .normalize("NFD") // Normalizar la cadena a caracteres descompuestos
          .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
          .toLowerCase();
      };


    const filtrarActas = () => {
        if (titulo === "" && keyWords === "" && (fechaDesde === "" || fechaHasta === "")) {
          return actas; // Mostrar la lista original si todos los filtros están vacíos
        }
      
        const palabrasClavesFiltroList = keyWords.split(",").map((clave) => clave.trim());
        
        return actas.filter((acta) => {
          const tituloCoincide = titulo === "" || normalizeString(acta.titulo).includes(normalizeString(titulo));
      
          const palabrasClavesCoinciden =
            keyWords === "" ||
            palabrasClavesFiltroList.every((clave) => acta.palabras_clave.includes(clave));
      
          if (fechaDesde && fechaHasta) {


            const localDateString = fechaDesde.replace(/Z$/, '');
            const fechaDesdeObj = new Date(localDateString);
            const fechaHastaObj = new Date(fechaHasta);
            const fechaActaObj = new Date(acta.fecha);
      
            const formattedFechaDesde = formatDateToYYYYMMDD(fechaDesdeObj);
            const formattedFechaHasta = formatDateToYYYYMMDD(fechaHastaObj);
            const formattedFechaActa = formatDateToYYYYMMDD(fechaActaObj);

            console.log('1 :', formattedFechaActa);
            console.log('2 :', fechaDesdeObj);
            console.log('3 :', fechaDesde);
      
            // Comprueba si la fecha de la acta está dentro del rango
            if (formattedFechaActa >= formattedFechaDesde && formattedFechaActa <= formattedFechaHasta) {
                console.log('aqui1')
              return tituloCoincide && palabrasClavesCoinciden;
            }
          } else {
            console.log('aqui2')
            return tituloCoincide && palabrasClavesCoinciden;
          }
          console.log('aqui3')
          return false;
        });
      };

    const handleAgregarActa = () =>{
        navigate('/AgregarActa',{});
    };

    const handleVerDetalle = (id,titulo,fecha,consecutivo,palabras_clave,url_archivo,agenda) =>{
        navigate('/VerDetalle',{state:{id:id, titulo: titulo, fecha: fecha, consecutivo: consecutivo, palabras_clave: palabras_clave,
                                        url_archivo: url_archivo, agenda: agenda}});
    };



    function formatDateToYYYYMMDD(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Suma 1 al mes
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    return(
        <div className="bannerMain">
            <div className="navbar">
                <img src={logo} className="logo" alt="Logo"/>
                <div className="navbar-back">
                    <ul>
                        <li><a href="#">Salir</a></li>
                    </ul>
                </div>
            </div>
            <div className="box1">   
                <div className="header2">
                    <h2 tabIndex='0'>Buscar Acta</h2>
                </div>
                <form method="formBuscar">
                    <div className="textBoxMain">
                        <label tabIndex='0'>Título:</label>
                        <input type="text" required onChange={(event)=>{setTitulo(event.target.value)}}/>
                    </div>
                    <div className="textBoxMain">
                        <label tabIndex='0'>Palabras claves:</label>
                        <input type="text" required placeholder="Separar las palabras por comas." aria-label="Separar las palabras por comas"
                            onChange={(event)=>{setKeyWords(event.target.value)}}/>
                    </div>
                    <div className="textBoxMain">
                        <label tabIndex='0' >Fecha de emisión:</label>
                        <div className="dateInputs">
                            <div>
                                <label tabIndex='0'>Desde:</label>
                                <input  id="fechaInput" placeholder="dd/mes/año" type="date" onChange={(e)=>{setFechaDesde(e.target.value)}}/>
                            </div>
                            <div>
                                <label tabIndex='0' style={{marginLeft:'10px'}}>Hasta:</label>
                                <input id="fechaInput" style={{marginLeft:'10px'}} placeholder="dd/mes/año" type="date" onChange={(e)=>{setFechaHasta(e.target.value)}}/>
                            </div>
                            
                            <div>
                                <button style={{marginTop:'19px', marginLeft:'20px'}} className="btnAgregar" type="button" onClick={handleAgregarActa}>Agregar acta</button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="table_section">
                <table className="tableActas">
                    <tbody>
                        {filtrarActas().map((acta,index)=>(
                            <tr key={index}>
                                <td tabIndex='0'>{acta.consecutivo}</td>
                                <td tabIndex='0'>{acta.titulo}</td>
                                <td tabIndex='0'>{acta.fecha}</td>
                                <td><button onClick={() => handleVerDetalle(acta.id,acta.titulo,acta.fecha,acta.consecutivo,acta.palabras_clave,
                                    acta.url_archivo,acta.agenda)}>Ver Detalle</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
}
export default MainPage;