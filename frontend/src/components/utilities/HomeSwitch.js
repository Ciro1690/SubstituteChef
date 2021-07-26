import React, {useState, useEffect} from 'react';
import CompanyList from '../home/CompanyList';
import MobileList from '../home/MobileList';

const HomeSwitch = () => {

    /**  sets window width in state
    Event listener updates window width whenever window is resized
    DesktopHome component is loaded if window width is greater than 960px
    Otherwise, MobileHome component is loaded.
    inspiration from https://stackoverflow.com/questions/39435395/reactjs-how-to-determine-if-the-application-is-being-viewed-on-mobile-or-deskto/39440330
    */

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    return (
        <>
            {windowWidth > 960 ?
                <CompanyList /> :
                <MobileList />
            }
        </>
    );
}

export default HomeSwitch;