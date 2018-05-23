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

  productList: Product[] = [];
  public selectedIndex;
  public items: Array<string>;

  showTable = true;
  p = 1;
  maxTableValue = 1;

  constructor(private page: Page) {
    this.items = [];
    for (var i = 0; i < 5; i++) {
      this.items.push("data item " + i);
    }
  }

  ngOnInit() {

    this.productList.push({ name: "Apples" });
    this.productList.push({ name: "Bananas" });
    this.productList.push({ name: "Oranges" });
    this.productList.push({ name: "Manzanas" });
    this.productList.push({ name: "Platanos" });
    this.productList.push({ name: "Naranjas" });

    this.maxTableValue = Math.ceil(this.productList.length / 10);
  }

  public onchange(args: SelectedIndexChangedEventData) {
    console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
  }

  public onopen() {
    console.log("Drop Down opened.");
  }

  public onclose() {
    console.log("Drop Down closed.");
  }

  backTablePressed() {
    if (this.p > 1) {
      this.p--;
    }
  }

  nextTablePressed() {
    if (this.p < this.maxTableValue) {
      this.p++;
    }
  }

}
