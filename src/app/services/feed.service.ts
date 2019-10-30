
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as xml2js from 'xml2js';

import { Feed, Rss, FeedInfo } from '../api/feed';

@Injectable()
export class FeedService {

  constructor(private http: HttpClient) { }


  getFeeds() {
    return [{id: 1, name: 'ESPN', url: 'https://www.espn.com/espn/rss/nba/news', subscribed: true},
    {id: 2, name: 'Gizmodo', url: 'https://cors-anywhere.herokuapp.com/https://gizmodo.com/rss',  subscribed: false},
    {id: 3, name: 'EnGadget', url: 'https://cors-anywhere.herokuapp.com/https://feeds.newscientist.com/',  subscribed: true}];
  }

  getFeedContent(url: string): Observable<Feed> {
    return this.http.get(url, {responseType: 'text'}).pipe(
      map(this.extractFeeds));
  }

/**
 * Converts the feed response to json
 *
 * @private
 * @param {any} response
 * @returns {Feed}
 * @memberof FeedService
 */
private extractFeeds(response: any): Feed {
    const parser = new xml2js.Parser({explicitArray : false, mergeAttrs : true});
    let feed: any;
    parser.parseString(response, function(err: any, result: any) {
      if (err) {
        console.warn(err);
      }
      feed = result;
    });

    return feed || { };
  }

}
