import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Signup } from './components/Signup'
import { Signin } from './components/Signin'
import { Dashboard } from './components/Dashboard'
import { Blog } from './components/Blog'
import About  from './components/About'
function App() {

  return (
    <>
      <div>
          <BrowserRouter>
          <Routes>
            <Route path= "/signup" element= {<Signup/>}/>
            <Route path= "/signin" element= {<Signin/>}/>
            <Route path= "/" element= {<Dashboard/>}/>
            <Route path= "/Blog" element= {<Blog/>} />
            <Route path= "/About" element= {<About/>} />
            
          
            


          </Routes>
          </BrowserRouter>
          
          
      </div>
    </>
  )
}

export default App
