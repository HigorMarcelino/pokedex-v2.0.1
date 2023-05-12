import { useState, useEffect } from "react";
import Poketable from "./Poketable";
import styles from "./Pokelist.module.css";
import { useLocation } from 'react-router-dom';

function Pokelist() {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPokemon, setTotalPokemon] = useState();

  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1008`);
      if (apiResponse.status === 200) {
        const data = await apiResponse.json();
        setTotalPokemon(data.results.length);
      }
    }
    fetchData();

    if(location.state){
      setCurrentPage(location.state);
    }
  }, [location.state]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalPokemon / 24);

  const pageRange = () => {
    const pagesToShow = 10;
    const pageRange = [];
    const totalPages = Math.ceil(totalPokemon / 24);
    let startPage, endPage;

    if (totalPages <= pagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.ceil(pagesToShow / 2)) {
        startPage = 1;
        endPage = pagesToShow;
      } else if (currentPage + Math.floor(pagesToShow / 2) >= totalPages) {
        startPage = totalPages - pagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(pagesToShow / 2);
        endPage = currentPage + Math.ceil(pagesToShow / 2) - 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageRange.push(i);
    }

    return pageRange;
  };

  return (
<div className={styles.pagecontainer}>
    <div className={styles.header}>
      <img src={process.env.PUBLIC_URL +"/logo.png"} alt="pokemon logo" className={styles.logo} />
    </div>
    <div className={styles.pokecontainer}>
      <Poketable page={currentPage}/>
    </div>
    <div className="pagination">
        <button
        className={styles.pagination_button}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        >
        First
        </button>
        <button
        className={styles.pagination_button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        >
        Prev
        </button>

        {pageRange().map((page) => (
        <button
            className={ page === currentPage ? styles.pagination_button_active : styles.pagination_button
            }
            onClick={() => onPageChange(page)}
            key={page}
        >
            {page}
        </button>
        ))}

        <button
        className={styles.pagination_button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        >
        Next
        </button>
        <button
        className={styles.pagination_button}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        >
        Last
        </button>
    </div>
</div>
  );
}

export default Pokelist;