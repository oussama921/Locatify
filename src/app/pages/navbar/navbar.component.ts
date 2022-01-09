import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import {  Subscription } from 'rxjs';
import { MenuPathElement } from 'src/app/models/navbar.model';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'navbar',

  styleUrls: ['navbar.component.scss','navbar.mobile.component.scss'],
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('notifSidenav') notifSideNav: MatSidenav;

  isXSmall : boolean;
  mobileQuery: MediaQueryList;
  homePageActive = true;
  isMenuOpened = false;
  isMenuLocked = false;
  logoImgSrc = 'assets/images/planProLogo3.webp';
  state = 'closed';
  locked = true;
  routerSubActive: Subscription;
  menuContent: MenuPathElement[];
  currentRoute = '';
  notSeenCounter = 0;
  isModuleLoading: boolean;


  constructor(
    private router: Router,
    private sidenavService: SidenavService,
    private breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit() {
    this.checkRouterForModuleLoaded();
    this.reloadMenu();

    this.routerSubActive = this.router.events.subscribe(() => {
      this.reloadMenu();
    });

    this.currentRoute = this.router.url;

    
    this.breakpointObserver.observe(Breakpoints.XSmall).subscribe(res=>{
      this.isXSmall = res.matches;
    })
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
        icon: 'home',
        selected: !!this.currentRoute.match('/home') || false,
      },
      {
        name: 'Add User',
        path: 'add-user',
        icon: 'add_circle_outline',
        selected: !!this.currentRoute.match('/add-user') || false,
      },
      {
        name: 'Users',
        path: 'users',
        icon: 'layers',
        selected: !!this.currentRoute.match('/users') || false,
      },
      {
        name: 'Phone Menu',
        path: 'phone',
        icon: 'phone_iphone',
        selected: !!this.currentRoute.match('/phone') || false,
      },
      {
        name: 'Game Center',
        path: 'game-center',
        icon: 'videogame_asset',
        selected: !!this.currentRoute.match('/game-center') || false,
      },
      {
        name: 'Audio',
        path: 'audio',
        icon: 'headset_mic',
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
