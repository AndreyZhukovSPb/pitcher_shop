import SectionLine from '../components/SectionLine'
import styles from '../styles/Conditions.module.css'
// import useCheckStorage from '../utils/checkStorage'

export default function about () {
  // useCheckStorage();
  
  return (
    <>
      <section className={styles.conditions}>
        <div className={styles.conditions__chapter}>
          <h2 className={styles.conditions__title}>Реквизиты компании</h2>
        </div>
        <table className={styles.conditions__table}>
          <tbody>
            <tr className={styles.conditions__tableLine}>
              <td className={`${styles.conditions__tableLabel} ${styles.conditions__text}`}>Юридичесий адрес:</td>
              <td className={`${styles.conditions__tableContent} ${styles.conditions__text}`}>617760, Пермская область, гор. Чайковский, ул. Мира 27-24</td>
            </tr>
            <tr className={styles.conditions__tableLine}>
              <td className={`${styles.conditions__tableLabel} ${styles.conditions__text}`}>Фактичекий адрес:</td>
              <td className={`${styles.conditions__tableContent} ${styles.conditions__text}`}>196070, г. Санкт-Петербург, ул. Бассейная 12</td>
            </tr>
            <tr className={styles.conditions__tableLine}>
              <td className={`${styles.conditions__tableLabel} ${styles.conditions__text}`}>ИНН:</td>
              <td className={`${styles.conditions__tableContent} ${styles.conditions__text}`}>592007476876</td>
            </tr>
            <tr className={styles.conditions__tableLine}>
              <td className={`${styles.conditions__tableLabel} ${styles.conditions__text}`}>ОГРНИП:</td>
              <td className={`${styles.conditions__tableContent} ${styles.conditions__text}`}>315595800068101</td>
            </tr>
            <tr className={styles.conditions__tableLine}>
              <td className={`${styles.conditions__tableLabel} ${styles.conditions__text}`}>Расчетный счет:</td>
              <td className={`${styles.conditions__tableContent} ${styles.conditions__text}`}>40802810132060000963</td>
            </tr>
            <tr className={styles.conditions__tableLine}>
              <td className={`${styles.conditions__tableLabel} ${styles.conditions__text}`}>Название Банка:</td>
              <td className={`${styles.conditions__tableContent} ${styles.conditions__text}`}>Филиал "Санкт-Петербургский" АО "АЛЬФА-БАНК"</td>
            </tr>
            <tr className={styles.conditions__tableLine}>
              <td className={`${styles.conditions__tableLabel} ${styles.conditions__text}`}>Кор.счет:</td>
              <td className={`${styles.conditions__tableContent} ${styles.conditions__text}`}>30101810600000000786</td>
            </tr>
            <tr className={styles.conditions__tableLine}>
              <td className={`${styles.conditions__tableLabel} ${styles.conditions__text}`}>БИК банка:</td>
              <td className={`${styles.conditions__tableContent} ${styles.conditions__text}`}>044030786</td>
            </tr>
            <tr className={styles.conditions__tableLine}>
              <td className={`${styles.conditions__tableLabel} ${styles.conditions__text}`}>ОКПО:</td>
              <td className={`${styles.conditions__tableContent} ${styles.conditions__text}`}>0201798557</td>
            </tr>
            <tr className={styles.conditions__tableLine}>
              <td className={`${styles.conditions__tableLabel} ${styles.conditions__text}`}>ОКАТО:</td>
              <td className={`${styles.conditions__tableContent} ${styles.conditions__text}`}>57401380000</td>
            </tr>
            <tr className={styles.conditions__tableLine}>
              <td className={`${styles.conditions__tableLabel} ${styles.conditions__text}`}>ОКТМО:</td>
              <td className={`${styles.conditions__tableContent} ${styles.conditions__text}`}>57701000001</td>
            </tr>

          </tbody>
        </table>

      </section>
    <SectionLine/>
    </>
  )
}
