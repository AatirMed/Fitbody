import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { DeleteCommande ,ToggleAction} from "../Store/store";


const Dashbordcompleted = () => {
    const store = useSelector(res => res.commande);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="Menu">
            <div className="header">
                <h1>ATBAQ</h1>
                <button onClick={() => navigate('/Dashbord/Add')}>+</button>
            </div>
            <table className="tableCompleted">
                <thead>
                    <tr>
                        <th>N</th>
                        <th>Count</th>
                        <th>Prix Total</th>
                        <th className="tabDVT"> Delete</th>
                        <th className="tabDVT">View Ticket</th>
                    </tr>
                </thead>
                <thead>

                    {store.map((ele, index) =>
                        ele.isCompleted === true ?

                            <tr key={index}>
                                <th>{ele.N}</th>
                                <th>{ele.All.length}</th>
                                <th>{ele.All.reduce((T, obj) => T + (obj.qte * obj.prix), 0)} DH</th>
                                <th className="tabDVT"> <button onClick={() => dispatch(DeleteCommande([...store.filter(obj => obj.N !== ele.N)]))}>Delete</button></th>
                                <th className="tabDVT"><button onClick={() => {
                                    navigate(`/Dashbord/Completed/${ele.N}`)
                                    dispatch(ToggleAction())
                                }}>View Ticket</button></th>
                            </tr>

                            : null
                    )}

                </thead>
            </table>

            <div className="h_footer_total">
                Total : {
                    (store.map(ele => ele.isCompleted === false ? [...ele.All] : []).flat(1).reduce((T, obj) => T + (obj.qte * obj.prix), 0))
                } DH
            </div>

        </div>
    );
};

export default Dashbordcompleted;