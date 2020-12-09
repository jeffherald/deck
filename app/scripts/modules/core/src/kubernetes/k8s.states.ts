import { module } from 'angular';
import { StateParams } from '@uirouter/angularjs';
import { ApplicationStateProvider, APPLICATION_STATE_PROVIDER } from 'core/application';
import { INestedState } from 'core/navigation';
import { K8sResources } from './component/K8sResources';
import { RawResourceDetails } from './component/group/RawResourceDetails';
import { K8sResourcesFilters } from './component/K8sResourcesFilters';

export const K8S_STATES = 'spinnaker.core.k8s.states';
module(K8S_STATES, [APPLICATION_STATE_PROVIDER]).config([
  'applicationStateProvider',
  (applicationStateProvider: ApplicationStateProvider) => {
    const rawResourceDetails: INestedState = {
      name: 'rawResourceDetails',
      url: '/rawResourceDetails/:account/:apiVersion/:kind/:namespace/:displayName',
      params: {
        vpcId: {
          value: null,
          squash: true,
        },
      },
      views: {
        'detail@../insight': {
          component: RawResourceDetails,
          $type: 'react',
        },
      },
      resolve: {
        rawResource: [
          '$stateParams',
          ($stateParams: StateParams) => {
            return {
              account: $stateParams.account,
              apiVersion: $stateParams.apiVersion,
              kind: $stateParams.kind,
              namespace: $stateParams.namespace,
              displayName: $stateParams.displayName,
            };
          },
        ],
      },
      data: {
        pageTitleDetails: {
          title: 'Raw Resource Details',
          nameParam: 'displayName',
          accountParam: 'account',
        },
        history: {
          type: 'rawResources',
        },
      },
    };
    const kubernetes: INestedState = {
      url: `/kubernetes`,
      name: 'k8s',
      views: {
        nav: { component: K8sResourcesFilters, $type: 'react' },
        master: { component: K8sResources, $type: 'react' },
      },
      data: {
        pageTitleSection: {
          title: 'Kubernetes',
        },
      },
      children: [],
    };

    applicationStateProvider.addInsightState(kubernetes);
    applicationStateProvider.addInsightDetailState(rawResourceDetails);
  },
]);
