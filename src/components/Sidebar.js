import Logo from '../assets/img/logo.png';
import dashboard from '../assets/img/dashboard.svg';
import meetings from '../assets/img/meetings.svg';
import user_details from '../assets/img/user_details.svg';
import content from '../assets/img/content.svg';
import settings from '../assets/img/settings.svg';
import { Link } from 'react-router-dom';
const Sidebar = () => {
	return (
		<div className='sidebar'>
			<div className='d-flex'>
				<img src={Logo} className='sidebar__logo' />
			</div>
			<div className='sidebar__item'>
				<img className='sidebar__item__image' src={dashboard} />
				<span className='sidebar__item__text'>Dashboard</span>
			</div>
			<div className='sidebar__item'>
				<img className='sidebar__item__image' src={meetings} />
				<span className='sidebar__item__text'>Meetings</span>
			</div>
			<div className='sidebar__item'>
				<img className='sidebar__item__image' src={user_details} />
				<span className='sidebar__item__text'>User Details</span>
			</div>
			<div className='sidebar__item'>
				<img className='sidebar__item__image' src={content} />
				<span className='sidebar__item__text'>Content</span>
			</div>
			<div className='sidebar__item'>
				<img className='sidebar__item__image' src={settings} />
				<span className='sidebar__item__text'>Settings</span>
			</div>
			<Link to='/auth/logout' className='sidebar__item'>
				<span className='sidebar__item__text'>Logout</span>
			</Link>
		</div>
	);
};

export default Sidebar;
