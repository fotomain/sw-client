
import { makeStyles } from '@mui/styles';

import { lineHeight, maxWidth } from '@mui/system';
export default makeStyles(() => ({
	title: {
		latterSpacing: '0.1rem',
		lineHeight: '1.25',
		marginBottom: '0.15rem',
		fontSize: '2rem',
	},
	form: {
		width: '90vw',
		maxWidth: '1200px',
		margin: '0 auto',
		// marginTop: '1rem',
		marginBottom: '3rem',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'start',
		// backgroundColor: 'red',
	},
	error: {
		color: '#F93154',
		paddingTop: '0.5rem',
		fontSize: '2.15rem',
	},
	section: {
		width: '90vw',
		maxWidth: '1170px',
		margin: '4rem  auto',
		display: 'flex',
		gap: '2rem',
	},
}));
