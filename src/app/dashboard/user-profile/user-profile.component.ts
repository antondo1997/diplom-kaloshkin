import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FbAuthResponse, UserProfile, UserSignIn} from '../../shared/interfaces';
import {ProfileService} from '../services/profile.service';
import {Router} from '@angular/router';
import {AlertService} from '../services/alert.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  form: FormGroup;
  formChangePassword: FormGroup;
  userProfile: UserProfile;
  phoneMask = ['+', '3', '7', '5', ' ', '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  isLoading: boolean;
  submitted = false;
  hideOld = true;
  hideNew = true;
  hideConfirm = true;

  constructor(
    public profileService: ProfileService,
    private router: Router,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.profileService.getProfile()
      .subscribe((userProfile) => {
        // console.log(userProfile);
        this.userProfile = userProfile;
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
        this.formChangePassword = new FormGroup({
          oldPass: new FormControl(null, [
            Validators.required, Validators.minLength(6)
          ]),
          newPass: new FormControl(null, [
            Validators.required, Validators.minLength(6)
          ]),
          confirmPass: new FormControl(null, [
            Validators.required, Validators.minLength(6)
          ]),
        });
        this.isLoading = false;
      });
    // this.userProfile = {
    //   email: 'test@gmail.com',
    //   name: 'Anton',
    //   surname: 'Do',
    //   telephone: '+375 (29) 123-45-67',
    // };

  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    // console.log(this.form.value);
    const updateUserProfile: UserProfile = {
      ...this.userProfile,
      // email: this.form.value.email,
      name: this.form.value.name,
      surname: this.form.value.surname,
      telephone: this.form.value.telephone,
    };
    this.profileService.saveProfile(updateUserProfile).subscribe(() => {
      this.alertService.success('Профиль сохранен', 3000);
      // this.router.navigate()
    });
  }

  changePassword() {
    if (this.formChangePassword.invalid) {
      return;
    }
    this.submitted = true;
    console.log(this.formChangePassword.value);
    const user: UserSignIn = {
      email: this.userProfile.email,
      password: this.formChangePassword.value.oldPass,
      returnSecureToken: true
    };
    this.profileService.checkPassword(user)
      .subscribe((res: FbAuthResponse) => {
        // console.log(res);
        // console.log(localStorage.getItem('fb-token') === res.idToken);
        // this.setNewToken(res);

        if (res) {
          localStorage.setItem('fb-token', res.idToken); // new idToken
          this.profileService.changePassword(this.formChangePassword.value.newPass)
            .subscribe((response) => {
              console.log(response);
              this.profileService.error$.next(null);
              this.formChangePassword.reset();
              this.submitted = false;
              this.alertService.success('Пароль изменен', 3000);
            });
        }
      }, error => {
        console.log(error);
        this.submitted = false;
      });
  }

  private setNewToken(response: FbAuthResponse | null) {
    if (response) {
      localStorage.setItem('fb-token', response.idToken);
    }
  }
}
