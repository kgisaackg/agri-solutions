import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChatsService } from 'src/app/services/chats.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private chatService: ChatsService) { }

  //user_id = localStorage.getItem("farmer_auth") as string;
  user_id = "CZ0A3irdhTNs4PpLwt4zOCXUGej1";
  user_email = localStorage.getItem("farmer_email") as string;
  recipient = '';
  isLoading:boolean = false;
  
  chatForm = this.formBuilder.group({
    message: ['', Validators.required],
  })
  
  ngOnInit(): void {
    this.user_id = "CZ0A3irdhTNs4PpLwt4zOCXUGej1";
    this.getMessages();
  }

  transformDate(){
    let date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    return date.getDate() + " " + month + " "+ date.getFullYear()
  }

  messages: any[] = [{
    user_id: this.user_id,
    message: "loe odsjfloiw weio jsfdoifj qeor jweofj ow 0"
  },
  {user_id: '2',
      message: "loe odsjfloiw weio jsfdoifj qeor jweofj ow 1"
    },{
    user_id: '3',
    message: "loe odsjfloiw weio jsfdoifj qeor jweofj ow 3"
    },{
    user_id: this.user_id,
    message: "loe odsjfloiw weio jsfdoifj qeor jweofj ow 2 "
    },
];
  getMessages(){
    this.isLoading = true;
    this.chatService.getMessagesForUserById("CZ0A3irdhTNs4PpLwt4zOCXUGej1", "RJiUEeIeV6PjAWaHNIG5f0WSjlF2")
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
      recipient: "RJiUEeIeV6PjAWaHNIG5f0WSjlF2", //this.recipient,
    ...this.chatForm.value,
      authour: this.user_email,
      user_id: "CZ0A3irdhTNs4PpLwt4zOCXUGej1", //this.user_id,
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

}
