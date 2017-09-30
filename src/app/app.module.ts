import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginformComponent } from './components/loginform/loginform.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import {UserService} from './services/user.service';
import {AuthenticationGuard} from './services/authentication.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UserComponent } from './components/user/user.component';
import { UserdetailComponent } from './components/userdetail/userdetail.component';
import { TabpaneComponent } from './components/tabpane/tabpane.component';
import { HomeComponent } from './components/home/home.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { StaticsComponent } from './components/statics/statics.component';
import { InvoicedetailComponent } from './components/invoicedetail/invoicedetail.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, children: [
    {path: 'invoice', component: InvoiceComponent},
    {path: 'invoice/:no', component: InvoicedetailComponent},
    {path: 'statics', component: StaticsComponent},
    {path: 'supplier', component: SupplierComponent},
    {path: 'user', component: UserComponent},
    {path: 'user/:id', component: UserdetailComponent}
  ]},
  {path: 'login', component: LoginformComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    HeaderComponent,
    FooterComponent,
    NotfoundComponent,
    UserComponent,
    UserdetailComponent,
    TabpaneComponent,
    HomeComponent,
    InvoiceComponent,
    SupplierComponent,
    StaticsComponent,
    InvoicedetailComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule
  ],
  providers: [UserService, AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
