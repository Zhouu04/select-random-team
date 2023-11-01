import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sidebar1',
  templateUrl: './sidebar1.component.html',
  styleUrls: ['./sidebar1.component.css']
})
export class Sidebar1Component {
    @Input() sidenavStatus: boolean = false;
}
