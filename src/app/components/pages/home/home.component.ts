import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { environment } from 'src/environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allMoments: Moment[] = [];
  moments: Moment[] = [];
  url = environment.baseApiUrl;

  faSearch = faSearch;
  searchTerm: string = '';

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
    this.momentService.getMoments().
      subscribe((item) => {
        const data = item.data;

        data.map((item) => {
          item.created_at = new Date(item.created_at!).toLocaleDateString('pt-br')
        })

        this.allMoments = data;
        this.moments = data;

      });
  }

  search(e: Event) {
    const target = e.target as HTMLInputElement
    const value = target.value

    this.moments = this.allMoments.filter(item => {
      return item.title.toLowerCase().includes(value)
    })
  }

}
