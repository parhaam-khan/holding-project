import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


// if you can't use css for handling dark and light colors you can use this hook in your components (ex. for changing images in different themes)
const useTheme = () => {
    const checked = useSelector((state:any) => state.holding.darkMode);
const[theme,setTheme] = useState('');

    useEffect(() => {
        const themeMode = document.documentElement.getAttribute('data-theme')!;
    setTheme(themeMode)
    },[checked])

    return ( 
    {theme}
     );
}
 
export default useTheme;