import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookProvider } from '../../providers/book/book';

/**
 * Generated class for the ShelfbooksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-shelfbooks",
  templateUrl: "shelfbooks.html"
})
export class ShelfbooksPage {
  id: string;
  books;
  filteredBooks;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bookProvider: BookProvider
  ) {}

  ionViewWillEnter() {
    this.id = this.navParams.get("id");
    this.bookProvider
      .getShelfBooks(this.id)
      .subscribe(books => (this.filteredBooks = this.books = books));
  }

  filterBooks(query: string, filterBy) {

    if (query !== "") {
      console.log('here')
      this.filteredBooks = this.books.filter((book) => {
        return book.title.toLowerCase().includes(query.toLocaleLowerCase());
      })

    } else {
      this.filteredBooks = this.books;
    }
  }
}
