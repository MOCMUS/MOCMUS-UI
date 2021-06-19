import React, { Component, Text } from 'react';
import { Icon, Grid, Button, Paper, TextField } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { styles } from './../styles/theme'

export default function StepperIncrementContent () {

    return (
      <div style={styles.divInitContent}>
          <Grid style={{flexDirection: 'column'}}
            container
            >
                <Grid item style={styles.gridItemTitle}
                >
                  <h1 style={styles.title}>Steppers Motors Controls</h1>  
                </Grid>
                <Grid item style={{display: 'flex', paddingBottom: 10, justifyContent: 'space-around'}}
                >
                    <Paper style={{textAlign: 'center', width: '5%'}}>X</Paper>
                    <Paper style={{textAlign: 'center', width: '5%'}}>Y</Paper>
                    <Paper style={{textAlign: 'center', width: '5%'}}>Z</Paper>
                </Grid>
                <Grid item style={styles.gridItemButton}
                >
                <TextField
                    id="increment-field-X"
                    type="number"
                    inputProps={{min: '0', max: '50'}}
                    variant='outlined'
                    style={{width: '12vw'}}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <TextField
                    id="increment-field-Y"
                    type="number"
                    inputProps={{min: '0', max: '50'}}
                    variant='outlined'
                    style={{width: '12vw'}}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <TextField
                    id="increment-field-Z"
                    type="number"
                    inputProps={{min: '0', max: '50'}}
                    variant='outlined'
                    style={{width: '12vw'}}
                    InputLabelProps={{
                    shrink: true,
                    }}
                /> 
                </Grid>
                <Grid item style={styles.gridItemButton}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        endIcon={<ChevronRight style={styles.icon} />}
                    >
                        Send X
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        endIcon={<ChevronRight style={styles.icon} />}
                    >
                        Send Y
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        endIcon={<ChevronRight style={styles.icon} />}
                    >
                        Send Z
                    </Button>
                </Grid>
                <Grid item >
                    <Button
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        endIcon={<ChevronRight style={styles.icon} />}
                    >
                        Send All
                    </Button>
                </Grid>
            </Grid>

      </div>
    );
  }