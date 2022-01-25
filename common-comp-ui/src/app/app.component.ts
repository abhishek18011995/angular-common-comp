import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Component, OnInit } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'common-comp-ui';
  apiResp: any;
  isStable = false;

  constructor(
    private http: HttpClient,
    appRef: ApplicationRef,
    swUpdate: SwUpdate
  ) {
    console.log('----Environment---- ', environment);
    console.log('sw initiated v9');

    if (swUpdate.isEnabled) {
      const appIsStable$ = appRef.isStable.pipe(
        first((isStable) => isStable === true)
      );
      const everySixHours$ = interval(1 * 60 * 1000);
      const everySixHoursOnceAppIsStable$ = concat(
        appIsStable$,
        everySixHours$
      );

      everySixHoursOnceAppIsStable$.subscribe(() => {
        console.log('interval started');
        swUpdate
          .checkForUpdate()
          .then((resp) => console.log('check for update --> ', resp))
          .catch((err) => console.log(err));
      });

      //Use these events to notify the user of a pending update or to refresh their pages when the code they are running is out of date.
      // Emits a VersionReadyEvent event whenever a new version has been downloaded and is ready for activation
      const updatesAvailable = swUpdate.versionUpdates
        .pipe(
          filter(
            (evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'
          ),
          map((evt) => ({
            type: 'UPDATE_AVAILABLE',
            current: evt.currentVersion,
            available: evt.latestVersion,
          }))
        )
        .subscribe((resp) => {
          console.log(resp);

          // Updates the current client (i.e. browser tab) to the latest version that is ready for activation.
          swUpdate.activateUpdate().then((resp) => {
            if (confirm('New version available. Load New Version?')) {
              console.log('new version updated: ', resp);
              window.location.reload();
            }
          });
        });

      swUpdate.unrecoverable.subscribe((event) => {
        console.log(
          `An error occurred that we cannot recover from:\n' ${event.reason} '\n\nPlease reload the page.`
        );
        // notifyUser(
        //   'An error occurred that we cannot recover from:\n' +
        //   event.reason +
        //   '\n\nPlease reload the page.'
        // );
      });
    }
  }

  ngOnInit() {
    this.getStateAlert();
  }

  getStateAlert(stateName: string = 'DC') {
    const state = 'AL';
    console.log(stateName);
    const url = `https://api.weather.gov/alerts/active?area=${stateName}`;
    this.http.get(url).subscribe((resp) => {
      this.apiResp = resp;
      // console.log(resp);
    });
  }
}
