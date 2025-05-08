import { useContext, useEffect, type ComponentType } from "react";
import GlobalContext from "../context/global";
import { useNavigate } from "react-router-dom";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  function ComponentWithAuth(props: P) {
    const navigate = useNavigate();
    const { token } = useContext(GlobalContext);

    useEffect(() => {
      if (!token) {
        navigate('/')
      }
    }, [navigate, token]);

    return token ? <WrappedComponent {...props} /> : null;
  }

  return ComponentWithAuth;
};

export default withAuth;
