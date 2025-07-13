import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useBlog = () => {
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
    
    return({loading, blog })
}

export default useBlog