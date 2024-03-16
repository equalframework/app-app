import { Component, OnInit, NgZone  } from '@angular/core';
import { ContextService } from 'sb-shared-lib';
import { ActivatedRoute} from '@angular/router';
import { AppStateService } from 'src/app/_services/AppStateService';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit  {

    public ready: boolean = false;
    public active: boolean = false;

    public package: string = '';
    public app: string = '';

    constructor(
        private route: ActivatedRoute,
        private context: ContextService,
        private params: AppStateService
    ) {}

    public ngOnInit() {
        this.context.ready.subscribe( (ready:boolean) => {
                this.ready = ready;
            });

        // extract package and app from URL and relay to the AppStateService
        this.route.params.subscribe(async params => {
                if(params.hasOwnProperty('package')) {
                    this.package = params.package;
                }
                if(params.hasOwnProperty('app')) {
                    this.app = params.app;
                }
                this.params.updateParamState({package: this.package, app: this.app});
            });


        // #todo - if no context or all contexts have been closed, re-open default context (wait for route init)
        /*
        this.context.getObservable().subscribe( () => {
            console.log('AppComponent.context - received context change');
            this.context.setTarget('#sb-container');
            // #memo - we don't trust the descriptor from the observable because it might have changed (if there was both a route and a context change)
            const descriptor: any = this.context.getDescriptor();
            if(descriptor.hasOwnProperty('context') && !Object.keys(descriptor.context).length) {
                console.log('AppComponent.context - empty context : reload default');
                this.ready = false;
                this.context.change(this.getDescriptor());
            }
        });
        */
    }

    public ngAfterViewInit() {
        console.log('AppComponent::ngAfterViewInit');

        // this.context.change(this.getDescriptor());
        this.active = true;
    }

}