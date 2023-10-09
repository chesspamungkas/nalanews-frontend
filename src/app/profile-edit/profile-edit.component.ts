import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  apiUrl;
  user = {
    sub: null,
    error: null,
    loading: false,
    data: {
      profile_image: null,
      _id: null,
      email: null,
      first_name: null,
      last_name: null,
      joined: null,
    }
  }
  imgErr = null;

  image;

  editUser = {
    sub: null,
    loading: false,
    error: null
  }

  
  constructor(
    private _authService: AuthService,
    private _utils: UtilsService,
    private router: Router
    ) { }
    
    ngOnInit(): void {
      
      this.user.loading = true;
      this.user.error = null;
      
      this.user.sub = this._authService.fetchUserData()
      .subscribe({
        next: (res:any) => {
          res = this._utils.makeObjectSelected(res, ['profile_image', 'first_name', 'last_name', 'email', 'joined']);
          this.user.data = res;
          this.user.loading = false;
          this.user.sub.unsubscribe();
        },
        error: (err) => {
          this.user.error = err;
          this.user.loading = false;
          this.user.sub.unsubscribe();
        }
      });
      
    }
    
    editProfile() {
    
    this.editUser.loading = true;
    this.editUser.error = null;

    this.user.data = this._utils.trimObject(this.user.data);

    const formData = new FormData();
    formData.append('email', this.user.data.email);
    formData.append('first_name', this.user.data.first_name);
    formData.append('last_name', this.user.data.last_name);
    formData.append('joined', this.user.data.joined);
    if( this.image ) {
      formData.append('profile_image', this.image);
    }
    formData.forEach((value,key) => {
      console.log(key+" "+value)
    });
    this.editUser.sub = this._authService.editUser(formData)
    .subscribe({
      next: (res:any) => {
        this._authService.$User.next({
          _id: res._id,
          profile_image: res.profile_image,
          first_name: res.first_name,
          last_name: res.last_name,
          email: res.email,
          joined: res.joined,
        });
        this.editUser.loading = false;
        this.router.navigate(['/profile', res._id]);
      },
      error: (err) => {
        console.log(err);
        this.editUser.error = err;
        this.editUser.loading = false;
        this.user.sub.unsubscribe();
      }
    });
  }

  fileChangeEvent(e) {
    if( e.target.files.length > 0 ) {
      this.image = e.target.files[0];
      
      const file = (e.target as HTMLInputElement).files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.user.data.profile_image = reader.result as string;
      }
      reader.readAsDataURL(file)

    }
  }

}
