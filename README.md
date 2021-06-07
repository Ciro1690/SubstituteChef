# Capstone-2

# Substitute Chef

## Overview

- Allows a chef, prep cook or dishwasher to connect with restaurants and schedule a shift of work
- Targeted toward restaurant workers who may need assistance finding work and restaurants needing workers
- Once logged in, workers create a profile to highlight their experience and choose their hourly wage
- Workers will be able to view companies with open shifts on Google Maps
- Site will be created with dummy restaurant data in a specific city

## Schema 

- Table for user containing username, password, first name, last name, email, and is company
- Table for company containing id, name, url, address and username
- Table for job containing id, position, hourly pay, date and company id
- Table for application containing username and job id

## Potential API issues

- Error handling if API is down or doesn't return a 200 response code

## Functionality/User Flow

- Upon entering the webpage, a user can choose to sign up or login as a user
- Once logged in as a user, user will be able to view/edit user information
- A user can also search for jobs on an interactive google map with filters for dates, type of work
- A user can also view a page of all upcoming and past jobs
- A user can choose to register as a company
- If logged in as a company, there will also be an option to view/edit user information
- A company can create a listing for a job which includes position, hourly pay, and date
- A company will receive an email once a user applies to a job. From that email, the restaurant can view the user's information and choose whether to accept or deny the job
- The user will receive an email with either a confirmation or denial of the job

## Data
- Google Maps API will be used to search for locations
- SendGrid will be used to send emails 

## Technology Stack
- Application will be built using Javascript, React and Node

## Stretch Goals
- Restaurants can pay employees through the site
- Mobile version of the app
- Liability waver for both to sign
- Ratings for users and companies
