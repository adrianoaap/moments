import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moments',
  templateUrl: './new-moments.component.html',
  styleUrls: ['./new-moments.component.css']
})
export class NewMomentsComponent implements OnInit {

  btntext = 'Compartilhar!';

  constructor(private momentService: MomentService,
     private mensagemService: MessagesService,
     private router: Router) { }

  ngOnInit(): void {
  }

 createHeadler(moment: Moment){
    const formData = new FormData();
    formData.append('title', moment.title);
    formData.append('description', moment.description);
    formData.append('image', moment.image)
    
    this.momentService.createMoment(formData).subscribe();

    this.mensagemService.add('Momento adcionado com sucesso.')

    this.router.navigate(['/'])

  }

}
