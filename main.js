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

