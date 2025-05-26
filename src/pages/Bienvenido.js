/* Tiktok BryanMQL */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Bienvenido = () => {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleGenerate = () => {
  const mensaje1 = mensaje.slice(0, 18);
  const mensaje2 = mensaje.length > 18 ? mensaje.slice(18, 36) : '';
  const mensaje3 = mensaje.length > 36 ? mensaje.slice(36, 54) : '';
  const mensaje4 = mensaje.length > 54 ? mensaje.slice(54, 72) : '';
  navigate('/carta', { state: { nombre, mensaje1, mensaje2, mensaje3, mensaje4 } });
};

  const handleClear = () => {
    setNombre('');
    setMensaje('');
  };

  return (
  <div className="bienvenido-container">
    <h1 className="bounce-title">
  { "Carta de amor".split('').map((char, i) =>
    char === ' ' ? (
      <span key={i} style={{ display: 'inline-block', width: '0.7em' }}>&nbsp;</span>
    ) : (
      <span
        key={i}
        className="bounce-word"
        style={{ animationDelay: `${i * 0.08}s` }}
      >
        {char}
      </span>
    )
  )}
</h1>
      <form>
  <div className="input-group">
    <label className="input-label" htmlFor="nombre">
      <span className="input-label-text">👤 Ingresar nombre:<br></br></span>
      <input
        id="nombre"
        className="input-field"
        type="text"
        value={nombre}
        placeholder="Ej: Camila"
        autoComplete="off"
        onChange={(e) => {
          let value = e.target.value.replace(/[^A-Za-z]/g, '').slice(0, 10);
          value = value.replace(/([a-z])\1{2,}/gi, '$1$1');
          if (value.length > 0) {
            value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
          }
          setNombre(value);
        }}
      />
    </label>
  </div>
  <div className="input-group">
    <label className="input-label" htmlFor="mensaje">
      <span className="input-label-text">💌 Ingresar mensaje:<br></br></span>
      <textarea
        id="mensaje"
        className="input-field textarea"
        value={mensaje}
        placeholder="Escribe tu mensaje especial..."
        onChange={(e) => {
          let value = e.target.value
            .replace(/[^A-Za-z0-9 .,]/g, '')
            .replace(/ {2,}/g, ' ')
            .replace(/,{2,}/g, ',')
            .replace(/\.{2,}/g, '.')
            .slice(0, 64);
          value = value.replace(/([a-z])\1{2,}/gi, '$1$1');
          if (value.length > 0) {
            value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
          }
          setMensaje(value);
        }}
      />
    </label>
  </div>
  <div className="btn-group-bienvenido">
  <button type="button" className="btn btn-generar" onClick={handleGenerate} disabled={!nombre || !mensaje}>
  Generar
</button>
<button type="button" className="btn btn-limpiar" onClick={handleClear}>
  Limpiar
</button>
</div>
</form>
    </div>
  );
};

export default Bienvenido;
/* Tiktok BryanMQL */