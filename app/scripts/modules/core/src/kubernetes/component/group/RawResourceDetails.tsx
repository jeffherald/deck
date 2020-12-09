import React from 'react';
import { Subject, Observable } from 'rxjs';
import { UISref } from '@uirouter/react';
import { Dropdown } from 'react-bootstrap';
//import { CloudProviderLogo } from 'core/cloudProvider/CloudProviderLogo';
import { Overridable, IOverridableProps } from 'core/overrideRegistry';
import { CollapsibleSection } from 'core';
//import { KubernetesManifestCommandBuilder } from '@kubernetes/manifest/manifestCommandBuilder.service';
//import { ManifestWizard } from 'kubernetes/manifest/wizard/ManifestWizard';

export interface IRawResourceDetailsProps extends IOverridableProps {
  $stateParams: {
    account: string;
    apiVersion: string;
    kind: string;
    namespace: string;
    displayName: string;
  };
  //   account: string;
  //   apiVersion: string;
  //   kind: string;
  //   namespace: string;
  //   displayName: string;
}

export interface IRawResourcesDetailState {
  account: string;
  apiVersion: string;
  kind: string;
  namespace: string;
  displayName: string;
}

Overridable('rawResource.details');
export class RawResourceDetails extends React.Component<IRawResourceDetailsProps, IRawResourcesDetailState> {
  public state: IRawResourcesDetailState = {
    account: null,
    apiVersion: null,
    kind: null,
    namespace: null,
    displayName: null,
  };
  private destroy$ = new Subject();
  private props$ = new Subject<IRawResourceDetailsProps>();

  /*
  public editRawResource(): void {
    KubernetesManifestCommandBuilder.buildNewManifestCommand(
      "Kubernetes",
      "apiVersion: apps/v1",
      "moniker",
      this.state.account,
    ).then((builtCommand:IKubernetesManifestCommandData) => {
      ManifestWizard.show({ title: 'Edit Manifest', application: "Kubernetes", command: builtCommand });
    });
  }
  */

  public componentDidMount() {
    this.setState({
      account: this.props.$stateParams.account,
      apiVersion: this.props.$stateParams.apiVersion,
      kind: this.props.$stateParams.kind,
      namespace: this.props.$stateParams.namespace,
      displayName: this.props.$stateParams.displayName,
    });
    // this.props$
    //   .do(({ $stateParams: { account, apiVersion, kind, namespace, displayName } }) => {
    //     this.setState({ account, apiVersion, kind, namespace, displayName });
    //   })
    //   .takeUntil(this.destroy$);
    // //   .subscribe(([account, apiVersion, kind, namespace, displayName]) => {
    // //     this.setState({ account, apiVersion, kind, namespace, displayName });
    // //   });

    // this.props$.next(this.props);
  }

  public componentWillReceiveProps(nextProps: IRawResourceDetailsProps) {
    this.props$.next(nextProps);
  }

  public componentWillUnmount() {
    this.destroy$.next();
  }

  private capitalCase(word: string): string {
    if (word !== null) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return '';
  }

  private shortKind(kind: string): string {
    if (kind !== null) {
      return this.capitalCase(kind.split('.')[0]);
    }
    return '';
  }

  public render() {
    const { account, apiVersion, kind, namespace, displayName } = this.state;

    const CloseButton = (
      <div className="close-button">
        <UISref to="^">
          <span className="glyphicon glyphicon-remove" />
        </UISref>
      </div>
    );

    const spanStyle = {
      width: '36px',
      height: '36px',
    };
    return (
      <div className="details-panel">
        <div className="header">
          {CloseButton}
          <div className="header-text horizontal middle">
            <span className="cloud-provider-logo">
              <span className="icon icon-kubernetes" style={spanStyle}></span>
            </span>
            <h3 className="horizontal middle space-between flex-1">{displayName}</h3>
          </div>
          <div className="actions">
            <Dropdown className="dropdown" id="resource-actions-dropdown">
              <Dropdown.Toggle className="btn btn-sm btn-primary dropdown-toggle">
                <span>{this.shortKind(kind)} Actions</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <li key="action-edit" id="resource-action-edit">
                  <a>Edit</a>
                </li>
                <li key="action-delete" id="resource-action-delete">
                  <a>Delete</a>
                </li>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="content">
            <CollapsibleSection heading="Information" defaultExpanded={true}>
              <dl className="dl-horizontal dl-narrow">
                <dt>API Version</dt>
                <dd>{apiVersion}</dd>
                <dt>Kind</dt>
                <dd>{this.capitalCase(kind)}</dd>
                <dt>Namespace</dt>
                <dd>{namespace}</dd>
              </dl>
            </CollapsibleSection>
          </div>
        </div>
      </div>
    );
  }
}
