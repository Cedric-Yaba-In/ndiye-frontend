import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {SharedModule} from "../shared/shared.module"
import {LayoutModule} from "../layout/layout.module"
import {AgGridModule} from '@ag-grid-community/angular'
import {ChartsModule} from '../../@youpez'
import {MainRoutingModule} from './main-routing.module'


import {FaqComponent} from './application/faq/faq.component'
import {ManualComponent} from './application/manual/manual.component'
import {SupportComponent} from './application/support/support.component'
import {ChangelogComponent} from './application/changelog/changelog.component'
import {WelcomeComponent} from './welcome/welcome.component'
import {GettingStartedComponent} from './application/getting-started/getting-started.component'
import { ListPropertyComponent } from './properties/list-property/list-property.component';
import { ShowPropertyComponent } from './properties/show-property/show-property.component';
import { AddPropertyComponent } from './properties/add-property/add-property.component';
import { PropertyRoomComponent } from './properties/components/property-room/property-room.component';
import { PropertyFinanceComponent } from './properties/components/property-finance/property-finance.component';
import { PropertyLocataireComponent } from './properties/components/property-locataire/property-locataire.component';
import { AddPropertyRoomComponent } from './properties/components/add-property-room/add-property-room.component'
import { LocatairePropertyModule } from './properties/components/locataire-property/locataire-property.module';
import { AddPropertyLocataireComponent } from './properties/components/add-property-locataire/add-property-locataire.component';
import { FinancialHistoryComponent } from './properties/components/financial-history/financial-history.component'

@NgModule({
  declarations: [
    ChangelogComponent,
    FaqComponent,
    GettingStartedComponent,
    ManualComponent,
    SupportComponent,
    WelcomeComponent,
    ListPropertyComponent,
    ShowPropertyComponent,
    AddPropertyComponent,
    PropertyRoomComponent,
    PropertyFinanceComponent,
    PropertyLocataireComponent,
    AddPropertyRoomComponent,
    AddPropertyLocataireComponent,
    FinancialHistoryComponent,
    
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    LayoutModule,
    SharedModule,
    ChartsModule,
    AgGridModule.withComponents([]),
    LocatairePropertyModule
  ]
})
export class MainModule {
}
