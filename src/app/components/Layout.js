import React from "react";
import Header from "./header";
import MenuHamburguer from "./hamburguerMenu";

const Layout = (props) => {
    return(
        <React.Fragment>
            <Header />
            <MenuHamburguer />
            {props.children}
        </React.Fragment>
    )
}

export default Layout;