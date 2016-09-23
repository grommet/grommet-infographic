// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import Chart,
  { Layers, Base, Area, HotSpots }
  from 'grommet/components/chart/Chart';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import Legend from 'grommet/components/Legend';
import Value from 'grommet/components/Value';

import { areaSeries } from '../constants';

export default class AreaChart extends Component {

  constructor() {
    super();
    this.state = { index: (areaSeries.VALUES.length - 1) };
  }

  render() {
    return (
      <Box align="center" style={{width:'100%'}}>
        <Heading className="box-title" tag="h4" strong={true}>
          Growth in Internet Users
        </Heading>
        <Chart vertical={true} full={true}>
          <Base height="small" width="full" />
          <Layers>
            <Area values={areaSeries.VALUES} colorIndex="accent-1" 
              activeIndex={this.state.index} />
            <Area values={areaSeries.VALUES_2} colorIndex="accent-3" 
              activeIndex={this.state.index} />
            <HotSpots count={areaSeries.VALUES.length}
              activeIndex={this.state.index}
              onActive={(index) => this.setState({
                index: undefined === index ? (areaSeries.VALUES.length - 1) : index
              })} />
          </Layers>
        </Chart>
        <Box>
          <Heading tag="h5" strong={true}>
            Per 100 Users in {this.state.index + 2005}
          </Heading>
        </Box>
        <Box align="center" justify="start" className="area-legend" 
          direction="row" wrap={true} style={{width:'100%'}}>
          <Box className="area-legend__list" justify="center" 
            align="center" direction="column">
            <Value value={areaSeries.VALUES_2[this.state.index]} />
            <Legend series={[
              {
                "label": "Developing Countries",
                "colorIndex": "accent-3"
              }
            ]} />
          </Box>

          <Box className="area-legend__list" justify="center" 
            align="center" direction="column">
            <Value value={areaSeries.VALUES[this.state.index]} />
            <Legend series={[
              {
                "label": "Developed Countries",
                "colorIndex": "accent-1"
              }
            ]} />
          </Box>
        </Box>
      </Box>
    );
  }

};
