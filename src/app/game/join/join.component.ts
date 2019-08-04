import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserGetService } from 'src/app/services/user/user-get.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  public user_data;
  public user_id;
  joinGameForm: FormGroup;

  
  

  constructor(private userGetService: UserGetService,private authService: AuthService,private router: Router,private fb : FormBuilder,private webSocketService: WebSocketService) { }

  ngOnInit() {

    this.joinGameForm = this.fb.group({
      game_pin: '',
      display_name: '',
      });

    this.user_id = this.authService.getSecureToken()
    console.log(this.user_id)

    this.findUserById()

    this.webSocketService.listen('player-join-success').subscribe((data) => {
      console.log('User connect successful!')
      this.webSocketService.getDisplayNames(this.joinGameForm.value.game_pin);
      this.router.navigate(["/game/play/player/lobby/" + this.joinGameForm.value.game_pin], {queryParams: {
     'name': this.joinGameForm.value.display_name}});

    })

      
    


  }

  

  findUserById(){
    this.userGetService.getUserById(this.user_id).subscribe(data => {
        this.user_data = data;

        console.log(this.user_data);

        this.userGetService.changeData(this.user_data)




      });
  }

  routeToHome(){
    this.router.navigate(["/main/home/" + this.user_id])
  }

  playerJoinGame(){
    console.log("Player joins the game")
    console.log(this.joinGameForm.value.display_name)
    this.webSocketService.playerConnect({game_pin: this.joinGameForm.value.game_pin, display_name: this.joinGameForm.value.display_name});
  }

}
