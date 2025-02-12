import styles from "../App.module.css";

interface PaginationPropsType {
    totalRecorde: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const Pagination = ({ totalRecorde, currentPage, setCurrentPage }: PaginationPropsType) => {
    const totalPage = Math.ceil(totalRecorde / 5);

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentPage(Number(event.target.value));
    };

    return (
     
        <div className={styles.pagination_main}>
            <button
                className={styles.pagination_btn}
                onClick={handlePrev}
                disabled={currentPage === 1}
            >
                 &laquo;
            </button>

            <select
                name="pages"
                id="pages"
                className={styles.pagination_select}
                value={currentPage}
                onChange={handleSelectChange}
            >
                {[...Array(totalPage)].map((_, index) => (
                    <option key={index} value={index + 1}>
                        Page {index + 1}
                    </option>
                ))}
            </select>

            <button
                className={styles.pagination_btn}
                onClick={handleNext}
                disabled={currentPage === totalPage}
            >
               &raquo;
            </button>
        </div>
    );
};

export default Pagination;
