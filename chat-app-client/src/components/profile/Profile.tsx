import React from 'react';
import profileImg from "./profile.jpg";
import classes from './Profile.module.css';

const Profile = () =>  {
  return (
    <section className={classes.profile}>
            <img className={classes['profile__img']} alt="profile" src={profileImg} />
            <div className={classes['profile__info']}>
                <h2 className="heading-2">
                    lena john
                </h2>
                <p className={classes['profile__status']}>
                    nice day everyone
                </p>
            </div>
            <svg className={classes['profile__icon']}>
                <use href="imgs/sprite.svg#icon-user" />
            </svg>
        </section>
  )
}

export default Profile;
