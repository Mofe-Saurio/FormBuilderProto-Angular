import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  @Input() displayIndex: number;
  @Input() parentForm: FormGroup;
  @Input() selectedDisplayField: any;

  constructor() { }

  ngOnInit() {
    console.log(this.selectedDisplayField);
  }

  get f() {
    return this.parentForm.controls;
  }

  get subMethods(): FormArray {
    return this.parentForm.get('subMethods') as FormArray;
  }

  get displayfield(): FormArray {
    return this.subMethods.at(0).get('displayfields') as FormArray;
  }

  get fDisplayField() {
    return this.selectedDisplayField.controls;
  }



  listDisplayFields(submethodIndex: number): FormArray {
    return this.subMethods.at(submethodIndex).get('displayfields') as FormArray;
  }

  get listField(): FormArray {
    return this.displayfield.at(this.displayIndex) as FormArray;
  }

  submit() {
    console.log(this.listDisplayFields);
    console.log(this.subMethods.getRawValue());
  }

}
