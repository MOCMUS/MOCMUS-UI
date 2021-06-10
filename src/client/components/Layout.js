import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { styles } from './../styles/theme'
// import './styles/app.css';

export default function Layout () {

  return (
    <div>
        <Grid
            style={styles.gridLayout}
            container
            container spacing={0}
            justify="center"
            alignItems="flex-start" 
            >
            <Grid item xs={6}>
            </Grid>
            <Grid item xs={6}>
            </Grid>
        </Grid>
        <Grid
            style={styles.gridLayout}
            container
            container spacing={0}
            justify="center"
            alignItems="flex-start" 
            >
            <Grid item xs={6}>
            </Grid>
            <Grid item xs={6}>
            </Grid>
        </Grid>
    </div>
  );
}