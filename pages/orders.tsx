import React, { useEffect } from "react";
import SectionLine from "../components/SectionLine";
import styles from "../styles/Orders.module.css";
import { useForm } from "react-hook-form";
import { login, auth, getOrders } from "../utils/api";
import Popup from "../components/Popup";
import { jokeForDasha } from "../utils/constatnts";
import ReactPaginate from 'react-paginate';
import type { AdminDataType } from "../utils/sharedTypes";
import Order from "../components/Order";

const Orders: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [isPopupOpened, setIsPopupOpened] = React.useState<boolean>(false);
  const [counter, setCounter] = React.useState<number>(3);
  const [popupMessage, setPopupMessage] = React.useState<string[]>([]);
  const [orders, setOrders] = React.useState<AdminDataType[]>([]);
  const [bugHandler, setBugHandler] = React.useState<number>(5);

  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const ordersPerPage = 15;
  const offset = currentPage * ordersPerPage;
  const currentOrders = orders.slice(offset, offset + ordersPerPage);
  const pageCount = Math.ceil(orders.length / ordersPerPage);
  
  const handlePageClick = (event) => {
    setCurrentPage(event.selected); 
    if (event.selected > 0 && event.selected < pageCount - 3) {
      setBugHandler(4)
    } else {
      setBugHandler(5)
    }
  };

  useEffect (()=>{
    if (counter === 0) {
      setPopupMessage([
        'Столько труда', 
        `И все коту под хвост`
      ])
    } else {
      setPopupMessage([
        'Даша, пароль неверный', 
        `осталось ${counter} попытки и сайт самоуничтожится`
      ])
    }
  },[counter])

  useEffect( ()=> {
    const token = localStorage.getItem('token')
    if (token) {
      handleAuth(token);
    } 
  },[])

  useEffect(()=> {
    if (!isLoggedIn) {
      return;
    } else {
      getOrders(localStorage.getItem('token'))
        .then(res => {
          console.log(res)
          setOrders(res.reverse())
        })
    }
  }, [isLoggedIn])

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    clearErrors
  } = useForm({
    mode: "all",
  });

  const handleAuth = (token) => {
    auth(token)
    .then(data => {
      if (data.success) {
        console.log('авторизация успешна')
        setIsLoggedIn(true)
      }
    })
  .catch(e => {
    // console.log(e.response.data.message)
    console.log(e.response)
  })
  }

  const onSubmit = (data) => {
    login(data.password)
      .then(res => {
        if (res.success === true) {
          localStorage.setItem('token', res.token);
          handleAuth(localStorage.getItem('token'))
          reset();
        } else  if (res.success === false){
            setCounter(counter-1)
            setIsPopupOpened(true)
            reset();
        } else {
          setPopupMessage(['Нет связи с сервером'])
          setIsPopupOpened(true)  
        }
        reset();
      })
      .catch(e => {
        setPopupMessage(['Нет связи с сервером'])
        setIsPopupOpened(true)
        reset();
      })
    reset();
    clearErrors();
  };

  const handleClosePopup = () => {
    if (counter <= 0) {
      setIsPopupOpened(false);
      window.location.href = jokeForDasha;
    } else {
      setIsPopupOpened(false);
    }
  }

  return (
    <>
      {!isLoggedIn && (
        <section className={styles.orders__login}>
          <h2 className={styles.orders__greeting}>
            Аня, привет! Как настроение?
          </h2>
          <h3 className={styles.orders__hay}>
            Давай проверим, что это ты
          </h3>
          <form
            className={styles.orders__form}
            id="login"
            name="login"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className={styles.orders__hay}>
              Введи, пожалуйста, секретное слово
            </h3>
            <input
              {...register("password", {
                required: {
                  value: true,
                  message: "ээ, поле чтоли не заполнено?",
                },
              })}
              type="password"
              placeholder="и ваш ответ?"
              className={styles.orders__input}
              
            />
              <span className={styles.orders__error}>
                {errors.password && typeof errors.password.message === "string"
                  ? errors.password.message
                  : ''}
              </span>
            <button className={styles.orders__btn} type="submit">Проверить</button>
          </form>
        </section>
      )}
      {isLoggedIn && (
        <section className={styles.orders__admin}>
          <nav className={styles.orders__nav}>
            <h2 className={styles.orders__navButton}>Заказы</h2>
          </nav>
          <div className={styles.orders__ordersList}>
            <ul className={styles.orders__currentPage}>
              {/* {currentOrders.slice().reverse().map((item) => ( */}
              {currentOrders.slice().map((item) => (
                <Order
                  order={item}
                  key={item._id}
                />
              ))}
            </ul>
            <ReactPaginate
              previousLabel={"< prev"}
              nextLabel={"next >"}
              breakLabel={''}
              pageCount={pageCount}
              pageRangeDisplayed={bugHandler}
              marginPagesDisplayed={0}
              onPageChange={handlePageClick}
              containerClassName={styles.orders__pagination}
              activeClassName={styles.orders__page_active}
              pageLinkClassName={styles.orders__pages}
              previousClassName={`${styles.orders__paginationButtons} ${styles.orders__paginationButtons_prev}`}
              nextClassName={`${styles.orders__paginationButtons} ${styles.orders__paginationButtons_next}`}
              renderOnZeroPageCount={null}
              forcePage={currentPage}
              nextLinkClassName={styles.orders__paginationButtons}
              // nextPageRel={null}
              // previousLinkClassName="page-link"
              // pageClassName={styles.orders__pages}
              // breakClassName={styles.orders__pages}
              // breakLinkClassName="page-link"
            />
          </div>
        </section>
      )}
      <SectionLine />
      <Popup
        isOpen={isPopupOpened}
        onClose={handleClosePopup}
        isPayed={false}
        message={popupMessage}
        isPaymentPending={false}
      />
    </>
  );
};

export default Orders;
