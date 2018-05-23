import { ListComponent } from './list/list.component';
import { LoginComponent } from "./login/login.component";

export const routes = [
  { path: "", component: LoginComponent },
  { path: "list", component: ListComponent}
];

export const navigatableComponents = [
  LoginComponent,
  ListComponent
];