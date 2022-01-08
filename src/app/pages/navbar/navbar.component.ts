import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MenuPathElement } from 'src/app/models/navbar.model';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'navbar',

  styleUrls: ['navbar.component.scss'],
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('notifSidenav') notifSideNav: MatSidenav;

  mobileQuery: MediaQueryList;
  homePageActive = true;
  isMenuOpened = true;
  isMenuLocked = true;
  logoImgSrc = 'assets/images/planProLogo3.webp';
  state = 'closed';
  locked = true;
  routerSubActive: Subscription;
  menuContent: MenuPathElement[];
  currentRoute = '';
  notSeenCounter = 0;
  isModuleLoading: boolean;

  private mobileQueryListener: () => void;


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router,
    private sidenavService: SidenavService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.checkRouterForModuleLoaded();
    this.reloadMenu();

    this.routerSubActive = this.router.events.subscribe(() => {
      this.reloadMenu();
    });

    this.currentRoute = this.router.url;
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngAfterViewInit() {
  }

  checkRouterForModuleLoaded() {
    this.router.events.subscribe((e) => {
      if (e instanceof RouteConfigLoadStart) {
        this.isModuleLoading = true;
      }
      if (e instanceof RouteConfigLoadEnd) {
        this.isModuleLoading = false;
      }
    });
  }

  reloadMenu() {
    this.currentRoute = this.router.url;

    this.menuContent = [
      {
        name: 'Home',
        path: 'home',
        icon: 'bubble_chart',
        selected: !!this.currentRoute.match('/home') || false,
      },
      {
        name: 'Add User',
        path: 'add-user',
        icon: 'category',
        selected: !!this.currentRoute.match('/add-user') || false,
      },
      {
        name: 'Users',
        path: 'users',
        icon: 'assignment',
        selected: !!this.currentRoute.match('/users') || false,
      },
      {
        name: 'Phone Menu',
        path: 'phone',
        icon: 'supervisor_account',
        selected: !!this.currentRoute.match('/phone') || false,
      },
      {
        name: 'Game Center',
        path: 'game-center',
        icon: 'check_circle',
        selected: !!this.currentRoute.match('/game-center') || false,
      },
      {
        name: 'Audio',
        path: 'audio',
        icon: 'folder',
        selected: !!this.currentRoute.match('/audio') || false,
      },
      
      {
        name: 'Help',
        path: 'help',
        icon: 'manage_accounts',
        selected: !!this.currentRoute.match('/help') || false,
      },
    ];
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);

    if (this.routerSubActive) {
      this.routerSubActive.unsubscribe();
    }
  }

  nagigateToProfilePage() {
    this.router.navigate(['profil']);
  }

  goToParam() {
    this.router.navigate(['parametre']);
  }

  click() {
    this.router.navigate(['auth']);
  }

  resetMenu(path) {
    if (path !== 'home')
      this.homePageActive = false;

    this.router.navigate([path]);
    this.menuContent.forEach((menu) => {
      if (menu.path === path) {
        menu.selected = true;
      }
    });
    this.sidenavService.menuSelector.next(false);
  }

  logout() {
  }

  open() {
    if(!this.isMenuLocked){
      this.isMenuOpened = true;
    }
  }

  close() {
    if(!this.isMenuLocked){
      this.isMenuOpened = false;
    }
  }
  
}
