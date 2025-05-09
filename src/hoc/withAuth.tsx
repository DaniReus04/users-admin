import { useContext, useEffect, type ComponentType } from "react";
import GlobalContext from "../context/global";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  function ComponentWithAuth(props: P) {
    const navigate = useNavigate();
    const { token, isLoadingToken } = useContext(GlobalContext);

    useEffect(() => {
      if (!token && !isLoadingToken) {
        navigate('/')
      }
    }, [navigate, token, isLoadingToken]);

    if (isLoadingToken) return <Loader />

    return token ? <WrappedComponent {...props} /> : null;
  }

  return ComponentWithAuth;
};

export default withAuth;
