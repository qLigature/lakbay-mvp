# Lakbay

A Single Page Application for connecting travelers looking for accomodations in specific areas, with people willing to rent out their homes.

Lakbay offers both travellers a convenient platform for finding lodging, and would-be tenants an easy, relatively stress-free way to earn some income from their property. Built using a MERN stack (MongoDB, Express, ReactJS, Node.js),and React Bootstrap, following basic MVC architecture.

## Usage

1. Run `node ./server.js` in the terminal to activate the server
2. In `./views`, run `npm start` in the terminal to start the React app.

## Requirements

Use `npm install` in the root folder and in `./views` if needed.

## Features

1. Simple but stylish landing page, with a user-friendly navigation bar
2. Secure registration and login system for both admins and users
3. User/admin authorization using JWT and cookies
4. Room catalog page, featuring all available rooms and uploaded images of those rooms
5. Room information page, which includes more details about the selected room and lets users add the room to their booking
6. Booking view page, which shows the currently booked room, as well as the option to confirm their booking
7. User profile page, where users can see their profile details, as well as their reservation history in Lakbay
8. For admins, a powerful admin dashboard that can retrieve all room listings, create new room listings, update listing information, and even toggle the availability of certain listings if needed
