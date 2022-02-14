import React from "react";
import "../../dist/css/style.css";

const RegistrOrAuth = ()=> {
  
    return (
      <form className="AOR">
        <h2 className="AOR">Registration or Authorization</h2>
        <div className="containerAOR">
          <a
            className="AOR"
            onClick={() => {
              document.cookie = "token=registration";
              window.location.reload();
            }}>
            Registration
          </a>
          <a
            className="AOR"
            onClick={() => {
              document.cookie = "token=authorization";
              window.location.reload();
            }}>
            Authorization
          </a>
        </div>
      </form>
    );
}

export default RegistrOrAuth;
