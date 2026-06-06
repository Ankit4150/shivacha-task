 const backendDomain="http://localhost:3000";

const Summaryapi={
    login:{
        url:`${backendDomain}/v1/admin/login`,
        method:"post"
    },
    signup:{
         url:`${backendDomain}/v1/user/register`,
        method:"post"
    },
    userdetails:{
         url:`${backendDomain}/v1/me`,
        method:"get"
    },
    alluser:{
          url:`${backendDomain}/v1/alluser`,
        method:"get"
    }
    
    
}


export default  Summaryapi;



