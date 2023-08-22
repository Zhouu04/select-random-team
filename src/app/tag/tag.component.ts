import { Component, OnInit } from '@angular/core';
import { Tag } from '../share/tag';
import { TeamtagService } from '../teamtag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  tags:Tag[] = []
  constructor(private teamtagService: TeamtagService) {}
  ngOnInit(): void {
    this.tags = this.teamtagService.getAllTags()
  }
}
