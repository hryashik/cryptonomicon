import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './ItemCard.module.scss'
import { hiddenGraph, selectTicker } from "../../store/slices/graphSlice";
import { RootState, useAppDispatch } from "../../store/store";
import CloseIcon from "@mui/icons-material/Close";
import { deleteItem } from "../../store/slices/tickersSlice";
import { useSelector } from "react-redux";

type Props = {
	name: string
	price: number | string | undefined
	clickOnDelete: (e: React.FormEvent, value: string) => void
}

export default function ItemCard({ name, price, clickOnDelete }: Props) {
	const currentTicker = useSelector((state: RootState) => state.graphSlice.currentTicker)
	const dispatch = useAppDispatch()
	function clickOnCard() {
		dispatch(selectTicker(name))
	}
	function clickOnCloseIcon(event: any) {
		event.stopPropagation()
		dispatch(deleteItem(name))
		if (currentTicker === name) {
			dispatch(hiddenGraph())
		}
	}
	return (
		<Card onClick={clickOnCard}
					className={styles.card}
					sx={{backgroundColor: 'ghostwhite'}}
		>
			<CardContent>
				<div className={styles.title}>
					<Typography variant="h5" component="div">
						{name}
					</Typography>
					<CloseIcon onClick={clickOnCloseIcon}/>
				</div>
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
