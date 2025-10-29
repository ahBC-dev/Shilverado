import { BrowserRouter, Routes, Route } from 'react-router-dom';
//pages
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import Exchange from './pages/Exchange';
//components
import { Navbar, 
         Welcome, 
         Footer, 
         Services, 
         Transactions, 
         Crypto, 
         WelcomeTwo, 
         MiniStats
        } from './components';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className='min-h-screen gradient-bg-welcome'>
        <Navbar />
        <Routes>

        {/* Home - Dashboard */}
          <Route path='/' element={
            <div>
              <WelcomeTwo />
              <Services />
              <div className="flex flex-1 justify-center items-center py-10">
                <MiniStats />
              </div>
            </div>
          } />
          
          { /*Analytics - Charts Only*/ }
          <Route path="/analytics" element={
            <div>
            <div className="flex flex-1 justify-center items-center py-10 pt-20">
                <MiniStats />
            </div>
            <Crypto />
            </div>
            } />
            
          {/*Exchange - Crypto Interface*/}
          <Route path="/exchange" element={
            <div>
              <Welcome />
              <Transactions />
            </div>
          } />
            
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
