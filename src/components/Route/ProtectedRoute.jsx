import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const ProtectedRoute = ({ component: Component, isAdmin }) => {

  const { isAuth } = useSelector(state => state.userAuth);
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    } 
    else if (isAdmin && userRole !== "superMan") {
      navigate("/login");
    }
  }, [isAuth, isAdmin, userRole, navigate]);

  return isAuth && (!isAdmin || userRole === "superMan") ? <Component /> : null;
};

export default ProtectedRoute;
