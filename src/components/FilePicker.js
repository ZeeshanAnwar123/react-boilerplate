import DropZone from 'react-dropzone';
import Upload from '../assets/img/upload.png';
import { Modal, ModalBody, FormGroup, Input } from 'reactstrap';
import { useState } from 'react';

const FilePicker = ({ placeholder, value, onChange }) => {
	let [selectFileModal, setSelectFileModal] = useState(false);
	return (
		<>
			<div
				className='rounded w-100 bg-white upload d-flex align-items-center justify-content-center'
				onClick={() => (value ? {} : setSelectFileModal(true))}
			>
				{value ? (
					<div className='d-flex w-100 h-100 position-relative'>
						<img
							className='w-100 h-100'
							style={{ objectFit: 'cover' }}
							src={
								typeof value == 'string'
									? value
									: URL.createObjectURL(value)
							}
						/>
						<div className='position-absolute image-icon image-icon--first'>
							<i className='fa fa-edit'></i>
						</div>
						<div
							className='position-absolute image-icon image-icon--second'
							onClick={() => onChange([])}
						>
							<i className='fa fa-times'></i>
						</div>
					</div>
				) : (
					<div className='d-flex flex-column justify-content-center align-items-center'>
						<img src={Upload} className='upload__logo' />
						<span className='fs-17 fw-500 mt-2 text-A6A6A6'>
							{placeholder}
						</span>
					</div>
				)}
			</div>
			<Modal
				size='lg'
				centered
				isOpen={selectFileModal}
				toggle={() => setSelectFileModal(prevState => !prevState)}
			>
				<ModalBody className='p-5'>
					<div className='py-5 mt-2'>
						<DropZone
							onDrop={files => {
								onChange(files);
								setSelectFileModal(false);
							}}
						>
							{({
								getRootProps,
								getInputProps,
								isDragActive,
							}) => (
								<div
									{...getRootProps()}
									className='rounded w-100 upload-container d-flex align-items-center justify-content-center'
								>
									<div className='d-flex flex-column justify-content-center align-items-center'>
										<svg
											width='98'
											height='98'
											viewBox='0 0 98 98'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M57.1663 8.16699H24.4997C22.3337 8.16699 20.2565 9.02741 18.725 10.559C17.1934 12.0905 16.333 14.1677 16.333 16.3337V81.667C16.333 83.8329 17.1934 85.9102 18.725 87.4417C20.2565 88.9732 22.3337 89.8337 24.4997 89.8337H73.4997C75.6656 89.8337 77.7428 88.9732 79.2744 87.4417C80.8059 85.9102 81.6663 83.8329 81.6663 81.667V32.667L57.1663 8.16699Z'
												stroke='#A2A2C2'
												stroke-width='4'
												stroke-linecap='round'
												stroke-linejoin='round'
											/>
											<path
												d='M57.167 8.16699V32.667H81.667'
												stroke='#A2A2C2'
												stroke-width='4'
												stroke-linecap='round'
												stroke-linejoin='round'
											/>
											<path
												d='M49 73.5V49'
												stroke='#A2A2C2'
												stroke-width='4'
												stroke-linecap='round'
												stroke-linejoin='round'
											/>
											<path
												d='M36.75 61.25H61.25'
												stroke='#A2A2C2'
												stroke-width='4'
												stroke-linecap='round'
												stroke-linejoin='round'
											/>
										</svg>

										<span className='fs-16 fw-500 mt-2 text-A2A2C2'>
											Drag and Drop Files Here
										</span>
										<input {...getInputProps()} />
									</div>
								</div>
							)}
						</DropZone>
						<FormGroup className='mt-3'>
							<Input
								required
								placeholder='Enter URL'
								style={{ resize: 'none' }}
							/>
						</FormGroup>
						<div className='d-flex justify-content-center pt-5'>
							<button
								className='calculator__btn calculator__btn--outlined fs-17 fw-500 mr-2'
								onClick={() => setSelectFileModal(false)}
							>
								Cancel
							</button>
							<button className='calculator__btn fs-17 fw-500'>
								Save
							</button>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</>
	);
};

export default FilePicker;
