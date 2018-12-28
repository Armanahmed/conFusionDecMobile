import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { Dish } from '../../shared/dish';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../comment/comment';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
	
	dish: Dish;
	errMess: string;
	avgstars: string;
	numcomments: number;
  favorite: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, @Inject('BaseURL') private BaseURL, private favoriteservice: FavoriteProvider, private toastCtrl: ToastController, private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController, private socialSharing: SocialSharing ) {

  	this.dish = navParams.get('dish');
    this.favorite = this.favoriteservice.isFavorite(this.dish.id);
  	this.numcomments = this.dish.comments.length;

  	let total = 0;
  	this.dish.comments.forEach(comment => total += comment.rating);
  	this.avgstars = (total/this.numcomments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as a favorite successfully',
      position: 'middle',
      duration: 3000
    }).present();
  }

  presentActionSheet() {
    console.log('Presenting Action Sheet');
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Actions',
        buttons: [
         {
           text: 'Add to Favorites',
           handler: () => {
            this.addToFavorites();
             console.log('Add to Favorites clicked');
           }
         },
         {
           text: 'Add Comment',
           handler: () => {
            console.log('Comment Page Presented');
            let commentModal = this.modalCtrl.create('CommentPage');

            commentModal.onDidDismiss(dishCommentNew => {
              console.log(dishCommentNew);
              if(dishCommentNew) {
                this.dish.comments.push(dishCommentNew);
              }
            });

            commentModal.present();
            
           }
         },
         {
          text: 'Share via Facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(
              this.dish.name + ' -- ' + this.dish.description,
              this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted t successfully to Facebook'))
              .catch(() => console.log('Failed to post to Facebook'));
          }
         },
         {
          text: 'Share via Twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(
              this.dish.name + ' -- ' + this.dish.description,
              this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted t successfully to Twitter'))
              .catch(() => console.log('Failed to post to Twitter'));
          }
         },
         {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

   actionSheet.present();
 }

}
