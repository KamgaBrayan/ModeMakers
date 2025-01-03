// product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { CommonModule } from '@angular/common';

interface Material {
  name: string;
  colors: string[];
  image: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  materials: Material[];
  images: string[];
  reviews: Review[];
  storeNumber: string;
  gender: string;
  age: string;
  size: string;
  color: string;
  measurementRequest: boolean;
  location: string;
  publishedDate: string;
  additionalInformation: string;
}

interface Review {
  id: number;
  userName: string;
  userTitle: string;
  rating: number;
  comment: string;
  date: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  imports: [NavbarComponent, FooterComponent, CommonModule]
})
export class TestComponent implements OnInit {
  product!: Product;
  currentWeek: string[] = ['LUN.', 'MAR.', 'MER.', 'JEU.', 'VEN.', 'SAM.', 'DIM.'];
  selectedMaterial: number = 0;

  ngOnInit() {
    // Mock data initialization
    this.product = {
      id: 1,
      name: "A-shaped gown",
      price: 25000,
      storeNumber: "5fhp90",
      gender: "Female",
      age: "Ranges",
      size: "Medium adult",
      color: "Brown and yellow",
      measurementRequest: true,
      location: "Nation wide",
      publishedDate: "16/11/2022",
      additionalInformation: "Lorem ipsum dolor sit amet consectetur. Auctor enim semper egestas felis metus volutpat cursus tortor. Sit.",
      description: "Beautiful dress",
      materials: [
        { name: "Tissu", colors: ["#00796B", "#E65100", "#795548", "#000000"], image: "assets/images/products/dress4.jpg" },
        { name: "Dentelle", colors: ["#E91E63", "#2196F3", "#9C27B0", "#03A9F4"], image: "assets/images/products/dress3.jpg" },
        { name: "Décorations", colors: ["#FF4081", "#2196F3", "#4CAF50", "#03A9F4"], image: "assets/images/products/dress2.jpg" },
        { name: "Doublure", colors: ["#FFD700", "#76FF03", "#000000", "#FF0000"], image: "assets/images/products/dress1.jpg" }
      ],
      images: [
        "assets/images/products/dress1.jpg",
        "assets/images/products/dress2.jpg",
        "assets/images/products/dress3.jpg",
        "assets/images/products/dress4.jpg"
      ],
      reviews: [
        {
          id: 1,
          userName: "Alex Stanton",
          userTitle: "CEO at Bukalapak",
          rating: 4,
          comment: "We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
          date: "21 July 2022"
        },
        {
          id: 2,
          userName: "Alex Stanton",
          userTitle: "CEO at Bukalapak",
          rating: 5,
          comment: "We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
          date: "21 July 2022"
        }
      ]
    };
  }
  selectedImage: string = '';
  currentImageIndex: number = 0;

  getPlanningData() {
    const weeks = 4;
    const days = this.currentWeek.length;
    return Array(weeks).fill(null).map(() =>
      Array(days).fill(null).map((_, index) => index === days - 1 ? 'unavailable' : 'available')
    );
  }

  nextMaterial() {
    this.selectedMaterial = (this.selectedMaterial + 1) % this.product.materials.length;
  }

  previousMaterial() {
    this.selectedMaterial = this.selectedMaterial === 0 ?
      this.product.materials.length - 1 : this.selectedMaterial - 1;
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
    this.selectedImage = this.product.images[this.currentImageIndex];
  }

  previousImage() {
    this.currentImageIndex = this.currentImageIndex === 0 ?
      this.product.images.length - 1 : this.currentImageIndex - 1;
    this.selectedImage = this.product.images[this.currentImageIndex];
  }

  selectImage(image: string, index: number) {
    this.selectedImage = image;
    this.currentImageIndex = index;
  }
}
