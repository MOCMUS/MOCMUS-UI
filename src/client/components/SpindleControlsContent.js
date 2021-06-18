import React, { Component } from 'react';
import { Icon, Grid, Button, TextField } from '@material-ui/core';
import { ChevronRight, Stop } from '@material-ui/icons';
import { styles } from './../styles/theme'

export default function SpindleControlsContent () {

    return (
      <div style={styles.divInitContent}>
          <Grid style={{flexDirection: 'column'}}
            container
            >
                <Grid item style={styles.gridItemTitle}
                >
                  <h1 style={styles.title}>Spindle Controls</h1>  
                </Grid>
                <Grid item style={styles.gridItemButton}
                >
                <TextField
                    id="standard-number"
                    label="Set value"
                    type="number"
                    variant='outlined'
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <TextField
                    id="standard-number"
                    label="Current value"
                    type="number"
                    variant='outlined'
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