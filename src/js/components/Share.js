import React, { Component } from 'react';
import Button from 'grommet/components/Button';
import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import ShareIcon from 'grommet/components/icons/base/Share';
import SocialShare from 'grommet/components/SocialShare';

export default class Share extends Component {
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
    const navCta = (<Button label={'Share'} plain={true} icon={<ShareIcon />} 
      onClick={this._onClick} />);

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
      <Box direction="row" justify="end" responsive={false} pad="none">
        {navCta}
        {layer}
      </Box>
    );
  }
};
