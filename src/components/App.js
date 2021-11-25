
// import '../styles/Reset.scss';
import '../styles/App.scss';
import initialData from '../data/knit.json'
// importamos useEffect además de useState
import { useState } from 'react';

function App() {

  const [data, setData] = useState(initialData);
  const [name, setName] = useState("");
  const [oneBoolean, setOneBoolean] = useState(false);
  const [twoBoolean, setTwoBoolean] = useState(false);
  const [toDelete, setToDelete] = useState("");

  const handleName = (ev) => {
    setName(ev.target.value)
  };

  //Recogemos el valor de los Checked
  const handleOneBoolean = (ev) => {
    setOneBoolean(ev.target.checked)
    console.log('oneBoolean', oneBoolean);
  };

  const handleTwoBoolean = (ev) => {
    setTwoBoolean(ev.target.checked)
    console.log('twoBoolean', twoBoolean);
  };

  //Añadimos la función que creará un nuevo objeto y recogerá los datos introducidos por la usuaria y 
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const newClub = {
      "name": name,
      "oneBoolean": oneBoolean,
      "twoBoolean": twoBoolean
    };
    //añadimos con el spread nuevos datos
    setData([...data, newClub])
  };

  const handleReset = (ev) => {
    ev.preventDefault();
    setOneBoolean(false);
    setTwoBoolean(false);
    setName("");
  };

  const handleDelete = (ev) => {
    setToDelete(ev.target.id);
    data.splice(toDelete, 1);
    setData([...data]);
  };

  const renderClubList = () => {
    return data.map((club, index) => {
      const oneBoolean = club.oneBoolean ? 'Si' : 'No';
      const twoBoolean = club.twoBoolean ? 'Si' : 'No';
      return (
        <li className="club" key={index} id={index}>
          <h3>{club.name}</h3>
          <button onClick={handleDelete}>X</button>
          <p>Encargo : {oneBoolean}</p>
          <p>Fecha de entrega : {twoBoolean}</p>
        </li>
      )
    }
    )
  };

  return (
    <div className="App">
      <header>
        <h1>Knit projects</h1>
        <form>
          <select name="show" id="show">
            <option value="all">Todos</option>
            <option value="oneBoolean">Encargos</option>
            <option value="twoBoolean">Fecha de Entrega</option>
          </select>
        </form>
      </header>
      <main>
        <ul>{renderClubList()}
        </ul>
        <footer className="footer">
          <h2 className="footer_title">Añadir un nuevo Proyecto</h2>
          <form className="footer__form">
            <input className="footer__form--input" type="text" placeholder="Nombre del proyecto" value={name} onChange={handleName} />
            <label className="footer__form--label" htmlFor="oneBoolean"> ¿Encargo?</label>
            <input className="footer__form--input" type="checkbox" checked={oneBoolean} onChange={handleOneBoolean} />
            <label className="footer__form--label" htmlFor="twoBoolean"> ¿fecha concreta de entrega?</label>
            <input className="footer__form--input" type="checkbox" checked={twoBoolean} onChange={handleTwoBoolean} />
            <input className="footer__form--input" type="submit" value="Añadir un nuevo proyecto" onClick={handleSubmit} />
            <input className="footer__form--input" type="button" value="Reset" onClick={handleReset} />
          </form>
        </footer>
      </main>

    </div>
  );
}

export default App;
