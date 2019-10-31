import { Component, OnInit, AfterViewInit, ElementRef, ViewEncapsulation } from '@angular/core';

import { delay } from 'rxjs/internal/operators';

import { FeedService } from './services/feed.service';
import { FeedEntry } from './api/feed-entry';
import { Feed } from './api/feed';
import { environment } from '../environments/environment';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ck-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
    '../assets/addtohomescreen.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
  feedLocation = environment.feedLocation + '?v=' + Math.random();  // prevent browser caching

  title: string;
  feeds: Array<FeedEntry> = [];
  AllFeeds = true;
  onlyMyFeeds = true;
  myFeeds: any; // Array<Feed> = [];
  testME: any;
  errorMessage: any;
  myFeeds2: any;
  DoSubscribeUnSubscribeResult: any;

  characters = [
    'Finn the human',
    'Jake the dog',
    'Princess bubblegum',
    'Lumpy Space Princess',
    'Beemo1',
    'Beemo2'
  ]

  

  constructor(
    private feedService: FeedService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.GetMyFeeds();

  }

  ngAfterViewInit() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = 'addToHomescreen();';
    this.elementRef.nativeElement.appendChild(script);
  }

  refreshFeed() {
    this.feeds.length = 0;

    this.feedService.getFeedContent(this.feedLocation).pipe(delay(500))
      .subscribe(
        feed => {
          this.title = feed.rss.channel.description;
          this.feeds = feed.rss.channel.item;
        },
        error => console.log(error));
  }

  ToggleMyFeedsView() {
    this.onlyMyFeeds = !this.onlyMyFeeds;
    if (!this.onlyMyFeeds) {
      this.myFeeds = this.myFeeds.filter(e => e.isSubscribed);
    } else {
      this.GetMyFeeds();
    }
  }

  Subscribe(feedId) {
    this.DoSubscribeUnSubscribe(feedId);
  }


  refreshFeedMF(myFeed) {
    this.feeds.length = 0;
    this.feedService.getFeedContent(myFeed).pipe(delay(500))
      .subscribe(
        feed => {
          this.title = feed.rss.channel.description;
          this.feeds = feed.rss.channel.item;
        },
        error => console.log(error));
    this.AllFeeds = false;

  }


  openLinkInBrowser(feed: { link: string; }) {
    window.open(feed.link);
  }


  GetMyFeeds() {
    this.myFeeds = [];
    this.feedService.GetMyFeeds()
      .subscribe(response => {
        this.myFeeds = response;
      },
        error => {
          this.errorMessage = error as any;
          console.log('errrrrror:', error);
        });
  }


  DoSubscribeUnSubscribe(FeedId) {
    this.feedService.DoSubscribeUnSubscribe(FeedId)
    .subscribe(response => {
      this.DoSubscribeUnSubscribeResult = response;
      this.GetMyFeeds();
    },
      error => {
        this.errorMessage = error as any;
        console.log('errrrrror', error);

      });


  }

}
