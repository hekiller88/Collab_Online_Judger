import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
//import { PROBLEMS } from '../mock-problems';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  //problems: Problem[] = PROBLEMS;
  private _problemSource = new BehaviorSubject<Problem[]>([]);

  constructor(private httpClient: HttpClient) { }

  getProblems(): Observable<Problem[]> {
    this.httpClient.get('api/v1/problems')
      .toPromise()
      .then((res: any) => {
        this._problemSource.next(res);
      })
  }

  getProblem(id: number): Problem {
    return this.problems.find((problem) => problem.id === id);
  }

  addProblem(problem: Problem) {
  	problem.id = this.problems.length + 1;
  	this.problems.push(problem);
  }
}
