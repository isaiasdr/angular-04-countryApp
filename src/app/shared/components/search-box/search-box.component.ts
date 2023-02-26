import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscriptionSubscription?: Subscription;

  @ViewChild('txtSearchInput')
  public term!: ElementRef<HTMLInputElement>;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  public ngOnInit(): void {
    this.debouncerSubscriptionSubscription = this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe( value => {
      this.onDebounce.emit(value);
    })
  }

  public ngOnDestroy(): void {
    this.debouncerSubscriptionSubscription?.unsubscribe();
  }

  public onSearchTerm(): void {
    const searchTerm = this.term.nativeElement.value;
    if ( searchTerm.length === 0 ) return;

    this.onValue.emit( searchTerm );
    this.term.nativeElement.value = '';
  }

  public onKeyPress( searchTerm: string ): void {
    this.debouncer.next( searchTerm );
  }
}
