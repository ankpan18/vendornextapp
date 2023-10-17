import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
        }),
    ],
    // jwt:{
    //     encryption:true
    // },
    // secret: "secret token",
    // callbacks: {
    //     async jwt(token, account) {
    //       if (account ?.accessToken) {
    //         token.accessToken = account.accessToken
    //       }
    //       return token;
    //     },
    //     redirect: async (url, _baseUrl)=>{
    //       if (url === '/create') {
    //         return Promise.resolve('/')
    //       }
    //       return  Promise.resolve('/')
    //     }
    // }
});

export {handler as GET, handler as POST};