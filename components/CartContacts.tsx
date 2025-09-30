import React from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
// import './Profile.css';
// import { Link } from 'react-router-dom';
import { useEffect } from "react";
import styles from "../styles/Cart.module.css";

interface cartContactsProps {
  isDelivery: boolean;
  passErrors?: (isValid: boolean, errors: string[]) => void;
  passContacts?: (contacts: { [key: string]: string }) => void;
  isSubmiyClicked: boolean;
  isPaymentReceived: boolean
  // isTimeToReset: boolean // DEL?
}

const CartContacts: React.FC<cartContactsProps> = ({ isDelivery, passErrors, passContacts, isSubmiyClicked, isPaymentReceived }) => {
  // const { isLoggedIn, currentUser, onProfile, onNavMenuClick, onExitProfile } = props;
  // const [isDataNew, setIsDataNew] = React.useState(false);
  const {
    register,
    formState: { errors, isValid, isDirty },
    getValues,
    // handleSubmit,
    reset,
    // watch,
    trigger
  } = useForm({
    // defaultValues: {profileName: currentUser.name, profileEmail: currentUser.email},
    // mode: "all",
    mode: "onChange"
  });

  //   const compare = watch((data) => {
  //     if (data.profileName === data.name && data.profileEmail === data.email) {
  //       setIsDataNew(false)
  //     } else {
  //       setIsDataNew(true)
  //     }
  //   })
  // },[watch])

  // const onSubmit = (data) => {
    // onProfile(data.profileName, data.profileEmail);
    // reset(currentUser);
  // };

  const test = async () => {
    const errorsArray = [
      errors.name && errors.name.message,
      errors.phone && errors.phone.message,
      errors.email && errors.email.message,
      errors.adress && errors.adress.message
    ].filter(Boolean);

    const check = await trigger(); // Возвращает true, если форма валидна
    if (!check) {
      console.log(errors); // Выводит объект ошибок в консоль
      console.log(errorsArray)
    }
  }

  useEffect(()=> {
    if(!isPaymentReceived) {
      return
    } else {
      reset()
    }
  }, [isPaymentReceived])

  useEffect(()=> {
    if (!isValid) {
      return
    } else if (isSubmiyClicked) {
      const data = getValues()
      passContacts(data);
      // reset();
    } else {
      return;
    }
  }, [isSubmiyClicked])

  useEffect(() => {
    if (!isValid) {
      // console.log('вызываем при невалидности')
      const errorsArray = [
        errors.name && errors.name.message,
        errors.phone && errors.phone.message,
        errors.email && errors.email.message,
        isDelivery ? errors.adress && errors.adress.message : {}
      ].filter(Boolean);
      passErrors(isValid, errorsArray.map(error => typeof error === 'string' ? error : ''));
    } else {
      // console.log('вызываем при валидности')
      // const contacts = getValues()
      passErrors(isValid, []);
      // passContacts(getValues())
    }
  }, [isValid, errors.name?.message, errors.phone?.message, errors.email?.message, errors.adress?.message, isDelivery])

  useEffect(() => {
    trigger();
  }, [])

  // useEffect(() => {
  //   console.log(errors);
  // }, [errors])


  // useEffect(() => {
  //   console.log(`'принудительяная проверка' ${errors}`)
  // }, [errors])

  return (
    <form
      id="customerData"
      name="customerData"
      className={styles.cart__customerDataForm}
      // onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={styles.cart__title}
      >Данные получателя</h2>
      {/* <label className="profile__inputTitle"> */}
        {/* Имя */}
        <input
          {...register("name", {
            required: {
              value: true,
              message: "Заполните поле Имя",
            },
          })}
          type="text"
          placeholder="Имя и фамилия *"
          className={styles.cart__customerData}
        />
      {/* </label> */}

      {/* <label className="profile__account-label"></label> */}
      <InputMask
        {...register("phone", {
          required: {
            value: true,
            message: "Заполните поле Телефон",
          },
          pattern: {
            value: /^(\+7|8)\(\d{3}\)\d{3}-\d{2}-\d{2}$/,
            message: "Введите корректный номер телефона",
          },
        })}
        alwaysShowMask={false}
        name="phone"
        className={styles.cart__customerData}
        mask="+7(999)999-99-99"
        placeholder="Телефон *"
        inputMode="numeric"
      />
        <input
          {...register("email", {
            required: "Заполните поле Email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Некорректный адрес электронной почты",
            },
          })}
          type="email"
          placeholder="email *"
          className={styles.cart__customerData}
        />
      {isDelivery && (
        <textarea
          {...register("adress", {
            required: {
              value: true,
              message: "Заполните поле Адрес",
            },
          })}
          // type="text"
          placeholder="Адрес доставки *"
          className={styles.cart__customerData}
        />
      )}
      
        <textarea
          {...register("comment", {
            required: false
          })}
          // type="text"
          placeholder="Комментарий к заказу"
          className={styles.cart__customerData}
        />
    </form>
  );
};

export default CartContacts;
