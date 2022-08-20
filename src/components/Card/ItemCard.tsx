import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
	name: string
	price: number | undefined
	clickOnDelete: (value: string) => void
}

export default function ItemCard({ name, price, clickOnDelete }: Props) {
	return (
		<Card sx={{ marginBottom: '20px',maxWidth: 275, backgroundColor: 'ghostwhite' }}>
			<CardContent>
				<Typography variant="h5" component="div">
					{name}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					USD
				</Typography>
				<Typography variant="body2" fontSize={25}>
					{price ? price : '-'}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					onClick={() => clickOnDelete(name)}
					startIcon={<DeleteIcon/>}
					variant={"contained"}
					size="medium"
					color={"primary"}
					sx={{display: 'flex', alignItems: 'center'}}
				>
					Delete
				</Button>
			</CardActions>
		</Card>
	);
}
