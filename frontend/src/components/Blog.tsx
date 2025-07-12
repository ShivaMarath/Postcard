import  Axios  from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Blog(){
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
     const navigate = useNavigate()

    function titleChange(e:React.ChangeEvent <HTMLTextAreaElement>){
        setTitle(e.target.value)
    }
     function contentChange(e:React.ChangeEvent <HTMLTextAreaElement>){
        setContent(e.target.value)
    }

    async function submitHandler(){
        try{setLoading(true)
            const response = await Axios.post("https://backend.shivamarath2005.workers.dev/api/v1/blog" , {title: title , content: content})
            navigate ('/Dashboard')
            
        }catch(e){
             console.log("Error in sending the request")
        }finally{
            setLoading(false)
        }
    }
    return(<div>
        <div className="font-bold pt-6 pl-6 text-3xl font-serif  ">
            Postcards
        </div>
        <div className="grid gap-3 p-6">
        <div>
        <label htmlFor="message" className="block mb-2 text-lg font-medium text-gray-900 dark:text-black">Title</label>
        <textarea onChange={titleChange} id="title" rows = {3} className="block p-2.5 w-full text-sm text-black-900 bg-black-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title..."></textarea>
        </div>
        <div>
         <label htmlFor="message" className="block mb-2 text-lg font-medium text-gray-900 dark:text-black">Content</label>
        <textarea onChange={contentChange} id="content" rows = {10} className="block p-2.5 w-full text-sm text-black-900 bg-black-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Content..."></textarea>
        </div>
        
       <div>
        <button 
                 type="button" onClick={submitHandler} disabled={loading}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-3 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full max-w-xs">
                {loading? "Publishing..." : "Publish"}
                </button>
       </div>
        </div>
         
    </div>
       
    )

}