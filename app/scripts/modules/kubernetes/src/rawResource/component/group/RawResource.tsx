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

  public render() {
    const key =
      this.props.resource.account +
      '-' +
      this.props.resource.namespace +
      '-' +
      this.props.resource.kind +
      '-' +
      this.props.resource.displayName;
    const params = {
      account: this.props.resource.account,
      name: this.props.resource.name,
      region: this.props.resource.region,
    };
    return (
      <UISrefActive class="active">
        <UISref to=".rawResourceDetails" params={params}>
          <div id={key} className="raw-resource-card clickable clickable-row">
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
