import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { DeleteCommande, CompletedCommande, ToggleAction } from "../Store/store";
const DashbordNoCompleted = () => {
    const store = useSelector(res => res.commande);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="Menu">
            <div className="header">
                <h1>ATBAQ</h1>
                <button onClick={() => navigate('/Dashbord/Add')}>+</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>N</th>
                        <th>Count</th>
                        <th>PrixTotal</th>
                        <th> Delete</th>
                        <th>Complete</th>
                        <th>Edit</th>
                        <th>View Ticket</th>
                    </tr>
                </thead>
                <thead>

                    {store.map((ele, index) =>
                        ele.isCompleted === false ?

                            <tr key={index}>
                                <th>{ele.N}</th>
                                <th>{ele.All.length}</th>
                                <th>{ele.All.reduce((T, obj) => T + (obj.qte * obj.prix), 0)} DH</th>
                                <th> <button className="btn_del" onClick={() => dispatch(DeleteCommande([...store.filter(obj => obj.N !== ele.N)]))}>Delete</button></th>
                                <th><button className="btn_comp" onClick={() => dispatch(CompletedCommande(ele.N))}>Complete</button></th>
                                <th><button className="btn_edit" onClick={() => {
                                    navigate(`/Dashbord/Edit/${ele.N}`)
                                    dispatch(ToggleAction());
                                }}>Edit</button></th>
                                <th><button className="btn_view" onClick={() => {
                                    navigate(`/Dashbord/NoCompleted/${ele.N}`);
                                    dispatch(ToggleAction());
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

export default DashbordNoCompleted;