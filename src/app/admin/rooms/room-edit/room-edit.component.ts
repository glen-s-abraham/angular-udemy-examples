import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
import { Layout, LayoutCapacity, Room } from 'src/app/models/Room';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit,OnDestroy{
  @Input() room!:Room;
  @Output() dataChangedEvent= new EventEmitter();
  message = '';
  layouts = Object.keys(Layout);
  layoutEnum = Layout;
  roomForm:FormGroup;
  resetEventSubsription:Subscription;
  loadingComponent:true;
  constructor(private formBuilder:FormBuilder,private dataService:DataService,private router:Router,private formResetService:FormResetService){}
  ngOnInit() {
    this.initForm();
    this.resetEventSubsription=this.formResetService.resetRoomFormEvent.subscribe(room=>{
      this.room = room;
      this.initForm();
    })
  }

  initForm(){
    console.log(this.room)
    this.roomForm = this.formBuilder.group({
      roomName:[this.room.name,Validators.required],
      location:[this.room.location,[Validators.required,Validators.minLength(2)]]
    })
    for(let layout of this.layouts){
      const controlName = `layout${layout}`;
      const layoutCapacity = this.room.capacities?this.room.capacities.find(lc=>lc.layout===Layout[layout]):null;
      console.log(this.room);
      const initialCapacity = layoutCapacity==null?0:layoutCapacity.capacity;
      this.roomForm.addControl(controlName,this.formBuilder.control(initialCapacity));
    }
  }
  onSubmit(){
    this.room.name = this.roomForm.controls['roomName'].value;
    this.room.location = this.roomForm.value['location'];
    this.room.capacities = new Array<LayoutCapacity>();
    for(const layout of this.layouts){
      const layoutCapacity = new LayoutCapacity(Layout[layout],this.roomForm.controls[`layout${layout}`].value);
      this.room.capacities.push(layoutCapacity);
    }
    console.log(this.room)
    console.log(this.roomForm)
    //call a amethod in dataservice to save room
    if(!this.room.id){
      this.dataChangedEvent.emit()
      this.dataService.addRoom(this.room).subscribe(next=>{
        this.router.navigate(['admin','rooms'],{queryParams:{id:next.id,action:'view'}})
      });
    }else{
      this.dataChangedEvent.emit()
      this.dataService.updateRoom(this.room).subscribe(next=>{
        this.router.navigate(['admin','rooms'],{queryParams:{id:next.id,action:'view'}})
      });
    }
  }
  ngOnDestroy(): void {
    this.resetEventSubsription.unsubscribe();
  }
}
