import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styles from "./Pokecard.module.css";

function Pokecard({ num, page }) {
  const [name, setName] = useState();
  const [empty, setEmpty] = useState();
  const [spriteUrl, setSpriteUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    let isCurrent = true; // Unique identifier for the current fetch request

    async function fetchData() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
      if (response.status === 200 && isCurrent) {
        const data = await response.json();
        setName(data.name.toUpperCase());
        const shiny = Math.random(1, 100);

        setSpriteUrl(data.sprites["front_default"]);
        if (data.sprites["front_shiny"]) {
          if (Math.ceil(shiny * 100) === 21) {
            setSpriteUrl(data.sprites["front_shiny"]);
          }
        }
        setEmpty(false);
        setLoading(false);
      } else {
        setEmpty(true);
        setLoading(false);
      }
    }
    fetchData();

    // Clean up the fetch request if the component unmounts or if the `num` prop changes
    return () => {
      isCurrent = false;
    };
  }, [num]);

  function renderCard() {
      if (empty) {
        return;
      } else {
        return (
          <tbody className={styles.card}>
            <tr className={styles.poketitle}>
              <th id="name">
                <Link to={"/pokemon/" + num} state={page} className={styles.link}>
                  #{num} <br/>{name}
                </Link>
              </th>
            </tr>
            <tr className={styles.btn}></tr>
            <tr>
              <td id="sprite">
                <Link to={"/pokemon/" + num} state={page} className={styles.link}>
                  <img src={spriteUrl} alt="pokemon" className={styles.sprite} height="150"/>
                </Link>
              </td>
            </tr>
          </tbody>
        );
      }
  }

  return (
    <>
      {loading ? (
        // Render the loading animation
        <div className={styles.card}>
          <img src={process.env.PUBLIC_URL + "/pokeball.gif"} alt="loading" className={styles.sprite} />
        </div>
      ) : (
        renderCard()
      )}
    </>
  );
}

export default Pokecard;
