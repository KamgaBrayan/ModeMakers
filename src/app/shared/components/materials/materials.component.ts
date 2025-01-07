import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Material } from '../../models/material.interface';

interface ReduceMaterial{
    name: string; 
    photo: string;
    price_per_square_meter: number 
  }

@Component({
  selector: 'app-materials',
  imports: [CommonModule, FormsModule],
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {
  @Input() materials: Material[] = [];
  @Output() selectedMaterialsChange = new EventEmitter<ReduceMaterial[]>();

  currentImageIndex: number[] = [];
  selectedMaterials: ReduceMaterial[] = [];
  materialName: string = '';
  uploadedImage: string | null = null; // Contient l'image sélectionnée en base64
  
  ngOnInit(): void {
    this.currentImageIndex = this.materials.map(() => 0);
    this.currentImageIndex =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
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

  selectMaterial(material: Material): void {
    const photo = material.photos[this.currentImageIndex[this.materials.indexOf(material)]];
    if (!this.selectedMaterials.find((item) => item.name === material.name)) {
      this.selectedMaterials.push({ name: material.name, photo, price_per_square_meter: material.price_per_square_meter });
    }
  }

  // Gérer le drop de fichiers
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.processFile(file);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFile(input.files[0]);
    }
  }

  private processFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.uploadedImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  addMaterial(): void {
    if (this.materialName && this.uploadedImage) {
      this.selectedMaterials.push({
        name: this.materialName +' (By Custumer)',
        photo: this.uploadedImage,
        price_per_square_meter: 0, // Peut être remplacé par une valeur réelle
      });
      this.materialName = '';
      this.uploadedImage = null; // Réinitialise le champ de téléchargement
    }
  }
  
  isSelected(material: Material): boolean {
    // Vérifier si le matériau est dans la liste des matériaux sélectionnés
    return this.selectedMaterials.some(selected => selected.name === material.name);
  }

deselectMaterial(material: ReduceMaterial): void {
  const index = this.selectedMaterials.findIndex(item => item.name === material.name);
  if (index !== -1) {
    this.selectedMaterials.splice(index, 1); // Retirer le matériau de la liste
    this.selectedMaterialsChange.emit(this.selectedMaterials)
  }
}

  
}
