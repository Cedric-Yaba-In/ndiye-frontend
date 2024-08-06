import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {YoupezModule} from "../../@youpez/youpez.module"
import { DummyTableRichComponent } from "./components/dummy-table-rich/dummy-table-rich.component";
import { DummyTablePaginationComponent } from './components/dummy-table-pagination/dummy-table-pagination.component'
import { DummyTableExpansionComponent } from './components/dummy-table-expansion/dummy-table-expansion.component'
import { DummyTableAdvancedComponent } from './components/dummy-table-advanced/dummy-table-advanced.component'
import { NgxsModule } from '@ngxs/store';
import { UserProfileState, UserState, PropertyState, RoomState, LocataireState } from './store';
@NgModule({
  imports: [
    CommonModule,
    YoupezModule,

    //Ngxs module
    NgxsModule.forFeature(
      [
        UserProfileState,
        UserState,
        PropertyState,
        RoomState,
        LocataireState
      ]),
  ],
  declarations: [
    DummyTableRichComponent,
    DummyTablePaginationComponent,
    DummyTableExpansionComponent,
    DummyTableAdvancedComponent
  ],
  exports: [
    YoupezModule,
    DummyTableRichComponent,
    DummyTablePaginationComponent,
    DummyTableExpansionComponent,
    DummyTableAdvancedComponent,
    NgxsModule
  ]
})
export class SharedModule {
  constructor() {

  }
}
