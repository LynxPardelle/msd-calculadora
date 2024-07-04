import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styles: `
.customHomeMenuBtn {
  background: #56A39F;
  background: -moz-linear-gradient(
    90deg,
    #56A39F 0%,
    #499995 22%,
    #26807A 62%,
    #00635C 100%
  );
  background: -webkit-linear-gradient(
    90deg,
    #56A39F 0%,
    #499995 22%,
    #26807A 62%,
    #00635C 100%
  );
  background: linear-gradient(
    90deg,
    #56A39F 0%,
    #499995 22%,
    #26807A 62%,
    #00635C 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#00c2b6",endColorstr="#00827a",GradientType=1);

  border: none;
  border-radius: .5rem;
  color: #fff;
  font-size: 1.5vw;
  padding: .5rem 1rem;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.75), 2px 2px 6px rgba(0, 0, 0, 0.5);
  font-family: "customGothamBook", sans-serif;
}`,
})
export class NotFoundComponent {}
