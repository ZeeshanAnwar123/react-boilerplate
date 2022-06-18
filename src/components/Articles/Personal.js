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
	Label,
} from 'reactstrap';
import Upload from '../../assets/img/upload.png';
import CategoryDropdown from '../CategoryDropdown';
import { useState } from 'react';
import TimeSquare from '../../assets/img/Time Square.png';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/actions/categoryAction';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
	addCourse,
	deleteCourse,
	editCourse,
	fetchCourses,
} from '../../store/actions/courseAction';
import firebase from '../../config/firebase';
import FilePicker from '../FilePicker';

const Personal = props => {
	let [course, setCourse] = useState({
		author: '',
		thumbnail: '',
		title: '',
		section: '',
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

	const handlePublish = async e => {
		e.preventDefault();
		return;
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
		dispatch(fetchCategories());
		dispatch(fetchCourses());
	}, []);
	let removeTutorial = key => {
		setTutorials(prevState => {
			let temp = prevState.filter((ps, k) => k != key);
			return [...temp];
		});
	};
	return (
		<>
			<Form onSubmit={handlePublish}>
				<>
					<div className='d-flex mt-5'>
						<span className='fw-600 fs-25 text-A6A6A6'>
							New Post
						</span>
					</div>
					{tutorials.map((tutorial, key) => (
						<>
							<Row
								key={`tutorial-${key}`}
								className={key == 0 ? 'mt-2' : 'mt-5'}
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
									</div>
								</Col>
								<Col md='6'>
									{key == 0 && (
										<div className='d-flex align-items-center'>
											<span className='fs-18 fw-600 text-A6A6A6'>
												Articles
											</span>
											<CategoryDropdown
												id={`CategoryDropdown${key}`}
												placeholder='Article Category'
												className='ml-auto'
												options={category.categories}
												value={tutorial.categoryId}
												item_text='categoryName'
												item_value='categoryId'
												onChange={value => {
													setTutorials(prevState => {
														prevState[
															key
														].categoryId =
															value.categoryId;
														return [...prevState];
													});
												}}
											/>
										</div>
									)}
									{key != 0 && (
										<div className='d-flex justify-content-end'>
											<svg
												width='28'
												height='28'
												viewBox='0 0 28 28'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
												cursor='pointer'
												onClick={() =>
													removeTutorial(key)
												}
											>
												<path
													d='M14 0C6.26216 0 0 6.26155 0 14C0 21.7379 6.26155 28 14 28C21.7378 28 28 21.7384 28 14C28 6.2621 21.7384 0 14 0ZM14 25.8125C7.47119 25.8125 2.1875 20.5293 2.1875 14C2.1875 7.47113 7.4707 2.1875 14 2.1875C20.5288 2.1875 25.8125 7.4707 25.8125 14C25.8125 20.5289 20.5293 25.8125 14 25.8125Z'
													fill='#CBCBDF'
												/>
												<path
													d='M18.7898 17.243L15.5467 13.9999L18.7898 10.7568C19.2169 10.3297 19.2169 9.63719 18.7898 9.21002C18.3626 8.78286 17.6701 8.78291 17.243 9.21002L13.9999 12.4531L10.7568 9.21002C10.3297 8.78286 9.6371 8.78286 9.20999 9.21002C8.78288 9.63719 8.78289 10.3297 9.21005 10.7568L12.4531 13.9999L9.21005 17.243C8.78289 17.6701 8.78283 18.3626 9.20999 18.7897C9.63727 19.217 10.3298 19.2168 10.7568 18.7897L13.9999 15.5467L17.243 18.7897C17.67 19.2168 18.3626 19.2169 18.7898 18.7897C19.217 18.3626 19.2169 17.6701 18.7898 17.243Z'
													fill='#CBCBDF'
												/>
											</svg>
										</div>
									)}
									<FormGroup className='mt-3'>
										<Input
											required
											type='text'
											className='border-0'
											placeholder='Title of Tutorial'
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
											style={{ resize: 'none' }}
											value={
												tutorial.content[0]
													.paragraphData
											}
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
							<Row
								className='align-items-center'
								key={`tutorial-${key}`}
							>
								<Col md='6'>
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

									{/* {typeof tutorial.videoUrl ==
											'string' && (
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
														setTutorials(
															prevState => {
																prevState[
																	key
																].videoUrl =
																	e.target.value;
																return [
																	...prevState,
																];
															}
														);
													}}
												/>
											</FormGroup>
										)} */}
									<FormGroup className='mt-1'>
										<Input
											required
											type='textarea'
											className='border-0'
											placeholder='Description'
											rows={4}
											style={{ resize: 'none' }}
										/>
									</FormGroup>
								</Col>
								<Col md='6'>
									{key == tutorials.length - 1 && (
										<div className='d-flex w-100 my-4'>
											<button
												type='button'
												disabled={
													publishLoading
														? 'disabled'
														: ''
												}
												className='add-button ml-auto mr-3'
												onClick={e =>
													setTutorials(prevState => {
														return [
															...prevState,
															{
																calculatorType:
																	'',
																categoryId: '',
																content: [
																	{
																		bottomImage:
																			'',
																		bottomVideo:
																			'',
																		paragraphData:
																			'',
																		paragraphId:
																			firebase
																				.firestore()
																				.collection(
																					'paragraph'
																				)
																				.doc()
																				.id,
																		paragraphTitle:
																			'',
																		topImage:
																			'',
																		topVideo:
																			'',
																	},
																],
																contentType: 3,
																contentUrl: '',
																documentId: '',
																icon: '',
																primaryImage:
																	'',
																secondaryImage:
																	'',
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
												{publishLoading ? (
													<Spinner size='sm' />
												) : (
													'Publish'
												)}
											</Button>
										</div>
									)}
								</Col>
							</Row>
						</>
					))}
				</>
			</Form>
			<div className='mb-4'>
				<div className='d-flex mt-5'>
					<span className='fw-600 fs-25 text-A6A6A6'>
						Published Tutorials
					</span>
				</div>
				{/* {_course.courses == 'idle' || _course.courses == 'loading' ? (
					<div className='d-flex align-items-center justify-content-center py-4'>
						<Spinner size='sm' />
					</div>
				) : ( */}
				<Row className='mt-4 align-items-center'>
					{new Array(5).fill(1).map((courseItem, key) => (
						<Col
							sm='6'
							xl='4'
							key={'TutorialCard' + key}
							className='mb-4'
						>
							<div className='tutorial-card d-flex position-relative'>
								<img
									src='https://picsum.photos/200/300'
									className='tutorial-card__file'
								/>
								<div className='w-100 p-2 d-flex flex-column align-items-start justify-content-center'>
									<span className='fw-600 fs-14 color-17002F d-block'>
										Test
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
								<div className='position-absolute tutorial-card__delete'>
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
				{/* )} */}
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

export default Personal;
