import React from 'react';
import { Form, TagPicker, Icon, ControlLabel, FormControl, Container, ButtonToolbar, Button, FormGroup, Header, Navbar, FlexboxGrid, Content, Panel, Footer } from 'rsuite';


export default class AsynExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            items: [],
            cacheData: [],
            value: []
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getUsers('react');
    }

    handleSelect(value, item, event) {
        const { cacheData } = this.state;
        cacheData.push(item);
        this.setState({
            cacheData
        });
    }

    getUsers(word) {
        fetch(`http://localhost:3001/data`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading: false,
                    items: data
                });
            })
            .catch(e => console.log('Oops, error', e));
    }

    handleSearch(word) {
        if (!word) {
            return;
        }

        this.setState({
            loading: true
        });
        this.getUsers(word);
    }
    handleChange(value) {
        this.setState({ value });
    }
    render() {
        const { items, loading } = this.state;
        return (
            <TagPicker
                data={items}
                style={{ width: 300 }}
                renderMenu={menu => {
                    if (loading) {
                        return (
                            <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                                <Icon icon="spinner" spin /> Loading...
                            </p>
                        );
                    }
                    return menu;
                }}
            />
        );
    }
}