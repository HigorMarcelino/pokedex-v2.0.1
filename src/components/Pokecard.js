import {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import styles from "./Pokecard.module.css"

function Pokecard({num, page}){

    const [name, setName] = useState();
    const [spriteUrl, setSpriteUrl] = useState();
    
    useEffect(() => {
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
                <div className={styles.card}>
                    <Link to={"/pokemon/" + num} state={page}>
                        <tr className={styles.poketitle}>
                            <th id="name">#{num} <br/> {name}</th>
                        </tr>
                        <div className={styles.btn}></div>
                        <tr>
                            <td id="sprite"><img src={spriteUrl} alt="pokemon" className={styles.sprite}></img></td>
                        </tr>
                    </Link>
                </div>
            }
            </>

}
export default Pokecard