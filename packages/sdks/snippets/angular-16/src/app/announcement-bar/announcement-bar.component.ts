/**
 * https://www.builder.io/c/docs/integrate-section-building
 * https://www.builder.io/c/blueprints/announcement-bar
 * src/app/announcement-bar/announcement-bar.component.ts
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Content,
  fetchOneEntry,
  type BuilderContent,
} from '@builder.io/sdk-angular';

@Component({
  selector: 'app-announcement-bar',
  standalone: true,
  imports: [CommonModule, Content],
  template: `
    <ng-container *ngIf="content">
      <builder-content
        [model]="model"
        [content]="content"
        [apiKey]="apiKey"
      ></builder-content>
    </ng-container>

    <!-- Your content coming from your app (or also Builder) -->
    <div>The rest of your page goes here</div>
  `,
})
export class AnnouncementBarComponent {
  apiKey = 'ee9f13b4981e489a9a1209887695ef2b';
  model = 'announcement-bar';
  content: BuilderContent | null = null;

  async ngOnInit() {
    const urlPath = window.location.pathname || '';

    const content = await fetchOneEntry({
      apiKey: this.apiKey,
      model: this.model,
      userAttributes: {
        urlPath,
      },
    });

    if (!content) {
      return;
    }

    this.content = content;
  }
}