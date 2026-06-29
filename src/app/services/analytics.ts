import { Injectable, inject } from '@angular/core';

import {
  Functions,
  httpsCallable
} from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private functions =
    inject(Functions);

  async getAnalytics() {

    const callable =
      httpsCallable(
        this.functions,
        'getAnalytics'
      );

    const result =
      await callable({});

    return result.data as any;
  }
}