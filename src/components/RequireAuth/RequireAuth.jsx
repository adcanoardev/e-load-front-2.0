import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const RequireAuth = ({ children, userAccess, adminAccess }) => {
    const { user } = useSelector((state) => state.users);

    if(!user && userAccess){
        return children;
    }
    else if (user && userAccess){
        return <Navigate to="/"/>;
    }
    else if (!user){
        return <Navigate to="/"/>;
    }
    else if (adminAccess && user.rol !== "admin"){
        return <Navigate to="/"/>;
    }
    else if (user){
        return children;
    }

    return children;
}
RequireAuth.propTypes = {
    children: PropTypes.node,       //poner node o children
    userAccess: PropTypes.bool,
    adminAccess: PropTypes.bool
}

export default RequireAuth