import React, { useState, useEffect } from "react";
import logo from "../assets/LogoTEC.png"
import "../Styles/StylesMain.css"
import "../Styles/StylesAgregar.css"
import axios from 'axios';

function ModificarPage(){
    const [consecutivo, setConsecutivo] = useState('');
    const [titulo, setTitulo] = useState('');
    const [keyWords, setKeyWords] = useState('');
    const [agenda, setAgenda] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    // Función para ajustar el tamaño del textarea según el contenido
    const handleResizeTextarea = (event) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setAgenda(event.target.value);
    };

    const formatearFecha = (fecha) => {
        const año = fecha.getFullYear();
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const día = fecha.getDate().toString().padStart(2, '0');
        return `${año}-${mes}-${día}`;
    }

    useEffect(() => {
        axios.get('http://localhost:3001/obtener_acta')
        .then(response => {
            console.log();
            setConsecutivo(response.data[0].consecutivo);
            setTitulo(response.data[0].titulo);
            setKeyWords(response.data[0].palabras_clave.palabras_clave.join(", "));
            setAgenda(response.data[0].agenda);
            setFechaDesde(formatearFecha(response.data[0].fecha));
            setFechaHasta(formatearFecha(response.data[0].fecha));
        })
        .catch(error => {
            console.error(error);
        });
      }, []);

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
                        <h3>Consecutivo #{consecutivo}</h3>
                    </div>
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