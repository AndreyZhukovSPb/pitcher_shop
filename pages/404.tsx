import styles from "../styles/Notfound.module.css";

export default function Error () {
  return (
    <section className={styles.notfound}>
      <h1 className={styles.notfound_title}>Похоже такой страницы нет</h1>
    </section>
    
  )
}