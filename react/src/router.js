import { createBrowserRouter } from "react-router-dom";
import Management from "./pages/Management";
import ComponentTest from "./pages/ComponentTest";
import Settings from "./pages/Settings";
import Developement from "./pages/Develement";

export default createBrowserRouter([
    {
        path: '/',
        element: < Management />,

    },
    {
        path: '/test',
        element: <ComponentTest/>
    },
    {
        path: '/dev',
        element: <Developement />
    },
    {
        path: '/settings',
        element: <Settings />
    }
    
 
])