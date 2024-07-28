import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.scss']
})
export class ListPropertyComponent implements OnInit {


  public properties = [
    {
      name: 'README.md',
      accessed: '5 mins ago',
      size: '2.2GB',
    },    
  ]
  public selectedItem = {
    name: 'import-restrictions.yaml',
    accessed: '5 mins ago',
    size: '0.1GB',
  }
  constructor() { }

  onCreate() {
    
  }
  ngOnInit(): void {
  }

}
