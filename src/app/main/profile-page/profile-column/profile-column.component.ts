import { Component, OnInit } from '@angular/core';
import { UserGetService } from '../../../services/user/user-get.service';
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserPostService } from '../../../services/user/user-post.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { timeout } from 'q';



@Component({
  selector: 'app-profile-column',
  templateUrl: './profile-column.component.html',
  styleUrls: ['./profile-column.component.css']
})
export class ProfileColumnComponent implements OnInit {

  usernameForm: FormGroup
  emailForm: FormGroup
  quizPrivacyForm: FormGroup
  passwordForm: FormGroup

  constructor(private route: ActivatedRoute, private userGetService: UserGetService, private fb: FormBuilder, private authService: AuthService, private router: Router) { }


  public user_id;
  public user_data;
  public isDataLoaded: Boolean = false;
  public updateUserDone: Boolean = false;
  public updateEmailDone: Boolean = false;
  public quiz_privacy_check;
  public selectedFile: File;
  public pfpSrc;
  public pulledData;


  public afterFindingUser;


  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id');

    this.user_id = id;

    // this.findUserById()

    this.usernameForm = this.fb.group({
      new_username: ['']


    });

    this.emailForm = this.fb.group({

      new_email: ['']

    });

    this.quizPrivacyForm = this.fb.group({

      new_quiz_privacy: ['', Validators.required]


    });
    this.passwordForm = this.fb.group({

      old_password: [''],
      new_password: [''],
      new_retype_password: ['']


    });
    this.quiz_privacy_check = this.quizPrivacyForm.value.new_quiz_privacy;


    this.userGetService.currentUserData.subscribe(data => {
      this.user_data = data;
      console.log("this is the pulled data for profile-column")
      console.log(this.user_data)
      this.pfpSrc = "data:image/png;base64," + this.user_data[0].profile_picture;
      this.isDataLoaded = true;


    });

  }


  findUserById(){
    this.userGetService.getUserById(this.user_id).subscribe(data => {

        this.userGetService.changeData(data)
        console.log(data)




      });
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    

  }


  onUpdatePfp(){

    console.log(this.selectedFile);

    console.log("This is the file")

    const fd = new FormData()
    fd.append('profile_picture', this.selectedFile, this.selectedFile.name)

      this.userGetService.updateUserPfp(this.user_id, fd).subscribe(results => {
        this.findUserById()
        console.log("yep update works")
      });
      console.log(this.user_data)
      console.log(this.pulledData)
      // Right here i am uploading old data to the service
      // this.userGetService.changeData(this.user_data)

      this.updateUserDone = true;
  }



  onUpdateUsername() {
    

    this.userGetService.updateUser(this.user_id, this.usernameForm.value.new_username, this.user_data[0].email, this.user_data[0].quiz_privacy
    ).subscribe(results => {
      this.findUserById()

    });
    this.updateUserDone = true;


  }

  onUpdateEmail() {
    

    this.userGetService.updateUser(this.user_id, this.user_data[0].username, this.emailForm.value.new_email, this.user_data[0].quiz_privacy
    )
    .subscribe(results => {
      console.log("This shows that email subscribe is working")
      this.findUserById()

    });
    this.updateUserDone = true;

  }


  onUpdateQuizPrivacy() {
    
    if (this.quizPrivacyForm.value.new_quiz_privacy.length > 0) {
      console.log(this.quizPrivacyForm.value.new_quiz_privacy)
      this.userGetService.updateUser(this.user_id, this.user_data[0].username, this.user_data[0].email, this.quizPrivacyForm.value.new_quiz_privacy
      ).subscribe(results => {
        this.findUserById()
      });

      this.updateUserDone = true;
    }

  }

  onUpdatePassword() {

    this.userGetService.updateUserPw(this.user_id, this.passwordForm.value.old_password, this.passwordForm.value.new_password
    )
    .subscribe(results => {


    });
    // this.userGetService.changeData(this.user_data)
    setTimeout(() => {
      this.findUserById()
    },
      1000);


    this.updateUserDone = true;
  }

  onDeleteUser() {
    this.authService.logout()
    this.userGetService.deleteUserAcc(this.user_id).subscribe(results => {
      this.route
    });
    
    this.router.navigateByUrl('/cover' )

  }


}
