import React from "react";
import { useForm } from "react-hook-form";
// import { useEffect } from "react";
import styles from "../styles/Cart.module.css";

interface cartPromoProps {
  applyPromocode: (value: string) => void;
}

const CartPromo: React.FC<cartPromoProps> = ({ applyPromocode }) => {
  
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

export default CartPromo;

