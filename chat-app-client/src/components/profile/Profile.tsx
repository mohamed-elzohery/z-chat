import React from 'react';
import profileImg from "./profile.jpg";
import classes from './Profile.module.css';
import { UIActions } from '../../slices/UISlice';
import { useAppDispatch } from '../../hooks/app';

const Profile = () =>  {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(UIActions.openProfileEditor());
    }

  return (
    <section className={classes.profile}>
            <img className={`${classes['profile__img']} clickable`} alt="profile" src={profileImg} onClick={handleClick} />
            <div className={`${classes['profile__info']} clickable`} onClick={handleClick}>
                <h2 className="heading-2">
                    lena john
                </h2>
                <p className={classes['profile__status']}>
                    nice day everyone
                </p>
            </div>
        </section>
  )
}

export default Profile;
