import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { VisitService } from '../shared/visit-service';
import Swal from 'sweetalert2';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-visit',
  imports: [ReactiveFormsModule],
  templateUrl: './visit.html',
  styleUrl: './visit.css',
})
export class Visit {

  visits: any
  visitForm: any
  showModal = false
  addMode = true

  constructor(
    private visitApi: VisitService,
    private builder: FormBuilder
  ){}

  ngOnInit(){
    this.visitForm = this.builder.group({
      id: '',
      patientId: '',
      date: '',
      diagnosis: '',
      doctor: '',
    })
    this.get()
  }

  // R-ead
  get(){
    this.visitApi.getVisits$().subscribe({
      next: (res: any) => {
        this.visits = res.data
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  // C-reate
  add(){
    console.log(this.visitForm.value)
    this.visitApi.addVisit$(this.visitForm.value).subscribe({
      next: (res: any) => {
        this.get()
        this.visitForm.reset()
        console.log(res)
        this.showModal = false
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  // U-pdate
  edit(){
    console.log(this.visitForm.value)
    this.visitApi.editVisit$(this.visitForm.value).subscribe({
      next: (res: any) => {
        this.get()
        this.visitForm.reset()
        console.log(res)
        this.addMode = true
        this.showModal = false
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  editMode(patient: any) {
    this.addMode = false
    this.visitForm.patchValue(patient)
  }

  // D-elete
  delete(id: number){
    this.visitApi.deleteVisit$(id).subscribe({
      next: (res: any) => {
        this.get()
        console.log(res)
        Swal.fire({
          title: "Törölve!",
          text: "Rendelés sikeresen törölve!",          
          icon: "success",
          showConfirmButton: false,
          timer: 2500,
        });
      },
      error: (err: any) => {
        console.log(err)
        Swal.fire({
          title: "Hiba!",
          text: "Rendelés törlése sikertelen!",
          icon: "error",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    })
  }

  checkDelete(id: number){
    Swal.fire({
      title: "Biztosan törölni szeretnéd?",
      text: "Később nem módosítható!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgba(245, 155, 85, 1)",
      cancelButtonColor: "rgba(0, 0, 0, 1)",
      cancelButtonText: "Mégse...",
      confirmButtonText: "Törlés!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(id)
      }
    });
  }

  save(){
    if(this.addMode){
      this.add()
    }else{
      this.edit()
    }
  }

  setShowModal() {
    this.showModal = true
  }

  cancel(){
    this.showModal = false
    this.addMode = true
  }
}
