import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPage: number = 0;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }
}
