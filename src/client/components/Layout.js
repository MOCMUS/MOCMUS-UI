import React, { Component } from 'react';
import { Grid, Container } from '@material-ui/core';
import { styles } from './../styles/theme'
import InitializationControlsContent from './InitializationControlsContent';
import SpindleControlsContent from './SpindleControlsContent';
import StepperIncrementContent from './StepperIncrementContent'


export default function Layout () {

  return (
    <div style={styles.layoutContainer}>
        <Grid
            style={styles.gridContainer}
            container
            container spacing={0}
            >
            <Grid item style={styles.gridLeftItemLayer1} >
              <Container style={{height: '50%'}}>
                <StepperIncrementContent />
              </Container>
            </Grid>
            <Grid container style={styles.gridRightItemLayer1} >
                <Grid item style={styles.gridTopItemLayer2} >
                  <InitializationControlsContent />
                </Grid>
                <Grid item style={styles.gridBottomItemLayer2} >
                  <SpindleControlsContent />
                </Grid>
            </Grid>
        </Grid>
    </div>
  );
}