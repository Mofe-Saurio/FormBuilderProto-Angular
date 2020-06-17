import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {EditModalComponent } from './components/edit-modal/edit-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  form: FormGroup;
  auxItems: any[] = [];

  title = 'drag-drop';




  items = [
    {name: 'Input', displayFields: [this.textFieldType]},
    {name: 'Checkbox', displayFields: [this.checkboxFieldType]},
    {name: 'Label', displayFields: [this.labelFieldType]},
    {name: 'Text Area', displayFields: [this.textAreaFieldType]},
    {name: 'Buttons', displayFields: [this.buttonFieldType]},
  ];


  basket = [
    // {name: 'Input', displayFields: [this.textFieldType]},

    // {name: 'Checkbox', displayFields: [this.checkbox]},

  ];



  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal
  )
  {

  }

  ngOnInit() {
    this.initForm();
    this.auxItems.push(this.items);
    console.log(this.auxItems);
  }

  initForm() {
    this.form = this.fb.group({
      paymentMethodId: [null],
      methodName: [null],
      icon: [null],
      description: [null],
      active: true,
      platform: this.fb.array([this.fb.control('')]),
      subMethods: this.fb.array([this.subMethodStructure])
    });
  }
  get f() {
    return this.form.controls;
  }


  get subMethods(): FormArray {
    return this.form.get('subMethods') as FormArray;
  }


  get subMethodsDisplayFields(): FormArray {
    return this.subMethods.at(0).get('displayfields') as FormArray;
  }

  listDisplayFields(submethodIndex: number): FormArray {
    return this.subMethods.at(submethodIndex).get('displayfields') as FormArray;
  }




  get subMethodStructure(): FormGroup {
    return this.fb.group({
        discount: this.fb.group({
          apply: false
        }),
        fields: this.fb.array([]),
        subMethodId: '',
        subMethodName: '',
        processDefinitions: this.fb.array([]),
        displayfields: this.fb.array([]),
        setting: this.fb.array([])

    });
  }

  get textFieldType(): FormGroup {
    return this.fb.group({
      values: null,
      fieldName: '',
      type: 'TextField',
      validation: '',
      label: '',
      required: true
    });
  }

  get checkboxFieldType(): FormGroup {
    return this.fb.group({
      values: null,
      label: '',
      fieldName: '',
      type: 'Checkbox',
      required: true,
    });
  }

  get labelFieldType(): FormGroup {
    return this.fb.group({
      values: '',
      type: 'Label',
      fieldName: '',
      placeHolder: ''
    });
  }

  get textAreaFieldType(): FormGroup {
    return this.fb.group({
      values: '',
      type: 'TextArea',
      fieldName: '',
      placeHolder: ''
    });
  }

  get buttonFieldType(): FormGroup {
    return this.fb.group({
      values: null,
      fieldName: '',
      type: 'Button',
      label: '',
      validation: null,
      placeHolder: null,
      required: null
    });
  }

  addSortDisplayFields() {
    this.subMethodsDisplayFields.clear();
    this.basket.filter(x => {
      if (x.name === 'Checkbox') {
        this.subMethodsDisplayFields.push(this.checkboxFieldType);
      }else if (x.name === 'Input') {
        this.subMethodsDisplayFields.push(this.textFieldType);
      }else if (x.name === 'Label') {
        this.subMethodsDisplayFields.push(this.labelFieldType);
      }else if (x.name === 'Text Area') {
        this.subMethodsDisplayFields.push(this.textAreaFieldType);
      }else if (x.name === 'Buttons') {
        this.subMethodsDisplayFields.push(this.buttonFieldType);
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.addSortDisplayFields();
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.addSortDisplayFields();
    }
  }

  openEditModal(index?: number) {
    console.log(this.subMethodsDisplayFields.value);
    console.log(this.subMethodsDisplayFields.at(index).value);

    const modalRef = this.modalService.open(EditModalComponent, {
      size: 'xs'
    });

    modalRef.componentInstance.parentForm = this.form;
    modalRef.componentInstance.displayIndex = index;
    modalRef.componentInstance.selectedDisplayField = this.subMethodsDisplayFields.at(index);
  }

  submit() {
   console.log(this.subMethodsDisplayFields.value);
  }

}
