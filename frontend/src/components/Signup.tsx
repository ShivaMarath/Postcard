import { useState } from "react"
import  Axios  from "axios"
import { useNavigate } from "react-router-dom"

export const Signup = ()=>{
   
   const[loading , setLoading] = useState(false)
   const navigate = useNavigate()
     const [name , setName] = useState("")
     function namechange(e: React.ChangeEvent<HTMLInputElement>){
      setName(e.target.value)
    }
     const [username , setUsername] = useState("")
      function usernamechange(e:React.ChangeEvent<HTMLInputElement>){
        setUsername(e.target.value)
      }
      const [password , setPassword] = useState("")
      function passwordchange(e: React.ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value)
      }
      async function submitHandler(){
      try{
      setLoading(true)
     const response = await Axios.post('https://backend.shivamarath2005.workers.dev/api/v1/user/signup' , {username: username, password: password , name: name})
      const jwt = response.data;
      localStorage.setItem('token', jwt)
      navigate('/Dashboard')
    
  }catch(e){
    console.log("Error in sending the request")
  }
  finally{
    setLoading(false)
  }}
    return (<div className="flex">
             <div className='flex flex-col self-center content-center justify-center h-screen w-1 md:w-1/2  '>
                    <div>
                        <h1 className="grid place-content-center font-bold text-2xl">Create an account</h1>
                        <div className="grid place-content-center">
                            <div className="h-3/4 w-md space-y-4">
                        
                                   <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Name</label>
                                  <input onChange={namechange} type="text"  aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your name here" />
                                  
                                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your email</label>
                                  <input onChange={usernamechange} type="email"  aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email here" />
                                  
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label>
                                  <input onChange={passwordchange} type="password"  aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your password here" />
                                  
                                  
                                  
                                  <p className="grid place-content-center mt-2 text-sm text-gray-500 dark:text-gray-400">Already have an account? <a href="/signin" className="grid place-content-center font-medium text-blue-600 hover:underline dark:text-blue-500">Signin</a>.</p>
                               <div className="flex justify-center mt-4">
                                    <button 
                                         type="button" onClick={submitHandler} disabled={loading}
                                         className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-3 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full max-w-xs"
                                             >
                                                 {loading? "Signing up.." : "Signup"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>


                <div className="flex-col h-screen w-1/2 content-center p-15 bg-slate-200 invisible md:visible">
                                        <p className="font-bold text-xl">
                    "Clean, minimal, and easy to navigate, this blog makes reading a joy. The design keeps the focus on the content, just the way it should be."
                  </p>
                  <p className="font-medium">
                    Jules Winnfield
                  </p>
                  <p className="text-slate-500">
                    CEO, ACME Inc
                  </p>
                </div>
            </div>
)}