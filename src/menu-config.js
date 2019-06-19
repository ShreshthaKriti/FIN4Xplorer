import AccountIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/AddCircle';
import ListIcon from '@material-ui/icons/ViewList';

import Account from './Account';
import ClaimSubmission from './ClaimSubmission';
import Claims from './Claims';

const menu = [
	{ component: Account, path: '/me', label: 'Me', icon: AccountIcon },
	{
		component: ClaimSubmission,
		path: '/claim-action',
		label: 'Claim Action',
		icon: AddIcon
	},
	{ component: Claims, path: '/history', label: 'History', icon: ListIcon }
];

export default menu;