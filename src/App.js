import React, { useState, useEffect } from "react";
import './App.css';

const App = () => {
  //Pizza
  const [Pizza, setPizza] = useState(
    [
      { id: 0, name: 'Pizza 4 fromages', prix: 80, qte: 1 },
      { id: 10, name: 'Pizza Herbo', prix: 75, qte: 0 },
      { id: 20, name: 'Pizza viande hachee', prix: 100, qte: 0 },
      { id: 30, name: 'Pizza fuits de mer', prix: 120, qte: 0 }
    ]
  )

  //data 
  const [data, setData] = useState({ name: '', address: '', typePay: '', Nbr: '' })
  const [radioDisplay, setradioDisplay] = useState(false);
  const [total, setT] = useState(80);
  const [Message, setMessage] = useState('');
  // Change Qte Produit
  const HandChangeQteProduit = (event) => {
    const { name, value } = event.target;
    setPizza([...Pizza.map(ele => ele.id === parseInt(name) ? { ...ele, qte: value } : { ...ele })])
  }

  //Name && Address && typeCart ...
  const HandChangeInput = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }
  //Cart
  useEffect(() => {
    data.typePay === 'cheque' ? setradioDisplay(true) : setradioDisplay(false);
  }, [data])
  
  //total
  useEffect(() => {
    setT(Pizza.reduce((T, obj) => T + (obj.qte !== '' ? parseInt(obj.qte) * obj.prix : 0), 0));
  }, [Pizza])

  //valid
  const valid = () => {
    var c = 0;
    if (Pizza.filter(ele => ele.qte !== '' && parseInt(ele.qte) !== 0).length === 0) { c = +1 };
    if (data.typePay === '') { c += 1 }
    if (data.name === '') { c += 1 }
    if (data.address === '') { c += 1 };
    if (data.typePay === 'carte' && data.Nbr === '') { c += 1 };
    if (c === 0) { 
      setMessage('Merci de votre visite, le montant total de votre commande est :') }
    else {
      setMessage('entry value is not found')
    }
  }



  return (
    <div className="main">
      <h2>Vente Pizza</h2>
      <span>Nom du client : </span><input type='text' onChange={HandChangeInput} name='name' placeholder="Name..." /><br /><br />
      <span>Address : </span><input type='text' onChange={HandChangeInput} name='address' placeholder="Address..." /><br /><br />

      <table>
        <thead>
          <tr>
            <th>Nom du produit</th>
            <th>Prix unitaire en DH</th>
            <th>Quantite</th>
          </tr>
        </thead>
        <tbody>
          {Pizza.map(ele =>
            <tr key={ele.id}>
              <th>{ele.name}</th>
              <th>{ele.prix}</th>
              <th><input type='number' name={ele.id} defaultValue={ele.qte} placeholder="Qte..." onChange={HandChangeQteProduit} /></th>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <h3>Paiement par : </h3>
        <input type='radio' name='typePay' value='carte' onChange={HandChangeInput} /><span>carte bancaire</span>
        <input type='radio' name='typePay' value='cheque' onChange={HandChangeInput} /><span>cheque</span><br /><br />
        <span>Number de la carte bancaire : </span> <input type='number' name='Nbr' onChange={HandChangeInput} disabled={radioDisplay} />
        <br /><br />
        <button onClick={valid}>Envoyer</button><br /><br />
        <span >{Message} {Message==='Merci de votre visite, le montant total de votre commande est :'?total:null}</span>
      </div>
    </div>
  );
};

export default App;
