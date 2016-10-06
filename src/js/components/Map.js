import React, { Component } from 'react';

import Heading from 'grommet/components/Heading';
import Legend from 'grommet/components/Legend';
import WorldMap from 'grommet/components/WorldMap';
import Box from 'grommet/components/Box';

import { mapSeries } from '../constants';

export default class Map extends Component {
  render() {
    return (
      <div className="infographic-map-container">
        <Heading className="box-title" tag="h4" strong={true}>
          Individuals Using the Internet per 100 Users
        </Heading>
        <Box className="infographic-map">
          <WorldMap series={mapSeries} />
        </Box>
        <Box align="center" justify="center">
          <Legend series={[
            {
              "label": "0",
              "colorIndex": "graph-4"
            },
            {
              "label": "1-25",
              "colorIndex": "graph-3"
            },
            {
              "label": "26-50",
              "colorIndex": "accent-3"
            },
            {
              "label": "50+",
              "colorIndex": "accent-1"
            }
          ]} />
        </Box>
      </div>
    );
  }
};
