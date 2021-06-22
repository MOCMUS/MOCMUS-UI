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
                  <h1 style={styles.title}>Stepper Motors Controls</h1>  
                </Grid>
                <Grid item style={{display: 'flex', paddingBottom: 10, justifyContent: 'space-around'}}
                >
                    <Paper style={{textAlign: 'center', width: '5%', fontSize: 30, padding: 2, backgroundColor: 'rgb(187, 225, 250)'}}>X</Paper>
                    <Paper style={{textAlign: 'center', width: '5%', fontSize: 30, padding: 2, backgroundColor: 'rgb(187, 225, 250)'}}>Y</Paper>
                    <Paper style={{textAlign: 'center', width: '5%', fontSize: 30, padding: 2, backgroundColor: 'rgb(187, 225, 250)'}}>Z</Paper>
                </Grid>
                <Grid item style={{display: 'flex', flex: 1, justifyContent: 'space-around'}}
                >
                <Paper style={styles.textfield}>
                <TextField
                    id="increment-field-X"
                    type="number"
                    inputProps={{min: '0', max: '50'}}
                    variant='outlined'
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                </Paper>
                <Paper style={styles.textfield}>
                <TextField
                    id="increment-field-Y"
                    type="number"
                    inputProps={{min: '0', max: '50'}}
                    variant='outlined'
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                </Paper>
                <Paper style={styles.textfield}>
                <TextField
                    id="increment-field-Z"
                    type="number"
                    inputProps={{min: '0', max: '50'}}
                    variant='outlined'
                    InputLabelProps={{
                    shrink: true,
                    }}
                /> 
                </Paper>
                </Grid>
                <Grid item style={{display: 'flex', flex: 1, justifyContent: 'space-around'}}
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
                <Grid item style={{display: 'flex', flex: 1, justifyContent: 'space-around'}} >
                    <Button
                        variant="contained"
                        color="primary"
                        style={{height: '6vh', width: '14vw', fontSize: '1.5vw', backgroundColor: 'rgb(15, 76, 117)', color: 'rgb(187, 225, 250)'}}
                        endIcon={<ChevronRight style={styles.icon} />}
                    >
                        Send All
                    </Button>
                </Grid>
            </Grid>

      </div>
    );
  }