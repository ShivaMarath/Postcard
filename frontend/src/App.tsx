import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Signup } from './components/Signup'
import { Signin } from './components/Signin'
import { Dashboard } from './components/Dashboard'
import { Blog } from './components/Blog'
function App() {

  return (
    <>
      <div>
          <BrowserRouter>
          <Routes>
            <Route path= "/signup" element= {<Signup/>}/>
            <Route path= "/signin" element= {<Signin/>}/>
            <Route path= "/Dashboard" element= {<Dashboard/>}/>
            <Route path= "/Blog" element= {<Blog/>} />
          
            


          </Routes>
          </BrowserRouter>
      </div>
    </>
  )
}

export default App
