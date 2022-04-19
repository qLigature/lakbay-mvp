import React from 'react';
import { Button, Col } from 'react-bootstrap';
import '../css/Header.css';
import logo from '../img/logo1.png';
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function Header() {
	return (
		<div className="header d-flex align-items-center justify-content-between">
			<a href="/">
				<img className="mx-4 my-2 header_logo" src={logo} alt="The GetAway Logo" />
			</a>


			<div className="header_searchBar d-flex align-items-center">
				<input type="text" />
				<SearchIcon />
			</div>

			<div className="header_avatar d-flex align-items-center">
				<Button className="hostBtn" variant="outlined" href="/host">
					<h6>Become a host</h6>
				</Button>

				<div className="dropdown px-1">
					<Button className="dropBtn py-2" variant="outlined">
						<AccountBoxIcon className="icon" />
					</Button>
					<div className="dropdown-content">
						<a href="/signup">Sign up</a>
						<a href="/login">Log in</a>
						<a href="/login">Log out</a>
						<div className="dropdown-divider"></div>
						<a href="/host">Host your home</a>
						<a href="/contact us">Contact Us</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;