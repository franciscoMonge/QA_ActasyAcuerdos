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
    const [keyWords, setKeyWords] = useState([]);
    const [fechaDesde, setFechaDesde] = useState("");
    const [fechaHasta, setFechaHasta] = useState("");
    const [codigo, setCodigo] = useState("");


    // Carga todas las actas de la BD en la lista "actas"
    useEffect(() => {
        const fetchData = async () => {
            const datos = { codigo, titulo};
            try {
                const response = await axios.get('http://localhost:3001/actas', { params: datos });
                console.log(response.data);
                setActas(response.data);
                console.log('actas:', actas);
            } catch (error) {
                console.log('ERROR: Carga Fallida de Actas', error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        // Este se ejecuta cuando actas cambie
        console.log('actas actualizadas:', actas);
        //console.log('kewwords: ', actas[0].palabras_clave)
    }, [actas]);

    const handleBuscar = () =>{
        //console.log('estoooo: ',filtrarActas())
        console.log('keywrods :', keyWords)

        const cadena = ["1","2","7"];
        
        const array= [{titulo:"okk", nums:["1","2","3"]}, {titulo:"hola",nums:["2", "5", "7"]},{titulo:"adios",nums:["77","22","54"]}];
        const x = "hola"

        const diosayudame = () => {
            return array.filter((obj) => {
              const tituloCoincide = obj.titulo.includes(x);
              let banderaKeywords = false;
          
              cadena.forEach((e) => {
                const coincide = obj.nums.includes(e);
                if (coincide) {
                  banderaKeywords = true;
                }
              });
          
              if (tituloCoincide && banderaKeywords) {
                // Filtrar por coincidencia en título y palabras clave
                return true;
              } else if (tituloCoincide) {
                // Filtrar solo por coincidencia en título
                //banderaTitulo = true;
                return true;
              } else if (banderaKeywords) {
                // Filtrar solo por coincidencia en palabras clave
                return true;
              }
              console.log('final')
              return false;
            });
        };
        
        console.log('PROBANDO OK :', diosayudame())

    };

    // Función para eliminar acentos y convertir minusculas para el filtro de titulos
    const normalizeString = (str) => {
        return str
          .normalize("NFD") // Normalizar la cadena a caracteres descompuestos
          .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
          .toLowerCase();
      };

    const filtrarActas = () => {
        return actas.filter((acta) => {
            const tituloCoincide = normalizeString(acta.titulo).includes(normalizeString(titulo));
            let banderaKeywords = false;

            keyWords.forEach((elemento) => {
                const coincide = acta.palabras_clave.includes(elemento);
                if(coincide){
                    banderaKeywords = true;
                    //console.log('pasa por aqui', banderaKeywords)
                }
            });
            //console.log('pasa por aqui222222', banderaKeywords, acta.palabras_clave)
            if (tituloCoincide && banderaKeywords) {
                // Filtrar por coincidencia en título y palabras clave
                console.log('Esta entrando aqui 1')
                return true;
              } else if (tituloCoincide) {
                // Filtrar solo por coincidencia en título
                console.log('Esta entrando aqui 2')
                return true;
              } else if (banderaKeywords) {
                // Filtrar solo por coincidencia en palabras clave
                console.log('Esta entrando aqui 3')
                return true;
              }
            console.log('final')
            return false;
        });
      };

    const handleAgregarActa = () =>{
        navigate('/AgregarActa',{});
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
                    <h2>Buscar Acta</h2>
                </div>
                <form method="formBuscar">
                    <div className="textBoxMain">
                        <label>Título:</label>
                        <input type="text" required onChange={(event)=>{setTitulo(event.target.value)}}/>
                    </div>
                    <div className="textBoxMain">
                        <label>Palabras claves:</label>
                        <input type="text" required placeholder="Separar las palabras por comas."
                            onChange={(event)=>{const keywords = event.target.value.split(',').map(keyword => keyword.trim());
                            setKeyWords(keywords);}}/>
                    </div>
                    <div className="textBoxMain">
                        <label>Fecha de emisión:</label>
                        <div className="dateInputs">
                            <div className="dateInput">
                                <label>Desde:</label>
                                <input type="date" required onChange={(event)=>{setFechaDesde(event.target.value)}}/>
                            </div>
                            <div className="dateInput">
                                <label>Hasta:</label>
                                <input type="date" required onChange={(event)=>{setFechaHasta(event.target.value)}}/>
                            </div>
                            <div className="dateInput">
                                <button type="button" className="btnBuscar" onClick={handleBuscar}>Buscar</button>
                            </div>
                            <div className="dateInput">
                                <button className="btnAgregar" type="button" onClick={handleAgregarActa}>Agregar acta</button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="table_section">
                <table className="tableActas">
                    <tbody>
                        {filtrarActas().map((acta,index)=>(
                            <tr key={index}>
                                <td>{acta.consecutivo}</td>
                                <td>{acta.titulo}</td>
                                <td>{acta.fecha}</td>
                                <td><button>Ver Detalle</button></td>
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