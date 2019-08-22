import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-orden-trabajo',
  templateUrl: './orden-trabajo.component.html',
  styleUrls: ['./orden-trabajo.component.scss']
})
export class OrdenTrabajoComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private data: DataService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
         name: ['', Validators.required],
         message: ['', Validators.required]
       });
    //this.data.getUsers().subscribe(data=>{
    //  this.users = data;
    //  console.log(this.users);
    //  }
    //);
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
        return;
    }

    this.success = true;
  }



}
