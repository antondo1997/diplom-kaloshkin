import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserProfile} from '../interfaces';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  form: FormGroup;
  userProfile: UserProfile;
  phoneMask = ['+', '3', '7', '5', ' ', '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  constructor() {
  }

  ngOnInit(): void {
    this.userProfile = {
      email: 'test@gmail.com',
      name: 'Anton',
      surname: 'Do',
      telephone: '+375 (29) 123-45-67',
    }
    this.form = new FormGroup({
      email: new FormControl(this.userProfile.email, [
        Validators.required, Validators.email
      ]),
      name: new FormControl(this.userProfile.name, [
        Validators.required
      ]),
      surname: new FormControl(this.userProfile.surname, [
        Validators.required
      ]),
      telephone: new FormControl(this.userProfile.telephone, [
        Validators.required, Validators.pattern('[+]375\\s[(]\\d{2}[)]\\s\\d{3}([-]\\d{2}){2}')
      ]),
    });
  }

  submit() {
    if (this.form.invalid){
      return;
    }
    console.log(this.form.value);
  }
}
