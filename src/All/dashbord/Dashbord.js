import React, { Fragment } from "react";
import { Link, Routes, Route } from "react-router-dom";
import DashbordNoCompleted from "./DashbordNoCompleted";
import Dashbordcompleted from "./Dashbordcompleted";
import AddPlats from "./AddPlats";
import EditPlats from "./EditPlats";
import View from "./View";
const Dashbord = () => {
    return (
        <Fragment >
            <nav>
                <Link to='/NoCompleted' className="linkNAV">NoCompleted</Link>
                <Link to='/Completed' className="linkNAV" >Completed</Link>
            </nav>
            <Routes>
                <Route exact path='/NoCompleted' element={<DashbordNoCompleted />} />
                <Route path='/Completed' element={<Dashbordcompleted />} />;
                <Route path='/Dashbord/Add' element={<AddPlats />} />;
                <Route path='/Dashbord/Edit/:id' element={<EditPlats />} />;
                <Route path='/Dashbord/:action/:id' element={<View />} />
                <Route path='*' element={<DashbordNoCompleted />} />
                </Routes>
        </Fragment>
    )
};

export default Dashbord;