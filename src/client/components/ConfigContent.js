import React, { Component, useState } from 'react';
import { Icon, Grid, Button, TextField, Paper, Container } from '@material-ui/core';
import { ChevronRight, Stop } from '@material-ui/icons';
import { styles } from './../styles/theme'
import Axios from 'axios'
import InitializationControlsContent from './InitializationControlsContent'
import SpindleControlsContent from './SpindleControlsContent'

export default function ConfigContent () {


    return (
      <>
          <Grid
              style={styles.gridContainer}
              container
              container spacing={0}
              >
              <Grid item style={styles.gridLeftItemLayer1} >
                <Container style={{height: '50%'}}>
                    <SpindleControlsContent />
                </Container>
                <Container style={{height: '50%'}}>
                </Container>
              </Grid>
              <Grid container style={styles.gridRightItemLayer1} >
                  <Grid item style={styles.gridTopItemLayer2} >
                    <InitializationControlsContent />
                  </Grid>
                  <Grid item style={styles.gridBottomItemLayer2} >
                  </Grid>
              </Grid>
          </Grid>

      </>
    );
  }