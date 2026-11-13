import { useEffect, useState } from 'react';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import NewsList from '../../components/NewsList/NewsList';
import styles from './styles.module.css';
import { getNews } from '../../api/apiNews';
import Skeleton from '../../components/Skeleton/Skeleton';
import Pagination from '../../components/Pagination/Pagination';

const Main = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageHistory, setPageHistory] = useState([null]);
    const [nextPage, setNextPage] = useState(null);

    const pageSize = 10;

    const fetchNews = async (pageToken) => {
        try {
            setIsLoading(true);

            const res = await getNews(pageToken, pageSize);

            setNews(res.results || []);
            setNextPage(res.nextPage || null);

            console.log(res);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNews(pageHistory[currentPage - 1]);
    }, [currentPage, pageHistory]);

    
    const handleNextPage = () => {
        if (!nextPage || isLoading) return;

        // Проверяем, существует ли уже следующая страница
        if (pageHistory[currentPage]) {
            setCurrentPage(prev => prev + 1);
            return;
        }

        // Если страницы ещё нет, сохраняем новый токен
        setPageHistory(prev => [...prev, nextPage]);

        setCurrentPage(prev => prev + 1);
    };


    const handlePreviousPage = () => {
        if (currentPage > 1 && !isLoading) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        if (pageNumber <= pageHistory.length && !isLoading) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <main className={styles.main}>

            {isLoading ? (
                <Skeleton type="banner" count={1}/>
            ) : (
                news.length > 0 && <NewsBanner item={news[0]}/>
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={pageHistory.length}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                handlePageClick={handlePageClick}
                hasNextPage={Boolean(nextPage)}
                isLoading={isLoading}
            />

            {isLoading ? (
                <Skeleton type="item" count={10}/>
            ) : (
                <NewsList news={news}/>
            )}
            

        </main>
    );
};

export default Main;
