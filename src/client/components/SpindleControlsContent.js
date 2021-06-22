import React, { Component } from 'react';
import { Icon, Grid, Button, TextField, Paper } from '@material-ui/core';
import { ChevronRight, Stop } from '@material-ui/icons';
import { styles } from './../styles/theme'

export default function SpindleControlsContent () {

    return (
      <div style={styles.divInitContent}>
          <Grid style={{flexDirection: 'column'}}
            container
            >
                <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}
                >
                  <h1 style={styles.title}>Spindle Controls</h1>  
                </Grid>
                <Grid item style={{display: 'flex', flex: 2, justifyContent: 'space-around'}}
                >
                <Paper style={styles.textfield}>
                    <TextField
                        id="set-speed"
                        type="number"
                        inputProps={{min: '0', max: '30000'}}
                        style={{width: '12vw'}}
                        variant='outlined'
                    />
                </Paper>
                <Paper style={styles.textfield}>
                    <TextField 
                        id="current-speed"
                        type="number"
                        inputProps={{min: '0', readOnly: true}}
                        style={{width: '12vw'}}
                        variant='outlined'
                    /> 
                </Paper>
                </Grid>
                <Grid item style={{display: 'flex', flex: 2, justifyContent: 'space-around'}}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        endIcon={<ChevronRight style={styles.icon} />}
                    >
                        Set
                    </Button>
                    <Button
                        variant="contained"
                        color='secondary'
                        style={styles.button}
                        startIcon={<Stop style={styles.icon} />}
                    >
                        Stop
                    </Button>
                </Grid>
            </Grid>

      </div>
    );
  }