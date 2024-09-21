import styles from './FieldLayout.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export const FieldLayout = () => {
	const field = useSelector((state) => state.field);
	const onCellClick = useSelector((state) => state.onCellClick);

	const handleCellClick = (index) => {
		if (onCellClick) {
			onCellClick(index);
		}
	};

	return (
		<div className={styles.board} id="board">
			{field.map((cell, index) => (
				<button
					key={index}
					className={styles.cell}
					onClick={() => handleCellClick(index)}
				>
					{cell}
				</button>
			))}
		</div>
	);
};

FieldLayout.propTypes = {
	field: PropTypes.arrayOf(PropTypes.string).isRequired,
	onCellClick: PropTypes.func.isRequired,
};
