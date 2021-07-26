
![Logo](https://live.staticflickr.com/65535/51335673305_203d5fdd33_w.jpg)

# Substitute Chef

A website where restaurant workers can search for and apply for local jobs

Live site can be viewed at [Substitute Chef](https://subchef.surge.sh/)

## Overview

- Allows a restaurant worker to connect with companies and schedule a shift of work
- Targeted toward restaurant workers who need assistance finding work and restaurants in need of workers
- Users create a profile to search for open jobs, register companies and host jobs
- Workers can view company information and apply to open jobs
- A map from GoogleMaps API displays a marker for each company
- An email is sent to the company when a user applies to a job and to the user when a company updates the status of the job application
- Site is hosted with restaurants in San Diego

## Tech Stack

**Client:** React, MaterialUI

**Server:** Node, Express

**API:** GoogleMaps, SendGrid

## Schema
- Table for user containing username, password, first name, last name, and email
- Table for company containing id, name, url, address, latitude, longitude and username
- Table for job containing id, position, hourly pay, date and company id
- Table for application containing status, username and job id

## Data
- Google Maps API is used to search for Geolocations from the address and markers are created for each company
- SendGrid is used to send emails
- When a user creates an account or signs in, a token is created using jwt/bcrypt and saved in local storage. The user is able to view personalized pages with a valid token.

## Functionality/User Flow

# User Functionality
- Upon entering the webpage, a user can choose to sign up or login
- Once logged in as a user, user can view/edit user profile
- A user can view all open job applications
- A user can also search for jobs with an accompanying interactive google map
- A user can apply directly to open jobs from the homepage
- After applying, an email is sent to the company

# Company Functionality
- A user can register companies
- Once a company is registered, A user can create a listing for a job which includes position, hourly pay, and the date
- A user can view/edit its company profiles
- A company can view applications and approve or deny applications
- Once the status of an application is updated, an email is sent to the user with the new information

## Installation

Install substitute-chef with npm

```bash
  npm install substitute-chef
  cd substitute-chef
    cd frontend
      npm start
    cd backend
      npm start
```
    
## Testing

- Tests were completed using Jest and can be accessed in the backend folder with 'npm test'
- Tests were performed on all routes and models

## Screenshot

![App Screenshot](https://live.staticflickr.com/65535/51332389411_4158ed5822_o.png)

## Dependencies

- MaterialUI
- Dotenv
- Google Maps/Geocode
- Sendgrid
- Axios
- Jest 
- JWT
- Reactstrap
- Nodemon
- Bcrypt
- Express
- Cors
- pg

## Author

- [Ciro Griffiths](https://www.github.com/Ciro1690)