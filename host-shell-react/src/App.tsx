import React, {useEffect} from 'react';
import './App.css';

import {
    listenForAuthenticationRequest,
    dispatchAuthenticationTokenToListener
} from "mfe-eventbus"

const App = () => {

    const [formData, setFormData] = React.useState('')
    const [token, setToken] = React.useState('')

    listenForAuthenticationRequest();

    useEffect(() => {
        if (token) {
            dispatchAuthenticationTokenToListener(token)
        }
    }, [token])

    const handleChange = (event: any) => {
        setFormData(event.target.value)
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()
        setToken(formData)
        setFormData('')
    }

    return (
        <div className="App">
            <div className="firmware-app-header">
                <img src="https://modus-bootstrap.trimble.com/img/trimble-icon.svg" height="25" width="25" alt="home" />
                <h1 className="firmware-app-header-text">Firmware Management</h1>
            </div>
            <div className="firmware-table-container">
                <h1 className="firmware-table-container-header-text">Firmware</h1>
                <div className="firmware-token-container">
                    <label className="firmware-token-label">Token:</label>
                        <modus-text-input class="firmware-token-text-input" type="text" label="" placeholder="Enter token" value={token} onInput={(event: Event) => handleChange(event)} />
                        <modus-button onClick={(event: Event) => handleSubmit(event)}>Submit</modus-button>
                </div>
                <div className="firmware-nav-container">
                    <firmware-filter-component></firmware-filter-component>
                    <add-new-firmware-component></add-new-firmware-component>
                </div>
                <firmware-table-component></firmware-table-component>
            </div>
        </div>
    )
}

export default App
