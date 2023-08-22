import { Injectable } from '@angular/core';
import { Tag } from './share/tag';

@Injectable({
  providedIn: 'root'
})
export class TeamtagService {

  constructor() { }
  getAllTags():Tag[] {
    return [
      {name: 'All', count: 31},
      {name: 'Premier Leugue', count: 10},
      {name:'La Liga', count: 6},
      {name:'Bundesliga', count: 5}, 
      {name: 'Serie A', count: 5}, 
      {name:'Ligue 1', count:5}
    ]
  }
}
