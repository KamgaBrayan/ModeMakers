import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  location: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-about',
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})

export class AboutComponent implements OnInit {
  teamMembers: TeamMember[] = [
    {
      name: 'Name Surname',
      location: 'Location',
      description: 'Lorem ipsum dolor sit amet consectetur. Quam libero viverra faucibus condimentum.',
      image: 'assets/images/stylist/stylist_1.jpg'
    },
    {
      name: 'Name Surname',
      location: 'Location',
      description: 'Lorem ipsum dolor sit amet consectetur. Quam libero viverra faucibus condimentum.',
      image: 'assets/images/stylist/stylist_1.jpg'
    },
    {
      name: 'Name Surname',
      location: 'Location',
      description: 'Lorem ipsum dolor sit amet consectetur. Quam libero viverra faucibus condimentum.',
      image: 'assets/images/stylist/stylist_1.jpg'
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}
