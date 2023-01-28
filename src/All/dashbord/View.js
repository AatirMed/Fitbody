import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { ToggleAction } from "../Store/store";

const View = () => {
    const store = useSelector(res => res.commande);
    const ActionBoolean = useSelector(res => res.is_Action);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { action, id } = useParams()
    const [commande, setCommande] = useState(
        {
            N: 3,
            date: "01/01/2023",
            time: "7:59:30 pm",
            isCompleted: false,
            All: []
        }
    );
    //check 
    useEffect(() => {
        if (ActionBoolean === false) {
            if (action === 'Completed') {
                navigate('/Completed')
            } else {
                navigate('/NoCompleted')
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ActionBoolean])

    // Get commande par id 
    useEffect(() => {
        setCommande({
            ...store.filter(obj => obj.N === parseInt(id))[0]
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="tikect_one">
            <button onClick={() => {
                if (action === 'Completed') {
                    navigate('/Completed')
                    dispatch(ToggleAction())
                } else {
                    navigate('/NoCompleted')
                    dispatch(ToggleAction())
                }
            }}>Dashbord</button>
            <br /><br /><br />
            <div className="tikect_one_fdpo">
                <div className="tikect_one_kdpo">
                    <h2>ATBAQ LBACHA</h2>
                    <h5>Residence el-omran rue 51 Num 8 sidi maarouf</h5>
                    <span className="Tel">Tel: 06 00 977 123</span>
                    <div className="date">
                        <span className="date1">Le <span style={{ fontWeight: 'bold' }}>{commande.date}</span></span>
                        <span className="date1"> Á : <span style={{ fontWeight: 'bold' }}>{commande.time}</span></span>
                    </div>
                    <h4>Ticket N : {commande.N}</h4>
                    <span>----------------------------------------------------------------</span>
                    <div>
                        {
                            commande.All.map((ele, index) =>
                                <div key={index} className='Plat_one'>
                                    <mark style={{ fontWeight: 'bold' }}>{ele.name}</mark>
                                    <span className="prixPlatsTotals"> ( {ele.prix * ele.qte} DH ) *{ele.qte}</span>
                                </div>)
                        }

                    </div>
                    <span>----------------------------------------------------------------</span>
                    <h4>A Payer {commande.All.reduce((T, obj) => T + (obj.qte * obj.prix), 0)}</h4>
                </div>
            </div>

        </div>
    )
}

export default View;