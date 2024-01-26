import { Component, inject } from '@angular/core';
import { JwtService } from './services/jwt-service/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Lab1';

}
