import styles from "../styles/Preloader.module.css";

interface preloaderProps {
  isOpen: boolean;
}

const Preloader: React.FC<preloaderProps> = ({ isOpen }) => {

    return (
        <div className={`${styles.preloader} ${isOpen ? styles.preloader_opened : ''}`}>
            <div className={styles.preloader__container}>
                <span className={styles.preloader__round}></span>
            </div>
        </div>
    )
};

export default Preloader;
