import React, { Component, useState } from 'react';
import { Grid, Container } from '@material-ui/core';
import {Box, Tab} from '@mui/material'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@material-ui/core/styles'
import {TabContext, TabList, TabPanel} from '@mui/lab'
import { styles } from './../styles/theme'
import InitializationControlsContent from './InitializationControlsContent'
import SpindleControlsContent from './SpindleControlsContent'
import StepperIncrementContent from './StepperIncrementContent'
import MachineInfoContent from './MachineInfoContent'

const useStyles = makeStyles({
  root: {
    color: '#BBE1FF',
    '&$selected': {
      color: '#3282B8',
    },
  },
  selected: {},
});

const StyledTab = styled(Tab)({
  color: '#BBE1FF',
  "&.Mui-selected": {
    color: '#3282B8'
  }
});


export default function Layout () {

  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const classes = useStyles()

  return (
    <>
    <Box sx={{...styles.layoutContainer, width: '100%', typography: 'body1', backgroundColor: 'rgb(27, 38, 44)' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <StyledTab label="Machine Controls" value="1" />
            <StyledTab label="Config" value="2" />
            <StyledTab label="Dev" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" style={{padding: 0}}>
        <div>
          <Grid
              style={styles.gridContainer}
              container
              container spacing={0}
              >
              <Grid item style={styles.gridLeftItemLayer1} >
                <Container style={{height: '50%'}}>
                  <StepperIncrementContent />
                </Container>
                <Container style={{height: '50%'}}>
                  <MachineInfoContent />
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
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
    
    </>
  );
}