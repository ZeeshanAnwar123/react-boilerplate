import React, { useEffect, useState } from 'react';
import moment from 'moment';
const TopBar = () => {
	let [currDateTime, setCurrDateTime] = useState();
	let [update, setUpdate] = useState(false);
	let updateDateTime = () => {
		setCurrDateTime(moment(new Date()).format('DD MMM YYYY, dddd'));
	};

	const handleClick = event => {
		let sidebar = document.getElementsByClassName('sidebar')[0];
		let navbarToggler = document.getElementById('navbar-toggler');
		if (
			sidebar &&
			!sidebar.contains(event.target) &&
			navbarToggler &&
			!navbarToggler.contains(event.target)
		) {
			document.body.classList.remove('opened');
		}
		setUpdate(prevState => !prevState);
	};
	const isSidebarOpened = () => {
		return document.body.classList.contains('opened');
	};
	const handleTogglerClick = () => {
		if (isSidebarOpened()) {
			document.body.classList.remove('opened');
		} else {
			document.body.classList.add('opened');
		}
		setUpdate(prevState => !prevState);
	};

	useEffect(() => {
		setInterval(() => {
			updateDateTime();
		}, 1000);
		updateDateTime();
	}, []);
	useEffect(() => {
		window.addEventListener('click', handleClick);
		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, []);

	return (
		<div className='d-flex mt-3'>
			<button
				id='navbar-toggler'
				className='d-block d-lg-none top-bar__button'
				onClick={handleTogglerClick}
			>
				{isSidebarOpened() ? (
					<i className='fas fa-times'></i>
				) : (
					<i className='fas fa-bars'></i>
				)}
			</button>
			<div className='d-flex w-100 align-items-center justify-content-end'>
				<span className='fs-17 fw-500 mr-3'>{currDateTime}</span>
				<button className='top-bar__button'>
					<i className='fas fa-search'></i>
				</button>
			</div>
		</div>
	);
};

export default TopBar;
