import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Miapi.css";

const MiApi = () => {
  const [leyes, setLeyes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [invertido, setInvertido] = useState(false);

  console.log(leyes);
  const obtenerInfor = async () => {
    try {
      let info = await fetch("https://www.feriadosapp.com/api/laws.json");
      let result = await info.json();
      setLeyes(result.data);
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    obtenerInfor();
  }, []);

  const manejarInversion = () => setInvertido(!invertido);

  const datosMostrados = invertido ? [...leyes].reverse() : leyes;

  return (
    <>
      <input
        type="text"
        style={{ float: "left" }}
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
        }}
        placeholder="Busqueda"
        className="rounded shadow mb-3"
      />

      <select onChange={manejarInversion}
      style={{ float: "right" }}
      className="rounded shadow"
    
      >
        <option value="false">Ley antigua - actual</option>
        <option value="true">Ley actual - antigua</option>
      </select>
      {datosMostrados && datosMostrados.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>Ley</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {datosMostrados
              .filter((ley) =>
                ley.title.toLowerCase().includes(busqueda.toLowerCase())
              )
              .map((ley, index) => (
                <tr key={index}>
                  <td scope="row">{ley.id}</td>
                  <td>{ley.title}</td>
                  <td>{ley.content}</td>
                  <td>
                    <a
                      href={ley.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {ley.link}
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <h2>No existe ley</h2>
      )}
    </>
  );
};

export default MiApi;
