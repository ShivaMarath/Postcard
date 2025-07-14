import { AppBar } from "./AppBar";
import { BlogCard } from "./BlogCard";
import  useBlog  from "./hooks";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const navigate = useNavigate()
    const { loading, blog } = useBlog();
    
    if (loading) {
        return <div>Loading...</div>;
    }
    if(!useBlog){
        console.error("Unauthorized")
        navigate('/signin')
    }
    const token = localStorage.getItem('token')
    if(!token){
        console.error("Unauthorized")
        navigate('/signin')
    }

    return (
        <div>
            <AppBar />
            <div className="space-y-4">
                {blog.map(blog => {
                    const publishedDate = new Date(blog.createdAt || Date.now())
                        .toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        });

                    return (
                        <BlogCard 
                            key={blog.id}
                            authorName={blog.author?.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={publishedDate}
                        />
                    );
                })}
            </div>
        </div>
    );
};