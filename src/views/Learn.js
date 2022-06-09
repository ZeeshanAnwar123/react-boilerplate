import { Col, FormGroup, Input, Row } from 'reactstrap';
import Upload from '../assets/img/upload.png';
import DropZone from 'react-dropzone';
import CategoryDropdown from '../components/CategoryDropdown';
import { useState } from 'react';
import TutorialImage from '../assets/img/tutorial_image.png';
import TimeSquare from '../assets/img/Time Square.png';

const Learn = props => {
	let [tutorials, setTutorials] = useState(['']);
	const handleCourseImage = files => {
		console.log({ files });
	};
	const handleTutorialFile = files => {
		console.log({ files });
	};
	return (
		<>
			<div className='d-flex'>
				<span className='fw-600 fs-25 text-A6A6A6'>New Course</span>
			</div>
			<Row className='mt-4'>
				<Col md='6'>
					<DropZone onDrop={handleCourseImage}>
						{({ getRootProps, getInputProps, isDragActive }) => (
							<div
								{...getRootProps()}
								className='rounded w-100 h-100 bg-white upload d-flex align-items-center justify-content-center'
							>
								<div className='d-flex flex-column justify-content-center align-items-center'>
									<img
										src={Upload}
										className='upload__logo'
									/>
									<span className='fs-17 fw-500 mt-2 text-A6A6A6'>
										{isDragActive
											? 'Drop Here'
											: 'Upload Image'}
									</span>
									<input {...getInputProps()} />
								</div>
							</div>
						)}
					</DropZone>
				</Col>
				<Col md='6'>
					<FormGroup>
						<Input
							type='text'
							className='border-0'
							placeholder='Title of Post'
						/>
					</FormGroup>
					<FormGroup className='mt-4'>
						<Input
							type='text'
							className='border-0'
							placeholder='Author'
						/>
					</FormGroup>
				</Col>
			</Row>
			<div className='d-flex mt-5'>
				<span className='fw-600 fs-25 text-A6A6A6'>Tutorials</span>
			</div>
			{tutorials.map((tutorial, key) => (
				<Row
					key={`tutorial-${key}`}
					className={key == 0 ? 'mt-2' : 'mt-4'}
				>
					<Col md='6'>
						<div className='mt-4'>
							<DropZone onDrop={handleTutorialFile}>
								{({
									getRootProps,
									getInputProps,
									isDragActive,
								}) => (
									<div
										{...getRootProps()}
										className='rounded w-100 h-100 bg-white upload d-flex align-items-center justify-content-center'
									>
										<div className='d-flex flex-column justify-content-center align-items-center'>
											<img
												src={Upload}
												className='upload__logo'
											/>
											<span className='fs-17 fw-500 mt-2 text-A6A6A6'>
												{isDragActive
													? 'Drop Here'
													: 'Upload Image or Video'}
											</span>
											<input {...getInputProps()} />
										</div>
									</div>
								)}
							</DropZone>
							<FormGroup className='mt-3'>
								<Input
									type='text'
									className='border-0'
									placeholder='Video / Image Name'
								/>
							</FormGroup>
						</div>
					</Col>
					<Col md='6'>
						<CategoryDropdown
							className='ml-auto'
							value={'Tutorial Category'}
						/>
						<FormGroup className='mt-3'>
							<Input
								type='text'
								className='border-0'
								placeholder='Title of Tutorial'
							/>
						</FormGroup>
						<FormGroup className='mt-4 mb-0'>
							<Input
								type='textarea'
								rows='10'
								className='border-0'
								placeholder='Description'
							/>
						</FormGroup>
					</Col>
				</Row>
			))}
			<div className='d-flex w-100 my-4'>
				<button
					className='add-button ml-auto mr-3'
					onClick={e =>
						setTutorials(prevState => {
							return [...prevState, ''];
						})
					}
				>
					<img src={Upload} />
				</button>
				<CategoryDropdown options={['Publish']} value='Publish' />
			</div>
			<div className='d-flex mt-5'>
				<span className='fw-600 fs-25 text-A6A6A6'>
					Published Tutorials
				</span>
			</div>
			<Row className='mt-4 align-items-center'>
				{new Array(5).fill(1).map((_, key) => (
					<Col
						sm='6'
						xl='4'
						key={'TutorialCard' + key}
						className='mb-4'
					>
						<div className='tutorial-card d-flex position-relative'>
							<img
								src={TutorialImage}
								className='tutorial-card__file'
							/>
							<div className='w-100 p-2 d-flex flex-column align-items-start justify-content-center'>
								<span className='fw-600 fs-14 color-17002F d-block'>
									Estate Planning and Management
								</span>
								<span className='mt-2 d-inline-block tutorial-card__tag tutorial-card__tag--green fw-500'>
									Corporate
								</span>
								<div className='d-flex align-items-center mt-2 tutorial-card__time-wrapper'>
									<img
										src={TimeSquare}
										width='12px'
										height='12px'
										className='mr-1'
									/>
									<span className='tutorial-card__time'>
										10:30AM - Monday
									</span>
								</div>
							</div>
							<div className='position-absolute tutorial-card__edit'>
								<i className='fa fa-edit'></i>
							</div>
						</div>
					</Col>
				))}
				<Col sm='6' xl='4' className='text-center'>
					<div className='d-inline-flex bg-white new-post-btn align-items-center py-3 px-4'>
						<img
							src={Upload}
							width='32px'
							className='mr-3'
							height='32px'
						/>
						<span className='fs-17 fw-500 text-A6A6A6'>
							New Post
						</span>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default Learn;
