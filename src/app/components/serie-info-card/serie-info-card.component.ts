import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceDetail } from 'src/app/models/resource';

@Component({
  selector: 'app-serie-info-card',
  templateUrl: './serie-info-card.component.html',
  styleUrls: ['./serie-info-card.component.scss']
})
export class SerieInfoCardComponent {
  @Input()
  title: string;

  @Input()
  resource: ResourceDetail;

  @Output()
  onClose = new EventEmitter();

  handleCloseEvent() {
    this.onClose.emit();
  }
}
