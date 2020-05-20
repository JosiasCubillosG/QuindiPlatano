import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import Context from '../Context'

const privateRoute = ({component: Component, ...rest}) => {
    return (
        <Context.Consumer>
            {
                ({isAuth}) =>(
                    <Route 
                        {...rest}
                        render = {props => 
                            isAuth ? <Component {...props} />
                            : <Redirect to='/' />
                        }
                    
                    
                    />
                    )
            }
        </Context.Consumer>
    );
};

export default privateRoute;