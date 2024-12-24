import { lazy, Suspense } from 'react'

import Page404 from './pages/404.jsx'
import { Router } from 'react-router'
import { Route } from 'react-router'

const LazyRedBullPage = lazy(() => import())
const LazyFerrariPage = lazy(() => import('./pages/Ferrari.jsx'))
const LazyMcLarenPage = lazy(() => import('./pages/McLaren.jsx'))



function App () {
  return (
    <main>
      <Suspense fallback={null}>
        <Router defaultComponent={Page404}>
          <Route path='/redbull' Component={LazyRedBullPage} />
          <Route path='/ferrari' Component={LazyFerrariPage} />
          <Route path='/mclaren' Component={LazyMcLarenPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App