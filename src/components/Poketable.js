import styles from "./Poketable.module.css";
import Pokecard from "./Pokecard";

function Poketable({ page }) {
	return (
		<>
			<div className={styles.poketable}>
				{[...Array(18)].map((_, index) => (
					<Pokecard num={page * 18 - 18 + index + 1} key={index} page={page} />
				))}
			</div>
		</>
	);
}

export default Poketable;
