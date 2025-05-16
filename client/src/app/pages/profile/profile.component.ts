import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  location?: string;
  bio?: string;
}

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();
  user: any = null;

  profileForm!: FormGroup;
  editing = false;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });
    this.auth.checkSession();

    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      avatarUrl: [this.user.avatarUrl ?? ''],
      address: [this.user.address ?? ''],
      phone: [this.user.phone ?? ''],
      bio: [this.user.bio ?? ''],
    });
  }

  toggleEdit(): void {
    this.editing = !this.editing;
  }

  async save() {
    if (this.profileForm.valid) {
      const updatedProfile = this.profileForm.value;
      await this.auth.updateProfile(updatedProfile);
      this.toggleEdit();
    }
  }
}
