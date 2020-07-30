import React, { useState } from 'react'
import {
    Grid,
    Menu,
    Segment,
    Sidebar,
    Container,
    Divider,
    Icon,
    Button,
    Header,
    Input
} from 'semantic-ui-react';
import {
    NavLink as Link
} from "react-router-dom";
import SideBarRoutes from "./sideBarRoutes.auth.page"


const Template = (props) => {

    const [url, setUrl] = useState('');

    function handleClick(url) {
        props.history.push(url);
    }

    return (
        <>
            <Grid padded style={{ background: 'black', margin: '0px' }}>
                <Menu borderless inverted fluid style={{ height: '6vh' }}>
                    <Menu.Item header as="a">
                        Project name
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Input placeholder="Search..." size="small" />
                        </Menu.Item>
                        <Menu.Item as="a">Dashboard</Menu.Item>
                        <Menu.Item as="a">Settings</Menu.Item>
                        <Menu.Item as="a">Profile</Menu.Item>
                        <Menu.Item as="a">Help</Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Grid>
            <Grid padded fluid style={{ height: '94vh' }}>
                {/*Side Bar*/}
                <Grid.Column
                    tablet={3}
                    computer={2}
                    only="tablet computer"
                    id="sidebar"
                    style={{ background: 'grey' }}
                >
                    <Grid.Row textAlign='justify'>
                        <Menu vertical fluid text >
                            <Menu.Item name='home' as={Link} exact to='/home' >Αρχική</Menu.Item>
                            <Menu.Item as={Link} to='/home/users' >Χρήστες</Menu.Item>
                            <Menu.Item as={Link} to='/home/logout' >LogOut</Menu.Item>
                            <Divider hidden />
                            <Menu.Item as="a">Nav item</Menu.Item>
                            <Menu.Item as="a">Nav item again</Menu.Item>
                            <Menu.Item as="a">One more nav</Menu.Item>
                            <Menu.Item as="a">Another nav item</Menu.Item>
                            <Menu.Item as="a">More navigation</Menu.Item>
                            <Divider hidden />
                            <Menu.Item as="a">Macintoch</Menu.Item>
                            <Menu.Item as="a">Linux</Menu.Item>
                            <Menu.Item as="a">Windows</Menu.Item>
                        </Menu>
                    </Grid.Row>
                </Grid.Column>
                {/* Main Content*/}
                <Grid.Column
                    tablet={13}
                    computer={14}
                    floated="right"
                    id="content"
                    style={{ background: 'white' }}
                >
                    <Grid.Row >
                        <SideBarRoutes {...props} />
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        </>
    )
}

export default Template;
