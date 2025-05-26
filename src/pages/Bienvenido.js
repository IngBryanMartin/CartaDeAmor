/* Tiktok BryanMQL */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


// Función para dividir el mensaje sin cortar palabras
function splitMessageByWords(text, maxLen = 23, maxLines = 4) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (let word of words) {
    // Si agregar la palabra excede el límite, pasa a la siguiente línea
    if ((currentLine + (currentLine ? ' ' : '') + word).length > maxLen) {
      if (lines.length < maxLines) {
        lines.push(currentLine);
        currentLine = word;
      }
    } else {
      currentLine += (currentLine ? ' ' : '') + word;
    }
  }
  if (currentLine && lines.length < maxLines) lines.push(currentLine);

  // Rellena con líneas vacías si faltan
  while (lines.length < maxLines) lines.push('');
  return lines;
}

const Bienvenido = () => {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleGenerate = async () => {
    const [mensaje1, mensaje2, mensaje3, mensaje4] = splitMessageByWords(mensaje, 23, 4);
    
    // Crea la carta en Firestore
  const docRef = await addDoc(collection(db, "cartas"), {
    nombre,
    mensaje1,
    mensaje2,
    mensaje3,
    mensaje4,
    createdAt: serverTimestamp()
  });
  navigate(`/carta/${docRef.id}`);
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
            <span className="input-label-text">👤 Ingresar nombre:<br /></span>
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
            <span className="input-label-text">💌 Ingresar mensaje:<br /></span>
            <textarea
              id="mensaje"
              className="input-field textarea"
              value={mensaje}
              placeholder="Escribe tu mensaje especial..."
              onChange={(e) => {
                let value = e.target.value
                  .replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 .,]/g, '')
                  .replace(/ {2,}/g, ' ')
                  .replace(/,{2,}/g, ',')
                  .replace(/\.{2,}/g, '.')
                  .slice(0, 81);
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