import { Routes } from '@angular/router';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';
import { NewsFeedMainSectionComponent } from './news-feed-main-section/news-feed-main-section.component';

export const newsRoutes: Routes = [
  {
    path: '',
    component: NewsFeedMainSectionComponent,
    children: [{ path: '', component: NewsFeedComponent }],
  },
];
