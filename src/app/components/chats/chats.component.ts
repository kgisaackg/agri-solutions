import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ChatsService } from 'src/app/services/chats.service';
import Swal from 'sweetalert2';
import { chats } from '../../interface/chats.interface';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  userObj: any;
  toUser: string;
  chattingTo: string;

  constructor(private formBuilder: FormBuilder, private chatService: ChatsService, 
    private activatedRoute: ActivatedRoute, private router: Router) { 
      this.userObj =  this.router.getCurrentNavigation()!.extras.state;
      console.log("UserObj:", this.userObj.user)
      this.toUser = this.userObj.user.uid;
      this.chattingTo = this.userObj.user.firstname;
    }

  user_id = localStorage.getItem("farmer_auth") as string;
  //user_id = "RJiUEeIeV6PjAWaHNIG5f0WSjlF2";
  user_email = localStorage.getItem("farmer_email") as string;
  recipient = '';

  isLoading:boolean = false;
  
  chatForm = this.formBuilder.group({
    message: ['', Validators.required],
  })
  
  ngOnInit(): void {
    this.getMessages();
  }

  transformDate(){
    let date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    return date.getDate() + " " + month + " "+ date.getFullYear()
  }

  messages: chats[] = [];

  getMessages(){
    this.isLoading = true;
    this.chatService.getMessagesForUserById(this.user_id, this.toUser)
    .subscribe({
      next: (res: any) => {
        this.messages = res.map ( (document:any)=>{
          return {
            id: document.payload.doc.id,
            ...document.payload.doc.data() as any
          }
        });
        this.isLoading = false;
        console.log("messge", this.messages);
      },
      error: (error: any) => {
        this.isLoading = false;
        console.log("Error for chats", error);
        
      }
    })
  }
  
  onSubmit(){
    const chat = {
      status: 'null',
      recipient: this.user_id + this.toUser, //this.recipient,
    ...this.chatForm.value,
      authour: this.user_email,
      user_id: this.user_id,
      date: this.transformDate()
    }
    
    this.chatService.addChat(chat)
    .then(() => {
      Swal.fire(
        '',
        'Success'
      )
      this.isLoading = false;
      this.getMessages();
    })
    .catch( () => {
      Swal.fire(
        '',
        'Server error'
      )
       this.isLoading = false;
    }).finally( () => {
       this.chatForm.reset();
    })
  }

  getUser(user: string){
    return user.substring(0, 28);
  }

}
