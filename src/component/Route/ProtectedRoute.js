// import React, { Fragment } from 'react'
// import {  Route } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import {  useNavigate } from "react-router-dom";



// const ProtectedRoute = ({isAdmin,component:Component, ...rest }) => {
//     const {loading,isAuthenticated, user} = useSelector((state) => state.user);
//     const navigate = useNavigate();

//   return (
//     <Fragment>
//     {!loading === false && (
//         <Route 
//         {...rest}
//         render={(props) => {
//             if(!isAuthenticated) {
//                 return navigate("/login");
//             }

//             if (isAdmin === true && user.role !== "admin") {
//                 return navigate("/login");
//             }
//             return <Component {...props} />;
//         }}
//         />
//     )}
    
//     </Fragment>
//   );
// }

// export default ProtectedRoute


