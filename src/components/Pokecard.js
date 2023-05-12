import {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import styles from "./Pokecard.module.css"

function Pokecard({num, page}){

    const [name, setName] = useState();
    const [spriteUrl, setSpriteUrl] = useState();
    
    useEffect(() => {
        setSpriteUrl("/pokeball.gif");
        async function fetchData() {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
            if (response.status === 200) {
              const data = await response.json();
              setName(data.name.toUpperCase());
              setSpriteUrl(data.sprites["front_default"]);
              
            }
          }
          fetchData();
    
    }, [num]);
    return <>

            { name && spriteUrl &&
                <tbody className={styles.card}>
                    <tr className={styles.poketitle}>
                        <th id="name">
                            <Link to={"/pokemon/" + num} state={page} className={styles.link}>#{num} <br/>{name}</Link>
                        </th>
                    </tr>
                    <tr className={styles.btn}></tr>
                    <tr>
                        <td id="sprite">
                            <Link to={"/pokemon/" + num} state={page} className={styles.link}>
                                <img src={spriteUrl} alt="pokemon" className={styles.sprite}></img>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            }
            </>

}
export default Pokecard