import styles from './styles.module.css';

const Pagination = ({
    currentPage,
    handleNextPage,
    handlePageClick,
    handlePreviousPage,
    totalPages,
    isLoading
}) => {
    return (
        <div className={styles.pagination}>

            <button
                onClick={handlePreviousPage}
                className={styles.arrow}
                disabled={currentPage === 1 || isLoading}
            >
                {'<'}
            </button>

            <div className={styles.list}>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        onClick={() => handlePageClick(index + 1)}
                        className={`${styles.pageNumber} ${
                            currentPage === index + 1 ? styles.active : ''
                        }`}
                        key={index}
                        disabled={currentPage === index + 1 || isLoading}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <button
                onClick={handleNextPage}
                className={styles.arrow}
                disabled={!currentPage === 10 || isLoading}
            >
                {'>'}
            </button>

        </div>
    );
};

export default Pagination;
