import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { handleError }  from './errorHandler'

export const blogRouter = new Hono<{
  Bindings:{
    DATABASE_URL: string
    JWT_SECRET : string
  }
  Variables:{
   userId:string
  }
}>()

blogRouter.use('/*', async (c, next)=>{
    const authHeader = c.req.header("Authorization") ||""
    
    try{
        const user = await verify(authHeader , c.env.JWT_SECRET) as {id : string}
        if(user){
        c.set ("userId" , user.id) 
        await next()}
    }
    catch(e){
         c.status(403)
       return handleError(c, e)
    }
    
       
    
})



blogRouter.post('/', async (c) => {
   const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
let body;
let authorId
try{
     body = await c.req.json();
     authorId = await c.get("userId")
}catch(e){
    c.text("error in parsing body or getting author id")
}
let blog
try{
        blog = await prisma.blog.create({
    data:{
        title: body.title,
        content: body.content,
        authorId: Number(authorId),
    }
})
return c.text("Post created successfully!!")
} catch(e){
    return handleError(c, e)
}
})


blogRouter.put('/update', async (c) => {
    try{
   const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
const body = await c.req.json();
if (!body.id || !body.title || !body.content) {
  c.status(400);
  return c.text("Missing required fields");
}

    const blog = await prisma.blog.update({
    where:{
        id: Number(body.id)
    },
    data:{
        title: body.title,
        content: body.content
    }
})
return c.text("Updated successfully!!")
} catch(e){
   return handleError(c, e)
}
})


// Add pagination
blogRouter.get('/bulk', async (c) => {
   const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

try{
    const blog = await prisma.blog.findMany({})
    return c.json({
        blog
    })
}
catch(e){
    c.status(500)
   return handleError(c, e)
}

})


blogRouter.get('/:id', async (c) => {
   const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
const id = c.req.param("id")
try{
    const blog = await prisma.blog.findFirst({
    where:{
        id: Number(id)
    }
  })

  return c.json({
    blog
  })
}
catch(e){
     c.status(404)

    return handleError(c, e)
}
})


blogRouter.put('/published' , async (c)=>{
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
    const body = await c.req.json();

    const published = await prisma.blog.update({
        where:{
            id : body.id
        },
        data:{
            published: true
                }
    })
    return c.text("Updated successfully!!")

})

 

