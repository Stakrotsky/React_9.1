import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameLayout } from './GameLayout';
import { checkWin } from './utils/utils';

export const Game = () => {
	const dispatch = useDispatch();
	const field = useSelector((state) => state.field);
	const currentPlayer = useSelector((state) => state.currentPlayer);
	const isGameEnded = useSelector((state) => state.isGameEnded);

	const onCellClickRef = useRef(null);

	const onCellClick = (index) => {
		if (field[index] || isGameEnded) return;

		const newField = [...field];
		newField[index] = currentPlayer;

		dispatch({ type: 'SET_FIELD', payload: newField });

		if (checkWin(newField)) {
			dispatch({ type: 'SET_GAME_ENDED', payload: true });
		} else if (newField.every((cell) => cell)) {
			dispatch({ type: 'SET_DRAW', payload: true });
			dispatch({ type: 'SET_GAME_ENDED', payload: true });
		} else {
			dispatch({
				type: 'SET_CURRENT_PLAYER',
				payload: currentPlayer === 'X' ? 'O' : 'X',
			});
		}
	};

	useEffect(() => {
		onCellClickRef.current = onCellClick;
	});

	useEffect(() => {
		dispatch({
			type: 'REGISTER_CELL_CLICK',
			payload: (index) => onCellClickRef.current(index),
		});
	}, [dispatch]);

	return <GameLayout />;
};
