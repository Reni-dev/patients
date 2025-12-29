import { Component } from '@angular/core';
import { PatientService } from '../shared/patient-service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient',
  imports: [ReactiveFormsModule],
  templateUrl: './patient.html',
  styleUrl: './patient.css',
})
export class Patient {

  patients: any
  patientForm: any
  showModal = false
  addMode = true

  constructor(
    private patientApi: PatientService,
    private builder: FormBuilder
  ){}

  ngOnInit(){
    this.patientForm = this.builder.group({
      id: null,
      name: '',
      birthDate: '',
      socialNumber: '',
      phone: ''
    })
    this.get()
  }

  // R-ead
  get(){
    this.patientApi.getPatients$().subscribe({
      next: (res: any) => {
        this.patients = res.data
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  // C-reate
  add(){
    console.log(this.patientForm.value)
    this.patientApi.addPatient$(this.patientForm.value).subscribe({
      next: (res: any) => {
        this.get()
        this.patientForm.reset()
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
    console.log(this.patientForm.value)
    this.patientApi.editPatient$(this.patientForm.value).subscribe({
      next: (res: any) => {
        this.get()
        this.patientForm.reset()
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
    this.patientForm.patchValue(patient)
  }

  // D-elete
  delete(id: number){
    this.patientApi.deletePatient$(id).subscribe({
      next: (res: any) => {
        this.get()
        console.log(res)
        Swal.fire({
          title: "Törölve!",
          text: "Páciens sikeresen törölve!",          
          icon: "success",
          showConfirmButton: false,
          timer: 2500,
        });
      },
      error: (err: any) => {
        console.log(err)
        Swal.fire({
          title: "Hiba!",
          text: "Páciens törlése sikertelen!",
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
