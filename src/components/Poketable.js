import styles from "./Poketable.module.css"
import Pokecard from "./Pokecard";

function Poketable({page}){

    return <>
  
          <table className={styles.poketable}> 
              {[...Array(6)].map((_, index) => (
                <Pokecard num={(page*18 - 18) + index + 1} key={index} page={page}/>
              ))}
          </table>

          <table className={styles.poketable}>
              {[...Array(6)].map((_, index) => (
                <Pokecard num={(page*18 - 18) + index + 7} key={index + 7} page={page}/>
              ))}
          </table>
          
          <table className={styles.poketable}>
              {[...Array(6)].map((_, index) => (
                <Pokecard num={(page*18 - 18) + index + 13} key={index + 13} page={page}/>
              ))}
          </table>
          
          </>

}
export default Poketable