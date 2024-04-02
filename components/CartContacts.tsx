import React from 'react';  
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
// import './Profile.css';
// import { Link } from 'react-router-dom';
import { useEffect } from 'react';

interface cartContactsProps {
  isDelivery: boolean;
}

const CartContacts: React.FC<cartContactsProps> = ({ isDelivery }) => {

  // const { isLoggedIn, currentUser, onProfile, onNavMenuClick, onExitProfile } = props;
  
  // const [isDataNew, setIsDataNew] = React.useState(false);
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    reset,
    watch
  } = useForm({
    // defaultValues: {profileName: currentUser.name, profileEmail: currentUser.email},
    mode: "all" // "onChange"
  });
  
  // useEffect(()=>{
  //   const compare = watch((data) => {
  //     if (data.profileName === data.name && data.profileEmail === data.email) {
  //       setIsDataNew(false)
  //     } else {
  //       setIsDataNew(true)
  //     }
  //   })
  // },[watch])


  const onSubmit = (data) => {  
    // onProfile(data.profileName, data.profileEmail);
    // reset(currentUser);
  }

  function test() {
    console.log(isValid)
  }

  return (
    <>
      <section className="profile">
        {/* <h2 className="profile__title" onClick={test}>Привет, {currentUser.name}</h2> */}
        <form id="profileForm" name="profileForm" className="profile__form" onSubmit={handleSubmit(onSubmit)}>
          <label className="profile__inputTitle">
            Имя
            <input 
              {... register("profileName", {
                required: {
                  value: true,
                  message: "Поле Имя обязательно к заполнению"}
              })}
              type="text" 
              // placeholder={currentUser.name} 
              placeholder='Имя' 
              className="profile__input" 
            />
          </label>

          <label className='profile__account-label'>Номер телефона</label>
            <InputMask
              minLength={16}
              alwaysShowMask={true}
              name='phone'
              // onBlur={formik.handleBlur}
              // onChange={formik.handleChange}
              className='profile__account-input'
              mask={'+7(999)999-99-99'}
              placeholder='+7(___)___-__-__'
            />
            {/* {formik.touched.phone != null && formik.errors.phone != null && (
              <span className='profile__account-error'>
                {formik.errors.phone}
              </span>
            )} */}

          <label className="profile__inputTitle" >E-mail  
            <input 
              {... register("profileEmail", {
                required: "Поле Email обязательно к заполнению",
                pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Некорректный адрес электронной почты"
                }
              })}
              type="email" 
              placeholder='email' 
              className="profile__input" 
            />
          </label>
          
          {/* {errors.profileName && <span className="profile__error">{errors?.profileName?.message || "Другая ошибка"}</span>}
          {errors.profileEmail && <span className="profile__error">{errors?.profileEmail?.message || "Другая ошибка"}</span>} */}
          <div className="profile__buttonBox">
            {/* <button disabled={!isValid || !isDataNew || !isDirty} type="submit" className="profile__button">Редактировать</button>
            <Link onClick={onExitProfile} to={'./'} className="profile__link">Выйти из аккаунта</Link> */}
          </div>
        </form>
        
      
      </section>
    </>
  )
}

export default CartContacts;
