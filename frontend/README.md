# Capstone 2 Project

# Substitute Chef

A website where restaurant workers can apply to shifts at local restaurants

Live site can be viewed at [Substitute Chef](https://subchef.surge.sh/)

## Overview

- Allows a restaurant worker to connect with companies and schedule a shift of work
- Targeted toward restaurant workers who need assistance finding work and restaurants in need of workers
- Users create a profile to search for open jobs
- Workers can view company information and apply to open jobs
- A map from GoogleMaps API displays a marker for each company
- A user can also create a company and post job openings
- A user can view job applications and approve or deny them
- An email is sent to the company when a user applies to a job and to the user when a company updates the status of the job application
- Site is hosted with restaurants in San Diego

## Schema 

- Table for user containing username, password, first name, last name, and email
- Table for company containing id, name, url, address, latitude, longitude and username
- Table for job containing id, position, hourly pay, date and company id
- Table for application containing status, username and job id

## Potential API issues

- Error handling if API is down or doesn't return a 200 response code

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

## Data
- Google Maps API is used to search for Geolocations from the address and markers are created for each company
- SendGrid is used to send emails 

## Technology Stack
- Application is built using Javascript, React, Node and Express

## Stretch Goals
- Restaurants can pay employees through the site
- Liability waver for both to sign
- Ratings for users and companies
- Add profile photo and company photo
