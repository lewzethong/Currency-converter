import React from 'react';
import linkedin_img from "./images/linkedin.svg";
import github_img from "./images/square-github.svg";
import { Link } from "react-router-dom";

const Layout = (props) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link to={'/'} className="navbar-brand flex-fill ps-3">Home</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse flex-row-reverse pe-3" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={'/currencyconverter'} className="nav-link">Currency Converter</Link>
              </li>
              <li className="nav-item">
                <Link to={'/exchangerates'} className="nav-link">ExchangeRates</Link>

              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container app-body">
        {props.children}
      </div>
      <footer className="footer p-2">
        <div className='footer-container d-flex justify-content-between px-2'>
          <div className='footer-intro'>
            project built by Lew Ze Thong
          </div>
          <div>
            <a href="https://www.linkedin.com/in/tdraper-dev/" target="_blank" rel="noreferrer" title="Link to Travis Draper LinkedIn page" className="mx-2 ">
              <img src={linkedin_img} width="25" height="25"></img>
            </a>
            <a href="https://www.linkedin.com/in/tdraper-dev/" target="_blank" rel="noreferrer" title="Link to Travis Draper LinkedIn page" className="mx-2">
              <img src={github_img} width="25" height="25"></img>
            </a>
          </div>
          
          
        </div>
      </footer>
    </>
  );
}

export default Layout;