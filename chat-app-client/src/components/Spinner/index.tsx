import React from 'react';
import classes from './loader.module.css';
import { CSSProperties } from 'react';
const Spinner: React.FC<{styles: CSSProperties}> = ({styles}) => <div className={classes.loader} style={styles}></div>;

export default Spinner;