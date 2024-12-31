import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-2">Profile</h1>
      <p class="text-gray-600 text-center mb-8">
        The Profile page is your digital hub, where you can fine-tune your experience.
      </p>

      <div class="flex flex-col md:flex-row gap-6">
        <!-- Left Column - Profile Card -->
        <div class="md:w-1/3">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="text-center">
              <div class="bg-blue-500 text-white py-2 px-4 rounded-t-lg -mx-6 -mt-6 mb-4">
                Welcome, {{profile.firstName}} {{profile.lastName}}
              </div>
              <div class="relative w-32 h-32 mx-auto mb-4">
                <img [src]="profile.avatar" class="rounded-full w-full h-full object-cover" [alt]="profile.firstName">
                <button class="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <h2 class="text-xl font-semibold">{{profile.firstName}} {{profile.lastName}}</h2>
              <p class="text-gray-600">{{profile.job}}</p>

              <div class="grid grid-cols-3 gap-4 mt-6">
                <div>
                  <div class="font-bold">{{profile.followers}}</div>
                  <div class="text-sm text-gray-600">Followers</div>
                </div>
                <div>
                  <div class="font-bold">{{profile.following}}</div>
                  <div class="text-sm text-gray-600">Following</div>
                </div>
                <div>
                  <div class="font-bold">{{profile.friends}}</div>
                  <div class="text-sm text-gray-600">Friends</div>
                </div>
              </div>

              <button class="w-full mt-6 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Follow
              </button>
            </div>

            <div class="mt-6">
              <h3 class="font-semibold mb-3">Social Accounts</h3>
              <div class="flex gap-2">
                <a href="#" class="p-2 bg-black text-white rounded hover:bg-gray-800">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
                <a href="#" class="p-2 bg-black text-white rounded hover:bg-gray-800">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" class="p-2 bg-black text-white rounded hover:bg-gray-800">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" class="p-2 bg-black text-white rounded hover:bg-gray-800">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Profile Info -->
        <div class="md:w-2/3">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="border-b pb-4 mb-4">
              <div class="flex gap-4">
                <button
                  *ngFor="let tab of tabs"
                  [class]="getTabClass(tab)"
                  (click)="activeTab = tab">
                  {{tab}}
                </button>
              </div>
            </div>

            <!-- Overview Tab -->
            <div *ngIf="activeTab === 'Overview'" class="space-y-6">
              <div>
                <h3 class="text-lg font-semibold mb-2">About</h3>
                <p class="text-gray-600" [class.hidden]="editingAbout">{{profile.about}}</p>
                <textarea
                  *ngIf="editingAbout"
                  [(ngModel)]="profile.about"
                  class="w-full p-2 border rounded-md"
                  rows="4"
                ></textarea>
                <button
                  class="text-blue-500 mt-2"
                  (click)="editingAbout = !editingAbout">
                  {{editingAbout ? 'Save' : 'Edit'}}
                </button>
              </div>
            </div>

            <!-- Profile Tab -->
            <div *ngIf="activeTab === 'Profile'" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div *ngFor="let field of profileFields" class="space-y-2">
                  <label [for]="field.key" class="block text-sm font-medium text-gray-700">
                    {{field.label}}
                  </label>
                  <input
                    [type]="field.type"
                    [id]="field.key"
                    class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                </div>
              </div>
              <button class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfilComponent {
  tabs = ['Overview', 'Profile', 'Emails', 'Password'];
  activeTab = 'Overview';
  editingAbout = false;

  profile = {
    firstName: 'Ethan',
    lastName: 'Leo',
    avatar: 'assets/profile-photo.jpg',
    job: 'Project Manager',
    company: 'GitHub Inc',
    followers: 7854,
    following: 5987,
    friends: 4620,
    about: 'Ethan Leo is a seasoned and results-driven Project Manager who brings experience and expertise to project management. With a proven track record of successfully delivering complex projects on time and within budget, Ethan Leo is the go-to professional for organizations seeking efficient and effective project leadership.',
    education: 'M.S Computer Science',
    address: 'Mountain View, California',
    country: 'United States',
    phone: '+1 (248) 679-8745'
  };

  profileFields = [
    { key: 'firstName', label: 'First Name', type: 'text' },
    { key: 'lastName', label: 'Last Name', type: 'text' },
    { key: 'job', label: 'Job', type: 'text' },
    { key: 'company', label: 'Company', type: 'text' },
    { key: 'education', label: 'Education', type: 'text' },
    { key: 'address', label: 'Address', type: 'text' },
    { key: 'country', label: 'Country', type: 'text' },
    { key: 'phone', label: 'Phone', type: 'tel' }
  ];

  getTabClass(tab: string): string {
    return `px-4 py-2 font-medium ${
      this.activeTab === tab
        ? 'text-blue-600 border-b-2 border-blue-600'
        : 'text-gray-600 hover:text-gray-900'
    }`;
  }
}
