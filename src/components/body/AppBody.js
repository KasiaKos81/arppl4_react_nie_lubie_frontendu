import React, {useEffect, useState} from 'react';
import classes from "./AppBody.module.css";
import {Button, Grid} from "@mui/material";
import connection from "../../axios/axios";
import Card from "../card/card";
import Notification from "../notification/Notification";


const AppBody = () => {
    const [carList, setCarList] = useState([]);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        connection.get("/api/car/list")        // fire and forget
            .then((response) => {
                console.log("OK! ");
                console.log(response);

                setCarList(response.data);
            })
            .catch((errorResponse) => {
                console.log("ErRoR: " + errorResponse);
            });
    }, []);

    const functionClickDelete = (paramId) => {
        console.log("wywołano usuń - parametr id: " + paramId)

        connection.delete("/api/car/delete/" + paramId)
            .then((response) => {
                setNotification("car has been deleted")

                for (var i = 0; i < carList.length; i++) {
                    if (carList[i].carId === paramId) {
                        carList.splice(i, 1)
                    }
                }

                const carListCopy = [...carList];
                setCarList(carListCopy);

            })
            .catch((errorResponse) => {
                    setNotification("unable to remove car: " + errorResponse)
                })
    }
    if (notification != null){
        setTimeout(() => {
            console.log("Timer zakończył pracę")
            setNotification(null);
        }, 5000);
    }

    console.log("Przeładowuję")

    return (
        <div className={classes.AppBody}>
            <Card cardTitle={"Cars for rent"}>
                <Grid container direction={"row"}> {/*cała tabela*/}
                    <Grid container className={classes.TableHeader}> {/*wiersz nagłówka*/}
                        <Grid item xs={2}>Id</Grid>
                        <Grid item xs={2}>Name</Grid>
                        <Grid item xs={2}>Brand</Grid>
                        <Grid item xs={2}>Body Type</Grid>
                        <Grid item xs={2}>Transmission</Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>

                    {
                        carList.map((elementListy) => {
                            return (<Grid key={elementListy.carId} container
                                          className={classes.TableRow}> {/*wiersz nagłówka*/}
                                <Grid item xs={2}>{elementListy.carId}</Grid>
                                <Grid item xs={2}>{elementListy.name}</Grid>
                                <Grid item xs={2}>{elementListy.make}</Grid>
                                <Grid item xs={2}>{elementListy.bodyType}</Grid>
                                <Grid item xs={2}>{elementListy.transmission}</Grid>
                                <Grid item xs={2}>
                                    <Button variant="contained" color="error" onClick={() => {
                                        functionClickDelete(elementListy.carId);
                                    }}>
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>)
                        })
                    }
                </Grid>

            </Card>

            <Notification>{notification}</Notification>

        </div>
    );
};

export default AppBody;
