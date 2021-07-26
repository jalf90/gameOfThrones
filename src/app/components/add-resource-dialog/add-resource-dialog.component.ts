import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResourceChild, ResourceType } from 'src/app/models/resource';

interface Props {
  index: number,
  resource: ResourceChild
}

type DateType = 'from' | 'to';
type ResourceDateType = 'releaseDate' | 'birth' | 'productionDates';

@Component({
  selector: 'add-resource-dialog',
  templateUrl: 'add-resource-dialog.component.html',
  styleUrls: ['./add-resource-dialog.component.scss']
})
export class AddResourceDialogComponent {
  public form: FormGroup;
  public dateFrom: string;
  public dateTo: string;

  constructor(
    public dialogRef: MatDialogRef<AddResourceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Props,
    @Inject(LOCALE_ID) public locale: string,
    private fb: FormBuilder
  ) { }

  handleCancelEvent(): void {
    this.dialogRef.close();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleDateChange(event: any, dateType: DateType) {
    if (dateType === 'from') {
      this.dateFrom = this.handleFormatDate(event.target.value);
    }
    else {
      this.dateTo = this.handleFormatDate(event.target.value)
    }
    this.data.resource.details.productionDates = this.dateFrom + ' to ' + this.dateTo;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleResourceDateChange(event: any, field: ResourceDateType) {
    const dateValue = this.handleFormatDate(event.target.value);
    this.data.resource.details[field] = dateValue;
  }

  handleFormatDate(value: string) {
    return formatDate(value, 'dd.MM.yyyy', this.locale);
  }

  get resourceTypeName() { return ResourceType[this.data.index + 1] }
  get isSeason() { return this.data.index + 1 === ResourceType.Season }
  get isCast() { return this.data.index + 1 === ResourceType.Cast }
  get isEpisode() { return this.data.index + 1 === ResourceType.Episode }
}
