import axios from 'axios'
import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const useBlog = () => {
    const navigate =useNavigate()
    const [loading, setLoading] = useState(true)
    const [blog,setBlog] = useState<blogtype[]>([])
    interface blogtype{
      title: string,
            content: string,
            id:number,
            createdAt: string
            author:{
                    name:string
            }
    }
    try{
      useEffect(() => {
     axios.get("https://backend.shivamarath2005.workers.dev/api/v1/blog/bulk",{
      headers:{
        'Authorization': localStorage.getItem("token")
      }
     })
      .then(
        (response: {data:{blog:blogtype[]}})=>{
            setBlog(response.data.blog)
            setLoading(false)
        }
      )
    }, [])
    }catch{
      console.error("Unauthorized")
      navigate('/signin')
      
    }
    
    
    return({loading, blog })
}

export default useBlog