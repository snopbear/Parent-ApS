import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/shared/serivces/basic/storage/storage.service';

@Component({
  selector: 'parent-aps-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(public storage: StorageService) {}
  ngOnInit() {}
}
