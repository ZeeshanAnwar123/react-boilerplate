import {
	Button,
	Col,
	Form,
	FormGroup,
	Input,
	Row,
	Spinner,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from 'reactstrap';
import Upload from '../assets/img/upload.png';
import CategoryDropdown from '../components/CategoryDropdown';
import { useState } from 'react';
import TimeSquare from '../assets/img/Time Square.png';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../store/actions/categoryAction';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
	addCourse,
	deleteCourse,
	editCourse,
	fetchCourses,
} from '../store/actions/courseAction';
import firebase from '../config/firebase';
import FilePicker from '../components/FilePicker';

const Learn = props => {
	let [course, setCourse] = useState({
		author: '',
		thumbnail: '',
		title: '',
	});
	let [isEditMode, setIsEditMode] = useState(false);
	let [isDeleteModal, setIsDeleteModal] = useState(false);
	let _course = useSelector(state => state.course);
	let [tutorials, setTutorials] = useState([
		{
			calculatorType: '',
			categoryId: '',
			content: [
				{
					bottomImage: '',
					bottomVideo: '',
					paragraphData: '',
					paragraphId: firebase
						.firestore()
						.collection('paragraph')
						.doc().id,
					paragraphTitle: '',
					topImage: '',
					topVideo: '',
				},
			],
			contentType: 3,
			contentUrl: '',
			documentId: '',
			icon: '',
			primaryImage: '',
			secondaryImage: '',
			section: 3,
			thumbnail: '',
			thirdImage: '',
			timeInterval: 0,
			title: '',
			videoUrl: '',
		},
	]);
	let [deleteLoading, setDeleteLoading] = useState(false);
	let [deleteCourseData, setDeleteCourseData] = useState({});
	let [publishLoading, setPublishLoading] = useState(false);
	let dispatch = useDispatch();

	let category = useSelector(state => state.category);

	const handleCourseImage = files => {
		let possibleFileTypes = ['gif', 'png', 'bmp', 'jpeg', 'jpg'];
		if (files.length == 0) {
			setCourse(prevState => {
				prevState.thumbnail = '';
				return { ...prevState };
			});
			return;
		}
		if (files.length != 1) {
			toast.error('Only 1 file is allowed!!!');
			return;
		}
		let file = files[0];
		let parts = file.name.split('.');
		let ext = parts[parts.length - 1];
		if (!possibleFileTypes.includes(ext.toLowerCase())) {
			toast.error(
				`Only files with ${possibleFileTypes.join(
					', '
				)} extensions are allowed!!!`
			);
			return;
		}
		setCourse(prevState => {
			prevState.thumbnail = file;
			return { ...prevState };
		});
	};
	const handlePublish = async e => {
		e.preventDefault();
		setPublishLoading(true);
		let isError = false;
		if (course.thumbnail == '') {
			isError = true;
			toast.error('Add course thumbnail!!!');
		}
		if (
			tutorials.some(
				tutorial =>
					tutorial.primaryImage == '' && tutorial.videoUrl == ''
			)
		) {
			isError = true;
			toast.error('Add tutorial image or video!!!');
		}
		if (tutorials.some(tutorial => tutorial.categoryId == '')) {
			isError = true;
			toast.error('Add tutorial category!!!');
		}
		if (isError) {
			setPublishLoading(false);
			return;
		}
		if (isEditMode) {
			await dispatch(editCourse({ course, tutorials }));
		} else {
			await dispatch(addCourse({ course, tutorials }));
		}
		setPublishLoading(false);
		setCourse({
			author: '',
			thumbnail: '',
			title: '',
		});

		setTutorials([
			{
				calculatorType: '',
				categoryId: '',
				content: [
					{
						bottomImage: '',
						bottomVideo: '',
						paragraphData: '',
						paragraphId: firebase
							.firestore()
							.collection('paragraph')
							.doc().id,
						paragraphTitle: '',
						topImage: '',
						topVideo: '',
					},
				],
				contentType: 3,
				contentUrl: '',
				documentId: '',
				icon: '',
				primaryImage: '',
				secondaryImage: '',
				section: 3,
				thumbnail: '',
				thirdImage: '',
				timeInterval: 0,
				title: '',
				videoUrl: '',
			},
		]);
	};
	const handleTutorialFile = (files, key) => {
		let possibleImageTypes = ['gif', 'png', 'bmp', 'jpeg', 'jpg'];
		let possibleVideoTypes = ['mp4', 'mov', 'wmv', 'flv', 'avi', 'webm'];
		if (files.length == 0) {
			setTutorials(prevState => {
				prevState[key].primaryImage = '';
				prevState[key].videoUrl = '';
				return [...prevState];
			});
			return;
		}
		if (files.length != 1) {
			toast.error('Only 1 file is allowed!!!');
			return;
		}
		let file = files[0];
		let parts = file.name.split('.');
		let ext = parts[parts.length - 1];
		if (
			!possibleImageTypes.includes(ext.toLowerCase()) &&
			!possibleVideoTypes.includes(ext.toLowerCase())
		) {
			toast.error(
				`Only files with ${possibleImageTypes.join(
					', '
				)}, ${possibleVideoTypes.join(', ')} extensions are allowed!!!`
			);
			return;
		}
		setTutorials(prevState => {
			if (possibleImageTypes.includes(ext.toLowerCase())) {
				prevState[key].primaryImage = file;
				prevState[key].videoUrl = '';
			}
			if (possibleVideoTypes.includes(ext.toLowerCase())) {
				prevState[key].videoUrl = file;
				prevState[key].primaryImage = '';
			}
			return [...prevState];
		});
	};
	useEffect(() => {
		dispatch(fetchCategories({ contentType: 3, section: 3 }));
		dispatch(fetchCourses());
	}, []);
	return (
		<>
			<Form onSubmit={handlePublish}>
				<div className='d-flex'>
					<span className='fw-600 fs-25 text-A6A6A6'>New Course</span>
				</div>
				<Row className='mt-4'>
					<Col md='6'>
						<FilePicker
							value={course.thumbnail}
							placeholder='Upload Image'
							onChange={handleCourseImage}
						/>
					</Col>
					<Col md='6'>
						<FormGroup>
							<Input
								type='text'
								required
								className='border-0'
								placeholder='Title'
								value={course.title}
								onChange={e =>
									setCourse(prevState => {
										prevState.title = e.target.value;
										return { ...prevState };
									})
								}
							/>
						</FormGroup>
						<FormGroup className='mt-4'>
							<Input
								required
								type='text'
								className='border-0'
								placeholder='Author'
								value={course.author}
								onChange={e =>
									setCourse(prevState => {
										prevState.author = e.target.value;
										return { ...prevState };
									})
								}
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
								<FilePicker
									onChange={files =>
										handleTutorialFile(files, key)
									}
									value={tutorial.primaryImage}
									placeholder='Upload Image or Video'
								/>
								<FormGroup className='mt-3'>
									<Input
										required
										type='text'
										className='border-0'
										placeholder='Video / Image Name'
										readOnly
										value={
											tutorial.primaryImage == ''
												? tutorial.videoUrl == ''
													? ''
													: tutorial.videoUrl.name
												: tutorial.primaryImage.name
										}
									/>
								</FormGroup>
								{typeof tutorial.videoUrl == 'string' && (
									<FormGroup>
										<Input
											type='text'
											className='border-0'
											placeholder='YouTube Video URL'
											value={tutorial.videoUrl}
											readOnly={
												typeof tutorial.videoUrl !=
												'string'
											}
											onChange={e => {
												setTutorials(prevState => {
													prevState[key].videoUrl =
														e.target.value;
													return [...prevState];
												});
											}}
										/>
									</FormGroup>
								)}
							</div>
						</Col>
						<Col md='6'>
							<CategoryDropdown
								id={`CategoryDropdown${key}`}
								placeholder='Select Category'
								className='ml-auto'
								options={category.categories}
								value={tutorial.categoryId}
								item_text='categoryName'
								item_value='categoryId'
								onChange={value => {
									setTutorials(prevState => {
										prevState[key].categoryId =
											value.categoryId;
										return [...prevState];
									});
								}}
							/>
							<FormGroup className='mt-3'>
								<Input
									required
									type='text'
									className='border-0'
									placeholder='Title'
									value={tutorial.title}
									onChange={e => {
										setTutorials(prevState => {
											prevState[key].title =
												e.target.value;
											return [...prevState];
										});
									}}
								/>
							</FormGroup>
							<FormGroup className='mt-4 mb-0'>
								<Input
									required
									type='textarea'
									rows='10'
									className='border-0'
									placeholder='Description'
									value={tutorial.content[0].paragraphData}
									onChange={e => {
										setTutorials(prevState => {
											prevState[
												key
											].content[0].paragraphData =
												e.target.value;
											return [...prevState];
										});
									}}
								/>
							</FormGroup>
						</Col>
					</Row>
				))}
				<div className='d-flex w-100 my-4'>
					<button
						type='button'
						disabled={publishLoading ? 'disabled' : ''}
						className='add-button ml-auto mr-3'
						onClick={e =>
							setTutorials(prevState => {
								return [
									...prevState,
									{
										calculatorType: '',
										categoryId: '',
										content: [
											{
												bottomImage: '',
												bottomVideo: '',
												paragraphData: '',
												paragraphId: firebase
													.firestore()
													.collection('paragraph')
													.doc().id,
												paragraphTitle: '',
												topImage: '',
												topVideo: '',
											},
										],
										contentType: 3,
										contentUrl: '',
										documentId: '',
										icon: '',
										primaryImage: '',
										secondaryImage: '',
										section: 3,
										thirdImage: '',
										timeInterval: 0,
										title: '',
										videoUrl: '',
									},
								];
							})
						}
					>
						<img src={Upload} />
					</button>
					<Button
						disabled={publishLoading}
						type='submit'
						className='publish-btn'
					>
						{publishLoading ? <Spinner size='sm' /> : 'Publish'}
					</Button>
				</div>
			</Form>
			<div className='mb-4'>
				<div className='d-flex mt-5'>
					<span className='fw-600 fs-25 text-A6A6A6'>
						Published Tutorials
					</span>
				</div>
				{_course.courses == 'idle' || _course.courses == 'loading' ? (
					<div className='d-flex align-items-center justify-content-center py-4'>
						<Spinner size='sm' />
					</div>
				) : (
					<Row className='mt-4 align-items-center'>
						{_course.courses.map((courseItem, key) => (
							<Col
								sm='6'
								xl='4'
								key={'TutorialCard' + key}
								className='mb-4'
							>
								<div className='tutorial-card d-flex position-relative'>
									<img
										src={courseItem.thumbnail}
										className='tutorial-card__file'
									/>
									<div className='w-100 p-2 d-flex flex-column align-items-start justify-content-center'>
										<span className='fw-600 fs-14 color-17002F d-block'>
											{courseItem.title}
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
									<div
										className='position-absolute tutorial-card__edit'
										onClick={() => {
											let _tutorials =
												courseItem.tutorials;
											delete courseItem.tutorials;
											setTutorials(
												_tutorials ? _tutorials : []
											);
											setCourse(courseItem);
											let mainContent =
												document.getElementsByClassName(
													'main-content'
												);
											setIsEditMode(true);
											mainContent[0].scrollTo(0, 0);
										}}
									>
										<i className='fa fa-edit'></i>
									</div>
									<div
										className='position-absolute tutorial-card__delete'
										onClick={() => {
											let _tutorials =
												courseItem.tutorials;
											delete courseItem.tutorials;
											setDeleteCourseData(courseItem);
											setIsDeleteModal(true);
										}}
									>
										<i className='fa fa-trash'></i>
									</div>
								</div>
							</Col>
						))}
						<Col sm='6' xl='4' className='text-center'>
							<div
								className='d-inline-flex bg-white new-post-btn align-items-center py-3 px-4'
								onClick={() => {
									setCourse({
										author: '',
										thumbnail: '',
										title: '',
									});
									setTutorials([
										{
											calculatorType: '',
											categoryId: '',
											content: [
												{
													bottomImage: '',
													bottomVideo: '',
													paragraphData: '',
													paragraphId: firebase
														.firestore()
														.collection('paragraph')
														.doc().id,
													paragraphTitle: '',
													topImage: '',
													topVideo: '',
												},
											],
											contentType: 3,
											contentUrl: '',
											documentId: '',
											icon: '',
											primaryImage: '',
											secondaryImage: '',
											section: 3,
											thumbnail: '',
											thirdImage: '',
											timeInterval: 0,
											title: '',
											videoUrl: '',
										},
									]);
									setIsEditMode(false);
									let mainContent =
										document.getElementsByClassName(
											'main-content'
										);
									mainContent[0].scrollTo(0, 0);
								}}
							>
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
				)}
			</div>
			<Modal
				centered
				isOpen={isDeleteModal}
				toggle={() => setIsDeleteModal(prevState => !prevState)}
			>
				<ModalHeader
					toggle={() => setIsDeleteModal(prevState => !prevState)}
				>
					Confirmation
				</ModalHeader>
				<ModalBody>
					Do you really want to delete {deleteCourseData.title} course
					record?
				</ModalBody>
				<ModalFooter>
					<Button color='outline-dark'>Cancel</Button>
					<Button
						color='success'
						onClick={async () => {
							setDeleteLoading(true);
							await dispatch(deleteCourse(deleteCourseData.id));
							setIsDeleteModal(false);
							setDeleteLoading(false);
						}}
					>
						{deleteLoading ? <Spinner size='sm' /> : 'Delete'}
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default Learn;
