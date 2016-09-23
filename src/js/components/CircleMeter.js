import React, { Component } from 'react';

import Heading from 'grommet/components/Heading';
import Meter from 'grommet/components/Meter';
import FormFields from 'grommet/components/FormFields';
import Box from 'grommet/components/Box';
import Legend from 'grommet/components/Legend';
import Value from 'grommet/components/Value';

import { meterSeries } from '../constants';

export default class CircleMeter extends Component {
  constructor() {
    super();

    this.state = {
      rangeValue: 0,
      statValue: meterSeries[0].max
    };

    this._onActive = this._onActive.bind(this);
    this._onSlide = this._onSlide.bind(this);
  }

  _onActive(index) {
    if (index !== undefined)
      this.setState({ statValue: meterSeries[this.state.rangeValue].series[index].value });
    else this.setState({ statValue: meterSeries[this.state.rangeValue].max });
  }

  _onSlide(event) {
    this.setState({
      rangeValue: event.target.value,
      statValue: meterSeries[event.target.value].max
    });
  }

  render() {
    const label = (
      <Value 
        align="center" 
        value={this.state.statValue} 
        units="B"
        label="People"
      />
    );

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
        <Meter series={meterSeries[this.state.rangeValue].series}
          label={label}
          max={meterSeries[this.state.rangeValue].max} 
          stacked={true} 
          type="circle" 
          size="small" 
          onActive={this._onActive}
        />
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
