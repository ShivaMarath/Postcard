export const Signup = ()=>{
    return (<div className="flex">
             <div className='flex flex-col self-center content-center justify-center h-screen w-1 md:w-1/2  '>
                    <div>
                        <h1 className="grid place-content-center font-bold text-2xl">Create an account</h1>
                        <div className="grid place-content-center">
                            <div className="h-3/4 w-md space-y-4">
                        
                                   <label htmlFor="helper-text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Name</label>
                                  <input type="text" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your name here" />
                                  
                                  <label htmlFor="helper-text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your email</label>
                                  <input type="email" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email here" />
                                  
                                  <label htmlFor="helper-text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label>
                                  <input type="password" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your password here" />
                                  
                                  
                                  
                                  <p id="helper-text-explanation" className="grid place-content-center mt-2 text-sm text-gray-500 dark:text-gray-400">Already have an account? <a href="/signin" className="grid place-content-center font-medium text-blue-600 hover:underline dark:text-blue-500">Signin</a>.</p>
                               <div className="flex justify-center mt-4">
                                    <button 
                                         type="button" 
                                         className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-3 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full max-w-xs"
                                             >
                                                 Sign up
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