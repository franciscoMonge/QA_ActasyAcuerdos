import React from "react";
import logo from "../assets/LogoTEC.png"
import "../Styles/StylesLogin.css"
function LoginPage(){
    return(
        <div className="banner">
            <div className="navbar">
                <img src={logo} className="logo" alt="Logo"/>
                <div className="navbar-back">
                    <ul>
                        <li><a href="#">Salir</a></li>
                    </ul>
                </div>
            </div>
            <div className="header">
                <h1>Índice de Actas y Acuerdos</h1>
            </div>
            <div className="box">
                <div className="header2">
                    <h2>Iniciar Sesión</h2>
                </div>
                <form method="formulario">
                    <div className="textBox">
                        <input type="text" required/>
                        <span></span>
                        <label>Dirección de correo electrónico</label>
                    </div>
                    <div className="textBox">
                        <input type="password" required/>
                        <span></span>
                        <label>Contraseña</label>
                    </div>
                    <button className="submit">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
}
export default LoginPage;