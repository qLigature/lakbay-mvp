import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import FbIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import IgIcon from '@mui/icons-material/Instagram';

import '../css/Footer.css';

function Footer() {
	return (
		<div className='footer d-flex align-items-center justify-content-between px-5'>
			<div className="d-flex align-items-center">
				<p>© 2022 The GetAway Inc.{/* · Privacy · Terms*/}</p>

				{/*<Button as={Link} to="/Home">Privacy</Button>
		    	<p>·</p>
		    	<Button as={Link} to="/Home">Terms</Button>
		    	<p>·</p>*/}

			</div>

			<div className="d-flex align-items-center justify-content-between px-1">

				<Button variant="outlined" formTarget="_blank" href="https://fb.com">
					<FbIcon />
				</Button>
				<Button variant="outlined" formTarget="_blank" href="https://twitter.com">
					<TwitterIcon />
				</Button>
				<Button variant="outlined" formTarget="_blank" href="https://instagram.com">
					<IgIcon />
				</Button>

			</div>
		</div>
	);
}

export default Footer;