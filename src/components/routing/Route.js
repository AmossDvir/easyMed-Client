import {useState, useEffect} from "react";

const Route = ({children, path}) => {
    const [currPath,setCurrPath] = useState(window.location.pathname);
    useEffect(() => {
        const onNavigation = () => {
            setCurrPath(window.location.pathname);
        }
        window.addEventListener('popstate',onNavigation)
    },[]);
    return currPath === path? children : null;
};

export default Route;