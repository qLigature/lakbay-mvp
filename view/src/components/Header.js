import React from 'react';
import '../css/Header.css';
import logo from '../img/logo2.png';
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function Header() {
	return (
		<div className="header d-flex align-items-center justify-content-between">
			<img className="mx-5 header_logo" src={logo} alt="The GetAway Logo"/>
		
			<div className="header_searchBar d-flex align-items-center">
			    <input type="text" />
			    <SearchIcon />

			</div>

			<div className="header_avatar d-flex align-items-center justify-content-between">
			    <p>Become a host</p>
			    <AccountBoxIcon />
			</div>




		</div>


		
	)
}

export default Header