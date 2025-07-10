import z from "zod"

export const signupInput = z.object({
    username: z.string,
    password: z.string,
    name: z.optional
})  

export const signinInput = z.object({
    username: z.string,
    password: z.string,
})  