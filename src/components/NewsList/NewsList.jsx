import NewsItem from '../NewsItem/NewsItem';
import styles from './styles.module.css';

const Image = ({news}) => {
    return (
        <ul className={styles.list}>
            {news.map(item => {
                return <NewsItem key={item.article_id} item={item}/>
            })}
        </ul>
    )
}

export default Image;