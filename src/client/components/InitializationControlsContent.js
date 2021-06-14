import React, { Component } from 'react';
import { Icon, Grid, Button } from '@material-ui/core';
import { Home, LocationSearching } from '@material-ui/icons';
import { styles } from './../styles/theme'

export default function InitializationControlsContent () {

    return (
      <div style={styles.divInitContent}>
          <Grid style={{flexDirection: 'column'}}
            container
            >
                <Grid item style={styles.gridItemTitle}
                >
                  <h1 style={styles.title}>Homing and WCS (Work Coordinate System)</h1>  
                </Grid>
                <Grid item style={styles.gridItemButton}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        startIcon={<Home style={styles.icon} />}
                    >
                        Home
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        startIcon={<LocationSearching style={styles.icon} />}
                    >
                        WCS
                    </Button>
                </Grid>
            </Grid>

      </div>
    );
  }