import { AppBar } from "./AppBar";
import { BlogCard } from "./BlogCard";
import  useBlog  from "./hooks";

export const Dashboard = () => {
    const { loading, blog } = useBlog();
    
    if (loading) {
        return <div>Loading...</div>;
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