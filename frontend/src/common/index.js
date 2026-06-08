

 const backendDomain="http://localhost:3000";

const Summaryapi={
    login:{
        url:`${backendDomain}/api/auth/login`,
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
    },
    updatestatus:{
         url:`${backendDomain}/v1/admin/statuschange`,
        method:"put"
    },
    deleteuser:{
          url:`${backendDomain}/v1/admin/delete`,
        method:"delete"
    },
     logout:{
          url:`${backendDomain}/api/auth/logout`,
        method:"post"
    },attendanceCheckin: {
  url: `${backendDomain}/v1/attendance/checkin`,
  method: "post"
},

attendanceCheckout: {
  url: `${backendDomain}/v1/attendance/checkout`,
  method: "post"
},

attendanceMonthly: {
  url: `${backendDomain}/v1/attendance/monthly`,
  method: "get"
},
    attendanceToday: {
  url: `${backendDomain}/v1/attendance/today`,
  method: "get"
},
 verifyOtp: {
      url: `${backendDomain}/api/auth/verify-otp`,
  method: "post"
},
assigntask:{
    url: `${backendDomain}/v1/assign-task`,
  method: "post"
}

    
    
}


export default  Summaryapi;
  


