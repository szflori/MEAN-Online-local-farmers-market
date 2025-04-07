import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  farmerId: string;
}

@Component({
  selector: 'app-farmer-products',
  standalone: false,
  templateUrl: './farmer-products.component.html',
  styleUrl: './farmer-products.component.scss',
})
export class FarmerProductsComponent implements OnInit {
  farmerId!: string;
  farmerName = '';
  products: Product[] = [];

  ngOnInit(): void {
    this.farmerId = this.route.snapshot.paramMap.get('id') || '';

    // Dummy farmer name for demonstration (normally this would be fetched by ID)
    this.farmerName = this.getFarmerName(this.farmerId);

    // Mock data
    const allProducts: Product[] = [
      {
        id: '1',
        name: 'Bio Alma',
        description: 'Friss alma helyi farmról.',
        price: 250,
        stock: 10,
        imageUrl: 'https://via.placeholder.com/150',
        farmerId: 'f1',
      },
      {
        id: '2',
        name: 'Házi Méz',
        description: 'Méz Nagy Évától.',
        price: 1800,
        stock: 5,
        imageUrl: 'https://via.placeholder.com/150',
        farmerId: 'f2',
      },
      {
        id: '3',
        name: 'Lekvár',
        description: 'Eperlekvár Szabó Bélától.',
        price: 950,
        stock: 12,
        imageUrl: 'https://via.placeholder.com/150',
        farmerId: 'f3',
      },
    ];

    this.products = allProducts.filter((p) => p.farmerId === this.farmerId);
  }

  constructor(private route: ActivatedRoute) {}

  getFarmerName(id: string): string {
    const names: Record<string, string> = {
      f1: 'Kiss János',
      f2: 'Nagy Éva',
      f3: 'Szabó Béla',
    };
    return names[id] || 'Ismeretlen termelő';
  }
}
