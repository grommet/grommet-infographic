import React, { Component } from 'react';

import Heading from 'grommet/components/Heading';
import Meter from 'grommet/components/Meter';
import FormFields from 'grommet/components/FormFields';
import Box from 'grommet/components/Box';
import Legend from 'grommet/components/Legend';

import { meterSeries } from '../constants';

export default class CircleMeter extends Component {
  constructor() {
    super();

    this.state = {
      rangeValue: 0
    };

    this._onSlide = this._onSlide.bind(this);
  }

  _onSlide(event) {
    this.setState({ rangeValue: event.target.value });
  }

  render() {
    return (
      <Box align="center" style={{width:'100%'}}>
        <Heading className="box-title" tag="h4" strong={true}>
          World population using the Internet
        </Heading>
        <Heading tag="h5">
          {meterSeries[this.state.rangeValue].year}
        </Heading>
        <FormFields>
          <input type="range" id="slider" name="date-slider" 
            min="0" max="2" onChange={this._onSlide} 
            value={this.state.rangeValue} />
        </FormFields>
        <Meter series={meterSeries[this.state.rangeValue].series} units="B"
          max={meterSeries[this.state.rangeValue].max} stacked={true} 
          type="circle" size="small" />
        <Legend series={[
          {
            "label": "Not using the Internet",
            "colorIndex": "accent-3"
          },
          {
            "label": "Using the Internet",
            "colorIndex": "accent-1"
          }
        ]} units="B" />
      </Box>
    );
  }
};
