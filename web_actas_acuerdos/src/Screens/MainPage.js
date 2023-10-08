import React from "react";
import logo from "../assets/LogoTEC.png"
import "../Styles/StylesMain.css"
function MainPage(){
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
                        <input type="text" required/>
                    </div>
                    <div className="textBoxMain">
                        <label>Palabras claves:</label>
                        <input type="text" required placeholder="Separar las palabras por comas."/>
                    </div>
                    <div className="textBoxMain">
                        <label>Fecha de emisión:</label>
                        <div className="dateInputs">
                            <div className="dateInput">
                                <label>Desde:</label>
                                <input type="date" required/>
                            </div>
                            <div className="dateInput">
                                <label>Hasta:</label>
                                <input type="date" required/>
                            </div>
                            <div className="dateInput">
                                <button className="btnBuscar">Buscar</button>
                            </div>
                            <div className="dateInput">
                                <button className="btnAgregar" type="button">Agregar acta</button>
                            </div>
                        </div>
                    </div>
                </form>
                
            </div>
        </div>
    );
}
export default MainPage;