import React from "react";
import logo from "../assets/LogoTEC.png"
import "../Styles/StylesMain.css"
import "../Styles/StylesAgregar.css"
function AgregarPage(){
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
                    <h2>Agregar Acta</h2>
                </div>
                <form method="formBuscar">
                    <div className="textBoxMain">
                        <label>Título:</label>
                        <input type="text" required/>
                    </div>
                    <div className="textBoxMain">
                        <label>Palabras claves:</label>
                        <input type="text" required placeholder="Separar las palabras por comas."/>
                    </div>
                    <div className="textBoxMain">
                        <label>Fecha del acta:</label>
                        <div className="dateInputs">
                            <div className="dateInput">
                                <label>Del:</label>
                                <input type="date" required/>
                            </div>
                            <div className="dateInput">
                                <label>Al:</label>
                                <input type="date" required/>
                            </div>
                        </div>
                        <div className="ubicarBtns">
                            <div className="ubicarHorizontal">
                                <button className="btnVolver" type="button">Volver</button>
                            </div>
                            <div className="ubicarHorizontal">
                                <button className="btnConfirmar">Confirmar</button>
                            </div>
                        </div>
                    </div>
                </form>
                
            </div>
        </div>
    );
}
export default AgregarPage;