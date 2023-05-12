import styles from "./Pokestat.module.css";
import {useState, useEffect} from "react";
import {useParams, Link, useLocation} from 'react-router-dom';

function Pokestat(){

    const {num} = useParams();

    const [id, setId] = useState();
    const [name, setName] = useState();
    const [stats, setStats] = useState();
    const [abilities, setAbilities] = useState([]);
    const [types, setTypes] = useState([]);

    const [spriteUrl, setSpriteUrl] = useState();
    const [hasBackSprite, setHasBackSprite] = useState(true);
    const [isRotated, setIsRotated] = useState(false);

    const [unown, setUnown] = useState();

    const location = useLocation();

    let page = '';
    if(location.state){
        page = location.state;
    }

    //busca os dados do pokemon
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
            if (response.status === 200) {
              const data = await response.json();

              setId(data.id);
              setName(data.name.toUpperCase());
              setStats(data.stats);
              setStats(prevStats => [...prevStats, data.height*10, data.weight/10]);
              setAbilities(data.abilities);

              setTypes(Array(data.types[0].type.name));
              if (data.types[1]) {
                setTypes(prevTypes => [...prevTypes, data.types[1].type.name]);
              }

              //caso seja unkown, da um tratamento especial para suportar suas várias formas
              if(data.id === 201){
                const alphabet = "abcdefghijklmnopqrstuvwxyz";
                const randomIndex = Math.floor(Math.random() * alphabet.length);
                setUnown(alphabet[randomIndex]);
                setSpriteUrl("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-"+alphabet[randomIndex]+".png");
              }else{
                  setSpriteUrl(data.sprites["front_default"]);
              }
              if(data.sprites["back_default"] === null){
                setHasBackSprite(false);
              }
            }
          }
          fetchData();
    
    }, [num]);

    //alterna entre as sprites de frente/de costas
    function handleRotate(){
        if(isRotated){
            if(id === 201){
                setSpriteUrl("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-"+unown+".png");
            }else{
                setSpriteUrl("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+id+".png");
            }
            setIsRotated(false);
        }else{
            if(id === 201){
                setSpriteUrl("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/201-"+unown+".png");
            }else{
                setSpriteUrl("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/"+id+".png");
            }
            setIsRotated(true);
        }
    }

    return(
        <main>   
            <div className={styles.statcontainer}>
            <Link to={"/"} state={page}>BACK TO HOME</Link>
                <div className={styles.statdata}>
                <h1>#{num} - {name}</h1>
                <div className={styles.statscreen}>
                    <div className={styles.statcontainerimg}>
                        <img src={spriteUrl} alt="pokemon" className={styles.spritestat}></img>
                        <br/>
                        {hasBackSprite && 
                        <button onClick={handleRotate} className={styles.rotatebtn}>
                            <img src="../rotate-icon.png" alt="rotate pokemon sprite button" ></img>
                        </button>
                        }
                    </div>
                    <div className={styles.stats}>
                        <div className={styles.types}>
                            <p><img src={"/types/"+types[0]+".png"} alt="type icon" className={styles.typeicon}/>{types[0]}</p>
                            {types[1] &&
                            <p><img src={"/types/"+types[1]+".png"} alt="type icon" className={styles.typeicon}/>{types[1]}</p>}
                        </div>
                        {stats &&
                        <>
                            <br/>
                            <p>Height: <span>{stats[6]}cm</span></p>
                            <p>Weight: <span>{stats[7]}kg</span></p>
                            <br/>
                            <p>HP: <span>{stats[0].base_stat}</span></p>
                            <p>Attack: <span>{stats[1].base_stat}</span></p>
                            <p>Defense: <span>{stats[2].base_stat}</span></p>
                            <p>SP-Attack: <span>{stats[3].base_stat}</span></p>
                            <p>SP-Defense: <span>{stats[4].base_stat}</span></p>
                            <p>Speed: <span>{stats[5].base_stat}</span></p>
                            <br/>
                            <p>Abilities: 
                                <ul>
                                    {abilities.map((i) => (
                                        <li>{i.ability.name}</li>
                                    ))}
                                </ul>
                            </p>
                        </>}
                    </div>
                </div>
                </div>
            </div>
        </main>

    )

}
export default Pokestat