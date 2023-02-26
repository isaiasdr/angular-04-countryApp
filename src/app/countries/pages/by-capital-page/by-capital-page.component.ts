import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor( private readonly countryService: CountriesService ) {}

  public ngOnInit(): void {
    this.countries = [ ...this.countryService.cacheStore.byCapital.countries ];
    this.initialValue = this.countryService.cacheStore.byCapital.term;
  }

  public searchByCapital( term: string ): void {

    this.isLoading = true;

    this.countryService.searchCapital( term )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      })
  }
}
