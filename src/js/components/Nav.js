import React, { Component } from 'react';
import HPELogo from '../components/HPELogo.js';
import classnames from 'classnames';
import Anchor from 'grommet/components/Anchor';
import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Share from 'grommet/components/icons/base/Share';
import SocialShare from 'grommet/components/SocialShare';

const CLASS_ROOT = 'section-nav';

export default class Nav extends Component {
  constructor() {
    super();

    this._onClick = this._onClick.bind(this);
    this._onLayerClose = this._onLayerClose.bind(this);

    this.state = {
      active: true,
      layerActive: false
    };
  }

  _onClick() {
    this.setState({layerActive: true});
  }
  
  _onLayerClose() {
    this.setState({layerActive: false});
  }

  render() {
    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--active`]: this.state.active
      }
    );

    let containerClasses = classnames(
      `${CLASS_ROOT}__container`,
      {
        [`${CLASS_ROOT}__container--started`]: this.state.started
      }
    );

    let icon = <Share className={`${CLASS_ROOT}__icon`} colorIndex={"dark-2"} />;

    let navCta = <Anchor label={'Share'} icon={icon} reverse={true} onClick={this._onClick} />;

    let layer = (this.state.layerActive) ? (
      <div className="share-layer">
        <Layer onClose={this._onLayerClose} closer={true} flush={true} align={"center"}>
          <div className="share">
            <Headline size={"large"} strong={true}>
              Thanks for sharing, we're glad you enjoyed it.
            </Headline>
            <div className="share__icons">
              <SocialShare type="email"
              link="#"
              title="Grommet Infographic"
              text="HPE...." />
              <SocialShare type="twitter"
              link="#"
              text="@HPE..." />
              <SocialShare type="facebook"
              link="#" />
              <SocialShare type="linkedin"
              link="#"
              title="Grommet Infographic"
              text="HPE..." />
            </div>
          </div>
        </Layer>
      </div>
    ) : null;

    return (
      <nav className={classes}>
      	<Box className={containerClasses} colorIndex="neutral-1">
          <HPELogo />
          <div className={`${CLASS_ROOT}__control`}>
            {navCta}
          </div>
        </Box>
        {layer}
      </nav>
    );
  }
};
