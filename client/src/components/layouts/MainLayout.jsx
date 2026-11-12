import { Outlet } from "react-router";
import Sidebar from "../Dashboard/Sidebar";

function MainLayout(){
    return(
        <div className="flex min-h-screen flex-col md:flex-row">
            <Sidebar />
            <main className="min-w-0 flex-1">
                <Outlet />
            </main>
        </div>
    );
}
export default MainLayout;
