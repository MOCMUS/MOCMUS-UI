import React, { Component } from 'react';
import { Icon, Grid, Button, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { ChevronRight, Refresh } from '@material-ui/icons';
import { styles } from './../styles/theme'

const useStyles = makeStyles({
    button:{
        height: '6vh',
        width: '8vw',
        fontSize: '1.2vw',
        backgroundColor: 'rgb(15, 76, 117)',
        color: 'rgb(187, 225, 250)'
    },
    axisCard:{
        textAlign: 'center',
        alignSelf: 'center',
        width: '7%',
        fontSize: '3vh',
        padding: 2,
        backgroundColor: 'rgb(187, 225, 250)'
    },
  })

export default function StepperIncrementContent () {
    const classes = useStyles()

    return (
      <div style={styles.divInitContent}>
          <Grid style={{flexDirection: 'column'}}
            container
            >
                <Grid item style={styles.gridItemTitle}
                >
                  <h1 style={styles.title}>Manual</h1>  
                </Grid>
                <Grid item style={{display: 'flex', paddingBottom: 10, justifyContent: 'space-around'}}
                >
                    <Paper className={classes.axisCard}> X </Paper>
                    <Paper className={classes.axisCard}> Y </Paper>
                    <Paper className={classes.axisCard}> Z </Paper>
                    <Paper className={classes.axisCard}> B </Paper>
                    <Paper className={classes.axisCard}> C </Paper>
                </Grid>
                <Grid item style={{display: 'flex', flex: 1, justifyContent: 'space-around'}}
                >
                <Paper style={styles.textfield}>
                <TextField
                    id="increment-field-X"
                    type="number"
                    inputProps={{min: '-50', max: '50'}}
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
                    inputProps={{min: '-50', max: '50'}}
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
                    inputProps={{min: '-50', max: '50'}}
                    variant='outlined'
                    InputLabelProps={{
                    shrink: true,
                    }}
                /> 
                </Paper>
                <Paper style={styles.textfield}>
                <TextField
                    id="increment-field-B"
                    type="number"
                    inputProps={{min: '-50', max: '50'}}
                    variant='outlined'
                    InputLabelProps={{
                    shrink: true,
                    }}
                /> 
                </Paper>
                <Paper style={styles.textfield}>
                <TextField
                    id="increment-field-C"
                    type="number"
                    inputProps={{min: '-50', max: '50'}}
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
                        className={classes.button}
                    >
                        Send X
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Send Y
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Send Z
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Send B
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Send C
                    </Button>
                </Grid>
                <Grid item style={{display: 'flex', flex: 1, justifyContent: 'space-around'}} >
                    <Grid item style={{flex: 1}}>

                    </Grid>
                    <Grid item style={{display: 'flex', flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{height: '6vh', fontSize: '1.5vw', backgroundColor: 'rgb(15, 76, 117)', color: 'rgb(187, 225, 250)'}}
                    >
                        <Refresh style={styles.icon} />
                    </Button>
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
            </Grid>

      </div>
    );
  }