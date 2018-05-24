import { GetProductsService } from './../get-products.service';
import { Product } from '../models/product';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ListPicker } from "ui/list-picker";
import { Page } from "ui/page";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";

@Component({
  moduleId: module.id,
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products: Product[];
  productParameters: Product = {
    DE_CATE: '',
    DE_EQUI: '',
    DE_FAMI: ''
  };

  p = 1;
  tablePage = 1;
  maxTableValue = 1;

  categorySelected = false;
  brandSelected = false;
  familySelected = false;
  showProducts = false;

  categoryDistinctArray: string[];
  brandDistinctArray: string[];
  familyDistinctArray: string[];

  constructor(private page: Page, private productService: GetProductsService) {
    this.getCategoryDistinctValues();
  }

  ngOnInit() {
  }

   // This method is used to get all available category options.
  // It calls the product service getDistinctCategory() method.
  getCategoryDistinctValues() {
    this.productService.getDistinctCategory().subscribe(response => {
      this.categoryDistinctArray = response;
    });
  }

  // This method is called to get all the available brands from the category selected.
  // It calls the product service getDistinctBrand(selectedCategory) method.
  onCategorySelected(args: SelectedIndexChangedEventData) {
    this.productParameters.DE_CATE = this.categoryDistinctArray[args.newIndex]; 
    this.productService.getDistinctBrand(this.productParameters.DE_CATE).subscribe(response => {
      this.brandDistinctArray = response;
      this.categorySelected = true;
      this.productParameters.DE_EQUI = '';
      this.productParameters.DE_FAMI = '';
      this.brandSelected = false;
      this.familySelected = false;
      this.showProducts = false;
      this.products = null;
    });
  }

  // This method is called to get all the available families from the brand and category selected.
  // It calls the product service getDistinctFamily(selectedCategory, selectedBrand) method.
  onBrandSelected(args: SelectedIndexChangedEventData) {
    this.productParameters.DE_EQUI = this.brandDistinctArray[args.newIndex]; 
    this.productService.getDistinctFamily(this.productParameters.DE_CATE, this.productParameters.DE_EQUI).subscribe(response => {
      this.familyDistinctArray = response;
      this.brandSelected = true;
      this.productParameters.DE_FAMI = '';
      this.familySelected = false;
      this.showProducts = false;
      this.products = null;
    });
  }

  // This method is called to indicate that the family has being selected so the buttons can be shown.
  onFamilySelected(args: SelectedIndexChangedEventData) {
    this.productParameters.DE_FAMI = this.familyDistinctArray[args.newIndex]; 
    this.familySelected = true;
    this.products = null;
  }

  // This method is called to get all the available products from the category, brand and family selected.
  // It calls the product service getProducts(productParameters: Product) method.
  getSelectedProducts() {
    this.productService.getProducts(this.productParameters).subscribe(response => {
      this.products = response;
      this.showProducts = true;      
      this.maxTableValue = Math.ceil(this.products.length / 10);
    });
  }

  // This method is called to reset all the selected values and start again.
  onResetClicked() {
    this.categorySelected = false;
    this.brandSelected = false;
    this.familySelected = false;
    this.showProducts = false;
    this.productParameters.DE_CATE = '';
    this.productParameters.DE_EQUI = '';
    this.productParameters.DE_FAMI = '';
    this.products = null;
  }

  backTablePressed() {
    if (this.p > 1) {
      this.p--;
      this.tablePage--;
    }
  }

  nextTablePressed() {
    if (this.p < this.maxTableValue) {
      this.p++;
      this.tablePage++;
    }
  }

}
