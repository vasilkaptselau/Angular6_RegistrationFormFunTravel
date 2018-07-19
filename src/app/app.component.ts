import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  answers = [{
    type: 'yes',
    text: 'Yes'
  }, {
    type: 'no',
    text: 'No'
  }];

  form: FormGroup;
  passwordNumbers = 8;
  ngOnInit() {
    this.form = new FormGroup({
      user: new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, this.checkPasswordLength.bind(this)])
      }),
      state: new FormControl('ca'),
      answer: new FormControl('yes')
    });
  }
  onSubmit() {
    console.log('Submited', this.form);
  }
  checkPasswordLength(control: FormControl) {
    if (control.value.length < this.passwordNumbers) {
      return {
        'lengthError': true
      };
    }
    return null;
  }

  checkUsedEmail (control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'bob@mail.tv') {
          resolve({
            'emailIsUsed': true
          });
        } else {
          resolve(null);
        }
      }, 2000);
    });

  }
}
