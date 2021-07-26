import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddResourceDialogComponent } from 'src/app/components/add-resource-dialog/add-resource-dialog.component';
import { Resource, ResourceChild } from 'src/app/models/resource';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public panelOpenState = false;
  public resourcesList: Resource[];
  public resourcesFullList: Resource[];
  public selectedResource: ResourceChild | null;
  public selectedItem: number;
  public newResource: ResourceChild;

  constructor(private resourceService: ResourceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.resourcesList = this.resourceService.getAll();
    this.resourcesFullList = JSON.parse(JSON.stringify(this.resourcesList));
  }

  handleSearchChange(event: KeyboardEvent) {
    const search = (event.target as HTMLInputElement).value.toLocaleLowerCase();
    if (search) {
      this.resourcesList[this.selectedItem].children = this.resourcesFullList[this.selectedItem].children.filter(resource => resource.name.toLocaleLowerCase().indexOf(search) > -1);
    }
    else {
      this.resourcesList[this.selectedItem].children = this.resourcesFullList[this.selectedItem].children.slice();
    }
  }

  handleFullSearchChange(event: KeyboardEvent) {
    const search = (event.target as HTMLInputElement).value.toLocaleLowerCase();
    this.resourcesList = JSON.parse(JSON.stringify(this.resourcesFullList));
    this.resourcesFullList.forEach((resource: Resource, index: number) => {
      if (this.resourcesList[index]) {
        this.resourcesList[index].children = resource.children.filter(
          resourceChild => {
            return (resourceChild.name.toLocaleLowerCase().indexOf(search) > -1 || resourceChild.details.description.toLocaleLowerCase().indexOf(search) > -1)
          }
        );
      }
    })
  }

  handleSelectItem(index: number) {
    this.selectedItem = index;
  }

  handleSelectResource(resource: ResourceChild) {
    this.selectedResource = resource;
  }

  handleCloseCard() {
    this.selectedResource = null;
  }

  handleAddResource(index: number) {
    this.newResource = {
      name: '',
      details: {
        description: '',
      }
    }
    const dialogRef = this.dialog.open(AddResourceDialogComponent, {
      width: 'fit-content',
      data: { index: index, resource: this.newResource }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name) {
        this.resourcesFullList[index].children.push(result);
        this.resourcesList[index].children.push(result);
      }
    });
  }
}
