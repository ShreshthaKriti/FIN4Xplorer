import React from 'react';
import Container from '../../components/Container';
import Card from '../../components/Card';
import Box from '../../components/Box';
import Table from '../../components/Table';
import TableRow from '../../components/TableRow';
import ContractData from '../../components/ContractData';
import styled from 'styled-components';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Offers from '../Offers';
import Modal from '../../components/Modal';
import bigchainConfig from '../../config/bigchain-config';

const showBalanceByActionType = data => {
	return (
		<Box title="My Action Tokens">
			<Table headers={['Name', 'Symbol', 'Balance']}>
				{data &&
					data.map((address, index) => {
						return (
							<ContractData
								key={index}
								contractAddress={address}
								method="getInfoAndBalance"
								callback={data => <TableRow data={data} />}
							/>
						);
					})}
			</Table>
		</Box>
	);
};

class More extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			spendingOffers: [],
			donationOffers: [],
			isOfferModalOpen: false,
			isDoantionModalOpen: false,
			tokenAddress: []
		};
	}

	setTokenAddressWithBalance = tokenAddress => {
		return (
			<Wrapper>
				{this.setState({ tokenAddress })}
				{this.getOfferData()}
				<div>
					{this.state.spendingOffers.map(({ data }, index) => {
						return (
							<Card
								key={index}
								title={data.offerData.name}
								imagePath={data.offerData.imagePath}
								description={data.offerData.description}
								readMore={data.offerData.offerUrl}
								actionButtonText="redeem now"
							/>
						);
					})}
				</div>
				<Container>
					<ContractData contractName="Fin4Main" method="getChildren" callback={showBalanceByActionType} />
				</Container>
				<div>
					{this.state.donationOffers.map(({ data }, index) => {
						return (
							<Card
								key={index}
								title={data.offerData.name}
								imagePath={data.offerData.imagePath}
								description={data.offerData.description}
								readMore={data.offerData.offerUrl}
								actionButtonText="donate"
							/>
						);
					})}
				</div>
			</Wrapper>
		);
	};

	getOfferData() {
		['spendingOffers', 'donationOffers'].forEach(offers => {
			axios.get(`${bigchainConfig.path}/assets?search=${offers}`).then(res => {
				const offersResult = res.data.filter(offer =>
					this.state.tokenAddress.includes(offer.data.offerData.tokenAddress)
				);
				this.setState({ [offers]: offersResult });
			});
		});
	}

	toggleOfferModal = () => {
		console.log(this.state.isOfferModalOpen);
		this.setState({ isOfferModalOpen: !this.state.isOfferModalOpen });
	};

	toggleDonationModal = () => {
		console.log(this.state.isDoantionModalOpen);
		this.setState({ isDoantionModalOpen: !this.state.isDoantionModalOpen });
	};

	render() {
		return (
			<Wrapper>
				<Fab color="primary" aria-label="Add" onClick={this.toggleOfferModal}>
					<AddIcon />
				</Fab>
				<Modal
					isOpen={this.state.isOfferModalOpen}
					handleClose={this.toggleOfferModal}
					title="Create a New Offer"
					width="500px">
					<Offers offerType="spendingOffers" toggleModal={this.toggleOfferModal.bind(this)} />
				</Modal>

				<ContractData
					contractName="Fin4Main"
					method="getAllTokenWithBalance"
					callback={this.setTokenAddressWithBalance}
				/>

				<Fab color="primary" aria-label="Add" onClick={this.toggleDonationModal}>
					<AddIcon />
				</Fab>
				<Modal
					isOpen={this.state.isDoantionModalOpen}
					handleClose={this.toggleDonationModal}
					title="Create a New Donation Offer"
					width="500px">
					<Offers offerType="donationOffers" toggleModal={this.toggleDonationModal.bind(this)} />
				</Modal>
			</Wrapper>
		);
	}
}

const Wrapper = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
`;

export default More;
