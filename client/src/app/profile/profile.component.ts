import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  location?: string;
  bio?: string;
}

// TODO
@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  editing = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const profile: UserProfile = {
      id: 'u1',
      name: 'Teszt Felhasználó',
      email: 'teszt@example.com',
      avatarUrl: 'https://via.placeholder.com/100',
      location: 'Budapest',
      bio: 'Egy lelkes helyi termelő, aki kézműves ételeket árul a közösségnek.',
    };

    this.profileForm = this.fb.group({
      name: [profile.name, Validators.required],
      email: [profile.email, [Validators.required, Validators.email]],
      location: [profile.location],
      bio: [profile.bio],
    });
  }

  toggleEdit(): void {
    this.editing = !this.editing;
  }

  save(): void {
    if (this.profileForm.valid) {
      const updatedProfile = this.profileForm.value;
      console.log('Mentett profil:', updatedProfile);
      this.toggleEdit();
    }
  }
}
