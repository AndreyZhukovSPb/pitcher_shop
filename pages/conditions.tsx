import SectionLine from '../components/SectionLine'
import styles from '../styles/Conditions.module.css'
// import useCheckStorage from '../utils/checkStorage'

export default function conditions () {
  // useCheckStorage();
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
        

        <div className={styles.conditions__chapter}>
          <h3 className={styles.conditions__subTitle}>4. Цели сбора персональной информации пользователя</h3>
          <ul className={`${styles.conditions__text} ${styles.conditions__text_type_listTitle}`}>
            4.1. Персональные данные Пользователя Администрация сайта shop.pitcherbar.ru может использовать в целях:
            <li className={styles.conditions__text_type_listItem}>
              - Идентификации Пользователя, зарегистрированного на cайте shop.pitcherbar.ru, для оформления заказа.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Предоставления Пользователю доступа к персонализированным внутренним ресурсам и функционалу cайта shop.pitcherbar.ru.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Установления с Пользователем обратной связи, включая направление уведомлений, запросов, касающихся использования Сайта shop.pitcherbar.ru, оказания услуг, обработка запросов и заявок от Пользователя.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Определения места нахождения Пользователя для обеспечения безопасности, предотвращения мошенничества.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Подтверждения достоверности и полноты персональных данных, предоставленных Пользователем.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Создания учетной записи для совершения покупок, если Пользователь дал согласие на создание учетной записи путем ее создения с помощью интерфейса сайта shop.pitcherbar.ru.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Уведомления Пользователя Сайта shop.pitcherbar.ru о состоянии Заказа.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Обработки и получения платежей.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Предоставления Пользователю эффективной клиентской и технической поддержки при возникновении проблем, связанных с использованием Сайта shop.pitcherbar.ru.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Предоставления Пользователю обновлений продукции, специальных предложений, информации о ценах, новостной рассылки и иных сведений от имени shop.pitcherbar.ru.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Осуществления рекламной деятельности с согласия Пользователя.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Предоставления доступа Пользователю на сайты или сервисы партнеров shop.pitcherbar.ru с целью получения продуктов, обновлений и услуг.
            </li>
          </ul>
        </div>

        <div className={styles.conditions__chapter}>
          <h3 className={styles.conditions__subTitle}>5. Способы и сроки обработки персональной информации</h3>
          <p className={styles.conditions__text}>
            5.1. Обработка персональных данных Пользователя осуществляется без ограничения срока, любым законным способом, в том числе в информационных системах персональных данных с использованием средств автоматизации или без использования таких средств.
          </p>
          <p className={styles.conditions__text}>
            5.2. Пользователь соглашается с тем, что Администрация сайта вправе передавать персональные данные третьим лицам, в частности, курьерским службам, организациями почтовой связи, операторам электросвязи, исключительно в целях выполнения заказа Пользователя, оформленного на Сайте shop.pitcherbar.ru.            
          </p>
          <p className={styles.conditions__text}>
            5.3. Персональные данные Пользователя могут быть переданы уполномоченным органам государственной власти Российской Федерации только по основаниям и в порядке, установленным законодательством Российской Федерации.        
          </p>
          <p className={styles.conditions__text}>
            5.4. При утрате или разглашении персональных данных Администрация сайта информирует Пользователя об утрате или разглашении персональных данных.
          </p>
          <p className={styles.conditions__text}>
            5.5. Администрация сайта принимает необходимые организационные и технические меры для защиты персональной информации Пользователя от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий третьих лиц.
          </p>
          <p className={styles.conditions__text}>
            5.6. Администрация сайта совместно с Пользователем принимает все необходимые меры по предотвращению убытков или иных отрицательных последствий, вызванных утратой или разглашением персональных данных Пользователя.
          </p>
        </div>
        <div className={styles.conditions__chapter}>
          <h3 className={styles.conditions__subTitle}>6. обязательства сторон</h3>
          <ul className={`${styles.conditions__text} ${styles.conditions__text_type_listTitle}`}>
            6.1. Пользователь обязан:
            <li className={styles.conditions__text_type_listItem}>
              - Предоставить информацию о персональных данных, необходимую для пользования Сайтом shop.pitcherbar.ru.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Обновить, дополнить предоставленную информацию о персональных данных в случае изменения данной информации.
            </li>
          </ul>
          <ul className={`${styles.conditions__text} ${styles.conditions__text_type_listTitle}`}>
            6.2. Администрация сайта обязана:
            <li className={styles.conditions__text_type_listItem}>
              - Использовать полученную информацию исключительно для целей, указанных в п. 4 настоящей Политики.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Обеспечить хранение конфиденциальной информации в тайне, не разглашать без предварительного письменного разрешения Пользователя, а также не осуществлять продажу, обмен, опубликование, либо разглашение иными возможными способами переданных персональных данных Пользователя, за исключением п.п. 5.2. и 5.3. настоящей Политики.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Принимать меры предосторожности для защиты конфиденциальности персональных данных Пользователя согласно порядку, обычно используемого для защиты такого рода информации в существующем деловом обороте.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Осуществить блокирование персональных данных, относящихся к соответствующему Пользователю, с момента обращения или запроса Пользователя или его законного представителя либо уполномоченного органа по защите прав субъектов персональных данных на период проверки, в случае выявления недостоверных персональных данных или неправомерных действий.
            </li>
          </ul>
        </div>
        <div className={styles.conditions__chapter}>
          <h3 className={styles.conditions__subTitle}>7. Ответственность сторон</h3>
          <p className={styles.conditions__text}>
            7.1. Администрация сайта, не исполнившая свои обязательства, несет ответственность за убытки, понесенные Пользователем в связи с неправомерным использованием персональных данных, в соответствии с законодательством Российской Федерации, за исключением случаев, предусмотренных п.п. 5.2., 5.3. и 7.2. настоящей Политики.
          </p>
          <ul className={`${styles.conditions__text} ${styles.conditions__text_type_listTitle}`}>
            7.2. В случае утраты или разглашения Конфиденциальной информации Администрация сайта не несет ответственность, если данная конфиденциальная информация:
            <li className={styles.conditions__text_type_listItem}>
              - Стала публичным достоянием до ее утраты или разглашения.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Была получена от третьей стороны до момента ее получения Администрацией сайта.
            </li>
            <li className={styles.conditions__text_type_listItem}>
              - Была разглашена с согласия Пользователя.
            </li>
          </ul>
        </div>
        <div className={styles.conditions__chapter}>
          <h3 className={styles.conditions__subTitle}>8. Разрешение споров</h3>
          <p className={styles.conditions__text}>
            8.1. До обращения в суд с иском по спорам, возникающим из отношений между Пользователем сайта shop.pitcherbar.ru и Администрацией сайта, обязательным является предъявление претензии (письменного предложения о добровольном урегулировании спора).
          </p>
          <p className={styles.conditions__text}>
            8.2. Получатель претензии в течение 30 календарных дней со дня получения претензии, письменно уведомляет заявителя претензии о результатах рассмотрения претензии.
          </p>
          <p className={styles.conditions__text}>
            8.3. При не достижении соглашения спор будет передан на рассмотрение в Арбитражный суд города Санкт-Петербурга и Ленинградской области.
          </p>
          <p className={styles.conditions__text}>
            8.4. К настоящей Политике и отношениям между Пользователем и Администрацией сайта применяется действующее законодательство Российской Федерации.
          </p>
        </div>
        <div className={styles.conditions__chapter}>
          <h3 className={styles.conditions__subTitle}>9. Дополнительные условия</h3>
          <p className={styles.conditions__text}>
            9.1. Администрация сайта вправе вносить изменения в настоящую Политику без согласия Пользователя.
          </p>
          <p className={styles.conditions__text}>
            9.2. Новая Политика вступает в силу с момента ее размещения на Сайте shop.pitcherbar.ru, если иное не предусмотрено новой редакцией Политики.
          </p>
          <p className={styles.conditions__text}>
            9.3. Все предложения или вопросы по настоящей Политике следует сообщать через указанные на сайте shop.pitcherbar.ru контакты.
          </p>
          <p className={styles.conditions__text}>
            Дата публикации: 30/05/2024г.
          </p>
        </div>

      </section>
    <SectionLine/>
    </>
  )
}
