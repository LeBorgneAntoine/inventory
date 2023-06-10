import { useTranslation } from "react-i18next"
import Dashboard from "./pages/Dashboard"
import { generateDeviceName } from "./utils/strUtils"
import useServer from "./hooks/useServer"
import { switchTheme } from "./utils/theme.utils"
import useStateStorage from "./hooks/useStateStorage"
import React from "react"
const { useState, useEffect } = require("react")
const { getAuthContext, getCompanyContext, getContextMenuContext } = require("./context")
const { NavigationBar, PrivateRoute, ContextMenu, PageContainer } = require("./components")
const { Routes, Route, BrowserRouter, useLocation } = require("react-router-dom")
const { Inventory, Settings, Developement, Login, Register, CategoryForm, ProductForm, Design, DesignForm, Clients, Transaction, ClientSettings, Product, CompanyForm } = require("./pages")
const {motion, AnimatePresence} = require('framer-motion')

export default function Application(){

    const [authContext, setAuthContext] = useStateStorage(null, 'user')
    const [companyContext, setCompanyContext] = useStateStorage(null, 'company')
    const [contextMenuContext, setContextMenuContext] = useState(null)
    const {t, i18n} = useTranslation()

    const AuthContext = getAuthContext()
    const CompanyContext = getCompanyContext()
    const ContextMenuContext = getContextMenuContext()
    const { connect } = useServer()
    const [ isMenuOpen, setMenuOpen ] = useState(false)

    useEffect(() => {

      //load if exist stored user info (name & token)
      let user = localStorage.getItem('user');
  
      if(user) {
        let userObject = JSON.parse(user)
        setAuthContext(userObject)
      }

    }, [])


    useEffect(() => {

      //load saved properties if logged in
      if(authContext){

        if(!localStorage.getItem('device_name'))localStorage.setItem('device_name', generateDeviceName())
        //connect through webSocket
        connect({ name: localStorage.getItem('device_name'), token: authContext.token })

        let company = localStorage.getItem('current-company');
        if(company)setCompanyContext(JSON.parse(company))

        let lang = localStorage.getItem('lang');
        if(lang) i18n.changeLanguage(lang)

        let theme = localStorage.getItem('theme');
        if(theme) switchTheme(theme)
      }

    }, [authContext])

    return ( 
    
      <BrowserRouter >
  
        <AuthContext.Provider value={{_auth: authContext, _setAuth: setAuthContext}} >
          <CompanyContext.Provider value={{_company: companyContext, _setCompany: setCompanyContext}}>
            <ContextMenuContext.Provider value={{_contextMenu: contextMenuContext, _setContextMenu: setContextMenuContext}}>

              {/* if logged show the navigation bar */}
              { authContext ? <NavigationBar setOpen={setMenuOpen} /> : null }
    
              <PageContainer isMenuOpen={isMenuOpen}>

                <Routes >

                  <Route element={ <PrivateRoute fallbackPath={'/'}  Component={Login} condition={!authContext} /> } path='/login' />
                  <Route element={ <PrivateRoute fallbackPath={'/'}  Component={Register} condition={!authContext} /> } path='/register' />

                  <Route path='/' element={ <PrivateRoute fallbackPath={'/login'} condition={!!authContext} Component={Dashboard} /> } />
                  <Route path='/inventory' element={ <PrivateRoute fallbackPath={'/login'} condition={!!authContext} Component={Inventory} /> } />
                  <Route path='/settings' element={ <PrivateRoute fallbackPath={'/login'} condition={!!authContext} Component={Settings} /> } />
                  <Route path='/design' element={ <PrivateRoute fallbackPath={'/login'} condition={!!authContext} Component={DesignForm} /> } />
                  <Route path='/clients' element={ <PrivateRoute fallbackPath={'/login'} condition={!!authContext} Component={Clients} /> } />
                  <Route path='/transactions' element={ <PrivateRoute fallbackPath={'/login'} condition={!!authContext} Component={Transaction} /> } />
                  <Route path='/dev' element={ <PrivateRoute fallbackPath={'/login'} condition={!!authContext} Component={Developement} /> } />

                  {/* Single item access / edit */}
                  <Route path='/inventory/category/new' element={ <PrivateRoute fallbackPath={'/login'} condition={!!authContext} Component={CategoryForm} /> } />
                  <Route path='/company/new' element={ <PrivateRoute fallbackPath={'/login'} condition={!!authContext} Component={CompanyForm} /> } />
                  <Route path='/inventory/product/new' element={ <PrivateRoute fallbackPath={'/login'} condition={!!authContext} Component={ProductForm} /> } />
                  <Route path='/inventory/:id' element={ <PrivateRoute fallbackPath={'/login'} condition={!!authContext} Component={Product} /> } />
                  <Route path='/design/new' element={ <PrivateRoute fallbackPath={'/login'} condition={!!authContext} Component={Design} /> } />
                  <Route path='/clients/settings' element={ <PrivateRoute fallbackPath={'/login'} condition={!!authContext} Component={ClientSettings} /> } />
                  <Route path='/clients/new' element={ <PrivateRoute fallbackPath={'/login'} condition={!!authContext} Component={ClientSettings} /> } />

                </Routes >
                
              </PageContainer>

              
              {/* global context menu */}
              <AnimatePresence>
                { contextMenuContext ? <ContextMenu contextMenu={contextMenuContext} setContextMenu={setContextMenuContext} /> : null }
              </AnimatePresence>

            </ContextMenuContext.Provider>
          </CompanyContext.Provider>
        </AuthContext.Provider>
  
      </BrowserRouter>
      
    )
  
  }