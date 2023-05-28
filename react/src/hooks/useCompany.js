import { useContext, useEffect } from "react";
import { getCompanyContext } from "../context";

export default function useCompany(){

    const { _company, _setCompany } = useContext(getCompanyContext())

    useEffect(() => {

        if(_company){
            localStorage.setItem('current-company', JSON.stringify(_company))
        }

    }, [_company])

    return {
        currentCompany : _company,
        switchCompany: _setCompany
    }

}