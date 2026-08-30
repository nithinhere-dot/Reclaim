import { Navigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

function ProtectedRoute({children,allowedRole,redirectTo='/login'}){
    const {user}=useAuth();

    if(!user){
        return <Navigate to='/login'/>;
    }
    if(allowedRole && user.role!==allowedRole){
        return <Navigate to={redirectTo}/>;
    }
    return children;
}

export default ProtectedRoute;