import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Spinner } from 'reactstrap';
import { addCategory } from '../store/actions/categoryAction';

const CategoryDropdown = ({
	className,
	id,
	options = [],
	value,
	placeholder,
	item_value = 'value',
	item_text = 'text',
	onChange = () => {},
}) => {
	let [isOpen, setIsOpen] = useState(false);
	let [active, setActive] = useState('');
	let [isAdd, setIsAdd] = useState(false);
	let [category, setCategory] = useState({
		categoryColor: '#000000',
		categoryIcon: '',
		categoryId: '',
		categoryName: '',
		contentType: 3,
		section: 3,
		timeInterval: 0,
	});
	let dispatch = useDispatch();
	useEffect(() => {
		if (options != 'idle' && options != 'loading') {
			if (value) {
				let category = options.find(
					option => option.categoryId == value
				);
				setActive({
					[item_text]: category[item_text],
					[item_value]: category[item_value],
				});
			} else {
				setActive({ [item_text]: placeholder, [item_value]: '' });
			}
		}
	}, [options, value]);
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
	const handleCategorySubmit = e => {
		e.preventDefault();
		dispatch(addCategory(category));
		setIsAdd(false);
		setCategory({
			categoryColor: '#000000',
			categoryIcon: '',
			categoryId: '',
			categoryName: '',
			contentType: 3,
			section: 3,
			timeInterval: 0,
		});
	};
	return (
		<div
			className={`category-dropdown position-relative py-2 rounded ${className}`}
			id={`dropdown-${id}`}
		>
			{options == 'idle' || options == 'loading' ? (
				<div className='d-flex w-100 h-100 align-items-center justify-content-center'>
					<Spinner size='sm' />
				</div>
			) : (
				<>
					<span className='pl-2 fs-17 fw-500'>
						{active[item_text]}
					</span>
					<div
						onClick={() => setIsOpen(prevState => !prevState)}
						className='ml-auto category-dropdown__icon cursor-pointer'
					>
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
								className='category-dropdown__menu__item d-flex align-items-center'
								onClick={() => {
									setActive({
										[item_value]: option[item_value],
										[item_text]: option[item_text],
									});
									onChange({
										[item_value]: option[item_value],
										[item_text]: option[item_text],
									});
								}}
							>
								{option[item_text]}
								<div
									className='color-box ml-auto'
									style={{
										background: `#${option.categoryColor}`,
									}}
								></div>
							</div>
						))}
						{isAdd ? (
							<Form
								onSubmit={handleCategorySubmit}
								className='category-dropdown__menu__item px-0 d-flex align-items-center'
							>
								<Input
									size='sm'
									className='h-auto border-0 bg-transparent shadow-none outline-none'
									value={category.categoryName}
									style={{ width: 130 }}
									placeholder='Category Name'
									required
									onChange={e =>
										setCategory(prevState => {
											prevState.categoryName =
												e.target.value;
											return { ...category };
										})
									}
								/>

								<label
									className='color-box ml-auto mb-0'
									for='color-picker'
									style={{
										background: category.categoryColor,
									}}
								>
									<input
										id='color-picker'
										style={{ visibility: 'hidden' }}
										type='color'
										value={category.categoryColor}
										onChange={e =>
											setCategory(prevState => {
												prevState.categoryColor =
													e.target.value;
												return { ...category };
											})
										}
									></input>
								</label>
								<button
									type='submit'
									className='ml-3 category-dropdown__icon cursor-pointer h-100'
								>
									<i className='fa fa-plus'></i>
								</button>
							</Form>
						) : (
							<div
								className='category-dropdown__menu__item mt-2 d-flex align-items-center'
								onClick={() => setIsAdd(true)}
							>
								Add New Category
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default CategoryDropdown;
