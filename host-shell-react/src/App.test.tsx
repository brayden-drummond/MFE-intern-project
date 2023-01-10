import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from './App'

describe('App', () => {
    it('Should render a blank input field on render', () => {
        render(<App />)
        const input = screen.getByLabelText('Trimble token:')
        expect(input.textContent).toBe('')
    })
    it('should allow user to enter Trimble token', async () => {
        render(<App />)
        const input = screen.getByLabelText('Trimble token:')
        fireEvent.change(input, {target: {value: 'test'}})
        // @ts-ignore
        expect(input.value).toBe('test')
    })

})