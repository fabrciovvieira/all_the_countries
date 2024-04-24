import './App.css'
import { Outlet } from 'react-router-dom'
import useLocalStorage from 'use-local-storage';
import NavBar from './components/navBar/NavBar'
import Footer from './components/Footer/Footer'

function App() {
  const preference = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDark, setIsDark] = useLocalStorage('isDark', preference);
  

  return (
    <>
     <div className="App" data-theme={isDark ? 'dark' : 'light'}>
        <NavBar isDark={isDark} setIsDark={setIsDark}/>
        <Outlet />
        <Footer />
     </div>
    </>
  )
}

export default App
