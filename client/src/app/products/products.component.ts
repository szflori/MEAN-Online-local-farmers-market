import { Component, OnInit } from '@angular/core';

interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery = '';
  selectedCategory = 'all';
  sortOption = 'name';

  categories = ['all', 'Gyümölcs', 'Méz', 'Lekvár'];

  ngOnInit(): void {
    this.products = [
      {
        id: '1',
        name: 'Bio Alma',
        description: 'Friss, ropogós alma helyi termelőtől.',
        price: 250,
        stock: 15,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Gyümölcs',
      },
      {
        id: '2',
        name: 'Házi Méz',
        description: 'Természetes méz a méhészetből.',
        price: 1800,
        stock: 8,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Méz',
      },
      {
        id: '3',
        name: 'Kézműves Lekvár',
        description: 'Saját készítésű gyümölcslekvár.',
        price: 950,
        stock: 20,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Lekvár',
      },
    ];

    this.filterProducts();
  }

  filterProducts(): void {
    this.filteredProducts = this.products
      .filter(
        (p) =>
          (this.selectedCategory === 'all' ||
            p.category === this.selectedCategory) &&
          p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        switch (this.sortOption) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'price':
            return a.price - b.price;
          case 'stock':
            return b.stock - a.stock;
          default:
            return 0;
        }
      });
  }
}
