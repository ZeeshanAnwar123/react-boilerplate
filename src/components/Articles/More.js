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
import Upload from '../../assets/img/upload.png';
import CategoryDropdown from '../../components/CategoryDropdown';
import { useState } from 'react';
import TimeSquare from '../../assets/img/Time Square.png';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/actions/categoryAction';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import firebase from '../../config/firebase';
import FilePicker from '../../components/FilePicker';
import {
	addArticle,
	deleteArticle,
	editArticle,
	fetchArticles,
} from '../../store/actions/articleAction';

const More = props => {
	let [isEditMode, setIsEditMode] = useState(false);
	let [isDeleteModal, setIsDeleteModal] = useState(false);
	let [tutorial, setTutorial] = useState({
		calculatorType: '',
		categoryId: '',
		content: [],
		contentType: 1,
		contentUrl: '',
		documentId: '',
		icon: '',
		primaryImage: '',
		secondaryImage: '',
		section: 2,
		thumbnail: '',
		thirdImage: '',
		timeInterval: 0,
		title: '',
		videoUrl: '',
	});
	let [deleteLoading, setDeleteLoading] = useState(false);
	let [deleteCourseData, setDeleteCourseData] = useState({});
	let [publishLoading, setPublishLoading] = useState(false);
	let dispatch = useDispatch();
	let { articles } = useSelector(state => state.article);

	let category = useSelector(state => state.category);

	const handlePublish = async e => {
		e.preventDefault();
		setPublishLoading(true);
		let isError = false;
		if (
			(tutorial.primaryImage == '' && tutorial.videoUrl == '') ||
			tutorial.content.some(
				content =>
					content.bottomImage == '' && content.bottomVideo == ''
			)
		) {
			isError = true;
			toast.error('Add image or video!!!');
		}
		if (tutorial.categoryId == '') {
			isError = true;
			toast.error('Add category!!!');
		}
		if (isError) {
			setPublishLoading(false);
			return;
		}
		if (isEditMode) {
			await dispatch(editArticle(tutorial));
		} else {
			await dispatch(addArticle(tutorial));
		}
		setPublishLoading(false);
		setTutorial({
			calculatorType: '',
			categoryId: '',
			content: [],
			contentType: 1,
			contentUrl: '',
			documentId: '',
			icon: '',
			primaryImage: '',
			secondaryImage: '',
			section: 2,
			thumbnail: '',
			thirdImage: '',
			timeInterval: 0,
			title: '',
			videoUrl: '',
		});
	};
	const handleTutorialFile = files => {
		let possibleImageTypes = ['gif', 'png', 'bmp', 'jpeg', 'jpg'];
		let possibleVideoTypes = ['mp4', 'mov', 'wmv', 'flv', 'avi', 'webm'];
		if (files.length == 0) {
			setTutorial(prevState => {
				prevState.primaryImage = '';
				prevState.videoUrl = '';
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
		setTutorial(prevState => {
			if (possibleImageTypes.includes(ext.toLowerCase())) {
				prevState.primaryImage = file;
				prevState.videoUrl = '';
			}
			if (possibleVideoTypes.includes(ext.toLowerCase())) {
				prevState.videoUrl = file;
				prevState.primaryImage = '';
			}
			return { ...prevState };
		});
	};
	const handleContentFile = (files, key) => {
		let possibleImageTypes = ['gif', 'png', 'bmp', 'jpeg', 'jpg'];
		let possibleVideoTypes = ['mp4', 'mov', 'wmv', 'flv', 'avi', 'webm'];
		if (files.length == 0) {
			setTutorial(prevState => {
				prevState.content[key].bottomImage = '';
				prevState.content[key].bottomVideo = '';
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
		setTutorial(prevState => {
			if (possibleImageTypes.includes(ext.toLowerCase())) {
				prevState.content[key].bottomImage = file;
				prevState.content[key].bottomVideo = '';
			}
			if (possibleVideoTypes.includes(ext.toLowerCase())) {
				prevState.content[key].bottomImage = '';
				prevState.content[key].bottomVideo = file;
			}
			return { ...prevState };
		});
	};
	useEffect(() => {
		dispatch(
			fetchCategories({
				contentType: 1,
				section: 2,
			})
		);
		dispatch(fetchArticles({ section: 2 }));
	}, []);
	let removeTutorial = key => {
		setTutorial(prevState => {
			let temp = prevState.content.filter((ps, k) => k != key);
			prevState.content = temp;
			return { ...prevState };
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
					<>
						<Row className='mt-2'>
							<Col md='6'>
								<div className='mt-4'>
									<FilePicker
										onChange={files =>
											handleTutorialFile(files)
										}
										value={tutorial.primaryImage}
										placeholder='Upload Image or Video'
									/>
								</div>
							</Col>
							<Col md='6'>
								<div className='d-flex align-items-center'>
									<span className='fs-18 fw-600 text-A6A6A6 mr-4'>
										Articles
									</span>
									<Input
										type='text'
										placeholder='Icon'
										style={{
											width: 100,
											height: 42,
										}}
										className='border-0'
										value={tutorial.icon}
										onChange={e => {
											setTutorial(prevState => {
												prevState.icon = e.target.value;
												return { ...prevState };
											});
										}}
									/>
									<CategoryDropdown
										contentType={1}
										section={2}
										// id={`CategoryDropdown${key}`}
										placeholder='Article Category'
										className='ml-auto'
										options={category.categories}
										value={tutorial.categoryId}
										item_text='categoryName'
										item_value='categoryId'
										onChange={value => {
											setTutorial(prevState => {
												prevState.categoryId =
													value.categoryId;
												return { ...prevState };
											});
										}}
									/>
								</div>
								<FormGroup className='mt-3'>
									<Input
										required
										type='text'
										className='border-0'
										placeholder='Title'
										value={tutorial.title}
										onChange={e => {
											setTutorial(prevState => {
												prevState.title =
													e.target.value;
												return { ...prevState };
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
										onChange={e => {
											// setTutorials(prevState => {
											// 	prevState[
											// 		key
											// 	].content[0].paragraphData =
											// 		e.target.value;
											// 	return [...prevState];
											// });
										}}
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row className='align-items-center'>
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
							</Col>
							{tutorial.content.length == 0 && (
								<Col md='6'>
									<div className='d-flex w-100 my-4'>
										<button
											type='button'
											disabled={
												publishLoading ? 'disabled' : ''
											}
											className='add-button ml-auto mr-3'
											onClick={() => {
												setTutorial(prevState => {
													let content = [
														...prevState.content,
														{
															bottomImage: '',
															bottomVideo: '',
															paragraphData: '',
															paragraphId:
																firebase
																	.firestore()
																	.collection(
																		'paragraph'
																	)
																	.doc().id,
															paragraphTitle: '',
															topImage: '',
															topVideo: '',
														},
													];
													console.log({
														...prevState,
														content,
													});
													return {
														...prevState,
														content,
													};
												});
											}}
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
								</Col>
							)}
						</Row>
					</>
					{tutorial.content.map((content, key) => (
						<>
							<Row className='mt-5'>
								<Col md='6'>
									<div className='mt-4'>
										<FilePicker
											onChange={files =>
												handleContentFile(files, key)
											}
											value={content.bottomImage}
											placeholder='Upload Image or Video'
										/>
									</div>
								</Col>
								<Col md='6'>
									<div className='d-flex justify-content-end'>
										<svg
											width='28'
											height='28'
											viewBox='0 0 28 28'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
											cursor='pointer'
											onClick={() => removeTutorial(key)}
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
									<FormGroup className='mt-3'>
										<Input
											required
											type='text'
											className='border-0'
											placeholder='Title'
											value={content.paragraphTitle}
											onChange={e => {
												setTutorial(prevState => {
													prevState.content[
														key
													].paragraphTitle =
														e.target.value;
													return { ...prevState };
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
											value={content.paragraphData}
											onChange={e => {
												setTutorial(prevState => {
													prevState.content[
														key
													].paragraphData =
														e.target.value;
													return { ...prevState };
												});
											}}
										/>
									</FormGroup>
								</Col>
							</Row>
							<Row className='align-items-center'>
								<Col md='6'>
									<FormGroup className='mt-3'>
										<Input
											required
											type='text'
											className='border-0'
											placeholder='Video / Image Name'
											readOnly
											value={
												content.bottomImage == ''
													? content.bottomVideo == ''
														? ''
														: content.bottomVideo
																.name
													: content.bottomImage.name
											}
										/>
									</FormGroup>
								</Col>
								{key == tutorial.content.length - 1 && (
									<Col md='6'>
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
													setTutorial(prevState => {
														let content = [
															...prevState.content,
															{
																bottomImage: '',
																bottomVideo: '',
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
																topImage: '',
																topVideo: '',
															},
														];
														console.log({
															...prevState,
															content,
														});
														return {
															...prevState,
															content,
														};
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
									</Col>
								)}
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
				{articles == 'idle' || articles == 'loading' ? (
					<div className='d-flex align-items-center justify-content-center py-4'>
						<Spinner size='sm' />
					</div>
				) : (
					<Row className='mt-4 align-items-center'>
						{articles.map((article, key) => (
							<Col
								sm='6'
								xl='4'
								key={'ArticleCard0' + key}
								className='mb-4'
							>
								<div className='tutorial-card d-flex position-relative'>
									<img
										src={article.thumbnail}
										className='tutorial-card__file'
									/>
									<div className='w-100 p-2 d-flex flex-column align-items-start justify-content-center'>
										<span className='fw-600 fs-14 color-17002F d-block'>
											{article.title}
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
											setTutorial(article);
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
											setDeleteCourseData(article);
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
									setTutorial({
										calculatorType: '',
										categoryId: '',
										content: [],
										contentType: 1,
										contentUrl: '',
										documentId: '',
										icon: '',
										primaryImage: '',
										secondaryImage: '',
										section: 2,
										thumbnail: '',
										thirdImage: '',
										timeInterval: 0,
										title: '',
										videoUrl: '',
									});
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
					Do you really want to delete {deleteCourseData.title}{' '}
					article record?
				</ModalBody>
				<ModalFooter>
					<Button color='outline-dark'>Cancel</Button>
					<Button
						color='success'
						onClick={async () => {
							setDeleteLoading(true);
							await dispatch(deleteArticle(deleteCourseData.id));
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

export default More;
