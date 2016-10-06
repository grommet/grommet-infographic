import React, { Component } from 'react';
import HPELogo from './HPELogo.js';
import classnames from 'classnames';
import Anchor from 'grommet/components/Anchor';
import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Headline from 'grommet/components/Headline';
import Share from 'grommet/components/icons/base/Share';
import SocialShare from 'grommet/components/SocialShare';

const CLASS_ROOT = 'section-nav';

export default class Nav extends Component {
  constructor() {
    super();
    this.state = {
      layerActive: false
    };

    this._onClick = this._onClick.bind(this);
    this._onLayerClose = this._onLayerClose.bind(this);
  }

  _onClick() {
    this.setState({layerActive: true});
  }
  
  _onLayerClose() {
    this.setState({layerActive: false});
  }

  render() {
    const classes = classnames(
      CLASS_ROOT
    );

    const navCta = (<Anchor label={'Share'} icon={<Share />} reverse={true} 
      onClick={this._onClick} primary={true} />);

    const layer = (this.state.layerActive) ? (
      <div className="share-layer">
        <Layer onClose={this._onLayerClose} closer={true} flush={true} 
          align={"center"}>
          <div className="share">
            <Headline size={"large"} strong={true}>
              Thanks for sharing, we're glad you enjoyed it.
            </Headline>
            <div className="share__icons">
              <SocialShare type="email"
              link="http://intelligent-venues.grommet.io/"
              title="Hewlett Packard Enterprise - Intelligent Venues"
              text="HPE is helping stadiums, theme parks and cultural 
                institutions turn visitors into uber fans." />
              <SocialShare type="twitter"
              link="http://intelligent-venues.grommet.io/"
              text="@HPE is helping stadiums, theme parks and cultural 
                institutions turn visitors into uber fans." />
              <SocialShare type="facebook"
              link="http://intelligent-venues.grommet.io/" />
              <SocialShare type="linkedin"
              link="http://intelligent-venues.grommet.io/"
              title="Hewlett Packard Enterprise - Intelligent Venues"
              text="HPE is helping stadiums, theme parks and cultural 
                institutions turn visitors into uber fans." />
            </div>
          </div>
        </Layer>
      </div>
    ) : undefined;

    return (
      <Header className={classes} direction="column" pad={{between:"none"}}
        align="start">
        {layer}
        <Box full="horizontal" direction="row" align="center" justify="between"
          responsive={false} colorIndex="neutral-1" pad="medium">
          <HPELogo />
          {navCta}
        </Box>
      </Header>
    );
  }
};
