/**
     File : app.js
     This is the start point of the application.
     Here defined configs of application and Phaser entry point game

     Author - Devloots
 */

angular.module('App', ['ionic'])

    .run(function($ionicPlatform) {

        $ionicPlatform.ready(function() {

            if(Rezurection.DEBUG){
                console.log("window.innerWidth : "+window.innerWidth+" - window.innerHeight : "+window.innerHeight);
            }

            var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO);

            /**
             * Method to resize gmain screen
             */
            var onResize = function () {
                var height = window.innerHeight;
                var width = window.innerWidth;
                game.width = width;
                game.height = height;
                
                if (game.renderType === Phaser.WEBGL) {
                    game.renderer.resize(width, height);
                }
            }

            onResize();
            window.addEventListener("resize", onResize, false);
            window.addEventListener("fullscreenchange", onResize, false);

            game.state.add('main_screen', MainScreen);
            game.state.start('main_screen');

        });
    })
