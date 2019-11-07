import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.scss']
})
export class FichaComponent implements OnInit {

  ordenTrabajo$: any = [];

  constructor(private router: Router, private http:HttpClient) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes(){
    this.http.get('http://localhost:4000/select-ot-cliente').subscribe(resp =>
      this.ordenTrabajo$ = resp as []
      );
  }

  gotoDetails(ordenTrabajoId: any) {
    this.router.navigate(['/ficha-ind/', ordenTrabajoId]);
  }

  GenerarOT(){
    this.router.navigate(['/orden-trabajo']);
  }

}
