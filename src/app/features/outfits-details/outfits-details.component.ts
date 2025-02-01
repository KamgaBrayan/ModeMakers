import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {CommentSectionComponent} from "../../shared/components/comment-section/comment-section.component";
import {OneCommentCardComponent} from "../../shared/components/one-comment-card/one-comment-card.component";
import {SameOutfitsSectionComponent} from "../../shared/components/same-outfits-section/same-outfits-section.component";
import {
    OutfitsDetailsSectionComponent
} from "../../shared/components/outfits-details-section/outfits-details-section.component";
import {ImageViewSectionComponent} from "../../shared/components/image-view-section/image-view-section.component";

@Component({
  selector: 'app-outfits-details',
  standalone:true,
  imports: [
    CommonModule,
    CommentSectionComponent,
    OneCommentCardComponent,
    SameOutfitsSectionComponent,
    OutfitsDetailsSectionComponent,
    ImageViewSectionComponent

  ],
  templateUrl: './outfits-details.component.html',
  styleUrl: './outfits-details.component.css'
})
export class OutfitsDetailsComponent {

}
