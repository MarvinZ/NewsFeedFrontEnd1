
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


import * as xml2js from 'xml2js';

import { Feed } from '../api/feed';

@Injectable()
export class FeedService {

  constructor(private http: HttpClient) { }



  getFeedContent(url: string): Observable<Feed> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(this.extractFeeds));
  }



  private extractFeeds(response: any): Feed {
    const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
    let feed: any;
    // tslint:disable-next-line:only-arrow-functions
    parser.parseString(response, function(err: any, result: any) {
      if (err) {
        console.warn(err);
      }
      feed = result;
    });

    return feed || {};
  }


  handleError(algo) {
    console.log('alooo', algo);
  }

  GetWagerType(): Observable<any> {

    console.log('AQUI');


    const url = 'http://localhost:63100/api/Quizzes/GetAllFeeds';

    return this.http.get(url).pipe(
      map((response: Response) => response)

    );
  }


  GetWagerType2(): Observable<any> {

    const url = 'http://localhost:63100/api/Quizzes/GetMyFeeds';
    const myBody = {
      UserId: 'dsfsfsdfsdf'
    };

    return this.http.post(url, myBody).pipe(
      map((response: Response) => response)

    );
  }

  DoSubscribeUnSubscribe(feedId): Observable<any> {
    const url = 'http://localhost:63100/api/Quizzes/SubscribeUnsubscribe';
    const myBody = {
      UserId: 'dsfsfsdfsdf',
      FeedId: feedId
    };

    return this.http.post(url, myBody).pipe(
      map((response: Response) => response)
    );
  }




}
