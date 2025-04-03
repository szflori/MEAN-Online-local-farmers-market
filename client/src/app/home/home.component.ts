import { Component, OnInit } from '@angular/core';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

interface Farmer {
  id: string;
  name: string;
  avatarUrl?: string;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  farmers: Farmer[] = [];

  ngOnInit(): void {
    this.farmers = [
      {
        id: 'f1',
        name: 'Kiss János',
        avatarUrl:
          'https://t3.ftcdn.net/jpg/03/80/27/88/360_F_380278806_hU362lmcYRqkb8reIageNj4Qh7ID9mIg.jpg',
      },
      {
        id: 'f2',
        name: 'Nagy Éva',
        avatarUrl:
          'https://www.eatright.org/-/media/images/eatright-articles/eatright-article-feature-images/knowyourfarmerknowtheirfarm_600x450.jpg?as=0&w=967&rev=87b68122e209433fa243128a9ab2d8f4&hash=86E6B83F431DB710119D2AA2A4C84FCF/64',
      },
      {
        id: 'f3',
        name: 'Szabó Béla',
        avatarUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDN-fh1rcxOC_UEre9IzKUKKolj_RZO6Q9Jg&s',
      },
      {
        id: 'f4',
        name: 'Tóth Anna',
        avatarUrl:
          'https://shalemag.com/wp-content/uploads/2020/02/AdobeStock_201468560.jpeg',
      },
    ];

    this.products = [
      {
        id: '1',
        name: 'Bio Alma',
        description: 'Helyi gazdától származó ropogós alma.',
        price: 250,
        stock: 15,
        imageUrl:
          'https://chefmarket.hu/public/upload/product_image/3/3958/27227/elo00817-zoldalma701516331.jpg',
      },
      {
        id: '2',
        name: 'Házi Méz',
        description: 'Természetes, vegyszermentes méz.',
        price: 1800,
        stock: 8,
        imageUrl:
          'https://termeloimagyarmez.hu/assets/images/tmm/termekek/vegyes-viragmez_540px.jpg',
      },
    ];
  }
}
