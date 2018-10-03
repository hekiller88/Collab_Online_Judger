import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'observables';

  ngOnInit(){
  	//method 1
 	//  	console.log('setTimeout start execution');
	// setTimeout( ()=> { console.log('callback called'); }, 5000);
	// console.log('setTimeout end execution');

	//method 2
	// let promise = new Promise( (resolve, reject) => {
	// 	console.log('promise exec');
	// 	let x = 20;

	// 	setTimeout( () => {
	// 		if ( x > 10 ) {
	// 			resolve('its great');
	// 		} else {
	// 			reject('promise rejected');
	// 		}},
	// 	3000);
	// });

	// promise.then((value: string) => {
	// 	console.log(value);

	// }, () => console.log('rejected'));

	//method 3
	let stream$ = new Observable(observer => {
		console.log('Observable exec');

		observer.next(1);
		observer.next(2);

		observer.complete();
	});

	let subscription = stream$.subscribe(
		value => console.log(value),
		error => console.error(error),
		() => console.log('done')
	);
  }
}
