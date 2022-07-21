import React from 'react';
import classes from './Card.module.css'

const Card = (properties) => {
    return (
        <div className={classes.CardContainer}>
            <div className={classes.CardHeader}>
                {properties.cardTitle}
            </div>
            <div className={classes.CardBody}>
                {properties.children}
            </div>
            
        </div>
    );
};

export default Card;
