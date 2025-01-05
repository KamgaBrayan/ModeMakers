import { Component, Input, OnInit } from '@angular/core';
import { Material } from '../garment.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-materials',
  imports: [CommonModule],
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {
  @Input() materials: Material[] = [];
  // @Input() materialsnumber: number;
  currentImageIndex: number[] = []; // Pour stocker l'index d'image actuel pour chaque matériau

  ngOnInit(): void {
    this.currentImageIndex = [0, 0, 0, 0, 0];
    // Initialisez les index d'image uniquement après que les matériaux ont été assignés
    // this.currentImageIndex = this.materials.map(() => 0);
  }

  nextMaterial(index: number): void {
    this.currentImageIndex[index] = 
      (this.currentImageIndex[index] + 1) % this.materials[index].photos.length;
  }

  previousMaterial(index: number): void {
    this.currentImageIndex[index] = 
      (this.currentImageIndex[index] - 1 + this.materials[index].photos.length) % this.materials[index].photos.length;
  }

  setImage(index: number, imageIndex: number): void {
    this.currentImageIndex[index] = imageIndex;
  }
}
