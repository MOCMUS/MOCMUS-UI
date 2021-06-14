import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { styles } from './../styles/theme'

export default function Layout () {

  return (
    <div style={styles.layoutContainer}>
        <Grid
            style={styles.gridContainer}
            container
            container spacing={0}
            >
            <Grid item style={styles.gridLeftItemLayer1} >
            </Grid>
            <Grid container style={styles.gridRightItemLayer1} >
                <Grid item style={styles.gridTopItemLayer2} >
                </Grid>
                <Grid item style={styles.gridBottomItemLayer2} >
                </Grid>
            </Grid>
        </Grid>
    </div>
  );
}