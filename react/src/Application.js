import Dashboard from "./pages/Dashboard"

const { useState, useEffect } = require("react")
const { getAuthContext, getCompanyContext, getContextMenuContext } = require("./context")
const { NavigationBar, PrivateRoute, ContextMenu } = require("./components")
const { Routes, Route, BrowserRouter } = require("react-router-dom")
const { Inventory, Settings, Developement, Login, Register, CategoryForm, ProductForm, Design, DesignForm, Clients, Transaction } = require("./pages")
const {motion, AnimatePresence} = require('framer-motion')

export default function Application(){

    const [authContext, setAuthContext] = useState(null)
    const [companyContext, setCompanyContext] = useState(null)
    const [contextMenuContext, setContextMenuContext] = useState(null)
  
    const AuthContext = getAuthContext()
    const CompanyContext = getCompanyContext()
    const ContextMenuContext = getContextMenuContext()

    useEffect(() => {
      let user = localStorage.getItem('user');
      let company = localStorage.getItem('current-company');

      if(user) setAuthContext(JSON.parse(user))
      if(company)setCompanyContext(JSON.parse(company))

    }, [])

    return ( 
    
      <BrowserRouter  >
  
        <AuthContext.Provider value={{_auth: authContext, _setAuth: setAuthContext}} >
          <CompanyContext.Provider value={{_company: companyContext, _setCompany: setCompanyContext}}>
            <ContextMenuContext.Provider value={{_contextMenu: contextMenuContext, _setContextMenu: setContextMenuContext}}>

              { authContext ? <NavigationBar /> : null }
    
              <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="w-[calc(100%-var(--w-nav)-.5rem)] h-full max-md:w-full max-md:h-[calc(100%-var(--h-nav)-.5rem)] absolute max-md:left-0 max-md:top-[calc(var(--h-nav)+.5rem)] left-[calc(var(--w-nav)+.5rem)]">

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

              </motion.div>

              <AnimatePresence>
                { contextMenuContext ? <ContextMenu contextMenu={contextMenuContext} setContextMenu={setContextMenuContext} /> : null }
              </AnimatePresence>

            </ContextMenuContext.Provider>
          </CompanyContext.Provider>
        </AuthContext.Provider>
  
      </BrowserRouter>
      
    )
  
  }