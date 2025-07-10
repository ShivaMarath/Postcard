import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { handleError }  from './errorHandler'
import { signinInput , signupInput } from './zod'

export const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL: string;
    JWT_SECRET : string;
  }
}>()

export const getPrismaClient = (datasourceUrl: string) => {
  return new PrismaClient({ datasourceUrl }).$extends(withAccelerate())
}
function errorResponse(c: any, error: unknown, status = 500) {
  if (error instanceof Error) {
    return c.json({ 
      error: 'Database operation failed',
      message: error.message 
    }, status)
  }
  return c.json({ 
    error: 'Unknown error occurred'
  }, status)
}


userRouter.get('/debug', (c) => {
  return c.json({
    JWT_SECRET_EXISTS: !!c.env.JWT_SECRET, 
    DATABASE_URL_EXISTS: !!c.env.DATABASE_URL
  });
});

userRouter.post('/signup', async (c) => {
    if (!c.env.JWT_SECRET) {
    console.error('JWT_SECRET is not configured')
    return c.json({ error: 'Server configuration error' }, 500)
  }
   if (!c.env.DATABASE_URL) {
    return c.json({ error: 'DATABASE_URL not configured' }, 500);
  }


  let prisma;
  try {
    prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  } catch (e) {
     const error = e instanceof Error ? e : new Error(String(e))
    
    console.error('Signup failed:', error)
    return c.json({
      error: 'Signup failed',
      message: error.message
    }, 500)
  }
  
 

 try{
  const body = await c.req.json()

  const {success} = signupInput.safeParse(body);
  if(!success){
    return c.text("invalid input")
  }
  
    const user = await prisma.user.create({
    data: {
      username: body.username,
      password: body.password,
      name: body.name
    }
  })
  const jwt = await sign ({ id: user.id }  ,c.env.JWT_SECRET)
    return c.text(jwt)
  }
  catch(e){
    return c.text("There was an error creating a user")
  }
  
})





userRouter.post('/signin', async (c) => {
    if (!c.env.JWT_SECRET) {
    console.error('JWT_SECRET is not configured')
    return c.json({ error: 'Server configuration error' }, 500)
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

  const body = await c.req.json()
  const {success} = signinInput.safeParse(body);
  if(!success){
    return c.text("invalid input")
  }
  try{
    const user = await prisma.user.findFirst({
    where: {
      username: body.username,
      password: body.password,
    }
  })
  if(!user){
    return c.text("Unauthorized")
  }
  const jwt = await sign ({ id: user.id }  ,c.env.JWT_SECRET)
    return c.text(jwt)
  
  
  }
  catch(e){
   return handleError(c, e)
  }
})


