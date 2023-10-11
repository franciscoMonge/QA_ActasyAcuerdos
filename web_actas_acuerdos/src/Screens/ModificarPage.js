import React, { useState } from "react";
import logo from "../assets/LogoTEC.png"
import "../Styles/StylesMain.css"
import "../Styles/StylesAgregar.css"
import axios from 'axios';

function ModificarPage(){
    const [titulo, setTitulo] = useState('');
    const [keyWords, setKeyWords] = useState('');
    const [agenda, setAgenda] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [archivo, setArchivo] = useState('');
    const [nombreArchivo, setNombreArchivo] = useState('');

    // Función para ajustar el tamaño del textarea según el contenido
    const handleResizeTextarea = (event) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setAgenda(event.target.value);
    };

    const handleConfirmar = async () => {
        const keyWordsTokens = keyWords.split(/,\s*/);
        const datos = {
            id: 1,
            titulo,
            keyWordsTokens,
            agenda,
            fechaDesde,
            fechaHasta
        };

        try{
            const response = await axios.post('http://localhost:3001/modificar_acta', datos);
            console.log(response.data);
            alert("Datos del acta modificados exitosamente.");
        }
        catch(err){
            alert("Error al modificar los datos del acta: ", err);
        }
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
                    <h2>Modificar Acta</h2>
                </div>
                <form method="formBuscar">
                    <div className="textBoxMain">
                        <label>Título:</label>
                        <input type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>
                    <div className="textBoxMain">
                        <label>Palabras claves:</label>
                        <input type="text"
                            placeholder="Separar las palabras por comas."
                            value={keyWords}
                            onChange={(e) => setKeyWords(e.target.value)} 
                        />
                    </div>
                    <div className="textBoxMain">
                        <label>Agenda del acta:</label>
                        <textarea
                            value={agenda}
                            onChange={handleResizeTextarea}
                            rows="3"
                            style={{resize: 'none'}}
                        />
                    </div>
                    <div className="textBoxMain">
                        <label>Fecha del acta:</label>
                        <div className="dateInputs">
                            <div className="dateInput">
                                <label>Del:</label>
                                <input 
                                    type="date"
                                    value={fechaDesde}
                                    onChange={(e) => setFechaDesde(e.target.value)}
                                />
                            </div>
                            <div className="dateInput">
                                <label>Al:</label>
                                <input 
                                    type="date"
                                    value={fechaHasta}
                                    onChange={(e) => setFechaHasta(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="ubicarBtns">
                            <div className="ubicarHorizontal">
                                <button type="button" className="btnVolver">Volver</button>
                            </div>
                            <div className="ubicarHorizontal">
                                <button type="button" className="btnConfirmar" onClick={handleConfirmar}>Confirmar</button>
                            </div>
                        </div>
                    </div>
                </form>
                
            </div>
        </div>
    );
}
export default ModificarPage;