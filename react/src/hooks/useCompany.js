import { useContext, useEffect } from "react";
import { getCompanyContext } from "../context";
import useServer from "./useServer";

export default function useCompany(){

    const { _company, _setCompany } = useContext(getCompanyContext())
    const { get } = useServer()

    return {
        info : _company,
        switchCompany: _setCompany,
    }

}