import { EditCommande, ToggleAction } from "../Store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useState,useEffect } from "react";
import PlatsJson from '../../Plats.json';
import React from "react";



const EditPlats = () => {
    const store = useSelector(res => res.commande);
    const ActionBoolean = useSelector(res => res.is_Action);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [Plats] = useState([...PlatsJson]);
    const [MenuId, setMenuId] = useState(0);
    const [platId, setplatId] = useState(0);
    const [totalPrix, setTotalPrix] = useState(0);
    const [commande, setCommande] = useState(
        {
            N: 3,
            date: "01/01/2023",
            time: "7:59:30 pm",
            isCompleted: false,
            All: []
        }
    );
    const { id } = useParams();

//check 
useEffect(()=>{
    if(ActionBoolean===false){
        navigate('/NoCompleted');
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[ActionBoolean])

    // Get commande par id 
    useEffect(() => {
        setCommande({
            ...store.filter(obj => obj.N === parseInt(id))[0]
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    //change Total prix if change data " commande "
    useEffect(() => {
        setTotalPrix(
            commande.All.reduce((T, obj) => T + ((isNaN(obj.qte) === false ? obj.qte : 0) * obj.prix), 0)
        )
    }, [commande])

    // if select option in " Menu and plats " => Add plat in Commande 
    const Addtable = () => {
        if (platId !== 0 && MenuId !== 0 && commande.All.filter(ele => ele.idP === platId).length === 0) {
            setCommande(
                {
                    ...commande,
                    All: [
                        ...commande.All,
                        { ...{ ...Plats.filter(ele => ele.id === MenuId)[0] }.menu.filter(obj => obj.idP === platId)[0], SauseAffiche: [...Plats.filter(ele => ele.id === MenuId)[0].sause] }
                    ]
                }
            )
        }

    }

    //QTE
    const HandChangeQte = (event) => {
        const { value, name } = event.target
        setCommande({ ...commande, All: [...commande.All.map(ele => ele.idP === parseInt(name) ? { ...ele, qte: parseInt(value) } : { ...ele })] })
    }

    //Sause
    const Hand_Change_Value_Select_Sause = (e, id) => {
        const { value } = e.target
        setCommande({ ...commande, All: [...commande.All.map(ele => ele.idP === parseInt(id) ? { ...ele, sause: (value) } : { ...ele })] })
    }

    //Edit commande in store
    const Edit_commande_in_store = () => {
        let c = 0;
        if (commande.All.length === 0) { c += 1; }
        if (commande.All.filter(ele => isNaN(ele.qte) === true).length > 0) { c += 1; };
        if (commande.All.filter(ele => ele.qte <= 0).length > 0) { c += 1; };

        if (c === 0) {
             dispatch(EditCommande(
                [
            ...store.map(ele => ele.N === parseInt(id) ?
            {...commande}:{ ...ele }
        )]
             ));
            dispatch(ToggleAction())
            navigate('/NoCompleted');
        }
    }

    return (
        <div className="PageAdd">

            <div className="face01">
                <select className="selectes" onChange={(e) => setMenuId(parseInt(e.target.value))}>
                    <option value='0'>Menu...</option>
                    {
                        Plats.map((ele, index) => <option key={index} value={ele.id} >{ele.name}</option>)
                    }
                </select>


                <select className="selectes" onChange={(e) => setplatId(parseInt(e.target.value))}>
                    <option value='0' >Plats...</option>
                    {
                        Plats.map(ele => ele.id === MenuId ?
                            ele.menu.map((obj, index) =>
                                <option key={index} value={obj.idP} >{obj.name}</option>)
                            : null
                        )
                    }

                </select>
                <button className="btn_Addtable" onClick={Addtable}>+</button>
            </div>

            <div className="face02">
                {
                    commande.All.length > 0 ?
                        commande.All.map((ele, index) =>
                            <div key={index} className='Plats'>
                                <span className="namePlats">{ele.name}</span>
                                <input type='number' placeholder="Qte..." defaultValue={ele.qte} name={ele.idP} onChange={HandChangeQte} />

                                <select className="selectSause" defaultValue={ele.sause} onChange={(e) => Hand_Change_Value_Select_Sause(e, ele.idP)}>
                                    <option value=''>sause</option>
                                    {ele.SauseAffiche.map(sau => <option key={sau} value={sau}>{sau}</option>)}
                                </select>

                                <span className="prixPlats">{ele.prix} DH</span>
                                <button className="btn_delete_plats" onClick={() => {
                                    setCommande({ ...commande, All: [...commande.All.filter(obj => obj.idP !== ele.idP)] })
                                }}>Delete Plat</button>
                            </div>) : <span className="Vide">Not Found Plats in Commande </span>
                }

            </div>

            <div className="face03">
                <button className="add_Commande" onClick={Edit_commande_in_store}>Edit Commande</button>
                <button className="add_Cancel" onClick={() => navigate('/NoCompleted')}>Cancel</button>
                <span className="Total">{totalPrix} DH</span>
            </div>

        </div>
    )

}
export default EditPlats;






