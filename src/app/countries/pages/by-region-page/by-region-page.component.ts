import { Component, Input, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';
import { CountriesService } from '../../services/countries.service';



@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions: Region[] = [ 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania' ];
  public selectedRegion?: Region;

  constructor (private readonly countriesService: CountriesService ) {}

  public ngOnInit(): void {
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
    this.countries = [ ...this.countriesService.cacheStore.byRegion.countries ];
  }

  @Input()
  public searchByRegion( term: Region ) {

    this.selectedRegion = term;

    this.countriesService.searchRegion(term)
      .subscribe( countries => {
        this.countries = countries;
      })
  }

}
