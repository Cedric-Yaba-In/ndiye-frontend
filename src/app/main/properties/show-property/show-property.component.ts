import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { NotificationService } from 'carbon-components-angular';
import { Observable } from 'rxjs';
import { PropertyAction, PropertyModel, PropertyState } from 'src/app/shared/store';
import { AddPropertyRoomComponent } from '../components/add-property-room/add-property-room.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddPropertyComponent } from '../add-property/add-property.component';
import { AddPropertyLocataireComponent } from '../components/add-property-locataire/add-property-locataire.component';

@Component({
  selector: 'app-show-property',
  templateUrl: './show-property.component.html',
  styleUrls: ['./show-property.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ShowPropertyComponent implements OnInit {


  loadingProperty = true;
  propertyFound:PropertyModel = null;
  propertyFound$:Observable<PropertyModel>;
  waittingResponseDeleteProperty = false;
  private addPropertyRoomDialogRef: MatDialogRef<AddPropertyRoomComponent | AddPropertyLocataireComponent>;
  
  public isDetailsOpened: boolean = false
  public leftSidebarVisibility: boolean = true

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router:Router,
    private notificationService: NotificationService,
    private _store:Store,
    private dialog: MatDialog

  ) {
  }

  ngOnInit(): void {
    let propertyId = this._activatedRoute.snapshot.paramMap.get('id');
    if(!propertyId)  {
      this._router.navigateByUrl('/app/properties/list');;
      return;
    }
    this.propertyFound$=this._store.select(PropertyState.selectStateProperty(propertyId));
    this.propertyFound$.subscribe((found)=>{
      if(!found){
        this._router.navigateByUrl('/app/properties/list');
        this.notificationService.showToast({
          type: "error",
          title: "Biens immobilier",
          subtitle: "Bien introuvable",
          target: "body",
          message: "message",
          duration: 2000,
        })
      }
      else
      {
        this.propertyFound = found;
        this.loadingProperty = false;
      }
    })
  }

  onClose(event) {
    this.isDetailsOpened = false
  }

  getTitle() {
    switch (this._activatedRoute.snapshot.firstChild.data.breadcrumb) {
      case 'locataires':
        return "Locataires de biens"
      case 'finances':
        return "Vos finances"
      case 'chambres':
        return "Vos Chambres / Studios / Appartements"
      default:
        break;
    }
  }

  onToggleLeftSidebar() {
    this.leftSidebarVisibility = !this.leftSidebarVisibility
  }

  onCreate() {
    switch (this._activatedRoute.snapshot.firstChild.data.breadcrumb) {
      case 'locataires':
        this.addPropertyRoomDialogRef = this.dialog.open(AddPropertyLocataireComponent, {
          viewContainerRef:null,
          disableClose: true,
          role: 'alertdialog',
          width: '500px'
        })
        return null
      case 'finances':
        return "Vos finances"
      case 'chambres':
        this.addPropertyRoomDialogRef = this.dialog.open(AddPropertyRoomComponent, {
          viewContainerRef:null,
          disableClose: true,
          role: 'alertdialog',
          width: '500px'
        })
        return null;
      default:
        break;
    }
    
  }
}
