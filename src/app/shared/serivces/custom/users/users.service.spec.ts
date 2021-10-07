/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { User } from 'src/app/shared/models/user/user';

describe('Service: Users', () => {
  let usersService: UsersService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [ UsersService ]
    });

    usersService = TestBed.get(UsersService);
    httpTestingController = TestBed.get(HttpTestingController);

  let testUsers:User[]= [
      {
          id: 13,
          email: "michael.lawson@reqres.in",
          first_name: "Michael",
          last_name: "Lawson",
          avatar: "https://reqres.in/img/faces/7-image.jpg"
      },
      {
        id: 14,
          email: "lindsay.ferguson@reqres.in",
          first_name: "Lindsay",
          last_name: "Ferguson",
          avatar: "https://reqres.in/img/faces/8-image.jpg"
      },
      {
          id: 15,
          email: "tobias.funke@reqres.in",
          first_name: "Tobias",
          last_name: "Funke",
          avatar: "https://reqres.in/img/faces/9-image.jpg"
      }
    ];

  });

  it('should GET all Users', inject([UsersService], (service: UsersService) => {
    // expect(service).toBeTruthy();
    service.getPages(1)
    .subscribe((data: User[]) => {
      expect(data.length).toBe(3);
    });
  let booksRequest: TestRequest = httpTestingController.expectOne('https://reqres.in/api/users?page=1');
  expect(booksRequest.request.method).toEqual('GET');

  booksRequest.flush(testUsers);
  
  }));
});
function testUsers(testUsers: any) {
  throw new Error('Function not implemented.');
}

