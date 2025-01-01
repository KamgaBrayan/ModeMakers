import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommentSectionComponent } from 'app/shared/components/comment-section/comment-section.component';
import { ImageViewSectionComponent } from 'app/shared/components/image-view-section/image-view-section.component';
import { OneCommentCardComponent } from 'app/shared/components/one-comment-card/one-comment-card.component';
import { OutfitsDetailsSectionComponent } from 'app/shared/components/outfits-details-section/outfits-details-section.component';
import { SameOutfitsSectionComponent } from 'app/shared/components/same-outfits-section/same-outfits-section.component';

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
