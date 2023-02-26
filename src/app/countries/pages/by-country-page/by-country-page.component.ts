import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public initialValue: string = '';

  constructor( private readonly countriesService: CountriesService ) {}

  public ngOnInit(): void {
    this.countries = [ ...this.countriesService.cacheStore.byCountry.countries ];
    this.initialValue = this.countriesService.cacheStore.byCountry.term;
  }

  @Input()
  public searchByCountry( term: string ): void {
    this.countriesService.searchCountry(term)
      .subscribe( countries => {
        this.countries = countries;
      })
  }

}
