import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './ItemCard.module.scss'
import { selectTicker } from "../../store/slices/graphSlice";
import { useAppDispatch } from "../../store/store";

type Props = {
	name: string
	price: number | string | undefined
	clickOnDelete: (e: React.FormEvent, value: string) => void
}

export default function ItemCard({ name, price, clickOnDelete }: Props) {
	const dispatch = useAppDispatch()
	function clickOnCard() {
		dispatch(selectTicker(name))
	}
	return (
		<Card onClick={clickOnCard}
					className={styles.card}
					sx={{backgroundColor: 'ghostwhite'}}
		>
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
					onClick={(e) => clickOnDelete(e, name)}
					startIcon={<DeleteIcon/>}
					variant={"contained"}
					size="medium"
					color={"primary"}
					sx={{ display: 'flex', alignItems: 'center' }}
				>
					Delete
				</Button>
			</CardActions>
		</Card>
	);
}
