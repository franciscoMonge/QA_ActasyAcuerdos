import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/LogoTEC.png"
import "../Styles/StylesMain.css"
import "../Styles/StylesAgregar.css"
import axios from 'axios';

function ModificarPage(){
    const [consecutivo, setConsecutivo] = useState('');
    const [titulo, setTitulo] = useState('');
    const [keyWords, setKeyWords] = useState('');
    const [agenda, setAgenda] = useState('');
    const [fecha, setFecha] = useState('');

    const location = useLocation();

    const formatearFecha = (argFecha) => {
        const anno = argFecha.getFullYear();
        const mes = (argFecha.getMonth() + 1).toString().padStart(2, '0');
        const dia = argFecha.getDate().toString().padStart(2, '0');
        return `${anno}-${mes}-${dia}`;
    }

    // Datos enviados del mainpage

    const pId = location?.state?.id;
    const pTitulo = location?.state?.titulo;
    const pFecha = formatearFecha(new Date(location?.state?.fecha));
    const pConsecutivo = location?.state?.consecutivo;
    const pPalabras_clave = location?.state?.palabras_clave;
    const pUrlArchivo = location?.state?.url_archivo;
    const pAgenda = location?.state?.agenda;


    // Función para ajustar el tamaño del textarea según el contenido
    const handleResizeTextarea = (event) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setAgenda(event.target.value);
    };

    useEffect(() => {
        setConsecutivo(pConsecutivo);
        setTitulo(pTitulo);
        setKeyWords(pPalabras_clave);
        setAgenda(pAgenda);
        setFecha(pFecha);
      }, []);

    const validarEspacios = () => {
        return titulo.trim() && keyWords.trim() && (isNaN(fecha) || typeof fecha !== 'object' || fecha.constructor !== Date);
    }

    const handleConfirmar = async () => {
        if(validarEspacios()){
            const keyWordsTokens = keyWords.split(/,\s*/);
            const datos = {
                id: pId,
                titulo: pTitulo,
                keyWordsTokens: pPalabras_clave,
                agenda: pAgenda,
                fecha: pFecha,
            };
    
            try{
                const response = await axios.post('http://localhost:3001/modificar_acta', datos);
                console.log(response.data);
                alert("Datos del acta modificados exitosamente.");
            }
            catch(err){
                alert("Error al modificar los datos del acta: ", err);
            }
        }else{
            alert("Ha dejado espacios obligatorios en blanco ")
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
                        <label>Título (obligatorio):</label>
                        <input type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>
                    <div className="textBoxMain">
                        <label>Palabras claves (obligatorio):</label>
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
                        <label>Fecha del acta (obligatorio):</label>
                        <div className="dateInputs">
                            <div className="dateInput">
                                <input 
                                    type="date"
                                    value={fecha}
                                    onChange={(e) => setFecha(e.target.value)}
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