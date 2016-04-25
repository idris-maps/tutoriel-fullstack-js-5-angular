# Angular

Dans les chapitres précédants nous avons créés trois versions de notre application, une en [javascript pure](link_to_do) (vanilla), une autre en utilisant une librairie externe ([handlebars](link_to_ad)) pour représenter la vue et une dernière avec des composants [riot](link_to_do). Nous allons maintenant utiliser le "framework" [Angular](https://angularjs.org/) de Google.

### Framework ou librairie

Il n'y a pas de définition stricte de ce qu'est un "framework". Je n'ai pas non plus trouvé d'équivalent en français. Cadre?

En général, la différence entre "framework" et librairie est qu'une librairie est un scripte externe qui vous aide à résoudre une tache en particulier. Handlebars dans le [chapitre 2](link_to_do) nous aide à créer la vue par exemple. En revanche un "framework", comme celui que nous allons utiliser maintenant, représente une approche en soi. En principe tout est inclu, vous n'avez pas besoin d'autres librairies.

### Pourquoi un framework ?

Le code en javascript pure ou modulaire (utilisant des librairies pour des tâches spécifiques) peut être structuré de manières infinies. Ce qui en soit est un avantage puisque nous pouvons utiliser l'approche que nous souhaitons. Mais si nous devons travailler en équipe, il nous faut nous mettre d'accord sur certains points pour que ça ne parte pas dans tous les sens et pour que tout le monde puisse comprendre ce qui se passe. Avec un "framework", nous avons souvent une approche et des "meilleures pratiques" définies. Du coup il y a moins de choses sur lesquelles nous devons nous mettre d'accord. Et surtout, il est plus facile de se mettre dans le code quand on intégre une nouvelle équipe.

### Pourquoi Angular ?

Il existe une multitude de "frameworks". Si on suit un peu les nouveautés en développement javascript, il semble qu'un nouveau est créé toutes les semaines. J'ai choisi Angular parce que c'est un projet de Google, donc très populaire. Vous vous en rendez compte si vous jetez un coup d'oeil aux offres d'emploi pour des postes de développeur javascript.

### Mise en garde

Le milieu du développement javascript est en évolution constante. Un "framework" peut très vite être passé de mode. Il est non seulement indispensable de suivre les évolutions mais également de connaître le javascript "pure" pour pouvoir s'adapter. Il ne faut surtout pas mettre tous ces oeufs dans le même panier et devenir "développeur angular" par exemple.

L'autre grand désavantage des "frameworks", outre l'effet de mode, est qu'ils sont composés de milliers de lignes de code. Et à moins de se plonger dedans pour comprendre exactement ce qui se passe, il y a un côté a priori magique qui peut s'avérer très frustrant quand la magie n'opère pas et qu'on n'a aucune idée pourquoi. Si nous avons au contraire écrit tout le code nous-même, il n'y a pas de magie. Tout est compréhensible.

## Mise en place

Créez un dossier ```5.angular``` pour le projet, initialisez NPM et téléchargez ```angular```.

```
$ npm init
$ npm install angular --save
```

Créez un dossier ```public``` et mettez y les fichiers ```index.html``` et ```style.css``` du chapitre "Mise en page". Puis créez un fichier ```main.js``` à la racine du projet. 

Le dossier ```4.angular``` devrait ressemble à ça:

```
4.angular
 - node_modules
 - public
  index.html
  style.css
 main.js
 package.json
```

Ajouter des scriptes ```watch``` et ```build``` à ```package.json```

```
{
  "name": "5.angular",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "watch": "watchify main.js -o public/script.js",
    "build": "browserify main.js -o public/script.js | minify public/script.js -o public/script.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "angular": "^1.5.5"
  }
}
```

Ouvrez ```public/index.html```, nous avons trois élément de liste dont on ne va garder que le dernier (celui qui est à faire et en cours de modification). Nous allons également ajouter une balise ```<script>``` à la fin du corps du document.

```
<!doctype html>
<html>
 <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Angular</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
  <link rel="stylesheet" href="style.css">
 </head>
 <body>
  <div id="contenu">
   <h1>À faire</h1>
   <div id="liste">

    <!-- l'élément de liste que nous allons garder -->

    <div class="liste-element a-faire"> 
    <!-- peut avoir la classe "fait" à la place de "a-faire" -->

     <div class="liste-element-info">
      <div class="liste-element-texte">
       <p>En cours de modification</p> 
       <!-- ce sera la clé "text" de l'objet du dictionnaire "data" -->
 
      </div>
      <div class="liste-element-modif">
       <span class="glyphicon glyphicon-pencil"></span>
      </div>
      <div class="liste-element-statut">
       <span class="glyphicon glyphicon-ok"></span>
       <!-- peut avoir la classe "glyphicon-remove" à la place de "glyphicon-ok" -->
      </div>
     </div>

     <!-- toute la <div> qui suit ne sera affichée que si l'élément est en cours de mise à jour -->
     <div class="liste-element-maj">
      <div class="liste-element-maj-input">
       <input class="form-control" id="liste-element-maj-input" type="text">
      </div>
      <div class="liste-element-maj-bouton">
       <button class="btn btn-primary" id="liste-element-maj-bouton">OK</button>
      </div>
     </div>
    </div>

   </div>

   <div id="formulaire">
    <div class="ajouter">
     <div class="ajouter-input">
      <input id="ajouter-input" class="form-control" placeholder="À faire" type="text">
     </div>
     <div class="ajouter-bouton">
      <button id="ajouter-bouton" class="btn btn-primary">Ajouter</button>
     </div>
    </div>
    <div id="supprimer-fait">
     <button id="supprimer-fait-bouton" class="btn btn-danger">Supprimer ce qui a été fait</button>
    </div>
   </div>

  </div>

  <!-- la balise <script> si dessous est nouvelle -->
  <script src="script.js"></script>

 </body>
</html>
```

## Angular

### ng-app

Angular se présente comme une extension de HTML. Une grande partie de la logique de présentation sera écrite directemment dans ```index.html```. Avant de commencer il faut donc déclarer que le document est une application angular. Nous allons le faire dans la balise ```<body>```:

```
<body ng-app="aFaire">
```

Dans ```main.js``` ajoutez ```angular``` et créez une variable ```app``` qui représentera l'application.

```
var angular = require('angular')
var app = angular.module('aFaire', [])
```

### ng-controller

Toujours dans ```main.js```, créez un controleur angular appelé ```aFaireCtrl```

```
var angular = require('angular')
var app = angular.module('aFaire', [])

app.controller('aFaireCtrl', function() {}) // <-- nouveau
```

Dans ```public/index.html``` nous devons dire à quelle partie du document nous souhaitons lier le controleur. Ce sera la ```<div id="contenu">```

```
<div id="contenu" ng-controller="aFaireCtrl">
```

### $scope

Dans angular, ```$scope``` représente le contexte du modèle. Comme ```this``` dans les modèle des chapitres précédants. Nous allons attacher un dictionnaire ```data``` au contexte avec les mêmes données qu'auparavant.

```
var angular = require('angular')
var app = angular.module('aFaire', [])

app.controller('aFaireCtrl', function() { // <-- ajouter $scope comme argument de la fonction
 $scope.data = [
  {text: 'Manger', fait: true},
  {text: 'Dormir', fait: false}
 ] // <-- le dictionnaire "data"
})
```

### ng-repeat

Nous souhaitons créer un élément de liste par objet du dictionnaire ```data```. Pour cela nous allons utiliser ```ng-repeat``` sur la partie que nous souhaitons répéter dans ```public/index.html```.

```
<div class="liste-element a-faire" ng-repeat="el in data">
```

```el``` représentera un élément de la liste. Pour ajouter le ```text``` de chaque objet nous allons utiliser ```{{``` et ```}}``` comme dans handlebars. Remplacez ```En cours de modification``` par ```{{el.text}}```

```
<p>{{el.text}}</p>
```

Vous pouvez voir si ça fonctionne en lançant le script ```watch``` avec le terminal.

```
$ npm run watch
```

### ng-class

Les deux éléments de la liste sont maintenant affichés. Par contre il ne sont pas représentés différemment selon qu'ils soient ```fait``` ou non. Il nous faut changer la classe en fonction de la clé ```fait```. Pour cela nous utilisons ```ng-class```.

La syntaxe est la suivante: 

```
ng-class="{true: 'classeSiVrai', false: 'classeSiFaux'}[clé]"
```

Dans notre exemple nous souhaitons que la ```<div class="liste-element">``` ait une classe ```fait``` si c'est le cas sinon une classe ```a-faire```.

```
<div ng-class="{true: 'liste-element fait', false: 'liste-element a-faire'}[el.fait]" ng-repeat="el in data">
```

La même chose pour l'icône du bouton "basculer-fait"

```
<span ng-class="{true: 'glyphicon glyphicon-remove', false: 'glyphicon glyphicon-ok'}[el.fait]"></span>
```

### ng-show

Nous souhaitons afficher le formulaire de mise à jour si l'élément est en cours de modification. Pour cela nous allons utiliser ```ng-show``` qui ne montrera la balise que si l'expression qu'on lui passe est ```true```.

```
<div class="liste-element-maj" ng-show="el.maj">
```

## Modifier le modèle

### Ajouter un élément de liste

Comme dans le chapitre "Vanilla", nous allons ajouter des méthodes au modèle qui nous permettent de le modifier.

Dans ```main.js```, créez une méthode ```ajouter``` qui ajoutera un élément à la liste

```
app.controller('aFaireCtrl', function() {
 $scope.data = [
  {text: 'Manger', fait: true},
  {text: 'Dormir', fait: true}
 ]
 $scope.ajouter = fonction() {

 }
})
```

En javascript pure nous aurions un controleur qui prend la valeur de la balise ```<input id="machin">```. Dans les chapitres précédants, nous utilisions ```document.getElementById('machin').value``` pour avoir cette valeur. Dans angular nous utilisons ```ng-model``` pour lier un élément au ```$scope```.

Dans ```public/index.html```

```
<input id="ajouter-input" class="form-control" placeholder="À faire" type="text" ng-model="nouveau">
```

Maintenant la valeur de cette balise ```<input>``` est liée au ```$scope``` en tant que ```$scope.nouveau```. Revenons à ```main.js``` et terminons la méthode ```ajouter```

```
$scope.ajouter = function() {
console.log($scope.nouveau)
 if($scope.nouveau) {
  $scope.data.push({text: $scope.nouveau, fait: false})
  $scope.nouveau = ''
 }
}
```

Si ```$scope.nouveau``` n'est pas null, ajouter sa valeur à la clé ```text``` d'un nouvel objet qui sera ajouté au dictionnaire ```$scope.data```. Puis remettre ```$scope.nouveau``` à zéro.

Nous devons maintenant ajouter un controleur pour qu'un nouvel élément soit ajouté quand le bouton ```Ajouter``` est clické. Avec angular nous le faisons directement dans le HTML avec ```ng-click```:

```
<button id="ajouter-bouton" class="btn btn-primary" ng-click="ajouter()">Ajouter</button>
```

Si le script ```watch``` tourne encore dans le terminal vous pouvez essayer d'ajouter un élément à la liste dans le navigateur.

### Supprimer ce qui est fait

Dans ```main.js``` ajoutez la méthode ```supprimerFait```

```
 $scope.supprimerFait = function() {
  var aGarder = []
  $scope.data.forEach(function(o) {
   if(!o.fait) { aGarder.push(o) } 
  })
  $scope.data = aGarder
 }
```

Une variable ```aGarder``` pour les objets à garder. Pour chaque objet du dictionnaire ```$scope.data``` si l'objet n'est pas fait le mettre dans ```aGarder```. Remplacer ```$scope.data``` par ```aGarder```.

Dans ```public/index.html```

```
<button id="supprimer-fait-bouton" class="btn btn-danger" ng-click="supprimerFait()">
 Supprimer ce qui a été fait
</button>
```

### Basculer "fait"

Pour marquer un élément comme ```fait``` s'il ne l'est pas et inversement, ajoutons une méthode ```basculerFait``` dans ```main.js```.

```
$scope.basculerFait = function(index) {
  if($scope.data[index].fait) {
   $scope.data[index].fait = false
  } else {
   $scope.data[index].fait = true
  }
 }
}
```

La fonction prend un argument ```index``` pour trouver l'objet dans le dictionnaire. S'il est marqué comme ```fait```, ```fait``` devient ```false```. Sinon il devient ```true```.

Dans ```public/index.html``` nous devons faire en sorte que quand ```<div class="liste-element-statut">``` est clické, l'objet soit modifié.

```
<div class="liste-element-statut" ng-click="basculerFait($index)">
``` 

Angular représente l'index d'une boucle ```ng-repeat``` par l'expression ```$index```, nous la passons à la fonction ```basculerFait()```.

### Basculer "en cours de mise à jour"

Pour voir le formulaire de mise à jour il faut ajouter une clé ```maj``` à l'objet clické.

Dans ```main.js```

```
$scope.basculerMaj = function(index) {
 if($scope.data[index].maj) { $scope.data[index].maj = undefined }
 else {
  $scope.data.forEach(function(o) { if(o.maj) { o.maj = undefined } })
  $scope.data[index].maj = true
 }
}
```

Dans ```public/index.html```

```
<div class="liste-element-modif" ng-click="basculerMaj($index)">
```

Comme nous avons mis ```ng-show="el.fait"``` à ```<div class="liste-element-maj">```, cette balise sera visible si la clé ```maj``` de l'élément de liste est ```true```.

### Mettre à jour un élément de la liste

Dans ```public/index.html```, nous ajoutons ```ng-model="nouveauText"``` à la balise ```<input>``` correspondante.

```
<input class="form-control" id="liste-element-maj-input" type="text" ng-model="nouveauText">
```

Et ```ng-click``` au bouton pour appeler la méthode ```mettreAJour``` et lui passer l'index

```
<button class="btn btn-primary" id="liste-element-maj-bouton" ng-click="mettreAJour($index)">
```

Dans ```main.js```, nous créeons une méthode ```mettreAJour```

```
$scope.mettreAJour = function(index) {
 if(this.nouveauText) {
  $scope.data[index].text = this.nouveauText
  $scope.data[index].maj = undefined
  this.nouveauText = ''
 }
}
```

Ici nous utilisons ```this.nouveauText``` et non pas ```$scope.nouveauText```. Le contexte ```this``` dans ce cas est l'élément de la liste alors que ```$scope``` est le contexte de ```ng-controller="aFaireCtrl"```, c'est à dire de toute la liste. 

Si ```this.nouveau``` n'est pas null, la clé ```text``` de l'objet avec cet index dans ```$scope.data``` prend la valeur ```this.nouveau```, la clé ```maj``` de l'objet devient indéfinie pour cacher le formulaire et ```this.nouveau``` est remis à zéro.

### Construire l'application

Si tout marche comme il faut, arrêtez le scripte ```watch``` et lancez ```build```

```
$ npm run build
```

Et l'appilcation... ne marche plus.

Ouvrez la console du navigateur. Nous avons un message d'erreur incompréhensible. Il se trouve que Angular est sensible à la minification. Il nous faut créer une fonction ```aFaireCtrl()``` avec le contenu de notre contrôleur. Puis nous injectons ```$scope``` avec ```$inject``` pour finallement passer la fonction à ```app.controller()```.

```
var angular = require('angular')
var app = angular.module('aFaire', [])

// la fonction aFaireCtrl()
function aFaireCtrl($scope) {
 $scope.data = [
  {text: 'Manger', fait: true},
  {text: 'Dormir', fait: false}
 ]

 $scope.ajouter = function() {
  if($scope.nouveau) {
   $scope.data.push({text: $scope.nouveau, fait: false})
   $scope.nouveau = ''
  }
 }

 $scope.supprimerFait = function() {
  var aGarder = []
  $scope.data.forEach(function(o) {
   if(!o.fait) { aGarder.push(o) } 
  })
  $scope.data = aGarder
 }

 $scope.basculerFait = function(index) {
  if($scope.data[index].fait) {
   $scope.data[index].fait = false
  } else {
   $scope.data[index].fait = true
  }
 }

 $scope.basculerMaj = function(index) {
  if($scope.data[index].maj) { $scope.data[index].maj = undefined }
  else {
   $scope.data.forEach(function(o) { if(o.maj) { o.maj = undefined } })
   $scope.data[index].maj = true
  }
 }

 $scope.mettreAJour = function(index) {
  if(this.nouveauText) {
   $scope.data[index].text = this.nouveauText
   $scope.data[index].maj = undefined
   this.nouveauText = ''
  }
 }
}

// injecter $scope avec $inject
aFaireCtrl.$inject = ['$scope']

// passer la fonction aFaireCtrl au contrôleur
app.controller('aFaireCtrl', ['$scope', aFaireCtrl])
```

Relancez ```$ npm run build```.

Cette fois ça marche. On vient de voir une des raisons pour lesquelles il faut faire attention avec les "frameworks" comme angular. Comme nous ne connaissons pas exactement ce que fait le "framework", on se retrouve parfois dans des situations où la magie n'opère pas. En plus le message d'erreur n'était pas d'une grande utilité. Heureusement que c'est un "framework" populaire. Quelqu'un est certainement tombé sur le même problème que vous, vous trouverez la réponse par une rapide recherche sur internet.

## Conclusion

Nous avons la même application que dans les deux chapitres précédants. Il nous a fallu écrire beaucoup moins de code pour créer cette application qu'en le faisant en javascript "pure". Certains considèreront que cette manière de faire est plus expressive. D'autres que le mélange de logique et de présentation dans le HTML est une hérésie. C'est subjectif. Mais il est assez facile de voir ce qui se passe en un coup d'oeil au fichier HTML.


