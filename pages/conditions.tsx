import SectionLine from '../components/SectionLine'
import styles from '../styles/Conditions.module.css'

export default function conditions () {
  return (
    <>
      <section className={styles.conditions}>
        <div className={styles.conditions__chapter}>
          <h2 className={styles.conditions__title}>Обработка персональных данных</h2>
            <p className={styles.conditions__text}>
              Настоящая Политика обработки персональных данных (далее – Политика) действует в отношении всей информации, которую Индивидуальный предприниматель Жуков Андрей Владимирович, расположил на доменном имени https://shop.pitcherbar.ru также именуемом shop.pitcherbar.ru, либо Pitcher, может получить о Пользователе во время использования сайта shop.pitcherbar.ru.
            </p>
        </div>
        <div className={styles.conditions__chapter}>
          <h3 className={styles.conditions__subTitle}>1. Определение терминов</h3>
          <ul className={`${styles.conditions__text} ${styles.conditions__text_type_listTitle}`}>
            1.1 В настоящей Политике следующие термины:
            <li className={styles.conditions__text_type_listItem}>
              - Администрация сайта shop.pitcherbar.ru (далее «Администрация сайта») – уполномоченные сотрудники на управления сайтом, действующие от имени Индивидуального предпринимателя Жукова Андрея Владимировича, которые организуют и (или) осуществляет обработку персональных данных, а также определяет цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия (операции), совершаемые с персональными данными.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Персональные данные - любая информация, относящаяся к прямо или косвенно определенному, или определяемому физическому лицу (субъекту персональных данных);
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Обработка персональных данных - любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных;
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Блокирование персональных данных - временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных);
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Уничтожение персональных данных - действия, в результате которых становится невозможным восстановить содержание персональных данных в информационной системе персональных данных и (или) в результате которых уничтожаются материальные носители персональных данных;
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Обезличивание персональных данных - действия, в результате которых становится невозможным без использования дополнительной информации определить принадлежность персональных данных конкретному субъекту персональных данных;
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Конфиденциальность персональных данных - обязательное для соблюдения оператором или иным получившим доступ к персональным данным лицом требование не допускать их распространения без согласия субъекта персональных данных или наличия иного законного основания.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Пользователь сайта shop.pitcherbar.ru (далее «Пользователь») – лицо, имеющее доступ к Сайту, посредством сети Интернет.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Cookies — небольшой фрагмент данных, отправленный веб-сервером и хранимый на компьютере пользователя.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - IP-адрес — сетевой адрес узла в компьютерной сети, построенной на основе стека протоколов TCP/IP.
            </li>
          </ul>
        </div>
        <div className={styles.conditions__chapter}>
          <h3 className={styles.conditions__subTitle}>2. Общие положения</h3>
          <p className={styles.conditions__text}>
            2.1. Использование сайта shop.pitcherbar.ru означает согласие Пользователя с Политикой и условиями обработки персональных данных Пользователя.
          </p>
          <p className={styles.conditions__text}>
            2.2. Настоящая Политика применяется исключительно к сайту shop.pitcherbar.ru.
          </p>
          <p className={styles.conditions__text}>
            2.3. Администрация сайта не проверяет и не несет ответственность за достоверность введенных Пользователем персональных данных.
          </p>
        </div>
        <div className={styles.conditions__chapter}>
          <h3 className={styles.conditions__subTitle}>3. Предмет</h3>
          <p className={styles.conditions__text}>
            3.1. Настоящая Политика устанавливает обязательства Администрации сайта shop.pitcherbar.ru по неразглашению и обеспечению режима защиты конфиденциальности персональных данных, которые Пользователь предоставляет по запросу Администрации сайта при регистрации на сайте shop.pitcherbar.ru, при покупке, при обратной связи, при подписке на рассылку и при использовании другого функционала сайта.       
          </p>
          <ul className={`${styles.conditions__text} ${styles.conditions__text_type_listTitle}`}>
            3.2. Персональные данные, разрешенные к обработке в рамках настоящей Политики, предоставляются Пользователем путем заполнения всех форм на Сайте shop.pitcherbar.ru и могут включать в себя следующую информацию:
            <li className={styles.conditions__text_type_listItem}>
              - фамилию, имя, отчество Пользователя;
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - контактный телефон Пользователя;
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - адрес электронной почты (e-mail);
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - адрес доставки Товара.
            </li>
          </ul>
          <ul className={`${styles.conditions__text} ${styles.conditions__text_type_listTitle}`}>
            3.3. shop.pitcherbar.ru защищает Данные, которые автоматически передаются в процессе просмотра рекламных блоков и при посещении страниц, на которых установлен статистический скрипт системы:
            <li className={styles.conditions__text_type_listItem}>
              - IP адрес;
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - информация из cookies;
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - информация о браузере (или иной программе, которая осуществляет доступ к показу рекламы);
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - время доступа;
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - адрес страницы, на которой расположен рекламный блок;
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - реферер (адрес предыдущей страницы).
            </li>

          </ul>
          <p className={styles.conditions__text}>
            3.3.1. Отключение cookies может повлечь невозможность доступа к частям сайта shop.pitcherbar.ru, требующим авторизации.
          </p>
          <p className={styles.conditions__text}>
            3.3.2. shop.pitcherbar.ru осуществляет сбор статистики об IP-адресах своих посетителей. Данная информация используется с целью выявления и решения технических проблем, для контроля законности проводимых финансовых платежей.
          </p>
          <p className={styles.conditions__text}>            
            3.4. Любая иная персональная информация неоговоренная выше (история покупок, используемые браузеры и операционные системы и т.д.) подлежит надежному хранению и нераспространению, за исключением случаев, предусмотренных в п.п. 5.2. и 5.3. настоящей Политики.
          </p>
          <p className={styles.conditions__text}>
            3.5. Указание Покупателем номера мобильного телефона для получения СМС-оповещений о статусе заказа при оформлении заказа означает его согласие на получение текстовых информационных СМС-сообщений в соответствии с Федеральным законом от 21 июля 2014 года N 272-ФЗ «О внесении изменений в Федеральный закон "О связи"».
          </p>
          <p className={styles.conditions__text}>
            Продавец обязуется не рассылать СМС рекламного характера без дополнительного согласия на то Покупателя, полученного от него по электронной почте.
          </p>
          <p className={styles.conditions__text}>
            3.6. Если при первом размещении заказа Покупатель не отказывается от получения рассылок Продавца, осуществляемых им по электронной почте, то Продавец может присылать письма-напоминания о предстоящей обработке заказов, которые также могут содержать важную и полезную для Покупателя информацию. Покупатель может в любой момент отписаться от рассылки Продавца, пройдя по соответствующей ссылке электронного письма либо написав Продавцу письмо на любой из его электронных адресов.
          </p>
        </div>
        

        {/* <div className={styles.conditions__chapter}>
          <h3 className={styles.conditions__subTitle}></h3>
          <p className={styles.conditions__text}>            
          </p>
          <ul className={`${styles.conditions__text} ${styles.conditions__text_type_listTitle}`}>
            <li className={styles.conditions__text_type_listItem}>
              -
            </li>
          </ul>
        </div>

        <div className={styles.conditions__chapter}>
          <h3 className={styles.conditions__subTitle}></h3>
          <p className={styles.conditions__text}>            
          </p>
          <ul className={`${styles.conditions__text} ${styles.conditions__text_type_listTitle}`}>
            <li className={styles.conditions__text_type_listItem}>
              -
            </li>
          </ul>
        </div> */}
      </section>
    <SectionLine/>
    </>
  )
}

// !!! проверить на слова конфиденц !!!

// <div className={styles.conditions__chapter}>
//           <h3 className={styles.conditions__subTitle}></h3>
//           <p className={styles.conditions__text}>            
//           </p>
//           <ul className={`${styles.conditions__text} ${styles.conditions__text_type_listTitle}`}>
//             <li className={styles.conditions__text_type_listItem}>
//               -
//             </li>
//           </ul>
//         </div>

