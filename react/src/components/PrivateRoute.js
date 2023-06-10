import { Navigate, Outlet, Route, redirect } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import React from 'react'

export default function PrivateRoute({fallbackPath, Component, condition}){

    return  condition ? <Component /> : <Navigate to={fallbackPath} />


}