import { Component, OnInit, TemplateRef } from '@angular/core';
import { AlertifyService } from '../shared/serivces/basic/alertify/alertify.service';
import { UsersService } from '../shared/serivces/custom/users/users.service';
import { User } from 'src/app/shared/models/user/user';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'parent-aps-enquire',
  templateUrl: './enquire.component.html',
  styleUrls: ['./enquire.component.scss'],
})
export class EnquireComponent implements OnInit {
  //#region decleartions variables
  modalRef?: BsModalRef;
  pageInitial = 1;
  pageSize = 6;
  maxPageSiz: number;
  users: User[] = [];
  singlUser: User;
  showOnClick = false;
  selectedUser = {} as User;
  UserToAdd = {} as User;
  formAdd: FormGroup;
  formEdit: FormGroup;
  loading: boolean = false;
  //#endregion

  constructor(
    private usersService: UsersService,
    private alertify: AlertifyService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) {}

  //#region Initial Form
  initialFormAdd() {
    this.formAdd = this.fb.group({
      name: ['', [Validators.required]],
      job: ['', [Validators.required]],
    });
  }
  initialFormEdit() {
    this.formEdit = this.fb.group({
      name: ['', [Validators.required]],
      job: ['', [Validators.required]],
    });
  }
  //#endregion

  //#region MapFormValues
  mapFormValuesEdit() {
    this.selectedUser.first_name = this.formEdit.value.name;
    this.selectedUser.job = this.formEdit.value.job;
  }
  mapFormValuesAdd() {
    this.UserToAdd.first_name = this.formAdd.value.name;
    this.UserToAdd.job = this.formAdd.value.job;
  }
  patchValues(object: User) {
    this.formEdit.patchValue({
      id: object.id,
      name: object.first_name,
      job: object.job,
      avatar: object.avatar,
    });
  }
  //#endregion

  //#region basic
  private getPage(page: number) {
    this.usersService.getPages(this.pageInitial).subscribe(
      (res) => {
        this.users.push(...res.data);
        this.maxPageSiz = res.total_pages;
        this.loading = true;
      },
      (err) => {
        this.alertify.error(err.error.error);
      },
      () => {
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    );
  }
  loadUsers() {
    this.getPage(++this.pageInitial);
  }

  selectRow(id: number | undefined) {
    this.usersService.getby(id).subscribe(
      (res) => {
        this.singlUser = this.selectedUser = res.data;
        this.showOnClick = true;
        this.patchValues(this.singlUser);
      },
      (err) => {
        this.alertify.error(err.error.error);
      }
    );
  }
  closeDetails() {
    this.showOnClick = false;
  }
  //#endregion

  //#region Add
  add(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-sm modal-dialog-centered ' })
    );
  }

  confirmAdd(): void {
    this.mapFormValuesAdd();
    this.usersService.add(this.UserToAdd).subscribe(
      (res) => {
        this.alertify.success('Successfully added');
      },
      (err) => {
        this.alertify.error(err.error.error);
      }
    );
    this.modalRef?.hide();
  }
  declineAdd(): void {
    this.modalRef?.hide();
  }
  //#endregion

  //#region edit
  edit(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-sm modal-dialog-centered ' })
    );
  }

  confirmEdit(): void {
    this.mapFormValuesEdit();
    this.usersService.edit(this.selectedUser).subscribe(
      (res) => {
        this.alertify.success('Successfully modified');
      },
      (err) => {
        this.alertify.error(err.error.error);
      }
    );
    this.modalRef?.hide();
  }
  declineEdit(): void {
    this.modalRef?.hide();
  }
  //#endregion

  //#region  delete
  delete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-sm modal-dialog-centered' })
    );
  }

  confirmDelete(id: number | undefined): void {
    this.usersService.delete(id).subscribe(
      (res) => {
        this.alertify.success('Successfully deleted');
      },
      (err) => {
        this.alertify.error(err.error.error);
      }
    );
    this.modalRef?.hide();
  }

  declineDelete(): void {
    this.modalRef?.hide();
  }
  //#endregion

  ngOnInit() {
    this.initialFormAdd();
    this.initialFormEdit();
    this.getPage(this.pageInitial);
  }
}
