import { useState } from 'react';
import { Col, Row, Input, Container, Button } from 'reactstrap';

const Calculators = () => {
	let [activeCategory, setActiveCategory] = useState(null);
	let [isNewCategory, setIsNewCategory] = useState(false);
	let [categories, setCategories] = useState(['Budget']);
	let [category, setCategory] = useState('');
	let [contents, setContents] = useState([]);
	const handleSaveCategory = () => {
		setIsNewCategory(false);
		if (category != '' && !categories.includes(category)) {
			setCategories(prevState => {
				return [...prevState, category];
			});
		}
		setCategory('');
	};
	const removeContent = key => {
		setContents(prevState => {
			prevState = prevState.filter((_, _key) => _key != key);
			return [...prevState];
		});
	};
	return (
		<Row noGutters className='mt-5 mb-4'>
			<Col md='3'>
				{categories.map((tab, tabIdx) => (
					<div
						onClick={() => setActiveCategory(tab)}
						className={`tab fw-500 fs-17 w-100 ${
							tab == activeCategory ? 'tab--active' : ''
						}`}
						key={'tab' + tabIdx}
					>
						{tab}
					</div>
				))}
				{isNewCategory ? (
					<div className='d-flex align-items-center category__input mt-1'>
						<Input
							value={category}
							onChange={e => setCategory(e.target.value)}
							placeholder='Category'
						/>
						<i
							className='fa fa-save category__save-btn'
							onClick={handleSaveCategory}
						></i>
					</div>
				) : (
					<div
						className={`tab fw-500 fs-17 w-100`}
						onClick={() => setIsNewCategory(true)}
					>
						Add New Category
					</div>
				)}
			</Col>
			{activeCategory != null && (
				<Col>
					<div className='bg-white w-100 rounded py-4 h-100'>
						<div className='d-flex'>
							<div className='tab__title ml-auto'>
								{activeCategory}
							</div>
						</div>
						<Container fluid className='mt-3'>
							{contents.map((content, key) => (
								<Row
									key={'Content' + key}
									className='align-items-center mb-2'
								>
									<Col xs='6'>
										<Input
											type='text'
											className='calculator__input fs-17 fw-500'
											placeholder='Content Type'
											value={content.content}
											onChange={e =>
												setContents(prevState => {
													prevState[key].content =
														e.target.value;
													return [...prevState];
												})
											}
										/>
									</Col>
									<Col xs='5'>
										<Input
											type='text'
											className='calculator__input fs-17 fw-500'
											placeholder='URL'
											value={content.url}
											onChange={e =>
												setContents(prevState => {
													prevState[key].url =
														e.target.value;
													return [...prevState];
												})
											}
										/>
									</Col>
									<Col xs='1'>
										<svg
											width='11'
											height='11'
											viewBox='0 0 11 11'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
											onClick={e => removeContent(key)}
											className='cursor-pointer'
										>
											<path
												d='M7.2185 5.33317L10.2758 2.27583C10.7965 1.75517 10.7965 0.911167 10.2758 0.3905C9.75517 -0.130167 8.91117 -0.130167 8.3905 0.3905L5.33317 3.44783L2.27583 0.3905C1.75583 -0.130167 0.9105 -0.130167 0.3905 0.3905C-0.130167 0.911167 -0.130167 1.75517 0.3905 2.27583L3.44783 5.33317L0.3905 8.3905C-0.130167 8.91117 -0.130167 9.75517 0.3905 10.2758C0.6505 10.5365 0.991833 10.6665 1.33317 10.6665C1.6745 10.6665 2.01583 10.5365 2.27583 10.2758L5.33317 7.2185L8.3905 10.2758C8.65117 10.5365 8.99183 10.6665 9.33317 10.6665C9.6745 10.6665 10.0152 10.5365 10.2758 10.2758C10.7965 9.75517 10.7965 8.91117 10.2758 8.3905L7.2185 5.33317Z'
												fill='#D2D2D2'
											/>
										</svg>
									</Col>
								</Row>
							))}
							<div className='d-flex mt-3 justify-content-end pb-4 mb-4'>
								<button
									onClick={() => {
										setContents(prevState => [
											...prevState,
											{
												content: '',
												url: '',
											},
										]);
									}}
									className='calculator__btn calculator__btn--outlined fs-17 fw-500 mr-2'
								>
									Add New Calculator
								</button>
								<button className='calculator__btn fs-17 fw-500'>
									Save
								</button>
							</div>
							<br />
							<br />
						</Container>
					</div>
				</Col>
			)}
		</Row>
	);
};

export default Calculators;
