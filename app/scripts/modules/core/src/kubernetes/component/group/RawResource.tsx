import React from 'react';
import { UISref, UISrefActive } from '@uirouter/react';
import './RawResource.less';

interface IRawResourceProps {
  resource: IApiKubernetesResource;
}

interface IRawResourceState {}

export class RawResource extends React.Component<IRawResourceProps, IRawResourceState> {
  constructor(props: IRawResourceProps) {
    super(props);
  }

  private handleRawResourceClicked = (event: React.MouseEvent<any>) => {
    //ReactGA.event({ category: 'Cluster Pod', action: 'Load Server Group Details' });
    //this.loadDetails(event);
  };

  public render() {
    const key = this.props.resource.kind + '-' + this.props.resource.displayName + '-' + this.props.resource.namespace;
    const params = {
      account: this.props.resource.account,
      apiVersion: this.props.resource.apiVersion,
      kind: this.props.resource.kind,
      namespace: this.props.resource.namespace,
      displayName: this.props.resource.displayName,
    };
    return (
      <UISrefActive class="active">
        <UISref to=".rawResourceDetails" params={params}>
          <div id={key} className="raw-resource-card clickable clickable-row" onClick={this.handleRawResourceClicked}>
            <h4 className="raw-resource-title">
              {this.props.resource.kind}: <b>{this.props.resource.displayName}</b>
            </h4>
            <div className="raw-resource-details" style={{ display: 'flex' }}>
              <div className="raw-resource-details-column" style={{ display: 'flex' }}>
                <div className="raw-resource-details-column-label">account:</div>
                <div>{this.props.resource.account}</div>
              </div>
              <div className="raw-resource-details-column" style={{ display: 'flex' }}>
                <div className="raw-resource-details-column-label">namespace:</div>
                <div>{this.props.resource.namespace}</div>
              </div>
              <div className="raw-resource-details-column" style={{ display: 'flex' }}>
                <div className="raw-resource-details-column-label">apiVersion:</div>
                <div>{this.props.resource.apiVersion}</div>
              </div>
            </div>
          </div>
        </UISref>
      </UISrefActive>
    );
  }
}
