import React, { useState, useEffect } from "react";
import './App.css';

const App = () => {
  //data
  const [data, setData] = useState([
    { id: 1, name: 'Pain', qte: 0, check: true, uni: "grammes" },
    { id: 2, name: 'Viande', qte: 0, check: false, uni: "grammes" },
    { id: 3, name: 'Legumes', qte: 0, check: false, uni: "grammes" },
    { id: 4, name: 'Banane', qte: 0, check: false, uni: "unites" },
    { id: 5, name: 'Pomme', qte: 0, check: false, uni: "unites" },
    { id: 6, name: 'Yaourt', qte: 0, check: false, uni: "unites" },
  ]);
  const [Message, setMessage] = useState('');

  //change value Qte
  const HandChangeValue = (event) => {
    const { name, value } = event.target;
    setData([...data.map(ele => ele.name === name ? { ...ele, qte: parseInt(value) } : { ...ele })])
  }

  //checkbox
  const handChangeCheck = (event) => {
    const { value } = event.target;
    setData([...data.map(obj => obj.id === parseInt(value) ? { ...obj, check: !obj.check } : { ...obj })]);
    // console.log(typeof value)
  }

  //validation
  const valid = () => {
    if (data.filter(ele => ele.check === true).length !== 0) {
      var kilo = 0;
      if (data[0].name === 'Pain' && data[0].check === true) kilo += (data[0].qte * 2.75);
      if (data[1].name === 'Viande' && data[1].check === true) kilo += (data[1].qte * 1.8);
      if (data[2].name === 'Legumes' && data[2].check === true) kilo += (data[2].qte * 0.4);
      if (data[3].name === 'Banane' && data[3].check === true) kilo += (data[3].qte * 116);
      if (data[4].name === 'Pomme' && data[4].check === true) kilo += (data[4].qte * 80);
      if (data[5].name === 'Yaourt' && data[5].check === true) kilo += (data[5].qte * 140);
      setMessage('La valeur energetique de votre repas est  ' + kilo + '  kilo calories')
    } else {
      setMessage('au moins cocher une case')
    }
  }
  
  //Message 
  useEffect(() => {
    setMessage('')
  }, [data])

  return (
    <div className="main">
      <h1>Calcul valeur energetique d'un repas</h1>
      <h4>Choisir les aliments qui conposent votre repas : </h4>

      {
        data.map((ele, index) => {
          return (
            <div key={index}>
              <input type='checkbox' defaultChecked={ele.check} value={ele.id} onChange={handChangeCheck} />
              <span>{ele.name} : </span>
              <input type='number' name={ele.name} disabled={!ele.check} defaultValue={ele.qte} onChange={HandChangeValue} /> {ele.uni} <br /><br />
            </div>
          )
        })
      }
      <button style={{ marginLeft: '120px' }} onClick={valid}>calculer</button><br /><br />
      <span className={Message === 'au moins cocher une case' ? 'red' : 'green'}> {Message}</span>
    </div>
  );
};

export default App;
