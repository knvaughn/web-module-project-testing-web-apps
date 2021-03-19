import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    screen.getByText('Contact Form');
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText('First Name*');
    userEvent.type(firstNameInput, 'Ben');
    const errorMessages = screen.getAllByText(/error/i);
    expect(errorMessages).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const submitButton = document.querySelector("input[type='submit']");
    userEvent.click(submitButton);
    const errorMessages = screen.getAllByText(/error/i);
    expect(errorMessages).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText('First Name*');
    const lastNameInput = screen.getByLabelText('Last Name*');
    userEvent.type(firstNameInput, 'Henry');
    userEvent.type(lastNameInput, 'Cavill');
    const submitButton = document.querySelector("input[type='submit']");
    userEvent.click(submitButton);
    const errorMessages = screen.getAllByText(/error/i);
    expect(errorMessages).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const emailInput = screen.getByLabelText('Email*');
    userEvent.type(emailInput, 'asdfasdf');
    const errorMessage = screen.getByText(/error/i);
    expect(errorMessage).toHaveTextContent("email must be a valid email address");
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText('First Name*');
    userEvent.type(firstNameInput, 'Henry');
    const emailInput = screen.getByLabelText('Email*');
    userEvent.type(emailInput, 'henrycavill@gmail.com');
    const submitButton = document.querySelector("input[type='submit']");
    userEvent.click(submitButton);
    const errorMessage = screen.getByText(/error/i);
    expect(errorMessage).toHaveTextContent("lastName is a required field");

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText('First Name*');
    userEvent.type(firstNameInput, 'Henry');
    const lastNameInput = screen.getByLabelText('Last Name*');
    userEvent.type(lastNameInput, 'Cavill');
    const emailInput = screen.getByLabelText('Email*');
    userEvent.type(emailInput, 'henrycavill@gmail.com');
    const submitButton = document.querySelector("input[type='submit']");
    userEvent.click(submitButton);
    const firstnameDisplay = document.querySelector('p[data-testid="firstnameDisplay"');
    expect(firstnameDisplay).toHaveTextContent("Henry");
    const lastnameDisplay = document.querySelector('p[data-testid="lastnameDisplay"');
    expect(lastnameDisplay).toHaveTextContent("Cavill");
    const emailDisplay = document.querySelector('p[data-testid="emailDisplay"');
    expect(emailDisplay).toHaveTextContent("henrycavill@gmail.com");
    const messageDisplay = document.querySelector('p[data-testid="messageDisplay"');
    expect(messageDisplay).toBeNull();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText('First Name*');
    userEvent.type(firstNameInput, 'Henry');
    const lastNameInput = screen.getByLabelText('Last Name*');
    userEvent.type(lastNameInput, 'Cavill');
    const emailInput = screen.getByLabelText('Email*');
    userEvent.type(emailInput, 'henrycavill@gmail.com');
    const messageInput = screen.getByLabelText('Message');
    userEvent.type(messageInput, 'I love Henry Cavill');
    const submitButton = document.querySelector("input[type='submit']");
    userEvent.click(submitButton);
    const firstnameDisplay = document.querySelector('p[data-testid="firstnameDisplay"');
    expect(firstnameDisplay).toHaveTextContent("Henry");
    const lastnameDisplay = document.querySelector('p[data-testid="lastnameDisplay"');
    expect(lastnameDisplay).toHaveTextContent("Cavill");
    const emailDisplay = document.querySelector('p[data-testid="emailDisplay"');
    expect(emailDisplay).toHaveTextContent("henrycavill@gmail.com");
    const messageDisplay = document.querySelector('p[data-testid="messageDisplay"');
    expect(messageDisplay).toHaveTextContent("I love Henry Cavill");
});