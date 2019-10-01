import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Policy } from '../model';

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.scss']
})
export class AsignarComponent implements OnInit {
	policies:  Policy[];
    selectedPolicy:  Policy  = { id :  null , number:null, amount:  null};
  	constructor(private apiService: ApiService) { }

  	ngOnInit() {
  		this.apiService.readPolicies().subscribe((policies: Policy[])=>{
      		this.policies = policies;
      		console.log(this.policies);
    	})
  	}

}
