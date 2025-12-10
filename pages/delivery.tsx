import SectionLine from '../components/SectionLine'
import styles from '../styles/Delivery.module.css'
import { mapSrc } from '../utils/constatnts'
// import useCheckStorage from '../utils/checkStorage'

export default function delivery () {
  // useCheckStorage();
  return (
    <>
      <section className={styles.delivery}>
        <div className={styles.delivery__chapter}>
          <h2 className={styles.delivery__title}>Доставка и оплата</h2>
          <p className={styles.delivery__text}>
            Мы доставим кофе до вашей двери в день заказа, если вы находитесь в Санкт-Петербурге. Оплата происходит на сайте банковской картой MasterCard, Visa, Maestro, Мир.
          </p>
          <p className={styles.delivery__text}>
            При заказе до 18:00 мы доставим кофе в день заказа. При заказе после 18:00, на следующий день. 
          </p>
        </div>
        <div className={styles.delivery__chapter}>
          <h2 className={styles.delivery__title}>Стоимость доставки</h2>
          <p className={styles.delivery__text}>
            Самовывоз в любой из наших кофеен бесплатно.
          </p>
          <ul className={`${styles.delivery__text} ${styles.delivery__text_type_listTitle}`}>
            Доставка по Санкт-Петербургу в пределах зеленой зоны на карте:
            <li className={styles.delivery__text_type_listItem}>- бесплатно при заказе на сумму от 2400р.</li>
            <li className={styles.delivery__text_type_listItem}>- 400р при заказе менее 2400р.</li>
          </ul>
          <ul className={`${styles.delivery__text} ${styles.delivery__text_type_listTitle}`}>
            Доставка в другие города РФ и доставка по Санкт-Петербургу за пределами зеленой зоны осуществляется компанией СДЭК. 
            <li className={styles.delivery__text_type_listItem}>- при заказе на сумму от 2400: бесплатно до пункта выдачи. </li>
            <li className={styles.delivery__text_type_listItem}>- при заказе на меньшую сумму: мы отвозим на склад СДЭК в Санкт-Петербурге бесплатно, а вы оплачиваете услуги транспортной компании при получении кофе.</li>
          </ul>
          <p className={styles.delivery__text}>
            Стоимость транспортных услуг СДЭК по России обычно составляет порядка 400-500 рублей до Урала и 700-800 рублей дальше на восток. Мы свяжемся с вами и скажем точную стоимость доставки перед отправкой заказа.
          </p>
          
        </div>
        <div className={styles.delivery__chapter}>
          <h2 className={styles.delivery__title}>Зоны доставки</h2>
          <p className={styles.delivery__text}>
            При заказе в пределах зеленой зоны Санкт-Петербурга мы отправляем кофе курьерской службой.
          </p>
          <p className={styles.delivery__text}>
            При заказе за пределами зеленой зоны доставка осуществляется компанией СДЭК.
          </p>
          <div className={styles.delivery__map} >
              <iframe
                className={styles.delivery__iframe}
                src={mapSrc}
                // title="2"
              ></iframe>
            </div>
        </div>

        <div className={styles.delivery__chapter}>
          <h2 className={styles.delivery__title}>Самовывоз</h2>
          <ul className={`${styles.delivery__text} ${styles.delivery__text_type_listTitle}`}>
            Вы можете забрать заказ из наших кофеен:
            <li className={styles.delivery__text_type_listItem}>- PITCHER на Марата 2 работает по графику понедельник-пятница с 9 до 22, суббота-воскресенье с 10 до 22.</li>
            <li className={styles.delivery__text_type_listItem}>- PITCHER на Бассейной 12 работает по графику понедельник-пятница с 8 до 22, суббота с 9 до 22, воскресенье с 10 до 22.</li>
          </ul>
        </div>
        <div className={styles.delivery__chapter}>
          <h2 className={styles.delivery__title}>Возврат</h2>
          <p className={styles.delivery__text}>
            Мы уверены в высоком качестве нашего кофе, но по закону обязаны рассказать, как вы можете его вернуть.
          </p>
          <p className={styles.delivery__text}>
            Согласно Закону РФ «О защите прав потребителей» вернуть продукты питания, в том числе кофе, можно в случае если продукция не соответствует стандартам или санитарным нормам: истек срок годности; продукт испортился и стал непригодным для употребления в пищу; в упаковке находится содержимое, не соответствующее описанию; обнаружено наличие посторонних предметов.
          </p>
          <p className={styles.delivery__text}>
            Если вы обнаружили один из этих признаков в кофе, свяжитесь с нами и мы вернем вам деньги.
          </p>
          <p className={styles.delivery__text}>
          </p>
        </div>
      </section>
    <SectionLine/>
    </>
  )
}

// 