import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../Sidebar";

function MainLayout(){
    return(
        <div className="flex">
            <Sidebar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}
export default MainLayout;