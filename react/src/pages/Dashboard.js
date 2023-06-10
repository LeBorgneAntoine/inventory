import { Suspense, useEffect, useRef, useState } from "react";
import { Button, Input, Skeleton } from "../components";
import {AnimatePresence, motion} from 'framer-motion'
import Icon from '@heroicons/react/24/outline'
import useServer from "../hooks/useServer";
import { ReactComponent as BackgroundPattern } from '../assets/svg/wwwhirl.svg'
import useCompany from "../hooks/useCompany";
import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Dashboard(){

    const [needSetup, setNeedSetup] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const { get } = useServer()
    const { switchCompany, info } = useCompany()
    const navigate = useNavigate()

    async function fetchCompany(){

        try{

            let companies = await get('/company')

            if(companies){

                if(companies.length === 0){
                    navigate('/company/new')
                }else{
                    switchCompany(companies[0])
                }

            }

            

        }catch(err){
            console.log('err',err)
        }


    }

    useEffect(() => {

        fetchCompany()

    }, [])



    return <div className="w-full h-full relative">

        {info ? <div className="p-2 text-neutral-100">

            <h1 className=" text-2xl">{info?.name}</h1>

        </div> : null}

    </div>
}
