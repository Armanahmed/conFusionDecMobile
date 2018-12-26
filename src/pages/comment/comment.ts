import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Comment } from '../../shared/comment';
import { Dish } from '../../shared/dish';

import { DishProvider } from '../../providers/dish/dish';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

	dishComment: FormGroup;
	dishCommentNew: Comment;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private formBuilder: FormBuilder, private dishservice: DishProvider ) {

  	this.dishComment = this.formBuilder.group({
  		author: ['', Validators.required],
  		rating: ['5', Validators.required],
  		comment: ['', Validators.required]
  	});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss() {
  	this.viewCtrl.dismiss();
  }

  onSubmit() {
  	console.log(this.dishComment.value);

  	this.dishCommentNew = this.dishComment.value;
  	this.dishCommentNew.date = new Date().toISOString();

  	console.log(this.dishCommentNew);

  	this.viewCtrl.dismiss(this.dishCommentNew);

  }

}
