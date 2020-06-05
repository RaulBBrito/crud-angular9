import { HeaderService } from './../../template/header/header.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  };


  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private headerService: HeaderService) { 
      headerService.headerData = {
        title: 'Exclusão de Produto',
        icon: 'storefront',
        routeUrl: '/products'
      } }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    })
  }

  deleteProduct(): void {
    this.productService.delete(this.product.id).subscribe(product => {
      this.productService.showMessage("Produto deletado com sucesso!");
      this.router.navigate(['/products']);
    })
  }

  cancelProduct(): void {
    this.router.navigate(['/products']);
  }

}
