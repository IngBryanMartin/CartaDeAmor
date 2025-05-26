/* Tiktok BryanMQL */
import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";

const Carta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const envelopeRef = useRef(null);
  const [carta, setCarta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchCarta = async () => {
    if (!id) {
      navigate('/');
      return;
    }
    const docSnap = await getDoc(doc(db, "cartas", id));
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Verifica expiración (12 horas)
      const createdAt = data.createdAt?.toDate ? data.createdAt.toDate() : null;
      if (createdAt) {
        const now = new Date();
        const diff = (now - createdAt) / (1000 * 60 * 60); // horas
        if (diff > 12) {
          setCarta(null); // Carta expirada
          setLoading(false);
          return;
        }
      }
      setCarta(data);
    } else {
      setCarta(null);
    }
    setLoading(false);
  };
  fetchCarta();
}, [id, navigate]);

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

  if (loading) return <div>Cargando carta...</div>;
  if (!carta) return <div>Carta no encontrada o expirada.</div>;

  const { nombre, mensaje1, mensaje2, mensaje3, mensaje4 } = carta;

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