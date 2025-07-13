interface Card{
    authorName: string,
    title:string,
    content:string,
    publishedDate:string
}




export function BlogCard({authorName,
    title,                                              
    content,
    publishedDate}: Card){

        return <div className="flex justify-center w-full relative" >
        <div className="w-3/4 pb-4">
        <div className="flex gap-3">
             <Avatar authorName = {authorName} />
             <div className="font-light">{authorName}</div>
             <div className="flex items-center text-slate-300">.</div>
            <div className="text-slate-500 font-light">{publishedDate}</div>
        </div>
        <div className="font-bold text-2xl">
        {title}
        </div>
        <div className="flex flex-col">
            {content}
            <div className="pb-3">{`${Math.ceil(content.length/100)} minute(s) read`}</div>
        </div>
        <div className="bg-slate-200 w-full h-0.5 ">

        </div>
        </div>
        </div>
}

function Avatar({authorName} : {authorName : string}){
    return <div>
        <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{authorName[0].toUpperCase()}</span>
</div>
    </div>
}