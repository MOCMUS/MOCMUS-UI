import React, { Component, Text } from 'react';
import { Icon, Grid, Button, Paper, TextField, Switch } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { styles } from './../styles/theme'

export default function MachineInfoContent () {

    return (
      <div style={styles.divInitContent}>
          <Grid style={{flexDirection: 'row'}}
            container
            >
                <Grid container style={{display: 'flex', flex: 1, flexDirection: 'column'}} >
                    <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                        <h1 style={styles.title}>Current Positions</h1>
                    </Grid>
                    <Grid container style={{display: 'flex', flex: 8}} >
                        <Grid container style={{display: 'flex', flex: 1, flexDirection: 'column'}} >
                            <Grid item style={{display: 'flex', flex: 1}} ></Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', width: '40%', fontSize: 45, padding: 2, backgroundColor: 'rgb(187, 225, 250)'}}>X</Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', width: '40%', fontSize: 45, padding: 2, backgroundColor: 'rgb(187, 225, 250)'}}>Y</Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', width: '40%', fontSize: 45, padding: 2, backgroundColor: 'rgb(187, 225, 250)'}}>Z</Paper>
                            </Grid>
                        </Grid>
                        <Grid container style={{display: 'flex', flex: 1, flexDirection: 'column'}} >
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', width: '80%', fontSize: 25, padding: 2, backgroundColor: 'rgb(187, 225, 250)'}}>Home</Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="home-X"
                                        type="text"
                                        inputProps={{readOnly: true}}
                                        InputProps={{style: {fontSize: 30, fontFamily: 'sans-serif'}}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="home-Y"
                                        type="text"
                                        inputProps={{readOnly: true}}
                                        InputProps={{style: {fontSize: 30, fontFamily: 'sans-serif'}}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="home-Z"
                                        type="text"
                                        inputProps={{readOnly: true}}
                                        InputProps={{style: {fontSize: 30, fontFamily: 'sans-serif'}}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container style={{display: 'flex', flex: 1, flexDirection: 'column'}} >
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', width: '80%', fontSize: 25, padding: 2, backgroundColor: 'rgb(187, 225, 250)'}}>WCS</Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="wcs-X"
                                        type="text"
                                        inputProps={{readOnly: true}}
                                        InputProps={{style: {fontSize: 30, fontFamily: 'sans-serif'}}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="wcs-Y"
                                        type="text"
                                        inputProps={{readOnly: true}}
                                        InputProps={{style: {fontSize: 30, fontFamily: 'sans-serif'}}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="wcs-Z"
                                        type="text"
                                        inputProps={{readOnly: true}}
                                        InputProps={{style: {fontSize: 30, fontFamily: 'sans-serif'}}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                        </Grid>  

                    </Grid>
                </Grid>
                <Grid item style={{display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}} >
                    <Switch></Switch>
                    <Switch></Switch>
                </Grid>
            </Grid>

      </div>
    );
  }