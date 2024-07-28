import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

import {LayoutComponent} from '../layout/default/layout.component'

import {FaqComponent} from "./application/faq/faq.component"
import {ManualComponent} from "./application/manual/manual.component"
import {SupportComponent} from "./application/support/support.component"
import {ChangelogComponent} from "./application/changelog/changelog.component"
import {WelcomeComponent} from "./welcome/welcome.component"
import {GettingStartedComponent} from "./application/getting-started/getting-started.component"
import { ListPropertyComponent } from './properties/list-property/list-property.component'



const routeForPages = [

  {
    path: 'application',
    data: {
      breadcrumb: 'Application'
    },
    children: [      
      {
        path: 'getting-started',
        component: GettingStartedComponent,
        data: {
          breadcrumb: 'Getting started'
        },
      },
      {
        path: 'faq',
        component: FaqComponent,
        data: {
          breadcrumb: 'FAQ'
        },
      },
      {
        path: 'manual',
        component: ManualComponent,
        data: {
          breadcrumb: 'Manual'
        },
      },
      {
        path: 'support',
        component: SupportComponent,
        data: {
          breadcrumb: 'Support'
        },
      },
      {
        path: 'changelog',
        component: ChangelogComponent,
        data: {
          breadcrumb: 'Changelog'
        },
      },
    ]
  },
  {
    path: 'properties',
    data: {
      breadcrumb: 'Biens'
    },  
    children: [      
      {
        path: 'list',
        component: ListPropertyComponent,
        // data: {
        //   breadcrumb: 'Getting started'
        // },
      },
    ]
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    data: {
      breadcrumb: 'Welcome'
    },
  },
  {
    path: '**',
    redirectTo: '/app/welcome',
    pathMatch: 'full',
  },
]

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: routeForPages,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
