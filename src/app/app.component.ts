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

  constructor(
    private feedService: FeedService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    // this.getGeo();
    this.getGeo2();

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
          // console.log('feed: ' , feed);
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
      this.getGeo2();
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
          // console.log('feed: ' , feed);
          this.title = feed.rss.channel.description;
          this.feeds = feed.rss.channel.item;
        },
        error => console.log(error));

    this.AllFeeds = false;

  }


  openLinkInBrowser(feed: { link: string; }) {
    window.open(feed.link);
  }



  getGeo2() {

    console.log('AQUI', this.myFeeds);
    this.myFeeds = [];
    this.feedService.GetWagerType2()
      .subscribe(response => {
        console.log('aquiiii');

        this.myFeeds = response;
        console.log('AQUI', this.myFeeds);

      },
        error => {
          this.errorMessage = error as any;
          console.log('errrrrror', error);

        });
  }


  DoSubscribeUnSubscribe(FeedId) {

    this.feedService.DoSubscribeUnSubscribe(FeedId)
    .subscribe(response => {

      this.DoSubscribeUnSubscribeResult = response;
      console.log('AQUI', this.DoSubscribeUnSubscribeResult);
      this.getGeo2();


    },
      error => {
        this.errorMessage = error as any;
        console.log('errrrrror', error);

      });


  }

}
