import React from "react";
import { useForm } from "react-hook-form";
// import { useEffect } from "react";
import styles from "../styles/Cart.module.css";

interface cartPromoProps {
  applyPromocode: (value: string) => void;
}

const CartContacts: React.FC<cartPromoProps> = ({ applyPromocode }) => {
  
  const {
    register,
    // formState: { errors, isValid, isDirty },
    // getValues,
    handleSubmit,
    watch,
    // reset,
    // watch,
    
  } = useForm({
    // mode: "all",
    mode: "onChange"
  });

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault(); // ← предотвращает перезагрузку страницы
  //   console.log(getValues());
  // // reset();
  // };

  const codeValue = watch("code");
  
  const onSubmit = (data: any) => {
    // console.log(data.code);
    applyPromocode(data.code)
    // reset();
  };

  return (
    <form
      id="promoData"
      name="promoData"
      className={styles.cart__promorDataForm}
      onSubmit={handleSubmit(onSubmit)}
    >
        <input
          {...register("code", {
            required: {
              value: false,
              message: "Заполните поле Имя",
            },
          })}
          type="text"
          placeholder="введите значение"
          className={styles.cart__promoData}
        />
        <button type="submit" className={`${styles.cart__promoSbmt} ${codeValue ?styles.cart__promoSbmt_active : ''}`} >применить</button>
    </form>
  );
};

export default CartContacts;


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

  // const test = async () => {
  //   const check = await trigger(); // Возвращает true, если форма валидна
  //   if (!check) {
  //     console.log(errors); // Выводит объект ошибок в консоль
  //   }
  // }


  // useEffect(()=> {
  //   if (!isValid) {
  //     return
  //   } else if (isSubmiyClicked) {
  //     const data = getValues()
  //     passContacts(data);
  //     // reset();
  //   } else {
  //     return;
  //   }
  // }, [isSubmiyClicked])

  // useEffect(() => {
  //   if (!isValid) {
  //     // console.log('вызываем при невалидности')
  //     const errorsArray = [
  //       errors.name && errors.name.message,
  //       errors.phone && errors.phone.message,
  //       errors.email && errors.email.message,
  //       isDelivery ? errors.adress && errors.adress.message : {}
  //     ].filter(Boolean);
  //     passErrors(isValid, errorsArray.map(error => typeof error === 'string' ? error : ''));
  //   } else {
  //     // console.log('вызываем при валидности')
  //     // const contacts = getValues()
  //     passErrors(isValid, []);
  //     // passContacts(getValues())
  //   }
  // }, [isValid, errors.name?.message, errors.phone?.message, errors.email?.message, errors.adress?.message, isDelivery])

  // useEffect(() => {
  //   trigger();
  // }, [])

  // useEffect(() => {
  //   console.log(errors);
  // }, [errors])


  // useEffect(() => {
  //   console.log(`'принудительяная проверка' ${errors}`)
  // }, [errors])

