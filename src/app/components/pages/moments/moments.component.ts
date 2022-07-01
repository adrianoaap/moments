import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { MomentService } from 'src/app/services/moment.service';

import { environment } from 'src/environments/environment';

import { Moment } from 'src/app/Moment';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-moments',
  templateUrl: './moments.component.html',
  styleUrls: ['./moments.component.css']
})
export class MomentsComponent implements OnInit {

  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;
  faTimes = faTimes;
  faEdit = faEdit;

  constructor(private momentService: MomentService, private router: ActivatedRoute,
    private mensagemService: MessagesService, private route: Router) { }

  ngOnInit(): void {
    
    const id = Number(this.router.snapshot.paramMap.get('id'));

    this.momentService.getMomentsId(id)
    .subscribe(item => this.moment = item.data);

  }

  async remove(id: number){
     await this.momentService.remove(id).subscribe();
     this.mensagemService.add('Momento excluído com sucesso');
     this.route.navigate(['/']);
  }



}
