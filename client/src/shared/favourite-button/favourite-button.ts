import { Component, input, output, signal } from '@angular/core';
import { Photo } from '../../types/members';

@Component({
  selector: 'app-favourite-button',
  imports: [],
  templateUrl: './favourite-button.html',
  styleUrl: './favourite-button.css'
})
export class FavouriteButton {
  click = output<Event>();
  //protected photo = signal<Photo | null>(null);
  disabled = input<Boolean>();
  selected = input<Boolean>();
  
  onClick(event: Event) {
    this.click.emit(event);
  }
}
