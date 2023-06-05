import { useTranslation } from "react-i18next"
import Dashboard from "./pages/Dashboard"

const { useState, useEffect } = require("react")
const { getAuthContext, getCompanyContext, getContextMenuContext } = require("./context")
const { NavigationBar, PrivateRoute, ContextMenu, PageContainer } = require("./components")
const { Routes, Route, BrowserRouter, useLocation } = require("react-router-dom")
const { Inventory, Settings, Developement, Login, Register, CategoryForm, ProductForm, Design, DesignForm, Clients, Transaction } = require("./pages")
const {motion, AnimatePresence} = require('framer-motion')

export default function Application(){

    const [authContext, setAuthContext] = useState(null)
    const [companyContext, setCompanyContext] = useState(null)
    const [contextMenuContext, setContextMenuContext] = useState(null)
    const {t, i18n} = useTranslation()

    const AuthContext = getAuthContext()
    const CompanyContext = getCompanyContext()
    const ContextMenuContext = getContextMenuContext()

    useEffect(() => {

      let user = localStorage.getItem('user');
      let company = localStorage.getItem('current-company');
      let lang = localStorage.getItem('lang');
      let theme = localStorage.getItem('theme');
      if(theme && theme === 'dark') document.body.classList.add('dark')
      if(lang) i18n.changeLanguage(lang)
      if(user) setAuthContext(JSON.parse(user))
      if(company)setCompanyContext(JSON.parse(company))

    }, [])

    return ( 
    
      <BrowserRouter >
  
        <AuthContext.Provider value={{_auth: authContext, _setAuth: setAuthContext}} >
          <CompanyContext.Provider value={{_company: companyContext, _setCompany: setCompanyContext}}>
            <ContextMenuContext.Provider value={{_contextMenu: contextMenuContext, _setContextMenu: setContextMenuContext}}>

              { authContext ? <NavigationBar /> : null }
    
              <PageContainer>

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

                  <Route path='/new-category' element={ <PrivateRoute fallbackPath={'/login'} condition={!!authContext} Component={CategoryForm} /> } />
                  <Route path='/new-product' element={ <PrivateRoute fallbackPath={'/login'} condition={!!authContext} Component={ProductForm} /> } />
                  <Route path='/design/new' element={ <PrivateRoute fallbackPath={'/login'} condition={!!authContext} Component={Design} /> } />

                </Routes >
                
              </PageContainer>

              

              <AnimatePresence>
                { contextMenuContext ? <ContextMenu contextMenu={contextMenuContext} setContextMenu={setContextMenuContext} /> : null }
              </AnimatePresence>

            </ContextMenuContext.Provider>
          </CompanyContext.Provider>
        </AuthContext.Provider>
  
      </BrowserRouter>
      
    )
  
  }