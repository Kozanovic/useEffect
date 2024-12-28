import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

export default function App() {
  const [compteur, setCompteur] = useState(0);
  const [nombre, setNombre] = useState(1);
  const [erreuApi, setErreurApi] = useState(false);
  const [etudiant, setEtudiant] = useState([]);
  useEffect(() => {
    console.log("useEffect");
  });
  useEffect(() => {
    axios
      .get("etudiants.json")
      .then((response) => {
        setEtudiant(response.data);
      })
      .catch(() => {
        setErreurApi(true);
      });
  }, []);
  useEffect(() => {
    console.log("useEffect avec une liste de dependence plein");
  }, [compteur]);
  return (
    <div>
      <h1>Compteur</h1>
      <h3>{compteur}</h3>
      <button
        onClick={() => {
          setCompteur(compteur + 1);
        }}
      >
        Incrementer
      </button>
      <h1>Nombre</h1>
      <h3>{nombre}</h3>
      <button
        onClick={() => {
          setNombre(nombre * 2);
        }}
      >
        Doubler
      </button>
      {!erreuApi && (
        <>
          <table border={1}>
            <thead>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Age</th>
              <th>Filière</th>
            </thead>
            <tbody>
              {etudiant.map((et) => (
                <tr key={et.id}>
                  <td>{et.nom}</td>
                  <td>{et.prenom}</td>
                  <td>{et.age}</td>
                  <td>{et.filiere}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {erreuApi && (
        <>
          <h1>Donnée Introvable</h1>
        </>
      )}
    </div>
  );
}
// postman api(recherche)
