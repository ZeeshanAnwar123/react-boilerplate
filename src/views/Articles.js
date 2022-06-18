import { useState } from 'react';
import { Col, FormGroup, Input, Row, Label } from 'reactstrap';
import Business from '../components/Articles/Business';
import Personal from '../components/Articles/Personal';
import More from '../components/Articles/More';

const Learn = props => {
	let [section, setSection] = useState('');
	return (
		<>
			<Row>
				<Col xl='8'>
					<Row>
						<Col>
							<span className='fw-600 fs-20 text-A6A6A6'>
								Section
							</span>
						</Col>
						<Col>
							<FormGroup>
								<FormGroup check>
									<Label
										check
										className={`fs-17 fw-500 ${
											section == 'Business'
												? 'text-FF808B'
												: 'text-A6A6A6'
										}`}
									>
										<Input
											type='radio'
											name='section'
											checked={section == 'Business'}
											onChange={() => {
												setSection('Business');
											}}
										/>{' '}
										Business
									</Label>
								</FormGroup>
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<FormGroup check>
									<Label
										check
										className={`fs-17 fw-500 ${
											section == 'Personal'
												? 'text-FF808B'
												: 'text-A6A6A6'
										}`}
									>
										<Input
											type='radio'
											name='section'
											checked={section == 'Personal'}
											onChange={() => {
												setSection('Personal');
											}}
										/>{' '}
										Personal
									</Label>
								</FormGroup>
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<FormGroup check>
									<Label
										check
										className={`fs-17 fw-500 ${
											section == 'More'
												? 'text-FF808B'
												: 'text-A6A6A6'
										}`}
									>
										<Input
											type='radio'
											name='section'
											value={'More'}
											checked={section == 'More'}
											onChange={() => {
												setSection('More');
											}}
										/>{' '}
										More
									</Label>
								</FormGroup>
							</FormGroup>
						</Col>
					</Row>
				</Col>
			</Row>
			{section == 'Business' && <Business />}
			{section == 'Personal' && <Personal />}
			{section == 'More' && <More />}
		</>
	);
};

export default Learn;
