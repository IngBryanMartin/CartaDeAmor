/* Tiktok BryanMQL */
import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Carta = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const envelopeRef = useRef(null);

const { nombre, mensaje1, mensaje2, mensaje3, mensaje4 } = location.state || {};


  if (!nombre || !mensaje1) {
  navigate('/');
  return null;
}

  const openEnvelope = () => {
    if (envelopeRef.current) {
      envelopeRef.current.classList.add('open');
      envelopeRef.current.classList.remove('close');
    }
  };

  const closeEnvelope = () => {
    if (envelopeRef.current) {
      envelopeRef.current.classList.add('close');
      envelopeRef.current.classList.remove('open');
    }
  };

  return (
    <div>
      <div className="envlope-wrapper">
        <div
          id="envelope"
          className="close"
          ref={envelopeRef}
          onClick={openEnvelope}
        >
          <div className="front flap"></div>
          <div className="front pocket"></div>
          <div className="letter">
            <div className="words line1">Para:♡{nombre}♡</div>
            <div className="words line2">{mensaje1}</div>
            <div className="words line3">{mensaje2}</div>
            <div className="words line4">{mensaje3}</div>
            <div className="words line5">{mensaje4}</div>
          </div>
          <div className="hearts">
            <div className="heart a1"></div>
            <div className="heart a2"></div>
            <div className="heart a3"></div>
          </div>
        </div>
      </div>
      <div className="reset">
        <button id="open" onClick={openEnvelope}>Open</button>
        <button id="reset" onClick={closeEnvelope}>Close</button>
      </div>
    </div>
  );
};

export default Carta;
/* Tiktok BryanMQL */