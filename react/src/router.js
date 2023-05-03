import { createBrowserRouter } from "react-router-dom";
import Management from "./pages/Management";
import ComponentTest from "./pages/ComponentTest";

export default createBrowserRouter([
    {
        path: '/',
        element: <Management />,

    },
    {
        path: '/test',
        element: <ComponentTest/>
    }
    
 
])