import DropZone from 'react-dropzone';
import Upload from '../assets/img/upload.png';

const FilePicker = ({ placeholder, value, onChange }) => {
	return (
		<>
			<DropZone onDrop={onChange}>
				{({ getRootProps, getInputProps, isDragActive }) => (
					<div
						{...getRootProps()}
						className='rounded w-100 bg-white upload d-flex align-items-center justify-content-center'
					>
						{value ? (
							<div className='d-flex w-100 h-100'>
								<img
									className='w-100 h-100'
									style={{ objectFit: 'cover' }}
									src={
										typeof value == 'string'
											? value
											: URL.createObjectURL(value)
									}
								/>
							</div>
						) : (
							<div className='d-flex flex-column justify-content-center align-items-center'>
								<img src={Upload} className='upload__logo' />
								<span className='fs-17 fw-500 mt-2 text-A6A6A6'>
									{isDragActive ? 'Drop Here' : placeholder}
								</span>
								<input {...getInputProps()} />
							</div>
						)}
					</div>
				)}
			</DropZone>
		</>
	);
};

export default FilePicker;
