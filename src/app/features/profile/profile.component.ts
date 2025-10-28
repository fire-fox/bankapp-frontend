import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile">
      <h2>My Profile</h2>

      <div class="profile-content">
        <div class="profile-card">
          <h3>Personal Information</h3>
          <div class="info-row">
            <span class="label">Full Name:</span>
            <span class="value">John Doe</span>
          </div>
          <div class="info-row">
            <span class="label">Email:</span>
            <span class="value">john.doe@bankapp.com</span>
          </div>
          <div class="info-row">
            <span class="label">Phone:</span>
            <span class="value">+1 (555) 123-4567</span>
          </div>
          <div class="info-row">
            <span class="label">Address:</span>
            <span class="value">123 Main St, New York, NY 10001</span>
          </div>
          <button class="btn btn-primary mt-3">Edit Profile</button>
        </div>

        <div class="profile-card">
          <h3>Security Settings</h3>
          <div class="security-item">
            <div>
              <strong>Two-Factor Authentication</strong>
              <p>Add an extra layer of security to your account</p>
            </div>
            <button class="btn btn-success">Enable</button>
          </div>
          <div class="security-item">
            <div>
              <strong>Password</strong>
              <p>Last changed 30 days ago</p>
            </div>
            <button class="btn btn-primary">Change</button>
          </div>
          <div class="security-item">
            <div>
              <strong>Login History</strong>
              <p>View recent account activity</p>
            </div>
            <button class="btn btn-primary">View</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile {
      padding: 2rem 0;
    }

    h2 {
      margin-bottom: 2rem;
    }

    .profile-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    .profile-card {
      background: var(--white);
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .profile-card h3 {
      margin-bottom: 1.5rem;
      color: var(--dark-color);
      border-bottom: 2px solid var(--primary-color);
      padding-bottom: 0.5rem;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--gray-200);
    }

    .info-row .label {
      font-weight: 500;
      color: var(--gray-600);
    }

    .info-row .value {
      color: var(--dark-color);
    }

    .security-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border: 1px solid var(--gray-200);
      border-radius: 0.25rem;
      margin-bottom: 1rem;
    }

    .security-item strong {
      display: block;
      margin-bottom: 0.25rem;
      color: var(--dark-color);
    }

    .security-item p {
      margin: 0;
      font-size: 0.875rem;
      color: var(--gray-600);
    }
  `]
})
export class ProfileComponent {}
