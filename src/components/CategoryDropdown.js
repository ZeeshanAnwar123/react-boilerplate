import { useEffect, useState } from 'react';

const CategoryDropdown = ({ className, id, options = [], value }) => {
	let [isOpen, setIsOpen] = useState(false);
	let [active, setActive] = useState(value);
	const handleClick = e => {
		let dropdown = document.getElementById(`dropdown-${id}`);
		if (dropdown && !dropdown.contains(e.target)) {
			setIsOpen(false);
		}
	};
	useEffect(() => {
		window.addEventListener('click', handleClick);
		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, []);
	return (
		<div
			className={`category-dropdown position-relative py-2 rounded ${className}`}
			onClick={() => setIsOpen(prevState => !prevState)}
			id={`dropdown-${id}`}
		>
			<span className='pl-2 fs-17 fw-500'>{active}</span>
			<div className='ml-auto category-dropdown__icon'>
				<i className='fa fa-angle-down'></i>
			</div>
			<div
				className={`position-absolute w-100 category-dropdown__menu rounded ${
					isOpen ? 'category-dropdown__menu--open' : ''
				}`}
			>
				{options.map((option, key) => (
					<div
						key={`dropdownItem-${id}-${key}`}
						className='category-dropdown__menu__item'
						onClick={() => setActive(option)}
					>
						{option}
					</div>
				))}
			</div>
		</div>
	);
};

export default CategoryDropdown;
