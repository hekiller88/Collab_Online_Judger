import { Injectable } from '@angular/core';

declare var io: any;
@Injectable({
  providedIn: 'root'
})
export class CollaborationService {

  collaborationSocket: any;

  constructor() { }

  init(editor: any, sessionId: string): void {
  	//window.location.origin == localhost: xxxx
  	this.collaborationSocket = io(window.location.origin, { query: 'sessionId=' + sessionId}); 

  	this.collaborationSocket.on("change", (delta: string) => {
  		console.log('collaboration editor changes ' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
  	})
  }

  change(delta: string): void {
    this.collaborationSocket.emit("change", delta);
  }
}

