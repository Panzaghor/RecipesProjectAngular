import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data, Route, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/services/Recipe.service';
import { ShoppingService } from 'src/app/services/Shopping-List.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy{
  receita:Recipe={descricao:'',nome:'',imagePath:'',ingredientes:[]};
  subscription:Subscription;
  constructor(public RecipeService:RecipeService, public shoppingService:ShoppingService, public route:ActivatedRoute, public router:Router) {}

  ngOnInit(): void {
    this.subscription = this.route.data
    .subscribe(
      (data:Data)=>{
        this.receita = data['receita'];
      }
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  deletarReceita(){
    this.RecipeService.deletarReceita(this.receita);
    this.router.navigate(['/']);
  }
}