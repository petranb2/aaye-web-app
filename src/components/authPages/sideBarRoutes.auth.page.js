import React from 'react'
import {
    NavLink as Link,
    useHistory,
    useRouteMatch,
    Switch,
    Route
} from "react-router-dom";
import IndexPage from "./index2.auth.page";
import LogoutPage from "./logout.auth.page";
import Users from "./users.auth.page";
import NewUser from "./newUser.auth.page"


export default function sideBarRoutes(props) {

    let path = props.path;

    return (
        <Switch>
            <Route path={`${path}/logout`}>
                <LogoutPage />
            </Route>
            <Route path={`${path}/users`}>
                <Users />
            </Route>
            <Route path={`${path}/newUser`}>
                <NewUser />
            </Route>
            <Route path={path}>
                <IndexPage />
            </Route>
        </Switch>
    )
}
