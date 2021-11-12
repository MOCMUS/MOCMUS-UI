import React, { Component, useState } from 'react';
import { Icon, Grid, Button, TextField, Paper, Container } from '@material-ui/core';
import { ChevronRight, Stop } from '@material-ui/icons';
import { styles } from './../styles/theme'
import Axios from 'axios'
import SwitchSelector from "react-switch-selector";
import InitializationControlsContent from './InitializationControlsContent'
import SpindleControlsContent from './SpindleControlsContent'

export default function ConfigContent () {
  const [unit, setUnit] = useState('imp')
  const [step, setStep] = useState('inc')


    return (
      <>
          <Grid
              style={styles.gridContainer}
              container
              spacing={0}
              >
              <Grid item style={styles.gridLeftItemLayer1} >
                {/* <Container style={{height: '50%'}}>
                </Container>
                <Container style={{height: '50%'}}>
                </Container> */}
              </Grid>
              <Grid container style={styles.gridRightItemLayer1} >
                  <Grid item style={styles.gridTopItemLayer2} >
                    <InitializationControlsContent />
                  </Grid>
                  <Grid item style={styles.gridBottomItemLayer2} >
                  <Grid item style={{display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}} >
                    <div style={{width: '50%', height: 50}}>
                        <SwitchSelector
                            onChange={newUnit => setUnit(newUnit)}
                            options={[{ label: "Imperial",
                                        value: "imp",
                                        selectedBackgroundColor: 'rgb(15, 76, 117)',
                                        selectedFontColor: 'rgb(187, 225, 250)'},
                                    {   label: "Metric",
                                        value: "met",
                                        selectedBackgroundColor: 'rgb(15, 76, 117)',
                                        selectedFontColor: 'rgb(187, 225, 250)'}]}
                            initialSelectedIndex={unit}
                            backgroundColor={'rgb(27, 38, 44)'}
                            fontColor={'rgb(187, 225, 250)'}
                            fontSize={'20vw'}
                        />
                    </div>
                    <div style={{width: '50%', height: 50}}>
                        <SwitchSelector
                            onChange={newStep => setStep(newStep)}
                            options={[{ label: "Increment",
                                        value: "inc",
                                        selectedBackgroundColor: 'rgb(15, 76, 117)',
                                        selectedFontColor: 'rgb(187, 225, 250)'},
                                    {   label: "Absolute",
                                        value: "abs",
                                        selectedBackgroundColor: 'rgb(15, 76, 117)',
                                        selectedFontColor: 'rgb(187, 225, 250)'}]}
                            initialSelectedIndex={unit}
                            backgroundColor={'rgb(27, 38, 44)'}
                            fontColor={'rgb(187, 225, 250)'}
                            fontSize={'20vw'}
                        />
                    </div>
                </Grid>
                  </Grid>
              </Grid>
          </Grid>

      </>
    );
  }