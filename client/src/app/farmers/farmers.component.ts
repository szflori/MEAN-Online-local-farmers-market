import { Component, OnInit } from '@angular/core';

interface Farmer {
  id: string;
  name: string;
  location?: string;
  bio?: string;
  avatarUrl?: string;
}

@Component({
  selector: 'app-farmers',
  standalone: false,
  templateUrl: './farmers.component.html',
  styleUrl: './farmers.component.scss',
})
export class FarmersComponent  implements OnInit {
  farmers: Farmer[] = [];

  ngOnInit(): void {
    this.farmers = [
      {
        id: 'f1',
        name: 'Kiss János',
        location: 'Pest megye',
        bio: 'Családi gazdaság bio zöldségekkel és gyümölcsökkel.',
        avatarUrl: 'https://via.placeholder.com/100'
      },
      {
        id: 'f2',
        name: 'Nagy Éva',
        location: 'Bács-Kiskun',
        bio: 'Méz és méhészeti termékek termelője.',
        avatarUrl: 'https://via.placeholder.com/100'
      },
      {
        id: 'f3',
        name: 'Szabó Béla',
        location: 'Heves megye',
        bio: 'Kézműves lekvárok és befőttek készítője.',
        avatarUrl: 'https://via.placeholder.com/100'
      }
    ];
  }
}