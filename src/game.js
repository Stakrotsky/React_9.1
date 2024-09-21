import { useEffect, useState } from 'react';
import { GameLayout } from './GameLayout';
import { store } from './store';
import { checkWin } from './utils/utils';

export const Game = () => {
	const [render, setRender] = useState(0);

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setRender((prev) => prev + 1);
		});
		return () => unsubscribe();
	}, []);

	const onCellClick = (index) => {
		const { field, currentPlayer, isGameEnded } = store.getState();

		if (field[index] || isGameEnded) return;

		const newField = field.slice();
		newField[index] = currentPlayer;

		store.dispatch({ type: 'SET_FIELD', payload: newField });

		if (checkWin(newField)) {
			store.dispatch({ type: 'SET_GAME_ENDED', payload: true });
		} else if (newField.every((cell) => cell)) {
			store.dispatch({ type: 'SET_DRAW', payload: true });
			store.dispatch({ type: 'SET_GAME_ENDED', payload: true });
		} else {
			store.dispatch({
				type: 'SET_CURRENT_PLAYER',
				payload: currentPlayer === 'X' ? 'O' : 'X',
			});
		}
	};

	useEffect(() => {
		store.dispatch({ type: 'REGISTER_CELL_CLICK', payload: onCellClick });
	}, []);

	return <GameLayout />;
};
